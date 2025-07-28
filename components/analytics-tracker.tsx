"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface AnalyticsEvent {
  event_type:
    | "page_view"
    | "cta_click"
    | "form_submit"
    | "scroll_milestone"
    | "time_spent";
  page?: string;
  metadata?: Record<string, any>;
}

// Hook pour tracker les analytics
export function useAnalytics() {
  const trackEvent = async (event: AnalyticsEvent) => {
    try {
      const { error } = await supabase.from("site_metrics").insert([
        {
          event_type: event.event_type,
          page: event.page || window.location.pathname,
          metadata: event.metadata || {},
        },
      ]);

      if (error) {
        console.error("Analytics tracking error:", error);
      } else {
        console.log("📊 Analytics event tracked:", event);
      }
    } catch (error) {
      console.error("Failed to track analytics event:", error);
    }
  };

  return { trackEvent };
}

// Composant pour tracker automatiquement les pages vues
export function AnalyticsTracker() {
  const pathname = usePathname();
  const { trackEvent } = useAnalytics();
  const startTime = useRef<number>(Date.now());
  const scrollMilestones = useRef<Set<number>>(new Set());

  // Tracker les pages vues
  useEffect(() => {
    startTime.current = Date.now();
    scrollMilestones.current.clear();

    trackEvent({
      event_type: "page_view",
      page: pathname,
      metadata: {
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
      },
    });

    // Cleanup: tracker le temps passé sur la page avant de la quitter
    return () => {
      const timeSpent = Date.now() - startTime.current;
      if (timeSpent > 5000) {
        // Plus de 5 secondes
        trackEvent({
          event_type: "time_spent",
          page: pathname,
          metadata: {
            duration_ms: timeSpent,
            duration_seconds: Math.round(timeSpent / 1000),
          },
        });
      }
    };
  }, [pathname, trackEvent]);

  // Tracker le scroll pour mesurer l'engagement
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );

      // Tracker les milestones de scroll (25%, 50%, 75%, 100%)
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrolled >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackEvent({
            event_type: "scroll_milestone",
            page: pathname,
            metadata: {
              milestone: `${milestone}%`,
              scroll_depth: scrolled,
            },
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, trackEvent]);

  return null; // Ce composant n'affiche rien
}

// Hook pour tracker les clics sur les CTA
export function useCTATracking() {
  const { trackEvent } = useAnalytics();

  const trackCTAClick = (
    ctaName: string,
    ctaType: string = "button",
    additionalData?: Record<string, any>
  ) => {
    trackEvent({
      event_type: "cta_click",
      metadata: {
        cta_name: ctaName,
        cta_type: ctaType,
        timestamp: new Date().toISOString(),
        ...additionalData,
      },
    });
  };

  return { trackCTAClick };
}

// HOC pour wrapper automatiquement les boutons CTA avec le tracking
export function withCTATracking<T extends React.ComponentProps<"button">>(
  WrappedComponent: React.ComponentType<T>,
  ctaName: string
) {
  return function TrackedCTA(props: T) {
    const { trackCTAClick } = useCTATracking();

    const handleClick = (e: React.MouseEvent) => {
      trackCTAClick(ctaName, "button", {
        button_text:
          typeof props.children === "string" ? props.children : ctaName,
      });

      // Appeler le onClick original s'il existe
      if (props.onClick) {
        props.onClick(e as any);
      }
    };

    return <WrappedComponent {...props} onClick={handleClick} />;
  };
}

export default AnalyticsTracker;
