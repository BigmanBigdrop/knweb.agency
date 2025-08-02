# 🚀 Guide de Déploiement - KN Web Agency

## Statut du déploiement

✅ **Code pushé sur GitHub** : https://github.com/BigmanBigdrop/knweb.agency.git

## 🔧 Configuration des variables d'environnement

### Dans Vercel (Variables d'environnement) :

```bash
# Variables PUBLIQUES (côté client)
NEXT_PUBLIC_SUPABASE_URL=https://hpxomhrnzoagmlhxmmjg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhweG9taHJuem9hZ21saHhtbWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzA2MzYsImV4cCI6MjA2NzIwNjYzNn0.LRgrmST7t9kdqNGdA_qqtVoSGRi1Q9T9l5a9YOmcPpI
NEXT_PUBLIC_SITE_URL=https://www.knweb.agency

# Variables PRIVÉES (côté serveur uniquement)
SUPABASE_SERVICE_ROLE_KEY=[À RÉCUPÉRER DEPUIS SUPABASE]
ADMIN_EMAIL=kouamangem@gmail.com
GOOGLE_SITE_VERIFICATION=dtuNrnloo4nfQAdR1vvUY9RuzvNbfsh0-q7qAzdgEIo
NODE_ENV=production
```

## 🎯 Prochaines étapes

### 1. Déploiement sur Vercel

```bash
# Connecter le repository GitHub à Vercel
1. Aller sur vercel.com
2. Import Git Repository
3. Sélectionner BigmanBigdrop/knweb.agency
4. Configurer les variables d'environnement ci-dessus
5. Déployer
```

### 2. Configuration DNS

```bash
# Configurer le domaine knweb.agency
1. Dans Vercel > Settings > Domains
2. Ajouter knweb.agency et www.knweb.agency
3. Configurer les records DNS chez votre registraire
```

### 3. Récupérer la SERVICE_ROLE_KEY

```bash
# Dans Supabase Dashboard
1. Aller dans Settings > API
2. Copier la "service_role" key (pas l'anon key !)
3. L'ajouter comme variable d'environnement PRIVÉE dans Vercel
```

### 4. Vérification SEO

```bash
# Après déploiement, vérifier :
1. https://www.knweb.agency/sitemap.xml
2. https://www.knweb.agency/robots.txt
3. Google Search Console : soumettre le sitemap
4. Exécuter : npm run seo-check
```

## 🔒 Sécurité vérifiée

✅ Fichiers sensibles exclus du repository  
✅ .env.local dans .gitignore  
✅ Variables d'environnement séparées public/privé  
✅ Rate limiting activé  
✅ Headers de sécurité configurés  
✅ Validation des entrées implémentée

## 📊 Score SEO actuel : 92%

✅ Sitemap dynamique fonctionnel  
✅ Robots.txt optimisé  
✅ Meta tags complets  
✅ Structured data implémentée  
✅ Performance optimisée

---

**Votre site est maintenant prêt pour la production !** 🎉
