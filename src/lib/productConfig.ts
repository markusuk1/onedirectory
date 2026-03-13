import type { FormFieldConfig } from "./formFieldTypes";

export type ProductId = "minibus-hire" | "van-hire" | "skip-hire" | "locksmith" | "removal-companies" | "bouncy-castle-hire" | "limo-hire" | "plant-hire" | "driving-lessons";

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
  services: { id: string; title: string; desc: string }[];
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
  /** Customer-facing quote form fields (product-specific section) */
  quoteFields?: FormFieldConfig[];
  /** Operator auto-quote configuration fields */
  autoQuoteFields?: FormFieldConfig[];
  /** Price in pence for buying a lead */
  leadPricePence: number;
  /** SumUp payment link for buying a lead */
  sumupBuyLink: string;
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
        id: "minibus-hire",
        title: "Minibus Hire",
        desc: "8-16 seater minibuses with driver for any occasion. Perfect for nights out, weddings and corporate events.",
      },
      {
        id: "coach-hire",
        title: "Coach Hire",
        desc: "Full-size coaches for larger groups. Ideal for school trips, tours and long-distance travel.",
      },
      {
        id: "party-bus",
        title: "Party Bus",
        desc: "Party buses with sound systems and lighting for hen dos, stag dos and birthday celebrations.",
      },
      {
        id: "self-drive",
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
    quoteFields: [
      { name: "passengers", label: "Number of Passengers", type: "number", required: true, min: 1, max: 72, half: true },
      { name: "date", label: "Journey Date", type: "date", required: true, half: true },
      { name: "journeyType", label: "Journey Type", type: "select", required: true, half: true, options: [
        { value: "one-way", label: "One Way" },
        { value: "return", label: "Return" },
        { value: "multi-stop", label: "Multi-Stop" },
      ]},
      { name: "pickup", label: "Pickup Location", type: "text", required: true, half: true, placeholder: "e.g. Newcastle city centre" },
      { name: "destination", label: "Destination", type: "text", required: true, half: true, placeholder: "e.g. Newcastle Airport" },
    ],
    autoQuoteFields: [
      { name: "maxPassengers", label: "Max Passengers", type: "number", half: true, placeholder: "16" },
      { name: "minPrice", label: "Minimum Price", type: "number", half: true, prefix: "£", placeholder: "50" },
    ],
    leadPricePence: 499,
    sumupBuyLink: "https://pay.sumup.com/b2c/Q5CZT3TS",
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
        id: "swb-van",
        title: "SWB Van Hire",
        desc: "Short wheelbase vans ideal for small moves and local deliveries.",
      },
      {
        id: "lwb-van",
        title: "LWB Van Hire",
        desc: "Long wheelbase vans for larger loads and commercial use.",
      },
      {
        id: "luton-van",
        title: "Luton Van Hire",
        desc: "Box body vans with tail lifts, perfect for house moves.",
      },
      {
        id: "tipper-van",
        title: "Tipper Van Hire",
        desc: "Tipper vans for construction, landscaping and waste removal.",
      },
      {
        id: "refrigerated-van",
        title: "Refrigerated Van Hire",
        desc: "Temperature-controlled vans for food and pharmaceutical transport.",
      },
      {
        id: "pickup-truck",
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
    quoteFields: [
      { name: "vanSize", label: "Van Type", type: "select", required: true, half: true, placeholder: "Select type...", options: [
        { value: "swb", label: "Short Wheelbase Van" },
        { value: "lwb", label: "Long Wheelbase Van" },
        { value: "luton", label: "Luton Van" },
        { value: "tipper", label: "Tipper Van" },
        { value: "refrigerated", label: "Refrigerated Van" },
        { value: "pickup", label: "Pickup Truck" },
        { value: "not-sure", label: "Not sure — need advice" },
      ]},
      { name: "driveType", label: "Self-Drive or With Driver?", type: "select", required: true, half: true, options: [
        { value: "self-drive", label: "Self-Drive" },
        { value: "with-driver", label: "With Driver" },
        { value: "either", label: "Either / No Preference" },
      ]},
      { name: "collectionLocation", label: "Collection / Delivery Location", type: "text", required: true, half: true, placeholder: "e.g. Manchester city centre" },
      { name: "startDate", label: "Start Date", type: "date", required: true, half: true },
      { name: "endDate", label: "End Date", type: "date", required: true, half: true },
    ],
    autoQuoteFields: [
      { name: "dailyRates.swb", label: "SWB Van Daily Rate", type: "number", half: true, prefix: "£" },
      { name: "dailyRates.lwb", label: "LWB Van Daily Rate", type: "number", half: true, prefix: "£" },
      { name: "dailyRates.luton", label: "Luton Van Daily Rate", type: "number", half: true, prefix: "£" },
      { name: "dailyRates.tipper", label: "Tipper Van Daily Rate", type: "number", half: true, prefix: "£" },
    ],
    leadPricePence: 399,
    sumupBuyLink: "https://pay.sumup.com/b2c/QVVFEF2A",
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
        id: "mini-skip",
        title: "Mini Skip Hire",
        desc: "2-3 yard mini skips ideal for small garden clearances and bathroom refits.",
      },
      {
        id: "midi-skip",
        title: "Midi Skip Hire",
        desc: "4-5 yard midi skips for medium projects like kitchen renovations.",
      },
      {
        id: "builders-skip",
        title: "Builders Skip Hire",
        desc: "6-8 yard builders skips, the most popular size for home and trade projects.",
      },
      {
        id: "large-skip",
        title: "Large Skip Hire",
        desc: "12-16 yard large skips for major renovations and commercial clearances.",
      },
      {
        id: "roll-on-roll-off",
        title: "Roll-On Roll-Off",
        desc: "20-40 yard RoRo skips for large-scale construction and demolition waste.",
      },
      {
        id: "grab-hire",
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
    quoteFields: [
      { name: "serviceType", label: "Service Type", type: "select", half: true, options: [
        { value: "", label: "Any / Not Sure" },
        { value: "skip-hire", label: "Skip Hire" },
        { value: "grab-hire", label: "Grab Hire" },
      ]},
      { name: "skipSize", label: "Skip Size", type: "select", half: true, options: [
        { value: "", label: "Not applicable / not sure" },
        { value: "mini", label: "Mini Skip (2-3 yards)" },
        { value: "midi", label: "Midi Skip (4-5 yards)" },
        { value: "builders", label: "Builders Skip (6-8 yards)" },
        { value: "large", label: "Large Skip (12-16 yards)" },
        { value: "roro", label: "Roll-On Roll-Off (20-40 yards)" },
      ]},
      { name: "wasteType", label: "Waste Type", type: "select", required: true, half: true, placeholder: "Select type...", options: [
        { value: "general", label: "General / Mixed Waste" },
        { value: "garden", label: "Garden Waste" },
        { value: "soil-rubble", label: "Soil & Rubble" },
        { value: "construction", label: "Construction / Demolition" },
        { value: "household", label: "Household Clearance" },
        { value: "commercial", label: "Commercial Waste" },
      ]},
      { name: "duration", label: "How Long Do You Need It?", type: "select", required: true, half: true, placeholder: "Select duration...", options: [
        { value: "1-3-days", label: "1-3 days" },
        { value: "1-week", label: "1 week" },
        { value: "2-weeks", label: "2 weeks" },
        { value: "1-month", label: "1 month" },
        { value: "ongoing", label: "Ongoing / not sure" },
      ]},
      { name: "placement", label: "Where Will the Skip Go?", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "driveway", label: "Private driveway / land" },
        { value: "road", label: "Public road (permit needed)" },
        { value: "not-sure", label: "Not sure" },
      ]},
      { name: "address", label: "Delivery Address / Postcode", type: "text", required: true, placeholder: "e.g. NE1 4ST or 12 High Street, Newcastle" },
    ],
    autoQuoteFields: [
      { name: "prices.mini", label: "Mini Skip Price", type: "number", half: true, prefix: "£" },
      { name: "prices.midi", label: "Midi Skip Price", type: "number", half: true, prefix: "£" },
      { name: "prices.builders", label: "Builders Skip Price", type: "number", half: true, prefix: "£" },
      { name: "prices.large", label: "Large Skip Price", type: "number", half: true, prefix: "£" },
    ],
    leadPricePence: 299,
    sumupBuyLink: "https://pay.sumup.com/b2c/Q7TFZ16B",
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
        id: "emergency-locksmith",
        title: "Emergency Locksmith",
        desc: "24/7 emergency lockout service for homes, businesses and vehicles. Fast response when you need it most.",
      },
      {
        id: "lock-repair",
        title: "Lock Repair",
        desc: "Professional repair of damaged, stiff or faulty locks on all door types including uPVC and composite.",
      },
      {
        id: "lock-change",
        title: "Lock Change",
        desc: "Full lock replacement and upgrades to high-security cylinders. Ideal after moving home or losing keys.",
      },
      {
        id: "upvc-composite-door-locks",
        title: "uPVC & Composite Door Locks",
        desc: "Specialist fitting and repair of multipoint locking mechanisms on uPVC and composite doors.",
      },
      {
        id: "auto-locksmith",
        title: "Auto Locksmith",
        desc: "Car lockout recovery, key cutting and transponder key programming for all vehicle makes.",
      },
      {
        id: "key-cutting",
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
    quoteFields: [
      { name: "serviceType", label: "Service Needed", type: "select", required: true, half: true, placeholder: "Select service...", options: [
        { value: "emergency-lockout", label: "Emergency Lockout" },
        { value: "lock-change", label: "Lock Change" },
        { value: "lock-repair", label: "Lock Repair" },
        { value: "key-cutting", label: "Key Cutting" },
        { value: "auto-locksmith", label: "Auto Locksmith (Vehicle)" },
        { value: "security-upgrade", label: "Security Upgrade" },
        { value: "other", label: "Other" },
      ]},
      { name: "urgency", label: "How Urgent?", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "emergency", label: "Emergency — right now" },
        { value: "today", label: "Today" },
        { value: "within-48h", label: "Within 48 hours" },
        { value: "planned", label: "Planned / flexible" },
      ]},
      { name: "propertyType", label: "Property Type", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "house", label: "House" },
        { value: "flat", label: "Flat / Apartment" },
        { value: "business", label: "Business / Commercial" },
        { value: "vehicle", label: "Vehicle" },
        { value: "other", label: "Other" },
      ]},
      { name: "location", label: "Location / Postcode", type: "text", required: true, placeholder: "e.g. NE1 4ST or 12 High Street, Newcastle" },
    ],
    autoQuoteFields: [
      { name: "calloutFee", label: "Standard Callout Fee", type: "number", half: true, prefix: "£", placeholder: "60" },
      { name: "emergencyCalloutFee", label: "Emergency Callout Fee", type: "number", half: true, prefix: "£", placeholder: "85" },
    ],
    leadPricePence: 499,
    sumupBuyLink: "https://pay.sumup.com/b2c/Q5CZT3TS",
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
        id: "house-removals",
        title: "House Removals",
        desc: "Full house moving service with experienced teams. Careful handling of all your belongings from start to finish.",
      },
      {
        id: "office-removals",
        title: "Office Removals",
        desc: "Commercial and office relocations with minimal disruption. IT equipment, furniture and document moving.",
      },
      {
        id: "man-and-van",
        title: "Man & Van",
        desc: "Affordable man and van service for smaller moves, single items and student relocations.",
      },
      {
        id: "packing-services",
        title: "Packing Services",
        desc: "Professional packing and unpacking service. Quality materials and careful handling of fragile items.",
      },
      {
        id: "storage",
        title: "Storage",
        desc: "Short and long-term storage solutions. Secure, clean facilities for your belongings during your move.",
      },
      {
        id: "piano-specialist",
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
    quoteFields: [
      { name: "moveType", label: "Type of Move", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "house", label: "House / Flat Move" },
        { value: "office", label: "Office / Commercial" },
        { value: "man-and-van", label: "Man & Van (small move)" },
        { value: "storage", label: "Moving to Storage" },
        { value: "international", label: "International Move" },
        { value: "other", label: "Other" },
      ]},
      { name: "bedrooms", label: "Number of Bedrooms", type: "select", half: true, options: [
        { value: "", label: "N/A or not sure" },
        { value: "studio", label: "Studio / 1 room" },
        { value: "1", label: "1 Bedroom" },
        { value: "2", label: "2 Bedrooms" },
        { value: "3", label: "3 Bedrooms" },
        { value: "4", label: "4 Bedrooms" },
        { value: "5+", label: "5+ Bedrooms" },
      ]},
      { name: "moveDate", label: "Moving Date", type: "date", required: true, half: true },
      { name: "movingFrom", label: "Moving From", type: "text", required: true, half: true, placeholder: "e.g. NE1 4ST or 12 High Street, Newcastle" },
      { name: "movingTo", label: "Moving To", type: "text", required: true, half: true, placeholder: "e.g. LS1 5DL or 24 Park Lane, Leeds" },
      { name: "needPacking", label: "Do You Need a Packing Service?", type: "select", options: [
        { value: "no", label: "No — I'll pack myself" },
        { value: "yes", label: "Yes — full packing service" },
        { value: "partial", label: "Partial — fragile items only" },
        { value: "not-sure", label: "Not sure yet" },
      ]},
    ],
    leadPricePence: 399,
    sumupBuyLink: "https://pay.sumup.com/b2c/QVVFEF2A",
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
        id: "bouncy-castle-hire",
        title: "Bouncy Castle Hire",
        desc: "Classic bouncy castles in all sizes for children's parties, fetes and family events.",
      },
      {
        id: "inflatable-slide-hire",
        title: "Inflatable Slide Hire",
        desc: "Giant inflatable slides for outdoor events, school fairs and community gatherings.",
      },
      {
        id: "soft-play-hire",
        title: "Soft Play Hire",
        desc: "Indoor soft play equipment hire for toddler parties and rainy day entertainment.",
      },
      {
        id: "assault-course-hire",
        title: "Assault Course Hire",
        desc: "Inflatable obstacle courses and assault courses for team events and corporate fun days.",
      },
      {
        id: "disco-dome-hire",
        title: "Disco Dome Hire",
        desc: "Enclosed bouncy castles with lights and music, perfect for evening parties and teen events.",
      },
      {
        id: "ball-pool-hire",
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
    quoteFields: [
      { name: "serviceType", label: "What Do You Need?", type: "select", half: true, placeholder: "Select...", options: [
        { value: "", label: "Any / Not Sure" },
        { value: "bouncy-castle", label: "Bouncy Castle" },
        { value: "inflatable-slide", label: "Inflatable Slide" },
        { value: "soft-play", label: "Soft Play" },
        { value: "assault-course", label: "Assault Course / Obstacle Course" },
        { value: "disco-dome", label: "Disco Dome" },
        { value: "ball-pool", label: "Ball Pool" },
      ]},
      { name: "eventType", label: "Event Type", type: "select", half: true, placeholder: "Select...", options: [
        { value: "birthday", label: "Birthday Party" },
        { value: "wedding", label: "Wedding" },
        { value: "school-fete", label: "School Fete / Fun Day" },
        { value: "corporate", label: "Corporate Event" },
        { value: "community", label: "Community Event" },
        { value: "other", label: "Other" },
      ]},
      { name: "eventDate", label: "Event Date", type: "date", required: true, half: true },
      { name: "venue", label: "Venue / Location", type: "text", required: true, half: true, placeholder: "e.g. Community hall, back garden, park" },
      { name: "indoorOutdoor", label: "Indoor or Outdoor?", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "indoor", label: "Indoor" },
        { value: "outdoor", label: "Outdoor" },
        { value: "either", label: "Either / Not Sure" },
      ]},
      { name: "ageRange", label: "Age Range", type: "select", half: true, placeholder: "Select...", options: [
        { value: "under-5", label: "Under 5" },
        { value: "5-10", label: "5-10 years" },
        { value: "10-16", label: "10-16 years" },
        { value: "adults", label: "Adults" },
        { value: "mixed", label: "Mixed ages" },
      ]},
    ],
    leadPricePence: 299,
    sumupBuyLink: "https://pay.sumup.com/b2c/Q7TFZ16B",
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
        id: "stretch-limo-hire",
        title: "Stretch Limo Hire",
        desc: "Classic stretch limousines for proms, weddings and special occasions. Luxury travel at its finest.",
      },
      {
        id: "hummer-limo-hire",
        title: "Hummer Limo Hire",
        desc: "Hummer stretch limos for hen and stag parties, birthdays and VIP nights out.",
      },
      {
        id: "wedding-car-hire",
        title: "Wedding Car Hire",
        desc: "Elegant wedding cars including Rolls Royce, Bentley and vintage vehicles for your special day.",
      },
      {
        id: "party-bus-hire",
        title: "Party Bus Hire",
        desc: "Party buses with sound systems, lighting and seating for the ultimate group night out.",
      },
      {
        id: "prom-car-hire",
        title: "Prom Car Hire",
        desc: "Make an entrance at prom with a luxury limo, sports car or novelty vehicle.",
      },
      {
        id: "corporate-chauffeur",
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
    quoteFields: [
      { name: "serviceType", label: "Vehicle Type", type: "select", half: true, placeholder: "Select...", options: [
        { value: "", label: "Any / Not Sure" },
        { value: "stretch-limo", label: "Stretch Limousine" },
        { value: "hummer-limo", label: "Hummer Limo" },
        { value: "party-bus", label: "Party Bus" },
        { value: "wedding-car", label: "Wedding Car" },
        { value: "vintage-classic", label: "Vintage / Classic Car" },
        { value: "supercar", label: "Supercar" },
        { value: "chauffeur", label: "Chauffeur Service" },
      ]},
      { name: "occasion", label: "Occasion", type: "select", half: true, placeholder: "Select...", options: [
        { value: "wedding", label: "Wedding" },
        { value: "prom", label: "Prom" },
        { value: "hen-stag", label: "Hen / Stag Do" },
        { value: "birthday", label: "Birthday" },
        { value: "night-out", label: "Night Out" },
        { value: "corporate", label: "Corporate / Business" },
        { value: "airport-transfer", label: "Airport Transfer" },
        { value: "other", label: "Other" },
      ]},
      { name: "eventDate", label: "Date", type: "date", required: true, half: true },
      { name: "passengers", label: "Number of Passengers", type: "number", required: true, half: true, min: 1, max: 50 },
      { name: "pickupLocation", label: "Pickup Location", type: "text", required: true, half: true, placeholder: "e.g. Newcastle city centre" },
      { name: "destination", label: "Destination", type: "text", required: true, half: true, placeholder: "e.g. Newcastle Airport" },
      { name: "hours", label: "Hours Needed", type: "number", half: true, min: 1, max: 24, placeholder: "e.g. 4" },
    ],
    leadPricePence: 399,
    sumupBuyLink: "https://pay.sumup.com/b2c/QVVFEF2A",
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
        id: "mini-digger-hire",
        title: "Mini Digger Hire",
        desc: "Compact excavators for driveways, gardens and small construction projects.",
      },
      {
        id: "excavator-hire",
        title: "Excavator Hire",
        desc: "Full-size excavators for earthmoving, foundations and large-scale projects.",
      },
      {
        id: "dumper-hire",
        title: "Dumper Hire",
        desc: "Site dumpers for moving soil, rubble and materials around construction sites.",
      },
      {
        id: "telehandler-hire",
        title: "Telehandler Hire",
        desc: "Telescopic handlers for lifting and placing materials at height on construction and farm sites.",
      },
      {
        id: "cherry-picker-hire",
        title: "Cherry Picker Hire",
        desc: "Access platforms and cherry pickers for working at height, maintenance and tree surgery.",
      },
      {
        id: "roller-compactor-hire",
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
    quoteFields: [
      { name: "equipmentType", label: "Equipment Type", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "mini-digger", label: "Mini Digger" },
        { value: "excavator", label: "Excavator" },
        { value: "dumper", label: "Dumper" },
        { value: "telehandler", label: "Telehandler" },
        { value: "cherry-picker", label: "Cherry Picker / Access Platform" },
        { value: "roller", label: "Roller / Compactor" },
        { value: "forklift", label: "Forklift" },
        { value: "other", label: "Other" },
      ]},
      { name: "operatedOrSelfDrive", label: "Operated or Self-Drive?", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "operated", label: "With Operator" },
        { value: "self-drive", label: "Self-Drive" },
        { value: "either", label: "Either / No Preference" },
      ]},
      { name: "startDate", label: "Start Date", type: "date", required: true, half: true },
      { name: "duration", label: "Duration", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "1-day", label: "1 day" },
        { value: "2-3-days", label: "2-3 days" },
        { value: "1-week", label: "1 week" },
        { value: "2-weeks", label: "2 weeks" },
        { value: "1-month", label: "1 month+" },
        { value: "ongoing", label: "Ongoing" },
      ]},
      { name: "siteLocation", label: "Site Location / Postcode", type: "text", required: true, placeholder: "e.g. NE1 4ST or construction site address" },
    ],
    leadPricePence: 399,
    sumupBuyLink: "https://pay.sumup.com/b2c/QVVFEF2A",
  },
  "driving-lessons": {
    id: "driving-lessons",
    slug: "driving-lessons",
    name: "Driving Lessons",
    shortName: "Driving Lessons",
    icon: "🚗",
    image: "/images/driving.png",
    imageAlt: "Driving lessons illustration",
    heroTitle: (region) => `Find Driving Lessons in ${region}`,
    heroSubtitle: (count, locCount) =>
      `Compare ${count}+ driving instructors across ${locCount} locations. Read reviews and book lessons today.`,
    locationDescriptionTemplate: (loc) =>
      `Compare driving instructors in ${loc}. View ratings, reviews and contact details. Find the right instructor for you.`,
    metaDescriptionTemplate: (biz, loc) =>
      `${biz} provides driving lessons in ${loc}. Contact details, reviews and pricing.`,
    services: [
      {
        id: "manual-driving-lessons",
        title: "Manual Driving Lessons",
        desc: "Learn to drive in a manual car with a qualified local instructor. Build confidence at your own pace.",
      },
      {
        id: "automatic-driving-lessons",
        title: "Automatic Driving Lessons",
        desc: "Automatic lessons for a simpler learning experience. Ideal if you want to focus on the road, not the gears.",
      },
      {
        id: "intensive-courses",
        title: "Intensive Courses",
        desc: "Fast-track your learning with intensive or crash courses. Pass your test in days or weeks, not months.",
      },
      {
        id: "pass-plus",
        title: "Pass Plus",
        desc: "Post-test training to build confidence on motorways, at night and in all weather conditions. May reduce insurance costs.",
      },
      {
        id: "refresher-lessons",
        title: "Refresher Lessons",
        desc: "Get back behind the wheel with refresher lessons. Perfect if you haven't driven in a while or need to rebuild confidence.",
      },
      {
        id: "mock-tests",
        title: "Mock Tests",
        desc: "Practice test routes with your instructor to prepare for the real thing. Reduce nerves and improve your chances.",
      },
    ],
    seoHeading: (shortName) =>
      `Driving Lessons Across the ${shortName}`,
    seoParagraphs: (region, count, locationsList) => [
      `Whether you're a complete beginner, looking for automatic lessons, or need an intensive course to pass quickly, our directory connects you with qualified driving instructors across the ${region}.`,
      `We list over ${count} driving instructors covering ${locationsList}. Each listing includes verified contact details, Google ratings and opening hours so you can find the right instructor for you.`,
      `Browse our directory to compare driving instructors in your area. Check ratings, read reviews and contact instructors directly to book your first lesson.`,
    ],
    ctaText: (loc) => `Looking for driving lessons in ${loc}?`,
    featuredSubtitle: (shortName) =>
      `Highest rated driving instructors in the ${shortName}`,
    browseSubtitle: "Find driving instructors near you",
    servicesSubtitle: "Whatever stage of your driving journey, we can help",
    quoteFields: [
      { name: "lessonType", label: "Lesson Type", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "weekly", label: "Weekly Lessons" },
        { value: "intensive", label: "Intensive / Crash Course" },
        { value: "refresher", label: "Refresher Lessons" },
        { value: "pass-plus", label: "Pass Plus" },
        { value: "mock-test", label: "Mock Test Preparation" },
      ]},
      { name: "transmission", label: "Transmission", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "manual", label: "Manual" },
        { value: "automatic", label: "Automatic" },
        { value: "no-preference", label: "No Preference" },
      ]},
      { name: "experience", label: "Experience Level", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "complete-beginner", label: "Complete Beginner" },
        { value: "some-lessons", label: "Had Some Lessons" },
        { value: "test-ready", label: "Nearly Test Ready" },
        { value: "full-licence", label: "Full Licence (refresher)" },
      ]},
      { name: "area", label: "Pickup Area / Postcode", type: "text", required: true, half: true, placeholder: "e.g. NE1 4ST or Jesmond, Newcastle" },
    ],
    leadPricePence: 299,
    sumupBuyLink: "https://pay.sumup.com/b2c/Q7TFZ16B",
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

