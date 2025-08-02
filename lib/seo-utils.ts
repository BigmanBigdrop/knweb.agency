import { type Metadata } from "next";

interface GenerateMetadataProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
}

export function generateSEOMetadata({
  title,
  description,
  path = "",
  keywords = [],
  image = "/og-image.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
  authors = ["KN Web Agency"],
  section = "web-development",
}: GenerateMetadataProps): Metadata {
  const baseUrl = "https://www.knweb.agency";
  const fullUrl = `${baseUrl}${path}`;
  const fullImageUrl = `${baseUrl}${image}`;

  // Mots-clés par défaut pour le SEO local
  const defaultKeywords = [
    "KN Web Agency",
    "agence web Abidjan",
    "développement web Côte d'Ivoire",
    "création site internet Abidjan",
    "SEO Abidjan",
  ];

  const allKeywords = [...defaultKeywords, ...keywords];

  return {
    title,
    description,
    keywords: allKeywords,
    authors: authors.map((name) => ({ name })),
    creator: "KN Web Agency",
    publisher: "KN Web Agency",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: type as any,
      locale: "fr_CI",
      url: fullUrl,
      siteName: "KN Web Agency",
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors.length > 0 && { authors }),
      ...(section && { section }),
    },
    twitter: {
      card: "summary_large_image",
      site: "@knwebagency",
      creator: "@knwebagency",
      title,
      description,
      images: [fullImageUrl],
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
      google: "dtuNrnloo4nfQAdR1vvUY9RuzvNbfsh0-q7qAzdgEIo",
    },
    other: {
      "geo.region": "CI-AB",
      "geo.placename": "Abidjan",
      "geo.position": "5.3599517;-4.0082563",
      ICBM: "5.3599517, -4.0082563",
    },
  };
}

// Schema.org structuré pour l'organisation
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KN Web Agency",
  description:
    "Agence web leader en Côte d'Ivoire spécialisée dans la création de sites web modernes, applications mobiles et solutions e-commerce.",
  url: "https://www.knweb.agency",
  logo: "https://www.knweb.agency/logo-dark.png",
  image: "https://www.knweb.agency/og-image.jpg",
  email: "contact@knweb.agency",
  telephone: "+225-XX-XX-XX-XX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Abidjan",
    addressRegion: "Abidjan",
    addressCountry: "CI",
    addressLocality: "Abidjan",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "5.3599517",
    longitude: "-4.0082563",
  },
  areaServed: {
    "@type": "Country",
    name: "Côte d'Ivoire",
  },
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "5.3599517",
      longitude: "-4.0082563",
    },
    geoRadius: "100000", // 100km autour d'Abidjan
  },
  sameAs: [
    "https://www.linkedin.com/company/knwebagency",
    "https://www.facebook.com/knwebagency",
    "https://twitter.com/knwebagency",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+225-XX-XX-XX-XX",
    contactType: "customer service",
    availableLanguage: ["French"],
    areaServed: "CI",
  },
  foundingDate: "2022",
  numberOfEmployees: "2-10",
  slogan: "Votre partenaire digital en Côte d'Ivoire",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services Web KN Web Agency",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Création de sites web vitrines",
          description: "Sites web modernes et responsive pour entreprises",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Développement e-commerce",
          description: "Boutiques en ligne complètes avec système de paiement",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Applications web",
          description: "Applications web sur mesure pour entreprises",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Optimisation SEO",
          description: "Amélioration du référencement naturel",
        },
      },
    ],
  },
};

// Schema pour les services
export const webDevelopmentServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Développement Web en Côte d'Ivoire",
  description:
    "Services de création de sites web professionnels, e-commerce et applications web à Abidjan",
  provider: {
    "@type": "Organization",
    name: "KN Web Agency",
  },
  areaServed: {
    "@type": "Country",
    name: "Côte d'Ivoire",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de développement web",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Site Vitrine",
          description: "À partir de 250.000 FCFA",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-commerce",
          description: "À partir de 500.000 FCFA",
        },
      },
    ],
  },
};
