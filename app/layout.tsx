import type React from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AnalyticsTracker from "@/components/analytics-tracker";
import StructuredData from "@/components/structured-data";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import ConditionalLayout from "@/components/conditional-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default:
      "KN Web Agency - Solutions Digitales Sur-Mesure à Abidjan | Développement Web Côte d'Ivoire",
    template: "%s | KN Web Agency",
  },
  description:
    "Partenaire digital des PME ivoiriennes. Nous transformons vos processus métier en solutions web performantes - Sites vitrines, applications de gestion, plateformes sur-mesure. Devis gratuit sous 24h - contact@knweb.agency",
  keywords: [
    "agence web Abidjan",
    "création site web Côte d'Ivoire",
    "développement web Abidjan",
    "site internet PME Abidjan",
    "agence digitale Cocody",
    "création site vitrine Abidjan",
    "développeur web Côte d'Ivoire",
    "site e-commerce Abidjan",
    "KN Web Agency",
    "agence web 225",
    "création site internet Yamoussoukro",
    "développement application mobile Abidjan",
    "SEO Côte d'Ivoire",
    "marketing digital Abidjan",
    "site responsive Abidjan",
    "hébergement web Côte d'Ivoire",
  ],
  authors: [{ name: "KN Web Agency", url: "https://www.knweb.agency" }],
  creator: "KN Web Agency",
  publisher: "KN Web Agency",
  category: "Technology",
  classification: "Business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.knweb.agency"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-CI": "/fr",
      fr: "/fr",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: "https://www.knweb.agency",
    siteName: "KN Web Agency",
    title: "KN Web Agency - Partenaire Digital des PME à Abidjan",
    description:
      "Transformons vos processus métier en solutions web performantes. Sites vitrines, applications de gestion, plateformes sur-mesure. Devis gratuit 24h",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KN Web Agency - Agence Web Abidjan Côte d'Ivoire",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 800,
        height: 800,
        alt: "KN Web Agency Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@knwebagency",
    creator: "@knwebagency",
    title: "KN Web Agency - Partenaire Digital des PME à Abidjan",
    description:
      "Solutions web sur-mesure pour PME ivoiriennes - Sites vitrines, applications de gestion, plateformes digitales. Devis gratuit sous 24h",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  verification: {
    google: "dtuNrnloo4nfQAdR1vvUY9RuzvNbfsh0-q7qAzdgEIo",
    yandex: "votre-code-yandex",
  },
  other: {
    "msapplication-TileColor": "#7c3aed",
    "theme-color": "#ffffff",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "msvalidate.01": "0AE24A45880A6D3338868D805DA88F53",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${plusJakarta.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="kn-web-agency-theme"
        >
          <Suspense fallback={null}>
            <StructuredData type="Organization" />
            <StructuredData type="WebSite" />
            <ConditionalLayout>{children}</ConditionalLayout>
            <AnalyticsTracker />
            <Toaster position="top-right" richColors />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
