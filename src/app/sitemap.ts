import type { MetadataRoute } from "next";
import { getAllBusinesses, getLocations } from "@/lib/data";
import { getAllGuideSlugs } from "@/lib/guides";
import { getSiteConfig } from "@/lib/siteConfig";
import { ALL_PRODUCTS } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";

const BASE_URL = `https://${getSiteConfig().domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
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
      url: `${BASE_URL}/get-quotes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  for (const product of ALL_PRODUCTS) {
    const productId = product.id as ProductId;
    const locations = getLocations(productId);
    const businesses = getAllBusinesses(productId);

    entries.push({
      url: `${BASE_URL}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const loc of locations) {
      entries.push({
        url: `${BASE_URL}/${product.slug}/${loc.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const b of businesses) {
      entries.push({
        url: `${BASE_URL}/${product.slug}/${b.locationSlug}/${b.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  entries.push({
    url: `${BASE_URL}/guides`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  });

  for (const slug of getAllGuideSlugs()) {
    entries.push({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
