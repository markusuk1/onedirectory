import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const domain = getSiteConfig().domain;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `https://${domain}/sitemap.xml`,
  };
}