/**
 * Maps enrichment service names (from enrich_product.py PRODUCT_SERVICES)
 * to service IDs used in productConfig. Used by auto-quote routing and
 * name-based service detection.
 */
export const SERVICE_MAPPING: Record<ProductId, Record<string, string>> = {
  "skip-hire": {
    "Mini Skip (2-3 Yard)": "mini-skip",
    "Midi Skip (4-5 Yard)": "midi-skip",
    "Builders Skip (6-8 Yard)": "builders-skip",
    "Maxi Skip (12-16 Yard)": "large-skip",
    "Roll-on Roll-off": "roll-on-roll-off",
    "Grab Hire": "grab-hire",
    "Wait and Load": "grab-hire",
    "Commercial Waste": "builders-skip",
    "Domestic Waste": "mini-skip",
  },
  "removal-companies": {
    "House Removals": "house-removals",
    "Office Removals": "office-removals",
    "Man and Van": "man-and-van",
    "Packing Service": "packing-services",
    "Storage": "storage",
    "Piano Removals": "piano-specialist",
    "Antique & Specialist": "piano-specialist",
    "International Removals": "house-removals",
    "Furniture Assembly": "man-and-van",
    "Clearance Service": "house-removals",
  },
  "bouncy-castle-hire": {
    "Bouncy Castles": "bouncy-castle-hire",
    "Soft Play": "soft-play-hire",
    "Disco Dome": "disco-dome-hire",
    "Obstacle Course": "assault-course-hire",
    "Inflatable Slide": "inflatable-slide-hire",
    "Ball Pool": "ball-pool-hire",
    "Hot Tub Hire": "bouncy-castle-hire",
    "Sumo Suits": "assault-course-hire",
    "Rodeo Bull": "assault-course-hire",
    "Bungee Run": "assault-course-hire",
    "Gladiator Joust": "assault-course-hire",
  },
  "limo-hire": {
    "Stretch Limo": "stretch-limo-hire",
    "Hummer Limo": "hummer-limo-hire",
    "Party Bus": "party-bus-hire",
    "Wedding Car": "wedding-car-hire",
    "Prom Transport": "prom-car-hire",
    "Chauffeur Service": "corporate-chauffeur",
    "Classic & Vintage": "wedding-car-hire",
    "Rolls Royce": "wedding-car-hire",
    "Bentley": "wedding-car-hire",
    "Supercar Hire": "prom-car-hire",
    "Airport Transfer": "corporate-chauffeur",
  },
  "plant-hire": {
    "Mini Digger": "mini-digger-hire",
    "Excavator": "excavator-hire",
    "Dumper": "dumper-hire",
    "Telehandler": "telehandler-hire",
    "Cherry Picker": "cherry-picker-hire",
    "Roller": "roller-compactor-hire",
    "Compactor": "roller-compactor-hire",
    "Scissor Lift": "cherry-picker-hire",
    "Forklift": "telehandler-hire",
    "Concrete Mixer": "dumper-hire",
    "Skid Steer": "mini-digger-hire",
  },
  "driving-lessons": {
    "Manual Lessons": "manual-driving-lessons",
    "Automatic Lessons": "automatic-driving-lessons",
    "Intensive Course": "intensive-courses",
    "Pass Plus": "pass-plus",
    "Refresher Lessons": "refresher-lessons",
    "Motorway Lessons": "pass-plus",
    "Theory Test Prep": "mock-tests",
    "Nervous Drivers": "refresher-lessons",
    "Block Booking": "manual-driving-lessons",
  },
  locksmith: {
    "Emergency Lockout": "emergency-locksmith",
    "Lock Change": "lock-change",
    "Lock Repair": "lock-repair",
    "UPVC Lock": "upvc-composite-door-locks",
    "Auto Locksmith": "auto-locksmith",
    "Key Cutting": "key-cutting",
    "Safe Opening": "emergency-locksmith",
    "Boarding Up": "emergency-locksmith",
    "Security Upgrades": "lock-change",
    "Master Key System": "lock-change",
    "Access Control": "lock-change",
  },
  "van-hire": {
    "SWB Van": "swb-van",
    "LWB Van": "lwb-van",
    "Luton Van": "luton-van",
    "Tipper Van": "tipper-van",
    "Refrigerated Van": "refrigerated-van",
    "Pickup Truck": "pickup-truck",
    "MWB Van": "lwb-van",
    "Flatbed": "tipper-van",
    "Crew Van": "lwb-van",
    "Transit Van": "lwb-van",
    "Sprinter Van": "lwb-van",
    "Self-Drive Hire": "swb-van",
  },
  "minibus-hire": {
    "Airport Transfers": "minibus-hire",
    "Wedding Transport": "minibus-hire",
    "Corporate & Executive": "minibus-hire",
    "School Transport": "minibus-hire",
    "Stag & Hen Parties": "party-bus",
    "Party Bus": "party-bus",
    "Sports & Events": "minibus-hire",
    "Day Trips & Tours": "coach-hire",
    "Self-Drive Hire": "self-drive",
    "Long Distance & Nationwide": "coach-hire",
    "Night Out Transport": "party-bus",
  },
};
