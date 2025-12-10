"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Ne pas afficher Header et Footer pour les pages /connect
  const isConnectPage = pathname?.startsWith("/connect");

  if (isConnectPage) {
    // Page autonome sans Header ni Footer
    return <>{children}</>;
  }

  // Pages normales avec Header et Footer
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
