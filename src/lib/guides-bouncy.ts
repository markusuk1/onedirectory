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
    {
      slug: `bouncy-castle-hire-costs-${r.slug}`,
      title: `Bouncy Castle Hire Costs ${r.mainCity}`,
      metaTitle: `Bouncy Castle Hire Prices ${r.mainCity} | How Much Does It Cost? (2026)`,
      metaDescription: `How much does bouncy castle hire cost in ${r.mainCity}? Prices by type and size, what is included, and how to get the best deal in ${r.theName}.`,
      h1: `Bouncy Castle Hire Costs in ${r.mainCity} & ${r.theName}`,
      intro: `Bouncy castle hire prices depend on the size, type, and duration of hire. Whether you are planning a children's birthday party, a school fete, or a family garden party, knowing what to expect helps you budget and choose the right option. Here is a breakdown of bouncy castle hire costs across ${r.theName}.`,
      sections: [
        {
          heading: `How Much Does Bouncy Castle Hire Cost in ${r.theName}?`,
          content: `A standard children's bouncy castle in ${r.theName} costs £60-£90 for a full day hire (typically delivered in the morning and collected in the evening). A larger castle suitable for older children and adults costs £80-£130. Themed and novelty castles (princess, superhero, disco) cost £75-£120. An inflatable slide costs £80-£140. A bouncy castle with slide combination costs £100-£160. Soft play hire for toddlers costs £70-£120. Obstacle courses and large inflatables for events cost £120-£250+. Most hire companies include delivery, setup, and collection within a local area (typically 10-20 miles). Weekend bookings are the busiest and prices may be slightly higher on Saturdays in peak season (May-September).`,
        },
        {
          heading: "What Affects the Price?",
          content: `Size is the biggest factor. A small children's castle (10ft x 10ft) is the cheapest option, while large adult castles (20ft+) and obstacle courses cost two to three times more. The type of inflatable matters. Standard castles are cheapest, while themed, interactive (like gladiator duel or bungee run) and combination units with slides cost more. Hire duration affects price. Most companies charge for a full day, but some offer half-day or weekend packages. Distance from the hire company's base affects delivery charges. Most include free delivery within 10-20 miles and charge £1-£2 per mile beyond that. Time of year makes a difference. Summer weekends are peak demand and prices are highest. Midweek hire and off-season (October-March) are often discounted by 10-30%.`,
        },
        {
          heading: "How to Get the Best Price",
          content: `Book early, especially for summer weekends and school holidays, when popular castles sell out weeks in advance. Midweek hire is almost always cheaper and more available. Ask about multi-item discounts if you want a bouncy castle plus soft play, or multiple inflatables for a larger event. Some companies in ${r.theName} offer party packages that include a castle, soft play, and a candy floss or popcorn machine at a bundle price. Book off-peak (October-March) for indoor venues and you may get 20-30% off. Compare at least three companies and check what is included in the price. A cheaper headline price that excludes delivery or requires you to inflate the castle yourself is not a genuine saving.`,
        },
        {
          heading: "What Is Included in the Price?",
          content: `A standard bouncy castle hire in ${r.theName} includes delivery and setup at your venue, the inflatable itself with a blower (which must stay running), collection at an agreed time, and public liability insurance (typically £1-£5 million). Most companies provide ground stakes or sandbags for anchoring. Items not usually included are an extension lead or power supply (you need a mains socket within 25-50 metres), wet weather covers, and overnight hire. Some companies provide a rain cover or an indoor-suitable castle at no extra charge, while others charge £10-£20 extra. Generator hire (if no mains power is available) costs £40-£80 extra.`,
        },
        {
          heading: "Hidden Costs to Watch Out For",
          content: `The most common extra charges are delivery surcharges for distances beyond the free zone, generator hire if you do not have a mains power supply, and overtime charges if you want the castle collected later than agreed. Cancellation policies vary. Most companies allow free cancellation for rain but charge 50-100% for cancellations within 48 hours for other reasons. Check whether the quoted price includes VAT, as some smaller operators do not charge VAT while larger ones do, which adds 20% to the price. Damage to the inflatable is usually covered by a deposit (typically £50-£100) taken before the event. If the castle is damaged by misuse, sharp objects, or being left out in high winds, you may lose the deposit.`,
        },
      ],
      faq: [
        {
          question: "How much does a bouncy castle cost to hire for a day?",
          answer: `A standard children's bouncy castle in ${r.theName} costs £60-£90 for a full day. Larger adult castles cost £80-£130. This typically includes delivery, setup, and collection within the local area. Themed and combination units cost more.`,
        },
        {
          question: "Do I need a power supply for a bouncy castle?",
          answer: "Yes. The electric blower must run continuously while the castle is inflated. You need a standard 13-amp mains socket within 25-50 metres. If you are hiring for an outdoor event without power, you will need a generator, which most hire companies can provide for £40-£80 extra.",
        },
        {
          question: "Can I hire a bouncy castle in winter?",
          answer: "Yes, for indoor venues with sufficient ceiling height and floor space. Many hire companies offer indoor-suitable inflatables and some give 20-30% off-season discounts between October and March. Always confirm the venue allows inflatables and check ceiling height requirements.",
        },
        {
          question: "What happens if it rains on the day?",
          answer: "Most hire companies allow free cancellation or rescheduling for adverse weather. Some provide rain covers that allow the castle to stay up in light rain. In heavy rain or high winds (above 20-25mph), the castle must come down for safety. Check the company's weather policy before booking.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `bouncy castle hire prices ${r.mainCity.toLowerCase()}`,
        `bouncy castle cost ${r.name.toLowerCase()}`,
        `how much bouncy castle hire ${r.mainCity.toLowerCase()}`,
        `inflatable hire prices ${r.name.toLowerCase()}`,
        `bouncy castle hire rates ${r.mainCity.toLowerCase()}`,
      ],
      product: "bouncy-castle-hire",
    },
  ];
}

export function getBouncyGuides(): Guide[] {
  const region = getGuideRegion();
  if (!region) return [];
  return generate(region);
}
