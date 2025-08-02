import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plan du Site - KN Web Agency | Toutes nos Pages Web",
  description:
    "📍 Plan complet du site KN Web Agency. Accédez rapidement à toutes nos pages : services, projets, blog, contact. Navigation simplifiée.",
  keywords: [
    "plan du site KN Web Agency",
    "sitemap KN Web Agency",
    "toutes les pages",
    "navigation site web",
    "index pages web Abidjan",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Plan du Site - Toutes nos Pages | KN Web Agency",
    description:
      "📍 Naviguez facilement sur notre site grâce à ce plan complet. Trouvez rapidement l'information que vous cherchez.",
    url: "https://www.knweb.agency/plan-du-site",
  },
};

export default function PlanDuSitePage() {
  const siteStructure = [
    {
      title: "Pages principales",
      pages: [
        {
          name: "Accueil",
          url: "/",
          description: "Page d'accueil de KN Web Agency",
        },
        {
          name: "Services",
          url: "/services",
          description:
            "Nos services web : sites vitrines, e-commerce, applications",
        },
        {
          name: "Offres et Tarifs",
          url: "/offres",
          description: "Découvrez nos offres et tarifs transparents",
        },
        {
          name: "Projets",
          url: "/projets",
          description: "Portfolio de nos réalisations web",
        },
        {
          name: "À Propos",
          url: "/a-propos",
          description: "Notre équipe et notre histoire",
        },
        {
          name: "Blog",
          url: "/blog",
          description: "Conseils et actualités web",
        },
        {
          name: "Contact",
          url: "/contact",
          description: "Contactez-nous pour votre projet",
        },
      ],
    },
    {
      title: "Pages légales",
      pages: [
        {
          name: "Mentions Légales",
          url: "/mentions-legales",
          description: "Informations légales de l'entreprise",
        },
        {
          name: "Politique de Confidentialité",
          url: "/politique-confidentialite",
          description: "Protection de vos données personnelles",
        },
      ],
    },
    {
      title: "Ressources techniques",
      pages: [
        {
          name: "Sitemap XML",
          url: "/sitemap.xml",
          description: "Plan du site pour les moteurs de recherche",
        },
        {
          name: "Robots.txt",
          url: "/robots.txt",
          description: "Instructions pour les robots d'indexation",
        },
        {
          name: "Manifest",
          url: "/manifest.webmanifest",
          description: "Manifest de l'application web",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/20 dark:to-blue-950/20 pt-20">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">
            Plan du Site
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Naviguez facilement sur notre site grâce à ce plan complet. Trouvez
            rapidement toutes les informations dont vous avez besoin.
          </p>
        </div>

        {/* Site Structure */}
        <div className="space-y-12">
          {siteStructure.map((section, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50"
            >
              <h2 className="text-2xl font-bold mb-6 text-foreground font-heading">
                {section.title}
              </h2>

              <div className="grid gap-4">
                {section.pages.map((page, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/30 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-grow">
                      <Link
                        href={page.url}
                        className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {page.name}
                      </Link>
                      <p className="text-muted-foreground mt-1">
                        {page.description}
                      </p>
                      <code className="text-sm text-primary/70 mt-2 block">
                        https://www.knweb.agency{page.url}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SEO Info */}
        <div className="mt-16 bg-primary/5 rounded-xl p-8 border border-primary/10">
          <h2 className="text-2xl font-bold mb-4 text-foreground font-heading">
            🔍 Informations SEO
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong>Sitemap XML :</strong> Notre sitemap est automatiquement
              généré et mis à jour pour aider les moteurs de recherche à indexer
              toutes nos pages.
            </p>
            <p>
              <strong>Robots.txt :</strong> Fichier configuré pour guider les
              robots d'indexation et optimiser le référencement naturel.
            </p>
            <p>
              <strong>Données structurées :</strong> Toutes nos pages utilisent
              Schema.org pour améliorer l'affichage dans les résultats de
              recherche.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p className="mb-6 opacity-90">
              Contactez-nous directement, nous serons ravis de vous aider !
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📞 Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
