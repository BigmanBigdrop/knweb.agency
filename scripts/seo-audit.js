#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔍 AUDIT SEO PRÉ-DÉPLOIEMENT");
console.log("============================\n");

const checks = [];

// 1. Vérifier la présence des fichiers SEO essentiels
console.log("📁 Vérification des fichiers...");

const requiredFiles = [
  "app/sitemap.ts",
  "app/robots.ts",
  "app/manifest.ts",
  "public/robots.txt",
  "SEO-SUBMISSION-GUIDE.md",
];

requiredFiles.forEach((file) => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`  ${exists ? "✅" : "❌"} ${file}`);
  checks.push({ name: `Fichier ${file}`, status: exists });
});

// 2. Vérifier les métadonnées dans layout.tsx
console.log("\n🏷️  Vérification des métadonnées...");

const layoutPath = path.join(process.cwd(), "app/layout.tsx");
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, "utf8");

  const metadataChecks = [
    { name: "Titre par défaut", pattern: /title:\s*{/ },
    { name: "Description", pattern: /description:/ },
    { name: "Mots-clés", pattern: /keywords:/ },
    { name: "OpenGraph", pattern: /openGraph:/ },
    { name: "Twitter Cards", pattern: /twitter:/ },
    { name: "Robots", pattern: /robots:/ },
    { name: "Vérification Google", pattern: /google:\s*"[^"]+"/ },
    { name: "Canonical URL", pattern: /canonical:/ },
    { name: "Manifest", pattern: /manifest:/ },
  ];

  metadataChecks.forEach((check) => {
    const found = check.pattern.test(layoutContent);
    console.log(`  ${found ? "✅" : "❌"} ${check.name}`);
    checks.push({ name: `Métadonnée ${check.name}`, status: found });
  });
} else {
  console.log("  ❌ layout.tsx introuvable");
  checks.push({ name: "Layout.tsx", status: false });
}

// 3. Vérifier les pages avec métadonnées
console.log("\n📄 Vérification des pages...");

const pagesWithMetadata = [
  "app/services/page.tsx",
  "app/offres/page.tsx",
  "app/projets/page.tsx",
  "app/blog/page.tsx",
  "app/a-propos/page.tsx",
  "app/contact/page.tsx",
  "app/mentions-legales/page.tsx",
  "app/politique-confidentialite/page.tsx",
  "app/plan-du-site/page.tsx",
];

pagesWithMetadata.forEach((pagePath) => {
  const exists = fs.existsSync(path.join(process.cwd(), pagePath));
  if (exists) {
    const content = fs.readFileSync(path.join(process.cwd(), pagePath), "utf8");
    const hasMetadata = /export const metadata/.test(content);
    console.log(
      `  ${hasMetadata ? "✅" : "⚠️ "} ${pagePath} ${
        hasMetadata ? "" : "(pas de métadonnées)"
      }`
    );
    checks.push({ name: `Page ${pagePath}`, status: hasMetadata });
  } else {
    console.log(`  ❌ ${pagePath} (introuvable)`);
    checks.push({ name: `Page ${pagePath}`, status: false });
  }
});

// 4. Vérifier les API routes SEO
console.log("\n🔌 Vérification des API Routes...");

const apiRoutes = ["app/api/seo/check/route.ts", "app/api/seo/ping/route.ts"];

apiRoutes.forEach((route) => {
  const exists = fs.existsSync(path.join(process.cwd(), route));
  console.log(`  ${exists ? "✅" : "❌"} ${route}`);
  checks.push({ name: `API ${route}`, status: exists });
});

// 5. Vérifier les composants SEO
console.log("\n🧩 Vérification des composants...");

const seoComponents = [
  "components/structured-data.tsx",
  "components/seo-head.tsx",
  "components/admin/seo-manager.tsx",
  "lib/seo-utils.ts",
];

seoComponents.forEach((component) => {
  const exists = fs.existsSync(path.join(process.cwd(), component));
  console.log(`  ${exists ? "✅" : "❌"} ${component}`);
  checks.push({ name: `Composant ${component}`, status: exists });
});

// 6. Vérifier package.json
console.log("\n📦 Vérification des scripts...");

const packagePath = path.join(process.cwd(), "package.json");
if (fs.existsSync(packagePath)) {
  const packageContent = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const scripts = packageContent.scripts || {};

  const requiredScripts = ["ping-search-engines", "seo-check"];
  requiredScripts.forEach((script) => {
    const exists = scripts[script];
    console.log(`  ${exists ? "✅" : "❌"} Script ${script}`);
    checks.push({ name: `Script ${script}`, status: !!exists });
  });
}

// Calcul du score
const totalChecks = checks.length;
const passedChecks = checks.filter((check) => check.status).length;
const score = Math.round((passedChecks / totalChecks) * 100);

console.log("\n📊 RÉSULTATS:");
console.log("=============");
console.log(`Score SEO: ${score}% (${passedChecks}/${totalChecks})`);

if (score >= 95) {
  console.log(
    "🎉 Excellent ! Votre site est prêt pour un référencement optimal."
  );
} else if (score >= 80) {
  console.log("⚠️  Bon score, mais quelques améliorations possibles.");
} else {
  console.log(
    "❌ Des corrections importantes sont nécessaires avant le déploiement."
  );
}

// Échecs
const failedChecks = checks.filter((check) => !check.status);
if (failedChecks.length > 0) {
  console.log("\n❌ ÉLÉMENTS À CORRIGER:");
  failedChecks.forEach((check) => {
    console.log(`  • ${check.name}`);
  });
}

console.log("\n💡 PROCHAINES ÉTAPES:");
console.log("=====================");
console.log("1. 🚀 Déployez le site avec les corrections");
console.log("2. 🔍 Testez les URLs avec le script seo-check");
console.log("3. 📡 Utilisez ping-search-engines pour notifier Google/Bing");
console.log("4. 📊 Configurez Google Search Console");
console.log("5. 📈 Surveillez l'indexation dans /admin/seo");

console.log("\n📞 Support: contact@knweb.agency");
console.log("🌐 Guide complet: SEO-SUBMISSION-GUIDE.md");

// Exit code basé sur le score
process.exit(score >= 80 ? 0 : 1);
