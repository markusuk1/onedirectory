import type { Guide } from "./guides";
import { getGuideRegion, type GuideRegion } from "./guide-regions";

function generate(r: GuideRegion): Guide[] {
  return [
    {
      slug: `limo-hire-guide-${r.slug}`,
      title: `Limo Hire ${r.mainCity}`,
      metaTitle: `Limo Hire ${r.mainCity} | Prices, Tips & Best Companies (2026)`,
      metaDescription: `Looking for limo hire in ${r.mainCity}? Compare prices, find the best limo hire companies and book your perfect vehicle for any occasion.`,
      h1: `Limo Hire Guide for ${r.mainCity} & ${r.theName}`,
      intro: `Whether it is a wedding, prom, hen night or corporate event, arriving in a limousine makes any occasion special. This guide covers everything you need to know about limo hire in ${r.theName}, including prices, vehicle types and how to find the right company.`,
      sections: [
        {
          heading: `How Much Does Limo Hire Cost in ${r.theName}?`,
          content: `Limo hire prices in ${r.theName} vary depending on the vehicle, duration and day of the week. A standard stretch limo for a three-hour evening hire typically costs £250-£400. Hummer limos and larger party vehicles cost £350-£600 for three hours. Wedding car hire for the day usually ranges from £300-£800 depending on the vehicle. Prom packages for a one to two hour journey start from £150-£300. Midweek bookings are often cheaper than weekends. Most companies in ${r.areas} offer packages that include a set number of hours, complimentary drinks and red carpet arrival.`,
        },
        {
          heading: "Types of Limo and Luxury Vehicles",
          content: `The most popular vehicles for hire in ${r.theName} include the classic Lincoln Town Car stretch limo, which seats 8-10 passengers in white or black. Hummer H2 stretch limos seat up to 16 and are popular for hen and stag parties with built-in bars, lighting and sound systems. Chrysler 300 Baby Bentley limos offer a sleek, modern look for weddings and proms. For weddings, you can also hire Rolls Royce Phantoms, Bentley Arnages, vintage cars and horse-drawn carriages. Party buses seat 16-30 passengers and feature dance floors, DJ booths and LED lighting.`,
        },
        {
          heading: "What to Check Before Booking",
          content: `Always check that the limo hire company is licensed by the local council. All limousines carrying passengers for hire must have a private hire vehicle licence. Ask to see proof of insurance that covers passengers. Check the vehicle seating capacity, as some stretch limos are licensed for fewer passengers than they can physically seat. Read reviews from previous customers. Ask exactly what is included in the price: drinks, decorations, red carpet, music system. Confirm the pickup and drop-off arrangements, including any waiting time charges. Reputable companies in ${r.theName} will let you view the vehicle before booking.`,
        },
        {
          heading: "Booking Tips for Proms, Weddings and Events",
          content: `For proms, book as early as possible as June and July dates sell out quickly in ${r.theName}. Consider sharing with friends to split the cost. For weddings, book six to twelve months ahead, especially for popular venues in ${r.areas}. Ask about backup vehicles in case of breakdown. For hen and stag nights, party buses are often better value than a limo if you have a large group. For corporate events and airport transfers, look for companies that offer professional chauffeurs in executive vehicles such as Mercedes S-Class or BMW 7 Series.`,
        },
      ],
      faq: [
        { question: `How much does limo hire cost in ${r.theName}?`, answer: `A stretch limo for three hours costs £250-£400. Hummer limos cost £350-£600. Wedding cars cost £300-£800 for the day.` },
        { question: "Are limousines licensed?", answer: "All limos carrying passengers for hire must have a private hire vehicle licence. Always check before booking." },
      ],
      relatedLocations: r.locations,
      keywords: [`limo hire ${r.mainCity.toLowerCase()}`, `limousine hire ${r.mainCity.toLowerCase()}`, `stretch limo ${r.mainCity.toLowerCase()}`],
      product: "limo-hire",
    },
    {
      slug: `wedding-car-hire-guide-${r.slug}`,
      title: `Wedding Car Hire ${r.mainCity}`,
      metaTitle: `Wedding Car Hire ${r.mainCity} | Prices, Ideas & Best Companies (2026)`,
      metaDescription: `Looking for wedding car hire in ${r.mainCity}? Compare prices, browse vehicle options and find the perfect wedding transport.`,
      h1: `Wedding Car Hire Guide for ${r.mainCity} & ${r.theName}`,
      intro: `Your wedding car sets the tone for one of the most important days of your life. This guide covers wedding car hire options across ${r.theName}, from classic Rolls Royces to modern luxury vehicles.`,
      sections: [
        {
          heading: `Wedding Car Hire Prices in ${r.theName}`,
          content: `Wedding car hire in ${r.theName} typically costs £300-£500 for a modern luxury vehicle for the day, including ribbons and decorations. Vintage and classic cars usually cost £400-£800. A Rolls Royce Phantom or Bentley costs £500-£1,000 for the day. Most packages include collection from the bride's home, transport to the ceremony venue, and onward transport to the reception. Additional services such as a second car for bridesmaids or a return journey in the evening are available at extra cost. Prices vary across ${r.areas} depending on distance and time of year.`,
        },
        {
          heading: "Popular Wedding Car Choices",
          content: `The most popular wedding cars in ${r.theName} include the Rolls Royce Phantom and Silver Shadow for a classic, elegant look. Bentley Arnage and Continental models offer luxury with a modern edge. Vintage enthusiasts love 1930s Beaufords, Austin Princesses and classic Daimlers. For a fun and unique arrival, couples choose VW camper vans, London taxis, classic American cars or even horse-drawn carriages. Modern choices include Mercedes S-Class, Range Rover Vogue and Tesla models for an eco-friendly option.`,
        },
        {
          heading: "How to Choose Your Wedding Car",
          content: `Start by considering the style of your wedding. A vintage car suits a traditional country wedding, while a sleek modern vehicle complements a city venue. Think about practical details: how many people need transporting, the distance between venues, and whether the vehicle needs to handle narrow lanes. Visit the company to see the actual car you will be hiring, not just photos. Check that the chauffeur is smartly dressed and experienced with weddings. Ask about contingency plans in case of vehicle breakdown. Book at least six months ahead for popular dates in ${r.theName}.`,
        },
      ],
      faq: [
        { question: `How much does limo hire cost in ${r.theName}?`, answer: `A stretch limo for three hours costs £250-£400. Hummer limos cost £350-£600. Wedding cars cost £300-£800 for the day.` },
        { question: "Are limousines licensed?", answer: "All limos carrying passengers for hire must have a private hire vehicle licence. Always check before booking." },
      ],
      relatedLocations: r.locations,
      keywords: [`limo hire ${r.mainCity.toLowerCase()}`, `limousine hire ${r.mainCity.toLowerCase()}`, `stretch limo ${r.mainCity.toLowerCase()}`],
      product: "limo-hire",
    },
    {
      slug: `prom-car-hire-guide-${r.slug}`,
      title: `Prom Car Hire ${r.mainCity}`,
      metaTitle: `Prom Car Hire ${r.mainCity} | Prices, Ideas & Top Companies (2026)`,
      metaDescription: `Make your prom entrance unforgettable in ${r.mainCity}. Compare prom car hire prices, find the best vehicles and book your ride.`,
      h1: `Prom Car Hire Guide for ${r.mainCity} & ${r.theName}`,
      intro: `Arriving at prom in style is a rite of passage for students across ${r.theName}. From stretch limos and Hummers to sports cars and novelty vehicles, this guide covers your prom car hire options.`,
      sections: [
        {
          heading: `Prom Car Hire Prices in ${r.theName}`,
          content: `Prom car hire in ${r.theName} typically costs £150-£300 for a stretch limo for a one to two hour journey. Hummer limos cost £200-£400 for a prom package. Supercar experiences in a Lamborghini or Ferrari start from £200-£500 for a short journey. Party buses for larger groups of 16-30 cost £300-£600 and are great value when split between friends. Most packages in ${r.areas} include a pickup from home, a scenic route to the venue, and a red carpet drop-off. Some companies offer drinks packages with non-alcoholic fizz and glasses.`,
        },
        {
          heading: "Top Prom Vehicle Ideas",
          content: `The classic choice is a white stretch limo with neon lighting, music system and champagne glasses. Hummer limos make a big impression and seat up to 16 friends. For something different, consider a supercar arrival in a Lamborghini Huracan, Ferrari 488 or McLaren. Novelty options include American school buses, fire engines, tanks and DeLoreans. Party buses are increasingly popular for large groups who want to travel together. For a sophisticated look, a Rolls Royce Phantom or Bentley Continental makes an elegant statement.`,
        },
        {
          heading: "Booking Tips for Prom Night",
          content: `Prom season runs from late June to mid-July, and popular vehicles book up fast in ${r.theName}. Start looking at least three months ahead. Coordinate with friends early if you want to share a vehicle and split costs. Confirm the exact pickup time and allow plenty of buffer. Make sure the vehicle is licensed for the number of passengers. Check the company's reviews, especially from other prom bookings. Ask about their policy on decorations, music choices and photo opportunities. Some companies offer group discounts for booking multiple vehicles on the same evening.`,
        },
      ],
      faq: [
        { question: `How much does limo hire cost in ${r.theName}?`, answer: `A stretch limo for three hours costs £250-£400. Hummer limos cost £350-£600. Wedding cars cost £300-£800 for the day.` },
        { question: "Are limousines licensed?", answer: "All limos carrying passengers for hire must have a private hire vehicle licence. Always check before booking." },
      ],
      relatedLocations: r.locations,
      keywords: [`limo hire ${r.mainCity.toLowerCase()}`, `limousine hire ${r.mainCity.toLowerCase()}`, `stretch limo ${r.mainCity.toLowerCase()}`],
      product: "limo-hire",
    },
    {
      slug: `limo-hire-costs-${r.slug}`,
      title: `Limo Hire Costs ${r.mainCity}`,
      metaTitle: `Limo Hire Prices ${r.mainCity} | How Much Does Limo Hire Cost? (2026)`,
      metaDescription: `How much does limo hire cost in ${r.mainCity}? Prices by vehicle type, occasion, and hire duration. What to expect from limo companies in ${r.theName}.`,
      h1: `Limo Hire Costs in ${r.mainCity} & ${r.theName}`,
      intro: `Limo hire prices vary depending on the vehicle, the occasion, and how long you need it. Whether you are booking for a wedding, prom, hen party, or airport transfer, understanding typical costs helps you find the right deal. This guide covers limo hire prices across ${r.theName}.`,
      sections: [
        {
          heading: `How Much Does Limo Hire Cost in ${r.theName}?`,
          content: `A standard stretch limousine in ${r.theName} costs £150-£350 for a 2-3 hour hire. A Hummer or SUV limo costs £250-£500 for 2-3 hours. Vintage and classic cars for weddings cost £200-£450 for the ceremony (typically covering 3-4 hours). A party bus for hen and stag parties costs £300-£600 for 3-4 hours. Prom packages (1-2 hours) cost £150-£300 for a stretch limo or £200-£400 for a Hummer. Airport transfers in a luxury car cost £80-£200 depending on distance. Prices typically include a uniformed chauffeur, the vehicle, and a set route or time period. Drinks packages, decorations and red carpet service may be included or available as extras.`,
        },
        {
          heading: "What Affects the Price?",
          content: `Vehicle type is the biggest factor. A standard white stretch limo is the most affordable option. Hummer limos, Rolls-Royce, Bentley, and party buses command premium prices. Duration matters because most companies have a minimum hire of 1-2 hours and charge per hour beyond that. Additional hours typically cost £80-£150 per hour for a stretch limo and £120-£200 for a Hummer. Day of the week affects price. Saturday is peak demand for weddings and proms and is typically 10-20% more expensive than midweek. Season matters too, with May-September being the busiest period. Distance from the limo company's base to your pickup point affects cost, as travel time counts towards the hire. Passenger numbers determine vehicle size. A standard stretch limo seats 8, while a Hummer seats 14-16.`,
        },
        {
          heading: "How to Get the Best Price",
          content: `Book early, especially for proms (May-July) and wedding season (April-September). Popular vehicles book out months in advance. Compare at least three companies in ${r.theName} and check what is included in each quote. A lower price that excludes a drinks package or charges extra for decorations may cost more overall. Consider off-peak times. A Friday evening or Sunday limo hire is usually cheaper than Saturday. Midweek bookings can be 20-30% less. For proms, share the cost between a group. A Hummer limo at £350 split between 14 people is £25 each, which is excellent value. Ask about return journey discounts for events where you need pickup and drop-off at different times.`,
        },
        {
          heading: "What Is Included in the Price?",
          content: `A standard limo hire price in ${r.theName} includes the vehicle, a uniformed chauffeur, the agreed hire time or route, fuel, and insurance. Most companies include basic interior lighting, music system, and climate control. Many wedding packages include ribbons, bows, and a complimentary bottle of prosecco. Items that vary between companies include drinks (some include a set number of bottles, others charge extra), decorations and theming, red carpet arrival, route detours or extra stops, and waiting time beyond the quoted period. Gratuity for the chauffeur is not usually included and is at your discretion, typically £10-£20.`,
        },
        {
          heading: "Hidden Costs to Watch Out For",
          content: `The most common extra charges are overtime (if your event overruns the booked time), cleaning fees (if the vehicle is left in a significantly messy state), and additional stops or route changes. Some companies quote excluding VAT, which adds 20% to the price, so always confirm whether the quote is VAT-inclusive. Cancellation policies vary. Most require a non-refundable deposit (typically 25-50% of the total) and charge the full amount for cancellations within 14-30 days of the event. Damage deposits are common, typically £100-£200, refunded after the hire if no damage occurs. If you are booking a vehicle you have seen online, confirm exactly which vehicle you will receive, as some companies use stock photos that do not match their actual fleet.`,
        },
      ],
      faq: [
        {
          question: "How much does a wedding car cost to hire?",
          answer: `Wedding car hire in ${r.theName} costs £200-£450 for the ceremony, typically covering 3-4 hours. A modern luxury car (Rolls-Royce, Bentley) is at the top end, while a classic or vintage car costs £200-£350. Most include ribbons, bows, a uniformed chauffeur, and a bottle of prosecco.`,
        },
        {
          question: "How much is a prom limo?",
          answer: `Prom limo packages in ${r.theName} cost £150-£300 for a stretch limo (1-2 hours) or £200-£400 for a Hummer limo. Split between a group, this works out at £20-£40 per person. Book early as prom season (May-July) is extremely busy and popular vehicles sell out fast.`,
        },
        {
          question: "Is there a minimum hire time for a limo?",
          answer: "Yes. Most limo companies have a minimum hire of 1-2 hours. Some charge a flat rate for short packages (like a prom pickup or airport transfer) that covers a set route rather than a time period. Additional time beyond the minimum is charged per hour.",
        },
        {
          question: "Can I bring my own drinks in a limo?",
          answer: "Policies vary by company. Some allow you to bring your own alcohol at no extra charge, while others require you to purchase their drinks packages. Some prohibit outside drinks entirely. Always confirm the alcohol policy when booking, especially for party or hen/stag bookings.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `limo hire prices ${r.mainCity.toLowerCase()}`,
        `limo hire cost ${r.name.toLowerCase()}`,
        `how much limo hire ${r.mainCity.toLowerCase()}`,
        `wedding car hire cost ${r.name.toLowerCase()}`,
        `prom limo prices ${r.mainCity.toLowerCase()}`,
      ],
      product: "limo-hire",
    },
  ];
}

export function getLimoGuides(): Guide[] {
  const region = getGuideRegion();
  if (!region) return [];
  return generate(region);
}
