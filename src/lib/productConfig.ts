export type ProductId = "minibus-hire" | "van-hire";

export interface ProductConfig {
  id: ProductId;
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  heroTitle: (region: string) => string;
  heroSubtitle: (count: number, locCount: number) => string;
  locationDescriptionTemplate: (locationName: string) => string;
  metaDescriptionTemplate: (bizName: string, locationName: string) => string;
  services: { title: string; desc: string }[];
  seoHeading: (shortName: string) => string;
  seoParagraphs: (
    region: string,
    count: number,
    locationsList: string
  ) => string[];
  ctaText: (locationName: string) => string;
  featuredSubtitle: (shortName: string) => string;
  browseSubtitle: string;
  servicesSubtitle: string;
}

export const PRODUCT_CONFIGS: Record<ProductId, ProductConfig> = {
  "minibus-hire": {
    id: "minibus-hire",
    slug: "minibus-hire",
    name: "Minibus & Coach Hire",
    shortName: "Minibus Hire",
    icon: "🚐",
    heroTitle: (region) => `Find Minibus & Coach Hire in ${region}`,
    heroSubtitle: (count, locCount) =>
      `Compare ${count}+ trusted operators across ${locCount} locations. Get free quotes in minutes.`,
    locationDescriptionTemplate: (loc) =>
      `Compare minibus and coach hire companies in ${loc}. View ratings, reviews and contact details. Get free quotes from local operators.`,
    metaDescriptionTemplate: (biz, loc) =>
      `${biz} provides minibus and coach hire in ${loc}. Contact details, reviews and free quotes.`,
    services: [
      {
        title: "Minibus Hire",
        desc: "8-16 seater minibuses with driver for any occasion. Perfect for nights out, weddings and corporate events.",
      },
      {
        title: "Coach Hire",
        desc: "Full-size coaches for larger groups. Ideal for school trips, tours and long-distance travel.",
      },
      {
        title: "Party Bus",
        desc: "Party buses with sound systems and lighting for hen dos, stag dos and birthday celebrations.",
      },
      {
        title: "Self-Drive Hire",
        desc: "Hire a minibus and drive it yourself. Flexible and cost-effective for groups up to 16.",
      },
    ],
    seoHeading: (shortName) =>
      `Minibus & Coach Hire Across the ${shortName}`,
    seoParagraphs: (region, count, locationsList) => [
      `Whether you need a minibus for a night out, a coach for a school trip, or a party bus for a celebration, our directory connects you with the best local operators across the ${region}.`,
      `We list over ${count} minibus and coach hire companies covering ${locationsList}. Each listing includes verified contact details, Google ratings and opening hours so you can make an informed choice.`,
      `Get free, no-obligation quotes from multiple operators by using our quote request form. Simply tell us your journey details and we'll connect you with suitable companies in your area.`,
    ],
    ctaText: (loc) => `Need a minibus in ${loc}?`,
    featuredSubtitle: (shortName) =>
      `Highest rated minibus and coach hire companies in the ${shortName}`,
    browseSubtitle: "Find minibus and coach hire companies near you",
    servicesSubtitle: "Whatever your group transport needs, we can help",
  },
  "van-hire": {
    id: "van-hire",
    slug: "van-hire",
    name: "Van Hire",
    shortName: "Van Hire",
    icon: "🚚",
    heroTitle: (region) => `Find Van Hire in ${region}`,
    heroSubtitle: (count, locCount) =>
      `Compare ${count}+ van hire companies across ${locCount} locations. Get free quotes in minutes.`,
    locationDescriptionTemplate: (loc) =>
      `Compare van hire companies in ${loc}. View ratings, reviews and contact details. Get free quotes from local operators.`,
    metaDescriptionTemplate: (biz, loc) =>
      `${biz} provides van hire in ${loc}. Contact details, reviews and free quotes.`,
    services: [
      {
        title: "SWB Van Hire",
        desc: "Short wheelbase vans ideal for small moves and local deliveries.",
      },
      {
        title: "LWB Van Hire",
        desc: "Long wheelbase vans for larger loads and commercial use.",
      },
      {
        title: "Luton Van Hire",
        desc: "Box body vans with tail lifts, perfect for house moves.",
      },
      {
        title: "Tipper Van Hire",
        desc: "Tipper vans for construction, landscaping and waste removal.",
      },
      {
        title: "Refrigerated Van Hire",
        desc: "Temperature-controlled vans for food and pharmaceutical transport.",
      },
      {
        title: "Pickup Truck Hire",
        desc: "Pickup trucks for construction materials and outdoor work.",
      },
    ],
    seoHeading: (shortName) => `Van Hire Across the ${shortName}`,
    seoParagraphs: (region, count, locationsList) => [
      `Whether you need a van for moving house, a Luton for a large delivery, or a tipper for trade work, our directory connects you with the best local van hire companies across the ${region}.`,
      `We list over ${count} van hire companies covering ${locationsList}. Each listing includes verified contact details, Google ratings and opening hours.`,
      `Get free, no-obligation quotes from multiple operators by using our quote request form. Simply tell us your requirements and we'll connect you with suitable companies in your area.`,
    ],
    ctaText: (loc) => `Need a van in ${loc}?`,
    featuredSubtitle: (shortName) =>
      `Highest rated van hire companies in the ${shortName}`,
    browseSubtitle: "Find van hire companies near you",
    servicesSubtitle: "Whatever your van hire needs, we can help",
  },
};

export const ALL_PRODUCTS = Object.values(PRODUCT_CONFIGS);
export const PRODUCT_SLUGS = ALL_PRODUCTS.map((p) => p.slug);

export function getProductConfig(slug: string): ProductConfig | null {
  return PRODUCT_CONFIGS[slug as ProductId] || null;
}

export function isValidProductSlug(slug: string): slug is ProductId {
  return slug in PRODUCT_CONFIGS;
}
