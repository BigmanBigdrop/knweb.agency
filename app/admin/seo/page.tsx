import type { Metadata } from "next";
import SEOManager from "@/components/admin/seo-manager";

export const metadata: Metadata = {
  title: "Gestionnaire SEO - Admin | KN Web Agency",
  description:
    "Interface d'administration pour gérer et optimiser le référencement du site",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SEOPage() {
  return (
    <div className="container mx-auto p-6">
      <SEOManager />
    </div>
  );
}
