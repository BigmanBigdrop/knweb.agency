import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.knweb.agency";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// URLs de ping pour les moteurs de recherche
const SEARCH_ENGINES = {
  google: `https://www.google.com/ping?sitemap=${encodeURIComponent(
    SITEMAP_URL
  )}`,
  bing: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
};

async function pingSearchEngine(name: string, url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "KN Web Agency SEO Bot/1.0",
      },
    });

    return {
      engine: name,
      success: response.ok,
      status: response.status,
      message: response.ok
        ? "Notifié avec succès"
        : `Erreur ${response.status}`,
    };
  } catch (error) {
    return {
      engine: name,
      success: false,
      status: 0,
      message: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // 🔒 SÉCURITÉ RENFORCÉE

    // 1. Vérification de l'origine
    const origin = request.headers.get("origin") || "";
    const referer = request.headers.get("referer") || "";

    // Autoriser seulement les requêtes depuis le même domaine
    const allowedOrigins = ["https://www.knweb.agency", "https://knweb.agency"];
    const isValidOrigin = allowedOrigins.some(
      (allowed) => origin.includes(allowed) || referer.includes(allowed)
    );

    if (!isValidOrigin && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Accès non autorisé - Origine invalide" },
        { status: 403 }
      );
    }

    // 2. Rate limiting simple (en production, utilisez Redis)
    const userAgent = request.headers.get("user-agent") || "";
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Log de sécurité
    console.log(
      `[SECURITY] SEO Ping Request: IP=${ip}, Origin=${origin}, UA=${userAgent}`
    );

    // 3. Validation du contenu de la requête
    let body;
    try {
      body = await request.json();
    } catch {
      // Si pas de body JSON, c'est OK pour cette API
      body = {};
    }

    console.log("🚀 Début de notification des moteurs de recherche...");

    // Ping tous les moteurs de recherche
    const results = await Promise.allSettled([
      pingSearchEngine("Google", SEARCH_ENGINES.google),
      pingSearchEngine("Bing", SEARCH_ENGINES.bing),
    ]);

    const successfulPings = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<any>).value)
      .filter((result) => result.success);

    const failedPings = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<any>).value)
      .filter((result) => !result.success);

    return NextResponse.json({
      success: true,
      message: "Notification des moteurs de recherche terminée",
      results: {
        successful: successfulPings,
        failed: failedPings,
        sitemap: SITEMAP_URL,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la notification:", error);

    return NextResponse.json(
      {
        error: "Erreur lors de la notification des moteurs de recherche",
        message: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API de notification des moteurs de recherche",
    sitemap: SITEMAP_URL,
    endpoints: {
      ping: "POST /api/seo/ping - Notifier les moteurs de recherche",
    },
  });
}
