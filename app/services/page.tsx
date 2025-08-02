import type { Metadata } from "next";
import { servicesMetadata } from "@/lib/metadata";
import ServicesContent from "@/components/pages/services-content";

export const metadata: Metadata = servicesMetadata;

export default function ServicesPage() {
  return <ServicesContent />;
}
