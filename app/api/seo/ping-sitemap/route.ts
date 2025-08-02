import { NextRequest, NextResponse } from "next/server";

const SITE_URL = "https://www.knweb.agency";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// Fonction pour notifier un moteur de recherche
async function pingSearchEngine(
  name: string,
  url: string
): Promise<{
  name: string;
  success: boolean;
  status?: number;
  error?: string;
}> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "KN Web Agency Sitemap Notifier",
      },
    });

    return {
      name,
      success: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      name,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'autorisation (optionnel - ajoutez votre logique d'auth)
    const authHeader = request.headers.get("authorization");
    // Exemple: if (authHeader !== 'Bearer your-secret-key') { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

    // URLs de ping pour les moteurs de recherche
    const searchEngines = {
      google: `https://www.google.com/ping?sitemap=${encodeURIComponent(
        SITEMAP_URL
      )}`,
      bing: `https://www.bing.com/ping?sitemap=${encodeURIComponent(
        SITEMAP_URL
      )}`,
    };

    // Ping tous les moteurs de recherche
    const results = await Promise.allSettled([
      pingSearchEngine("Google", searchEngines.google),
      pingSearchEngine("Bing", searchEngines.bing),
    ]);

    // Traiter les résultats
    const processedResults = results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return {
          name: "Unknown",
          success: false,
          error: result.reason?.message || "Promise rejected",
        };
      }
    });

    const successCount = processedResults.filter((r) => r.success).length;
    const totalCount = processedResults.length;

    return NextResponse.json({
      success: true,
      message: `Sitemap notifié avec succès à ${successCount}/${totalCount} moteurs de recherche`,
      sitemap: SITEMAP_URL,
      timestamp: new Date().toISOString(),
      results: processedResults,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la notification des moteurs de recherche:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la notification des moteurs de recherche",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API de notification des moteurs de recherche",
    sitemap: SITEMAP_URL,
    usage:
      "Envoyez une requête POST pour notifier les moteurs de recherche de la mise à jour du sitemap",
    endpoints: {
      google: `https://www.google.com/ping?sitemap=${encodeURIComponent(
        SITEMAP_URL
      )}`,
      bing: `https://www.bing.com/ping?sitemap=${encodeURIComponent(
        SITEMAP_URL
      )}`,
    },
  });
}
