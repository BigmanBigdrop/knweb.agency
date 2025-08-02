// Script de vérification SEO complète
// Usage : npm run seo-check

const https = require("https");
const http = require("http");

const SITE_URL = "https://www.knweb.agency";

// Liste des pages importantes à vérifier
const PAGES_TO_CHECK = [
  "/",
  "/services",
  "/offres",
  "/projets",
  "/blog",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
  "/plan-du-site",
];

// Fichiers techniques à vérifier
const TECHNICAL_FILES = [
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith("https:") ? https : http;

    const request = protocol.get(url, (res) => {
      resolve({
        url,
        status: res.statusCode,
        success: res.statusCode >= 200 && res.statusCode < 400,
        contentType: res.headers["content-type"],
        size: res.headers["content-length"],
      });
    });

    request.on("error", (err) => {
      resolve({
        url,
        status: 0,
        success: false,
        error: err.message,
      });
    });

    request.setTimeout(10000, () => {
      request.destroy();
      resolve({
        url,
        status: 0,
        success: false,
        error: "Timeout",
      });
    });
  });
}

async function checkSEOStatus() {
  console.log("🔍 VÉRIFICATION SEO COMPLÈTE");
  console.log("================================\n");
  console.log(`🌐 Site: ${SITE_URL}\n`);

  // 1. Vérification des pages principales
  console.log("📄 PAGES PRINCIPALES:");
  console.log("--------------------");

  const pageResults = [];
  for (const page of PAGES_TO_CHECK) {
    const fullUrl = `${SITE_URL}${page}`;
    const result = await checkUrl(fullUrl);
    pageResults.push(result);

    const status = result.success ? "✅" : "❌";
    const statusCode = result.status || "ERR";
    console.log(`${status} ${page.padEnd(25)} - Status: ${statusCode}`);
  }

  // 2. Vérification des fichiers techniques
  console.log("\n🔧 FICHIERS TECHNIQUES:");
  console.log("----------------------");

  const technicalResults = [];
  for (const file of TECHNICAL_FILES) {
    const fullUrl = `${SITE_URL}${file}`;
    const result = await checkUrl(fullUrl);
    technicalResults.push(result);

    const status = result.success ? "✅" : "❌";
    const statusCode = result.status || "ERR";
    console.log(`${status} ${file.padEnd(25)} - Status: ${statusCode}`);
  }

  // 3. Résumé
  console.log("\n📊 RÉSUMÉ:");
  console.log("----------");

  const allResults = [...pageResults, ...technicalResults];
  const successCount = allResults.filter((r) => r.success).length;
  const totalCount = allResults.length;
  const successRate = Math.round((successCount / totalCount) * 100);

  console.log(`Pages vérifiées: ${totalCount}`);
  console.log(`Pages accessibles: ${successCount}`);
  console.log(`Taux de succès: ${successRate}%`);

  // 4. Erreurs détaillées
  const errors = allResults.filter((r) => !r.success);
  if (errors.length > 0) {
    console.log("\n❌ ERREURS DÉTECTÉES:");
    console.log("--------------------");
    errors.forEach((error) => {
      console.log(`• ${error.url}`);
      console.log(`  Erreur: ${error.error || `Status ${error.status}`}`);
    });
  }

  // 5. Recommandations
  console.log("\n💡 PROCHAINES ÉTAPES:");
  console.log("---------------------");

  if (successRate === 100) {
    console.log("✅ Tous les fichiers sont accessibles !");
    console.log("🚀 Vous pouvez maintenant :");
    console.log("   1. Soumettre le sitemap à Google Search Console");
    console.log("   2. Soumettre le sitemap à Bing Webmaster Tools");
    console.log("   3. Utiliser: npm run ping-search-engines");
  } else {
    console.log("⚠️  Corrigez d'abord les erreurs détectées");
    console.log("📞 Vérifiez que le site est bien déployé et accessible");
  }

  // 6. Outils de vérification externes
  console.log("\n🔗 OUTILS DE VÉRIFICATION:");
  console.log("--------------------------");
  console.log(
    "• Google Search Console: https://search.google.com/search-console"
  );
  console.log("• Bing Webmaster Tools: https://www.bing.com/webmasters");
  console.log(
    "• Rich Results Test: https://search.google.com/test/rich-results"
  );
  console.log("• PageSpeed Insights: https://pagespeed.web.dev/");
  console.log(`• Test direct sitemap: ${SITE_URL}/sitemap.xml`);
  console.log(`• Test direct robots: ${SITE_URL}/robots.txt`);

  console.log("\n✨ Vérification terminée !");

  return {
    success: successRate === 100,
    successRate,
    totalPages: totalCount,
    errors: errors.length,
  };
}

// Exécution
if (require.main === module) {
  checkSEOStatus().catch(console.error);
}

module.exports = { checkSEOStatus };
