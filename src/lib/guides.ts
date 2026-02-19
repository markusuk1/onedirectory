import { getSiteId } from "./siteConfig";

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: { heading: string; content: string }[];
  faq: { question: string; answer: string }[];
  relatedLocations: string[];
  keywords: string[];
}

const NE_GUIDES: Guide[] = [
  {
    slug: "party-bus-hire-newcastle",
    title: "Party Bus Hire Newcastle",
    metaTitle:
      "Party Bus Hire Newcastle | Prices, Tips & Top Companies (2026)",
    metaDescription:
      "Find the best party bus hire in Newcastle upon Tyne. Compare prices, see top-rated companies, and book your party bus for hen dos, birthdays, stag nights and more.",
    h1: "Party Bus Hire in Newcastle & the North East",
    intro:
      "Planning a night out, hen do, stag party or birthday celebration in Newcastle? A party bus is one of the most popular ways to travel in style with your group. We list the top party bus operators across Newcastle and the wider North East so you can compare prices and book with confidence.",
    sections: [
      {
        heading: "What Is a Party Bus?",
        content:
          "A party bus is a converted coach or large minibus fitted with sound systems, LED lighting, comfortable seating and sometimes even a dance floor or bar area. They typically carry between 16 and 50 passengers, making them perfect for large groups heading out in Newcastle city centre, the Bigg Market, or the Diamond Strip.",
      },
      {
        heading: "How Much Does Party Bus Hire Cost in Newcastle?",
        content:
          "Party bus hire prices in Newcastle typically start from around £150-£250 for a 2-3 hour city centre tour with a standard party bus. Larger or more luxurious vehicles with premium sound systems and lighting can cost £300-£500+ for an evening. Prices vary depending on the day of the week, time of year, group size, and the specific vehicle. Weekend bookings (Friday and Saturday nights) are the most popular and tend to cost more. Most operators offer packages that include pick-up and drop-off at agreed locations around Newcastle and Gateshead.",
      },
      {
        heading: "Popular Party Bus Routes in Newcastle",
        content:
          "The most popular party bus routes in Newcastle include pick-ups from residential areas across Tyneside followed by a tour through the city centre. Many groups use a party bus as transport to start a night out on the Quayside, Bigg Market, or Collingwood Street. Other popular routes include trips to the MetroCentre area in Gateshead, tours around Jesmond and Gosforth, or longer trips combining Newcastle with Durham or Sunderland nightlife.",
      },
      {
        heading: "Best Occasions for a Party Bus",
        content:
          "Party buses in Newcastle are most commonly booked for hen parties and hen dos, stag nights, milestone birthdays (especially 18th, 21st, 30th and 40th), Christmas party nights and office celebrations, prom nights for school leavers, race day transport to Newcastle Racecourse, and match day travel to St James' Park. Whatever the occasion, booking early is recommended as the best vehicles get booked up quickly, particularly during summer months and the Christmas party season.",
      },
      {
        heading: "Choosing the Right Party Bus Company",
        content:
          "When comparing party bus hire companies in Newcastle, check their Google reviews and ratings, ask about the specific vehicle you will get (photos are essential), confirm what is included in the price such as music, lighting and any refreshments, check their cancellation policy and payment terms, and make sure they have appropriate insurance and licensing. All operators listed on our directory have been verified with up-to-date contact details and genuine customer reviews.",
      },
    ],
    faq: [
      {
        question: "How many people can fit on a party bus?",
        answer:
          "Most party buses in Newcastle accommodate between 16 and 50 passengers. The most common sizes are 16-seater and 24-seater party buses. For larger groups, some operators offer full-size coach conversions that seat up to 50 people.",
      },
      {
        question: "Can you bring your own drinks on a party bus?",
        answer:
          "This depends on the operator. Many Newcastle party bus companies allow you to bring your own non-glass drinks (cans and plastic bottles). Some offer packages that include drinks. Always check with the operator before booking.",
      },
      {
        question: "How far in advance should I book a party bus?",
        answer:
          "We recommend booking at least 4-6 weeks in advance for weekend bookings. During peak season (December, summer weekends), booking 2-3 months ahead is advisable to get your preferred vehicle.",
      },
      {
        question: "Are party buses available in other North East cities?",
        answer:
          "Yes. Party bus operators in our directory also cover Sunderland, Durham, Middlesbrough, Gateshead, Darlington and other North East locations. Many Newcastle-based operators will pick up from across the region.",
      },
    ],
    relatedLocations: [
      "newcastle",
      "gateshead",
      "sunderland",
      "durham",
      "middlesbrough",
    ],
    keywords: [
      "party bus newcastle",
      "party bus hire newcastle",
      "party bus hire north east",
    ],
  },
  {
    slug: "self-drive-minibus-hire-north-east",
    title: "Self-Drive Minibus Hire North East",
    metaTitle:
      "Self-Drive Minibus Hire North East | No Driver Needed (2026)",
    metaDescription:
      "Hire a self-drive minibus in the North East. Compare 9-17 seater minibuses you can drive yourself across Newcastle, Sunderland, Durham, Middlesbrough and more.",
    h1: "Self-Drive Minibus Hire in the North East",
    intro:
      "Need a minibus but want to drive it yourself? Self-drive minibus hire is a cost-effective option for groups who have a confident driver with a standard UK driving licence. We list self-drive minibus operators across the North East including Newcastle, Sunderland, Durham, Middlesbrough, Darlington and beyond.",
    sections: [
      {
        heading: "What Licence Do You Need?",
        content:
          "You can drive a minibus on a standard Category B car licence if the vehicle has no more than 8 passenger seats (plus the driver) and a Maximum Authorised Mass (MAM) of no more than 3,500kg. For larger minibuses with 9-16 passenger seats, you may need a D1 licence category. If you passed your driving test before 1 January 1997, you should already have the D1 category on your licence. Drivers who passed after this date will need to check their licence or consider a smaller vehicle. Always confirm licence requirements with the hire company before booking.",
      },
      {
        heading: "How Much Does Self-Drive Minibus Hire Cost?",
        content:
          "Self-drive minibus hire in the North East is significantly cheaper than hiring with a driver. A 9-seater minibus typically costs £80-£150 per day, while larger 12-15 seater vehicles range from £120-£200 per day. Weekend rates and weekly hire often offer better value. Most operators require a security deposit (usually £200-£500) and you will need to arrange your own insurance or pay for the operator's cover. Fuel is not usually included.",
      },
      {
        heading: "Popular Self-Drive Minibus Sizes",
        content:
          "The most popular self-drive minibuses in the North East are 9-seater minibuses which are the largest you can drive on a standard car licence and are ideal for family trips, airport runs, and small group outings. 12-seater minibuses are popular for sports teams and medium groups but require a D1 licence. 15-17 seater minibuses are the largest self-drive option and are perfect for larger groups, events and longer trips. They require a D1 licence category.",
      },
      {
        heading: "What to Check Before Hiring",
        content:
          "Before booking a self-drive minibus, confirm you have the correct driving licence category, check the insurance cover and excess amount, ask about mileage limits as some operators include unlimited mileage while others charge per mile, check the fuel policy (most are full-to-full), inspect the vehicle for any existing damage before driving away, and confirm pick-up and return times to avoid late fees.",
      },
      {
        heading: "Self-Drive vs Driven Minibus Hire",
        content:
          "Self-drive hire is typically 40-60% cheaper than hiring a minibus with a professional driver. It gives you complete flexibility over your schedule and route. However, driven hire means everyone in the group can relax and enjoy themselves, the driver knows the local roads, and there is no need to worry about parking a large vehicle. For nights out and events involving alcohol, hiring with a driver is the obvious choice.",
      },
    ],
    faq: [
      {
        question: "Can I drive a 16-seater minibus on a normal licence?",
        answer:
          "No. A standard Category B car licence only covers vehicles with up to 8 passenger seats. For a 16-seater, you need a D1 licence. If you passed your test before January 1997, check your licence as you may already have this category.",
      },
      {
        question: "What age do you need to be to hire a self-drive minibus?",
        answer:
          "Most operators require the driver to be at least 25 years old and to have held a full UK driving licence for at least 2 years. Some may accept drivers aged 21-24 with a surcharge.",
      },
      {
        question: "Is insurance included in self-drive hire?",
        answer:
          "Basic insurance is usually included but with a high excess (£500-£1,000). Many operators offer additional cover to reduce the excess. You can also arrange your own hire vehicle insurance separately.",
      },
      {
        question:
          "Where can I pick up a self-drive minibus in the North East?",
        answer:
          "Self-drive minibus operators are based across the North East including Newcastle, Sunderland, Durham, Middlesbrough, Darlington, Hartlepool and Gateshead. Some offer delivery and collection of the vehicle to your address.",
      },
    ],
    relatedLocations: [
      "newcastle",
      "sunderland",
      "durham",
      "middlesbrough",
      "darlington",
      "hartlepool",
      "stockton-on-tees",
    ],
    keywords: [
      "self drive minibus hire north east",
      "self drive minibus hire newcastle upon tyne",
    ],
  },
  {
    slug: "16-seater-minibus-hire",
    title: "16 Seater Minibus Hire",
    metaTitle:
      "16 Seater Minibus Hire North East | Newcastle, Durham & More (2026)",
    metaDescription:
      "Find 16 seater minibus hire across the North East. Compare prices and operators in Newcastle, Durham, Sunderland, Middlesbrough and surrounding areas.",
    h1: "16 Seater Minibus Hire in the North East",
    intro:
      "A 16-seater minibus is the most popular size for group travel in the North East. Whether you need transport for a wedding party, sports team, corporate event or day trip, a 16-seater offers the perfect balance of capacity and comfort. Compare 16-seater minibus operators across Newcastle, Durham, Sunderland, Middlesbrough and the wider region.",
    sections: [
      {
        heading: "Why Choose a 16-Seater Minibus?",
        content:
          "A 16-seater minibus is the most versatile group transport option. It is large enough to carry a decent-sized group in comfort but small enough to navigate city streets and fit into standard car parks. They are typically Mercedes Sprinters or Ford Transit minibuses with high roofs, air conditioning, and luggage space. Many also come with USB charging points and reclining seats for longer journeys.",
      },
      {
        heading: "How Much Does 16-Seater Minibus Hire Cost?",
        content:
          "In the North East, 16-seater minibus hire with a driver typically costs between £150 and £350 depending on the journey. A local transfer within Newcastle or surrounding areas starts from around £80-£150. A full day hire (8-10 hours) usually costs £250-£400. Airport transfers to Newcastle International Airport are typically £100-£200 depending on distance. Prices include a professional driver, insurance and VAT.",
      },
      {
        heading: "Common Uses for 16-Seater Minibuses",
        content:
          "The most common bookings for 16-seater minibuses in the North East include wedding guest transport between ceremony and reception venues, airport transfers for families and groups, sports team transport to fixtures across the region, corporate events and conference shuttle services, school trips and educational visits, nights out in Newcastle, Durham or Middlesbrough, and day trips to destinations like Alnwick Castle, Beamish Museum, or the Yorkshire Dales.",
      },
      {
        heading: "What to Look For in an Operator",
        content:
          "When booking a 16-seater minibus, look for operators with strong Google reviews and a track record of reliability. Check that the price includes everything with no hidden fees for waiting time or tolls. Confirm the vehicle type and age, as newer minibuses offer better comfort and safety features. Professional operators will have full PSV licensing, comprehensive insurance, and DBS-checked drivers.",
      },
    ],
    faq: [
      {
        question: "Can I drive a 16-seater minibus myself?",
        answer:
          "Only if you hold a D1 licence category. A standard car licence only covers vehicles with up to 8 passenger seats. If you passed your test before 1 January 1997, you may already have D1 on your licence.",
      },
      {
        question: "How much luggage can a 16-seater carry?",
        answer:
          "Most 16-seater minibuses have a rear luggage area that can hold around 10-12 medium suitcases. For airport transfers with a full group, ask the operator about luggage capacity as you may need a vehicle with a trailer or separate luggage van.",
      },
      {
        question: "Are 16-seater minibuses wheelchair accessible?",
        answer:
          "Not all 16-seaters are wheelchair accessible. If you need a wheelchair-accessible vehicle, mention this when booking. Some operators have adapted vehicles with ramps or lifts, though the passenger capacity may be reduced.",
      },
      {
        question: "What is the difference between a minibus and a coach?",
        answer:
          "A minibus typically seats 8-17 passengers and is based on a van chassis. A coach seats 18-70+ passengers, has higher ceilings, more luggage space, and often includes a toilet and overhead storage. For groups of 16 or fewer, a minibus is usually more cost-effective.",
      },
    ],
    relatedLocations: [
      "newcastle",
      "durham",
      "sunderland",
      "middlesbrough",
      "gateshead",
      "darlington",
      "northumberland",
    ],
    keywords: [
      "16 seater minibus hire newcastle",
      "16 seater minibus hire north east",
    ],
  },
  {
    slug: "airport-transfers-north-east",
    title: "Airport Transfers North East",
    metaTitle:
      "Airport Transfers North East | Newcastle Airport Minibus & Coach (2026)",
    metaDescription:
      "Book airport transfer minibuses and coaches in the North East. Group transport to Newcastle International Airport from Durham, Middlesbrough, Sunderland and beyond.",
    h1: "Airport Transfers & Minibus Hire for Newcastle Airport",
    intro:
      "Travelling to or from Newcastle International Airport with a group? A minibus or coach transfer is the most convenient and cost-effective option. We list operators across the North East who specialise in airport transfers, from executive cars to 50-seater coaches. Compare prices and book your group airport transport.",
    sections: [
      {
        heading: "Why Book a Group Airport Transfer?",
        content:
          "When travelling with family, friends or colleagues, a group airport transfer makes much more sense than multiple taxis or trying to arrange lifts. A single minibus can carry your entire group plus luggage, arriving together and avoiding the stress of coordinating multiple vehicles. It is also significantly cheaper per person than individual taxis, especially from destinations further afield like Middlesbrough, Durham or Northumberland.",
      },
      {
        heading: "Typical Airport Transfer Prices",
        content:
          "Airport transfer prices from key North East locations to Newcastle International Airport are approximately: Newcastle city centre from £40-£60, Gateshead from £40-£60, Sunderland from £60-£90, Durham from £70-£100, Darlington from £90-£130, Middlesbrough from £100-£150, Hartlepool from £100-£140, and Northumberland (Alnwick) from £80-£120. These prices are for a standard minibus carrying 8-16 passengers. Larger coaches for bigger groups will cost more but the per-person price drops significantly.",
      },
      {
        heading: "What to Expect from Your Transfer",
        content:
          "A professional airport transfer service will track your flight and adjust pickup time if your flight is early or delayed. The driver will meet you in the arrivals hall or at an agreed pickup point. Vehicles will have space for all your luggage. For early morning flights, operators typically offer pickups from 3am onwards. For return transfers, the driver will drop you at the departure terminal entrance. Most operators accept online booking and payment in advance.",
      },
      {
        heading: "Group Sizes and Vehicle Options",
        content:
          "For airport transfers, the most popular vehicle sizes are: 8-seater minibuses ideal for families or small groups with plenty of luggage room, 16-seater minibuses for medium groups heading on holiday or business trips, and 24-49 seater coaches for large groups such as wedding parties, sports teams, or corporate groups. Executive vehicles are also available for business travel or special occasions.",
      },
    ],
    faq: [
      {
        question:
          "How far in advance should I book an airport transfer?",
        answer:
          "We recommend booking at least 1-2 weeks in advance. For peak travel periods (school holidays, Christmas, summer), book 3-4 weeks ahead. Most operators accept bookings up to 48 hours before travel.",
      },
      {
        question: "What happens if my flight is delayed?",
        answer:
          "Most professional operators monitor flight arrivals and will adjust your pickup time accordingly at no extra charge. Always provide your flight number when booking so the operator can track it.",
      },
      {
        question: "Can I book a return airport transfer?",
        answer:
          "Yes. Most operators offer discounted rates when you book both outbound and return transfers together. This is the most convenient option as you have transport arranged for both ends of your trip.",
      },
      {
        question: "Is there space for all our luggage?",
        answer:
          "Standard minibuses can carry luggage for all passengers. If you have oversized items (golf clubs, ski equipment, pushchairs), let the operator know when booking so they can allocate the right vehicle.",
      },
    ],
    relatedLocations: [
      "newcastle",
      "durham",
      "sunderland",
      "middlesbrough",
      "darlington",
      "gateshead",
      "northumberland",
    ],
    keywords: [
      "airport transfer north east",
      "minibus hire newcastle airport",
    ],
  },
  {
    slug: "wedding-coach-hire-north-east",
    title: "Wedding Coach Hire North East",
    metaTitle:
      "Wedding Coach & Minibus Hire North East | Guest Transport (2026)",
    metaDescription:
      "Find wedding coach and minibus hire in the North East. Transport your guests between ceremony, reception and hotels across Newcastle, Durham, Northumberland and more.",
    h1: "Wedding Coach & Minibus Hire in the North East",
    intro:
      "Your wedding day transport needs to be reliable, comfortable and stress-free. Whether you need a luxury coach for 50 guests or a minibus shuttle between your ceremony and reception venue, we list wedding transport specialists across the North East. Compare operators, check reviews, and get quotes for your big day.",
    sections: [
      {
        heading: "Why Hire Wedding Transport?",
        content:
          "Arranging group transport for your wedding guests takes the stress out of the day for everyone. No one needs to worry about parking, designated drivers or finding the venue. A coach or minibus can shuttle guests between the ceremony, reception and hotels, keeping your day running on time. It is especially important for North East weddings at rural venues in Northumberland, County Durham or the North Pennines where public transport is limited.",
      },
      {
        heading: "Wedding Transport Options",
        content:
          "The most popular wedding transport options in the North East are: luxury coaches seating 30-50 guests, ideal for transporting the majority of your wedding party in style. Standard minibuses seating 16-24 guests are great for smaller weddings or as a shuttle between nearby venues. Executive minibuses with leather seats and tinted windows add a premium feel. Vintage buses are available from some operators for couples wanting a unique, retro look. Many couples book multiple vehicles to cover different routes and pickup points.",
      },
      {
        heading: "Planning Your Wedding Transport",
        content:
          "Start by working out how many guests need transport and where they are coming from. Common arrangements include morning transport from guest hotels to the ceremony venue, an afternoon shuttle from the ceremony to the reception (if at different venues), and an evening return service from the reception to hotels or key drop-off points. Share the transport schedule with guests on your wedding website or with the invitations so everyone knows pickup times and locations.",
      },
      {
        heading: "Popular Wedding Venues and Routes",
        content:
          "The North East has stunning wedding venues from historic castles to coastal hotels. Popular routes for wedding coaches include: Newcastle city centre hotels to Northumberland castle venues such as Alnwick, Bamburgh and Langley. Durham city hotels to countryside venues in County Durham and Teesdale. Darlington and Middlesbrough to North Yorkshire barn conversions and country houses. Sunderland and South Tyneside to coastal venues along the Durham Heritage Coast. An experienced local operator will know these routes and can advise on timing and logistics.",
      },
      {
        heading: "How Much Does Wedding Transport Cost?",
        content:
          "Wedding coach hire in the North East typically costs £300-£600 for a full-size coach for a half-day service (4-5 hours). A 16-seater minibus for the same period is usually £200-£350. Evening return services (taking guests from the reception to hotels at the end of the night) cost from £150-£300 depending on distance and the number of drop-off points. Many operators offer wedding packages that include ribbons and bows on the vehicle at no extra charge.",
      },
    ],
    faq: [
      {
        question:
          "How far in advance should I book wedding transport?",
        answer:
          "Book as early as possible, ideally 6-12 months before your wedding date. Popular dates (Saturdays in summer) get booked up quickly. Once you have your venue confirmed, transport should be one of the next things you arrange.",
      },
      {
        question: "Can the coach be decorated for a wedding?",
        answer:
          "Many operators will add ribbons, bows and 'Just Married' signs at no extra cost. Some offer more elaborate decorations. Discuss your requirements when booking and they will do their best to accommodate.",
      },
      {
        question: "What if our ceremony and reception are at the same venue?",
        answer:
          "You may still want transport for guests from their hotels to the venue and back in the evening. A shuttle service at the end of the night ensures guests get home safely and means everyone can enjoy themselves without worrying about driving.",
      },
      {
        question: "Can we make multiple stops?",
        answer:
          "Yes. Most operators are happy to make multiple pickup and drop-off points. For evening returns, a common arrangement is 2-3 hotel drop-offs in the nearest town or city. Discuss your route with the operator to get an accurate quote.",
      },
    ],
    relatedLocations: [
      "newcastle",
      "durham",
      "northumberland",
      "darlington",
      "middlesbrough",
      "sunderland",
      "gateshead",
    ],
    keywords: [
      "wedding coach hire north east",
      "wedding coach hire newcastle",
    ],
  },
];

