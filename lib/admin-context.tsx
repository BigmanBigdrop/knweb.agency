"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { logger } from "@/lib/helpers";
import type { User } from "@supabase/supabase-js";

// Type pour le contexte admin
type AdminContextType = {
  user: User | null;
  isLoading: boolean;
};

// Création du contexte avec une valeur par défaut
const AdminContext = createContext<AdminContextType>({
  user: null,
  isLoading: true,
});

// Hook pour utiliser le contexte
export const useAdmin = () => useContext(AdminContext);

// Provider pour le contexte admin
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    loadUserData();
  }, [pathname]);

  const loadUserData = async () => {
    try {
      // Ne pas vérifier l'auth sur la page de login
      if (pathname === "/admin/login") {
        setIsLoading(false);
        return;
      }

      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      logger.error("Erreur chargement données utilisateur", { error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminContext.Provider value={{ user, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}
