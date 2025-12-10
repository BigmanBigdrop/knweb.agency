import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | KN Web Agency",
  description: "Entrez en contact avec KN Web Agency",
};

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout sans Header ni Footer pour une expérience autonome
  return <>{children}</>;
}
