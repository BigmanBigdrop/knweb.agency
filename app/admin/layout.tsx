"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuthentication();
  }, [pathname]);

  const checkAuthentication = async () => {
    try {
      // Ne pas vérifier l'auth sur la page de login
      if (pathname === "/admin/login") {
        setIsLoading(false);
        return;
      }

      const user = await getCurrentUser();

      if (user) {
        setIsAuthenticated(true);
      } else {
        router.push("/admin/login");
        return;
      }
    } catch (error) {
      console.error("Erreur vérification auth:", error);
      router.push("/admin/login");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  // Page de login - pas de vérification d'auth
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Vérification des permissions...
          </p>
        </div>
      </div>
    );
  }

  // Non authentifié
  if (!isAuthenticated) {
    return null;
  }

  // Authentifié - afficher le contenu
  return <>{children}</>;
}
