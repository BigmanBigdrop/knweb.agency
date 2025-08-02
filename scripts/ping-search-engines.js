// Script pour notifier Google et Bing des mises à jour du sitemap
// Usage : node scripts/ping-search-engines.js

const https = require("https");

const SITE_URL = "https://www.knweb.agency";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// URLs de ping pour les moteurs de recherche
const SEARCH_ENGINES = {
  google: `https://www.google.com/ping?sitemap=${encodeURIComponent(
    SITEMAP_URL
  )}`,
  bing: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
};

function pingSearchEngine(name, url) {
  return new Promise((resolve, reject) => {
    console.log(`🔔 Notification de ${name}...`);

    https
      .get(url, (res) => {
        console.log(`✅ ${name} notifié - Status: ${res.statusCode}`);
        resolve(`${name}: ${res.statusCode}`);
      })
      .on("error", (err) => {
        console.error(`❌ Erreur ${name}:`, err.message);
        reject(err);
      });
  });
}

async function pingAllSearchEngines() {
  console.log("🚀 Début de la notification des moteurs de recherche...\n");
  console.log(`📍 Site: ${SITE_URL}`);
  console.log(`🗺️  Sitemap: ${SITEMAP_URL}\n`);

  try {
    // Ping tous les moteurs de recherche en parallèle
    const results = await Promise.allSettled([
      pingSearchEngine("Google", SEARCH_ENGINES.google),
      pingSearchEngine("Bing", SEARCH_ENGINES.bing),
    ]);

    console.log("\n📊 Résultats:");
    results.forEach((result, index) => {
      const engineName = Object.keys(SEARCH_ENGINES)[index];
      if (result.status === "fulfilled") {
        console.log(`  ✅ ${engineName}: Succès`);
      } else {
        console.log(`  ❌ ${engineName}: Échec - ${result.reason.message}`);
      }
    });

    console.log("\n🎉 Notification terminée !");
    console.log("\n💡 Conseils:");
    console.log("  - Vérifiez Google Search Console pour le statut du sitemap");
    console.log(
      "  - Attendez 24-48h pour voir les changements dans l'indexation"
    );
    console.log("  - Utilisez site:knweb.agency pour vérifier l'indexation");
  } catch (error) {
    console.error("❌ Erreur générale:", error);
    process.exit(1);
  }
}

// Exécution du script
if (require.main === module) {
  pingAllSearchEngines();
}

module.exports = { pingAllSearchEngines, SITEMAP_URL };
