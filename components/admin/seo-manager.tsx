"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RefreshCw,
  Search,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

interface SEOReport {
  timestamp: string;
  siteUrl: string;
  seoScore: number;
  summary: {
    totalPages: number;
    successfulPages: number;
    failedPages: number;
    technicalFiles: {
      total: number;
      successful: number;
      failed: number;
    };
  };
  pages: {
    successful: Array<{ url: string; status: number; ok: boolean }>;
    failed: Array<{ url: string; status: number; ok: boolean; error?: string }>;
  };
  technical: {
    successful: Array<{ url: string; status: number; ok: boolean }>;
    failed: Array<{ url: string; status: number; ok: boolean; error?: string }>;
  };
  recommendations: Array<{
    type: "success" | "warning" | "error";
    message: string;
    action: string;
  }>;
  googleIndexation: {
    searchQuery: string;
    checkUrl: string;
    note: string;
  };
}

export default function SEOManager() {
  const [report, setReport] = useState<SEOReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [pinging, setPinging] = useState(false);
  const [lastPing, setLastPing] = useState<any>(null);

  const checkSEO = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/seo/check");
      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error("Erreur lors de la vérification SEO:", error);
    } finally {
      setLoading(false);
    }
  };

  const pingSearchEngines = async () => {
    setPinging(true);
    try {
      const response = await fetch("/api/seo/ping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLastPing(data);
    } catch (error) {
      console.error("Erreur lors du ping:", error);
    } finally {
      setPinging(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestionnaire SEO</h1>
          <p className="text-muted-foreground">
            Surveillez et optimisez le référencement de votre site
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={checkSEO} disabled={loading} variant="outline">
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Vérifier SEO
          </Button>
          <Button onClick={pingSearchEngines} disabled={pinging}>
            <Globe
              className={`w-4 h-4 mr-2 ${pinging ? "animate-spin" : ""}`}
            />
            Notifier Google/Bing
          </Button>
        </div>
      </div>

      {/* Score SEO */}
      {report && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Score SEO Global
            </CardTitle>
            <CardDescription>
              Dernière vérification :{" "}
              {new Date(report.timestamp).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div
                className={`text-4xl font-bold ${getScoreColor(
                  report.seoScore
                )}`}
              >
                {report.seoScore}%
              </div>
              <div className="space-y-1">
                <div>
                  Pages accessibles : {report.summary.successfulPages}/
                  {report.summary.totalPages}
                </div>
                <div>
                  Fichiers techniques :{" "}
                  {report.summary.technicalFiles.successful}/
                  {report.summary.technicalFiles.total}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Résultats du ping */}
      {lastPing && (
        <Alert>
          <Globe className="w-4 h-4" />
          <AlertDescription>
            Notification envoyée aux moteurs de recherche. Succès :{" "}
            {lastPing.results?.successful?.length || 0}, Échecs :{" "}
            {lastPing.results?.failed?.length || 0}
          </AlertDescription>
        </Alert>
      )}

      {/* Détails du rapport */}
      {report && (
        <Tabs defaultValue="pages" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="technical">Fichiers techniques</TabsTrigger>
            <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
            <TabsTrigger value="indexation">Indexation Google</TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Pages réussies */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Pages accessibles ({report.pages.successful.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {report.pages.successful.map((page, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-green-50 rounded"
                    >
                      <code className="text-sm">{page.url}</code>
                      <Badge variant="secondary">{page.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pages en erreur */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Pages en erreur ({report.pages.failed.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {report.pages.failed.length === 0 ? (
                    <p className="text-muted-foreground">
                      Aucune erreur détectée ✨
                    </p>
                  ) : (
                    report.pages.failed.map((page, index) => (
                      <div key={index} className="p-2 bg-red-50 rounded">
                        <div className="flex items-center justify-between">
                          <code className="text-sm">{page.url}</code>
                          <Badge variant="destructive">{page.status}</Badge>
                        </div>
                        {page.error && (
                          <p className="text-xs text-red-600 mt-1">
                            {page.error}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Fichiers techniques OK */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Fichiers accessibles ({report.technical.successful.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {report.technical.successful.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-green-50 rounded"
                    >
                      <code className="text-sm">{file.url}</code>
                      <Badge variant="secondary">{file.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Fichiers techniques en erreur */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Fichiers en erreur ({report.technical.failed.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {report.technical.failed.length === 0 ? (
                    <p className="text-muted-foreground">
                      Aucune erreur détectée ✨
                    </p>
                  ) : (
                    report.technical.failed.map((file, index) => (
                      <div key={index} className="p-2 bg-red-50 rounded">
                        <div className="flex items-center justify-between">
                          <code className="text-sm">{file.url}</code>
                          <Badge variant="destructive">{file.status}</Badge>
                        </div>
                        {file.error && (
                          <p className="text-xs text-red-600 mt-1">
                            {file.error}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommandations SEO</CardTitle>
                <CardDescription>
                  Actions à effectuer pour améliorer votre référencement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {report.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg"
                  >
                    {getRecommendationIcon(rec.type)}
                    <div className="flex-grow">
                      <p className="font-medium">{rec.message}</p>
                      <p className="text-sm text-muted-foreground">
                        {rec.action}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="indexation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vérification indexation Google</CardTitle>
                <CardDescription>
                  Vérifiez manuellement quelles pages Google a indexées
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium mb-2">Requête de recherche :</p>
                  <code className="text-sm bg-white p-2 rounded border block">
                    {report.googleIndexation.searchQuery}
                  </code>
                </div>

                <Button asChild variant="outline">
                  <a
                    href={report.googleIndexation.checkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Vérifier dans Google
                  </a>
                </Button>

                <Alert>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    {report.googleIndexation.note}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Instructions initiales */}
      {!report && !loading && (
        <Card>
          <CardHeader>
            <CardTitle>🚀 Commencez par vérifier votre SEO</CardTitle>
            <CardDescription>
              Cliquez sur "Vérifier SEO" pour analyser l'état de votre site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Vérification de l'accessibilité de toutes les pages</p>
              <p>• Contrôle des fichiers techniques (sitemap, robots.txt)</p>
              <p>• Recommandations d'amélioration personnalisées</p>
              <p>• Outils de notification des moteurs de recherche</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
