// Toast notifications pour remplacer les alert()
import { toast } from "sonner";

export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, {
    description,
    duration: 5000,
  });
};

export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, {
    description,
    duration: 4000,
  });
};

export const showWarningToast = (message: string, description?: string) => {
  toast.warning(message, {
    description,
    duration: 4000,
  });
};

export const showInfoToast = (message: string, description?: string) => {
  toast.info(message, {
    description,
    duration: 3000,
  });
};

// Logger personnalisé pour filter les logs en production
export const logger = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.error(...args);
    }
    // En production, on peut envoyer à un service de monitoring
    // Ex: Sentry, LogRocket, etc.
  },
  warn: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(...args);
    }
  },
  info: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.info(...args);
    }
  },
};

// Validation d'email améliorée
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Sanitization des données d'entrée
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>\"']/g, "") // Supprime les caractères dangereux
    .substring(0, 1000); // Limite la longueur
};

// Validation des données de formulaire
export const validateContactForm = (data: {
  fullName: string;
  email: string;
  message: string;
  companyName?: string;
  projectType?: string;
}) => {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.length < 2) {
    errors.fullName = "Le nom complet doit contenir au moins 2 caractères";
  }

  if (!validateEmail(data.email)) {
    errors.email = "Veuillez entrer une adresse email valide";
  }

  if (!data.message || data.message.length < 10) {
    errors.message = "Le message doit contenir au moins 10 caractères";
  }

  if (data.message && data.message.length > 2000) {
    errors.message = "Le message ne peut pas dépasser 2000 caractères";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
