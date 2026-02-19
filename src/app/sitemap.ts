import type { MetadataRoute } from "next";
import { getAllBusinesses, getLocations } from "@/lib/data";
import { getAllGuideSlugs } from "@/lib/guides";

const BASE_URL = "https://hirenortheast.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const businesses = getAllBusinesses();
  const locations = getLocations();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/quote`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...locations.map((loc) => ({
      url: `${BASE_URL}/${loc.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...businesses.map((b) => ({
      url: `${BASE_URL}/${b.locationSlug}/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...getAllGuideSlugs().map((slug) => ({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
