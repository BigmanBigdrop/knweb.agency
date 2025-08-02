import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/sitemap.xml"],
        disallow: ["/admin/", "/api/", "/_next/", "/private/", "*.json"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/sitemap.xml"],
        disallow: ["/admin/", "/api/", "/private/"],
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/sitemap.xml"],
        disallow: ["/admin/", "/api/", "/private/"],
        crawlDelay: 1,
      },
    ],
    sitemap: "https://www.knweb.agency/sitemap.xml",
    host: "https://www.knweb.agency",
  };
}
