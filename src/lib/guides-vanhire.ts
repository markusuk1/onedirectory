import type { Guide } from "./guides";
import { getGuideRegion, type GuideRegion } from "./guide-regions";

function generate(r: GuideRegion): Guide[] {
  return [
    {
      slug: `luton-van-hire-${r.slug}`,
      title: `Luton Van Hire ${r.mainCity}`,
      metaTitle: `Luton Van Hire ${r.mainCity} | Prices, Sizes & Top Companies (2026)`,
      metaDescription: `Find the best Luton van hire in ${r.mainCity} and ${r.theName}. Compare prices, check availability and book from trusted local van hire companies.`,
      h1: `Luton Van Hire in ${r.mainCity} & ${r.theName}`,
      intro: `Moving house or shifting a large load in ${r.mainCity}? A Luton van is the go-to choice for house moves, furniture deliveries and bulky items. We list trusted van hire companies across ${r.theName} so you can compare prices and book with confidence.`,
      sections: [
        {
          heading: "What Is a Luton Van?",
          content: `A Luton van is a large box-body vehicle with an enclosed cargo area that sits over the cab, giving extra loading space. They typically offer 12-15 cubic metres of cargo space, enough for the contents of a 1-2 bedroom flat. Most Luton vans come with a tail lift for easy loading of heavy items like washing machines, sofas and wardrobes. They can be driven on a standard UK car licence (Category B) as long as the gross vehicle weight is under 3.5 tonnes.`,
        },
        {
          heading: `How Much Does Luton Van Hire Cost in ${r.mainCity}?`,
          content: `Luton van hire prices in ${r.mainCity} typically start from around £60-£90 per day for a standard Luton without a tail lift. With a tail lift, expect to pay £80-£120 per day. Weekend rates can be slightly higher, and many companies offer reduced rates for multi-day hires. A typical weekend hire (Friday to Monday) costs £150-£250. Most companies require a deposit of £100-£250, refundable on return of the vehicle in good condition. Fuel is usually your responsibility, and the van should be returned with the same fuel level.`,
        },
        {
          heading: "When to Hire a Luton Van",
          content: `Luton vans are ideal for house moves (1-2 bedroom flats and small houses), large furniture deliveries or collections, office moves and equipment transport, clearing house contents for probate or downsizing, and picking up large items bought online or from retailers. For larger houses (3+ bedrooms), you may need multiple trips or a larger vehicle. Some companies in ${r.theName} offer Luton vans with drivers if you prefer not to drive yourself.`,
        },
        {
          heading: "Choosing the Right Van Hire Company",
          content: `When comparing Luton van hire in ${r.areas}, check the company's Google reviews and ratings, confirm what is included in the price (mileage, insurance excess, tail lift), ask about their breakdown cover policy, check the age and condition of their fleet, and understand the fuel policy (full-to-full is fairest). All operators listed on our directory have been verified with up-to-date contact details and genuine customer reviews.`,
        },
        {
          heading: "Tips for Loading a Luton Van",
          content: `To make the most of your Luton van hire, load heavy items first and distribute weight evenly across the floor. Use the tail lift for anything over 20kg. Wrap furniture in blankets or moving pads to prevent damage. Stack boxes to the ceiling where safe, and use ratchet straps to secure the load. Leave mattresses until last as they can go on top. Most Luton vans have internal tie-down points for securing items during transit.`,
        },
      ],
      faq: [
        {
          question: "Do I need a special licence to drive a Luton van?",
          answer: "No, most Luton vans can be driven on a standard UK car licence (Category B) as long as the gross vehicle weight does not exceed 3.5 tonnes. This covers the vast majority of rental Luton vans. If you passed your test before January 1997, you can also drive vehicles up to 7.5 tonnes.",
        },
        {
          question: "How big is a Luton van inside?",
          answer: "A standard Luton van has a cargo area of approximately 4m long x 2m wide x 2m high, giving around 12-15 cubic metres of space. This is enough for the contents of a 1-2 bedroom flat, including furniture, boxes and appliances.",
        },
        {
          question: "Can I hire a Luton van with a driver?",
          answer: `Yes, several van hire companies in ${r.theName} offer Luton vans with drivers. This is a popular option for house moves as the driver can also help with loading and unloading. Expect to pay around £200-£400 for a half-day man-and-van service with a Luton.`,
        },
        {
          question: "What happens if the van breaks down?",
          answer: "All reputable hire companies include breakdown cover. If the van breaks down, call the hire company first as they will arrange recovery or a replacement vehicle. Keep the company's emergency number saved in your phone before you set off.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `luton van hire ${r.mainCity.toLowerCase()}`,
        `luton van rental ${r.name.toLowerCase()}`,
        `van hire with tail lift ${r.mainCity.toLowerCase()}`,
        `moving van hire ${r.name.toLowerCase()}`,
        `cheap luton van hire`,
      ],
      product: "van-hire",
    },
    {
      slug: `self-drive-van-hire-${r.slug}`,
      title: `Self-Drive Van Hire ${r.name}`,
      metaTitle: `Self-Drive Van Hire ${r.name} | Compare Local Companies (2026)`,
      metaDescription: `Compare self-drive van hire in ${r.theName}. SWB, LWB and Luton vans available from trusted local companies across ${r.areas}.`,
      h1: `Self-Drive Van Hire in ${r.theName}`,
      intro: `Need a van for a few hours or a few days? Self-drive van hire gives you the flexibility to move at your own pace without paying for a driver. We list van hire companies across ${r.areas} so you can find the right vehicle at the right price.`,
      sections: [
        {
          heading: "What Is Self-Drive Van Hire?",
          content: `Self-drive van hire means you collect the van from the hire company, drive it yourself for the agreed period, and return it when you are done. It is the most affordable way to hire a van as you are not paying for a driver. You will need a valid UK driving licence, and most companies require you to be at least 21 years old (some require 25 for larger vehicles). Self-drive hire is available across ${r.theName} with same-day collection from many operators.`,
        },
        {
          heading: "Choosing the Right Van Size",
          content: `Short wheelbase (SWB) vans are best for small moves, single items and local deliveries. They are easy to park and manoeuvre. Long wheelbase (LWB) vans offer more cargo space and are ideal for larger loads, multi-room moves and commercial deliveries. Luton vans are the largest option on a standard licence, perfect for house moves and bulky items. If you are unsure which size you need, most hire companies in ${r.theName} are happy to advise based on what you need to move.`,
        },
        {
          heading: `Self-Drive Van Hire Prices in ${r.theName}`,
          content: `SWB vans start from around £30-£50 per day. LWB vans typically cost £45-£70 per day. Luton vans range from £60-£120 per day depending on whether they have a tail lift. Many companies offer half-day rates for shorter hires, and discounted weekly rates if you need the van for longer. Weekend rates (Friday to Monday) are popular and usually work out cheaper per day than single-day hire.`,
        },
        {
          heading: "Insurance and Deposits",
          content: `All self-drive hire includes basic insurance, but the excess (the amount you pay if there is damage) varies between companies. Standard excess is typically £500-£1,000. Many companies offer excess reduction cover for an extra £10-£20 per day, bringing the excess down to £100-£250. A refundable deposit is usually taken on collection, either by card pre-authorisation or cash. This is returned when the van comes back undamaged and with the correct fuel level.`,
        },
        {
          heading: "What to Check Before Driving Away",
          content: `Before you leave the hire yard, walk around the van and photograph any existing damage. Check the fuel level matches what is noted on your agreement. Adjust mirrors and seat position. Make sure you know how to operate the tail lift if fitted. Save the hire company's phone number in case of breakdown. Check the return time and fuel policy. Most companies operate a full-to-full fuel policy, meaning you collect and return the van with a full tank.`,
        },
      ],
      faq: [
        {
          question: "How old do I need to be to hire a van?",
          answer: "Most van hire companies require you to be at least 21 years old with a full UK driving licence held for at least one year. Some companies require you to be 25 for larger vehicles like Luton vans. Check with the individual company before booking.",
        },
        {
          question: "Is there a mileage limit?",
          answer: "This varies by company. Some include unlimited mileage, others include a set number of miles per day (typically 100-200) with a per-mile charge for extras. Always check before booking, especially for long-distance moves.",
        },
        {
          question: "Can I hire a van for just a few hours?",
          answer: `Yes, many van hire companies in ${r.theName} offer half-day rates (typically 4-5 hours). This is often enough for a local move or furniture collection and works out cheaper than a full day.`,
        },
        {
          question: "What if I return the van late?",
          answer: "Late returns are usually charged at an hourly or half-day rate on top of your booking. If you think you will be late, call the company as soon as possible. Some are flexible, while others have strict return windows. It is better to book extra time upfront than to risk late fees.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `self drive van hire ${r.name.toLowerCase()}`,
        `van hire ${r.mainCity.toLowerCase()}`,
        `cheap van hire ${r.name.toLowerCase()}`,
        `van rental ${r.mainCity.toLowerCase()}`,
        `hire a van ${r.name.toLowerCase()}`,
      ],
      product: "van-hire",
    },
    {
      slug: `tipper-van-hire-${r.slug}`,
      title: `Tipper & Trade Van Hire ${r.name}`,
      metaTitle: `Tipper Van Hire ${r.name} | Trade & Construction Van Rental (2026)`,
      metaDescription: `Find tipper van hire and trade vehicle rental in ${r.theName}. Compare prices from local companies across ${r.areas}.`,
      h1: `Tipper & Trade Van Hire in ${r.theName}`,
      intro: `Whether you are a builder, landscaper or tradesperson, having the right van makes all the difference. Tipper vans are essential for shifting soil, rubble, green waste and building materials. We list specialist trade van hire companies across ${r.theName} so you can find a reliable vehicle for your next job.`,
      sections: [
        {
          heading: "What Is a Tipper Van?",
          content: `A tipper van has a hydraulic tipping body that lifts and tilts the cargo bed, allowing you to dump loose materials quickly without manual unloading. They are available in single-cab and crew-cab configurations, with payloads typically ranging from 1 to 3.5 tonnes. Most tipper vans can be driven on a standard car licence. They are the workhorse vehicle for construction sites, landscaping jobs, farm work and waste clearance across ${r.theName}.`,
        },
        {
          heading: `Tipper Van Hire Prices in ${r.theName}`,
          content: `Tipper van hire prices in ${r.theName} typically start from £70-£100 per day for a standard 3.5-tonne tipper. Crew-cab tippers (with rear seats for a team) cost slightly more at £80-£120 per day. Weekly rates are usually available at £300-£500, offering better value for longer projects. Some hire companies also offer trade accounts with discounted rates for regular hirers. Most prices include basic insurance and breakdown cover.`,
        },
        {
          heading: "Popular Uses for Tipper Vans",
          content: `Tipper vans are commonly used for removing soil, rubble and demolition waste from building sites, delivering aggregates and building materials, garden clearances and landscaping projects, collecting green waste and tree cuttings, farm and agricultural work, and general waste removal where a skip is not practical. The tipping mechanism saves significant time compared to manually unloading a standard van.`,
        },
        {
          heading: "Other Trade Vehicles Available",
          content: `Beyond tipper vans, trade vehicle hire in ${r.theName} includes flatbed trucks for oversized loads and machinery, dropside vans for easy side-loading of materials, refrigerated vans for food and catering businesses, and pickup trucks for lighter trade work. Many companies also hire out specialist equipment like roof racks, tow bars and load securing equipment alongside the vehicle.`,
        },
        {
          heading: "Choosing a Trade Van Hire Company",
          content: `Look for companies that specialise in trade and commercial vehicle hire. They tend to have newer, better-maintained vehicles and understand the needs of tradespeople. Check that the company offers breakdown assistance, flexible collection and return times (early morning starts are common on building sites), and whether they deliver and collect vehicles to site. Operators listed in our directory serve ${r.areas} with verified details and real reviews.`,
        },
      ],
      faq: [
        {
          question: "Do I need a special licence for a tipper van?",
          answer: "Most tipper vans up to 3.5 tonnes gross vehicle weight can be driven on a standard UK car licence (Category B). Larger tippers may require a Category C1 or C licence. Check the vehicle weight before booking.",
        },
        {
          question: "Can I use a tipper van to take waste to the tip?",
          answer: `Yes, tipper vans are ideal for tip runs. However, check with your local council in ${r.theName} as some tips require advance booking for commercial-type vehicles. If you are using the van for trade waste, you may need a waste carrier licence.`,
        },
        {
          question: "Are tipper vans available for weekend hire?",
          answer: `Yes, most van hire companies in ${r.theName} offer weekend hire, typically from Friday afternoon to Monday morning. Weekend rates are often competitive and popular with tradespeople doing private weekend jobs or DIY projects.`,
        },
        {
          question: "What payload can a tipper van carry?",
          answer: "A standard 3.5-tonne tipper van has a payload of approximately 1,000-1,200kg. This is enough for around half a cubic metre of soil or rubble, or a full load of green waste. Do not exceed the vehicle's stated payload as it is both dangerous and illegal.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `tipper van hire ${r.name.toLowerCase()}`,
        `trade van hire ${r.mainCity.toLowerCase()}`,
        `builders van hire ${r.name.toLowerCase()}`,
        `tipper rental ${r.mainCity.toLowerCase()}`,
        `commercial van hire ${r.name.toLowerCase()}`,
      ],
      product: "van-hire",
    },
    {
      slug: `van-hire-costs-${r.slug}`,
      title: `Van Hire Costs ${r.mainCity}`,
      metaTitle: `Van Hire Prices ${r.mainCity} | How Much Does Van Hire Cost? (2026)`,
      metaDescription: `How much does van hire cost in ${r.mainCity}? Daily rates by van size, what affects the price, and how to get the best deal in ${r.theName}.`,
      h1: `Van Hire Costs in ${r.mainCity} & ${r.theName}`,
      intro: `Van hire prices vary significantly depending on the size of van, hire duration, and whether you need a driver. This guide breaks down typical van hire costs across ${r.theName} so you know what to expect before you book.`,
      sections: [
        {
          heading: `How Much Does Van Hire Cost in ${r.theName}?`,
          content: `Daily van hire rates in ${r.theName} typically range from £30-£120 depending on the vehicle size. A small panel van (SWB) costs £30-£50 per day. A medium van (LWB) costs £40-£65 per day. A large Luton van with tail lift costs £60-£120 per day. These are self-drive rates from local hire companies. National chains are often more expensive than independent local operators. Weekend rates (Friday to Monday) are commonly offered at a slight discount per day. Weekly hire rates offer the best value, typically costing 4-5 times the daily rate rather than 7 times.`,
        },
        {
          heading: "What Affects the Price?",
          content: `Several factors influence van hire costs. Vehicle size is the biggest factor, with Luton vans costing roughly double a small panel van. Hire duration matters because daily rates drop significantly for weekly or monthly bookings. Mileage limits vary between companies. Some include unlimited mileage while others cap it at 100-200 miles per day and charge 15-30p per extra mile. Insurance excess is another consideration. Standard excess is typically £500-£1,000 but you can pay an additional £5-£15 per day for excess reduction. Season affects prices too, with summer and end-of-month being peak times when prices rise. Self-drive is cheaper than hiring with a driver, which typically adds £80-£150 per day.`,
        },
        {
          heading: "How to Get the Best Price",
          content: `Book in advance. Last-minute van hire is almost always more expensive, especially on Fridays and at month end. Compare quotes from at least three local companies in ${r.theName} as prices vary significantly between operators. Consider the total cost, not just the daily rate. A company offering £40 per day with 100 free miles might cost more than one charging £55 with unlimited mileage if you are covering long distances. Book midweek if possible. Tuesday to Thursday is typically the cheapest period. Ask about one-way hire if you are moving long distance, as returning the van to a different depot can save on fuel and time. Check whether fuel policy is full-to-full or full-to-empty, as full-to-empty policies cost you more.`,
        },
        {
          heading: "What Is Included in the Price?",
          content: `A standard van hire price in ${r.theName} typically includes the vehicle, basic insurance (CDW with excess), road tax, and breakdown cover. Most companies provide the van with a full tank and expect it back full. Items not usually included are additional driver fees (£5-£15 per day per driver), sat nav rental (£5-£10 per day), excess reduction cover, and fuel. Some companies charge a refundable security deposit of £100-£500 which is held on your card. Young driver surcharges apply for drivers aged 21-24 at most hire companies, typically adding £10-£25 per day.`,
        },
        {
          heading: "Hidden Costs to Watch Out For",
          content: `The most common unexpected charges on van hire are mileage overages, late return fees, and cleaning charges. Mileage overages are charged at 15-30p per mile over the included limit and can add up fast on a long move. Late return fees are steep, typically a full extra day if you are more than 30-60 minutes late. Cleaning charges of £25-£75 apply if the van is returned dirty or with debris in the load area. Damage charges can be significant even for minor scrapes, especially if you did not take excess reduction cover. Always photograph the van at collection and return. Check the fuel gauge and note the reading. Read the terms and conditions, particularly around out-of-hours return and one-way drop-off fees.`,
        },
      ],
      faq: [
        {
          question: "How much does a Luton van cost to hire per day?",
          answer: `A Luton van with tail lift in ${r.theName} typically costs £60-£120 per day for self-drive hire. Prices are lower midweek and for longer bookings. A Luton without tail lift is usually £10-£20 cheaper per day.`,
        },
        {
          question: "Is it cheaper to hire a van for a week?",
          answer: "Yes, significantly. Weekly rates are usually 4-5 times the daily rate, so you save 30-40% compared to paying the daily rate for 7 days. If your move might take 2-3 days, a weekly rate may work out cheaper than 3 separate daily hires.",
        },
        {
          question: "Do I need my own insurance for van hire?",
          answer: "Basic insurance (collision damage waiver) is included in the hire price, but it comes with an excess of £500-£1,000. You can buy excess reduction cover from the hire company for £5-£15 per day, or arrange your own standalone excess policy online for around £3-£5 per day which is usually cheaper.",
        },
        {
          question: "Are there extra charges for young drivers?",
          answer: "Yes, most van hire companies charge a young driver surcharge for drivers aged 21-24, typically £10-£25 per day. Some companies have a minimum age of 25 for larger vans like Lutons. Drivers under 21 are rarely accepted for van hire.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `van hire prices ${r.mainCity.toLowerCase()}`,
        `van hire cost ${r.name.toLowerCase()}`,
        `how much van hire ${r.mainCity.toLowerCase()}`,
        `cheap van hire ${r.name.toLowerCase()}`,
        `van hire rates ${r.name.toLowerCase()}`,
      ],
      product: "van-hire",
    },
  ];
}

export function getVanHireGuides(): Guide[] {
  const region = getGuideRegion();
  if (!region) return [];
  return generate(region);
}
