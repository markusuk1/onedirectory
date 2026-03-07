import neBusinessesRaw from "@/data/businesses_final.json";
import nwBusinessesRaw from "@/data/northwest_businesses.json";
import scBusinessesRaw from "@/data/scotland_businesses.json";
import mlBusinessesRaw from "@/data/midlands_businesses.json";
import ykBusinessesRaw from "@/data/yorkshire_businesses.json";
import eaBusinessesRaw from "@/data/east_businesses.json";
import lnBusinessesRaw from "@/data/london_businesses.json";
import seBusinessesRaw from "@/data/southeast_businesses.json";
import swBusinessesRaw from "@/data/southwest_businesses.json";
import wlBusinessesRaw from "@/data/wales_businesses.json";

import vhNeBusinessesRaw from "@/data/vanhire_northeast_businesses.json";
import vhNwBusinessesRaw from "@/data/vanhire_northwest_businesses.json";
import vhScBusinessesRaw from "@/data/vanhire_scotland_businesses.json";
import vhMlBusinessesRaw from "@/data/vanhire_midlands_businesses.json";
import vhYkBusinessesRaw from "@/data/vanhire_yorkshire_businesses.json";
import vhEaBusinessesRaw from "@/data/vanhire_east_businesses.json";
import vhLnBusinessesRaw from "@/data/vanhire_london_businesses.json";
import vhSeBusinessesRaw from "@/data/vanhire_southeast_businesses.json";
import vhSwBusinessesRaw from "@/data/vanhire_southwest_businesses.json";
import vhWlBusinessesRaw from "@/data/vanhire_wales_businesses.json";

import shNeBusinessesRaw from "@/data/skiphire_northeast_businesses.json";
import shNwBusinessesRaw from "@/data/skiphire_northwest_businesses.json";
import shScBusinessesRaw from "@/data/skiphire_scotland_businesses.json";
import shMlBusinessesRaw from "@/data/skiphire_midlands_businesses.json";
import shYkBusinessesRaw from "@/data/skiphire_yorkshire_businesses.json";
import shEaBusinessesRaw from "@/data/skiphire_east_businesses.json";
import shLnBusinessesRaw from "@/data/skiphire_london_businesses.json";
import shSeBusinessesRaw from "@/data/skiphire_southeast_businesses.json";
import shSwBusinessesRaw from "@/data/skiphire_southwest_businesses.json";
import shWlBusinessesRaw from "@/data/skiphire_wales_businesses.json";

import lsNeBusinessesRaw from "@/data/locksmith_northeast_businesses.json";
import lsNwBusinessesRaw from "@/data/locksmith_northwest_businesses.json";
import lsScBusinessesRaw from "@/data/locksmith_scotland_businesses.json";
import lsMlBusinessesRaw from "@/data/locksmith_midlands_businesses.json";
import lsYkBusinessesRaw from "@/data/locksmith_yorkshire_businesses.json";
import lsEaBusinessesRaw from "@/data/locksmith_east_businesses.json";
import lsLnBusinessesRaw from "@/data/locksmith_london_businesses.json";
import lsSeBusinessesRaw from "@/data/locksmith_southeast_businesses.json";
import lsSwBusinessesRaw from "@/data/locksmith_southwest_businesses.json";
import lsWlBusinessesRaw from "@/data/locksmith_wales_businesses.json";

import rmNeBusinessesRaw from "@/data/removals_northeast_businesses.json";
import rmNwBusinessesRaw from "@/data/removals_northwest_businesses.json";
import rmScBusinessesRaw from "@/data/removals_scotland_businesses.json";
import rmMlBusinessesRaw from "@/data/removals_midlands_businesses.json";
import rmYkBusinessesRaw from "@/data/removals_yorkshire_businesses.json";
import rmEaBusinessesRaw from "@/data/removals_east_businesses.json";
import rmLnBusinessesRaw from "@/data/removals_london_businesses.json";
import rmSeBusinessesRaw from "@/data/removals_southeast_businesses.json";
import rmSwBusinessesRaw from "@/data/removals_southwest_businesses.json";
import rmWlBusinessesRaw from "@/data/removals_wales_businesses.json";

