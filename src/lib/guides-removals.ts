import type { Guide } from "./guides";
import { getGuideRegion, type GuideRegion } from "./guide-regions";

function generate(r: GuideRegion): Guide[] {
  return [
    {
      slug: `house-removals-guide-${r.slug}`,
      title: `House Removals ${r.mainCity}`,
      metaTitle: `House Removals ${r.mainCity} | Costs, Tips & Top Companies (2026)`,
      metaDescription: `Planning a house move in ${r.mainCity}? Compare removal companies, get cost estimates, and find out how to make your move as smooth as possible.`,
      h1: `House Removals Guide for ${r.mainCity} & ${r.theName}`,
      intro: `Moving house is one of the most stressful events in life, but choosing the right removal company makes a huge difference. This guide covers everything you need to know about house removals in ${r.theName}, including typical costs, what to look for in a mover, and how to prepare for moving day.`,
      sections: [
        ...(r.insights?.removals ? [{
          heading: `Removals in ${r.theName}: Local Market Insights`,
          content: r.insights.removals,
        }] : []),
        {
          heading: `How Much Do House Removals Cost in ${r.theName}?`,
          content: `The cost of a house move in ${r.theName} depends on the size of your property, the distance you are moving, and the services you need. A one-bedroom flat move within the same city typically costs £300-£500. A two to three bedroom house move locally costs £500-£900. Larger properties with four or more bedrooms usually cost £800-£1,500 for a local move. Long-distance moves across the UK add significantly to the cost. Most removal companies in ${r.areas} offer free surveys and quotes, so always get at least three estimates before booking.`,
        },
        {
          heading: "What to Look for in a Removal Company",
          content: `When choosing a removal company in ${r.theName}, check that they have valid goods-in-transit insurance to cover your belongings during the move. Look for membership of a trade body such as the British Association of Removers (BAR), which requires members to meet quality standards and offer a dispute resolution service. Read Google reviews and look for companies with a strong track record of careful handling and punctuality. Ask whether the price includes VAT and whether there are any extra charges for stairs, long carries, or parking difficulties.`,
        },
        {
          heading: "How to Prepare for Moving Day",
          content: `Good preparation makes moving day much smoother. Start packing non-essential items at least two weeks before your move. Label every box with its contents and the room it belongs in. Keep valuables, important documents and essentials like phone chargers and medications in a separate bag that stays with you. Defrost your fridge-freezer 24 hours before the move. Arrange parking for the removal van at both ends. Let your removal company know about any access issues such as narrow streets, permit parking, or items that need to go up or down stairs.`,
        },
        {
          heading: "Packing Tips for a Safe Move",
          content: `Use strong, double-walled boxes for heavy items like books and crockery. Wrap fragile items individually in packing paper or bubble wrap. Do not overload boxes, and fill any gaps with packing paper to stop items shifting. Use wardrobe boxes for clothes on hangers. Tape boxes securely and write FRAGILE on boxes with breakable items. If you do not want to pack yourself, most removal companies in ${r.theName} offer a full or partial packing service, which saves time and means your belongings are packed by experienced handlers.`,
        },
        {
          heading: "Man & Van vs Full Removals",
          content: `For smaller moves, a man and van service can be a more affordable option. A man with a van in ${r.theName} typically charges £40-£70 per hour, making it cost-effective for studio flats, single items, or student moves. However, for a full house move, a professional removal team with a larger vehicle is usually better value. They bring the right equipment, have experience handling furniture and fragile items, and can complete the job much faster. Most full removal companies also carry goods-in-transit insurance as standard.`,
        },
      ],
      faq: [
        {
          question: `How far in advance should I book a removal company in ${r.theName}?`,
          answer: `For peak times like school holidays, summer, and end-of-month dates, book at least four to six weeks ahead. For off-peak mid-week moves, two to three weeks is usually sufficient. If you are flexible on dates, removal companies in ${r.theName} often offer better rates for mid-week moves.`,
        },
        {
          question: "What is a pre-move survey?",
          answer: "A pre-move survey is when a removal company visits your home (or does a video call) to assess the volume of belongings, identify any access issues, and provide an accurate quote. Reputable companies offer this free of charge. It helps avoid surprises on moving day and means the company sends the right size vehicle and enough staff.",
        },
        {
          question: "Are my belongings insured during the move?",
          answer: "Professional removal companies carry goods-in-transit insurance that covers your belongings while they are being transported. Check the level of cover included in your quote, as basic cover may not be enough for high-value items. You can usually pay for extended cover. Man and van services may not carry insurance, so always ask before booking.",
        },
        {
          question: "Can I move plants and pets?",
          answer: "Most removal companies will not transport live plants or pets in the removal van. Plants can be damaged by temperature changes and movement, and pets need proper ventilation and care during transit. Arrange to transport plants and pets in your own car, or ask a friend or family member to help.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `house removals ${r.mainCity.toLowerCase()}`,
        `removal companies ${r.mainCity.toLowerCase()}`,
        `moving companies ${r.name.toLowerCase()}`,
        `house move cost ${r.mainCity.toLowerCase()}`,
        `best removal companies ${r.name.toLowerCase()}`,
      ],
      product: "removal-companies",
    },
    {
      slug: `man-and-van-${r.slug}`,
      title: `Man and Van ${r.mainCity}`,
      metaTitle: `Man and Van ${r.mainCity} | Prices, Tips & Trusted Providers (2026)`,
      metaDescription: `Need a man and van in ${r.mainCity}? Compare local providers, check prices, and find out when a man and van is the right choice for your move.`,
      h1: `Man and Van Services in ${r.mainCity} & ${r.theName}`,
      intro: `A man and van service is an affordable, flexible option for smaller moves, single-item deliveries, and student relocations in ${r.theName}. This guide explains what to expect, how much it costs, and how to find a reliable provider.`,
      sections: [
        {
          heading: `Man and Van Prices in ${r.theName}`,
          content: `Man and van services in ${r.theName} typically charge by the hour. Expect to pay £40-£60 per hour for a single man with a van, or £60-£90 per hour for two men with a van. Most jobs require a minimum booking of two hours. A small flat move within the same city usually takes three to four hours, costing £120-£240. Some providers offer a fixed price for specific jobs, which can be better value for longer distance moves. Always confirm whether the quote includes VAT and fuel costs.`,
        },
        {
          heading: "When to Use a Man and Van",
          content: `A man and van is ideal for studio or one-bedroom flat moves, student moves to or from university, delivering large items like sofas, beds or appliances, eBay or marketplace collections, small office moves with just a few desks, and taking items to storage. For a full house move with three or more bedrooms, a professional removal company with a larger vehicle and more staff is usually more efficient and better value.`,
        },
        {
          heading: "How to Find a Reliable Man and Van",
          content: `Check Google reviews and look for providers with a consistent record of good service. Ask whether they have goods-in-transit insurance, as not all man and van operators do. Confirm the size of the van before booking to make sure your items will fit. A standard transit van holds roughly the contents of a studio or one-bedroom flat. For larger loads, you may need a Luton van or two trips. Get a quote in advance rather than agreeing to an hourly rate on the day, as this avoids disputes about how long the job took.`,
        },
        {
          heading: "Preparing for Your Man and Van Booking",
          content: `Pack everything before the van arrives to make the best use of time. Disassemble any furniture that can be taken apart, keeping screws and fittings in labelled bags. Have everything ready by the front door or in the hallway. Clear a parking space as close to your property as possible. If you live in a flat, check whether you need to book the lift. The better prepared you are, the fewer hours the job takes and the less it costs.`,
        },
      ],
      faq: [
        {
          question: "How much can a man and van carry?",
          answer: "A standard transit-size van can hold the contents of a studio or small one-bedroom flat, roughly 10-12 cubic metres. A Luton van is larger and can handle a one to two bedroom property. If you are unsure, send photos of your items to the provider for an estimate.",
        },
        {
          question: "Do man and van services help with loading?",
          answer: "Most man and van services include loading and unloading as part of the hourly rate. Some solo operators may need help with heavy items like washing machines or large wardrobes. If you have heavy or bulky items, book a two-man service to make the job safer and faster.",
        },
        {
          question: "Is a man and van insured?",
          answer: `Not all man and van operators carry goods-in-transit insurance. Always ask before booking. If they do not have insurance, your belongings will not be covered if they are damaged during transport. Providers listed in our directory across ${r.theName} include verified local operators.`,
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `man and van ${r.mainCity.toLowerCase()}`,
        `man with van ${r.mainCity.toLowerCase()}`,
        `man and van prices ${r.name.toLowerCase()}`,
        `cheap man and van ${r.mainCity.toLowerCase()}`,
        `man and van near me ${r.name.toLowerCase()}`,
      ],
      product: "removal-companies",
    },
    {
      slug: `office-removals-${r.slug}`,
      title: `Office Removals ${r.mainCity}`,
      metaTitle: `Office Removals ${r.mainCity} | Business Relocation Guide (2026)`,
      metaDescription: `Relocating your office in ${r.mainCity}? Find out how to plan a smooth office move, what it costs, and which removal companies specialise in business relocations.`,
      h1: `Office Removals & Business Relocation in ${r.mainCity}`,
      intro: `Relocating an office requires careful planning to minimise downtime and disruption. This guide covers how to plan an office move in ${r.theName}, what specialist services are available, and how to keep your business running throughout the process.`,
      sections: [
        {
          heading: `Office Removal Costs in ${r.theName}`,
          content: `Office removal costs in ${r.theName} depend on the size of the office, the volume of equipment and furniture, and the distance of the move. A small office with five to ten desks moving locally typically costs £1,000-£2,500. A medium office with 20-50 workstations costs £3,000-£8,000. Larger corporate relocations can cost significantly more. Many office removal companies offer a project management service and will handle everything from packing IT equipment to installing furniture at the new location. Always get a detailed written quote that specifies exactly what is included.`,
        },
        {
          heading: "Planning Your Office Move",
          content: `Start planning at least three months before your target move date. Appoint a project coordinator to manage the move and act as the main contact for the removal company. Create an inventory of all furniture, IT equipment, and files. Decide what is being moved, what is being replaced, and what can be recycled or disposed of. Communicate the move timeline to all staff and assign packing responsibilities. Most office removal companies in ${r.areas} can conduct a free site survey to plan the logistics.`,
        },
        {
          heading: "IT and Equipment Handling",
          content: `IT equipment is often the most critical and sensitive part of an office move. Specialist office removal companies can disconnect, transport, and reconnect servers, computers, printers and phone systems. Back up all data before the move. Label all cables and connections. Consider whether your IT team should handle the reconnection at the new office, or whether the removal company offers this service. Plan for your internet and phone lines to be active at the new location before the move.`,
        },
        {
          heading: "Minimising Business Disruption",
          content: `Schedule the move for a weekend or bank holiday to avoid losing productive working days. Some companies offer an evening and overnight moving service. Move in phases if possible, starting with departments that are least critical. Set up the new office with IT and phones working before staff arrive. Have a contingency plan for the first few days in case of any issues. A good office removal company will work to your schedule and ensure everything is in place before your team walks through the door.`,
        },
      ],
      faq: [
        {
          question: "How long does an office move take?",
          answer: `A small office move in ${r.theName} can usually be completed in a single day or weekend. Larger office relocations may take two to five days depending on the volume of items, IT complexity, and the distance. The removal company will give you a timeline after conducting a site survey.`,
        },
        {
          question: "Can the removal company handle confidential documents?",
          answer: "Yes, specialist office removal companies offer secure document handling and can provide lockable crates for confidential files. If you have documents that need to be destroyed, many providers also offer a confidential shredding service.",
        },
        {
          question: "Do I need to tell anyone about the office move?",
          answer: "You will need to notify HMRC, Companies House (if your registered address is changing), your bank, insurance provider, clients, suppliers, and Royal Mail (to set up a redirect). Update your website, Google Business Profile, and any directory listings with the new address.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `office removals ${r.mainCity.toLowerCase()}`,
        `commercial removals ${r.mainCity.toLowerCase()}`,
        `business relocation ${r.name.toLowerCase()}`,
        `office move ${r.mainCity.toLowerCase()}`,
        `office removal companies ${r.name.toLowerCase()}`,
      ],
      product: "removal-companies",
    },
    {
      slug: `removal-costs-${r.slug}`,
      title: `Removal Costs ${r.mainCity}`,
      metaTitle: `Removal Costs ${r.mainCity} | House Moving Prices & What to Expect (2026)`,
      metaDescription: `How much do removals cost in ${r.mainCity}? Price breakdown by house size, what affects the cost, and how to get the best deal in ${r.theName}.`,
      h1: `Removal Costs in ${r.mainCity} & ${r.theName}`,
      intro: `The cost of hiring a removal company depends on the size of your home, the distance you are moving, and the services you need. This guide gives you a clear breakdown of typical removal costs in ${r.theName} so you can budget accurately and avoid surprises.`,
      sections: [
        {
          heading: `How Much Do Removals Cost in ${r.theName}?`,
          content: `Local house removals in ${r.theName} (within 30 miles) typically cost £300-£600 for a 1-2 bedroom property, £500-£900 for a 3 bedroom house, and £800-£1,500 for a 4-5 bedroom house. These prices are for a standard weekday move with 2-3 men and a van. Long-distance moves (100+ miles) cost more, typically £600-£1,200 for a small property and £1,000-£2,500 for a larger home. Man-and-van services for smaller moves or single items cost £40-£70 per hour with one person, or £60-£100 per hour with two. Most removal companies charge a half-day minimum (3-4 hours).`,
        },
        {
          heading: "What Affects the Price?",
          content: `The volume of belongings is the primary factor. More furniture and boxes means a larger van (or multiple trips) and more time. Distance matters because fuel costs and driver time increase with longer journeys. Access at both properties affects cost. Narrow streets, no parking, upper-floor flats without a lift, and long carries from the door to the van all add time and effort. The day of the week makes a difference. Friday and Monday moves are most popular and often more expensive. Mid-month moves are usually cheaper than end-of-month. Additional services like packing, disassembly and reassembly of furniture, and temporary storage all add to the total. Special items such as pianos, safes, hot tubs, or large appliances require specialist handling and extra charges.`,
        },
        {
          heading: "How to Get the Best Price",
          content: `Get at least three written quotes from removal companies in ${r.theName}. A good company will visit your home (or do a video survey) to give an accurate quote based on the actual volume. Be wary of quotes given over the phone without seeing your belongings, as these often increase on the day. Move midweek if possible. Tuesday, Wednesday and Thursday are typically 10-20% cheaper than Friday or Monday. Move mid-month rather than end-of-month. Declutter before the move. Less stuff means a smaller van, fewer hours, and a lower price. Pack as much as you can yourself. Most companies charge £200-£500 for a full packing service on a 3-bed house. If you pack your own boxes, you save this entirely.`,
        },
        {
          heading: "What Is Included in the Price?",
          content: `A standard removal quote in ${r.theName} typically includes loading your belongings at the old property, transport to the new property, and unloading. Most companies include basic furniture protection (blankets, straps) during transit. Goods-in-transit insurance is usually included, covering accidental damage during the move, though the level of cover varies. Items not usually included are packing materials and packing labour, disassembly and reassembly of furniture (beds, wardrobes), storage, cleaning, and parking suspension permits if needed. Always ask what is and is not included when comparing quotes. The cheapest quote may exclude things the others include.`,
        },
        {
          heading: "Hidden Costs to Watch Out For",
          content: `The most common unexpected charges are overtime fees (if the move takes longer than estimated), additional trip charges (if everything does not fit in one load), parking fines (if there is no suitable parking at either address), and stair charges (for upper-floor flats without a lift). If you need a parking suspension outside your property, the council charges £20-£50 and requires 5-10 working days notice. Some companies charge extra for moves that start very early or finish late. If you need temporary storage between moves, this costs £20-£40 per week for a standard container. Always confirm the total price in writing before the day and ask specifically about overtime rates.`,
        },
      ],
      faq: [
        {
          question: "How much does it cost to move a 3-bed house?",
          answer: `A local move (within 30 miles) for a 3-bed house in ${r.theName} typically costs £500-£900. A long-distance move (100+ miles) costs £800-£1,500. These prices are for a standard weekday move with a professional removal company including loading, transport and unloading.`,
        },
        {
          question: "Is man-and-van cheaper than a removal company?",
          answer: "For small moves (1-2 rooms, single items, student moves), man-and-van is usually cheaper at £40-£100 per hour. For a full house move, a removal company is often better value because they bring a larger van, more staff, proper equipment and insurance. A full house move by man-and-van can end up costing the same or more if it takes multiple trips.",
        },
        {
          question: "Should I get a survey before booking?",
          answer: "Yes. A reputable removal company will survey your home (in person or by video call) before giving a fixed quote. This ensures the price is accurate and there are no surprises on moving day. Avoid companies that quote a fixed price over the phone without seeing your belongings, as these quotes often increase.",
        },
        {
          question: "Do removal companies charge more on Fridays?",
          answer: "Yes. Friday and Monday are the busiest moving days, and many companies charge a premium of 10-20%. The end of the month is also more expensive. Moving midweek (Tuesday-Thursday) and mid-month typically gives you the best rates and more availability.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `removal costs ${r.mainCity.toLowerCase()}`,
        `house removal prices ${r.name.toLowerCase()}`,
        `how much do removals cost ${r.mainCity.toLowerCase()}`,
        `moving house cost ${r.name.toLowerCase()}`,
        `removal company prices ${r.mainCity.toLowerCase()}`,
      ],
      product: "removal-companies",
    },
  ];
}

export function getRemovalGuides(): Guide[] {
  const region = getGuideRegion();
  if (!region) return [];
  return generate(region);
}
