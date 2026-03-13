import type { Guide } from "./guides";
import { getGuideRegion, type GuideRegion } from "./guide-regions";

function generate(r: GuideRegion): Guide[] {
  return [
    {
      slug: `skip-sizes-guide-${r.slug}`,
      title: `Skip Sizes Guide ${r.name}`,
      metaTitle: `Skip Sizes Explained | Which Skip Size Do You Need? (2026)`,
      metaDescription: `Not sure which skip size to hire in ${r.theName}? Our guide covers mini, midi, builders, large and roll-on roll-off skips with dimensions, capacity and prices.`,
      h1: `Skip Sizes Guide: Which Skip Do You Need in ${r.theName}?`,
      intro: `Choosing the right skip size saves you money and hassle. Too small and you will need a second skip. Too large and you are paying for space you do not use. This guide breaks down every skip size available in ${r.theName} with dimensions, capacity and typical costs to help you choose.`,
      sections: [
        {
          heading: "Mini Skip (2-3 Cubic Yards)",
          content: `Mini skips are the smallest option, ideal for small garden clearances, bathroom refits and minor DIY projects. They hold roughly 25-35 bin bags of waste. Dimensions are approximately 1.2m long x 0.9m wide x 0.6m high. Mini skip hire in ${r.theName} typically costs £80-£150 for up to a week. They are easy to position on a driveway and do not require a council permit if placed on private land.`,
        },
        {
          heading: "Midi Skip (4-5 Cubic Yards)",
          content: `Midi skips are a step up, suitable for kitchen renovations, larger garden projects and general household clearances. They hold around 40-55 bin bags. Dimensions are approximately 1.8m long x 1.2m wide x 1m high. Prices in ${r.theName} range from £120-£200. Midi skips are popular because they offer good capacity without taking up too much space.`,
        },
        {
          heading: "Builders Skip (6-8 Cubic Yards)",
          content: `The builders skip is the most commonly hired size in the UK. It is suitable for house renovations, extension builds, large clearances and trade work. An 8-yard builders skip holds around 60-80 bin bags. Dimensions are approximately 3.7m long x 1.7m wide x 1.2m high. Expect to pay £150-£300 in ${r.theName} depending on the waste type and hire duration. This is the standard size most people picture when they think of a skip.`,
        },
        {
          heading: "Large Skip (12-16 Cubic Yards)",
          content: `Large skips are designed for major renovation projects, commercial clearances and demolition work. A 14-yard skip holds around 120-140 bin bags. They are significantly bigger than builders skips, with dimensions approximately 4.2m long x 1.8m wide x 1.8m high. Prices in ${r.theName} range from £250-£450. Due to their size, large skips usually require placement on a driveway or hard-standing area and may need a council permit if placed on a public road.`,
        },
        {
          heading: "Roll-On Roll-Off Skip (20-40 Cubic Yards)",
          content: `Roll-on roll-off (RoRo) skips are the largest available, used for major construction projects, site clearances, and industrial waste. They are delivered and collected by specialist roll-on roll-off lorries. A 40-yard RoRo can hold the equivalent of around 400 bin bags. Prices in ${r.theName} start from £300 and go up to £600+ depending on the size and waste type. These are typically hired by construction companies and commercial operations rather than householders.`,
        },
      ],
      faq: [
        {
          question: "What is the most popular skip size?",
          answer: "The 6-8 yard builders skip is by far the most popular size in the UK. It offers enough capacity for most home renovation projects, garden clearances and trade work, while still fitting on a standard driveway.",
        },
        {
          question: "Can I mix different types of waste in one skip?",
          answer: "Most skip hire companies allow mixed general waste. However, certain items must be separated or cannot go in a skip at all, including fridges, freezers, TVs, monitors, gas cylinders, tyres, batteries, paint and solvents, asbestos, and clinical waste. Check with your hire company for their specific rules.",
        },
        {
          question: "How high can I fill a skip?",
          answer: "You should not fill a skip above the top edges. Overloaded skips are a safety hazard and may be refused for collection. The waste must sit level with or below the skip walls. If you need more space, it is better to hire the next size up rather than overfill.",
        },
        {
          question: "How long can I keep a skip?",
          answer: `Most skip hire companies in ${r.theName} offer a standard hire period of 7-14 days. Extensions are usually available at a daily or weekly rate. If you need a skip for longer, ask about extended hire rates when booking as these are often better value than extending day by day.`,
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `skip sizes ${r.name.toLowerCase()}`,
        `which skip size ${r.mainCity.toLowerCase()}`,
        `skip hire sizes guide`,
        `builders skip size`,
        `skip dimensions uk`,
      ],
      product: "skip-hire",
    },
    {
      slug: `skip-hire-permits-${r.slug}`,
      title: `Skip Hire Permits ${r.name}`,
      metaTitle: `Skip Hire Permits ${r.name} | Do You Need One? Costs & Rules (2026)`,
      metaDescription: `Find out if you need a skip permit in ${r.theName}. Council rules, costs, how to apply and what happens if you skip without one.`,
      h1: `Skip Hire Permits in ${r.theName}: Do You Need One?`,
      intro: `If your skip needs to go on a public road, pavement or council land, you will need a skip permit from your local council. This guide explains the rules across ${r.theName}, how to apply, what it costs, and how to avoid fines.`,
      sections: [
        {
          heading: "When Do You Need a Skip Permit?",
          content: `You need a skip permit whenever the skip is placed on public land. This includes roads, pavements, grass verges and any other council-maintained land. If the skip sits entirely on your private driveway, garden or land, no permit is needed. The most common scenario requiring a permit is terraced houses and properties without off-street parking, where the skip has to go on the road outside. In ${r.theName}, permits are issued by your local district or unitary council.`,
        },
        {
          heading: "How Much Does a Skip Permit Cost?",
          content: `Skip permit costs vary by council across ${r.theName}, but typically range from £20-£60 for a standard permit lasting 7-14 days. Some councils charge more for longer periods or for skips on busy roads. A few councils offer the first week free with charges for extensions. Your skip hire company will usually handle the permit application for you, though some add an administration fee on top of the council charge. Always ask whether the permit cost is included in your skip hire quote.`,
        },
        {
          heading: "How to Apply for a Skip Permit",
          content: `In most cases, your skip hire company applies for the permit on your behalf. They deal with the council regularly and know the process. You will need to provide the delivery address and the dates you need the skip. If you need to apply yourself, contact your local council's highways department. Most councils in ${r.theName} now accept online applications. Allow 2-5 working days for the permit to be approved, so plan ahead.`,
        },
        {
          heading: "Skip Permit Conditions",
          content: `Permits come with conditions that must be followed. The skip must display warning lights (amber lamps) at night. It must have reflective markings on each corner. The skip must not block traffic flow or obstruct sight lines at junctions. It must not cover drain covers or access points. The skip hire company is responsible for ensuring the skip meets these requirements, but as the hirer, you should check these are in place to avoid issues.`,
        },
        {
          heading: "What Happens Without a Permit?",
          content: `Placing a skip on public land without a permit is an offence. Councils in ${r.theName} can issue fixed penalty notices, and fines can reach several hundred pounds. The council may also remove the skip at your expense. If the skip causes an obstruction or accident, you and the skip company could face further liability. It is never worth skipping the permit. The cost is small compared to the potential fine and hassle.`,
        },
      ],
      faq: [
        {
          question: "Does the skip company sort out the permit?",
          answer: `In most cases, yes. The majority of skip hire companies in ${r.theName} handle the permit application as part of their service. Some include the permit cost in the hire price, while others charge it separately. Always confirm this when getting your quote.`,
        },
        {
          question: "How long does a skip permit last?",
          answer: "Most skip permits are issued for 7-14 days, matching the standard skip hire period. If you need the skip for longer, you will need to extend the permit. Your skip hire company can usually arrange this for you.",
        },
        {
          question: "Can I put a skip on the pavement?",
          answer: "Generally no. Most councils do not permit skips on pavements as they obstruct pedestrians, especially wheelchair users and those with pushchairs. The skip should go on the road (carriageway) next to the kerb. If the only option is the pavement, speak to your council directly.",
        },
        {
          question: "Do I need a permit on a bank holiday?",
          answer: "Yes. Permit requirements apply every day of the year, including bank holidays and weekends. There is no exemption for short periods either. Even if the skip is only on the road for a few hours, a permit is technically required.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `skip permit ${r.name.toLowerCase()}`,
        `skip hire permit cost`,
        `do I need a skip permit`,
        `skip on road permit ${r.mainCity.toLowerCase()}`,
        `council skip permit`,
      ],
      product: "skip-hire",
    },
    {
      slug: `cheap-skip-hire-${r.slug}`,
      title: `Cheap Skip Hire ${r.name}`,
      metaTitle: `Cheap Skip Hire ${r.name} | Save Money on Skip Rental (2026)`,
      metaDescription: `How to get the cheapest skip hire in ${r.theName}. Compare prices, avoid hidden fees and learn money-saving tips from local skip hire experts.`,
      h1: `How to Get Cheap Skip Hire in ${r.theName}`,
      intro: `Skip hire does not have to break the bank. With a few smart choices you can save a significant amount on your skip hire in ${r.theName}. This guide covers how to get the best price, what affects the cost, and common mistakes that end up costing more.`,
      sections: [
        {
          heading: "What Affects Skip Hire Prices?",
          content: `Several factors determine how much you pay for skip hire in ${r.theName}. The skip size is the biggest factor, with prices roughly doubling as you go up each size. The type of waste matters too, as heavy waste like soil and rubble costs more to dispose of than general household waste. Location affects pricing since rural areas may have higher delivery charges. Hire duration, permit requirements, and the time of year can also influence the price. Summer and bank holiday weekends are typically busier and slightly more expensive.`,
        },
        {
          heading: "Tips for Saving Money",
          content: `Get at least three quotes from different companies in ${r.areas} and compare what is included. Book the right size, as paying for a bigger skip you do not fill wastes money, but going too small means paying for a second skip. Separate your waste, as clean materials like soil, rubble or wood can often be disposed of more cheaply than mixed waste. If you can place the skip on your driveway, you save the permit cost. Book midweek delivery if possible as some companies offer lower rates. Finally, share a skip with a neighbour if you both have small clearance jobs.`,
        },
        {
          heading: `Average Skip Hire Prices in ${r.theName}`,
          content: `As a rough guide for ${r.theName}: mini skips (2-3 yards) cost £80-£150, midi skips (4-5 yards) cost £120-£200, builders skips (6-8 yards) cost £150-£300, large skips (12-16 yards) cost £250-£450, and roll-on roll-off skips (20-40 yards) cost £300-£600+. These prices are for a standard 7-14 day hire of general mixed waste. Prices for heavy waste (soil, rubble, concrete) are typically 20-40% higher.`,
        },
        {
          heading: "Hidden Costs to Watch Out For",
          content: `Watch for charges that are not included in the headline price. Overweight charges apply if the skip exceeds the maximum weight for its size. Overfilling charges apply if waste is above the skip edges. Some companies charge extra for certain waste types like plasterboard, tyres or mattresses. Permit costs may or may not be included. Extended hire charges kick in if you keep the skip beyond the agreed period. Always ask for an all-inclusive quote so you know exactly what you will pay.`,
        },
        {
          heading: "Alternatives to Skip Hire",
          content: `If a skip seems too expensive for your needs, consider alternatives. A man-and-van rubbish removal service can be cheaper for small amounts. Council bulky waste collection is available for large household items at a lower cost. Local recycling centres (tips) are free for household waste. Grab hire is a fast alternative for loose materials like soil and rubble, where a grab lorry scoops up the waste without needing a skip on site. Compare all options before deciding.`,
        },
      ],
      faq: [
        {
          question: "What is the cheapest skip I can hire?",
          answer: `The cheapest option is a mini skip (2-3 cubic yards), which typically costs £80-£150 in ${r.theName}. For very small amounts of waste, a man-and-van service may work out even cheaper.`,
        },
        {
          question: "Is it cheaper to hire a skip during the week?",
          answer: "Some companies offer lower rates for midweek delivery and collection, as weekends are their busiest time. It is worth asking when you get your quote. Even if the price is the same, midweek bookings are more likely to be available at short notice.",
        },
        {
          question: "Can I save money by sorting my waste?",
          answer: "Yes. Separating clean materials like wood, metal, soil or rubble from mixed waste can reduce disposal costs. Some skip companies offer lower rates for single-material loads. Recyclable materials are cheaper to process than mixed waste going to landfill.",
        },
        {
          question: "Do I get a refund if I do not fill the skip?",
          answer: "No, skip hire is charged at a flat rate regardless of how full the skip is. This is why choosing the right size is important. If you are unsure, speak to the hire company as they deal with this every day and can advise on the best size for your project.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `cheap skip hire ${r.name.toLowerCase()}`,
        `skip hire prices ${r.mainCity.toLowerCase()}`,
        `cheapest skip hire ${r.name.toLowerCase()}`,
        `skip hire cost ${r.mainCity.toLowerCase()}`,
        `affordable skip hire`,
      ],
      product: "skip-hire",
    },
    {
      slug: `skip-hire-costs-${r.slug}`,
      title: `Skip Hire Costs ${r.mainCity}`,
      metaTitle: `Skip Hire Prices ${r.mainCity} | Size-by-Size Costs & What to Expect (2026)`,
      metaDescription: `How much does skip hire cost in ${r.mainCity}? Price breakdown by skip size, what is included, permit costs, and extras to watch for in ${r.theName}.`,
      h1: `Skip Hire Costs in ${r.mainCity} & ${r.theName}`,
      intro: `Skip hire is one of the most popular ways to dispose of waste from building work, house clearances and garden projects. Prices depend mainly on the skip size, your location, and the type of waste. This guide gives you a clear breakdown of skip hire costs across ${r.theName}.`,
      sections: [
        {
          heading: `How Much Does Skip Hire Cost in ${r.theName}?`,
          content: `Skip hire prices in ${r.theName} vary by size. A mini skip (2-3 yards) costs £80-£150 and holds roughly 25-35 bin bags of waste. A midi skip (4-5 yards) costs £120-£200 and is suitable for bathroom or kitchen refits. A builders skip (6-8 yards) costs £150-£300 and is the most popular size for house renovations and clearances. A large skip (10-12 yards) costs £250-£450 and suits bigger projects or commercial work. Roll-on roll-off skips (20-40 yards) cost £300-£600+ and are used on construction sites. These are typical hire periods of 7-14 days. Prices include delivery, collection, and disposal. Permit fees are extra if the skip goes on a public road.`,
        },
        {
          heading: "What Affects Skip Hire Prices?",
          content: `The biggest price factor is skip size. A builders skip costs roughly double a mini skip. Waste type also matters. Mixed general waste is the standard rate. Heavy materials like soil, rubble and concrete cost more because of weight charges at the tip. Hazardous waste such as asbestos, plasterboard or electrical items requires specialist disposal and costs significantly more. Location affects price because skip companies factor in fuel and landfill costs, which vary by area. Duration matters too. Most hires are 7-14 days, but longer periods may incur extra charges. Time of year plays a role, with spring and summer being busier and occasionally more expensive.`,
        },
        {
          heading: "What Is Included in the Price?",
          content: `A standard skip hire price in ${r.theName} includes delivery of the skip to your property, a hire period of 7-14 days (varies by company), collection of the skip, and disposal of the waste at a licensed facility. Most companies include the cost of general mixed waste disposal. Items not included are council permits (required if the skip is on a road or pavement), heavy waste surcharges, overfill charges (waste must not exceed the top of the skip), and restricted items. Always confirm what is included when you book, as some companies advertise a lower base price and add extras later.`,
        },
        {
          heading: "Council Permit Costs",
          content: `If your skip needs to go on a public road, pavement or grass verge, you need a permit from your local council. Permit costs in ${r.theName} typically range from £20-£60 depending on the council and duration. Most skip companies arrange the permit on your behalf and add the cost to your invoice. If the skip can go on your driveway or private land, no permit is needed and you save this cost. The permit process usually takes 2-5 working days, so plan ahead if you need a road placement. Some councils require traffic management plans for skips on busy roads, which adds cost.`,
        },
        {
          heading: "Hidden Costs to Watch Out For",
          content: `The most common extra charges are overweight fees, overfill charges, and restricted waste items. Overweight fees apply if the skip exceeds the maximum weight for its size, which is common with heavy materials like soil and rubble. Overfill charges apply if waste is loaded above the top of the skip, as it cannot be transported safely. Restricted items that most companies charge extra for or refuse include mattresses (£20-£40 surcharge each), tyres (£5-£10 each), plasterboard (must be separated, costs more to dispose), fridges and freezers (£30-£50 each), and paint or chemicals (classified as hazardous). Extended hire beyond the agreed period typically costs £5-£15 per extra day. Always ask about these before booking.`,
        },
      ],
      faq: [
        {
          question: "How much does a builders skip cost?",
          answer: `A builders skip (6-8 yards) in ${r.theName} typically costs £150-£300 for a 7-14 day hire including delivery, collection and disposal. This is the most popular size and holds the equivalent of 60-80 bin bags. Prices vary depending on your postcode and the waste type.`,
        },
        {
          question: "Do I need a permit for a skip on my driveway?",
          answer: "No. A permit is only required if the skip is placed on a public road, pavement or grass verge. If it fits on your driveway or private property, no permit is needed. This saves £20-£60 and avoids the 2-5 day wait for permit approval.",
        },
        {
          question: "Is there a weight limit on skips?",
          answer: "Yes. Each skip size has a maximum weight, typically around 1 tonne for a mini skip, 2-3 tonnes for a midi, and 4-6 tonnes for a builders skip. Heavy waste like soil, rubble and concrete reaches the weight limit before the skip is full. Your skip company can advise on the right size based on what you are throwing away.",
        },
        {
          question: "Can I put anything in a skip?",
          answer: "Most household and building waste is accepted. Restricted items include hazardous materials (asbestos, chemicals, paint), gas bottles, batteries, electrical items, and tyres. Some of these can go in the skip for an extra charge, while others need specialist disposal. Always tell the skip company what waste you have when booking.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `skip hire prices ${r.mainCity.toLowerCase()}`,
        `skip hire cost ${r.name.toLowerCase()}`,
        `how much skip hire ${r.mainCity.toLowerCase()}`,
        `skip hire rates ${r.name.toLowerCase()}`,
        `builders skip price ${r.mainCity.toLowerCase()}`,
      ],
      product: "skip-hire",
    },
  ];
}

export function getSkipHireGuides(): Guide[] {
  const region = getGuideRegion();
  if (!region) return [];
  return generate(region);
}
