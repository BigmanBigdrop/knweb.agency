import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KN Web Agency - Agence Web #1 à Abidjan, Côte d'Ivoire",
    short_name: "KN Web Agency",
    description:
      "🥇 Agence web leader en Côte d'Ivoire. Création de sites web modernes, applications mobiles et solutions e-commerce pour PME à Abidjan.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed",
    orientation: "portrait-primary",
    scope: "/",
    lang: "fr-CI",
    categories: ["business", "technology"],
    icons: [
      {
        src: "/favicon.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
