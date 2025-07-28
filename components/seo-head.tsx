import Head from "next/head";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  url?: string;
  type?: string;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  ogImage = "/og-image.jpg",
  url = "https://knweb.agency",
  type = "website",
}: SEOHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`https://knweb.agency${ogImage}`} />
      <meta property="og:site_name" content="KN Web Agency" />
      <meta property="og:locale" content="fr_CI" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://knweb.agency${ogImage}`} />
      <meta name="twitter:creator" content="@knwebagency" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="KN Web Agency" />
      <link rel="canonical" href={url} />

      {/* Geo tags for local SEO */}
      <meta name="geo.region" content="CI-AB" />
      <meta name="geo.placename" content="Abidjan" />
      <meta name="geo.position" content="5.3599517;-4.0082563" />
      <meta name="ICBM" content="5.3599517, -4.0082563" />
    </Head>
  );
}
