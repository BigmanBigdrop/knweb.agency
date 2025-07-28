"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { AdminProvider, useAdmin } from "@/lib/admin-context";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Page de login - pas besoin de contexte d'authentification
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Pour toutes les autres pages admin, utiliser le provider
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}

// Composant interne pour gérer le loading
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAdmin();

  // Chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Chargement de l'interface d'administration...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