const NW_GUIDES: Guide[] = [
  {
    slug: "party-bus-hire-manchester",
    title: "Party Bus Hire Manchester",
    metaTitle: "Party Bus Hire Manchester | Prices, Tips & Top Companies (2026)",
    metaDescription:
      "Find the best party bus hire in Manchester. Compare prices, see top-rated companies, and book your party bus for hen dos, birthdays, stag nights and more.",
    h1: "Party Bus Hire in Manchester & the North West",
    intro:
      "Planning a night out, hen do, stag party or birthday celebration in Manchester? A party bus is one of the most popular ways to travel in style with your group. We list the top party bus operators across Manchester and the wider North West so you can compare prices and book with confidence.",
    sections: [
      {
        heading: "What Is a Party Bus?",
        content:
          "A party bus is a converted coach or large minibus fitted with sound systems, LED lighting, comfortable seating and sometimes even a dance floor or bar area. They typically carry between 16 and 50 passengers, making them perfect for large groups heading out in Manchester city centre, Deansgate, the Northern Quarter or Spinningfields.",
      },
      {
        heading: "How Much Does Party Bus Hire Cost in Manchester?",
        content:
          "Party bus hire prices in Manchester typically start from around £150-£250 for a 2-3 hour city centre tour with a standard party bus. Larger or more luxurious vehicles with premium sound systems and lighting can cost £300-£500+ for an evening. Prices vary depending on the day of the week, time of year, group size, and the specific vehicle. Weekend bookings (Friday and Saturday nights) are the most popular and tend to cost more. Most operators offer packages that include pick-up and drop-off at agreed locations around Greater Manchester.",
      },
      {
        heading: "Popular Party Bus Routes in Manchester",
        content:
          "The most popular party bus routes in Manchester include pick-ups from residential areas across Greater Manchester followed by a tour through the city centre. Many groups use a party bus as transport to start a night out on Deansgate, in the Northern Quarter, or along Oxford Road. Other popular routes include trips to the Trafford Centre area, tours around Didsbury and Chorlton, or longer trips combining Manchester with Liverpool nightlife.",
      },
      {
        heading: "Best Occasions for a Party Bus",
        content:
          "Party buses in Manchester are most commonly booked for hen parties and hen dos, stag nights, milestone birthdays (especially 18th, 21st, 30th and 40th), Christmas party nights and office celebrations, prom nights for school leavers, and race day transport to Haydock Park or Aintree. Whatever the occasion, booking early is recommended as the best vehicles get booked up quickly, particularly during summer months and the Christmas party season.",
      },
      {
        heading: "Choosing the Right Party Bus Company",
        content:
          "When comparing party bus hire companies in Manchester, check their Google reviews and ratings, ask about the specific vehicle you will get (photos are essential), confirm what is included in the price such as music, lighting and any refreshments, check their cancellation policy and payment terms, and make sure they have appropriate insurance and licensing. All operators listed on our directory have been verified with up-to-date contact details and genuine customer reviews.",
      },
    ],
    faq: [
      {
        question: "How many people can fit on a party bus?",
        answer:
          "Most party buses in Manchester accommodate between 16 and 50 passengers. The most common sizes are 16-seater and 24-seater party buses. For larger groups, some operators offer full-size coach conversions that seat up to 50 people.",
      },
      {
        question: "Can you bring your own drinks on a party bus?",
        answer:
          "This depends on the operator. Many Manchester party bus companies allow you to bring your own non-glass drinks (cans and plastic bottles). Some offer packages that include drinks. Always check with the operator before booking.",
      },
      {
        question: "How far in advance should I book a party bus?",
        answer:
          "We recommend booking at least 4-6 weeks in advance for weekend bookings. During peak season (December, summer weekends), booking 2-3 months ahead is advisable to get your preferred vehicle.",
      },
      {
        question: "Are party buses available in other North West cities?",
        answer:
          "Yes. Party bus operators in our directory also cover Liverpool, Bolton, Warrington, Blackpool, Preston and other North West locations. Many Manchester-based operators will pick up from across the region.",
      },
    ],
    relatedLocations: [
      "manchester",
      "salford",
      "bolton",
      "stockport",
      "liverpool",
    ],
    keywords: [
      "party bus manchester",
      "party bus hire manchester",
      "party bus hire north west",
    ],
  },
  {
    slug: "self-drive-minibus-hire-north-west",
    title: "Self-Drive Minibus Hire North West",
    metaTitle:
      "Self-Drive Minibus Hire North West | No Driver Needed (2026)",
    metaDescription:
      "Hire a self-drive minibus in the North West. Compare 9-17 seater minibuses you can drive yourself across Manchester, Liverpool, Preston, Bolton and more.",
    h1: "Self-Drive Minibus Hire in the North West",
    intro:
      "Need a minibus but want to drive it yourself? Self-drive minibus hire is a cost-effective option for groups who have a confident driver with a standard UK driving licence. We list self-drive minibus operators across the North West including Manchester, Liverpool, Bolton, Preston, Warrington and beyond.",
    sections: [
      {
        heading: "What Licence Do You Need?",
        content:
          "You can drive a minibus on a standard Category B car licence if the vehicle has no more than 8 passenger seats (plus the driver) and a Maximum Authorised Mass (MAM) of no more than 3,500kg. For larger minibuses with 9-16 passenger seats, you may need a D1 licence category. If you passed your driving test before 1 January 1997, you should already have the D1 category on your licence. Drivers who passed after this date will need to check their licence or consider a smaller vehicle. Always confirm licence requirements with the hire company before booking.",
      },
      {
        heading: "How Much Does Self-Drive Minibus Hire Cost?",
        content:
          "Self-drive minibus hire in the North West is significantly cheaper than hiring with a driver. A 9-seater minibus typically costs £80-£150 per day, while larger 12-15 seater vehicles range from £120-£200 per day. Weekend rates and weekly hire often offer better value. Most operators require a security deposit (usually £200-£500) and you will need to arrange your own insurance or pay for the operator's cover. Fuel is not usually included.",
      },
      {
        heading: "Popular Self-Drive Minibus Sizes",
        content:
          "The most popular self-drive minibuses in the North West are 9-seater minibuses which are the largest you can drive on a standard car licence and are ideal for family trips, airport runs, and small group outings. 12-seater minibuses are popular for sports teams and medium groups but require a D1 licence. 15-17 seater minibuses are the largest self-drive option and are perfect for larger groups, events and longer trips. They require a D1 licence category.",
      },
      {
        heading: "What to Check Before Hiring",
        content:
          "Before booking a self-drive minibus, confirm you have the correct driving licence category, check the insurance cover and excess amount, ask about mileage limits as some operators include unlimited mileage while others charge per mile, check the fuel policy (most are full-to-full), inspect the vehicle for any existing damage before driving away, and confirm pick-up and return times to avoid late fees.",
      },
      {
        heading: "Self-Drive vs Driven Minibus Hire",
        content:
          "Self-drive hire is typically 40-60% cheaper than hiring a minibus with a professional driver. It gives you complete flexibility over your schedule and route. However, driven hire means everyone in the group can relax and enjoy themselves, the driver knows the local roads, and there is no need to worry about parking a large vehicle. For nights out and events involving alcohol, hiring with a driver is the obvious choice.",
      },
    ],
    faq: [
      {
        question: "Can I drive a 16-seater minibus on a normal licence?",
        answer:
          "No. A standard Category B car licence only covers vehicles with up to 8 passenger seats. For a 16-seater, you need a D1 licence. If you passed your test before January 1997, check your licence as you may already have this category.",
      },
      {
        question: "What age do you need to be to hire a self-drive minibus?",
        answer:
          "Most operators require the driver to be at least 25 years old and to have held a full UK driving licence for at least 2 years. Some may accept drivers aged 21-24 with a surcharge.",
      },
      {
        question: "Is insurance included in self-drive hire?",
        answer:
          "Basic insurance is usually included but with a high excess (£500-£1,000). Many operators offer additional cover to reduce the excess. You can also arrange your own hire vehicle insurance separately.",
      },
      {
        question:
          "Where can I pick up a self-drive minibus in the North West?",
        answer:
          "Self-drive minibus operators are based across the North West including Manchester, Liverpool, Bolton, Preston, Warrington, Blackburn and Stockport. Some offer delivery and collection of the vehicle to your address.",
      },
    ],
    relatedLocations: [
      "manchester",
      "liverpool",
      "bolton",
      "preston",
      "warrington",
      "stockport",
    ],
    keywords: [
      "self drive minibus hire north west",
      "self drive minibus hire manchester",
    ],
  },
  {
    slug: "16-seater-minibus-hire-north-west",
    title: "16 Seater Minibus Hire North West",
    metaTitle:
      "16 Seater Minibus Hire North West | Manchester, Liverpool & More (2026)",
    metaDescription:
      "Find 16 seater minibus hire across the North West. Compare prices and operators in Manchester, Liverpool, Preston, Bolton and surrounding areas.",
    h1: "16 Seater Minibus Hire in the North West",
    intro:
      "A 16-seater minibus is the most popular size for group travel in the North West. Whether you need transport for a wedding party, sports team, corporate event or day trip, a 16-seater offers the perfect balance of capacity and comfort. Compare 16-seater minibus operators across Manchester, Liverpool, Bolton, Preston and the wider region.",
    sections: [
      {
        heading: "Why Choose a 16-Seater Minibus?",
        content:
          "A 16-seater minibus is the most versatile group transport option. It is large enough to carry a decent-sized group in comfort but small enough to navigate city streets and fit into standard car parks. They are typically Mercedes Sprinters or Ford Transit minibuses with high roofs, air conditioning, and luggage space. Many also come with USB charging points and reclining seats for longer journeys.",
      },
      {
        heading: "How Much Does 16-Seater Minibus Hire Cost?",
        content:
          "In the North West, 16-seater minibus hire with a driver typically costs between £150 and £350 depending on the journey. A local transfer within Manchester or Liverpool starts from around £80-£150. A full day hire (8-10 hours) usually costs £250-£400. Airport transfers to Manchester Airport are typically £80-£180 depending on distance. Prices include a professional driver, insurance and VAT.",
      },
      {
        heading: "Common Uses for 16-Seater Minibuses",
        content:
          "The most common bookings for 16-seater minibuses in the North West include wedding guest transport between ceremony and reception venues, airport transfers for families and groups, sports team transport to fixtures across the region, corporate events and conference shuttle services, school trips and educational visits, nights out in Manchester, Liverpool or Blackpool, and day trips to destinations like the Lake District, Chester Zoo, or North Wales.",
      },
      {
        heading: "What to Look For in an Operator",
        content:
          "When booking a 16-seater minibus, look for operators with strong Google reviews and a track record of reliability. Check that the price includes everything with no hidden fees for waiting time or tolls. Confirm the vehicle type and age, as newer minibuses offer better comfort and safety features. Professional operators will have full PSV licensing, comprehensive insurance, and DBS-checked drivers.",
      },
    ],
    faq: [
      {
        question: "Can I drive a 16-seater minibus myself?",
        answer:
          "Only if you hold a D1 licence category. A standard car licence only covers vehicles with up to 8 passenger seats. If you passed your test before 1 January 1997, you may already have D1 on your licence.",
      },
      {
        question: "How much luggage can a 16-seater carry?",
        answer:
          "Most 16-seater minibuses have a rear luggage area that can hold around 10-12 medium suitcases. For airport transfers with a full group, ask the operator about luggage capacity as you may need a vehicle with a trailer or separate luggage van.",
      },
      {
        question: "Are 16-seater minibuses wheelchair accessible?",
        answer:
          "Not all 16-seaters are wheelchair accessible. If you need a wheelchair-accessible vehicle, mention this when booking. Some operators have adapted vehicles with ramps or lifts, though the passenger capacity may be reduced.",
      },
      {
        question: "What is the difference between a minibus and a coach?",
        answer:
          "A minibus typically seats 8-17 passengers and is based on a van chassis. A coach seats 18-70+ passengers, has higher ceilings, more luggage space, and often includes a toilet and overhead storage. For groups of 16 or fewer, a minibus is usually more cost-effective.",
      },
    ],
    relatedLocations: [
      "manchester",
      "liverpool",
      "bolton",
      "preston",
      "warrington",
      "blackpool",
      "wigan",
    ],
    keywords: [
      "16 seater minibus hire manchester",
      "16 seater minibus hire north west",
    ],
  },
  {
    slug: "airport-transfers-north-west",
    title: "Airport Transfers North West",
    metaTitle:
      "Airport Transfers North West | Manchester Airport Minibus & Coach (2026)",
    metaDescription:
      "Book airport transfer minibuses and coaches in the North West. Group transport to Manchester Airport from Liverpool, Preston, Bolton, Blackpool and beyond.",
    h1: "Airport Transfers & Minibus Hire for Manchester Airport",
    intro:
      "Travelling to or from Manchester Airport with a group? A minibus or coach transfer is the most convenient and cost-effective option. We list operators across the North West who specialise in airport transfers, from executive cars to 50-seater coaches. Compare prices and book your group airport transport.",
    sections: [
      {
        heading: "Why Book a Group Airport Transfer?",
        content:
          "When travelling with family, friends or colleagues, a group airport transfer makes much more sense than multiple taxis or trying to arrange lifts. A single minibus can carry your entire group plus luggage, arriving together and avoiding the stress of coordinating multiple vehicles. It is also significantly cheaper per person than individual taxis, especially from destinations further afield like Blackpool, Lancaster or the Lake District.",
      },
      {
        heading: "Typical Airport Transfer Prices",
        content:
          "Airport transfer prices from key North West locations to Manchester Airport are approximately: Manchester city centre from £30-£50, Stockport from £25-£40, Bolton from £40-£60, Warrington from £40-£60, Liverpool from £60-£90, Preston from £70-£100, Blackpool from £80-£120, Blackburn from £60-£90, and Lancaster from £90-£130. These prices are for a standard minibus carrying 8-16 passengers. Larger coaches for bigger groups will cost more but the per-person price drops significantly.",
      },
      {
        heading: "What to Expect from Your Transfer",
        content:
          "A professional airport transfer service will track your flight and adjust pickup time if your flight is early or delayed. The driver will meet you in the arrivals hall or at an agreed pickup point. Vehicles will have space for all your luggage. For early morning flights, operators typically offer pickups from 3am onwards. For return transfers, the driver will drop you at the departure terminal entrance. Most operators accept online booking and payment in advance.",
      },
      {
        heading: "Group Sizes and Vehicle Options",
        content:
          "For airport transfers, the most popular vehicle sizes are: 8-seater minibuses ideal for families or small groups with plenty of luggage room, 16-seater minibuses for medium groups heading on holiday or business trips, and 24-49 seater coaches for large groups such as wedding parties, sports teams, or corporate groups. Executive vehicles are also available for business travel or special occasions.",
      },
    ],
    faq: [
      {
        question: "How far in advance should I book an airport transfer?",
        answer:
          "We recommend booking at least 1-2 weeks in advance. For peak travel periods (school holidays, Christmas, summer), book 3-4 weeks ahead. Most operators accept bookings up to 48 hours before travel.",
      },
      {
        question: "What happens if my flight is delayed?",
        answer:
          "Most professional operators monitor flight arrivals and will adjust your pickup time accordingly at no extra charge. Always provide your flight number when booking so the operator can track it.",
      },
      {
        question: "Can I book a return airport transfer?",
        answer:
          "Yes. Most operators offer discounted rates when you book both outbound and return transfers together. This is the most convenient option as you have transport arranged for both ends of your trip.",
      },
      {
        question: "Do you cover Liverpool John Lennon Airport too?",
        answer:
          "Yes. Many of our listed operators cover both Manchester Airport and Liverpool John Lennon Airport. Prices for Liverpool Airport transfers may differ. Contact operators directly for quotes.",
      },
    ],
    relatedLocations: [
      "manchester",
      "liverpool",
      "bolton",
      "stockport",
      "warrington",
      "preston",
      "blackpool",
    ],
    keywords: [
      "airport transfer manchester",
      "minibus hire manchester airport",
      "airport transfer north west",
    ],
  },
  {
    slug: "wedding-coach-hire-north-west",
    title: "Wedding Coach Hire North West",
    metaTitle:
      "Wedding Coach & Minibus Hire North West | Guest Transport (2026)",
    metaDescription:
      "Find wedding coach and minibus hire in the North West. Transport your guests between ceremony, reception and hotels across Manchester, Liverpool, Cheshire and more.",
    h1: "Wedding Coach & Minibus Hire in the North West",
    intro:
      "Your wedding day transport needs to be reliable, comfortable and stress-free. Whether you need a luxury coach for 50 guests or a minibus shuttle between your ceremony and reception venue, we list wedding transport specialists across the North West. Compare operators, check reviews, and get quotes for your big day.",
    sections: [
      {
        heading: "Why Hire Wedding Transport?",
        content:
          "Arranging group transport for your wedding guests takes the stress out of the day for everyone. No one needs to worry about parking, designated drivers or finding the venue. A coach or minibus can shuttle guests between the ceremony, reception and hotels, keeping your day running on time. It is especially important for North West weddings at rural venues in the Lake District, Cheshire countryside or Lancashire hills where public transport is limited.",
      },
      {
        heading: "Wedding Transport Options",
        content:
          "The most popular wedding transport options in the North West are: luxury coaches seating 30-50 guests, ideal for transporting the majority of your wedding party in style. Standard minibuses seating 16-24 guests are great for smaller weddings or as a shuttle between nearby venues. Executive minibuses with leather seats and tinted windows add a premium feel. Vintage buses are available from some operators for couples wanting a unique, retro look. Many couples book multiple vehicles to cover different routes and pickup points.",
      },
      {
        heading: "Planning Your Wedding Transport",
        content:
          "Start by working out how many guests need transport and where they are coming from. Common arrangements include morning transport from guest hotels to the ceremony venue, an afternoon shuttle from the ceremony to the reception (if at different venues), and an evening return service from the reception to hotels or key drop-off points. Share the transport schedule with guests on your wedding website or with the invitations so everyone knows pickup times and locations.",
      },
      {
        heading: "Popular Wedding Venues and Routes",
        content:
          "The North West has stunning wedding venues from Cheshire country houses to Lake District hotels. Popular routes for wedding coaches include: Manchester city centre hotels to Cheshire venue like Peckforton Castle, Colshaw Hall and Mere Court. Liverpool hotels to Lancashire barn conversions. Preston and Blackpool hotels to Lake District venues. Bolton and Bury to rural settings in the West Pennine Moors. An experienced local operator will know these routes and can advise on timing and logistics.",
      },
      {
        heading: "How Much Does Wedding Transport Cost?",
        content:
          "Wedding coach hire in the North West typically costs £300-£600 for a full-size coach for a half-day service (4-5 hours). A 16-seater minibus for the same period is usually £200-£350. Evening return services (taking guests from the reception to hotels at the end of the night) cost from £150-£300 depending on distance and the number of drop-off points. Many operators offer wedding packages that include ribbons and bows on the vehicle at no extra charge.",
      },
    ],
    faq: [
      {
        question: "How far in advance should I book wedding transport?",
        answer:
          "Book as early as possible, ideally 6-12 months before your wedding date. Popular dates (Saturdays in summer) get booked up quickly. Once you have your venue confirmed, transport should be one of the next things you arrange.",
      },
      {
        question: "Can the coach be decorated for a wedding?",
        answer:
          "Many operators will add ribbons, bows and 'Just Married' signs at no extra cost. Some offer more elaborate decorations. Discuss your requirements when booking and they will do their best to accommodate.",
      },
      {
        question: "What if our ceremony and reception are at the same venue?",
        answer:
          "You may still want transport for guests from their hotels to the venue and back in the evening. A shuttle service at the end of the night ensures guests get home safely and means everyone can enjoy themselves without worrying about driving.",
      },
      {
        question: "Can we make multiple stops?",
        answer:
          "Yes. Most operators are happy to make multiple pickup and drop-off points. For evening returns, a common arrangement is 2-3 hotel drop-offs in the nearest town or city. Discuss your route with the operator to get an accurate quote.",
      },
    ],
    relatedLocations: [
      "manchester",
      "liverpool",
      "chester",
      "bolton",
      "preston",
      "warrington",
      "blackpool",
    ],
    keywords: [
      "wedding coach hire north west",
      "wedding coach hire manchester",
      "wedding minibus hire liverpool",
    ],
  },
];

export const GUIDES: Guide[] =
  getSiteId() === "northwest" ? NW_GUIDES : NE_GUIDES;

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
