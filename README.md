# KN Web Agency - Site Web Officiel 🚀

Site web moderne et sécurisé pour KN Web Agency, agence web spécialisée dans la
création de sites vitrines et applications web pour PME à Abidjan.

##  Sécurité de niveau production

✅ **Audit de sécurité complet effectué**

- Headers de sécurité configurés (CSP, HSTS, XSS Protection)
- Validation et sanitisation des entrées
- Rate limiting anti-spam
- Monitoring des erreurs et performance
- Logging sécurisé sans exposition de données sensibles

## 🚀 Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **React 19** - Bibliothèque UI avec les dernières fonctionnalités
- **TypeScript 5.7** - Typage statique
- **Tailwind CSS 3.4** - Framework CSS utilitaire
- **Framer Motion 11** - Animations fluides
- **Supabase** - Base de données et authentification
- **Vercel** - Déploiement et hébergement

## ✨ Fonctionnalités

### Frontend

-  Design moderne avec effets visuels avancés
-  Responsive design pour tous les appareils
-  Mode sombre/clair automatique
-  Performances optimisées (Core Web Vitals)
-  SEO optimisé avec métadonnées complètes
-  Analytics et tracking des événements

### Backend & Admin

-  Interface d'administration sécurisée
- 📈 Dashboard avec KPI en temps réel
- 📧 Gestion des messages de contact
- 📊 Système de métriques et analytics
- 💌 Gestion des leads et newsletter
-  Export des données en CSV

### Pages principales

- 🏠 Accueil avec hero section animée
-  Services détaillés
-  Offres et tarification
-  À propos de l'équipe
-  Portfolio de projets
-  Blog et ressources
- 📞 Contact avec formulaire

## 🛠️ Installation

1. **Cloner le repository** \`\`\`bash git clone \`\`\`

2. **Installer les dépendances** \`\`\`bash npm install \`\`\`

3. **Configuration de l'environnement** \`\`\`bash cp .env.example .env.local
   \`\`\`

Remplir les variables d'environnement : \`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EMAIL=admin@knwebagency.com \`\`\`

4. **Configuration de la base de données** Exécuter le script SQL dans Supabase
   : \`\`\`bash

# Copier le contenu de scripts/setup-database.sql

# et l'exécuter dans l'éditeur SQL de Supabase

\`\`\`

5. **Lancer en développement** \`\`\`bash npm run dev \`\`\`

## 📦 Déploiement

### Déploiement sur Vercel (recommandé)

1. **Connecter le repository à Vercel**
2. **Configurer les variables d'environnement**
3. **Déployer automatiquement**

### Variables d'environnement de production

\`\`\`env NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
ADMIN_EMAIL=admin@knwebagency.com \`\`\`

##  Structure de la base de données

### Tables principales

- `contact_messages` - Messages du formulaire de contact
- `leads` - Leads et abonnements newsletter
- `starter_offer_slots` - Gestion des places limitées
- `site_metrics` - Analytics et métriques du site

### Vues

- `kpi_dashboard` - Vue agrégée pour les KPI admin

## Administration

Accès à l'interface admin : `/admin/login`

**Fonctionnalités admin :**

- Dashboard avec métriques en temps réel
- Gestion des messages de contact
- Export des données
- Analytics du site

##  Analytics et métriques

Le site inclut un système d'analytics personnalisé qui track :

- Vues de pages
- Clics sur les CTA
- Soumissions de formulaires
- Inscriptions newsletter

## Personnalisation

### Couleurs et thème

Les couleurs principales sont définies dans `tailwind.config.ts` :

- Violet : `#8B5CF6`
- Bleu : `#3B82F6`
- Ambre : `#F59E0B`

### Polices

- **Headings** : Space Grotesk
- **Display** : Plus Jakarta Sans
- **Body** : Inter

## 📱 PWA et performances

- Manifest pour installation PWA
- Service Worker pour cache
- Optimisation des images
- Lazy loading
- Code splitting automatique

## 🔍 SEO

- Métadonnées complètes
- Sitemap automatique
- Robots.txt optimisé
- Schema markup
- Open Graph et Twitter Cards

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

**KN Web Agency**

- Email: contact@knwebagency.com
- Téléphone: +225 0585471688
- Site web: https://knwebagency.com
- Localisation: Abidjan, Côte d'Ivoire

---

Développé par KN Web Agency
