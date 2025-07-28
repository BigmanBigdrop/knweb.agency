// Rate limiting simple côté client pour éviter le spam
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 3, windowMs: number = 60000) {
    // 3 tentatives par minute par défaut
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];

    // Nettoyer les anciennes tentatives
    const recentAttempts = attempts.filter(
      (time) => now - time < this.windowMs
    );

    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    // Ajouter la nouvelle tentative
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);

    return true;
  }

  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length === 0) return 0;

    const oldestAttempt = Math.min(...attempts);
    const timeLeft = this.windowMs - (Date.now() - oldestAttempt);

    return Math.max(0, timeLeft);
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Instance globale pour le formulaire de contact
export const contactFormLimiter = new RateLimiter(2, 120000); // 2 tentatives par 2 minutes

// Hook pour l'utilisation dans les composants
export const useRateLimit = (
  identifier: string,
  limiter: RateLimiter = contactFormLimiter
) => {
  const isAllowed = () => limiter.isAllowed(identifier);
  const getRemainingTime = () => limiter.getRemainingTime(identifier);
  const reset = () => limiter.reset(identifier);

  return { isAllowed, getRemainingTime, reset };
};

// Détection de tentatives malveillantes
export const detectSuspiciousActivity = (formData: any): boolean => {
  const suspiciousPatterns = [
    // URLs dans les champs texte
    /https?:\/\//gi,
    // Scripts potentiels
    /<script|javascript:|data:/gi,
    // Répétition excessive de caractères
    /(.)\1{10,}/gi,
    // Caractères de contrôle
    /[\x00-\x1f\x7f-\x9f]/gi,
  ];

  const textFields = [
    formData.fullName,
    formData.email,
    formData.companyName,
    formData.message,
  ].filter(Boolean);

  return textFields.some((field) =>
    suspiciousPatterns.some((pattern) => pattern.test(field))
  );
};

// Génération d'empreinte pour identifier les utilisateurs
export const generateFingerprint = (): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx!.textBaseline = "top";
  ctx!.font = "14px Arial";
  ctx!.fillText("Rate limiting fingerprint", 2, 2);

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join("|");

  // Hash simple (à améliorer en production avec une vraie fonction de hash)
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString(36);
};
