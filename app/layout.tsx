import type React from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Analytics } from "@/lib/analytics";
import { Suspense } from "react";

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
    default: "KN Web Agency - Agence Web à Abidjan, Côte d'Ivoire",
    template: "%s | KN Web Agency",
  },
  description:
    "🥇 Agence web leader en Côte d'Ivoire. Création de sites web, applications mobiles et solutions digitales pour PME à Abidjan. Devis gratuit 24h.",
  keywords: [
    "agence web Abidjan",
    "création site web Côte d'Ivoire",
    "développement web Abidjan",
    "site internet PME Abidjan",
    "agence digitale Cocody",
    "création site vitrine Abidjan",
    "développeur web Côte d'Ivoire",
    "site e-commerce Abidjan",
  ],
  authors: [{ name: "KN Web Agency" }],
  creator: "KN Web Agency",
  publisher: "KN Web Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://knweb.agency"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: "https://knweb.agency",
    siteName: "KN Web Agency",
    title: "KN Web Agency - Agence Web à Abidjan, Côte d'Ivoire",
    description:
      "🥇 Agence web leader en Côte d'Ivoire. Création de sites web, applications mobiles et solutions digitales pour PME à Abidjan. Devis gratuit 24h.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KN Web Agency - Agence Web Abidjan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KN Web Agency - Agence Web #1 à Abidjan",
    description:
      "🥇 Création de sites web et solutions digitales en Côte d'Ivoire",
    images: ["/og-image.jpg"],
    creator: "@knwebagency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
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
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
            </div>
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
