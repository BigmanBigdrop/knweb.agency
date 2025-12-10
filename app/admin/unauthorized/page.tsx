import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Home, LogOut } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-red-700 dark:text-red-400">
              Accès Non Autorisé
            </CardTitle>
            <CardDescription className="mt-2">
              Vous n'avez pas les permissions nécessaires pour accéder à cette section
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
              Pourquoi ce message ?
            </h3>
            <ul className="space-y-1 text-sm text-red-800 dark:text-red-300">
              <li>• Votre compte n'est pas autorisé comme administrateur</li>
              <li>• Votre email n'est pas dans la liste des admins autorisés</li>
              <li>• Contactez l'administrateur système pour obtenir l'accès</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="default" className="flex-1">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/admin/login">
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Si vous pensez qu'il s'agit d'une erreur, contactez{" "}
              <a href="mailto:contact@knweb.agency" className="text-primary hover:underline">
                contact@knweb.agency
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
