import type { FormFieldConfig } from "./formFieldTypes";

export type ProductId = "minibus-hire" | "van-hire" | "skip-hire" | "locksmith" | "removal-companies" | "bouncy-castle-hire" | "limo-hire" | "plant-hire" | "driving-lessons" | "pest-control";

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
  /** SumUp payment link for buying a lead (legacy — used when ENABLE_VERIFIED_PAYMENTS is off) */
  sumupBuyLink: string;
  /** Quote credit packs available for purchase */
  creditPacks: { credits: number; pricePence: number; label: string }[];
  /** FAQ entries for location pages — used for content + FAQPage schema */
  locationFaq?: (locationName: string, count: number) => { question: string; answer: string }[];
  /** Advice section for business detail pages — helps users evaluate providers */
  choosingAdvice?: (locationName: string) => { heading: string; paragraphs: string[] };
  /** Editorial content for location pages — area overview, tips, pricing */
  locationEditorial?: (locationName: string) => { heading: string; paragraphs: string[] };
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
      { name: "pickup", label: "Pickup Location (inc. postcode)", type: "text", required: true, half: true, placeholder: "e.g. 12 High Street, NE1 4ST", requiresPostcode: true },
      { name: "destination", label: "Destination (inc. postcode)", type: "text", required: true, half: true, placeholder: "e.g. Newcastle Airport, NE13 8BZ", requiresPostcode: true },
    ],
    autoQuoteFields: [
      { name: "maxPassengers", label: "Max Passengers", type: "number", half: true, placeholder: "16" },
      { name: "minPrice", label: "Minimum Price", type: "number", half: true, prefix: "£", placeholder: "50" },
    ],
    leadPricePence: 100,
    sumupBuyLink: "https://pay.sumup.com/b2c/QQF710VC",
    creditPacks: [
      { credits: 25, pricePence: 1000, label: "25 quotes — £10" },
      { credits: 50, pricePence: 1750, label: "50 quotes — £17.50" },
      { credits: 100, pricePence: 3000, label: "100 quotes — £30" },
    ],
    locationFaq: (loc, count) => [
      { question: `How many minibus hire companies are in ${loc}?`, answer: `There are ${count} minibus and coach hire companies listed in ${loc}. You can compare ratings, reviews and services to find the right operator for your trip.` },
      { question: `How much does minibus hire cost in ${loc}?`, answer: `Minibus hire in ${loc} typically costs £150-£400 for a day trip depending on the vehicle size, distance, and duration. A 16-seater for a local return journey starts from around £150-£250. Get free quotes to compare prices from local operators.` },
      { question: `How do I choose a minibus company in ${loc}?`, answer: `Check Google reviews and ratings, confirm the operator has a valid PSV licence and appropriate insurance, and compare at least three quotes. Look for companies with experience in your type of trip, whether that is airport transfers, weddings, or corporate events.` },
    ],
    choosingAdvice: (loc) => ({
      heading: `Choosing a Minibus Hire Company in ${loc}`,
      paragraphs: [
        `When hiring a minibus or coach in ${loc}, the most important thing to verify is that the operator holds a valid PSV (Public Service Vehicle) licence. This is a legal requirement for any company carrying passengers for hire. Ask to see it, or check the operator's name on the Traffic Commissioner's website. Without this licence, the vehicle's insurance may be invalid, leaving your group unprotected.`,
        `Check Google reviews and ratings — look for consistent positive feedback rather than just a high score. Pay attention to comments about punctuality, vehicle condition and driver professionalism. A company with 50 reviews averaging 4.5 stars is generally more reliable than one with 3 reviews at 5.0.`,
        `Always get at least three quotes. Prices for the same journey can vary by 30-50% between operators. Make sure each quote covers the same thing — driver, fuel, parking charges and waiting time should all be included. Be wary of quotes that seem too cheap; they may involve hidden extras or indicate an unlicensed operator.`,
      ],
    }),
    locationEditorial: (loc) => ({
      heading: `Minibus & Coach Hire in ${loc}: What You Need to Know`,
      paragraphs: [
        `The group transport market in ${loc} serves a wide range of needs, from wedding parties and corporate away days to airport transfers, school trips and nights out. Most operators in the area run fleets ranging from 8-seater minibuses to 53-seat executive coaches, with many offering both self-drive and chauffeured options. Demand peaks heavily around prom season in June and July, and during the Christmas party period from late November through December, so early booking is strongly recommended during these windows.`,
        `When booking minibus hire in ${loc}, expect to provide your pickup and drop-off locations, the number of passengers, and any special requirements such as wheelchair accessibility or luggage space. Most operators require a minimum booking of two hours for local journeys. For longer trips, confirm whether the driver's meals and accommodation are included or charged separately. Self-drive hire is available for groups wanting more flexibility, though you will need a valid D1 licence for vehicles carrying more than 8 passengers.`,
        `Typical pricing for minibus hire in ${loc} ranges from £150 to £450 for a full day depending on vehicle size and distance. A 16-seater for a local return journey usually costs £150 to £250, while a full-size coach for a longer trip can reach £500 or more. Airport transfers are often priced as fixed-rate packages. Most operators charge by the hour for open-ended bookings, with hourly rates between £30 and £60 for a minibus and £50 to £90 for a coach.`,
        `All passenger-carrying vehicles for hire in ${loc} must operate under a PSV (Public Service Vehicle) licence issued by the Traffic Commissioner. This is a legal requirement — without it, the operator's insurance is invalid. Operators must also comply with drivers' hours regulations, which limit how long a driver can work without breaks. For school transport, additional DBS checks apply to drivers. Always verify the operator's credentials before booking, especially with unfamiliar companies offering significantly lower prices.`,
      ],
    }),
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
      { name: "collectionLocation", label: "Collection / Delivery Location (inc. postcode)", type: "text", required: true, half: true, placeholder: "e.g. 5 Park Lane, M1 4BT", requiresPostcode: true },
      { name: "startDate", label: "Start Date", type: "date", required: true, half: true },
      { name: "endDate", label: "End Date", type: "date", required: true, half: true },
    ],
    autoQuoteFields: [
      { name: "dailyRates.swb", label: "SWB Van Daily Rate", type: "number", half: true, prefix: "£" },
      { name: "dailyRates.lwb", label: "LWB Van Daily Rate", type: "number", half: true, prefix: "£" },
      { name: "dailyRates.luton", label: "Luton Van Daily Rate", type: "number", half: true, prefix: "£" },
      { name: "dailyRates.tipper", label: "Tipper Van Daily Rate", type: "number", half: true, prefix: "£" },
    ],
    leadPricePence: 100,
    sumupBuyLink: "https://pay.sumup.com/b2c/QQF710VC",
    creditPacks: [
      { credits: 25, pricePence: 1000, label: "25 quotes — £10" },
      { credits: 50, pricePence: 1750, label: "50 quotes — £17.50" },
      { credits: 100, pricePence: 3000, label: "100 quotes — £30" },
    ],
    locationFaq: (loc, count) => [
      { question: `How many van hire companies are in ${loc}?`, answer: `There are ${count} van hire companies listed in ${loc}. Compare prices, vehicle types and availability to find the best deal for your move or project.` },
      { question: `How much does van hire cost in ${loc}?`, answer: `Van hire in ${loc} starts from around £30-£50 per day for a small panel van and £60-£120 per day for a Luton van with tail lift. Weekly rates offer better value. Prices vary between operators so compare quotes.` },
      { question: `Do I need a special licence to hire a van in ${loc}?`, answer: `No. A standard UK driving licence (category B) allows you to drive vans up to 3.5 tonnes, which covers most hire vans including Lutons. You must be at least 21 (25 for some companies) and have held your licence for at least 1-2 years.` },
    ],
    choosingAdvice: (loc) => ({
      heading: `Choosing a Van Hire Company in ${loc}`,
      paragraphs: [
        `When hiring a van in ${loc}, start by choosing the right size. A small panel van (SWB) handles single-room moves and small deliveries. A long wheelbase (LWB) suits larger loads. A Luton van with tail lift is best for full house moves — the box body protects furniture from weather and the tail lift makes loading heavy items much easier.`,
        `Check what is included in the price. Mileage limits vary significantly — some companies offer unlimited mileage while others charge 15-25p per mile over the allowance. Insurance excess can range from £250 to £1,000, so ask about excess reduction options. Confirm whether fuel, VAT and any cleaning charges are included in the quoted price.`,
        `Read Google reviews carefully, paying attention to comments about vehicle condition, hidden charges and the collection/return process. A reputable company will do a thorough walk-around with you at collection, noting any existing damage on a condition report that you both sign.`,
      ],
    }),
    locationEditorial: (loc) => ({
      heading: `Van Hire in ${loc}: What You Need to Know`,
      paragraphs: [
        `The self-drive van hire market in ${loc} is well-served by a mix of national chains and independent hire companies. Common uses include house moves, furniture deliveries, business logistics and trade work. Independent operators often provide more competitive rates and flexible terms than the larger national brands, while the chains offer the convenience of one-way hire between branches. Weekend demand is high, particularly around month-end when tenancy changeovers create a surge in house moves.`,
        `When hiring a van in ${loc}, you will typically choose between a short wheelbase panel van for smaller loads, a long wheelbase van for bulkier items, and a Luton box van with tail lift for full house moves. Most hire companies require you to be at least 21 years old and to have held a full UK driving licence for a minimum of one to two years. A standard category B licence covers vans up to 3.5 tonnes, which includes most hire vehicles. Check whether the company offers delivery and collection of the van to save you a trip to the depot.`,
        `Daily van hire rates in ${loc} typically range from £40 to £80 depending on the vehicle size. A small panel van starts at around £35 to £50 per day, while a Luton with tail lift costs £60 to £100 per day. Weekend and bank holiday rates are often higher. Mileage policies vary significantly between operators — some include unlimited mileage, others allow 100 to 200 miles per day with excess charges of 15p to 25p per mile. Always factor in fuel costs, insurance excess and any cleaning charges when comparing quotes.`,
        `Insurance is a key consideration when hiring a van in ${loc}. Standard hire includes basic insurance with an excess that can range from £250 to £1,000 or more. Most companies offer excess reduction products for an additional daily fee, which can be worthwhile for peace of mind. Check whether your personal car insurance or credit card provides any hire vehicle cover. Before driving away, complete a thorough walk-around inspection with the hire company, photographing any existing damage and ensuring it is recorded on the paperwork to avoid disputes on return.`,
      ],
    }),
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
      { name: "address", label: "Delivery Address / Postcode", type: "text", required: true, placeholder: "e.g. NE1 4ST or 12 High Street, Newcastle", requiresPostcode: true },
    ],
    autoQuoteFields: [
      { name: "prices.mini", label: "Mini Skip Price", type: "number", half: true, prefix: "£" },
      { name: "prices.midi", label: "Midi Skip Price", type: "number", half: true, prefix: "£" },
      { name: "prices.builders", label: "Builders Skip Price", type: "number", half: true, prefix: "£" },
      { name: "prices.large", label: "Large Skip Price", type: "number", half: true, prefix: "£" },
    ],
    leadPricePence: 100,
    sumupBuyLink: "https://pay.sumup.com/b2c/QQF710VC",
    creditPacks: [
      { credits: 25, pricePence: 1000, label: "25 quotes — £10" },
      { credits: 50, pricePence: 1750, label: "50 quotes — £17.50" },
      { credits: 100, pricePence: 3000, label: "100 quotes — £30" },
    ],
    locationFaq: (loc, count) => [
      { question: `How many skip hire companies are in ${loc}?`, answer: `There are ${count} skip hire companies listed in ${loc}. Compare prices, skip sizes and availability to find the best deal for your project.` },
      { question: `How much does skip hire cost in ${loc}?`, answer: `Skip hire in ${loc} costs £80-£150 for a mini skip, £150-£300 for a builders skip, and £250-£450 for a large skip. Prices include delivery, hire (7-14 days) and disposal. Permit fees are extra if the skip goes on a public road.` },
      { question: `Do I need a permit for a skip in ${loc}?`, answer: `Only if the skip is placed on a public road, pavement or grass verge. If it fits on your driveway or private land, no permit is needed. Permits cost £20-£60 and most skip companies arrange them on your behalf.` },
    ],
    choosingAdvice: (loc) => ({
      heading: `Choosing a Skip Hire Company in ${loc}`,
      paragraphs: [
        `Before hiring a skip in ${loc}, check that the company holds a valid waste carrier licence — this is a legal requirement and you can verify it on the Environment Agency website. If the skip needs to go on a public road, the company should arrange a council permit on your behalf. Ask whether the permit fee is included in the quoted price or charged separately, as this varies between operators.`,
        `Choose the right skip size to avoid paying for space you do not need. A mini skip (2-3 yards) handles a bathroom refit or small garden clearout. A builders skip (6-8 yards) suits most home renovation projects. Be clear about what you are disposing of — hazardous materials like asbestos, paint, batteries and tyres cannot go into standard skips. Mixing heavy waste like soil with light waste can also incur surcharges.`,
        `Compare at least three quotes and check what is included. Some companies offer 7-day hire as standard while others charge extra after 48 hours. Ask about their recycling rate — reputable companies recycle 80-95% of skip contents. Read Google reviews for comments about punctuality of delivery and collection, as late pickups can block your driveway longer than expected.`,
      ],
    }),
    locationEditorial: (loc) => ({
      heading: `Skip Hire in ${loc}: What You Need to Know`,
      paragraphs: [
        `Skip hire is a well-established waste disposal solution across ${loc}, used by homeowners tackling renovations, tradespeople managing construction debris, and businesses handling commercial waste. The most commonly hired sizes are the 4-yard midi skip for smaller projects like bathroom refits, and the 6-to-8-yard builders skip which handles most home renovation waste. For large-scale clearances or demolition projects, roll-on roll-off containers of 20 to 40 yards are available from specialist operators. Grab lorry hire is an increasingly popular alternative for loose materials like soil and rubble.`,
        `When ordering a skip in ${loc}, you will need to specify the waste type, estimated volume and where the skip will be placed. If the skip needs to go on a public road, pavement or grass verge rather than your private driveway, you will need a council skip permit. Most skip hire companies in the area will arrange this on your behalf, though the permit fee of £20 to £60 is usually charged separately. Standard hire periods range from 7 to 14 days, after which daily extension charges may apply. Be aware of what cannot go in a skip — hazardous materials including asbestos, paint, batteries, gas canisters and tyres are banned.`,
        `Skip hire prices in ${loc} typically range from £80 to £150 for a mini skip, £150 to £300 for a builders skip, and £250 to £450 for a large skip. These prices generally include delivery, a 7-to-14-day hire period and disposal. Heavy waste such as soil, concrete and rubble costs more per skip because of the increased weight at the tip. Some operators charge a premium for mixed waste loads that are difficult to recycle. Getting quotes from at least three companies is recommended, as prices can vary by 30 percent or more for the same skip size in the same area.`,
        `All skip hire companies operating in ${loc} must hold a valid waste carrier licence issued by the Environment Agency. You can check this on the public register. Using an unlicensed operator is risky — you could be held legally responsible if your waste is fly-tipped. Planning restrictions may apply in conservation areas where skips on the road require additional approvals. During busy periods such as bank holidays and summer months, availability tightens so booking several days in advance is advisable. Consider whether a wait-and-load service might suit your needs — the skip lorry waits while you fill the skip, then takes it away immediately.`,
      ],
    }),
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
      { name: "location", label: "Location / Postcode", type: "text", required: true, placeholder: "e.g. NE1 4ST or 12 High Street, Newcastle", requiresPostcode: true },
    ],
    autoQuoteFields: [
      { name: "calloutFee", label: "Standard Callout Fee", type: "number", half: true, prefix: "£", placeholder: "60" },
      { name: "emergencyCalloutFee", label: "Emergency Callout Fee", type: "number", half: true, prefix: "£", placeholder: "85" },
    ],
    leadPricePence: 100,
    sumupBuyLink: "https://pay.sumup.com/b2c/QQF710VC",
    creditPacks: [
      { credits: 25, pricePence: 1000, label: "25 quotes — £10" },
      { credits: 50, pricePence: 1750, label: "50 quotes — £17.50" },
      { credits: 100, pricePence: 3000, label: "100 quotes — £30" },
    ],
    locationFaq: (loc, count) => [
      { question: `How many locksmiths are in ${loc}?`, answer: `There are ${count} locksmiths listed in ${loc}. Compare ratings, services and response times to find a trusted locksmith for your needs.` },
      { question: `How much does a locksmith cost in ${loc}?`, answer: `A standard daytime lockout in ${loc} costs £60-£120. Evening and weekend callouts cost £80-£180. A lock change costs £50-£90 including the new lock. Always agree the total price before work begins.` },
      { question: `How quickly can a locksmith get to me in ${loc}?`, answer: `Most locksmiths in ${loc} offer response times of 30-60 minutes for emergency callouts. Many operate 24/7 for lockouts. For non-urgent work like lock changes or security upgrades, expect an appointment within 1-3 days.` },
    ],
    choosingAdvice: (loc) => ({
      heading: `Choosing a Locksmith in ${loc}`,
      paragraphs: [
        `The most important step when choosing a locksmith in ${loc} is checking their credentials. Look for membership of the Master Locksmiths Association (MLA), which requires locksmiths to pass criminal record checks and practical skills assessments. Alternatively, check that the locksmith has a valid DBS (Disclosure and Barring Service) certificate. You can verify MLA members on the MLA website by postcode. Avoid calling numbers from stickers placed on your door — these are often call centres that dispatch unvetted contractors.`,
        `Always agree a fixed price before any work begins. A reputable locksmith will give you a clear quote over the phone that includes the callout fee, labour and any parts needed. Be wary of anyone who quotes a low callout fee then adds charges on arrival. Emergency callouts (evenings, weekends, bank holidays) cost more — typically £80-£180 — but the total should still be agreed upfront. If a locksmith refuses to give a price before attending, call someone else.`,
        `For non-emergency work like lock changes after moving house, get quotes from at least two or three locksmiths. Ask what brand of lock they will fit — British Standard BS3621 locks are required by most insurance policies. Check Google reviews for comments about professionalism, timekeeping and whether the locksmith left the property secure. A good locksmith will also advise on security improvements without pressuring you into unnecessary upgrades.`,
      ],
    }),
    locationEditorial: (loc) => ({
      heading: `Locksmith Services in ${loc}: What You Need to Know`,
      paragraphs: [
        `The locksmith market in ${loc} is split between emergency callout work and planned security services. Emergency lockouts — being locked out of your home, business or car — account for the majority of callouts and are typically needed outside normal working hours. Many locksmiths in the area operate 24 hours a day, 7 days a week, offering response times of 30 to 60 minutes. Planned work includes lock changes after moving home, security upgrades, and fitting multipoint locking mechanisms on uPVC and composite doors. Auto locksmith services for vehicle lockouts and key programming are offered by some but not all operators.`,
        `When you need a locksmith in ${loc}, the most important step is verifying their credentials before they arrive. Look for Master Locksmiths Association (MLA) membership or at minimum a DBS (Disclosure and Barring Service) check, which confirms the locksmith has been vetted. Be cautious of locksmiths found through search engine adverts without verifiable reviews — a well-known scam involves call centres dispatching untrained individuals who drill out locks unnecessarily and charge inflated prices. A skilled locksmith can open most domestic locks without damage using non-destructive entry techniques.`,
        `Average locksmith callout costs in ${loc} range from £60 to £100 for a standard daytime lock opening, rising to £80 to £180 for evening, weekend and bank holiday callouts. A straightforward lock change including a new British Standard cylinder costs £50 to £90. More complex work such as fitting a multipoint lock on a composite door or replacing a full lock case can cost £120 to £250. Auto locksmith services for vehicle key programming typically cost £100 to £200 depending on the vehicle make. Always agree a total fixed price before any work begins.`,
        `When choosing a locksmith in ${loc}, ask what locks they recommend for your property. Most home insurance policies require BS3621 rated locks on external doors, and your insurer may reject a claim if non-compliant locks are fitted. For higher security, look for locks rated to the Sold Secure standard or those carrying the British Kitemark. Be aware that some older properties in conservation areas may have restrictions on changing external door hardware. After any lock change, test the new locks thoroughly from both sides of the door before the locksmith leaves, and keep a spare key with a trusted neighbour or in a secure key safe.`,
      ],
    }),
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
      { name: "movingFrom", label: "Moving From", type: "text", required: true, half: true, placeholder: "e.g. NE1 4ST or 12 High Street, Newcastle", requiresPostcode: true },
      { name: "movingTo", label: "Moving To", type: "text", required: true, half: true, placeholder: "e.g. LS1 5DL or 24 Park Lane, Leeds", requiresPostcode: true },
      { name: "needPacking", label: "Do You Need a Packing Service?", type: "select", options: [
        { value: "no", label: "No — I'll pack myself" },
        { value: "yes", label: "Yes — full packing service" },
        { value: "partial", label: "Partial — fragile items only" },
        { value: "not-sure", label: "Not sure yet" },
      ]},
    ],
    leadPricePence: 100,
    sumupBuyLink: "https://pay.sumup.com/b2c/QQF710VC",
    creditPacks: [
      { credits: 25, pricePence: 1000, label: "25 quotes — £10" },
      { credits: 50, pricePence: 1750, label: "50 quotes — £17.50" },
      { credits: 100, pricePence: 3000, label: "100 quotes — £30" },
    ],
    locationFaq: (loc, count) => [
      { question: `How many removal companies are in ${loc}?`, answer: `There are ${count} removal companies listed in ${loc}. Compare ratings, services and prices to find the right mover for your home or office move.` },
      { question: `How much do removals cost in ${loc}?`, answer: `A local house move in ${loc} typically costs £300-£600 for a 1-2 bed property and £500-£900 for a 3-bed house. Man-and-van services cost £40-£70 per hour. Get written quotes from at least three companies.` },
      { question: `How do I choose a removal company in ${loc}?`, answer: `Look for companies with strong reviews, membership of the British Association of Removers (BAR), and proper goods-in-transit insurance. Get a home survey (in person or video) before accepting a fixed quote to avoid surprises on moving day.` },
    ],
    choosingAdvice: (loc) => ({
      heading: `Choosing a Removal Company in ${loc}`,
      paragraphs: [
        `When choosing a removal company in ${loc}, look for membership of the British Association of Removers (BAR). BAR members must meet strict standards for vehicle maintenance, staff training and dispute resolution, and they offer an independent complaints procedure if something goes wrong. Non-BAR companies can still be excellent, but you should at minimum confirm they hold goods-in-transit insurance and public liability insurance — ask for proof, not just a verbal assurance.`,
        `Always request a pre-move survey before accepting a fixed quote. Reputable companies will visit your home (or do a video survey) to assess the volume of your belongings accurately. Quotes given over the phone without a survey are often estimates that can increase on moving day. Ask specifically what is covered — does the quote include packing materials, disassembly and reassembly of furniture, and insurance cover? Understand the company's liability: standard cover is limited, so ask about full-value protection if you have high-value items.`,
        `Get written quotes from at least three companies and compare like for like. Check Google reviews for comments about care with belongings, punctuality, and how the crew handled unexpected problems. Ask whether the team that surveys your home will be the same team that moves you. Finally, confirm the cancellation and postponement policy — life happens, and you need to know the cost of changing your moving date at short notice.`,
      ],
    }),
    locationEditorial: (loc) => ({
      heading: `Removal Companies in ${loc}: What You Need to Know`,
      paragraphs: [
        `The removals market in ${loc} includes everything from one-person man-and-van operations handling single-item deliveries through to full-service removal companies managing complex multi-bedroom house moves and commercial relocations. Many local firms have been established for decades and possess detailed knowledge of the area, including access challenges posed by narrow streets, parking restrictions and properties without lifts. The busiest periods are summer months and the end of each month when tenancy agreements typically turn over, so availability can be limited during these windows.`,
        `When arranging a house move in ${loc}, expect reputable companies to offer a pre-move survey either in person or by video call. This allows the estimator to assess the volume of your belongings accurately and identify any access difficulties or specialist items such as pianos, antiques or oversized furniture. Based on the survey, you should receive a written quotation detailing the crew size, vehicle requirements, estimated duration and total cost. Ask whether the quote is a fixed price or an estimate — a fixed price protects you from cost increases, while estimates can rise if the job takes longer than expected.`,
        `Removal costs in ${loc} vary considerably depending on the size of your property and the distance of the move. A local move from a one or two bedroom flat typically costs £300 to £600. A three-bedroom house move within the area runs between £500 and £900, while four or five bedroom properties can cost £800 to £1,200 or more. Man-and-van services charge £40 to £70 per hour and suit smaller moves or single-item transport. Full packing services add £200 to £500 to the total depending on the property size. Long-distance moves are priced by volume and mileage rather than time.`,
        `Insurance is a critical consideration when hiring a removal company in ${loc}. Reputable firms carry goods-in-transit insurance and public liability cover, but the standard liability may be limited to a low per-item amount unless you pay for enhanced cover. Ask about their claims process and whether they offer full-value protection. Membership of the British Association of Removers (BAR) provides additional consumer protection including an independent dispute resolution service. For moves involving parking on public roads, check whether the company can arrange suspended parking bays with the local council to guarantee a loading space outside your property on moving day.`,
      ],
    }),
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
      { name: "venue", label: "Venue / Address (inc. postcode)", type: "text", required: true, half: true, placeholder: "e.g. 5 Oak Avenue, NE3 2RT", requiresPostcode: true },
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
    leadPricePence: 100,
    sumupBuyLink: "https://pay.sumup.com/b2c/QQF710VC",
    creditPacks: [
      { credits: 25, pricePence: 1000, label: "25 quotes — £10" },
      { credits: 50, pricePence: 1750, label: "50 quotes — £17.50" },
      { credits: 100, pricePence: 3000, label: "100 quotes — £30" },
    ],
    locationFaq: (loc, count) => [
      { question: `How many bouncy castle hire companies are in ${loc}?`, answer: `There are ${count} bouncy castle and inflatable hire companies listed in ${loc}. Compare prices, availability and inflatable types for your event.` },
      { question: `How much does bouncy castle hire cost in ${loc}?`, answer: `Bouncy castle hire in ${loc} costs £60-£90 for a standard children's castle and £80-£130 for a larger adult castle. Prices include delivery, setup and collection. Themed and combination units cost more.` },
      { question: `Do I need a power supply for a bouncy castle?`, answer: `Yes. The electric blower must run continuously. You need a standard 13-amp mains socket within 25-50 metres of the castle. If you are hiring for an event without mains power, ask about generator hire which typically costs £40-£80 extra.` },
    ],
    choosingAdvice: (loc) => ({
      heading: `Choosing a Bouncy Castle Hire Company in ${loc}`,
      paragraphs: [
        `Safety should be your top priority when hiring a bouncy castle in ${loc}. Check that the company's inflatables have been tested to BS EN 14960 by a PIPA (Pertexa Inflatable Play Accreditation) or RPII (Register of Play Inspectors International) registered inspector. Ask to see the test certificate — it should be dated within the last 12 months. The company must also hold public liability insurance of at least £1 million, and ideally £5 million. Request a copy of their insurance certificate before booking.`,
        `Measure your setup area carefully before hiring. A standard children's bouncy castle needs a flat area of roughly 15ft x 15ft with at least 3ft clearance on all sides and 2ft above. Check for overhead obstructions like washing lines, tree branches and power cables. The company should stake the castle into soft ground or use sandbag anchors on hard surfaces — never hire from a company that does not properly anchor the unit. Ask about their weather policy: most companies will postpone or cancel in winds above 24mph, but refund and rebooking policies vary.`,
        `Compare at least three quotes and ask what is included. Good companies deliver, set up, safety-brief and collect the castle as part of the hire price. Ask whether an adult must supervise at all times (yes — this is a legal requirement) and whether they provide a safety mat for the entrance. Read Google reviews paying attention to comments about the cleanliness of the inflatables, punctuality of delivery and how well the company communicated about weather-related changes.`,
      ],
    }),
    locationEditorial: (loc) => ({
      heading: `Bouncy Castle Hire in ${loc}: What You Need to Know`,
      paragraphs: [
        `Bouncy castle hire is a thriving market in ${loc}, driven by children's birthday parties, school fetes, community fun days and family celebrations. Most providers in the area offer a wide range of inflatables beyond traditional bouncy castles, including inflatable slides, obstacle courses, disco domes, soft play sets and ball pools. The season runs primarily from April through to September for outdoor events, though many companies also cater to indoor venues year-round. Providers typically operate within a defined radius from their base, so choosing a local company keeps delivery charges down and response times fast.`,
        `When hiring a bouncy castle in ${loc}, you will need to confirm the setup location, available space and whether the event is indoors or outdoors. A standard children's bouncy castle requires a flat area of approximately 15 by 15 feet with clearance of at least 3 feet on all sides and 2 feet overhead. You will also need a standard 13-amp mains power supply within 25 to 50 metres for the electric blower that keeps the castle inflated. For outdoor events without mains power, ask about generator hire. The hire company will deliver, inflate and anchor the unit, then collect it at the agreed time — most hires run for a full day or half-day.`,
        `Bouncy castle hire prices in ${loc} typically range from £60 to £120 for a standard children's castle for a full day. Larger adult castles and combination units with slides cost £80 to £150. Disco domes with built-in speakers and LED lighting run between £100 and £160. Soft play packages for toddlers start from around £50. Obstacle courses and assault courses for corporate events or larger parties cost £120 to £250. Most companies include delivery, setup and collection in the price, though very early morning or late evening collection times may incur a surcharge. Weekday bookings are usually cheaper than weekends.`,
        `Safety is governed by strict standards that all reputable bouncy castle hire companies in ${loc} should follow. Every inflatable must be tested annually to BS EN 14960 by a PIPA or RPII registered inspector, and the company should show you a current test certificate on request. Public liability insurance of at least £1 million is essential — check the certificate covers inflatable hire specifically. An adult must supervise the bouncy castle at all times while children are playing, and most companies enforce age and size restrictions to prevent injuries. Weather conditions are a significant factor: operators will postpone or cancel if sustained wind speeds exceed 24 miles per hour, so check the cancellation and rebooking terms before you commit.`,
      ],
    }),
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
      { name: "pickupLocation", label: "Pickup Location (inc. postcode)", type: "text", required: true, half: true, placeholder: "e.g. 12 High Street, NE1 4ST", requiresPostcode: true },
      { name: "destination", label: "Destination (inc. postcode)", type: "text", required: true, half: true, placeholder: "e.g. Newcastle Airport, NE13 8BZ", requiresPostcode: true },
      { name: "hours", label: "Hours Needed", type: "number", half: true, min: 1, max: 24, placeholder: "e.g. 4" },
    ],
    leadPricePence: 100,
    sumupBuyLink: "https://pay.sumup.com/b2c/QQF710VC",
    creditPacks: [
      { credits: 25, pricePence: 1000, label: "25 quotes — £10" },
      { credits: 50, pricePence: 1750, label: "50 quotes — £17.50" },
      { credits: 100, pricePence: 3000, label: "100 quotes — £30" },
    ],
    locationFaq: (loc, count) => [
      { question: `How many limo hire companies are in ${loc}?`, answer: `There are ${count} limo and luxury car hire companies listed in ${loc}. Compare vehicles, prices and reviews for your wedding, prom, or special occasion.` },
      { question: `How much does limo hire cost in ${loc}?`, answer: `A stretch limousine in ${loc} costs £150-£350 for 2-3 hours. Hummer limos cost £250-£500. Wedding cars cost £200-£450. Prom packages start from £150. Prices include a uniformed chauffeur and the vehicle.` },
      { question: `How far in advance should I book a limo?`, answer: `For weddings and proms, book 3-6 months in advance as popular vehicles sell out quickly in peak season (May-September). For other events, 2-4 weeks is usually sufficient. Last-minute bookings may be possible midweek but availability is limited.` },
    ],
    choosingAdvice: (loc) => ({
      heading: `Choosing a Limo Hire Company in ${loc}`,
      paragraphs: [
        `The most important check when hiring a limo or luxury car in ${loc} is the operator's licence. Any vehicle carrying passengers for hire must have a valid Private Hire Vehicle (PHV) licence or, for limousines with 8+ seats, a PSV (Public Service Vehicle) operator's licence issued by the Traffic Commissioner. Ask the company for their licence number and verify it — operating without one is illegal, and the vehicle's insurance will be invalid. The chauffeur must also hold the correct licence for the vehicle type.`,
        `Ask to see the vehicle before booking if possible, or request recent photos. Check that the interior matches the promotional images — some companies use stock photos that do not represent their actual fleet. Confirm exactly what is included in the package: journey time, mileage, drinks (soft or champagne), red carpet, decorations, and whether waiting time is included. Get everything in writing. Ask about their policy if the vehicle breaks down on the day — a reliable company will have a backup plan.`,
        `Compare quotes from at least three operators. Prices vary widely, and the cheapest option may cut corners on vehicle maintenance or chauffeur quality. Read Google reviews looking for comments about the vehicle's condition, the chauffeur's professionalism, and whether the company delivered what was promised. For weddings, ask whether the chauffeur has experience with wedding timings and whether they can accommodate photo stops. Book well in advance for peak dates — proms and summer Saturdays fill up months ahead.`,
      ],
    }),
    locationEditorial: (loc) => ({
      heading: `Limo Hire in ${loc}: What You Need to Know`,
      paragraphs: [
        `The luxury and special occasion transport market in ${loc} caters to weddings, proms, hen and stag parties, milestone birthdays and corporate events. Operators in the area typically maintain fleets that include classic stretch limousines, Hummer and Chrysler limos, vintage and classic cars, modern supercars and party buses. Wedding car hire is the largest segment of the market, with demand peaking between May and September. Prom season in June and July also generates intense demand for flashier vehicles, so booking well in advance — ideally three to six months — is essential for popular dates.`,
        `When booking limo hire in ${loc}, clarify exactly what the package includes before committing. Standard packages usually cover a uniformed chauffeur, a set number of hours, a champagne toast or soft drinks, and basic decorations for weddings. Ask whether mileage is limited or unlimited, whether waiting time is included, and what happens if you need the vehicle for longer than booked. For weddings, confirm that the chauffeur is experienced with wedding schedules and can accommodate stops for photographs. For party bookings, check the maximum passenger capacity — stretching a vehicle beyond its licensed capacity is illegal and dangerous.`,
        `Limo hire prices in ${loc} vary depending on the vehicle type, occasion and duration. A standard stretch limousine costs £200 to £350 for a two-to-three-hour package. Hummer and Chrysler stretch limos cost £250 to £500 for the same duration. Wedding car hire for a Rolls Royce, Bentley or classic vehicle typically runs £200 to £450 for the ceremony day. Party buses for larger groups cost £300 to £600 for three to four hours. Prom packages start from around £150 for a shared vehicle or £250 to £400 for exclusive hire. Prices rise for peak dates and last-minute bookings.`,
        `All vehicles carrying passengers for hire in ${loc} must be properly licensed. Standard limousines with up to 8 passenger seats require a Private Hire Vehicle (PHV) licence from the local council, while vehicles with 9 or more seats need a PSV (Public Service Vehicle) operator's licence from the Traffic Commissioner. The chauffeur must also hold the appropriate driving licence and private hire driver's badge. Ask to see the vehicle's licence disc, which should be displayed inside the car. Be cautious of operators who cannot produce licensing documentation — they may be operating illegally, which means the vehicle's insurance cover may be invalid and your group would be unprotected in the event of an incident.`,
      ],
    }),
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
      { name: "siteLocation", label: "Site Location / Postcode", type: "text", required: true, placeholder: "e.g. NE1 4ST or construction site address", requiresPostcode: true },
    ],
    leadPricePence: 100,
    sumupBuyLink: "https://pay.sumup.com/b2c/QQF710VC",
    creditPacks: [
      { credits: 25, pricePence: 1000, label: "25 quotes — £10" },
      { credits: 50, pricePence: 1750, label: "50 quotes — £17.50" },
      { credits: 100, pricePence: 3000, label: "100 quotes — £30" },
    ],
    locationFaq: (loc, count) => [
      { question: `How many plant hire companies are in ${loc}?`, answer: `There are ${count} plant and equipment hire companies listed in ${loc}. Compare daily and weekly rates, equipment types and delivery options.` },
      { question: `How much does plant hire cost in ${loc}?`, answer: `A micro digger in ${loc} costs £80-£150 per day. A mini digger costs £120-£200 per day. Cherry pickers cost £100-£250 per day. Weekly rates are typically 3-4 times the daily rate, offering significant savings on longer hires.` },
      { question: `Do I need a licence to hire a mini digger?`, answer: `For private domestic work on your own land, no licence is required. For construction sites or commercial projects, operators must hold a CPCS or NPORS card. If you do not have a qualified operator, hire companies can supply one for an additional £150-£250 per day.` },
    ],
    choosingAdvice: (loc) => ({
      heading: `Choosing a Plant Hire Company in ${loc}`,
      paragraphs: [
        `When hiring plant equipment in ${loc}, the first decision is whether you need wet hire (with an operator) or dry hire (self-drive). For dry hire, you must have the appropriate competency card — a CPCS (Construction Plant Competence Scheme) or NPORS card is legally required on most construction sites. If you are doing private domestic work on your own land, no card is required, but operating heavy machinery without training is dangerous. Wet hire costs more (typically £150-£250 per day extra) but includes a qualified, insured operator.`,
        `Check the hire company's insurance arrangements carefully. With dry hire, the machine is usually your responsibility while on your site — ask about damage waiver options and what your excess would be if the machine is damaged. Confirm whether the quoted price includes delivery, collection, fuel and VAT. Fuel policy varies: some companies deliver with a full tank and charge for what you use, while others deliver empty and expect you to supply diesel. Weekly hire rates are typically 3-4 times the daily rate, so longer hires offer significant savings.`,
        `Compare quotes from at least three companies and ask about the age and condition of their fleet. Well-maintained machines break down less and are more fuel-efficient. Read Google reviews for comments about delivery punctuality, machine condition and how quickly the company responds to breakdowns. Ask what happens if the machine develops a fault — a good company will send an engineer or replacement within hours, not days. For larger projects, ask about account terms and long-hire discounts.`,
      ],
    }),
    locationEditorial: (loc) => ({
      heading: `Plant Hire in ${loc}: What You Need to Know`,
      paragraphs: [
        `The plant hire market in ${loc} serves construction firms, groundwork contractors, landscapers, utility companies and homeowners undertaking significant projects. The most commonly hired machines include mini diggers for garden and driveway work, excavators for foundations and earthmoving, dumpers for site logistics, and cherry pickers for working at height. Both short-term daily hires and longer-term contracts are widely available. The market includes large national hire companies with extensive fleets and local independent operators who often provide more competitive rates and a more personal service for smaller projects.`,
        `When hiring plant equipment in ${loc}, the key decision is whether you need wet hire (with a qualified operator) or dry hire (self-drive). For dry hire on any construction site regulated under CDM (Construction Design and Management) regulations, the operator must hold a CPCS (Construction Plant Competence Scheme) or NPORS card for the specific machine category. Homeowners using a mini digger on their own land for private domestic work are not legally required to hold a card, though training is strongly recommended for safety reasons. Wet hire includes a fully qualified operator and is the safer option if you lack experience — the hire company handles all competency and insurance requirements.`,
        `Typical daily plant hire rates in ${loc} range from £80 to £150 for a micro or mini digger under 3 tonnes, £150 to £250 for a larger excavator, £100 to £180 for a site dumper, and £120 to £250 for a cherry picker or access platform. Weekly rates typically work out at three to four times the daily rate, offering significant savings on longer projects. Delivery and collection charges range from £50 to £150 each way depending on the machine size and distance. Fuel is usually your responsibility on dry hire. Ask whether the quoted price includes VAT and any damage waiver, as these can add 20 to 30 percent to the headline figure.`,
        `Several practical considerations apply when hiring plant in ${loc}. Delivery access is critical — confirm that the site entrance, road widths and ground conditions can handle a low-loader delivering the machine. For work near highways or public footpaths, you may need traffic management plans and council permits. Noise restrictions in residential areas can limit operating hours, typically to 8am to 6pm on weekdays and 8am to 1pm on Saturdays. Check the hire company's breakdown response policy: a reliable operator will have engineers available to attend site within hours if a machine develops a fault, minimising costly downtime on your project.`,
      ],
    }),
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
      { name: "area", label: "Pickup Area / Postcode", type: "text", required: true, half: true, placeholder: "e.g. NE1 4ST or Jesmond, Newcastle", requiresPostcode: true },
    ],
    leadPricePence: 100,
    sumupBuyLink: "https://pay.sumup.com/b2c/QQF710VC",
    creditPacks: [
      { credits: 25, pricePence: 1000, label: "25 quotes — £10" },
      { credits: 50, pricePence: 1750, label: "50 quotes — £17.50" },
      { credits: 100, pricePence: 3000, label: "100 quotes — £30" },
    ],
    locationFaq: (loc, count) => [
      { question: `How many driving instructors are in ${loc}?`, answer: `There are ${count} driving instructors and schools listed in ${loc}. Compare ratings, prices, pass rates and availability to find the right instructor for you.` },
      { question: `How much do driving lessons cost in ${loc}?`, answer: `Driving lessons in ${loc} cost £28-£42 per hour. Block bookings of 10 hours save 10-15%. Automatic and manual lessons are priced similarly. Independent instructors are usually cheaper than national schools.` },
      { question: `How many lessons will I need to pass?`, answer: `The DVSA average is 45 hours of professional lessons plus 22 hours of private practice. Most learners need 30-50 professional hours depending on age, confidence and how much they practise between lessons. Your instructor will advise when you are test-ready.` },
    ],
    choosingAdvice: (loc) => ({
      heading: `Choosing a Driving Instructor in ${loc}`,
      paragraphs: [
        `The most important thing to check when choosing a driving instructor in ${loc} is their ADI (Approved Driving Instructor) badge. Every qualified instructor must display a green badge on their windscreen — this confirms they have passed all three DVSA qualifying exams. A pink badge means the instructor is a trainee (PDI) who has passed only part one. Trainee instructors can be perfectly good, but they must display the pink badge and cannot charge the same rates. You can verify any instructor's registration on the DVSA website.`,
        `Ask about the instructor's pass rate. The national average first-time pass rate is around 47%, so an instructor who consistently achieves 60%+ is doing well. Be cautious of anyone claiming unrealistically high rates without evidence. Also ask which test centre they typically use and whether they teach on the actual test routes — familiarity with the local roads around ${loc} test centres is a genuine advantage. Check whether they offer both manual and automatic lessons if you are undecided.`,
        `Compare pricing carefully — look at the total cost to pass, not just the hourly rate. Block booking discounts (typically 10-15% off for 10 hours) can save significant money over your learning journey. Ask about their cancellation policy — most instructors require 48 hours notice or charge the full lesson fee. Read Google reviews paying attention to comments about patience, teaching style and whether the instructor adapts to different learners. A good instructor makes nervous learners feel comfortable and adjusts the pace to suit your progress.`,
      ],
    }),
    locationEditorial: (loc) => ({
      heading: `Driving Lessons in ${loc}: What You Need to Know`,
      paragraphs: [
        `The driving instruction market in ${loc} includes both independent instructors and franchisees of national driving schools. Independent instructors often offer lower prices and greater scheduling flexibility, while national schools provide structured learning programmes and may make it easier to switch instructors if needed. Both manual and automatic lessons are widely available across the area. Demand for automatic lessons has grown substantially in recent years, with automatic-only licences now accounting for around 40 percent of all tests passed nationally. Waiting lists for popular instructors can run to several weeks, particularly in the months following exam periods when students look to start learning.`,
        `When starting driving lessons in ${loc}, your instructor should carry out an initial assessment to gauge your current ability and estimate how many hours you are likely to need. The DVSA suggests an average of 45 hours of professional tuition combined with 22 hours of private practice for a typical learner. Complete beginners should expect to need more, while those with some experience may need fewer. Intensive or crash courses condense learning into one or two weeks of daily lessons and suit learners who want to pass quickly, though they require strong concentration and are not ideal for anxious or nervous drivers. Pass Plus courses after passing your test help build confidence on motorways, dual carriageways and in challenging conditions.`,
        `Driving lesson prices in ${loc} typically range from £28 to £40 per hour for individual lessons. Block bookings of 10 hours usually attract a discount of 10 to 15 percent, bringing the effective hourly rate down. Introductory offers for first-time pupils are common, with some instructors offering the first few hours at a reduced rate. Intensive course packages typically cost £600 to £1,200 depending on the number of hours included and whether a practical test is bundled in. Automatic lessons are priced similarly to manual in most areas, though some instructors charge a small premium due to higher vehicle running costs.`,
        `All driving instructors operating in ${loc} must be registered with the DVSA as an Approved Driving Instructor (ADI) and display a green badge on their windscreen. Trainee instructors hold a pink badge, which means they have passed the first part of the qualifying process but are not yet fully certified — they may offer cheaper rates but must be supervised. You can verify any instructor's registration status on the DVSA website. When booking your practical test, be aware that waiting times at local test centres can vary from four to twelve weeks depending on demand, so book your test date early and coordinate with your instructor on readiness.`,
      ],
    }),
  },
  "pest-control": {
    id: "pest-control",
    slug: "pest-control",
    name: "Pest Control",
    shortName: "Pest Control",
    icon: "🐀",
    image: "/images/pest.png",
    imageAlt: "Pest control illustration",
    heroTitle: (region) => `Find Pest Control in ${region}`,
    heroSubtitle: (count, locCount) =>
      `Compare ${count}+ pest control companies across ${locCount} locations. Get free quotes in minutes.`,
    locationDescriptionTemplate: (loc) =>
      `Compare pest control companies in ${loc}. View ratings, reviews and contact details. Get free quotes from local professionals.`,
    metaDescriptionTemplate: (biz, loc) =>
      `${biz} provides pest control services in ${loc}. Contact details, reviews and free quotes.`,
    services: [
      {
        id: "rodent-control",
        title: "Rodent Control",
        desc: "Professional removal and prevention of rats, mice and other rodents. Safe methods including traps, bait stations and proofing.",
      },
      {
        id: "insect-control",
        title: "Insect Control",
        desc: "Treatment for cockroaches, ants, bedbugs, fleas and other insects. Targeted solutions for homes and businesses.",
      },
      {
        id: "wasp-bee-removal",
        title: "Wasp & Bee Removal",
        desc: "Safe removal of wasp nests and bee colonies. Professional handling of stinging insects with minimal disruption.",
      },
      {
        id: "bird-control",
        title: "Bird Control",
        desc: "Humane deterrents for pigeons, seagulls and other pest birds. Netting, spikes and proofing for buildings.",
      },
      {
        id: "pest-prevention",
        title: "Pest Prevention",
        desc: "Regular inspections and preventative treatments. Proofing, sealing entry points and eliminating pest habitats.",
      },
    ],
    seoHeading: (shortName) => `Pest Control Across the ${shortName}`,
    seoParagraphs: (region, count, locationsList) => [
      `Whether you have a rodent infestation, need wasp nest removal, or want to prevent pests from entering your property, our directory connects you with trusted local pest control companies across the ${region}.`,
      `We list over ${count} pest control companies covering ${locationsList}. Each listing includes verified contact details, Google ratings and opening hours so you can make an informed choice.`,
      `Get free, no-obligation quotes from multiple pest control professionals by using our quote request form. Simply tell us your pest problem and we'll connect you with suitable companies in your area.`,
    ],
    ctaText: (loc) => `Need pest control in ${loc}?`,
    featuredSubtitle: (shortName) =>
      `Highest rated pest control companies in the ${shortName}`,
    browseSubtitle: "Find pest control companies near you",
    servicesSubtitle: "Whatever your pest problem, we can help",
    quoteFields: [
      { name: "pestType", label: "Type of Pest", type: "select", required: true, half: true, placeholder: "Select...", options: [
        { value: "rats-mice", label: "Rats / Mice" },
        { value: "wasps-bees", label: "Wasps / Bees" },
        { value: "cockroaches", label: "Cockroaches" },
        { value: "bed-bugs", label: "Bed Bugs" },
        { value: "fleas", label: "Fleas" },
        { value: "ants", label: "Ants" },
        { value: "birds", label: "Birds / Pigeons" },
        { value: "moles", label: "Moles" },
        { value: "squirrels", label: "Squirrels" },
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
        { value: "garden-outdoor", label: "Garden / Outdoor" },
        { value: "other", label: "Other" },
      ]},
      { name: "location", label: "Location / Postcode", type: "text", required: true, half: true, placeholder: "e.g. NE1 4ST or 12 High Street, Newcastle", requiresPostcode: true },
    ],
    autoQuoteFields: [
      { name: "calloutFee", label: "Standard Callout Fee", type: "number", half: true, prefix: "£", placeholder: "50" },
      { name: "treatmentCost", label: "Average Treatment Cost", type: "number", half: true, prefix: "£", placeholder: "100" },
    ],
    leadPricePence: 399,
    sumupBuyLink: "https://pay.sumup.com/b2c/Q5CZT3TS",
    creditPacks: [
      { credits: 25, pricePence: 1000, label: "25 quotes — £10" },
      { credits: 50, pricePence: 1750, label: "50 quotes — £17.50" },
      { credits: 100, pricePence: 3000, label: "100 quotes — £30" },
    ],
    locationFaq: (loc, count) => [
      { question: `How many pest control companies are in ${loc}?`, answer: `There are ${count} pest control companies listed in ${loc}. Compare ratings, services and response times to find a professional for your pest problem.` },
      { question: `How much does pest control cost in ${loc}?`, answer: `Pest control in ${loc} costs £50-£100 for wasp nest removal, £80-£200 for rat or mouse treatment, and £150-£400 for bed bug treatment. Most companies offer a free phone consultation. Prices include the treatment and follow-up visits.` },
      { question: `How quickly can a pest controller get to me in ${loc}?`, answer: `Most pest control companies in ${loc} offer same-day or next-day appointments for urgent problems like wasp nests or rat infestations. Emergency response times can be as fast as 2-4 hours. For less urgent issues, expect an appointment within 1-3 working days.` },
    ],
    choosingAdvice: (loc) => ({
      heading: `Choosing a Pest Control Company in ${loc}`,
      paragraphs: [
        `When choosing a pest control company in ${loc}, look for membership of the British Pest Control Association (BPCA). BPCA members must meet rigorous standards for training, insurance and use of pesticides, and they are audited regularly. You can verify membership on the BPCA website by company name or postcode. Non-BPCA companies can still be competent, but at minimum check that they hold public liability insurance and that their technicians hold RSPH (Royal Society for Public Health) Level 2 qualifications in pest management.`,
        `Ask about the treatment method before agreeing to any work. A professional pest controller should carry out a thorough survey first, identify the pest species correctly, and explain the treatment plan including which products will be used and whether they are safe around children and pets. Be wary of companies that offer to treat without inspecting first. Ask specifically about their guarantee — reputable companies offer a treatment guarantee (typically 3-6 months for rodents, 12 months for insects) and will return free of charge if the problem recurs within that period.`,
        `Get quotes from at least two or three companies. Prices should include the initial survey, treatment and a specified number of follow-up visits — most pest problems require 2-3 visits to fully resolve. Ask how many follow-up visits are included and what happens if the problem persists beyond those visits. Read Google reviews focusing on whether the treatment actually worked long-term, not just the initial response. A good pest controller will also advise on proofing measures to prevent reinfestation, such as sealing entry points and removing food sources.`,
      ],
    }),
    locationEditorial: (loc) => ({
      heading: `Pest Control in ${loc}: What You Need to Know`,
      paragraphs: [
        `Pest control services in ${loc} address a broad range of infestations affecting both residential and commercial properties. The most common callouts are for rats and mice, which thrive in urban and semi-rural environments alike, followed by wasp nest removal during summer months and insect treatments for cockroaches, bed bugs, fleas and ants. Bird control for pigeons and seagulls is a significant concern for commercial premises and properties in town centres. Many operators offer both one-off treatments and ongoing pest management contracts, with the latter particularly popular among restaurants, food manufacturers and other businesses subject to environmental health inspections.`,
        `When you contact a pest control company in ${loc}, a qualified technician should carry out a thorough inspection before recommending any treatment. This survey identifies the pest species, the extent of the infestation and the likely entry points. Treatment methods vary by pest — rodent control typically involves a combination of traps and tamper-resistant bait stations, while insect treatments use targeted insecticide sprays, gels or heat treatment depending on the species. Reputable companies will explain the products being used, any precautions you need to take around children and pets, and the expected timeline for the treatment to take full effect. Most pest problems require two to three visits to resolve completely.`,
        `Pest control costs in ${loc} depend on the pest type and severity of the infestation. Wasp nest removal is one of the more affordable services at £50 to £80 per nest. Rat or mouse treatment typically costs £80 to £200 and includes an initial visit plus two or three follow-up treatments. Bed bug treatment is more expensive at £150 to £400 due to the intensive methods required. Cockroach treatment runs £100 to £250. Bird proofing for a commercial building can cost £500 to £2,000 depending on the scope of work. Many companies offer a free initial phone consultation to help you understand the likely costs before committing to a visit.`,
        `When choosing a pest control provider in ${loc}, look for membership of the British Pest Control Association (BPCA) or the National Pest Technicians Association (NPTA). Members must meet standards for training, insurance and responsible use of pesticides. Technicians should hold at minimum an RSPH Level 2 qualification in pest management. Ask about the treatment guarantee — reputable companies guarantee their work for a defined period, typically three to six months for rodents and up to twelve months for insects, and will return at no extra charge if the problem recurs. Be aware that some pest issues have seasonal patterns: wasp nests peak in late summer, moth infestations in spring, and rodent activity increases in autumn as temperatures drop and animals seek shelter indoors.`,
      ],
    }),
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
  "pest-control": {
    "Rat & Mouse Control": "rodent-control",
    "Wasp Nest Removal": "wasp-bee-removal",
    "Bed Bug Treatment": "insect-control",
    "Flea Treatment": "insect-control",
    "Cockroach Control": "insect-control",
    "Ant Control": "insect-control",
    "Mole Control": "rodent-control",
    "Bird & Pigeon Control": "bird-control",
    "Squirrel Control": "rodent-control",
    "Moth Treatment": "insect-control",
    "Fox Control": "rodent-control",
    "Fumigation": "insect-control",
    "Commercial Pest Control": "pest-prevention",
    "Emergency Pest Control": "rodent-control",
  },
};
