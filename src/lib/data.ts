import neBusinessesRaw from "@/data/businesses_final.json";
import nwBusinessesRaw from "@/data/northwest_businesses.json";
import scBusinessesRaw from "@/data/scotland_businesses.json";
import mlBusinessesRaw from "@/data/midlands_businesses.json";
import ykBusinessesRaw from "@/data/yorkshire_businesses.json";
import eaBusinessesRaw from "@/data/east_businesses.json";
import lnBusinessesRaw from "@/data/london_businesses.json";
import seBusinessesRaw from "@/data/southeast_businesses.json";

import vhNeBusinessesRaw from "@/data/vanhire_northeast_businesses.json";
import vhNwBusinessesRaw from "@/data/vanhire_northwest_businesses.json";
import vhScBusinessesRaw from "@/data/vanhire_scotland_businesses.json";
import vhMlBusinessesRaw from "@/data/vanhire_midlands_businesses.json";
import vhYkBusinessesRaw from "@/data/vanhire_yorkshire_businesses.json";
import vhEaBusinessesRaw from "@/data/vanhire_east_businesses.json";
import vhLnBusinessesRaw from "@/data/vanhire_london_businesses.json";
import vhSeBusinessesRaw from "@/data/vanhire_southeast_businesses.json";

import type { Business, BusinessRaw, Location } from "@/types";
import type { ProductId } from "./productConfig";
import { slugify } from "./slugify";
import { getLocationConfig, getLocationFromFoundIn } from "./locations";
import { getSiteId } from "./siteConfig";

function transformBusiness(raw: BusinessRaw): Business {
  const locationSlug = getLocationFromFoundIn(raw.found_in_location);
  const config = getLocationConfig();
  return {
    name: raw.name,
    slug: slugify(raw.name),
    address: raw.address,
    phone: raw.phone || null,
    internationalPhone: raw.international_phone || null,
    website: raw.website || null,
    googleMapsUrl: raw.google_maps_url,
    rating: raw.rating,
    totalReviews: raw.total_reviews || 0,
    businessStatus: raw.business_status,
    openingHours: raw.opening_hours
      ? raw.opening_hours.split("; ").filter(Boolean)
      : [],
    types: raw.types ? raw.types.split(", ").filter(Boolean) : [],
    lat: raw.lat,
    lng: raw.lng,
    locationSlug,
    locationName: config[locationSlug]?.name || raw.found_in_location,
  };
}

const _businessCache = new Map<string, Business[]>();

function getRawBusinesses(
  productId: ProductId = "minibus-hire"
): BusinessRaw[] {
  const id = getSiteId();
  if (productId === "van-hire") {
    if (id === "northwest") return vhNwBusinessesRaw as BusinessRaw[];
    if (id === "scotland") return vhScBusinessesRaw as BusinessRaw[];
    if (id === "midlands") return vhMlBusinessesRaw as BusinessRaw[];
    if (id === "yorkshire") return vhYkBusinessesRaw as BusinessRaw[];
    if (id === "east") return vhEaBusinessesRaw as BusinessRaw[];
    if (id === "london") return vhLnBusinessesRaw as BusinessRaw[];
    if (id === "southeast") return vhSeBusinessesRaw as BusinessRaw[];
    return vhNeBusinessesRaw as BusinessRaw[];
  }
  if (id === "northwest") return nwBusinessesRaw as BusinessRaw[];
  if (id === "scotland") return scBusinessesRaw as BusinessRaw[];
  if (id === "midlands") return mlBusinessesRaw as BusinessRaw[];
  if (id === "yorkshire") return ykBusinessesRaw as BusinessRaw[];
  if (id === "east") return eaBusinessesRaw as BusinessRaw[];
  if (id === "london") return lnBusinessesRaw as BusinessRaw[];
  if (id === "southeast") return seBusinessesRaw as BusinessRaw[];
  return neBusinessesRaw as BusinessRaw[];
}

export function getAllBusinesses(
  productId: ProductId = "minibus-hire"
): Business[] {
  const key = `${productId}:${getSiteId()}`;
  if (!_businessCache.has(key)) {
    _businessCache.set(
      key,
      getRawBusinesses(productId).map(transformBusiness)
    );
  }
  return _businessCache.get(key)!;
}

export function getBusinessesByLocation(
  locationSlug: string,
  productId: ProductId = "minibus-hire"
): Business[] {
  return getAllBusinesses(productId).filter(
    (b) => b.locationSlug === locationSlug
  );
}

export function getBusinessBySlug(
  locationSlug: string,
  businessSlug: string,
  productId: ProductId = "minibus-hire"
): Business | null {
  return (
    getAllBusinesses(productId).find(
      (b) => b.locationSlug === locationSlug && b.slug === businessSlug
    ) || null
  );
}

export function getFeaturedBusinesses(
  limit = 6,
  productId: ProductId = "minibus-hire"
): Business[] {
  return [...getAllBusinesses(productId)]
    .filter((b) => b.rating && b.totalReviews > 0)
    .sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return b.totalReviews - a.totalReviews;
    })
    .slice(0, limit);
}

export function getLocations(
  productId: ProductId = "minibus-hire"
): Location[] {
  const businesses = getAllBusinesses(productId);
  const config = getLocationConfig();
  return Object.entries(config)
    .map(([slug, loc]) => ({
      slug,
      name: loc.name,
      description: loc.description,
      lat: loc.lat,
      lng: loc.lng,
      businessCount: businesses.filter((b) => b.locationSlug === slug).length,
    }))
    .filter((loc) => loc.businessCount > 0);
}

export function getLocationBySlugWithCount(
  slug: string,
  productId: ProductId = "minibus-hire"
): Location | null {
  const config = getLocationConfig();
  const loc = config[slug];
  if (!loc) return null;
  return {
    slug,
    name: loc.name,
    description: loc.description,
    lat: loc.lat,
    lng: loc.lng,
    businessCount: getBusinessesByLocation(slug, productId).length,
  };
}
