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
}

export interface Business {
  name: string;
  slug: string;
  address: string;
  phone: string | null;
  internationalPhone: string | null;
  website: string | null;
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
}

export interface Location {
  slug: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  businessCount: number;
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
