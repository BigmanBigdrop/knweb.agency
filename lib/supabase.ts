import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    storageKey: "sb-auth-token",
  },
});

// Types pour les données
export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  company_name: string | null;
  project_type: string | null;
  estimated_budget: string | null;
  message: string;
  created_at: string;
}

export interface Lead {
  id: string;
  email: string;
  source: string | null;
  tags: string[] | null;
  created_at: string;
}

export interface SiteMetric {
  id: string;
  event_type: string;
  page: string | null;
  metadata: any;
  created_at: string;
}

export interface StarterOfferSlot {
  id: number;
  total_slots: number;
  remaining_slots: number;
  updated_at: string;
}

export interface KPIDashboard {
  total_contacts: number;
  total_leads: number;
  contacts_last_30d: number;
  remaining_starter_slots: number;
  views_last_7d: number;
  cta_clicks_last_7d: number;
}

// Fonctions utilitaires pour les métriques
export const trackEvent = async (
  eventType: string,
  page?: string,
  metadata?: Record<string, any>
) => {
  try {
    await supabase.from("site_metrics").insert([
      {
        event_type: eventType,
        page,
        metadata,
      },
    ]);
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

export const trackPageView = (page: string) => {
  trackEvent("page_view", page);
};

export const trackCTAClick = (ctaName: string, page: string) => {
  trackEvent("cta_click", page, { cta_name: ctaName });
};

export const trackFormSubmit = (formType: string, page: string) => {
  trackEvent("form_submit", page, { form_type: formType });
};
