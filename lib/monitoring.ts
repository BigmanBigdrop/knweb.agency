// Système de monitoring et reporting d'erreurs
import { logger } from "./helpers";

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: Date;
  userId?: string;
  additionalData?: any;
}

class ErrorMonitoring {
  private errors: ErrorReport[] = [];
  private maxErrors = 50; // Limite le nombre d'erreurs stockées

  constructor() {
    // Capturer les erreurs JavaScript globales
    window.addEventListener("error", (event) => {
      this.captureError({
        message: event.message,
        stack: event.error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date(),
        additionalData: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    // Capturer les rejets de promesses non gérés
    window.addEventListener("unhandledrejection", (event) => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date(),
        additionalData: {
          type: "unhandledrejection",
          reason: event.reason,
        },
      });
    });
  }

  captureError(error: Omit<ErrorReport, "timestamp"> & { timestamp?: Date }) {
    const errorReport: ErrorReport = {
      ...error,
      timestamp: error.timestamp || new Date(),
    };

    this.errors.push(errorReport);

    // Garder seulement les dernières erreurs
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // En production, envoyer à un service de monitoring
    if (process.env.NODE_ENV === "production") {
      this.sendToMonitoring(errorReport);
    } else {
      logger.error("Error captured", { errorReport });
    }
  }

  private async sendToMonitoring(error: ErrorReport) {
    try {
      // Ici vous pourriez envoyer à Sentry, LogRocket, ou votre propre endpoint
      await fetch("/api/errors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(error),
      });
    } catch (e) {
      logger.error("Failed to send error to monitoring", { error: e });
    }
  }

  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }
}

// Performance monitoring
class PerformanceMonitoring {
  private metrics: Record<string, number> = {};

  startTiming(label: string): void {
    this.metrics[`${label}_start`] = performance.now();
  }

  endTiming(label: string): number {
    const start = this.metrics[`${label}_start`];
    if (!start) {
      logger.warn(`No start time found for ${label}`);
      return 0;
    }

    const duration = performance.now() - start;
    this.metrics[label] = duration;
    delete this.metrics[`${label}_start`];

    if (process.env.NODE_ENV !== "production") {
      logger.info(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  getMetrics(): Record<string, number> {
    return { ...this.metrics };
  }

  // Surveiller les Core Web Vitals
  observeWebVitals(): void {
    if (typeof window !== "undefined") {
      // Observer LCP (Largest Contentful Paint)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        logger.info("LCP", { time: lastEntry.startTime });
      }).observe({ entryTypes: ["largest-contentful-paint"] });

      // Observer FID (First Input Delay)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          logger.info("FID", { time: entry.processingStart - entry.startTime });
        });
      }).observe({ entryTypes: ["first-input"] });

      // Observer CLS (Cumulative Layout Shift)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            logger.info("CLS", { value: entry.value });
          }
        });
      }).observe({ entryTypes: ["layout-shift"] });
    }
  }
}

// Instances globales
export const errorMonitoring = new ErrorMonitoring();
export const performanceMonitoring = new PerformanceMonitoring();

// Hook pour faciliter l'utilisation dans les composants
export const useErrorMonitoring = () => {
  const captureError = (error: string | Error, additionalData?: any) => {
    errorMonitoring.captureError({
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      url: window.location.href,
      userAgent: navigator.userAgent,
      additionalData,
    });
  };

  return { captureError };
};

// Hook pour le monitoring de performance
export const usePerformanceMonitoring = () => {
  const startTiming = (label: string) =>
    performanceMonitoring.startTiming(label);
  const endTiming = (label: string) => performanceMonitoring.endTiming(label);

  return { startTiming, endTiming };
};
