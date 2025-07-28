import React from "react";

interface StructuredDataProps {
  type?: "Organization" | "LocalBusiness" | "WebSite" | "Service" | "FAQPage";
  data?: any;
}

export default function StructuredData({
  type = "Organization",
  data,
}: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case "Organization":
        return {
          ...baseData,
          "@type": "Organization",
          name: "KN Web Agency",
          legalName: "KN Web Agency",
          description:
            "Agence web leader en Côte d'Ivoire spécialisée dans la création de sites web modernes et solutions digitales pour PME.",
          url: "https://knweb.agency",
          logo: "https://knweb.agency/logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+225-XX-XX-XX-XX",
            contactType: "customer service",
            availableLanguage: ["French"],
            areaServed: "CI",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Abidjan",
            addressCountry: "CI",
            addressRegion: "Lagunes",
          },
          sameAs: [
            "https://twitter.com/knwebagency",
            "https://linkedin.com/company/knwebagency",
            "https://facebook.com/knwebagency",
          ],
          foundingDate: "2024",
          numberOfEmployees: "2-10",
          industry: "Web Development and Digital Services",
          ...data,
        };

      case "LocalBusiness":
        return {
          ...baseData,
          "@type": "LocalBusiness",
          "@id": "https://knweb.agency",
          name: "KN Web Agency",
          description:
            "Agence web #1 à Abidjan pour la création de sites internet et solutions digitales.",
          url: "https://knweb.agency",
          telephone: "+225-XX-XX-XX-XX",
          email: "contact@knweb.agency",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Abidjan",
            addressLocality: "Abidjan",
            addressRegion: "Lagunes",
            addressCountry: "CI",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "5.3599517",
            longitude: "-4.0082563",
          },
          openingHours: "Mo-Fr 08:00-18:00",
          priceRange: "$$",
          servesCuisine: null,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "50+",
          },
          ...data,
        };

      case "WebSite":
        return {
          ...baseData,
          "@type": "WebSite",
          name: "KN Web Agency",
          url: "https://knweb.agency",
          description:
            "Site officiel de KN Web Agency - Agence web leader en Côte d'Ivoire",
          publisher: {
            "@type": "Organization",
            name: "KN Web Agency",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: "https://knweb.agency/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
          ...data,
        };

      case "Service":
        return {
          ...baseData,
          "@type": "Service",
          name: "Création de Sites Web",
          description:
            "Services de création de sites web modernes et responsives pour PME en Côte d'Ivoire",
          provider: {
            "@type": "Organization",
            name: "KN Web Agency",
            url: "https://knweb.agency",
          },
          areaServed: {
            "@type": "Country",
            name: "Côte d'Ivoire",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services Web",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Création Site Vitrine",
                  description:
                    "Site web professionnel pour présenter votre entreprise",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Site E-commerce",
                  description:
                    "Boutique en ligne complète avec paiement sécurisé",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Application Mobile",
                  description: "Application mobile native ou hybride",
                },
              },
            ],
          },
          ...data,
        };

      case "FAQPage":
        return {
          ...baseData,
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Combien coûte un site web à Abidjan ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Nos tarifs débutent à partir de 250 000 FCFA pour un site vitrine et 500 000 FCFA pour un site e-commerce. Le prix final dépend de vos besoins spécifiques.",
              },
            },
            {
              "@type": "Question",
              name: "Combien de temps pour créer un site web ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "En moyenne, nous livrons un site vitrine en 2-3 semaines et un site e-commerce en 4-6 semaines après validation du cahier des charges.",
              },
            },
            {
              "@type": "Question",
              name: "Proposez-vous la maintenance de sites web ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, nous proposons des contrats de maintenance incluant les mises à jour, la sécurité, les sauvegardes et le support technique.",
              },
            },
          ],
          ...data,
        };

      default:
        return baseData;
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}
