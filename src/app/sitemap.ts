import type { MetadataRoute } from "next";
import { getAllBusinesses, getLocations } from "@/lib/data";
import { getAllGuideSlugs } from "@/lib/guides";
import { getSiteConfig } from "@/lib/siteConfig";
import { ALL_PRODUCTS } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";
import { getServicePages } from "@/lib/servicePages";

const BASE_URL = `https://${getSiteConfig().domain}`;

// Content dates for sitemap freshness signals
const CONTENT_UPDATED = new Date("2026-03-01");
const STATIC_PAGE_DATE = new Date("2025-06-01");
const GUIDE_DATE = new Date("2026-03-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/quote`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/get-quotes`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: STATIC_PAGE_DATE,
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
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const loc of locations) {
      entries.push({
        url: `${BASE_URL}/${product.slug}/${loc.slug}`,
        lastModified: CONTENT_UPDATED,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const b of businesses) {
      entries.push({
        url: `${BASE_URL}/${product.slug}/${b.locationSlug}/${b.slug}`,
        lastModified: CONTENT_UPDATED,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    const servicePages = getServicePages(productId);
    for (const loc of locations) {
      for (const svc of servicePages) {
        entries.push({
          url: `${BASE_URL}/${product.slug}/${loc.slug}/services/${svc.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  entries.push({
    url: `${BASE_URL}/guides`,
    lastModified: GUIDE_DATE,
    changeFrequency: "weekly",
    priority: 0.7,
  });

  for (const slug of getAllGuideSlugs()) {
    entries.push({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: GUIDE_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
