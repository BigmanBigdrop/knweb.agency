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
  metadata: Record<string, unknown> | null;
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

export interface SiteSettings {
  id: number;
  // Pricing Starter
  starter_original_price: number;
  starter_current_price: number;
  starter_total_slots: number;
  // Pricing Pro
  pro_original_price: number;
  pro_current_price: number;
  // Stats Homepage
  stats_projects_completed: number;
  stats_satisfied_clients: number;
  stats_years_experience: number;
  stats_technologies_used: number;
  // Contact Info
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  // Social Links
  social_twitter: string;
  social_linkedin: string;
  social_facebook: string;
  // Metadata
  updated_at: string;
  updated_by: string | null;
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

// Fonctions utilitaires pour les paramètres du site
export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Error fetching site settings:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
};

export const updateSiteSettings = async (
  settings: Partial<SiteSettings>
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from("site_settings")
      .update(settings)
      .eq("id", 1);

    if (error) {
      console.error("Error updating site settings:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating site settings:", error);
    return { success: false, error: String(error) };
  }
};
