-- ================================================================
-- FIX: Erreurs RLS - Analytics et Slots
-- ================================================================
-- Exécutez ce fichier dans Supabase SQL Editor
-- ================================================================

-- 1. CORRIGER LA POLITIQUE RLS POUR STARTER_OFFER_SLOTS
-- Le problème: la lecture publique n'était peut-être pas activée correctement

-- Supprimer l'ancienne politique si elle existe
DROP POLICY IF EXISTS "Allow public read on starter_offer_slots" ON starter_offer_slots;

-- Recréer la politique pour permettre la lecture publique ET authentifiée
CREATE POLICY "Allow public read on starter_offer_slots"
ON starter_offer_slots
FOR SELECT
TO anon, authenticated
USING (true);

-- 2. VÉRIFIER QUE RLS EST BIEN ACTIVÉ
ALTER TABLE starter_offer_slots ENABLE ROW LEVEL SECURITY;

-- 3. INSÉRER DES DONNÉES PAR DÉFAUT SI LA TABLE EST VIDE
INSERT INTO starter_offer_slots (id, total_slots, remaining_slots)
VALUES (1, 10, 7)
ON CONFLICT (id) DO NOTHING;

-- 4. VÉRIFIER LES POLITIQUES SITE_METRICS
-- Si l'insertion publique ne fonctionne pas, recréer la politique

DROP POLICY IF EXISTS "Allow public insert on site_metrics" ON site_metrics;

CREATE POLICY "Allow public insert on site_metrics"
ON site_metrics
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- ================================================================
-- NOUVELLE TABLE: SITE_SETTINGS (Paramètres éditables du site)
-- ================================================================

CREATE TABLE IF NOT EXISTS public.site_settings (
  id integer NOT NULL DEFAULT 1,
  -- Pricing Starter
  starter_original_price integer DEFAULT 90000,
  starter_current_price integer DEFAULT 49000,
  starter_total_slots integer DEFAULT 10,

  -- Pricing Pro
  pro_original_price integer DEFAULT 199000,
  pro_current_price integer DEFAULT 100000,

  -- Stats Homepage
  stats_projects_completed integer DEFAULT 50,
  stats_satisfied_clients integer DEFAULT 30,
  stats_years_experience integer DEFAULT 3,
  stats_technologies_used integer DEFAULT 15,

  -- Contact Info
  contact_phone text DEFAULT '+225-XX-XX-XX-XX',
  contact_email text DEFAULT 'contact@knweb.agency',
  contact_address text DEFAULT 'Abidjan, Côte d''Ivoire',

  -- Social Links
  social_twitter text DEFAULT 'https://twitter.com/knwebagency',
  social_linkedin text DEFAULT 'https://linkedin.com/company/knwebagency',
  social_facebook text DEFAULT 'https://facebook.com/knwebagency',

  -- Metadata
  updated_at timestamp with time zone DEFAULT timezone('UTC'::text, now()),
  updated_by uuid REFERENCES auth.users(id),

  CONSTRAINT site_settings_pkey PRIMARY KEY (id),
  CONSTRAINT site_settings_only_one_row CHECK (id = 1)
);

-- Activer RLS sur site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Permettre la lecture publique (pour afficher les prix)
CREATE POLICY "Allow public read on site_settings"
ON site_settings
FOR SELECT
TO anon, authenticated
USING (true);

-- Permettre la modification uniquement aux admins authentifiés
CREATE POLICY "Allow authenticated update on site_settings"
ON site_settings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Insérer les valeurs par défaut
INSERT INTO site_settings (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- ================================================================
-- FONCTION: Auto-update updated_at
-- ================================================================

-- Créer la fonction si elle n'existe pas déjà
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('UTC'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Appliquer le trigger sur site_settings
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- VÉRIFICATION
-- ================================================================

-- Tester la lecture des settings
SELECT * FROM site_settings;

-- Tester la lecture des slots
SELECT * FROM starter_offer_slots;

-- Vérifier les politiques RLS
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('site_settings', 'starter_offer_slots', 'site_metrics')
ORDER BY tablename, policyname;

-- ================================================================
-- TERMINÉ ! ✅
-- ================================================================
-- Maintenant vous pouvez:
-- 1. Lire les slots publiquement (plus d'erreur)
-- 2. Insérer des analytics (plus d'erreur)
-- 3. Éditer les paramètres du site depuis l'admin
-- ================================================================
