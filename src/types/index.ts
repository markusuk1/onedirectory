export interface BusinessRaw {
  name: string;
  address: string;
  phone: string;
  international_phone: string;
  website: string;
  google_maps_url: string;
  rating: number | null;
  total_reviews: number | null;
  business_status: string;
  opening_hours: string;
  types: string;
  lat: number;
  lng: number;
  found_in_location: string;
  found_with_query: string;
  email?: string;
  emails?: string[];
  description?: string;
  services?: string[];
  vehicles?: string[];
}

export interface Business {
  name: string;
  slug: string;
  address: string;
  phone: string | null;
  internationalPhone: string | null;
  website: string | null;
  email: string | null;
  description: string | null;
  services: string[];
  vehicles: string[];
  googleMapsUrl: string;
  rating: number | null;
  totalReviews: number;
  businessStatus: string;
  openingHours: string[];
  types: string[];
  lat: number;
  lng: number;
  locationSlug: string;
  locationName: string;
  isFeatured?: boolean;
  isRecommended?: boolean;
  isClaimed?: boolean;
  logoUrl?: string;
  tagline?: string;
}

export interface Location {
  slug: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  businessCount: number;
}

export type AdvertPlacement = "homepage" | "product_page" | "location_page" | "business_sidebar";
export type AdvertStatus = "pending" | "active" | "paused" | "expired";

export interface Advert {
  id: string;
  operatorId: string;
  businessSlug: string;
  product: string;
  site: string;
  imageUrls: string[];
  linkUrl: string | null;
  altText: string | null;
  placement: AdvertPlacement;
  status: AdvertStatus;
  startDate: string | null;
  endDate: string | null;
}

export interface AdvertPublic {
  businessSlug: string;
  businessName: string;
  imageUrls: string[];
  linkUrl: string | null;
  altText: string | null;
}

export interface Lead {
  id: string;
  type: "quote_request" | "phone_reveal" | "website_click";
  businessSlug?: string;
  businessName?: string;
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  passengers?: number;
  pickup?: string;
  destination?: string;
  journeyType?: "one-way" | "return" | "multi-stop";
  message?: string;
  createdAt: string;
}
