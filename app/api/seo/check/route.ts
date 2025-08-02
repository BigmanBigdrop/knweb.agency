import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.knweb.agency";

// Types
interface CheckResult {
  url: string;
  status: number;
  ok: boolean;
  headers?: {
    contentType: string | null;
    lastModified: string | null;
    cacheControl: string | null;
  };
  error?: string;
}

interface Recommendation {
  type: "error" | "warning" | "success";
  message: string;
  action: string;
}

// Pages principales à vérifier
const MAIN_PAGES = [
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

async function checkUrl(url: string): Promise<CheckResult> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: {
        "User-Agent": "KN Web Agency SEO Checker/1.0",
      },
    });

    return {
      url,
      status: response.status,
      ok: response.ok,
      headers: {
        contentType: response.headers.get("content-type"),
        lastModified: response.headers.get("last-modified"),
        cacheControl: response.headers.get("cache-control"),
      },
    };
  } catch (error) {
    return {
      url,
      status: 0,
      ok: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}

async function checkGoogleIndexation() {
  try {
    // Vérifier si Google connaît le site
    const searchQuery = `site:${SITE_URL.replace("https://", "").replace(
      "http://",
      ""
    )}`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      searchQuery
    )}`;

    return {
      searchQuery,
      checkUrl: googleSearchUrl,
      note: "Vérifiez manuellement cette URL pour voir les pages indexées",
    };
  } catch (error) {
    return {
      error: "Impossible de vérifier l'indexation Google automatiquement",
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Vérification SEO en cours...");

    // Vérifier toutes les pages principales
    const pageChecks = await Promise.allSettled(
      MAIN_PAGES.map((page) => checkUrl(`${SITE_URL}${page}`))
    );

    // Vérifier les fichiers techniques
    const technicalChecks = await Promise.allSettled(
      TECHNICAL_FILES.map((file) => checkUrl(`${SITE_URL}${file}`))
    );

    // Analyser les résultats
    const pageResults: CheckResult[] = pageChecks
      .map((result) => (result.status === "fulfilled" ? result.value : null))
      .filter((result): result is CheckResult => result !== null);

    const technicalResults: CheckResult[] = technicalChecks
      .map((result) => (result.status === "fulfilled" ? result.value : null))
      .filter((result): result is CheckResult => result !== null);

    const successfulPages = pageResults.filter((result) => result.ok);
    const failedPages = pageResults.filter((result) => !result.ok);

    const successfulTechnical = technicalResults.filter((result) => result.ok);
    const failedTechnical = technicalResults.filter((result) => !result.ok);

    // Vérifications supplémentaires
    const googleIndexation = await checkGoogleIndexation();

    // Calcul du score SEO
    const totalChecks = pageResults.length + technicalResults.length;
    const successfulChecks =
      successfulPages.length + successfulTechnical.length;
    const seoScore = Math.round((successfulChecks / totalChecks) * 100);

    const report = {
      timestamp: new Date().toISOString(),
      siteUrl: SITE_URL,
      seoScore,
      summary: {
        totalPages: pageResults.length,
        successfulPages: successfulPages.length,
        failedPages: failedPages.length,
        technicalFiles: {
          total: technicalResults.length,
          successful: successfulTechnical.length,
          failed: failedTechnical.length,
        },
      },
      pages: {
        successful: successfulPages,
        failed: failedPages,
      },
      technical: {
        successful: successfulTechnical,
        failed: failedTechnical,
      },
      recommendations: [] as Recommendation[],
      googleIndexation,
    };

    // Générer des recommandations
    if (failedPages.length > 0) {
      report.recommendations.push({
        type: "error",
        message: `${failedPages.length} page(s) inaccessible(s) détectée(s)`,
        action: "Vérifier et corriger les pages en erreur",
      });
    }

    if (failedTechnical.length > 0) {
      report.recommendations.push({
        type: "error",
        message: `${failedTechnical.length} fichier(s) technique(s) inaccessible(s)`,
        action: "Vérifier la configuration du serveur",
      });
    }

    if (seoScore === 100) {
      report.recommendations.push({
        type: "success",
        message: "Excellente configuration SEO technique !",
        action: "Continuer le monitoring régulier",
      });
    }

    if (seoScore < 90) {
      report.recommendations.push({
        type: "warning",
        message: "Améliorations SEO possibles",
        action: "Corriger les erreurs détectées pour améliorer le score",
      });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Erreur lors de la vérification SEO:", error);

    return NextResponse.json(
      {
        error: "Erreur lors de la vérification SEO",
        message: error instanceof Error ? error.message : "Erreur inconnue",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
