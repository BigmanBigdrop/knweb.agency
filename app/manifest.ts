import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KN Web Agency - Think IT, we'll digitalize IT",
    short_name: "KN Web Agency",
    description: "Agence web à Abidjan spécialisée dans la création de sites et applications web ",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#8B5CF6",
    icons: [
      {
        src: "/public/favicon(64 x 64 px).svg",
        sizes: "64x64",
        type: "image/svg",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