import type { Business, BusinessRaw, Location } from "@/types";
import type { ProductId } from "./productConfig";
import { slugify } from "./slugify";
import { getLocationConfig, getLocationFromFoundIn } from "./locations";
import { getSiteId } from "./siteConfig";
import { getPromotion } from "./promotions";
import pool from "./db";

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
    email: raw.email || null,
    description: raw.description || null,
    services: raw.services || [],
    vehicles: raw.vehicles || [],
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
  if (productId === "skip-hire") {
    if (id === "northwest") return shNwBusinessesRaw as BusinessRaw[];
    if (id === "scotland") return shScBusinessesRaw as BusinessRaw[];
    if (id === "midlands") return shMlBusinessesRaw as BusinessRaw[];
    if (id === "yorkshire") return shYkBusinessesRaw as BusinessRaw[];
    if (id === "east") return shEaBusinessesRaw as BusinessRaw[];
    if (id === "london") return shLnBusinessesRaw as BusinessRaw[];
    if (id === "southeast") return shSeBusinessesRaw as BusinessRaw[];
    if (id === "southwest") return shSwBusinessesRaw as BusinessRaw[];
    if (id === "wales") return shWlBusinessesRaw as BusinessRaw[];
    return shNeBusinessesRaw as BusinessRaw[];
  }
  if (productId === "locksmith") {
    if (id === "northwest") return lsNwBusinessesRaw as BusinessRaw[];
    if (id === "scotland") return lsScBusinessesRaw as BusinessRaw[];
    if (id === "midlands") return lsMlBusinessesRaw as BusinessRaw[];
    if (id === "yorkshire") return lsYkBusinessesRaw as BusinessRaw[];
    if (id === "east") return lsEaBusinessesRaw as BusinessRaw[];
    if (id === "london") return lsLnBusinessesRaw as BusinessRaw[];
    if (id === "southeast") return lsSeBusinessesRaw as BusinessRaw[];
    if (id === "southwest") return lsSwBusinessesRaw as BusinessRaw[];
    if (id === "wales") return lsWlBusinessesRaw as BusinessRaw[];
    return lsNeBusinessesRaw as BusinessRaw[];
  }
  if (productId === "removal-companies") {
    if (id === "northwest") return rmNwBusinessesRaw as BusinessRaw[];
    if (id === "scotland") return rmScBusinessesRaw as BusinessRaw[];
    if (id === "midlands") return rmMlBusinessesRaw as BusinessRaw[];
    if (id === "yorkshire") return rmYkBusinessesRaw as BusinessRaw[];
    if (id === "east") return rmEaBusinessesRaw as BusinessRaw[];
    if (id === "london") return rmLnBusinessesRaw as BusinessRaw[];
    if (id === "southeast") return rmSeBusinessesRaw as BusinessRaw[];
    if (id === "southwest") return rmSwBusinessesRaw as BusinessRaw[];
    if (id === "wales") return rmWlBusinessesRaw as BusinessRaw[];
    return rmNeBusinessesRaw as BusinessRaw[];
  }
  if (productId === "van-hire") {
    if (id === "northwest") return vhNwBusinessesRaw as BusinessRaw[];
    if (id === "scotland") return vhScBusinessesRaw as BusinessRaw[];
    if (id === "midlands") return vhMlBusinessesRaw as BusinessRaw[];
    if (id === "yorkshire") return vhYkBusinessesRaw as BusinessRaw[];
    if (id === "east") return vhEaBusinessesRaw as BusinessRaw[];
    if (id === "london") return vhLnBusinessesRaw as BusinessRaw[];
    if (id === "southeast") return vhSeBusinessesRaw as BusinessRaw[];
    if (id === "southwest") return vhSwBusinessesRaw as BusinessRaw[];
    if (id === "wales") return vhWlBusinessesRaw as BusinessRaw[];
    return vhNeBusinessesRaw as BusinessRaw[];
  }
  if (id === "northwest") return nwBusinessesRaw as BusinessRaw[];
  if (id === "scotland") return scBusinessesRaw as BusinessRaw[];
  if (id === "midlands") return mlBusinessesRaw as BusinessRaw[];
  if (id === "yorkshire") return ykBusinessesRaw as BusinessRaw[];
  if (id === "east") return eaBusinessesRaw as BusinessRaw[];
  if (id === "london") return lnBusinessesRaw as BusinessRaw[];
  if (id === "southeast") return seBusinessesRaw as BusinessRaw[];
  if (id === "southwest") return swBusinessesRaw as BusinessRaw[];
  if (id === "wales") return wlBusinessesRaw as BusinessRaw[];
  return neBusinessesRaw as BusinessRaw[];
}

export function getAllBusinesses(
  productId: ProductId = "minibus-hire"
): Business[] {
  const key = `${productId}:${getSiteId()}`;
  if (!_businessCache.has(key)) {
    _businessCache.set(
      key,
      getRawBusinesses(productId).map(transformBusiness).map((b) => {
        const promo = getPromotion(productId, b.slug);
        return {
          ...b,
          ...(promo.featured && { isFeatured: true }),
          ...(promo.recommended && { isRecommended: true }),
        };
      })
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
  const all = getAllBusinesses(productId);
  const promoted = all.filter((b) => b.isFeatured || b.isRecommended);
  const topRated = all
    .filter((b) => !b.isFeatured && !b.isRecommended && b.rating && b.totalReviews > 0)
    .sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return b.totalReviews - a.totalReviews;
    });

  const sorted = [
    ...promoted.filter((b) => b.isFeatured).sort((a, b) => (b.rating || 0) - (a.rating || 0)),
    ...promoted.filter((b) => !b.isFeatured && b.isRecommended).sort((a, b) => (b.rating || 0) - (a.rating || 0)),
    ...topRated,
  ];

  return sorted.slice(0, limit);
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

/**
 * Get a business with DB profile overrides merged on top of JSON base data.
 * Used on business profile pages (dynamic, ISR) to show operator edits.
 */
export async function getBusinessWithOverrides(
  locationSlug: string,
  businessSlug: string,
  productId: ProductId = "minibus-hire"
): Promise<Business | null> {
  const base = getBusinessBySlug(locationSlug, businessSlug, productId);
  if (!base) return null;

  try {
    const siteId = getSiteId();
    const result = await pool.query(
      `SELECT op.description, op.phone, op.email, op.website, op.logo_url, op.tagline, op.services
       FROM operator_profiles op
       JOIN operator_claims oc ON oc.business_slug = op.business_slug
         AND oc.product = op.product AND oc.site = op.site AND oc.status = 'approved'
       WHERE op.business_slug = $1 AND op.product = $2 AND op.site = $3`,
      [businessSlug, productId, siteId]
    );

    if (result.rows.length === 0) return base;

    const override = result.rows[0];
    return {
      ...base,
      isClaimed: true,
      ...(override.description && { description: override.description }),
      ...(override.phone && { phone: override.phone }),
      ...(override.email && { email: override.email }),
      ...(override.website && { website: override.website }),
      ...(override.logo_url && { logoUrl: override.logo_url }),
      ...(override.tagline && { tagline: override.tagline }),
      ...(override.services && override.services.length > 0 && { services: override.services }),
    };
  } catch {
    // If DB is unavailable, fall back to base data
    return base;
  }
}
