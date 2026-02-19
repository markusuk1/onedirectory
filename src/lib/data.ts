import neBusinessesRaw from "@/data/businesses_final.json";
import nwBusinessesRaw from "@/data/northwest_businesses.json";
import scBusinessesRaw from "@/data/scotland_businesses.json";
import mlBusinessesRaw from "@/data/midlands_businesses.json";
import type { Business, BusinessRaw, Location } from "@/types";
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

let _businesses: Business[] | null = null;

function getRawBusinesses(): BusinessRaw[] {
  const id = getSiteId();
  if (id === "northwest") return nwBusinessesRaw as BusinessRaw[];
  if (id === "scotland") return scBusinessesRaw as BusinessRaw[];
  if (id === "midlands") return mlBusinessesRaw as BusinessRaw[];
  return neBusinessesRaw as BusinessRaw[];
}

export function getAllBusinesses(): Business[] {
  if (!_businesses) {
    _businesses = getRawBusinesses().map(transformBusiness);
  }
  return _businesses;
}

export function getBusinessesByLocation(locationSlug: string): Business[] {
  return getAllBusinesses().filter((b) => b.locationSlug === locationSlug);
}

export function getBusinessBySlug(
  locationSlug: string,
  businessSlug: string
): Business | null {
  return (
    getAllBusinesses().find(
      (b) => b.locationSlug === locationSlug && b.slug === businessSlug
    ) || null
  );
}

export function getFeaturedBusinesses(limit = 6): Business[] {
  return [...getAllBusinesses()]
    .filter((b) => b.rating && b.totalReviews > 0)
    .sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return b.totalReviews - a.totalReviews;
    })
    .slice(0, limit);
}

export function getLocations(): Location[] {
  const businesses = getAllBusinesses();
  const config = getLocationConfig();
  return Object.entries(config).map(([slug, loc]) => ({
    slug,
    name: loc.name,
    description: loc.description,
    lat: loc.lat,
    lng: loc.lng,
    businessCount: businesses.filter((b) => b.locationSlug === slug).length,
  }));
}

export function getLocationBySlugWithCount(slug: string): Location | null {
  const config = getLocationConfig();
  const loc = config[slug];
  if (!loc) return null;
  return {
    slug,
    name: loc.name,
    description: loc.description,
    lat: loc.lat,
    lng: loc.lng,
    businessCount: getBusinessesByLocation(slug).length,
  };
}
