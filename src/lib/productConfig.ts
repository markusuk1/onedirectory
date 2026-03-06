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
  services: { title: string; desc: string }[];
  seoHeading: (shortName: string) => string;
  seoParagraphs: (
    region: string,
    count: number,
    locationsList: string
  ) => string[];
  locationSeoContent: (locationName: string, count: number, region: string) => { heading: string; paragraphs: string[] };
  locationFaqs: (locationName: string, region: string) => { question: string; answer: string }[];
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
    locationSeoContent: (loc, count, region) => ({
      heading: `Minibus & Coach Hire in ${loc}`,
      paragraphs: [
        `Looking for reliable minibus or coach hire in ${loc}? Our directory lists ${count} verified operators serving ${loc} and the surrounding ${region} area. Whether you need a standard minibus for a group night out, a full-size coach for a school trip, or a luxury party bus for a celebration, you can compare companies side by side and choose the right one for your trip.`,
        `All operators listed in our ${loc} directory include verified contact details, genuine Google ratings and reviews, opening hours and service information. You can view each company's fleet, check their availability and get in touch directly. If you would prefer us to do the legwork, use our free managed quote service and we will contact suitable operators on your behalf.`,
        `Minibus hire prices in ${loc} vary depending on the vehicle size, journey distance, duration and time of year. A standard 16-seater minibus with driver typically costs between £150 and £400 for a local return trip, while larger coaches and specialist vehicles like party buses may cost more. Weekend and peak-season bookings tend to carry a premium, so we recommend requesting quotes from multiple operators to compare prices.`,
        `Common reasons people book minibus and coach hire in ${loc} include airport transfers, wedding transport, corporate events, school and university trips, sports team travel, nights out and day trips. Many operators also offer self-drive minibus hire for groups of up to 16 who hold a standard driving licence, which can be a more flexible and cost-effective option for shorter journeys.`,
      ],
    }),
    locationFaqs: (loc, region) => [
      {
        question: `How much does minibus hire cost in ${loc}?`,
        answer: `Minibus hire prices in ${loc} depend on the vehicle size, journey distance and duration. A 16-seater minibus with driver typically costs £150-£400 for a local return trip. Larger coaches and party buses cost more. We recommend getting quotes from several operators to compare prices.`,
      },
      {
        question: `Can I hire a minibus without a driver in ${loc}?`,
        answer: `Yes, several operators in ${loc} offer self-drive minibus hire. You can drive a minibus with up to 16 seats on a standard UK car licence (Category D1 if you passed your test before January 1997, or with a separate D1 entitlement). Self-drive hire is usually cheaper than hiring with a driver.`,
      },
      {
        question: `How far in advance should I book a minibus in ${loc}?`,
        answer: `For weekend nights out and popular dates, book at least 2-4 weeks ahead. For weddings, proms and large events, 2-3 months is recommended. Midweek bookings can often be arranged with shorter notice. The earlier you book, the more choice you will have among operators in ${loc}.`,
      },
      {
        question: `What size minibus do I need?`,
        answer: `For small groups of 6-8, a standard minibus is fine. Groups of 9-16 need a 16-seater minibus. For 17-30 people, look at midi coaches. Groups over 30 will need a full-size coach seating 49-57 passengers. Most operators in ${loc} can advise on the best vehicle for your group size.`,
      },
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
    locationSeoContent: (loc, count, region) => ({
      heading: `Van Hire in ${loc}`,
      paragraphs: [
        `Need to hire a van in ${loc}? Our directory features ${count} van hire companies operating in ${loc} and the wider ${region} area. From small short-wheelbase vans for local moves to large Luton vans with tail lifts for full house removals, you can compare operators, read reviews and get in touch directly.`,
        `Every van hire company in our ${loc} listings includes verified contact details, Google ratings, opening hours and details of the vehicles they offer. Whether you need a van for a day, a weekend or a longer period, comparing multiple companies helps you find the best deal. Use our free quote service if you would like us to source prices on your behalf.`,
        `Van hire prices in ${loc} depend on the type of vehicle, rental duration and mileage. A standard SWB or MWB van typically costs between £40 and £80 per day, while Luton vans and specialist vehicles such as tippers or refrigerated vans may cost £70 to £150 per day. Most companies require a deposit and proof of identity, and some offer delivery and collection for an additional fee.`,
        `People hire vans in ${loc} for all kinds of reasons: house moves, furniture collection, business deliveries, trade and construction work, garden clearances and event logistics. If you are moving home, a Luton van with a tail lift is usually the best choice. For trade work and site clearances, a tipper or pickup truck may be more practical.`,
      ],
    }),
    locationFaqs: (loc, region) => [
      {
        question: `How much does van hire cost in ${loc}?`,
        answer: `Van hire prices in ${loc} depend on the vehicle size and hire duration. A short wheelbase van costs around £40-£80 per day. Long wheelbase vans are £45-£70 per day. Luton vans with tail lifts cost £60-£120 per day. Weekend rates (Friday to Monday) often offer better value than single-day hire.`,
      },
      {
        question: `Do I need a special licence to hire a van in ${loc}?`,
        answer: `No, most hire vans up to 3.5 tonnes can be driven on a standard UK car licence (Category B). This covers SWB, LWB and most Luton vans. You will usually need to be at least 21 years old with a full licence held for at least one year. Some companies require you to be 25 for larger vehicles.`,
      },
      {
        question: `Can I hire a van for just a few hours?`,
        answer: `Yes, many van hire companies in ${loc} offer half-day rates, typically covering 4-5 hours. This is a popular and cost-effective option for local furniture collections or small moves. Full-day, weekend and weekly rates are also available from most operators.`,
      },
      {
        question: `What type of van should I hire for moving house?`,
        answer: `For a 1-2 bedroom flat, a Luton van with a tail lift is the best choice. It offers 12-15 cubic metres of space and the tail lift makes loading heavy items much easier. For a studio flat or single room, a long wheelbase van may be sufficient and is cheaper to hire.`,
      },
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
    locationSeoContent: (loc, count, region) => ({
      heading: `Skip Hire in ${loc}`,
      paragraphs: [
        `Searching for skip hire in ${loc}? We list ${count} skip hire companies serving ${loc} and the surrounding ${region} area. Whether you need a mini skip for a bathroom refit, a builders skip for a renovation, or a large roll-on-roll-off container for a commercial clearance, our directory helps you compare local operators quickly.`,
        `Each skip hire company in our ${loc} directory includes verified contact details, Google ratings and reviews, and information about the skip sizes they offer. Comparing multiple companies is the best way to find competitive prices and reliable service. You can also use our free managed quote service and we will contact operators on your behalf.`,
        `Skip hire prices in ${loc} vary by skip size, hire duration and the type of waste being disposed of. As a rough guide, mini skips (2-3 yards) typically cost £100 to £200, builders skips (6-8 yards) cost £200 to £350, and large skips (12-16 yards) cost £300 to £500. Prices may also depend on whether a council permit is needed if the skip is placed on a public road rather than a private driveway.`,
        `Common uses for skip hire in ${loc} include home renovations, garden clearances, house clearouts, construction projects and commercial waste disposal. If you are unsure which skip size you need, most operators will be happy to advise. For bulky or heavy waste such as soil, rubble or concrete, a grab lorry may be a faster and more cost-effective alternative to a traditional skip.`,
      ],
    }),
    locationFaqs: (loc, region) => [
      {
        question: `How much does skip hire cost in ${loc}?`,
        answer: `Skip hire prices in ${loc} vary by size. Mini skips (2-3 yards) cost £100-£200, midi skips (4-5 yards) cost £150-£250, builders skips (6-8 yards) cost £200-£350, and large skips (12-16 yards) cost £300-£500. Prices may be higher if you need a council road permit.`,
      },
      {
        question: `Do I need a permit for a skip in ${loc}?`,
        answer: `If the skip is placed on your private driveway or land, no permit is needed. If it needs to go on a public road or pavement, you will need a skip permit from your local council. Most skip hire companies in ${loc} can arrange this for you, usually for an extra £20-£50.`,
      },
      {
        question: `What size skip do I need?`,
        answer: `For a bathroom or small garden clearance, a mini skip (2-3 yards) is usually enough. For a kitchen refit or larger garden job, a midi skip (4-5 yards) is better. For house renovations and building work, a builders skip (6-8 yards) is the most popular choice. For major projects, consider a 12-16 yard large skip or a roll-on-roll-off container.`,
      },
      {
        question: `What can I put in a skip?`,
        answer: `Most household and construction waste is accepted, including wood, metal, rubble, soil, furniture, garden waste and general rubbish. Items not allowed include asbestos, batteries, gas cylinders, electrical appliances (WEEE), tyres, paint and chemicals. If in doubt, ask your skip hire company before loading.`,
      },
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
    locationSeoContent: (loc, count, region) => ({
      heading: `Locksmiths in ${loc}`,
      paragraphs: [
        `Need a locksmith in ${loc}? Our directory lists ${count} verified locksmiths covering ${loc} and the wider ${region} area. Whether you are locked out of your home, need a lock changed after moving house, or want to upgrade your security, you can compare local locksmiths by ratings, reviews and services offered.`,
        `Every locksmith in our ${loc} listings includes verified contact details, Google ratings, opening hours and details of the services they provide. Many locksmiths in ${loc} offer 24/7 emergency callout for lockouts, so you can find help at any time of day or night. Use our directory to compare options and contact operators directly.`,
        `Locksmith prices in ${loc} depend on the type of work, time of day and complexity of the job. A standard lock change typically costs between £60 and £120, while an emergency lockout callout may cost £70 to £150 depending on the time and lock type. uPVC and composite door lock repairs involving multipoint mechanisms tend to cost more. Always ask for a quote before the locksmith begins work to avoid surprises.`,
        `Common reasons people call a locksmith in ${loc} include being locked out of their home or car, needing locks changed after moving into a new property, repairing damaged or faulty locks, upgrading to high-security cylinders, and getting replacement keys cut. If your locks are old or you have recently had a break-in, a locksmith can advise on the best security upgrades for your property.`,
      ],
    }),
    locationFaqs: (loc, region) => [
      {
        question: `How much does a locksmith cost in ${loc}?`,
        answer: `Locksmith prices in ${loc} depend on the job. A standard lock change costs £60-£120. An emergency lockout during daytime hours costs £60-£120, while evening and weekend callouts cost £90-£180. Late-night and bank holiday callouts can be £120-£250. Always ask for a quote before work starts.`,
      },
      {
        question: `How quickly can a locksmith get to me in ${loc}?`,
        answer: `Most emergency locksmiths in ${loc} aim to arrive within 30-60 minutes. In busy town centres, response times can be as fast as 15-20 minutes. When you call, ask for an estimated arrival time and confirm the total cost including any parts.`,
      },
      {
        question: `Should I change the locks when I move house?`,
        answer: `Yes, it is strongly recommended. You do not know who has copies of the existing keys. Previous owners, their family, neighbours, estate agents and tradespeople may all have had keys. A locksmith in ${loc} can change your locks quickly, giving you full control over who can access your home.`,
      },
      {
        question: `How do I find a trustworthy locksmith in ${loc}?`,
        answer: `Look for locksmiths with strong Google reviews and a verified local presence. Check for membership of a recognised trade body such as the Master Locksmiths Association (MLA). Ask for a price estimate before they attend. Avoid locksmiths who refuse to quote over the phone or demand cash only.`,
      },
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
        title: "Manual Driving Lessons",
        desc: "Learn to drive in a manual car with a qualified local instructor. Build confidence at your own pace.",
      },
      {
        title: "Automatic Driving Lessons",
        desc: "Automatic lessons for a simpler learning experience. Ideal if you want to focus on the road, not the gears.",
      },
      {
        title: "Intensive Courses",
        desc: "Fast-track your learning with intensive or crash courses. Pass your test in days or weeks, not months.",
      },
      {
        title: "Pass Plus",
        desc: "Post-test training to build confidence on motorways, at night and in all weather conditions. May reduce insurance costs.",
      },
      {
        title: "Refresher Lessons",
        desc: "Get back behind the wheel with refresher lessons. Perfect if you haven't driven in a while or need to rebuild confidence.",
      },
      {
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
