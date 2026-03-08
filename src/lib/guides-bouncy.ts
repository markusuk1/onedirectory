import type { Guide } from "./guides";
import { getGuideRegion, type GuideRegion } from "./guide-regions";

function generate(r: GuideRegion): Guide[] {
  return [
    {
      slug: `bouncy-castle-hire-guide-${r.slug}`,
      title: `Bouncy Castle Hire ${r.mainCity}`,
      metaTitle: `Bouncy Castle Hire ${r.mainCity} | Prices, Tips & Top Companies (2026)`,
      metaDescription: `Planning a party in ${r.mainCity}? Compare bouncy castle hire companies, get prices and find the best inflatables for your event.`,
      h1: `Bouncy Castle Hire Guide for ${r.mainCity} & ${r.theName}`,
      intro: `Bouncy castles are a staple of children's parties, school fetes and family events across ${r.theName}. This guide covers everything you need to know about hiring a bouncy castle in ${r.theName}, including typical prices, safety considerations and how to choose the right inflatable for your event.`,
      sections: [
        {
          heading: `How Much Does Bouncy Castle Hire Cost in ${r.theName}?`,
          content: `Bouncy castle hire prices in ${r.theName} typically range from £60-£90 for a standard children's castle for a full day. Larger castles and themed inflatables cost £80-£150. Specialist items like assault courses, disco domes and gladiator duels usually cost £120-£200 for a day hire. Most companies in ${r.areas} include delivery, setup and collection in their price. Weekend bookings tend to cost more than midweek, and prices may be higher during peak season from May to September.`,
        },
        {
          heading: "Choosing the Right Bouncy Castle",
          content: `The right inflatable depends on the age of the children and the space available. For under-fives, choose a smaller castle with low walls and a soft landing area. Children aged five to ten enjoy themed castles with slides. For older children and teenagers, consider assault courses, gladiator duels or disco domes. Always check the maximum user weight and number of children allowed at once. Measure your garden or venue space carefully, as you need at least two feet of clearance on all sides of the castle plus access to a power socket within 25 metres.`,
        },
        {
          heading: "Safety Tips for Bouncy Castle Hire",
          content: `Safety should be the top priority when hiring a bouncy castle. Check that the hire company has valid public liability insurance of at least £5 million. The castle should be securely anchored with stakes on grass or sandbags on hard surfaces. An adult should supervise children at all times. Remove shoes, glasses and sharp objects before bouncing. Do not allow children of very different ages or sizes to bounce together. In windy conditions above 24mph, the castle should be deflated immediately. Reputable companies in ${r.theName} will explain all safety requirements at setup.`,
        },
        {
          heading: "Indoor vs Outdoor Bouncy Castle Hire",
          content: `If you are worried about the British weather, many companies in ${r.theName} offer indoor-suitable inflatables for village halls, sports centres and community buildings. Indoor castles are typically smaller and designed to fit standard ceiling heights. Check with your venue about their requirements, as some halls require proof of insurance and a risk assessment. For outdoor hire, you will need a flat grassy area. Most companies will not set up on slopes, wet ground or concrete without prior arrangement.`,
        },
      ],
      faq: [
        { question: `How much does bouncy castle hire cost in ${r.theName}?`, answer: `Standard bouncy castle hire in ${r.theName} costs £60-£90 for a full day. Larger or themed inflatables cost £80-£200. Prices include delivery, setup and collection.` },
        { question: "Do I need insurance to hire a bouncy castle?", answer: "No, the hire company provides public liability insurance. You just need to ensure an adult supervises at all times." },
        { question: "Can bouncy castles be used indoors?", answer: "Yes, many companies offer indoor-suitable inflatables for village halls and sports centres. Check ceiling height requirements with the provider." },
      ],
      relatedLocations: r.locations,
      keywords: [`bouncy castle hire ${r.mainCity.toLowerCase()}`, `inflatable hire ${r.mainCity.toLowerCase()}`, `bouncy castle ${r.mainCity.toLowerCase()}`, `party hire ${r.mainCity.toLowerCase()}`],
      product: "bouncy-castle-hire",
    },
    {
      slug: `soft-play-hire-guide-${r.slug}`,
      title: `Soft Play Hire ${r.mainCity}`,
      metaTitle: `Soft Play Hire ${r.mainCity} | Prices & Best Providers (2026)`,
      metaDescription: `Looking for soft play hire in ${r.mainCity}? Compare local providers, find prices and get everything you need for your toddler party.`,
      h1: `Soft Play Hire Guide for ${r.mainCity} & ${r.theName}`,
      intro: `Soft play hire is perfect for toddler birthday parties and events where younger children need safe, age-appropriate entertainment. This guide covers soft play hire options across ${r.theName}.`,
      sections: [
        {
          heading: `Soft Play Hire Prices in ${r.theName}`,
          content: `Soft play hire in ${r.theName} typically costs £80-£150 for a full set delivered to your home or venue. A basic soft play package usually includes foam shapes, ball pools, ride-on toys and activity mats suitable for children aged one to four. Premium packages with themed sets, sensory items and additional pieces cost more. Most companies in ${r.areas} include delivery, setup and collection within a set radius. Some offer combined packages with a small bouncy castle for a discounted rate.`,
        },
        {
          heading: "What to Look for in a Soft Play Provider",
          content: `Check that equipment is clean, well-maintained and made from commercial-grade foam with wipe-clean covers. The provider should have public liability insurance and be able to show you photos of their actual equipment. Read reviews from other parents. Ask about their cleaning and hygiene procedures, as soft play equipment needs thorough sanitising between hires. Good providers will arrange the equipment attractively and provide clear safety guidance for parents supervising the play area.`,
        },
        {
          heading: "Setting Up Soft Play at Home",
          content: `You will need a clear floor area of at least three by three metres for a standard soft play set. A living room, garage or conservatory works well. Lay down a protective mat or sheet under the equipment to protect your flooring. Keep the area warm if outdoors. Remove any sharp furniture or objects from the surrounding area. For garden parties, soft play works best on flat grass or patio areas. Most companies will set up and arrange the equipment for you, and return to collect it at the agreed time.`,
        },
      ],
      faq: [
        { question: `How much does soft play hire cost in ${r.theName}?`, answer: `Soft play hire in ${r.theName} typically costs £80-£150 for a full set including delivery, setup and collection.` },
        { question: "What age is soft play suitable for?", answer: "Soft play sets are designed for children aged one to four, with foam shapes, ball pools and ride-on toys." },
      ],
      relatedLocations: r.locations,
      keywords: [`soft play hire ${r.mainCity.toLowerCase()}`, `toddler party ${r.mainCity.toLowerCase()}`, `soft play ${r.mainCity.toLowerCase()}`],
      product: "bouncy-castle-hire",
    },
    {
      slug: `party-entertainment-hire-${r.slug}`,
      title: `Party Entertainment Hire ${r.mainCity}`,
      metaTitle: `Party Entertainment Hire ${r.mainCity} | Ideas, Prices & Packages (2026)`,
      metaDescription: `Planning a party in ${r.mainCity}? Discover the best entertainment hire options including inflatables, games and activity packages.`,
      h1: `Party Entertainment Hire in ${r.mainCity} & ${r.theName}`,
      intro: `From bouncy castles and inflatable slides to disco domes and garden games, there are plenty of entertainment hire options for parties and events across ${r.theName}. This guide helps you find the right entertainment for your event.`,
      sections: [
        {
          heading: "Popular Party Entertainment Options",
          content: `The most popular party entertainment options in ${r.theName} include bouncy castles, inflatable slides, assault courses, disco domes, gladiator jousting, sumo suits and bungee runs. For younger children, soft play sets, ball pools and ride-on toys are ideal. Garden games packages with giant Jenga, Connect 4 and lawn games are popular for family events and weddings. Many companies in ${r.areas} offer package deals combining multiple items at a discounted rate.`,
        },
        {
          heading: "How to Choose Entertainment for Your Event",
          content: `Consider the age range of guests, the available space, and your budget. For mixed-age parties, an assault course or combo bouncy castle with slide works well as it appeals to a wide range of ages. For adult events, consider gladiator duels, sumo suits or a rodeo bull. For corporate fun days, ask about team-building inflatable packages. Check the power requirements, as large inflatables need a dedicated power supply. If you are hiring for a public event or fete, you may need additional insurance and risk assessments.`,
        },
        {
          heading: "Booking Tips and What to Expect",
          content: `Book early for summer weekends and school holidays, as popular dates fill up quickly in ${r.theName}. Most companies require a deposit to secure your booking, with the balance due on the day. Delivery and setup typically takes 15-30 minutes per item. The company will check the site, inflate the equipment and anchor it securely. You are usually responsible for supervision during the hire period. At the end of the hire, the company will return to deflate and collect. Most items can be hired for a half day or full day, with some companies offering overnight hire for a small surcharge.`,
        },
      ],
      faq: [
        { question: `How much does bouncy castle hire cost in ${r.theName}?`, answer: `Standard bouncy castle hire in ${r.theName} costs £60-£90 for a full day. Larger or themed inflatables cost £80-£200. Prices include delivery, setup and collection.` },
        { question: "Do I need insurance to hire a bouncy castle?", answer: "No, the hire company provides public liability insurance. You just need to ensure an adult supervises at all times." },
        { question: "Can bouncy castles be used indoors?", answer: "Yes, many companies offer indoor-suitable inflatables for village halls and sports centres. Check ceiling height requirements with the provider." },
      ],
      relatedLocations: r.locations,
      keywords: [`party entertainment ${r.mainCity.toLowerCase()}`, `inflatable hire ${r.mainCity.toLowerCase()}`, `event hire ${r.mainCity.toLowerCase()}`],
      product: "bouncy-castle-hire",
    },
  ];
}

export function getBouncyGuides(): Guide[] {
  const region = getGuideRegion();
  if (!region) return [];
  return generate(region);
}
