export type ProductId = "minibus-hire" | "van-hire" | "skip-hire" | "locksmith" | "removal-companies" | "bouncy-castle-hire" | "limo-hire" | "plant-hire";

export interface ProductConfig {
  id: ProductId;
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  image: string;
  imageAlt: string;
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
    image: "/images/minibus.png",
    imageAlt: "Minibus hire illustration",
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
    image: "/images/van.png",
    imageAlt: "Van hire illustration",
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
  "skip-hire": {
    id: "skip-hire",
    slug: "skip-hire",
    name: "Skip Hire",
    shortName: "Skip Hire",
    icon: "🗑️",
    image: "/images/skip.png",
    imageAlt: "Skip hire illustration",
    heroTitle: (region) => `Find Skip Hire in ${region}`,
    heroSubtitle: (count, locCount) =>
      `Compare ${count}+ skip hire companies across ${locCount} locations. Get free quotes in minutes.`,
    locationDescriptionTemplate: (loc) =>
      `Compare skip hire companies in ${loc}. View ratings, reviews and contact details. Get free quotes from local operators.`,
    metaDescriptionTemplate: (biz, loc) =>
      `${biz} provides skip hire in ${loc}. Contact details, reviews and free quotes.`,
    services: [
      {
        title: "Mini Skip Hire",
        desc: "2-3 yard mini skips ideal for small garden clearances and bathroom refits.",
      },
      {
        title: "Midi Skip Hire",
        desc: "4-5 yard midi skips for medium projects like kitchen renovations.",
      },
      {
        title: "Builders Skip Hire",
        desc: "6-8 yard builders skips, the most popular size for home and trade projects.",
      },
      {
        title: "Large Skip Hire",
        desc: "12-16 yard large skips for major renovations and commercial clearances.",
      },
      {
        title: "Roll-On Roll-Off",
        desc: "20-40 yard RoRo skips for large-scale construction and demolition waste.",
      },
      {
        title: "Grab Hire",
        desc: "Grab lorries for fast removal of soil, rubble and green waste without a skip.",
      },
    ],
    seoHeading: (shortName) => `Skip Hire Across the ${shortName}`,
    seoParagraphs: (region, count, locationsList) => [
      `Whether you need a mini skip for a garden clearout, a builders skip for a renovation, or a grab lorry for bulk waste removal, our directory connects you with the best local skip hire companies across the ${region}.`,
      `We list over ${count} skip hire companies covering ${locationsList}. Each listing includes verified contact details, Google ratings and opening hours so you can make an informed choice.`,
      `Get free, no-obligation quotes from multiple operators by using our quote request form. Simply tell us your requirements and we'll connect you with suitable companies in your area.`,
    ],
    ctaText: (loc) => `Need a skip in ${loc}?`,
    featuredSubtitle: (shortName) =>
      `Highest rated skip hire companies in the ${shortName}`,
    browseSubtitle: "Find skip hire companies near you",
    servicesSubtitle: "Whatever your waste disposal needs, we can help",
  },
  locksmith: {
    id: "locksmith",
    slug: "locksmith",
    name: "Locksmith",
    shortName: "Locksmith",
    icon: "🔑",
    image: "/images/locksmith.png",
    imageAlt: "Locksmith illustration",
    heroTitle: (region) => `Find a Locksmith in ${region}`,
    heroSubtitle: (count, locCount) =>
      `Compare ${count}+ locksmiths across ${locCount} locations. Read reviews and get in touch today.`,
    locationDescriptionTemplate: (loc) =>
      `Compare locksmiths in ${loc}. View ratings, reviews and contact details for trusted local locksmiths.`,
    metaDescriptionTemplate: (biz, loc) =>
      `${biz} is a locksmith in ${loc}. Contact details, reviews and services.`,
    services: [
      {
        title: "Emergency Locksmith",
        desc: "24/7 emergency lockout service for homes, businesses and vehicles. Fast response when you need it most.",
      },
      {
        title: "Lock Repair",
        desc: "Professional repair of damaged, stiff or faulty locks on all door types including uPVC and composite.",
      },
      {
        title: "Lock Change",
        desc: "Full lock replacement and upgrades to high-security cylinders. Ideal after moving home or losing keys.",
      },
      {
        title: "uPVC & Composite Door Locks",
        desc: "Specialist fitting and repair of multipoint locking mechanisms on uPVC and composite doors.",
      },
      {
        title: "Auto Locksmith",
        desc: "Car lockout recovery, key cutting and transponder key programming for all vehicle makes.",
      },
      {
        title: "Key Cutting",
        desc: "Precision key cutting for standard, dimple and high-security keys on site or at your door.",
      },
    ],
    seoHeading: (shortName) => `Locksmiths Across the ${shortName}`,
    seoParagraphs: (region, count, locationsList) => [
      `Whether you're locked out of your home, need a lock changed after moving, or want to upgrade your security, our directory connects you with trusted local locksmiths across the ${region}.`,
      `We list over ${count} locksmiths covering ${locationsList}. Each listing includes verified contact details, Google ratings and opening hours so you can find help fast.`,
      `Browse our directory to compare locksmiths in your area. Check ratings, read reviews and contact operators directly to get the help you need.`,
    ],
    ctaText: (loc) => `Need a locksmith in ${loc}?`,
    featuredSubtitle: (shortName) =>
      `Highest rated locksmiths in the ${shortName}`,
    browseSubtitle: "Find a trusted locksmith near you",
    servicesSubtitle: "Whatever your lock or security needs, we can help",
  },
  "removal-companies": {
    id: "removal-companies",
    slug: "removal-companies",
    name: "Removal Companies",
    shortName: "Removals",
    icon: "📦",
    image: "/images/removals.png",
    imageAlt: "Removal companies illustration",
    heroTitle: (region) => `Find Removal Companies in ${region}`,
    heroSubtitle: (count, locCount) =>
      `Compare ${count}+ removal companies across ${locCount} locations. Get free quotes in minutes.`,
    locationDescriptionTemplate: (loc) =>
      `Compare removal companies in ${loc}. View ratings, reviews and contact details. Get free quotes from local movers.`,
    metaDescriptionTemplate: (biz, loc) =>
      `${biz} provides removal services in ${loc}. Contact details, reviews and free quotes.`,
    services: [
      {
        title: "House Removals",
        desc: "Full house moving service with experienced teams. Careful handling of all your belongings from start to finish.",
      },
      {
        title: "Office Removals",
        desc: "Commercial and office relocations with minimal disruption. IT equipment, furniture and document moving.",
      },
      {
        title: "Man & Van",
        desc: "Affordable man and van service for smaller moves, single items and student relocations.",
      },
      {
        title: "Packing Services",
        desc: "Professional packing and unpacking service. Quality materials and careful handling of fragile items.",
      },
      {
        title: "Storage",
        desc: "Short and long-term storage solutions. Secure, clean facilities for your belongings during your move.",
      },
      {
        title: "Piano & Specialist",
        desc: "Specialist removal of pianos, antiques, artwork and other heavy or delicate items.",
      },
    ],
    seoHeading: (shortName) => `Removal Companies Across the ${shortName}`,
    seoParagraphs: (region, count, locationsList) => [
      `Whether you're moving house, relocating an office, or need a man and van for a smaller job, our directory connects you with trusted local removal companies across the ${region}.`,
      `We list over ${count} removal companies covering ${locationsList}. Each listing includes verified contact details, Google ratings and opening hours so you can make an informed choice.`,
      `Get free, no-obligation quotes from multiple removal companies by using our quote request form. Simply tell us your moving details and we'll connect you with suitable operators in your area.`,
    ],
    ctaText: (loc) => `Moving in ${loc}?`,
    featuredSubtitle: (shortName) =>
      `Highest rated removal companies in the ${shortName}`,
    browseSubtitle: "Find removal companies near you",
    servicesSubtitle: "Whatever your moving needs, we can help",
  },
  "bouncy-castle-hire": {
    id: "bouncy-castle-hire",
    slug: "bouncy-castle-hire",
    name: "Bouncy Castle Hire",
    shortName: "Bouncy Castles",
    icon: "🏰",
    image: "/images/bouncy.png",
    imageAlt: "Bouncy castle hire illustration",
    heroTitle: (region) => `Find Bouncy Castle Hire in ${region}`,
    heroSubtitle: (count, locCount) =>
      `Compare ${count}+ bouncy castle hire companies across ${locCount} locations. Get free quotes in minutes.`,
    locationDescriptionTemplate: (loc) =>
      `Compare bouncy castle hire companies in ${loc}. View ratings, reviews and contact details. Get free quotes from local providers.`,
    metaDescriptionTemplate: (biz, loc) =>
      `${biz} provides bouncy castle hire in ${loc}. Contact details, reviews and free quotes.`,
    services: [
      {
        title: "Bouncy Castle Hire",
        desc: "Classic bouncy castles in all sizes for children's parties, fetes and family events.",
      },
      {
        title: "Inflatable Slide Hire",
        desc: "Giant inflatable slides for outdoor events, school fairs and community gatherings.",
      },
      {
        title: "Soft Play Hire",
        desc: "Indoor soft play equipment hire for toddler parties and rainy day entertainment.",
      },
      {
        title: "Assault Course Hire",
        desc: "Inflatable obstacle courses and assault courses for team events and corporate fun days.",
      },
      {
        title: "Disco Dome Hire",
        desc: "Enclosed bouncy castles with lights and music, perfect for evening parties and teen events.",
      },
      {
        title: "Ball Pool Hire",
        desc: "Inflatable ball pools with thousands of balls for young children's parties and events.",
      },
    ],
    seoHeading: (shortName) =>
      `Bouncy Castle Hire Across the ${shortName}`,
    seoParagraphs: (region, count, locationsList) => [
      `Whether you need a bouncy castle for a birthday party, an inflatable slide for a school fete, or soft play for a toddler event, our directory connects you with the best local providers across the ${region}.`,
      `We list over ${count} bouncy castle hire companies covering ${locationsList}. Each listing includes verified contact details, Google ratings and opening hours so you can make an informed choice.`,
      `Get free, no-obligation quotes from multiple providers by using our quote request form. Simply tell us your event details and we'll connect you with suitable companies in your area.`,
    ],
    ctaText: (loc) => `Planning a party in ${loc}?`,
    featuredSubtitle: (shortName) =>
      `Highest rated bouncy castle hire companies in the ${shortName}`,
    browseSubtitle: "Find bouncy castle hire companies near you",
    servicesSubtitle: "Whatever your party or event needs, we can help",
  },
  "limo-hire": {
    id: "limo-hire",
    slug: "limo-hire",
    name: "Limo Hire",
    shortName: "Limo Hire",
    icon: "🚗",
    image: "/images/limo.png",
    imageAlt: "Limo hire illustration",
    heroTitle: (region) => `Find Limo Hire in ${region}`,
    heroSubtitle: (count, locCount) =>
      `Compare ${count}+ limo hire companies across ${locCount} locations. Get free quotes in minutes.`,
    locationDescriptionTemplate: (loc) =>
      `Compare limo hire companies in ${loc}. View ratings, reviews and contact details. Get free quotes from local providers.`,
    metaDescriptionTemplate: (biz, loc) =>
      `${biz} provides limo hire in ${loc}. Contact details, reviews and free quotes.`,
    services: [
      {
        title: "Stretch Limo Hire",
        desc: "Classic stretch limousines for proms, weddings and special occasions. Luxury travel at its finest.",
      },
      {
        title: "Hummer Limo Hire",
        desc: "Hummer stretch limos for hen and stag parties, birthdays and VIP nights out.",
      },
      {
        title: "Wedding Car Hire",
        desc: "Elegant wedding cars including Rolls Royce, Bentley and vintage vehicles for your special day.",
      },
      {
        title: "Party Bus Hire",
        desc: "Party buses with sound systems, lighting and seating for the ultimate group night out.",
      },
      {
        title: "Prom Car Hire",
        desc: "Make an entrance at prom with a luxury limo, sports car or novelty vehicle.",
      },
      {
        title: "Corporate Chauffeur",
        desc: "Professional chauffeur services for business meetings, airport transfers and corporate events.",
      },
    ],
    seoHeading: (shortName) => `Limo Hire Across the ${shortName}`,
    seoParagraphs: (region, count, locationsList) => [
      `Whether you need a stretch limo for prom night, a wedding car for your big day, or a party bus for a celebration, our directory connects you with the best local limo hire companies across the ${region}.`,
      `We list over ${count} limo hire companies covering ${locationsList}. Each listing includes verified contact details, Google ratings and opening hours so you can make an informed choice.`,
      `Get free, no-obligation quotes from multiple providers by using our quote request form. Simply tell us your event details and we'll connect you with suitable companies in your area.`,
    ],
    ctaText: (loc) => `Need a limo in ${loc}?`,
    featuredSubtitle: (shortName) =>
      `Highest rated limo hire companies in the ${shortName}`,
    browseSubtitle: "Find limo hire companies near you",
    servicesSubtitle: "Whatever your occasion, arrive in style",
  },
  "plant-hire": {
    id: "plant-hire",
    slug: "plant-hire",
    name: "Plant Hire",
    shortName: "Plant Hire",
    icon: "🏗️",
    image: "/images/plant.png",
    imageAlt: "Plant hire illustration",
    heroTitle: (region) => `Find Plant Hire in ${region}`,
    heroSubtitle: (count, locCount) =>
      `Compare ${count}+ plant hire companies across ${locCount} locations. Get free quotes in minutes.`,
    locationDescriptionTemplate: (loc) =>
      `Compare plant hire companies in ${loc}. View ratings, reviews and contact details. Get free quotes from local providers.`,
    metaDescriptionTemplate: (biz, loc) =>
      `${biz} provides plant hire in ${loc}. Contact details, reviews and free quotes.`,
    services: [
      {
        title: "Mini Digger Hire",
        desc: "Compact excavators for driveways, gardens and small construction projects.",
      },
      {
        title: "Excavator Hire",
        desc: "Full-size excavators for earthmoving, foundations and large-scale projects.",
      },
      {
        title: "Dumper Hire",
        desc: "Site dumpers for moving soil, rubble and materials around construction sites.",
      },
      {
        title: "Telehandler Hire",
        desc: "Telescopic handlers for lifting and placing materials at height on construction and farm sites.",
      },
      {
        title: "Cherry Picker Hire",
        desc: "Access platforms and cherry pickers for working at height, maintenance and tree surgery.",
      },
      {
        title: "Roller & Compactor Hire",
        desc: "Road rollers and plate compactors for groundwork, driveways and highway projects.",
      },
    ],
    seoHeading: (shortName) => `Plant Hire Across the ${shortName}`,
    seoParagraphs: (region, count, locationsList) => [
      `Whether you need a mini digger for a garden project, an excavator for a building site, or a cherry picker for maintenance work, our directory connects you with trusted local plant hire companies across the ${region}.`,
      `We list over ${count} plant hire companies covering ${locationsList}. Each listing includes verified contact details, Google ratings and opening hours so you can make an informed choice.`,
      `Get free, no-obligation quotes from multiple providers by using our quote request form. Simply tell us your project requirements and we'll connect you with suitable companies in your area.`,
    ],
    ctaText: (loc) => `Need plant hire in ${loc}?`,
    featuredSubtitle: (shortName) =>
      `Highest rated plant hire companies in the ${shortName}`,
    browseSubtitle: "Find plant hire companies near you",
    servicesSubtitle: "Whatever your construction or groundwork needs, we can help",
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
