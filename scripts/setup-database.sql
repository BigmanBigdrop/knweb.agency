-- Script complet pour la base de données Supabase de KN Web Agency
-- Ce script crée les tables, les politiques de sécurité (RLS), et les index nécessaires

-- 1. Création de la table des messages du formulaire de contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  project_type TEXT,
  estimated_budget TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC', now())
);

-- 2. Index sur la date de création pour des tris rapides
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- 3. Création de la table des leads (ex: abonnements newsletter ou prospects simples)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT, -- page d'origine (blog, landing, etc.)
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC', now())
);

-- 4. Table pour le nombre de places restantes sur l'offre starter
CREATE TABLE IF NOT EXISTS starter_offer_slots (
  id INT PRIMARY KEY DEFAULT 1,
  total_slots INT DEFAULT 10,
  remaining_slots INT DEFAULT 10,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC', now())
);

INSERT INTO starter_offer_slots (id, total_slots, remaining_slots)
VALUES (1, 10, 10)
ON CONFLICT (id) DO NOTHING;

-- 5. Activation des Row-Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE starter_offer_slots ENABLE ROW LEVEL SECURITY;

-- 5bis. Table pour enregistrer les événements du site (métriques & analytics)
CREATE TABLE IF NOT EXISTS site_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- ex: 'page_view', 'cta_click', 'form_submit'
  page TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC', now())
);

-- Index pour optimiser les filtres temporels et type d'événement
CREATE INDEX IF NOT EXISTS idx_site_metrics_created_at ON site_metrics(created_at);
CREATE INDEX IF NOT EXISTS idx_site_metrics_event_type ON site_metrics(event_type);

-- Activer RLS
ALTER TABLE site_metrics ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Allow public insert metrics" ON site_metrics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read metrics" ON site_metrics
  FOR SELECT USING (true);

-- 6. Politiques de lecture/sécurité (exemple de lecture publique pour affichage frontend)
CREATE POLICY "Allow public read" ON contact_messages
  FOR SELECT USING (true);

CREATE POLICY "Allow insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read" ON leads
  FOR SELECT USING (true);

CREATE POLICY "Allow insert" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read remaining slots" ON starter_offer_slots
  FOR SELECT USING (true);

CREATE POLICY "Allow admin update slots" ON starter_offer_slots
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 7. Vue pour le dashboard KPI
CREATE OR REPLACE VIEW kpi_dashboard AS
SELECT
  (SELECT COUNT(*) FROM contact_messages) AS total_contacts,
  (SELECT COUNT(*) FROM leads) AS total_leads,
  (SELECT remaining_slots FROM starter_offer_slots LIMIT 1) AS remaining_starter_slots,
  (SELECT COUNT(*) FROM contact_messages WHERE created_at > now() - interval '30 days') AS contacts_last_30d,
  (SELECT COUNT(*) FROM site_metrics WHERE event_type = 'page_view' AND created_at > now() - interval '7 days') AS views_last_7d,
  (SELECT COUNT(*) FROM site_metrics WHERE event_type = 'cta_click' AND created_at > now() - interval '7 days') AS cta_clicks_last_7d;

-- Fin du script complet
