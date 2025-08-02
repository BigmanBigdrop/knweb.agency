import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page non trouvée - 404 | KN Web Agency",
  description:
    "La page que vous recherchez est introuvable. Retournez à l'accueil ou explorez nos services web à Abidjan.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/20 dark:to-blue-950/20 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4 animate-pulse">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
            Oups ! Page introuvable
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            La page que vous recherchez n'existe pas ou a été déplacée. Mais ne
            vous inquiétez pas, nous avons d'autres pages formidables à vous
            montrer !
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Retour à l'accueil
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              <Search className="mr-2 h-5 w-5" />
              Découvrir nos services
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50">
          <h3 className="text-xl font-semibold text-foreground mb-6 font-heading">
            Pages populaires
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Services", href: "/services", icon: "🚀" },
              { name: "Projets", href: "/projets", icon: "💼" },
              { name: "Tarifs", href: "/offres", icon: "💰" },
              { name: "Contact", href: "/contact", icon: "📞" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border/30 hover:border-primary/20 transition-all duration-300 hover:scale-105 group"
              >
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Vous ne trouvez toujours pas ce que vous cherchez ?
          </p>
          <Button
            asChild
            variant="link"
            className="text-primary hover:text-primary/80"
          >
            <Link href="/contact">Contactez-nous directement →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
