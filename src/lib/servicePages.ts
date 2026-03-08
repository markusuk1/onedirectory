import type { ProductId } from "./productConfig";

export interface ServicePage {
  slug: string;
  name: string;
  h1: (location: string) => string;
  metaTitle: (location: string) => string;
  metaDescription: (location: string) => string;
  intro: (location: string, region: string) => string;
  sections: {
    heading: string | ((location: string) => string);
    content: string | ((location: string, region?: string) => string);
  }[];
  faq: {
    question: string | ((location: string) => string);
    answer: string | ((location: string) => string);
  }[];
}

export const SERVICE_PAGES: Partial<Record<ProductId, ServicePage[]>> = {
  "minibus-hire": [
    {
      slug: "airport-transfers",
      name: "Airport Transfers",
      h1: (loc) => `Airport Transfer Minibus Hire in ${loc}`,
      metaTitle: (loc) => `Airport Transfers ${loc} | Minibus & Coach Hire (2026)`,
      metaDescription: (loc) => `Book airport transfer minibuses in ${loc}. Compare prices for Heathrow, Gatwick, Manchester & local airports. Group transfers from £8pp.`,
      intro: (loc, region) => `Need a group airport transfer in ${loc}? A minibus is the most cost-effective way to get your group to or from the airport. Companies across ${region} offer door-to-door airport transfers with meet-and-greet services, flight tracking and luggage handling included.`,
      sections: [
        {
          heading: (loc) => `Airport Transfer Prices in ${loc}`,
          content: (loc) => `Airport transfer prices from ${loc} depend on distance, group size and time of day. A minibus (8-16 seats) to a regional airport typically costs £80-£200. Transfers to major airports like Heathrow or Manchester cost £200-£500 for a minibus. Per person, this works out at £8-£30 each — often cheaper than individual taxis. Most companies in ${loc} offer fixed quotes with no hidden charges, and many include a free meet-and-greet service at the terminal.`,
        },
        {
          heading: "Why Choose a Minibus for Airport Transfers?",
          content: (loc) => `A minibus keeps your group together, eliminates the hassle of coordinating multiple taxis, and costs less per person. Drivers track your flight so they are waiting when you land. Luggage space is generous — most 16-seater minibuses have a large boot or trailer for suitcases. For early morning or late night flights from ${loc}, a pre-booked minibus means no waiting for public transport and no surge-priced ride apps.`,
        },
        {
          heading: "Booking Tips for Group Airport Transfers",
          content: (loc) => `Book at least a week ahead, especially during school holidays and summer. Provide your flight number so the driver can track arrivals. Confirm luggage capacity — tell the company exactly how many large suitcases you have. Check the cancellation policy in case of flight changes. For return transfers, agree a pickup point at the terminal. Many ${loc} operators offer discounts for return bookings.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much is an airport transfer minibus from ${loc}?`,
          answer: (loc) => `A minibus airport transfer from ${loc} typically costs £80-£200 to regional airports and £200-£500 to major airports. Per person, that is usually £8-£30 each.`,
        },
        {
          question: "Can the driver track my flight?",
          answer: () => "Yes, most minibus companies include flight tracking. They will adjust the pickup time if your flight is delayed at no extra charge.",
        },
        {
          question: "How far in advance should I book?",
          answer: () => "Book at least 7 days ahead. During summer and school holidays, popular time slots fill up fast — book 2-3 weeks ahead for peak dates.",
        },
      ],
    },
    {
      slug: "self-drive",
      name: "Self-Drive Hire",
      h1: (loc) => `Self-Drive Minibus Hire in ${loc}`,
      metaTitle: (loc) => `Self-Drive Minibus Hire ${loc} | Prices & Companies (2026)`,
      metaDescription: (loc) => `Hire a self-drive minibus in ${loc}. Drive yourself and save up to 50%. 9-17 seaters available. Compare prices from local companies.`,
      intro: (loc, region) => `Self-drive minibus hire puts you in control. Pick up the vehicle, drive your group wherever you need to go, and return it when you are done. It is the most flexible and often cheapest option for group transport in ${loc} and across ${region}.`,
      sections: [
        {
          heading: (loc) => `Self-Drive Minibus Hire Prices in ${loc}`,
          content: (loc) => `Self-drive minibus hire in ${loc} typically costs £80-£150 per day for a 9-seater and £120-£200 per day for a 12-17 seater. Weekend rates may be higher. Most companies require a deposit of £200-£500 and you must be aged 25+ with a full UK driving licence held for at least 2 years. Some companies charge extra for additional drivers. Fuel is your responsibility — vehicles are supplied with a full tank and should be returned full.`,
        },
        {
          heading: "What Licence Do I Need?",
          content: () => `For minibuses up to 9 seats (including driver), a standard category B car licence is sufficient. For 10-16 seat minibuses, you need a D1 licence. If you passed your car test before 1 January 1997, you automatically have D1 on your licence. If you passed after that date, you will need to take a separate D1 test, or you can drive a minibus under Section 19 permit rules for non-commercial purposes. Always check your licence before booking.`,
        },
        {
          heading: "Tips for Self-Drive Minibus Hire",
          content: (loc) => `Book early, especially for weekends and holidays when self-drive minibuses in ${loc} are in high demand. Check the insurance excess — it can be £500-£1,000 on some policies. Consider purchasing the hire company's excess reduction cover. Inspect the vehicle thoroughly at collection and photograph any existing damage. Check tyre pressures and ensure you know where the spare tyre and jack are. Drive carefully — minibuses handle differently from cars, especially in crosswinds and when fully loaded.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much does self-drive minibus hire cost in ${loc}?`,
          answer: (loc) => `Self-drive hire in ${loc} costs £80-£150/day for a 9-seater and £120-£200/day for a 12-17 seater. Weekend and weekly rates are also available.`,
        },
        {
          question: "Do I need a D1 licence?",
          answer: () => "For minibuses with 10-16 seats, yes. If you passed your driving test before 1 January 1997, you already have D1. Otherwise, a standard licence covers up to 9 seats.",
        },
      ],
    },
    {
      slug: "with-driver",
      name: "With Driver",
      h1: (loc) => `Minibus Hire With Driver in ${loc}`,
      metaTitle: (loc) => `Minibus Hire With Driver ${loc} | Prices & Companies (2026)`,
      metaDescription: (loc) => `Hire a minibus with driver in ${loc}. Sit back and relax while a professional driver takes your group wherever you need to go.`,
      intro: (loc, region) => `Hiring a minibus with a professional driver is the stress-free option for group transport in ${loc}. No licence worries, no navigation hassle, and everyone in your group can relax and enjoy the journey. Companies across ${region} provide experienced, licensed drivers for any occasion.`,
      sections: [
        {
          heading: (loc) => `Minibus With Driver Prices in ${loc}`,
          content: (loc) => `Minibus hire with driver in ${loc} typically costs £20-£35 per hour for a standard 16-seater, with a minimum hire of 2-4 hours. For full-day hire (8-10 hours), expect to pay £200-£400. Coach hire with driver for larger groups costs £300-£700 per day. Prices vary depending on time of day, day of week and distance. Weekend evening bookings tend to cost 10-20% more. Most companies in ${loc} provide an all-inclusive price covering driver, fuel and vehicle.`,
        },
        {
          heading: "When to Choose Hire With Driver",
          content: () => `A minibus with driver is ideal for nights out (no designated driver needed), weddings (the whole party arrives together), corporate events (professional and reliable), school trips (fully licensed and insured), and airport transfers (door-to-door convenience). It is also the right choice if nobody in your group has a D1 licence for larger minibuses, or if you want the flexibility to change plans on the day.`,
        },
        {
          heading: "What to Expect From Your Driver",
          content: (loc) => `Professional minibus drivers in ${loc} will be CRB/DBS checked, hold the correct PCV licence, and know the local area well. They will help with luggage, accommodate reasonable route changes, and wait for your group at each stop. For evening bookings, drivers typically wait at a convenient location and are available by phone. Confirm waiting charges in advance — most companies include reasonable waiting time in their quote.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much is minibus hire with driver in ${loc}?`,
          answer: (loc) => `Minibus hire with driver in ${loc} costs £20-£35 per hour for a 16-seater, or £200-£400 for a full day. Prices include driver, fuel and vehicle.`,
        },
        {
          question: "Is the driver included in the seat count?",
          answer: () => "Yes. A 16-seater minibus has 15 passenger seats plus the driver. Make sure you count correctly when booking.",
        },
      ],
    },
    {
      slug: "cheap",
      name: "Cheap Minibus Hire",
      h1: (loc) => `Cheap Minibus Hire in ${loc}`,
      metaTitle: (loc) => `Cheap Minibus Hire ${loc} | Compare Lowest Prices (2026)`,
      metaDescription: (loc) => `Find the cheapest minibus hire in ${loc}. Compare prices from local companies, get group discounts and save on your next trip.`,
      intro: (loc, region) => `Looking for affordable minibus hire in ${loc}? Prices vary significantly between companies, so comparing quotes is the best way to find a good deal. Here is how to get the cheapest minibus hire across ${region} without compromising on quality or safety.`,
      sections: [
        {
          heading: (loc) => `Cheapest Minibus Hire Options in ${loc}`,
          content: (loc) => `The cheapest way to hire a minibus in ${loc} is self-drive, which cuts out the driver cost — from £80/day for a 9-seater. If you need a driver, midweek daytime bookings are cheapest. Sharing costs between your group brings the per-person price down dramatically: a £300 day hire split 15 ways is just £20 each. Companies in ${loc} often offer discounts for advance bookings, return customers and longer hires. Always get 3+ quotes to compare.`,
        },
        {
          heading: "How to Save Money on Minibus Hire",
          content: () => `Book early — last-minute bookings cost more. Be flexible on dates if possible, as midweek is cheaper than weekends. Choose the right size — do not hire a 33-seater coach when a 16-seater will do. Ask about package deals that include multiple stops or return journeys. Consider off-peak times for better rates. Get quotes from several companies and mention competing prices. Some operators match or beat competitor quotes.`,
        },
        {
          heading: "Cheap Does Not Mean Unsafe",
          content: (loc) => `When comparing cheap minibus hire in ${loc}, always check the operator has a valid PSV licence, appropriate insurance, and well-maintained vehicles. Read Google reviews and check ratings. A reputable budget operator will be happy to show you their licence and insurance documents. Avoid any company that quotes significantly below market rate with no online reviews — this can indicate an unlicensed operator.`,
        },
      ],
      faq: [
        {
          question: (loc) => `What is the cheapest minibus hire in ${loc}?`,
          answer: (loc) => `Self-drive minibus hire in ${loc} starts from £80/day. With driver, budget options start from £150/day. Per person, group hire works out at £10-£30 each.`,
        },
        {
          question: "How can I get the best price?",
          answer: () => "Book early, be flexible on dates, compare 3+ quotes, and choose midweek if possible. Mentioning competing quotes can also help.",
        },
      ],
    },
    {
      slug: "wedding",
      name: "Wedding Transport",
      h1: (loc) => `Wedding Minibus & Coach Hire in ${loc}`,
      metaTitle: (loc) => `Wedding Minibus Hire ${loc} | Guest Transport (2026)`,
      metaDescription: (loc) => `Book wedding guest transport in ${loc}. Minibuses and coaches for ceremony to reception transfers. Compare prices from local companies.`,
      intro: (loc, region) => `Getting your wedding guests between venues smoothly is one of the most important logistics of the big day. A minibus or coach ensures everyone arrives together, on time, and in good spirits. Companies across ${region} specialise in wedding transport with ribbon-decorated vehicles and experienced drivers.`,
      sections: [
        {
          heading: (loc) => `Wedding Transport Prices in ${loc}`,
          content: (loc) => `Wedding minibus hire in ${loc} typically costs £200-£400 for a ceremony-to-reception shuttle, depending on distance and vehicle size. A full-day hire for multiple journeys (hotel to ceremony, ceremony to reception, evening return) costs £400-£700. Coaches for larger weddings cost £300-£600 for a shuttle run. Many companies in ${loc} offer wedding packages with ribbon decorations, champagne glasses and red carpet arrival included in the price.`,
        },
        {
          heading: "Planning Wedding Guest Transport",
          content: () => `Start by counting how many guests need transport — typically those without cars, elderly guests, and anyone who wants to drink freely. Book 6-12 months ahead for popular summer Saturday dates. Plan the route and timings carefully: allow 30 minutes buffer between the ceremony ending and the minibus departing. For evening guests arriving later, arrange a separate shuttle. Provide guests with clear transport information on your wedding website or invitations.`,
        },
        {
          heading: "Making It Special",
          content: (loc) => `Many wedding transport companies in ${loc} offer decorated vehicles with ribbons and bows in your wedding colours. Some provide champagne or prosecco for the journey. A good driver will play your chosen music and create a party atmosphere between venues. Consider a vintage bus or routemaster for a unique experience. For the bridal party, a separate luxury vehicle can be arranged alongside the guest minibus.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much is wedding minibus hire in ${loc}?`,
          answer: (loc) => `Wedding minibus hire in ${loc} costs £200-£400 for a ceremony-to-reception shuttle. Full-day packages with multiple journeys cost £400-£700.`,
        },
        {
          question: "When should I book wedding transport?",
          answer: () => "Book 6-12 months ahead, especially for summer Saturdays. Popular dates sell out quickly.",
        },
      ],
    },
  ],
  "skip-hire": [
    {
      slug: "cheap",
      name: "Cheap Skip Hire",
      h1: (loc) => `Cheap Skip Hire in ${loc}`,
      metaTitle: (loc) => `Cheap Skip Hire ${loc} | Compare Lowest Prices (2026)`,
      metaDescription: (loc) => `Find the cheapest skip hire in ${loc}. Compare prices for mini, midi and builders skips. Save money on waste removal.`,
      intro: (loc, region) => `Skip hire prices in ${loc} vary widely between companies, so comparing quotes can save you a significant amount. This page helps you find the cheapest skip hire options across ${region} and gives tips on getting the best deal.`,
      sections: [
        {
          heading: (loc) => `Cheapest Skip Hire Prices in ${loc}`,
          content: (loc) => `The cheapest skip hire option in ${loc} is a mini skip (2 yard), which typically costs £80-£120. Midi skips (4 yard) cost £120-£180. The most popular builders skip (6-8 yard) costs £180-£280. Prices include delivery, collection and disposal. Some companies in ${loc} offer same-day or next-day delivery at no extra cost. For the cheapest rates, book midweek and avoid bank holiday periods when demand is highest.`,
        },
        {
          heading: "How to Save Money on Skip Hire",
          content: () => `Choose the smallest skip that fits your waste — overpaying for a larger skip is the most common mistake. Share a skip with a neighbour if you both have small jobs. Some companies offer wait-and-load services where they bring the skip, you fill it while they wait, and they take it away — this avoids permit charges for road placement. Separate recyclable materials to reduce the amount of waste needing skip disposal. Get at least 3 quotes before booking.`,
        },
        {
          heading: "Hidden Costs to Watch For",
          content: (loc) => `When comparing cheap skip hire in ${loc}, check if the quoted price includes VAT (some advertise ex-VAT prices). Ask about overweight charges — if your skip is too heavy (common with soil, concrete and rubble), you may face a surcharge of £30-£80. Road permits cost £20-£50 extra if the skip cannot go on your driveway. Some companies charge extra for certain waste types like plasterboard, mattresses or tyres. Always confirm the total price before booking.`,
        },
      ],
      faq: [
        {
          question: (loc) => `What is the cheapest skip hire in ${loc}?`,
          answer: (loc) => `A mini skip (2 yard) in ${loc} starts from £80-£120. Builders skips (6-8 yard) cost £180-£280. Prices include delivery, collection and disposal.`,
        },
        {
          question: "How can I reduce my skip hire costs?",
          answer: () => "Choose the right size skip, book midweek, separate recyclables, and compare at least 3 quotes. A wait-and-load service avoids road permit fees.",
        },
      ],
    },
    {
      slug: "same-day",
      name: "Same Day Skip Hire",
      h1: (loc) => `Same Day Skip Hire in ${loc}`,
      metaTitle: (loc) => `Same Day Skip Hire ${loc} | Fast Delivery Today (2026)`,
      metaDescription: (loc) => `Need a skip today in ${loc}? Find same day skip hire companies with fast delivery. Mini, midi and builders skips available now.`,
      intro: (loc, region) => `Need a skip delivered today in ${loc}? Many local companies offer same-day or next-day delivery, perfect for urgent clearances, unexpected waste and time-sensitive projects. Here is how to get a skip fast across ${region}.`,
      sections: [
        {
          heading: (loc) => `Same Day Skip Delivery in ${loc}`,
          content: (loc) => `Several skip hire companies in ${loc} offer same-day delivery if you call before midday. Availability depends on the skip size and current demand. Mini and midi skips are most likely to be available for same-day delivery. Builders skips are usually available next day. For the best chance of same-day service, call early in the morning and be flexible on size. Some companies charge a small premium (£10-£20) for urgent delivery.`,
        },
        {
          heading: "When You Need a Skip Urgently",
          content: () => `Common reasons for needing a same-day skip include unexpected house clearances, emergency building repairs, fly-tipping clean-ups, and trade jobs that generate more waste than expected. If you cannot get a skip same-day, consider a wait-and-load service — the driver brings the skip, you fill it on the spot, and they take it away immediately. This is often faster than booking a standard skip and avoids needing a road permit.`,
        },
      ],
      faq: [
        {
          question: (loc) => `Can I get a skip delivered today in ${loc}?`,
          answer: (loc) => `Yes, many companies in ${loc} offer same-day delivery if you book before midday. Mini and midi skips have the best same-day availability.`,
        },
        {
          question: "Does same-day delivery cost more?",
          answer: () => "Some companies charge £10-£20 extra for same-day or urgent delivery. Many include it at no extra cost if availability allows.",
        },
      ],
    },
    {
      slug: "grab-hire",
      name: "Grab Hire",
      h1: (loc) => `Grab Hire in ${loc}`,
      metaTitle: (loc) => `Grab Hire ${loc} | Grab Lorry Prices & Companies (2026)`,
      metaDescription: (loc) => `Need grab hire in ${loc}? Compare grab lorry prices for soil, rubble and waste removal. Faster and often cheaper than a skip.`,
      intro: (loc, region) => `Grab hire is a fast, efficient alternative to skip hire for removing large quantities of soil, rubble, hardcore and green waste. A grab lorry uses a hydraulic arm to load waste directly from your site — no manual loading required. Compare grab hire companies across ${region}.`,
      sections: [
        {
          heading: (loc) => `Grab Hire Prices in ${loc}`,
          content: (loc) => `Grab hire in ${loc} typically costs £200-£350 per load, which is equivalent to 3-4 builders skips worth of material. A grab lorry can carry 12-16 tonnes per load. The price usually includes the lorry, driver and disposal. Compared to hiring multiple skips, a grab lorry is often cheaper and much faster — a full load takes 20-30 minutes to collect versus waiting days for skip swaps. Companies in ${loc} can usually attend within 1-2 days of booking.`,
        },
        {
          heading: "When to Choose Grab Hire Over a Skip",
          content: () => `Choose grab hire when you have a large amount of loose material like soil, rubble, sand or garden waste. It is ideal when you cannot place a skip on your property (the grab arm can reach over walls and fences). It is faster than a skip for big clearances — no waiting for the skip to be collected. It is also better for heavy materials that would make a skip overweight. The main limitation is that the grab lorry needs to park within reach of the waste, typically within 6 metres.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much does grab hire cost in ${loc}?`,
          answer: (loc) => `Grab hire in ${loc} costs £200-£350 per load (12-16 tonnes). This is often cheaper than hiring 3-4 builders skips for the same amount of material.`,
        },
        {
          question: "How close does the lorry need to be?",
          answer: () => "The grab arm reaches about 6 metres. The lorry needs to park on a road or hard surface within that distance of your waste.",
        },
      ],
    },
    {
      slug: "mini-skip",
      name: "Mini Skip Hire",
      h1: (loc) => `Mini Skip Hire in ${loc}`,
      metaTitle: (loc) => `Mini Skip Hire ${loc} | 2-3 Yard Skips, Prices & Delivery (2026)`,
      metaDescription: (loc) => `Need a mini skip in ${loc}? 2-3 yard skips perfect for small clearances. Compare prices and book delivery from local companies.`,
      intro: (loc, region) => `Mini skips are the most affordable and compact option for small clearance jobs. Perfect for bathroom refits, garden tidying and small DIY projects. Compare mini skip hire companies in ${loc} and across ${region}.`,
      sections: [
        {
          heading: (loc) => `Mini Skip Hire Prices in ${loc}`,
          content: (loc) => `Mini skip hire (2-3 yard) in ${loc} costs £80-£150 including delivery, collection and disposal. A 2 yard mini skip holds roughly 20-30 bin bags of waste. A 3 yard skip holds 30-40 bags. Hire periods are typically 7-14 days. Most companies in ${loc} offer next-day or even same-day delivery for mini skips as they are the most readily available size.`,
        },
        {
          heading: "What Fits in a Mini Skip?",
          content: () => `A 2-yard mini skip is ideal for: a small bathroom refit, a garden shed clearout, a few bags of rubble, or general household decluttering. A 3-yard skip handles: a small kitchen refit, a garage clearance, or a medium garden project. Mini skips are not suitable for heavy materials like soil and concrete in large quantities — the weight limit is usually 1-2 tonnes. If your waste is mostly heavy materials, ask for a midi or builders skip instead.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much is a mini skip in ${loc}?`,
          answer: (loc) => `Mini skip hire in ${loc} costs £80-£150 for a 2-3 yard skip. This includes delivery, a 7-14 day hire period and waste disposal.`,
        },
        {
          question: "How many bin bags fit in a mini skip?",
          answer: () => "A 2-yard mini skip holds about 20-30 bin bags. A 3-yard skip holds 30-40 bin bags.",
        },
      ],
    },
  ],
  "van-hire": [
    {
      slug: "cheap",
      name: "Cheap Van Hire",
      h1: (loc) => `Cheap Van Hire in ${loc}`,
      metaTitle: (loc) => `Cheap Van Hire ${loc} | Compare Lowest Prices (2026)`,
      metaDescription: (loc) => `Find the cheapest van hire in ${loc}. Compare daily and weekly rates for SWB, LWB and Luton vans from local companies.`,
      intro: (loc, region) => `Van hire prices in ${loc} vary significantly between companies. Comparing quotes is the easiest way to find a great deal. This page covers the cheapest van hire options across ${region} and how to save money on your next hire.`,
      sections: [
        {
          heading: (loc) => `Cheapest Van Hire Prices in ${loc}`,
          content: (loc) => `The cheapest van hire in ${loc} is a short wheelbase (SWB) van from £30-£50 per day. Long wheelbase (LWB) vans cost £40-£70 per day. Luton vans with tail lift cost £60-£100 per day. Weekly rates offer better value: expect to pay 4-5 times the daily rate for a full week. Most companies in ${loc} require a minimum age of 21-25, a full UK licence held for 2+ years, and a credit/debit card deposit of £100-£300.`,
        },
        {
          heading: "Tips for Getting the Cheapest Rate",
          content: () => `Book online rather than walking in — online-only rates are often 10-20% cheaper. Hire midweek when demand is lower. Book early for weekend hires, especially around month-end when house moves peak. Choose the right size — a smaller van is cheaper and easier to drive. Check mileage limits, as some cheap quotes include limited miles with excess charges of 15-25p per mile. Return with a full tank to avoid inflated fuel charges from the hire company.`,
        },
      ],
      faq: [
        {
          question: (loc) => `What is the cheapest van hire in ${loc}?`,
          answer: (loc) => `SWB vans in ${loc} start from £30-£50/day. Luton vans cost £60-£100/day. Weekly rates offer better value at 4-5x the daily rate.`,
        },
        {
          question: "What do I need to hire a van?",
          answer: () => "A full UK driving licence held for at least 2 years, proof of address, and a credit or debit card for the deposit (£100-£300).",
        },
      ],
    },
    {
      slug: "luton-van",
      name: "Luton Van Hire",
      h1: (loc) => `Luton Van Hire in ${loc}`,
      metaTitle: (loc) => `Luton Van Hire ${loc} | Prices & Companies With Tail Lift (2026)`,
      metaDescription: (loc) => `Hire a Luton van in ${loc}. Box body vans with tail lifts perfect for house moves. Compare prices and book from local companies.`,
      intro: (loc, region) => `The Luton van is the go-to vehicle for house moves, large deliveries and commercial transport. With a box body and optional tail lift, it can carry the contents of a 1-2 bedroom flat in a single trip. Compare Luton van hire companies in ${loc} and across ${region}.`,
      sections: [
        {
          heading: (loc) => `Luton Van Hire Prices in ${loc}`,
          content: (loc) => `Luton van hire in ${loc} typically costs £60-£100 per day, or £250-£400 per week. Vans with a tail lift cost £10-£20 more per day but make loading heavy furniture much easier. A standard Luton van has a load space of approximately 400 cubic feet (around 13 cubic metres) and can carry up to 1,000-1,200kg. Most hire companies in ${loc} include insurance, breakdown cover and VAT in the price.`,
        },
        {
          heading: "What Can You Fit in a Luton Van?",
          content: () => `A Luton van typically fits the contents of a 1-2 bedroom flat including a sofa, bed frame, mattress, wardrobe, washing machine and 20-30 boxes. For a 3-bedroom house, you will likely need two trips or a larger vehicle. The tail lift is essential for heavy items like washing machines, fridges and large furniture. Without a tail lift, you will need at least two people to load heavy items via the ramp. Always secure items with straps to prevent movement during transit.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much is Luton van hire in ${loc}?`,
          answer: (loc) => `Luton van hire in ${loc} costs £60-£100/day or £250-£400/week. Tail lift models cost £10-£20 more per day.`,
        },
        {
          question: "Do I need a special licence for a Luton van?",
          answer: () => "No, a standard category B car licence covers Luton vans up to 3.5 tonnes. You must be 21-25+ with a licence held for at least 2 years.",
        },
      ],
    },
  ],
  locksmith: [
    {
      slug: "emergency",
      name: "Emergency Locksmith",
      h1: (loc) => `Emergency Locksmith in ${loc}`,
      metaTitle: (loc) => `Emergency Locksmith ${loc} | 24/7 Lockout Service, Fast Response`,
      metaDescription: (loc) => `Locked out in ${loc}? Find 24/7 emergency locksmiths with fast response times. No call-out fees from many local locksmiths.`,
      intro: (loc, region) => `Locked out of your home, car or business in ${loc}? An emergency locksmith can get you back in quickly and safely. Local locksmiths across ${region} offer 24/7 call-out services with typical response times of 15-30 minutes.`,
      sections: [
        {
          heading: (loc) => `Emergency Locksmith Prices in ${loc}`,
          content: (loc) => `Emergency locksmith call-out charges in ${loc} typically range from £60-£120 for a standard door lock opening during daytime hours. Evening and weekend call-outs cost £80-£150. After midnight, expect to pay £100-£180. Most locksmiths in ${loc} charge a fixed price agreed before they start work — ask for a quote over the phone. Some charge a separate call-out fee (£30-£50) plus labour, while others give an all-inclusive price. Always confirm the total cost before agreeing to the work.`,
        },
        {
          heading: "What to Do If You Are Locked Out",
          content: () => `First, check all doors and windows — you may have left one open. Check if a neighbour has a spare key. If you need a locksmith, call a local company (not a national call centre, which adds a middleman fee). Ask for an all-inclusive price before they come out. A reputable locksmith will try non-destructive entry first, which means your lock may not need replacing. If the lock does need changing, they should fit a new one on the spot.`,
        },
        {
          heading: "How to Spot a Reliable Emergency Locksmith",
          content: (loc) => `Look for locksmiths in ${loc} with a physical local address, not just a mobile number. Check they have Google reviews with a rating of 4+ stars. Ask if they are members of a trade body like the MLA (Master Locksmiths Association). A genuine local locksmith will arrive in an unmarked or locally-branded van, not a generic white van with no signage. Be wary of locksmiths who quote very low prices on the phone and then inflate the bill on site.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much does an emergency locksmith cost in ${loc}?`,
          answer: (loc) => `Emergency locksmith call-outs in ${loc} cost £60-£120 during the day and £100-£180 at night. Get a fixed price quote over the phone before they attend.`,
        },
        {
          question: "How fast can an emergency locksmith get to me?",
          answer: () => "Most local locksmiths have a response time of 15-30 minutes. National call centres may take longer as they dispatch from further away.",
        },
        {
          question: "Will the locksmith damage my door?",
          answer: () => "A skilled locksmith will use non-destructive entry methods first. In most cases, your door and frame will be undamaged. If the lock needs replacing, they will fit a new one.",
        },
      ],
    },
    {
      slug: "24-hour",
      name: "24 Hour Locksmith",
      h1: (loc) => `24 Hour Locksmith in ${loc}`,
      metaTitle: (loc) => `24 Hour Locksmith ${loc} | Night & Weekend Service (2026)`,
      metaDescription: (loc) => `Need a locksmith at night or on a weekend in ${loc}? Find 24 hour locksmiths available right now. Fast response, fair prices.`,
      intro: (loc, region) => `Lock problems do not keep office hours. Whether you are locked out at 2am or need a lock changed on a Sunday, 24 hour locksmiths in ${loc} are available around the clock. Compare local locksmiths across ${region} who offer genuine 24/7 availability.`,
      sections: [
        {
          heading: "What 24 Hour Service Means",
          content: (loc) => `A genuine 24 hour locksmith in ${loc} answers their phone at all hours — not a voicemail or call centre. They carry a full range of locks and tools in their van so they can complete most jobs on the first visit, even at 3am. Night and weekend rates are typically 20-50% higher than daytime prices, but this is standard across the trade. Be cautious of companies that advertise 24/7 but actually route calls to an answering service.`,
        },
        {
          heading: "Common Night-Time Locksmith Jobs",
          content: () => `The most common overnight call-outs are home lockouts after lost keys on a night out, broken key in lock, burglary damage repairs and boarding up, snapped or jammed uPVC door mechanisms, and car lockouts. For burglary damage, your insurance company will usually cover the locksmith cost — ask for a receipt and crime reference number.`,
        },
      ],
      faq: [
        {
          question: (loc) => `Is there a 24 hour locksmith in ${loc}?`,
          answer: (loc) => `Yes, several locksmiths in ${loc} offer genuine 24/7 service including nights, weekends and bank holidays.`,
        },
        {
          question: "How much more does a night call-out cost?",
          answer: () => "Night and weekend rates are typically 20-50% more than daytime prices. Expect £100-£180 for a night-time lock opening.",
        },
      ],
    },
    {
      slug: "auto",
      name: "Auto Locksmith",
      h1: (loc) => `Auto Locksmith in ${loc}`,
      metaTitle: (loc) => `Auto Locksmith ${loc} | Car Lockout & Key Cutting (2026)`,
      metaDescription: (loc) => `Locked out of your car in ${loc}? Find auto locksmiths for car lockouts, key cutting and transponder programming. Fast mobile service.`,
      intro: (loc, region) => `Lost your car keys or locked them inside? An auto locksmith in ${loc} can open your vehicle without damage, cut new keys on the spot, and programme transponder chips and remote fobs. Mobile auto locksmiths across ${region} come to your location.`,
      sections: [
        {
          heading: (loc) => `Auto Locksmith Prices in ${loc}`,
          content: (loc) => `Auto locksmith prices in ${loc} vary by job type. A standard car lockout (non-destructive entry) costs £60-£100. Key cutting for a standard car key costs £80-£150. Transponder key programming costs £120-£250 depending on the vehicle make. Remote fob replacement costs £100-£200. Luxury and modern vehicles with keyless entry systems cost more. Most auto locksmiths in ${loc} offer a mobile service and come to your location — no towing required.`,
        },
        {
          heading: "What an Auto Locksmith Can Do",
          content: () => `Modern auto locksmiths can handle almost any vehicle lock problem. They open locked cars without damage using specialist tools. They cut new keys from the vehicle's lock code (no need for the original key). They programme transponder chips so the engine immobiliser recognises the new key. They replace remote fob batteries, repair broken fobs and programme new remotes. They also handle van, motorcycle and commercial vehicle locks.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much does an auto locksmith cost in ${loc}?`,
          answer: (loc) => `A car lockout in ${loc} costs £60-£100. New car key cutting costs £80-£150. Transponder programming costs £120-£250. Prices vary by vehicle make.`,
        },
        {
          question: "Can a locksmith make a car key without the original?",
          answer: () => "Yes. An auto locksmith can cut a new key from the vehicle's lock code and programme the transponder chip so it starts the engine.",
        },
      ],
    },
  ],
  "removal-companies": [
    {
      slug: "cheap",
      name: "Cheap Removals",
      h1: (loc) => `Cheap Removal Companies in ${loc}`,
      metaTitle: (loc) => `Cheap Removals ${loc} | Compare Lowest Moving Prices (2026)`,
      metaDescription: (loc) => `Find cheap removal companies in ${loc}. Compare prices for house moves, man & van and office relocations. Save on your move.`,
      intro: (loc, region) => `Moving house does not have to cost a fortune. By comparing removal companies in ${loc} you can find affordable movers without sacrificing reliability. Here are the cheapest options for moving across ${region}.`,
      sections: [
        {
          heading: (loc) => `Cheap Removal Prices in ${loc}`,
          content: (loc) => `The cheapest removal option in ${loc} is a man and van service, starting from £40-£60 per hour. A full house removal with a 2-man team and a large van costs £300-£600 for a local move (under 20 miles). Long-distance moves of 100+ miles cost £600-£1,500 depending on volume. The cheapest approach is often a man and van for a 1-bed flat, and a full removal team for larger properties. Companies in ${loc} usually offer free no-obligation surveys for accurate quotes.`,
        },
        {
          heading: "How to Save Money on Your Move",
          content: () => `Declutter before you move — the less you have, the less you pay. Pack boxes yourself instead of paying for a packing service. Be flexible on your moving date — midweek and mid-month moves are cheaper as demand is lower. Get at least 3 quotes and make sure they include VAT, insurance and any staircase or parking charges. Ask about backload services where your move shares a truck with another customer heading in the same direction.`,
        },
      ],
      faq: [
        {
          question: (loc) => `What is the cheapest way to move house in ${loc}?`,
          answer: (loc) => `A man and van in ${loc} starts from £40-£60/hour. Full house removals cost £300-£600 for local moves. Get 3+ quotes to compare.`,
        },
        {
          question: "Are cheap removal companies reliable?",
          answer: () => "Many affordable removal companies have excellent reviews. Check Google ratings, confirm insurance cover, and look for companies that have been trading for several years.",
        },
      ],
    },
    {
      slug: "man-and-van",
      name: "Man & Van",
      h1: (loc) => `Man and Van in ${loc}`,
      metaTitle: (loc) => `Man and Van ${loc} | Prices & Local Companies (2026)`,
      metaDescription: (loc) => `Need a man and van in ${loc}? Compare local companies for small moves, single items and student relocations. From £40/hour.`,
      intro: (loc, region) => `A man and van service is the quickest and most affordable way to move a small number of items in ${loc}. Ideal for student moves, single furniture items, eBay collections and small flat moves. Compare man and van companies across ${region}.`,
      sections: [
        {
          heading: (loc) => `Man and Van Prices in ${loc}`,
          content: (loc) => `Man and van services in ${loc} cost £40-£60 per hour for one man and a van, or £60-£80 per hour for two men and a van. Most jobs take 2-4 hours. A single large item (sofa, washing machine) with local delivery costs £40-£80 fixed price. A full 1-bed flat move takes 3-5 hours. Some companies in ${loc} offer fixed-price quotes for specific jobs rather than hourly rates, which can be better value for longer moves.`,
        },
        {
          heading: "When to Use a Man & Van vs Full Removals",
          content: () => `Man and van is best for: studio/1-bed flat moves, single item delivery, eBay/marketplace collections, student moves, and small office relocations. Choose a full removal company for: 2+ bedroom houses, long-distance moves, moves requiring packing services, and moves with valuable or fragile items needing professional handling. The crossover point is usually a 2-bed flat — get quotes for both options and compare.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much does a man and van cost in ${loc}?`,
          answer: (loc) => `Man and van in ${loc} costs £40-£60/hour for one man, or £60-£80/hour for two men. Most small moves take 2-4 hours.`,
        },
        {
          question: "Is man and van insured?",
          answer: () => "Reputable man and van operators carry goods-in-transit insurance. Always ask to confirm before booking, and check the cover limit is sufficient for your items.",
        },
      ],
    },
  ],
  "bouncy-castle-hire": [
    {
      slug: "cheap",
      name: "Cheap Bouncy Castle Hire",
      h1: (loc) => `Cheap Bouncy Castle Hire in ${loc}`,
      metaTitle: (loc) => `Cheap Bouncy Castle Hire ${loc} | Best Prices (2026)`,
      metaDescription: (loc) => `Find cheap bouncy castle hire in ${loc}. Compare prices for children's parties, events and family days out. From £60 per day.`,
      intro: (loc, region) => `Bouncy castle hire does not have to break the bank. By comparing local companies in ${loc} you can find great deals on bouncy castles, inflatables and soft play equipment for your next event across ${region}.`,
      sections: [
        {
          heading: (loc) => `Cheapest Bouncy Castle Hire in ${loc}`,
          content: (loc) => `The cheapest bouncy castles in ${loc} start from £50-£70 for a basic children's castle for a full day. Midweek hire is often £10-£20 cheaper than weekends. Off-peak months (October to March) offer the lowest prices. Combo bouncy castles with a slide are better value than hiring separately, typically £70-£100. Some companies in ${loc} offer discounts for returning customers, midweek bookings and multi-item hires. Always check that the price includes delivery, setup and collection.`,
        },
        {
          heading: "Getting the Best Deal",
          content: () => `Book early for summer weekends — prices go up closer to the date. Consider sharing with a neighbour and splitting the cost. Midweek parties are significantly cheaper. Ask about end-of-season sales in September when companies want to fill their calendars before winter. Some companies offer loyalty cards or referral discounts. For school fetes and community events, ask about charity rates.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much is the cheapest bouncy castle hire in ${loc}?`,
          answer: (loc) => `Basic bouncy castle hire in ${loc} starts from £50-£70 for a full day. Prices include delivery, setup and collection.`,
        },
        {
          question: "When is the cheapest time to hire a bouncy castle?",
          answer: () => "Midweek and off-peak months (October-March) are cheapest. Book early for summer weekends to get the best rates.",
        },
      ],
    },
    {
      slug: "disco-dome",
      name: "Disco Dome Hire",
      h1: (loc) => `Disco Dome Hire in ${loc}`,
      metaTitle: (loc) => `Disco Dome Hire ${loc} | Prices & Local Companies (2026)`,
      metaDescription: (loc) => `Hire a disco dome in ${loc}. Enclosed bouncy castles with lights, music and speakers. Perfect for parties and teen events.`,
      intro: (loc, region) => `A disco dome is a bouncy castle with a difference — an enclosed dome with built-in disco lights, speakers and Bluetooth connectivity for your own music. They are hugely popular for older children, teenagers and even adult parties. Compare disco dome hire in ${loc} and across ${region}.`,
      sections: [
        {
          heading: (loc) => `Disco Dome Hire Prices in ${loc}`,
          content: (loc) => `Disco dome hire in ${loc} typically costs £100-£170 for a full day. This is more than a standard bouncy castle because of the built-in sound and lighting equipment. The price includes delivery, setup, collection and a Bluetooth speaker so you can play your own playlists. Some companies in ${loc} also supply UV glow accessories, disco balls and fog machines for an extra £10-£30.`,
        },
        {
          heading: "What Makes a Disco Dome Special?",
          content: () => `Unlike a standard bouncy castle, a disco dome is fully enclosed with a roof, making it weather-resistant and suitable for daytime or evening parties. The interior features colour-changing LED lights, a mirror ball effect and built-in speakers. Children and teenagers love the nightclub atmosphere — they can bounce, dance and hang out. Disco domes are popular for birthday parties, school discos, Halloween events and bonfire night celebrations.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much does disco dome hire cost in ${loc}?`,
          answer: (loc) => `Disco dome hire in ${loc} costs £100-£170 for a full day including lights, speakers and Bluetooth connectivity.`,
        },
        {
          question: "Can disco domes be used at night?",
          answer: () => "Yes, disco domes are enclosed with a roof so the light effects work brilliantly after dark. They are ideal for evening parties.",
        },
      ],
    },
  ],
  "limo-hire": [
    {
      slug: "cheap",
      name: "Cheap Limo Hire",
      h1: (loc) => `Cheap Limo Hire in ${loc}`,
      metaTitle: (loc) => `Cheap Limo Hire ${loc} | Compare Lowest Prices (2026)`,
      metaDescription: (loc) => `Find cheap limo hire in ${loc}. Compare prices for stretch limos, Hummers and party buses. Affordable luxury for any occasion.`,
      intro: (loc, region) => `Limo hire can be more affordable than you think, especially when shared between a group. Compare prices from companies in ${loc} to find the best limo hire deals across ${region}.`,
      sections: [
        {
          heading: (loc) => `Cheapest Limo Hire Options in ${loc}`,
          content: (loc) => `The cheapest limo hire in ${loc} starts from £150-£250 for a 1-hour cruise in a standard stretch limo (8 seats). Split between 8 people, that is just £20-£30 each for a luxury experience. Midweek bookings are 20-30% cheaper than weekends. Hummer limos cost from £250-£400 for a 1-hour package. Party buses for 16+ guests offer the best per-person value at large group sizes. Companies in ${loc} often run seasonal promotions and early-bird discounts.`,
        },
        {
          heading: "How to Get the Best Limo Hire Price",
          content: () => `Book midweek for the cheapest rates. Share the cost across your group — limos seat 8-16 people so per-person costs are low. Look for package deals that include drinks and decorations. Book off-peak months (January-March) for the lowest prices. Ask about returning customer discounts. Some companies offer daytime rates that are cheaper than evening bookings. For proms, booking as a group of friends sharing one limo is much cheaper than individual cars.`,
        },
      ],
      faq: [
        {
          question: (loc) => `What is the cheapest limo hire in ${loc}?`,
          answer: (loc) => `Stretch limo hire in ${loc} starts from £150-£250 for 1 hour. Split 8 ways, that is £20-£30 per person.`,
        },
        {
          question: "Is limo hire cheaper midweek?",
          answer: () => "Yes, midweek limo hire is typically 20-30% cheaper than Friday and Saturday evening bookings.",
        },
      ],
    },
    {
      slug: "prom",
      name: "Prom Car Hire",
      h1: (loc) => `Prom Car & Limo Hire in ${loc}`,
      metaTitle: (loc) => `Prom Car Hire ${loc} | Limos, Supercars & Party Buses (2026)`,
      metaDescription: (loc) => `Make your prom entrance unforgettable in ${loc}. Compare prom car hire prices for limos, Hummers, supercars and party buses.`,
      intro: (loc, region) => `Your prom night deserves an entrance to remember. From stretch limos to Lamborghinis, there are amazing vehicle options for prom arrivals in ${loc}. Compare prom car hire companies across ${region} and book the ride of your life.`,
      sections: [
        {
          heading: (loc) => `Prom Car Hire Prices in ${loc}`,
          content: (loc) => `Prom car hire in ${loc} ranges from £150-£300 for a stretch limo (1-2 hour package) to £200-£500 for a supercar experience. Hummer limos cost £200-£400 for a prom package. Party buses for 16-30 guests cost £300-£600 and are excellent value when shared. Most prom packages in ${loc} include pickup from home, a scenic drive to the venue, red carpet drop-off and photo opportunities. Some include non-alcoholic fizz and glasses.`,
        },
        {
          heading: "Top Tips for Booking Prom Transport",
          content: () => `Book at least 3 months ahead — popular vehicles sell out fast for June and July prom dates. Coordinate with friends early to share costs and fill the vehicle. Confirm the exact pickup time and allow 30 minutes buffer. Check that the vehicle is licensed for the number of passengers. Ask about the route — a scenic drive adds to the experience. Make sure parents have the company's contact number for peace of mind.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much is prom car hire in ${loc}?`,
          answer: (loc) => `Prom car hire in ${loc} costs £150-£300 for a stretch limo or £200-£500 for a supercar. Split between friends, costs start from £20-£40 each.`,
        },
        {
          question: "How early should I book for prom?",
          answer: () => "At least 3 months ahead. June and July dates sell out fast, especially for popular vehicles like Hummer limos and supercars.",
        },
      ],
    },
  ],
  "plant-hire": [
    {
      slug: "cheap",
      name: "Cheap Plant Hire",
      h1: (loc) => `Cheap Plant Hire in ${loc}`,
      metaTitle: (loc) => `Cheap Plant Hire ${loc} | Compare Lowest Prices (2026)`,
      metaDescription: (loc) => `Find cheap plant hire in ${loc}. Compare prices for mini diggers, excavators and dumpers. Save on your construction project.`,
      intro: (loc, region) => `Plant hire costs can add up quickly on a project. Comparing prices from multiple companies in ${loc} is the best way to keep costs down without compromising on equipment quality. Here is how to find the cheapest plant hire across ${region}.`,
      sections: [
        {
          heading: (loc) => `Cheapest Plant Hire Prices in ${loc}`,
          content: (loc) => `The cheapest plant hire in ${loc} is a micro digger (under 1 tonne) from £70-£100 per day or £250-£400 per week. Mini diggers (1.5t) cost £100-£150/day. Plate compactors and small rollers cost £30-£60/day. Self-drive hire is cheaper than operated hire. Weekly rates offer the best value — typically 3-4x the daily rate for 7 days. Companies in ${loc} often discount longer hires further, with monthly rates at 2.5-3x the weekly rate.`,
        },
        {
          heading: "How to Save on Plant Hire",
          content: () => `Choose the smallest machine that can do the job — a micro digger is half the price of a 3-tonner. Book weekly rather than daily if your project will take more than 2-3 days. Self-drive saves the cost of an operator (£150-£250/day). Arrange your own transport if you have a suitable trailer. Plan your project carefully to minimise hire duration — have the site prepared before the machine arrives. Get 3+ quotes and mention competing prices.`,
        },
      ],
      faq: [
        {
          question: (loc) => `What is the cheapest plant hire in ${loc}?`,
          answer: (loc) => `Micro diggers in ${loc} start from £70-£100/day. Plate compactors cost £30-£60/day. Weekly rates offer 50-60% savings over daily hire.`,
        },
        {
          question: "Is self-drive or operated hire cheaper?",
          answer: () => "Self-drive is significantly cheaper — you save £150-£250/day on operator costs. But you need a CPCS or NPORS card for construction sites.",
        },
      ],
    },
    {
      slug: "mini-digger",
      name: "Mini Digger Hire",
      h1: (loc) => `Mini Digger Hire in ${loc}`,
      metaTitle: (loc) => `Mini Digger Hire ${loc} | Prices & Local Companies (2026)`,
      metaDescription: (loc) => `Hire a mini digger in ${loc}. Micro, 1.5t and 3t diggers for gardens, driveways and construction. Compare prices from local companies.`,
      intro: (loc, region) => `Mini diggers are the most popular hired plant equipment in the UK. Whether you are digging foundations, landscaping a garden or laying a driveway, there is a mini digger to suit your project. Compare mini digger hire companies in ${loc} and across ${region}.`,
      sections: [
        {
          heading: (loc) => `Mini Digger Hire Prices in ${loc}`,
          content: (loc) => `Mini digger hire prices in ${loc} depend on the machine size. A micro digger (0.8-1t) costs £70-£120/day — these fit through standard garden gates. A 1.5 tonne mini digger costs £100-£160/day and handles most domestic projects. A 3 tonne digger costs £140-£200/day for larger excavation work. Weekly hire offers better value: expect to pay 3-4x the daily rate. Delivery costs £50-£120 each way depending on distance. Companies in ${loc} usually offer free delivery within a set radius.`,
        },
        {
          heading: "Choosing the Right Size",
          content: () => `Micro diggers (under 1t) are perfect for tight access sites — they fit through 750mm wide gates and weigh under 1,000kg, so they are gentle on lawns. 1.5 tonne diggers are the sweet spot for most domestic work: driveways, extensions, ponds, and drainage. They dig to about 2.2m deep. 3 tonne diggers are more powerful and efficient for larger jobs but need wider access (1.5m+) and a solid surface to operate from. Always check the dig depth you need — micro diggers only reach about 1.5m.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much does mini digger hire cost in ${loc}?`,
          answer: (loc) => `Mini digger hire in ${loc} costs £70-£120/day for a micro digger, £100-£160/day for 1.5t, and £140-£200/day for 3t. Weekly rates offer better value.`,
        },
        {
          question: "Will a mini digger fit through my garden gate?",
          answer: () => "Micro diggers (under 1 tonne) are as narrow as 750mm and fit through most standard garden gates. 1.5t diggers need about 1 metre clearance.",
        },
      ],
    },
    {
      slug: "cherry-picker",
      name: "Cherry Picker Hire",
      h1: (loc) => `Cherry Picker Hire in ${loc}`,
      metaTitle: (loc) => `Cherry Picker Hire ${loc} | Prices & Access Platforms (2026)`,
      metaDescription: (loc) => `Hire a cherry picker in ${loc}. Compare prices for boom lifts, scissor lifts and truck-mounted platforms for working at height.`,
      intro: (loc, region) => `Cherry pickers and access platforms are essential for safe working at height. From painting and guttering to tree surgery and building maintenance, there is an access platform to suit every job. Compare cherry picker hire companies in ${loc} and across ${region}.`,
      sections: [
        {
          heading: (loc) => `Cherry Picker Hire Prices in ${loc}`,
          content: (loc) => `Cherry picker hire in ${loc} starts from £80-£150/day for a trailer-mounted platform (12m reach). Self-propelled boom lifts cost £150-£300/day for 15-20m working height. Scissor lifts for indoor work cost £80-£180/day. Truck-mounted cherry pickers with 20-40m reach cost £250-£600/day. Weekly hire offers better value at 3-4x the daily rate. Most companies in ${loc} offer operated hire (driver included) for an additional £150-£250/day.`,
        },
        {
          heading: "Choosing the Right Access Platform",
          content: () => `Consider the working height you need, the ground conditions, and whether you are working indoors or outdoors. Scissor lifts are stable and spacious for indoor work like warehouse maintenance. Boom lifts reach over obstacles and are ideal for construction, tree work and building facades. Trailer-mounted cherry pickers are easy to tow and perfect for occasional domestic use. For very tall buildings or trees, a truck-mounted platform provides the greatest reach with self-contained power.`,
        },
      ],
      faq: [
        {
          question: (loc) => `How much does cherry picker hire cost in ${loc}?`,
          answer: (loc) => `Cherry picker hire in ${loc} costs £80-£150/day for trailer-mounted, £150-£300/day for boom lifts, and £250-£600/day for truck-mounted platforms.`,
        },
        {
          question: "Do I need a licence to use a cherry picker?",
          answer: () => "On construction sites, you need an IPAF licence. For domestic use, the hire company should provide a full induction. Always wear a harness attached to the platform anchor point.",
        },
      ],
    },
  ],
};

export function getServicePages(productId: ProductId): ServicePage[] {
  return SERVICE_PAGES[productId] || [];
}

export function getServicePage(productId: ProductId, serviceSlug: string): ServicePage | null {
  const pages = SERVICE_PAGES[productId] || [];
  return pages.find((p) => p.slug === serviceSlug) || null;
}

export function getAllServiceSlugs(): { product: string; service: string }[] {
  const slugs: { product: string; service: string }[] = [];
  for (const [productId, pages] of Object.entries(SERVICE_PAGES)) {
    if (!pages) continue;
    for (const page of pages) {
      slugs.push({ product: productId, service: page.slug });
    }
  }
  return slugs;
}
