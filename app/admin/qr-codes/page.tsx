"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Download, QrCode, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QRCodeLib from "qrcode";

export default function QRCodesPage() {
  const [qrCEO, setQrCEO] = useState<string>("");
  const [qrCTO, setQrCTO] = useState<string>("");
  const [copiedCEO, setCopiedCEO] = useState(false);
  const [copiedCTO, setCopiedCTO] = useState(false);
  const canvasCEORef = useRef<HTMLCanvasElement>(null);
  const canvasCTORef = useRef<HTMLCanvasElement>(null);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://www.knweb.agency";
  const ceoUrl = `${baseUrl}/connect/ceo`;
  const ctoUrl = `${baseUrl}/connect/cto`;

  useEffect(() => {
    generateQRCodes();
  }, []);

  const generateQRCodes = async () => {
    try {
      // Options pour QR codes de haute qualité
      const options = {
        errorCorrectionLevel: "H" as const, // Haute correction d'erreur (permet logo au centre)
        type: "image/png" as const,
        quality: 1,
        margin: 2,
        width: 1000, // Haute résolution pour impression
        color: {
          dark: "#ffffff", // QR code en blanc
          light: "#000000", // Fond noir
        },
      };

      // Générer QR Code CEO
      if (canvasCEORef.current) {
        await QRCodeLib.toCanvas(canvasCEORef.current, ceoUrl, options);
        const ceoDataUrl = canvasCEORef.current.toDataURL("image/png");
        setQrCEO(ceoDataUrl);
      }

      // Générer QR Code CTO
      if (canvasCTORef.current) {
        await QRCodeLib.toCanvas(canvasCTORef.current, ctoUrl, options);
        const ctoDataUrl = canvasCTORef.current.toDataURL("image/png");
        setQrCTO(ctoDataUrl);
      }
    } catch (error) {
      console.error("Erreur génération QR codes:", error);
    }
  };

  const downloadQRCode = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async (text: string, type: "ceo" | "cto") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "ceo") {
        setCopiedCEO(true);
        setTimeout(() => setCopiedCEO(false), 2000);
      } else {
        setCopiedCTO(true);
        setTimeout(() => setCopiedCTO(false), 2000);
      }
    } catch (error) {
      console.error("Erreur copie:", error);
    }
  };

  const qrCards = [
    {
      title: "QR Code CEO",
      description: "Ange M. Kouame - CEO & Responsable Commercial",
      url: ceoUrl,
      qrImage: qrCEO,
      canvasRef: canvasCEORef,
      filename: "qr-code-ceo-knweb-agency.png",
      copied: copiedCEO,
      onCopy: () => copyToClipboard(ceoUrl, "ceo"),
      color: "from-purple-500 to-blue-500",
    },
    {
      title: "QR Code CTO",
      description: "Marshall Christ T. N'Guessan - CTO & Lead Developer",
      url: ctoUrl,
      qrImage: qrCTO,
      canvasRef: canvasCTORef,
      filename: "qr-code-cto-knweb-agency.png",
      copied: copiedCTO,
      onCopy: () => copyToClipboard(ctoUrl, "cto"),
      color: "from-blue-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading">Générateur QR Codes</h1>
              <p className="text-muted-foreground">Cartes de visite KN Web Agency</p>
            </div>
          </div>

          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">ℹ</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Instructions pour l'impression
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Résolution: 1000x1000px (300 DPI pour impression)</li>
                    <li>• Taille recommandée sur carte: 2x2 cm minimum</li>
                    <li>• Format: PNG avec fond transparent possible</li>
                    <li>• Correction d'erreur: Niveau H (permet ajout logo au centre)</li>
                    <li>• Couleur: Blanc sur fond noir (inversé)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* QR Codes Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {qrCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
                <CardHeader className={`bg-gradient-to-r ${card.color} text-white`}>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-white/90">
                    {card.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6">
                  {/* QR Code Preview */}
                  <div className="bg-black rounded-xl p-8 mb-6 flex items-center justify-center shadow-inner">
                    <div className="relative">
                      {/* Hidden canvas for generation */}
                      <canvas
                        ref={card.canvasRef}
                        className="hidden"
                      />

                      {/* Displayed QR Code */}
                      {card.qrImage && (
                        <img
                          src={card.qrImage}
                          alt={card.title}
                          className="w-64 h-64 rounded-lg"
                        />
                      )}

                      {!card.qrImage && (
                        <div className="w-64 h-64 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
                          <QrCode className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* URL Display */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      URL de destination
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={card.url}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={card.onCopy}
                        className="flex-shrink-0"
                      >
                        {card.copied ? (
                          <>
                            <Check className="w-4 h-4 mr-2 text-green-600" />
                            Copié
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copier
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Download Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => downloadQRCode(card.qrImage, card.filename)}
                      disabled={!card.qrImage}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white group"
                    >
                      <Download className="w-4 h-4 mr-2 group-hover:translate-y-1 transition-transform" />
                      Télécharger QR Code (PNG)
                    </Button>

                    <div className="flex gap-2 text-xs text-muted-foreground items-center justify-center">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        1000x1000px
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Haute qualité
                      </Badge>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Prêt à imprimer
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Conseils d'utilisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    Pour l'impression
                  </h3>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li>• Testez toujours le QR code avant l'impression finale</li>
                    <li>• Utilisez un papier de qualité (300g minimum)</li>
                    <li>• Gardez un bon contraste (QR blanc sur fond noir)</li>
                    <li>• Ne réduisez pas en dessous de 2x2 cm</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Personnalisation avancée
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Vous pouvez ajouter votre logo au centre (max 30% taille)</li>
                    <li>• Utilisez Canva ou Photoshop pour personnaliser</li>
                    <li>• Gardez la correction d'erreur de niveau H</li>
                    <li>• Testez sur plusieurs appareils après modification</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                      QR Codes prêts à l'emploi
                    </h3>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Ces QR codes sont optimisés pour les cartes de visite et pointent directement vers vos pages de contact personnalisées. Ils incluent une correction d'erreur élevée et peuvent être scannés même avec 30% de dommage.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
