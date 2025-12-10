import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-2">404</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
        </div>

        <h2 className="text-3xl font-bold mb-4">Page introuvable</h2>
        <p className="text-muted-foreground mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              <Search className="mr-2 h-5 w-5" />
              Contactez-nous
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
