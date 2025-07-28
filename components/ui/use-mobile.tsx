// Ce fichier est dupliqué et ne devrait pas être utilisé
// Importez plutôt le hook depuis @/hooks/use-mobile.tsx

import { useIsMobile as useIsMobileHook } from "@/hooks/use-mobile";

// Re-export pour maintenir la compatibilité
export function useIsMobile() {
  return useIsMobileHook();
}
