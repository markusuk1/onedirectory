import businessesRaw from "@/data/businesses_final.json";
import type { Business, BusinessRaw, Location } from "@/types";
import { slugify } from "./slugify";
import { LOCATION_CONFIG, getLocationFromFoundIn } from "./locations";

function transformBusiness(raw: BusinessRaw): Business {
  const locationSlug = getLocationFromFoundIn(raw.found_in_location);
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
    locationName:
      LOCATION_CONFIG[locationSlug]?.name || raw.found_in_location,
  };
}

let _businesses: Business[] | null = null;

export function getAllBusinesses(): Business[] {
  if (!_businesses) {
    _businesses = (businessesRaw as BusinessRaw[]).map(transformBusiness);
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
  return Object.entries(LOCATION_CONFIG).map(([slug, config]) => ({
    slug,
    name: config.name,
    description: config.description,
    lat: config.lat,
    lng: config.lng,
    businessCount: businesses.filter((b) => b.locationSlug === slug).length,
  }));
}

export function getLocationBySlugWithCount(slug: string): Location | null {
  const config = LOCATION_CONFIG[slug];
  if (!config) return null;
  return {
    slug,
    name: config.name,
    description: config.description,
    lat: config.lat,
    lng: config.lng,
    businessCount: getBusinessesByLocation(slug).length,
  };
}
