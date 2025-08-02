import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Offres - Sites Web et Applications | KN Web Agency Abidjan",
  description:
    "Découvrez nos forfaits création de sites web à partir de 49,000 FCFA. Site vitrine, application web, solution sur-mesure. Hébergement inclus, support 3 mois. Abidjan, Côte d'Ivoire.",
  keywords: [
    "création site web Abidjan",
    "KN web agency",
    "kn web",
    "offres création site web",

    "développement web Côte d'Ivoire",
    "site vitrine professionnel",
    "application web sur mesure",
    "agence web Abidjan",
    "tarif site internet",
    "forfait développement web",
    "Next.js TypeScript",
    "SEO optimisation",
    "hébergement web inclus",
  ].join(", "),
  authors: [{ name: "KN Web Agency" }],
  creator: "KN Web Agency",
  publisher: "KN Web Agency",
  alternates: {
    canonical: "https://www.knweb.agency/offres",
  },
  openGraph: {
    title: "Nos Offres - Sites Web et Applications | KN Web Agency",
    description:
      "Forfaits création de sites web à partir de 49,000 FCFA. Site vitrine, application web, solution sur-mesure. Hébergement inclus.",
    url: "https://www.knweb.agency/offres",
    siteName: "KN Web Agency",
    locale: "fr_CI",
    type: "website",
    images: [
      {
        url: "https://www.knweb.agency/og-offres.jpg",
        width: 1200,
        height: 630,
        alt: "Nos offres de création de sites web - KN Web Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Offres - Sites Web et Applications | KN Web Agency",
    description:
      "Forfaits création de sites web à partir de 49,000 FCFA. Site vitrine, application web, solution sur-mesure.",
    images: ["https://www.knweb.agency/og-offres.jpg"],
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
};

export default function OffresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data pour les offres */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Nos Offres - KN Web Agency",
            description:
              "Découvrez nos forfaits de création de sites web et applications sur mesure",
            url: "https://www.knweb.agency/offres",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: "Forfait Starter",
                  description:
                    "Site vitrine professionnel avec les fonctionnalités essentielles",
                  price: "49000",
                  priceCurrency: "XOF",
                  priceValidUntil: "2025-12-31",
                  availability: "https://schema.org/InStock",
                  category: "Site Web Vitrine",
                  offeredBy: {
                    "@type": "Organization",
                    name: "KN Web Agency",
                    url: "https://www.knweb.agency",
                  },
                  itemOffered: {
                    "@type": "Service",
                    name: "Création Site Web Vitrine",
                    description:
                      "Site responsive 3-5 pages avec SEO et hébergement inclus",
                  },
                },
                {
                  "@type": "Offer",
                  name: "Forfait Pro",
                  description:
                    "Application web complète avec fonctionnalités avancées",
                  price: "100000",
                  priceCurrency: "XOF",
                  priceValidUntil: "2025-12-31",
                  availability: "https://schema.org/InStock",
                  category: "Application Web",
                  offeredBy: {
                    "@type": "Organization",
                    name: "KN Web Agency",
                    url: "https://www.knweb.agency",
                  },
                  itemOffered: {
                    "@type": "Service",
                    name: "Développement Application Web",
                    description:
                      "Application sur mesure avec interface admin et base de données",
                  },
                },
                {
                  "@type": "Offer",
                  name: "Solution Sur-mesure",
                  description:
                    "Solution entièrement personnalisée selon vos besoins spécifiques",
                  price: "0",
                  priceCurrency: "XOF",
                  priceValidUntil: "2025-12-31",
                  availability: "https://schema.org/InStock",
                  category: "Développement Sur-mesure",
                  offeredBy: {
                    "@type": "Organization",
                    name: "KN Web Agency",
                    url: "https://www.knweb.agency",
                  },
                  itemOffered: {
                    "@type": "Service",
                    name: "Développement Sur-mesure",
                    description:
                      "Architecture technique personnalisée avec accompagnement long terme",
                  },
                },
              ],
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Accueil",
                  item: "https://www.knweb.agency",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Nos Offres",
                  item: "https://www.knweb.agency/offres",
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
