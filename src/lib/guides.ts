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

const SC_GUIDES: Guide[] = [
  {
    slug: "party-bus-hire-glasgow",
    title: "Party Bus Hire Glasgow",
    metaTitle: "Party Bus Hire Glasgow | Prices, Tips & Top Companies (2026)",
    metaDescription:
      "Find the best party bus hire in Glasgow. Compare prices, see top-rated companies, and book your party bus for hen dos, birthdays, stag nights and more.",
    h1: "Party Bus Hire in Glasgow & Scotland",
    intro:
      "Planning a night out, hen do, stag party or birthday celebration in Glasgow? A party bus is one of the most popular ways to travel in style with your group. We list the top party bus operators across Glasgow and wider Scotland so you can compare prices and book with confidence.",
    sections: [
      {
        heading: "What Is a Party Bus?",
        content:
          "A party bus is a converted coach or large minibus fitted with sound systems, LED lighting, comfortable seating and sometimes even a dance floor or bar area. They typically carry between 16 and 50 passengers, making them perfect for large groups heading out in Glasgow city centre, Sauchiehall Street, Merchant City or Ashton Lane in the West End.",
      },
      {
        heading: "How Much Does Party Bus Hire Cost in Glasgow?",
        content:
          "Party bus hire prices in Glasgow typically start from around £180-£280 for a 2-3 hour city centre tour with a standard party bus. Larger or more luxurious vehicles with premium sound systems and lighting can cost £350-£550+ for an evening. Prices vary depending on the day of the week, time of year, group size, and the specific vehicle. Weekend bookings (Friday and Saturday nights) are the most popular and tend to cost more. Most operators offer packages that include pick-up and drop-off at agreed locations around Glasgow and the surrounding areas.",
      },
      {
        heading: "Popular Party Bus Routes in Glasgow",
        content:
          "The most popular party bus routes in Glasgow include pick-ups from residential areas across the city followed by a tour through the centre. Many groups use a party bus as transport to start a night out on Sauchiehall Street, in Merchant City, or along Bath Street and its popular bars and clubs. Other popular routes include tours through the West End taking in Ashton Lane and Byres Road, trips along the Clydeside past the SEC and Hydro, or longer trips combining Glasgow with Edinburgh nightlife via the M8 motorway.",
      },
      {
        heading: "Best Occasions for a Party Bus",
        content:
          "Party buses in Glasgow are most commonly booked for hen parties and hen dos, stag nights, milestone birthdays (especially 18th, 21st, 30th and 40th), Christmas party nights and office celebrations, prom nights for school leavers, race day transport to Hamilton Park Racecourse, and match day travel to Celtic Park, Ibrox Stadium or Hampden Park. Whatever the occasion, booking early is recommended as the best vehicles get booked up quickly, particularly during summer months and the Christmas party season.",
      },
      {
        heading: "Choosing the Right Party Bus Company",
        content:
          "When comparing party bus hire companies in Glasgow, check their Google reviews and ratings, ask about the specific vehicle you will get (photos are essential), confirm what is included in the price such as music, lighting and any refreshments, check their cancellation policy and payment terms, and make sure they have appropriate insurance and licensing. All operators listed on our directory have been verified with up-to-date contact details and genuine customer reviews.",
      },
    ],
    faq: [
      {
        question: "How many people can fit on a party bus?",
        answer:
          "Most party buses in Glasgow accommodate between 16 and 50 passengers. The most common sizes are 16-seater and 24-seater party buses. For larger groups, some operators offer full-size coach conversions that seat up to 50 people.",
      },
      {
        question: "Can you bring your own drinks on a party bus?",
        answer:
          "This depends on the operator. Many Glasgow party bus companies allow you to bring your own non-glass drinks (cans and plastic bottles). Some offer packages that include drinks. Always check with the operator before booking.",
      },
      {
        question: "How far in advance should I book a party bus?",
        answer:
          "We recommend booking at least 4-6 weeks in advance for weekend bookings. During peak season (December, summer weekends), booking 2-3 months ahead is advisable to get your preferred vehicle.",
      },
      {
        question: "Are party buses available in other Scottish cities?",
        answer:
          "Yes. Party bus operators in our directory also cover Edinburgh, Aberdeen, Dundee, Stirling, Paisley and other Scottish locations. Many Glasgow-based operators will pick up from across the Central Belt and beyond.",
      },
    ],
    relatedLocations: [
      "glasgow",
      "edinburgh",
      "paisley",
      "hamilton",
      "motherwell",
      "kilmarnock",
    ],
    keywords: [
      "party bus glasgow",
      "party bus hire glasgow",
      "party bus hire scotland",
    ],
  },
  {
    slug: "self-drive-minibus-hire-scotland",
    title: "Self-Drive Minibus Hire Scotland",
    metaTitle:
      "Self-Drive Minibus Hire Scotland | No Driver Needed (2026)",
    metaDescription:
      "Hire a self-drive minibus in Scotland. Compare 9-17 seater minibuses you can drive yourself across Glasgow, Edinburgh, Aberdeen, Dundee and Inverness.",
    h1: "Self-Drive Minibus Hire in Scotland",
    intro:
      "Need a minibus but want to drive it yourself? Self-drive minibus hire is a cost-effective option for groups who have a confident driver with a standard UK driving licence. We list self-drive minibus operators across Scotland including Glasgow, Edinburgh, Aberdeen, Dundee, Inverness and beyond.",
    sections: [
      {
        heading: "What Licence Do You Need?",
        content:
          "You can drive a minibus on a standard Category B car licence if the vehicle has no more than 8 passenger seats (plus the driver) and a Maximum Authorised Mass (MAM) of no more than 3,500kg. For larger minibuses with 9-16 passenger seats, you may need a D1 licence category. If you passed your driving test before 1 January 1997, you should already have the D1 category on your licence. Drivers who passed after this date will need to check their licence or consider a smaller vehicle. Always confirm licence requirements with the hire company before booking.",
      },
      {
        heading: "How Much Does Self-Drive Minibus Hire Cost?",
        content:
          "Self-drive minibus hire in Scotland is significantly cheaper than hiring with a driver. A 9-seater minibus typically costs £90-£160 per day, while larger 12-15 seater vehicles range from £130-£220 per day. Weekend rates and weekly hire often offer better value, and longer hires for Highland touring trips are popular. Most operators require a security deposit (usually £250-£500) and you will need to arrange your own insurance or pay for the operator's cover. Fuel is not usually included, so factor in the cost for longer Scottish journeys on routes like the A9 to Inverness or the M8 between Glasgow and Edinburgh.",
      },
      {
        heading: "Popular Self-Drive Minibus Sizes",
        content:
          "The most popular self-drive minibuses in Scotland are 9-seater minibuses which are the largest you can drive on a standard car licence and are ideal for family trips, airport runs, and Highland touring holidays. 12-seater minibuses are popular for sports teams and medium groups but require a D1 licence. 15-17 seater minibuses are the largest self-drive option and are perfect for larger groups, events and longer trips across Scotland. They require a D1 licence category.",
      },
      {
        heading: "What to Check Before Hiring",
        content:
          "Before booking a self-drive minibus, confirm you have the correct driving licence category, check the insurance cover and excess amount, ask about mileage limits as some operators include unlimited mileage while others charge per mile after a set allowance, check the fuel policy (most are full-to-full), inspect the vehicle for any existing damage before driving away, and confirm pick-up and return times to avoid late fees. If you plan to drive in the Highlands, check whether the vehicle is suitable for single-track roads.",
      },
      {
        heading: "Self-Drive vs Driven Minibus Hire",
        content:
          "Self-drive hire is typically 40-60% cheaper than hiring a minibus with a professional driver. It gives you complete flexibility over your schedule and route, which is ideal for touring Scotland at your own pace. However, driven hire means everyone in the group can relax and enjoy the scenery on routes like the A82 through Glencoe or the NC500, the driver knows the local roads including tricky Highland passes, and there is no need to worry about parking a large vehicle in busy city centres like Edinburgh or Glasgow. For nights out and events involving alcohol, hiring with a driver is the obvious choice.",
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
          "Where can I pick up a self-drive minibus in Scotland?",
        answer:
          "Self-drive minibus operators are based across Scotland including Glasgow, Edinburgh, Aberdeen, Dundee, Inverness, Stirling, Perth and Falkirk. Some offer delivery and collection of the vehicle to your address or to airports including Glasgow and Edinburgh Airport.",
      },
    ],
    relatedLocations: [
      "glasgow",
      "edinburgh",
      "aberdeen",
      "dundee",
      "inverness",
      "stirling",
      "perth",
      "falkirk",
    ],
    keywords: [
      "self drive minibus hire scotland",
      "self drive minibus hire glasgow",
      "self drive minibus hire edinburgh",
    ],
  },
  {
    slug: "16-seater-minibus-hire-scotland",
    title: "16 Seater Minibus Hire Scotland",
    metaTitle:
      "16 Seater Minibus Hire Scotland | Glasgow, Edinburgh & More (2026)",
    metaDescription:
      "Find 16 seater minibus hire across Scotland. Compare prices and operators in Glasgow, Edinburgh, Aberdeen, Dundee, Inverness and surrounding areas.",
    h1: "16 Seater Minibus Hire in Scotland",
    intro:
      "A 16-seater minibus is the most popular size for group travel in Scotland. Whether you need transport for a wedding party, sports team, corporate event or day trip, a 16-seater offers the perfect balance of capacity and comfort. Compare 16-seater minibus operators across Glasgow, Edinburgh, Aberdeen, Dundee, Inverness and the wider region.",
    sections: [
      {
        heading: "Why Choose a 16-Seater Minibus?",
        content:
          "A 16-seater minibus is the most versatile group transport option in Scotland. It is large enough to carry a decent-sized group in comfort but small enough to navigate city streets in Edinburgh's Old Town or Glasgow's city centre and fit into standard car parks. They are typically Mercedes Sprinters or Ford Transit minibuses with high roofs, air conditioning, and luggage space. Many also come with USB charging points and reclining seats, which are particularly welcome on longer Scottish journeys up the A9 to the Highlands.",
      },
      {
        heading: "How Much Does 16-Seater Minibus Hire Cost?",
        content:
          "In Scotland, 16-seater minibus hire with a driver typically costs between £170 and £380 depending on the journey. A local transfer within Glasgow or Edinburgh starts from around £90-£160. A full day hire (8-10 hours) usually costs £280-£450. Airport transfers to Glasgow or Edinburgh Airport are typically £90-£200 depending on distance. Longer journeys such as Glasgow to Inverness or Edinburgh to Aberdeen will cost more due to the distances involved. Prices include a professional driver, insurance and VAT.",
      },
      {
        heading: "Common Uses for 16-Seater Minibuses",
        content:
          "The most common bookings for 16-seater minibuses in Scotland include wedding guest transport between ceremony and reception venues, airport transfers for families and groups flying from Glasgow, Edinburgh or Aberdeen Airport, sports team transport to fixtures across the country, corporate events and conference shuttle services in cities like Glasgow and Edinburgh, school trips and educational visits, nights out in Glasgow, Edinburgh or Aberdeen, and day trips to destinations like Loch Lomond, St Andrews, Stirling Castle or the Trossachs National Park.",
      },
      {
        heading: "What to Look For in an Operator",
        content:
          "When booking a 16-seater minibus in Scotland, look for operators with strong Google reviews and a track record of reliability. Check that the price includes everything with no hidden fees for waiting time, tolls such as the Forth Road Bridge area, or parking charges. Confirm the vehicle type and age, as newer minibuses offer better comfort and safety features for Scottish weather conditions. Professional operators will have full PSV licensing, comprehensive insurance, and PVG-checked drivers (Scotland's equivalent of DBS checks).",
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
      "glasgow",
      "edinburgh",
      "aberdeen",
      "dundee",
      "inverness",
      "stirling",
      "perth",
      "falkirk",
    ],
    keywords: [
      "16 seater minibus hire scotland",
      "16 seater minibus hire glasgow",
      "16 seater minibus hire edinburgh",
    ],
  },
  {
    slug: "airport-transfers-scotland",
    title: "Airport Transfers Scotland",
    metaTitle:
      "Airport Transfers Scotland | Glasgow, Edinburgh & Aberdeen Airport Minibus & Coach (2026)",
    metaDescription:
      "Book airport transfer minibuses and coaches in Scotland. Group transport to Glasgow Airport, Edinburgh Airport and Aberdeen Airport from across Scotland.",
    h1: "Airport Transfers & Minibus Hire for Scottish Airports",
    intro:
      "Travelling to or from a Scottish airport with a group? A minibus or coach transfer is the most convenient and cost-effective option. We list operators across Scotland who specialise in airport transfers to Glasgow Airport, Edinburgh Airport and Aberdeen Airport, from executive cars to 50-seater coaches. Compare prices and book your group airport transport.",
    sections: [
      {
        heading: "Why Book a Group Airport Transfer?",
        content:
          "When travelling with family, friends or colleagues, a group airport transfer makes much more sense than multiple taxis or trying to arrange lifts. A single minibus can carry your entire group plus luggage, arriving together and avoiding the stress of coordinating multiple vehicles. It is also significantly cheaper per person than individual taxis, especially from destinations further afield like Inverness, Dundee or the Highlands heading to Glasgow or Edinburgh Airport.",
      },
      {
        heading: "Typical Airport Transfer Prices",
        content:
          "Airport transfer prices from key Scottish locations to the main airports are approximately: Glasgow city centre to Glasgow Airport from £35-£55, Edinburgh city centre to Edinburgh Airport from £30-£50, Paisley to Glasgow Airport from £25-£40, Stirling to Glasgow or Edinburgh Airport from £70-£100, Perth to Edinburgh Airport from £80-£110, Dundee to Edinburgh or Aberdeen Airport from £90-£130, Aberdeen city centre to Aberdeen Airport from £30-£50, and Inverness to Inverness Airport from £25-£40. These prices are for a standard minibus carrying 8-16 passengers.",
      },
      {
        heading: "What to Expect from Your Transfer",
        content:
          "A professional airport transfer service will track your flight and adjust pickup time if your flight is early or delayed. The driver will meet you in the arrivals hall or at an agreed pickup point. Vehicles will have space for all your luggage. For early morning flights, operators typically offer pickups from 3am onwards. For return transfers, the driver will drop you at the departure terminal entrance. Most operators accept online booking and payment in advance.",
      },
      {
        heading: "Scotland's Main Airports",
        content:
          "Scotland is served by several airports. Glasgow Airport is located in Paisley, around 8 miles west of Glasgow city centre. Edinburgh Airport is situated near Ingliston, about 8 miles west of Edinburgh city centre, and is Scotland's busiest airport. Aberdeen Airport serves the north-east of Scotland. Inverness Airport serves the Highlands and is growing in popularity for tourists. Operators listed in our directory cover transfers to all of these airports from locations across Scotland.",
      },
    ],
    faq: [
      {
        question: "How far in advance should I book an airport transfer?",
        answer:
          "We recommend booking at least 1-2 weeks in advance. For peak travel periods (school holidays, Christmas, Edinburgh Festival season in August), book 3-4 weeks ahead. Most operators accept bookings up to 48 hours before travel.",
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
        question: "Do you cover all Scottish airports?",
        answer:
          "Yes. Operators in our directory cover Glasgow Airport, Edinburgh Airport, Aberdeen Airport and Inverness Airport. Some also cover smaller airports such as Dundee and Prestwick. Contact operators directly for quotes to any Scottish airport.",
      },
    ],
    relatedLocations: [
      "glasgow",
      "edinburgh",
      "aberdeen",
      "paisley",
      "stirling",
      "perth",
      "dundee",
      "inverness",
      "falkirk",
    ],
    keywords: [
      "airport transfer scotland",
      "minibus hire glasgow airport",
      "minibus hire edinburgh airport",
      "airport transfer aberdeen",
    ],
  },
  {
    slug: "wedding-coach-hire-scotland",
    title: "Wedding Coach Hire Scotland",
    metaTitle:
      "Wedding Coach & Minibus Hire Scotland | Guest Transport (2026)",
    metaDescription:
      "Find wedding coach and minibus hire in Scotland. Transport your guests between ceremony, reception and hotels across Glasgow, Edinburgh, Loch Lomond, the Highlands and more.",
    h1: "Wedding Coach & Minibus Hire in Scotland",
    intro:
      "Your wedding day transport needs to be reliable, comfortable and stress-free. Whether you need a luxury coach for 50 guests or a minibus shuttle between your ceremony and reception venue, we list wedding transport specialists across Scotland. Compare operators, check reviews, and get quotes for your big day.",
    sections: [
      {
        heading: "Why Hire Wedding Transport?",
        content:
          "Arranging group transport for your wedding guests takes the stress out of the day for everyone. No one needs to worry about parking, designated drivers or finding the venue. A coach or minibus can shuttle guests between the ceremony, reception and hotels, keeping your day running on time. It is especially important for Scottish weddings at rural venues around Loch Lomond, in the Highlands, in Perthshire or along the Ayrshire coast where public transport is limited and single-track roads can be challenging for unfamiliar drivers.",
      },
      {
        heading: "Wedding Transport Options",
        content:
          "The most popular wedding transport options in Scotland are: luxury coaches seating 30-50 guests, ideal for transporting the majority of your wedding party in style. Standard minibuses seating 16-24 guests are great for smaller weddings or as a shuttle between nearby venues. Executive minibuses with leather seats and tinted windows add a premium feel. Vintage buses and classic Scottish coaches are available from some operators for couples wanting a unique, characterful look to complement a traditional Scottish wedding. Many couples book multiple vehicles to cover different routes and pickup points across the Central Belt and beyond.",
      },
      {
        heading: "Planning Your Wedding Transport",
        content:
          "Start by working out how many guests need transport and where they are coming from. Common arrangements include morning transport from guest hotels to the ceremony venue, an afternoon shuttle from the ceremony to the reception (if at different venues), and an evening return service from the reception to hotels or key drop-off points. Scotland's geography means distances can be significant, so plan routes carefully, particularly for Highland venues accessible via the A9 or A82. Share the transport schedule with guests on your wedding website or with the invitations so everyone knows pickup times and locations.",
      },
      {
        heading: "Popular Wedding Venues and Routes",
        content:
          "Scotland is renowned for its breathtaking wedding venues, from historic castles to lochside hotels. Popular routes for wedding coaches include Glasgow and Edinburgh city centre hotels to Loch Lomond venues, Edinburgh hotels to Perthshire venues like Gleneagles and Crieff Hydro, Glasgow to Ayrshire coastal venues around Turnberry, Edinburgh hotels to venues near Stirling Castle and the Trossachs, and city centre hotels to Highland estate venues accessed via the A9. An experienced local operator will know these routes well and can advise on timing and logistics for your specific venues.",
      },
      {
        heading: "How Much Does Wedding Transport Cost?",
        content:
          "Wedding coach hire in Scotland typically costs £350-£650 for a full-size coach for a half-day service (4-5 hours). A 16-seater minibus for the same period is usually £220-£380. Evening return services cost from £170-£350 depending on distance and the number of drop-off points. Longer transfers to Highland venues will be at the higher end of these ranges. Many operators offer wedding packages that include ribbons, bows and clan tartan touches on the vehicle at no extra charge.",
      },
    ],
    faq: [
      {
        question:
          "How far in advance should I book wedding transport?",
        answer:
          "Book as early as possible, ideally 6-12 months before your wedding date. Popular dates (Saturdays in summer, particularly during the peak Scottish wedding season from May to September) get booked up quickly. Once you have your venue confirmed, transport should be one of the next things you arrange.",
      },
      {
        question: "Can the coach be decorated for a wedding?",
        answer:
          "Many operators will add ribbons, bows and 'Just Married' signs at no extra cost. Some Scottish operators also offer tartan ribbon or thistle decorations for a traditional touch. Discuss your requirements when booking.",
      },
      {
        question: "What if our ceremony and reception are at the same venue?",
        answer:
          "You may still want transport for guests from their hotels to the venue and back in the evening. A shuttle service at the end of the night ensures guests get home safely, which is particularly important for remote Scottish venues where taxis are scarce.",
      },
      {
        question: "Can we make multiple stops?",
        answer:
          "Yes. Most operators are happy to make multiple pickup and drop-off points. For evening returns, a common arrangement is 2-3 hotel drop-offs in the nearest city such as Glasgow, Edinburgh or Perth. Discuss your route with the operator to get an accurate quote.",
      },
    ],
    relatedLocations: [
      "glasgow",
      "edinburgh",
      "stirling",
      "perth",
      "ayr",
      "inverness",
      "dundee",
      "falkirk",
      "greenock",
    ],
    keywords: [
      "wedding coach hire scotland",
      "wedding coach hire glasgow",
      "wedding minibus hire edinburgh",
      "wedding transport loch lomond",
    ],
  },
];

const ML_GUIDES: Guide[] = [
  {
    slug: "party-bus-hire-birmingham",
    title: "Party Bus Hire Birmingham",
    metaTitle: "Party Bus Hire Birmingham | Prices, Tips & Top Companies (2026)",
    metaDescription:
      "Find the best party bus hire in Birmingham. Compare prices, see top-rated companies, and book your party bus for hen dos, birthdays, stag nights and more.",
    h1: "Party Bus Hire in Birmingham & the Midlands",
    intro:
      "Planning a night out, hen do, stag party or birthday celebration in Birmingham? A party bus is one of the most exciting ways to travel with your group across the UK's second city. We list the top party bus operators across Birmingham and the wider Midlands so you can compare prices and book with confidence.",
    sections: [
      {
        heading: "What Is a Party Bus?",
        content:
          "A party bus is a converted coach or large minibus fitted with sound systems, LED lighting, comfortable seating and sometimes even a dance floor or bar area. They typically carry between 16 and 50 passengers, making them perfect for large groups heading out in Birmingham city centre, Broad Street, Brindleyplace, the Jewellery Quarter or Digbeth.",
      },
      {
        heading: "How Much Does Party Bus Hire Cost in Birmingham?",
        content:
          "Party bus hire prices in Birmingham typically start from around £175-£275 for a 2-3 hour city centre tour with a standard party bus. Larger or more luxurious vehicles with premium sound systems, laser lighting and karaoke can cost £350-£550+ for an evening. Prices vary depending on the day of the week, time of year, group size, and the specific vehicle. Weekend bookings (Friday and Saturday nights) are the most popular and tend to cost more.",
      },
      {
        heading: "Popular Party Bus Routes in Birmingham",
        content:
          "The most popular party bus routes in Birmingham include pick-ups from residential areas across the West Midlands followed by a cruise through the city centre. Many groups use a party bus as transport to kick off a night out on Broad Street, around Brindleyplace, in the Jewellery Quarter or down in Digbeth's club scene. Other popular routes include tours through Moseley and Kings Heath, trips to Solihull or Sutton Coldfield, or longer party runs combining Birmingham with stops in Wolverhampton or Coventry.",
      },
      {
        heading: "Best Occasions for a Party Bus",
        content:
          "Party buses in Birmingham are most commonly booked for hen parties and hen dos, stag nights, milestone birthdays (especially 18th, 21st, 30th and 40th), Christmas party nights and office celebrations, prom nights for school leavers, race day transport to Wolverhampton Racecourse, and match day celebrations around Villa Park or St Andrew's. Whatever the occasion, booking early is recommended as the best vehicles get booked up quickly.",
      },
      {
        heading: "Choosing the Right Party Bus Company",
        content:
          "When comparing party bus hire companies in Birmingham, check their Google reviews and ratings, ask about the specific vehicle you will get (photos are essential), confirm what is included in the price such as music, lighting and any refreshments, check their cancellation policy and payment terms, and make sure they have appropriate insurance and licensing. Birmingham has a competitive party bus market so it pays to get multiple quotes. All operators listed on our directory have been verified with up-to-date contact details and genuine customer reviews.",
      },
    ],
    faq: [
      {
        question: "How many people can fit on a party bus?",
        answer:
          "Most party buses in Birmingham accommodate between 16 and 50 passengers. The most common sizes are 16-seater and 24-seater party buses. For larger groups, some operators offer full-size coach conversions that seat up to 50 people.",
      },
      {
        question: "Can you bring your own drinks on a party bus?",
        answer:
          "This depends on the operator. Many Birmingham party bus companies allow you to bring your own non-glass drinks (cans and plastic bottles). Some offer packages that include drinks or even a bar service. Always check with the operator before booking.",
      },
      {
        question: "How far in advance should I book a party bus?",
        answer:
          "We recommend booking at least 4-6 weeks in advance for weekend bookings. During peak season (December, summer weekends), booking 2-3 months ahead is advisable to secure your preferred vehicle and date.",
      },
      {
        question: "Are party buses available in other Midlands cities?",
        answer:
          "Yes. Party bus operators in our directory also cover Wolverhampton, Coventry, Nottingham, Leicester, Derby, Solihull, Walsall and other Midlands locations. Many Birmingham-based operators will pick up from across the region.",
      },
    ],
    relatedLocations: [
      "birmingham",
      "wolverhampton",
      "coventry",
      "solihull",
      "walsall",
      "dudley",
      "stoke-on-trent",
    ],
    keywords: [
      "party bus birmingham",
      "party bus hire birmingham",
      "party bus hire midlands",
    ],
  },
  {
    slug: "self-drive-minibus-hire-midlands",
    title: "Self-Drive Minibus Hire Midlands",
    metaTitle:
      "Self-Drive Minibus Hire Midlands | No Driver Needed (2026)",
    metaDescription:
      "Hire a self-drive minibus in the Midlands. Compare 9-17 seater minibuses you can drive yourself across Birmingham, Nottingham, Leicester, Coventry, Derby and more.",
    h1: "Self-Drive Minibus Hire in the Midlands",
    intro:
      "Need a minibus but want to drive it yourself? Self-drive minibus hire is a cost-effective option for groups who have a confident driver with a standard UK driving licence. We list self-drive minibus operators across the Midlands including Birmingham, Nottingham, Leicester, Coventry, Derby, Wolverhampton and beyond.",
    sections: [
      {
        heading: "What Licence Do You Need?",
        content:
          "You can drive a minibus on a standard Category B car licence if the vehicle has no more than 8 passenger seats (plus the driver) and a Maximum Authorised Mass (MAM) of no more than 3,500kg. For larger minibuses with 9-16 passenger seats, you may need a D1 licence category. If you passed your driving test before 1 January 1997, you should already have the D1 category on your licence. Drivers who passed after this date will need to check their licence or consider a smaller vehicle. Always confirm licence requirements with the hire company before booking.",
      },
      {
        heading: "How Much Does Self-Drive Minibus Hire Cost?",
        content:
          "Self-drive minibus hire in the Midlands is significantly cheaper than hiring with a driver. A 9-seater minibus typically costs £85-£160 per day, while larger 12-15 seater vehicles range from £130-£220 per day. Weekend rates and weekly hire often offer better value, with weekly rates starting from around £400 for a 9-seater. Most operators require a security deposit (usually £250-£500) and you will need to arrange your own insurance or pay for the operator's cover. Fuel is not usually included.",
      },
      {
        heading: "Popular Self-Drive Minibus Sizes",
        content:
          "The most popular self-drive minibuses in the Midlands are 9-seater minibuses which are the largest you can drive on a standard car licence and are ideal for family trips, airport runs to Birmingham or East Midlands Airport, and small group outings. 12-seater minibuses are popular for sports teams and medium groups but require a D1 licence. 15-17 seater minibuses are the largest self-drive option and are perfect for larger groups, events and longer trips across the region. They require a D1 licence category.",
      },
      {
        heading: "What to Check Before Hiring",
        content:
          "Before booking a self-drive minibus, confirm you have the correct driving licence category, check the insurance cover and excess amount, ask about mileage limits as some operators include unlimited mileage while others charge per mile, check the fuel policy (most are full-to-full), inspect the vehicle for any existing damage before driving away, and confirm pick-up and return times to avoid late fees. Many Midlands operators have depots near major routes like the M6 or M42, making collection convenient.",
      },
      {
        heading: "Self-Drive vs Driven Minibus Hire",
        content:
          "Self-drive hire is typically 40-60% cheaper than hiring a minibus with a professional driver. It gives you complete flexibility over your schedule and route, which is a real advantage in the Midlands where you might want to explore the Peak District, Warwickshire villages or Shropshire countryside at your own pace. However, driven hire means everyone in the group can relax and enjoy themselves, the driver knows the local roads, and there is no need to worry about parking a large vehicle in busy city centres like Birmingham or Nottingham. For nights out and events involving alcohol, hiring with a driver is the obvious choice.",
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
          "Basic insurance is usually included but with a high excess (£500-£1,000). Many operators offer additional cover to reduce the excess for an extra daily fee. You can also arrange your own hire vehicle insurance separately.",
      },
      {
        question:
          "Where can I pick up a self-drive minibus in the Midlands?",
        answer:
          "Self-drive minibus operators are based across the Midlands including Birmingham, Nottingham, Leicester, Coventry, Derby, Wolverhampton, Stoke-on-Trent and Northampton. Some offer delivery and collection of the vehicle to your address for an additional fee.",
      },
    ],
    relatedLocations: [
      "birmingham",
      "nottingham",
      "leicester",
      "coventry",
      "derby",
      "wolverhampton",
      "stoke-on-trent",
      "northampton",
    ],
    keywords: [
      "self drive minibus hire midlands",
      "self drive minibus hire birmingham",
      "self drive minibus hire nottingham",
    ],
  },
  {
    slug: "16-seater-minibus-hire-midlands",
    title: "16 Seater Minibus Hire Midlands",
    metaTitle:
      "16 Seater Minibus Hire Midlands | Birmingham, Nottingham & More (2026)",
    metaDescription:
      "Find 16 seater minibus hire across the Midlands. Compare prices and operators in Birmingham, Nottingham, Leicester, Coventry, Derby and surrounding areas.",
    h1: "16 Seater Minibus Hire in the Midlands",
    intro:
      "A 16-seater minibus is the most popular size for group travel in the Midlands. Whether you need transport for a wedding party, sports team, corporate event or day trip, a 16-seater offers the perfect balance of capacity and comfort. Compare 16-seater minibus operators across Birmingham, Nottingham, Leicester, Coventry, Derby and the wider region.",
    sections: [
      {
        heading: "Why Choose a 16-Seater Minibus?",
        content:
          "A 16-seater minibus is the most versatile group transport option. It is large enough to carry a decent-sized group in comfort but small enough to navigate city streets and fit into standard car parks. They are typically Mercedes Sprinters or Ford Transit minibuses with high roofs, air conditioning, and luggage space. Many also come with USB charging points, reclining seats and tinted windows for longer journeys across the Midlands motorway network.",
      },
      {
        heading: "How Much Does 16-Seater Minibus Hire Cost?",
        content:
          "In the Midlands, 16-seater minibus hire with a driver typically costs between £160 and £380 depending on the journey. A local transfer within Birmingham, Nottingham or Leicester starts from around £90-£160. A full day hire (8-10 hours) usually costs £275-£425. Airport transfers to Birmingham Airport or East Midlands Airport are typically £90-£200 depending on distance. Prices include a professional driver, insurance and VAT.",
      },
      {
        heading: "Common Uses for 16-Seater Minibuses",
        content:
          "The most common bookings for 16-seater minibuses in the Midlands include wedding guest transport between ceremony and reception venues across Warwickshire and Staffordshire, airport transfers for families and groups heading to Birmingham Airport or East Midlands Airport, sports team transport to fixtures across the region, corporate events and conference shuttle services at the NEC and Ricoh Arena, school trips and educational visits, nights out in Birmingham, Nottingham or Leicester, and day trips to destinations like Alton Towers, Warwick Castle, Chatsworth House or the Cotswolds.",
      },
      {
        heading: "What to Look For in an Operator",
        content:
          "When booking a 16-seater minibus, look for operators with strong Google reviews and a track record of reliability. Check that the price includes everything with no hidden fees for waiting time, motorway tolls or parking charges. Confirm the vehicle type and age, as newer minibuses offer better comfort and safety features. Professional operators will have full PSV licensing, comprehensive insurance, and DBS-checked drivers. The Midlands has a large number of operators so comparing quotes is straightforward.",
      },
      {
        heading: "Coverage Across the Midlands",
        content:
          "Our listed operators cover the entire Midlands region. In the West Midlands, you will find operators based in Birmingham, Wolverhampton, Coventry, Walsall, Dudley, Solihull and Stoke-on-Trent. In the East Midlands, operators are based in Nottingham, Leicester, Derby, Northampton, Lincoln, Chesterfield and Mansfield. The Midlands' central position and motorway connections via the M6, M1, M42, M5, M69 and A38 mean operators can easily reach any part of the region and beyond.",
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
      "birmingham",
      "nottingham",
      "leicester",
      "coventry",
      "derby",
      "wolverhampton",
      "walsall",
      "dudley",
      "solihull",
    ],
    keywords: [
      "16 seater minibus hire birmingham",
      "16 seater minibus hire midlands",
      "16 seater minibus hire nottingham",
    ],
  },
  {
    slug: "airport-transfers-midlands",
    title: "Airport Transfers Midlands",
    metaTitle:
      "Airport Transfers Midlands | Birmingham & East Midlands Airport Minibus & Coach (2026)",
    metaDescription:
      "Book airport transfer minibuses and coaches in the Midlands. Group transport to Birmingham Airport and East Midlands Airport from Nottingham, Leicester, Coventry and beyond.",
    h1: "Airport Transfers & Minibus Hire for Birmingham & East Midlands Airports",
    intro:
      "Travelling to or from Birmingham Airport or East Midlands Airport with a group? A minibus or coach transfer is the most convenient and cost-effective option. We list operators across the Midlands who specialise in airport transfers, from executive cars to 50-seater coaches. Compare prices and book your group airport transport.",
    sections: [
      {
        heading: "Why Book a Group Airport Transfer?",
        content:
          "When travelling with family, friends or colleagues, a group airport transfer makes much more sense than multiple taxis or trying to arrange lifts. A single minibus can carry your entire group plus luggage, arriving together and avoiding the stress of coordinating multiple vehicles. It is also significantly cheaper per person than individual taxis, especially from destinations further afield like Stoke-on-Trent, Lincoln, Northampton or Shrewsbury.",
      },
      {
        heading: "Typical Airport Transfer Prices",
        content:
          "Airport transfer prices from key Midlands locations to Birmingham Airport are approximately: Birmingham city centre from £30-£50, Solihull from £20-£35, Coventry from £40-£65, Wolverhampton from £50-£75, Walsall from £40-£60, Worcester from £60-£90, Stoke-on-Trent from £80-£120. For East Midlands Airport: Nottingham from £35-£55, Derby from £30-£50, Leicester from £45-£70, Chesterfield from £50-£75, Mansfield from £40-£60. These prices are for a standard minibus carrying 8-16 passengers.",
      },
      {
        heading: "What to Expect from Your Transfer",
        content:
          "A professional airport transfer service will track your flight and adjust pickup time if your flight is early or delayed. The driver will meet you in the arrivals hall or at an agreed pickup point. Vehicles will have space for all your luggage. The M42 provides direct motorway access to Birmingham Airport, while the M1 junction 23A serves East Midlands Airport, making transfers straightforward from most Midlands locations. Most operators accept online booking and payment in advance.",
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
        question: "Which airport should I use in the Midlands?",
        answer:
          "Birmingham Airport is the larger of the two with more international routes and is best for groups based in the West Midlands, Warwickshire, Worcestershire and Shropshire. East Midlands Airport serves Nottingham, Derby, Leicester and the surrounding areas and has a strong selection of European and charter flights.",
      },
    ],
    relatedLocations: [
      "birmingham",
      "nottingham",
      "leicester",
      "coventry",
      "derby",
      "wolverhampton",
      "solihull",
      "stoke-on-trent",
      "northampton",
    ],
    keywords: [
      "airport transfer midlands",
      "minibus hire birmingham airport",
      "airport transfer east midlands",
      "minibus hire east midlands airport",
    ],
  },
  {
    slug: "wedding-coach-hire-midlands",
    title: "Wedding Coach Hire Midlands",
    metaTitle:
      "Wedding Coach & Minibus Hire Midlands | Guest Transport (2026)",
    metaDescription:
      "Find wedding coach and minibus hire in the Midlands. Transport your guests between ceremony, reception and hotels across Birmingham, Warwickshire, Staffordshire and more.",
    h1: "Wedding Coach & Minibus Hire in the Midlands",
    intro:
      "Your wedding day transport needs to be reliable, comfortable and stress-free. Whether you need a luxury coach for 50 guests or a minibus shuttle between your ceremony and reception venue, we list wedding transport specialists across the Midlands. Compare operators, check reviews, and get quotes for your big day.",
    sections: [
      {
        heading: "Why Hire Wedding Transport?",
        content:
          "Arranging group transport for your wedding guests takes the stress out of the day for everyone. No one needs to worry about parking, designated drivers or finding the venue. A coach or minibus can shuttle guests between the ceremony, reception and hotels, keeping your day running on time. It is especially important for Midlands weddings at rural venues in the Warwickshire countryside, the Shropshire Hills, the Peak District fringe or the Cotswolds edge where public transport is limited.",
      },
      {
        heading: "Wedding Transport Options",
        content:
          "The most popular wedding transport options in the Midlands are: luxury coaches seating 30-50 guests, standard minibuses seating 16-24 guests, executive minibuses with leather seats and tinted windows, and vintage buses and classic Routemasters for couples wanting a unique retro look. Many couples book multiple vehicles to cover different routes and pickup points across the region.",
      },
      {
        heading: "Planning Your Wedding Transport",
        content:
          "Start by working out how many guests need transport and where they are coming from. Common arrangements include morning transport from guest hotels to the ceremony venue, an afternoon shuttle from the ceremony to the reception (if at different venues), and an evening return service from the reception to hotels or key drop-off points. The Midlands motorway network makes multi-stop routes efficient, with the M6, M42, M5 and M1 connecting the major towns and cities.",
      },
      {
        heading: "Popular Wedding Venues and Routes",
        content:
          "The Midlands has an extraordinary selection of wedding venues from grand stately homes to converted barns and country estates. Popular routes include Birmingham city centre hotels to Warwickshire venues, Nottingham and Derby hotels to Peak District venues, Leicester and Coventry hotels to countryside settings in rural Leicestershire and Northamptonshire, and Wolverhampton to Shropshire venues. An experienced local operator will know these routes and can advise on timing and logistics.",
      },
      {
        heading: "How Much Does Wedding Transport Cost?",
        content:
          "Wedding coach hire in the Midlands typically costs £325-£650 for a full-size coach for a half-day service (4-5 hours). A 16-seater minibus for the same period is usually £225-£375. Evening return services cost from £175-£325 depending on distance and the number of drop-off points. Many operators offer wedding packages that include ribbons and bows on the vehicle at no extra charge.",
      },
    ],
    faq: [
      {
        question: "How far in advance should I book wedding transport?",
        answer:
          "Book as early as possible, ideally 6-12 months before your wedding date. Popular dates (Saturdays in summer) get booked up quickly, and the Midlands has a very busy wedding season. Once you have your venue confirmed, transport should be one of the next things you arrange.",
      },
      {
        question: "Can the coach be decorated for a wedding?",
        answer:
          "Many operators will add ribbons, bows and 'Just Married' signs at no extra cost. Some offer more elaborate decorations including floral garlands and personalised signage. Discuss your requirements when booking.",
      },
      {
        question: "What if our ceremony and reception are at the same venue?",
        answer:
          "You may still want transport for guests from their hotels to the venue and back in the evening. A shuttle service at the end of the night ensures guests get home safely and means everyone can enjoy themselves without worrying about driving on unfamiliar country roads.",
      },
      {
        question: "Can we make multiple stops?",
        answer:
          "Yes. Most operators are happy to make multiple pickup and drop-off points. For evening returns, a common arrangement is 2-3 hotel drop-offs in the nearest town or city such as Birmingham, Coventry, Nottingham or Leicester. Discuss your route with the operator to get an accurate quote.",
      },
    ],
    relatedLocations: [
      "birmingham",
      "nottingham",
      "coventry",
      "leicester",
      "derby",
      "wolverhampton",
      "solihull",
      "stafford",
      "shrewsbury",
      "worcester",
    ],
    keywords: [
      "wedding coach hire midlands",
      "wedding coach hire birmingham",
      "wedding minibus hire midlands",
      "wedding transport warwickshire",
    ],
  },
];

const YK_GUIDES: Guide[] = [
  {
    slug: "party-bus-hire-leeds",
    title: "Party Bus Hire Leeds",
    metaTitle: "Party Bus Hire Leeds | Prices, Tips & Top Companies (2026)",
    metaDescription:
      "Find the best party bus hire in Leeds. Compare prices, see top-rated companies, and book your party bus for hen dos, birthdays, stag nights and more.",
    h1: "Party Bus Hire in Leeds & Yorkshire",
    intro:
      "Planning a night out, hen do, stag party or birthday celebration in Leeds? A party bus is one of the most popular ways to travel in style with your group across Yorkshire's biggest city. We list the top party bus operators across Leeds and the wider Yorkshire region so you can compare prices and book with confidence.",
    sections: [
      {
        heading: "What Is a Party Bus?",
        content:
          "A party bus is a converted coach or large minibus fitted with sound systems, LED lighting, comfortable seating and sometimes even a dance floor or bar area. They typically carry between 16 and 50 passengers, making them perfect for large groups heading out in Leeds city centre, Call Lane, the Headrow or the Northern Quarter.",
      },
      {
        heading: "How Much Does Party Bus Hire Cost in Leeds?",
        content:
          "Party bus hire prices in Leeds typically start from around £150-£250 for a 2-3 hour city centre tour with a standard party bus. Larger or more luxurious vehicles with premium sound systems and lighting can cost £300-£500+ for an evening. Prices vary depending on the day of the week, time of year, group size, and the specific vehicle. Weekend bookings (Friday and Saturday nights) are the most popular and tend to cost more.",
      },
      {
        heading: "Popular Party Bus Routes in Leeds",
        content:
          "The most popular party bus routes in Leeds include pick-ups from residential areas across West Yorkshire followed by a tour through the city centre. Many groups use a party bus as transport to start a night out on Call Lane, around the Headrow or Greek Street. Other popular routes include trips through Headingley, tours around Chapel Allerton and Roundhay, or longer runs combining Leeds with stops in York, Harrogate or Bradford.",
      },
      {
        heading: "Best Occasions for a Party Bus",
        content:
          "Party buses in Leeds are most commonly booked for hen parties and hen dos, stag nights, milestone birthdays (especially 18th, 21st, 30th and 40th), Christmas party nights and office celebrations, prom nights for school leavers, race day transport to York Racecourse or Wetherby Racecourse, and match day travel to Elland Road or Headingley Stadium. Whatever the occasion, booking early is recommended as the best vehicles get booked up quickly.",
      },
      {
        heading: "Choosing the Right Party Bus Company",
        content:
          "When comparing party bus hire companies in Leeds, check their Google reviews and ratings, ask about the specific vehicle you will get (photos are essential), confirm what is included in the price such as music, lighting and any refreshments, check their cancellation policy and payment terms, and make sure they have appropriate insurance and licensing. All operators listed on our directory have been verified with up-to-date contact details and genuine customer reviews.",
      },
    ],
    faq: [
      {
        question: "How many people can fit on a party bus?",
        answer:
          "Most party buses in Leeds accommodate between 16 and 50 passengers. The most common sizes are 16-seater and 24-seater party buses. For larger groups, some operators offer full-size coach conversions that seat up to 50 people.",
      },
      {
        question: "Can you bring your own drinks on a party bus?",
        answer:
          "This depends on the operator. Many Leeds party bus companies allow you to bring your own non-glass drinks (cans and plastic bottles). Some offer packages that include drinks. Always check with the operator before booking.",
      },
      {
        question: "How far in advance should I book a party bus?",
        answer:
          "We recommend booking at least 4-6 weeks in advance for weekend bookings. During peak season (December, summer weekends), booking 2-3 months ahead is advisable to secure your preferred vehicle and date.",
      },
      {
        question: "Are party buses available in other Yorkshire cities?",
        answer:
          "Yes. Party bus operators in our directory also cover Sheffield, York, Hull, Bradford, Huddersfield, Wakefield, Harrogate and other Yorkshire locations. Many Leeds-based operators will pick up from across the region.",
      },
    ],
    relatedLocations: [
      "leeds",
      "bradford",
      "wakefield",
      "huddersfield",
      "harrogate",
      "york",
      "sheffield",
    ],
    keywords: [
      "party bus leeds",
      "party bus hire leeds",
      "party bus hire yorkshire",
    ],
  },
  {
    slug: "self-drive-minibus-hire-yorkshire",
    title: "Self-Drive Minibus Hire Yorkshire",
    metaTitle:
      "Self-Drive Minibus Hire Yorkshire | No Driver Needed (2026)",
    metaDescription:
      "Hire a self-drive minibus in Yorkshire. Compare 9-17 seater minibuses you can drive yourself across Leeds, Sheffield, York, Hull, Bradford and more.",
    h1: "Self-Drive Minibus Hire in Yorkshire",
    intro:
      "Need a minibus but want to drive it yourself? Self-drive minibus hire is a cost-effective option for groups who have a confident driver with a standard UK driving licence. We list self-drive minibus operators across Yorkshire including Leeds, Sheffield, York, Hull, Bradford, Harrogate and beyond.",
    sections: [
      {
        heading: "What Licence Do You Need?",
        content:
          "You can drive a minibus on a standard Category B car licence if the vehicle has no more than 8 passenger seats (plus the driver) and a Maximum Authorised Mass (MAM) of no more than 3,500kg. For larger minibuses with 9-16 passenger seats, you may need a D1 licence category. If you passed your driving test before 1 January 1997, you should already have the D1 category on your licence. Drivers who passed after this date will need to check their licence or consider a smaller vehicle.",
      },
      {
        heading: "How Much Does Self-Drive Minibus Hire Cost?",
        content:
          "Self-drive minibus hire in Yorkshire is significantly cheaper than hiring with a driver. A 9-seater minibus typically costs £80-£150 per day, while larger 12-15 seater vehicles range from £120-£200 per day. Weekend rates and weekly hire often offer better value, with weekly rates starting from around £380 for a 9-seater. Most operators require a security deposit (usually £250-£500) and you will need to arrange your own insurance or pay for the operator's cover.",
      },
      {
        heading: "Where Can I Hire a Self-Drive Minibus in Yorkshire?",
        content:
          "Self-drive minibus hire is available across Yorkshire. The largest number of operators are based in Leeds, Sheffield and Bradford, but you will also find self-drive options in York, Hull, Doncaster, Huddersfield, Harrogate and Wakefield. Many operators will deliver the vehicle to your address or a convenient pick-up point for an additional fee.",
      },
      {
        heading: "What to Check Before Hiring",
        content:
          "Before booking a self-drive minibus in Yorkshire, confirm the mileage allowance (some operators include unlimited mileage while others charge per mile after a set limit), check the fuel policy (most operate on a full-to-full basis), understand the insurance excess and what is covered, ask about breakdown cover, and inspect the vehicle for any existing damage before driving away. Taking photos of the vehicle at collection is always a good idea.",
      },
      {
        heading: "Popular Uses for Self-Drive Minibus Hire",
        content:
          "Self-drive minibuses in Yorkshire are commonly hired for family days out to the Yorkshire Dales, Peak District or coast, group trips to York or Whitby, sports team transport, wedding guest transfers, festival and event transport, airport runs to Leeds Bradford Airport or Manchester Airport, and weekend getaways. The flexibility of driving yourself means you can plan your own itinerary and make stops wherever you like.",
      },
    ],
    faq: [
      {
        question: "Can I drive a 12-seater minibus on a car licence?",
        answer:
          "It depends on when you passed your driving test. If you passed before 1 January 1997, your licence likely includes the D1 category which allows you to drive minibuses with up to 16 passenger seats. If you passed after this date, you can only drive vehicles with up to 8 passenger seats on a standard car licence.",
      },
      {
        question: "What age do I need to be to hire a self-drive minibus?",
        answer:
          "Most Yorkshire minibus hire companies require the driver to be at least 25 years old with a minimum of 2 years driving experience. Some operators may accept drivers from age 21 with higher deposits or insurance excesses.",
      },
      {
        question: "Is fuel included in self-drive minibus hire?",
        answer:
          "No, fuel is almost never included. Most operators use a full-to-full fuel policy, meaning you collect the vehicle with a full tank and return it full. You are responsible for fuel costs during your hire period.",
      },
      {
        question: "Can I take a self-drive minibus outside Yorkshire?",
        answer:
          "Yes, most operators allow travel anywhere within the UK. However, taking the vehicle abroad typically requires special permission and additional insurance. Always check with the operator before booking if you plan to travel outside Yorkshire.",
      },
    ],
    relatedLocations: [
      "leeds",
      "sheffield",
      "bradford",
      "york",
      "hull",
      "huddersfield",
      "doncaster",
    ],
    keywords: [
      "self drive minibus hire yorkshire",
      "self drive minibus hire leeds",
      "self drive minibus yorkshire",
      "self drive minibus hire west yorkshire",
      "self drive minibus hire south yorkshire",
    ],
  },
  {
    slug: "airport-transfers-yorkshire",
    title: "Airport Transfer Minibus Hire Yorkshire",
    metaTitle:
      "Airport Transfer Minibus Hire Yorkshire | Leeds Bradford & Manchester (2026)",
    metaDescription:
      "Book airport transfer minibus hire across Yorkshire. Group transfers to Leeds Bradford Airport, Manchester Airport, Doncaster Sheffield and more.",
    h1: "Airport Transfer Minibus Hire in Yorkshire",
    intro:
      "Travelling as a group to or from the airport? Booking a minibus for your airport transfer is often cheaper, more convenient and less stressful than multiple taxis or trying to coordinate cars. We list minibus and coach operators across Yorkshire who specialise in airport transfers to Leeds Bradford, Manchester, Doncaster Sheffield and other airports.",
    sections: [
      {
        heading: "Which Airports Serve Yorkshire?",
        content:
          "The main airports serving Yorkshire are Leeds Bradford Airport (the closest for most of West and North Yorkshire), Manchester Airport (a major international hub with excellent motorway links via the M62), and Doncaster Sheffield Airport. For travellers in East Yorkshire and Hull, Humberside Airport is also an option. Manchester Airport is particularly popular for long-haul flights, while Leeds Bradford handles a wide range of European and domestic destinations.",
      },
      {
        heading: "How Much Does an Airport Transfer Minibus Cost?",
        content:
          "Airport transfer prices from Yorkshire vary depending on the pick-up location, airport, group size and time of travel. A 8-seater minibus from Leeds to Leeds Bradford Airport typically costs £40-£70, while a transfer from Leeds to Manchester Airport ranges from £120-£200 for a standard minibus. Larger 16-seater vehicles cost more, but when split between the group the per-person cost is often less than a standard taxi. Early morning and late night transfers may carry a small surcharge.",
      },
      {
        heading: "Why Choose a Minibus for Airport Transfers?",
        content:
          "A minibus airport transfer offers several advantages over taxis or public transport. The whole group travels together with all luggage in one vehicle, the cost per person is typically lower than individual taxis, you get a door-to-door service with a professional driver, and there is no worry about parking charges or leaving a car at the airport for the duration of your trip. Most operators will track your flight and adjust pick-up times if your arrival is delayed.",
      },
      {
        heading: "Popular Airport Transfer Routes",
        content:
          "The most popular airport transfer routes in Yorkshire include Leeds to Leeds Bradford Airport, Sheffield to Manchester Airport, York to Leeds Bradford Airport, Bradford to Leeds Bradford Airport, Harrogate to Leeds Bradford Airport, Hull to Humberside Airport, and Doncaster to Doncaster Sheffield Airport. Many operators also provide transfers to more distant airports including Newcastle, East Midlands and London airports for larger groups.",
      },
      {
        heading: "Booking Your Airport Transfer",
        content:
          "We recommend booking your airport transfer minibus at least one week in advance, and earlier during peak holiday periods. When booking, provide your flight details so the operator can monitor arrivals, confirm the number of passengers and how much luggage you have, agree a meeting point (most operators will meet you in arrivals or at a designated pick-up point), and confirm whether the quoted price includes waiting time in case of flight delays.",
      },
    ],
    faq: [
      {
        question: "How far in advance should I book an airport transfer?",
        answer:
          "We recommend booking at least 1-2 weeks ahead, especially for early morning departures or during school holiday periods. Last-minute bookings may be possible but availability is not guaranteed.",
      },
      {
        question: "What happens if my flight is delayed?",
        answer:
          "Most airport transfer operators in Yorkshire monitor flight arrivals and will adjust your pick-up time if your flight is delayed. It is worth confirming this when booking and providing your flight number.",
      },
      {
        question: "Can a minibus fit all our luggage?",
        answer:
          "Standard minibuses have a luggage area, but space varies by vehicle. When booking, let the operator know exactly how many suitcases, carry-ons and any oversized items you have so they can provide an appropriately sized vehicle.",
      },
      {
        question: "Is it cheaper than a taxi to the airport?",
        answer:
          "For groups of 4 or more, a minibus transfer is almost always cheaper per person than individual taxis. For example, a minibus from Leeds to Manchester Airport split between 8 passengers can work out at £15-£25 per person.",
      },
    ],
    relatedLocations: [
      "leeds",
      "sheffield",
      "york",
      "bradford",
      "harrogate",
      "hull",
      "doncaster",
    ],
    keywords: [
      "airport transfer minibus yorkshire",
      "minibus hire leeds bradford airport",
      "airport minibus hire leeds",
      "airport transfer minibus sheffield",
      "manchester airport minibus yorkshire",
    ],
  },
  {
    slug: "16-seater-minibus-hire-yorkshire",
    title: "16 Seater Minibus Hire Yorkshire",
    metaTitle:
      "16 Seater Minibus Hire Yorkshire | Prices & Companies (2026)",
    metaDescription:
      "Compare 16 seater minibus hire across Yorkshire. Find prices, availability and top-rated operators in Leeds, Sheffield, York, Hull and more.",
    h1: "16 Seater Minibus Hire in Yorkshire",
    intro:
      "A 16-seater minibus is the ideal size for medium-sized groups who need comfortable transport with plenty of room for luggage. Whether you need transport for a day trip, weekend away, wedding, corporate event or sports team fixture, we list 16-seater minibus operators across Yorkshire so you can compare prices and availability.",
    sections: [
      {
        heading: "How Much Does 16 Seater Minibus Hire Cost?",
        content:
          "The cost of hiring a 16-seater minibus in Yorkshire depends on whether you hire with a driver or self-drive, the distance and duration, and the specific operator. With a driver, expect to pay around £180-£350 for a full day hire within Yorkshire. Self-drive 16-seater minibuses typically cost £130-£220 per day. Longer journeys or multi-day hires are usually better value per day. Most operators offer free, no-obligation quotes.",
      },
      {
        heading: "With Driver or Self-Drive?",
        content:
          "Most 16-seater minibus hire in Yorkshire comes with a professional driver included. This is the most convenient option as you can relax and enjoy the journey without worrying about navigation, parking or driving restrictions. Self-drive 16-seater minibuses are available but you will need a D1 category on your driving licence (standard for anyone who passed their test before January 1997). If your driver passed their test after this date, consider a smaller vehicle or hire with a driver.",
      },
      {
        heading: "Popular Uses for 16 Seater Minibuses",
        content:
          "16-seater minibuses in Yorkshire are popular for wedding guest transport between venues, corporate events and team building days, sports team fixtures and tournaments, school and college trips, day trips to the Yorkshire Dales, North York Moors or coast, airport transfers for larger groups, and stag and hen party transport. The 16-seater size strikes a good balance between capacity and manoeuvrability, fitting comfortably in most car parks and roads.",
      },
      {
        heading: "Where to Hire a 16 Seater Minibus in Yorkshire",
        content:
          "16-seater minibus operators can be found across Yorkshire, with the largest concentration in Leeds, Sheffield, Bradford, York and Hull. Many operators are happy to travel to any pick-up point in the region, so even if you are based in a smaller town such as Skipton, Whitby, Harrogate or Scarborough, you should have no trouble finding an operator willing to cover your area.",
      },
    ],
    faq: [
      {
        question: "Do I need a special licence to drive a 16-seater minibus?",
        answer:
          "Yes. To drive a 16-seater minibus you need a D1 category on your driving licence. If you passed your driving test before 1 January 1997, this is likely already included. Otherwise, you will need to take an additional test or hire a minibus with a driver.",
      },
      {
        question: "How much luggage space does a 16-seater have?",
        answer:
          "Most 16-seater minibuses have a separate luggage compartment or dedicated space at the rear. For trips with a lot of luggage (such as airport transfers), let the operator know in advance so they can provide a vehicle with adequate storage.",
      },
      {
        question: "Can I hire a 16-seater for a one-way trip?",
        answer:
          "Yes, many operators offer one-way hires, for example from Leeds to Manchester Airport or Sheffield to London. One-way trips may cost slightly more than return journeys. Get a quote specifying your exact route for accurate pricing.",
      },
      {
        question: "Are 16-seater minibuses wheelchair accessible?",
        answer:
          "Some operators offer wheelchair-accessible 16-seater minibuses with ramp or lift access. If you need an accessible vehicle, mention this when requesting quotes so the operator can confirm availability.",
      },
    ],
    relatedLocations: [
      "leeds",
      "sheffield",
      "york",
      "hull",
      "bradford",
      "doncaster",
      "wakefield",
    ],
    keywords: [
      "16 seater minibus hire yorkshire",
      "16 seater minibus hire leeds",
      "16 seater minibus hire sheffield",
      "16 seater minibus hire york",
    ],
  },
  {
    slug: "wedding-coach-hire-yorkshire",
    title: "Wedding Coach Hire Yorkshire",
    metaTitle:
      "Wedding Coach Hire Yorkshire | Transport Your Guests in Style (2026)",
    metaDescription:
      "Find wedding coach and minibus hire across Yorkshire. Compare prices for guest transport between venues in Leeds, York, Sheffield, Harrogate and more.",
    h1: "Wedding Coach & Minibus Hire in Yorkshire",
    intro:
      "Planning your wedding in Yorkshire? Getting your guests safely between the ceremony, reception and hotel is one of the most important logistics to get right. We list coach and minibus operators across Yorkshire who specialise in wedding transport, so you can compare prices and find the perfect vehicle for your big day.",
    sections: [
      {
        heading: "Why Hire a Coach or Minibus for Your Wedding?",
        content:
          "Hiring a coach or minibus for your wedding guests ensures everyone arrives at the right place at the right time without the stress of coordinating multiple cars. It means guests can enjoy a drink without worrying about driving, elderly or less mobile guests have comfortable door-to-door transport, you avoid car parking issues at venues with limited spaces, and the whole group can travel and celebrate together. Many Yorkshire wedding venues, particularly those in the countryside and the Dales, have limited parking so arranged transport is often essential.",
      },
      {
        heading: "How Much Does Wedding Coach Hire Cost in Yorkshire?",
        content:
          "Wedding coach and minibus hire in Yorkshire typically costs between £200 and £600 depending on the vehicle size, distance between venues, and duration. A 16-seater minibus for a short transfer between ceremony and reception venue usually costs £150-£250. A 33-53 seat coach for a longer journey or full day hire ranges from £350-£600+. Most operators offer wedding-specific packages that include ribbons or decorations, and some offer vintage or luxury vehicles at premium rates.",
      },
      {
        heading: "Popular Yorkshire Wedding Venues & Routes",
        content:
          "Yorkshire is one of England's most popular wedding destinations with stunning venues across the region. Popular wedding transport routes include transfers between York city centre churches and country house venues in the Vale of York, Leeds city centre hotels to venues in the Yorkshire Dales, Harrogate hotels to stately home venues across North Yorkshire, Sheffield venues to Peak District country houses, and coastal venues around Whitby and Scarborough. Whatever your route, our listed operators know Yorkshire's roads inside out.",
      },
      {
        heading: "What to Look for in a Wedding Transport Company",
        content:
          "When choosing wedding transport in Yorkshire, look for operators who have specific wedding experience and can provide references or reviews from previous wedding clients, offer a trial run or venue visit before the day, have backup vehicles available in case of breakdowns, can decorate the vehicle to match your colour scheme, provide a smartly dressed driver, and offer flexible timing to accommodate the unpredictable nature of wedding day schedules.",
      },
      {
        heading: "Booking Tips for Wedding Transport",
        content:
          "Wedding coaches and minibuses in Yorkshire get booked up quickly, especially during peak wedding season (May to September). We recommend booking your wedding transport 6-12 months in advance to secure your preferred vehicle and date. Get at least three quotes, confirm all details in writing, and check the cancellation policy carefully. A good operator will visit your venues in advance to plan the best routes and drop-off points.",
      },
    ],
    faq: [
      {
        question: "How many guests can a wedding coach hold?",
        answer:
          "Standard coaches seat 49-53 passengers. For smaller weddings, minibuses seating 8-16 passengers are a popular choice. Some operators offer a combination of vehicles to transport all guests regardless of the size of your wedding.",
      },
      {
        question: "Can the coach be decorated for a wedding?",
        answer:
          "Many Yorkshire operators offer wedding decorations as part of their package, including ribbons, bows and flowers on the exterior. Some premium operators also offer interior decorations. Discuss your requirements when getting a quote.",
      },
      {
        question: "What if the wedding runs late?",
        answer:
          "Most wedding transport operators build in some flexibility for timing. However, significant delays may incur additional charges. Discuss overtime rates when booking and keep your driver informed of any schedule changes on the day.",
      },
      {
        question: "Do you offer vintage wedding buses?",
        answer:
          "Some operators in our Yorkshire directory offer vintage or heritage buses for weddings, which are popular for photos and add a unique touch to your day. These tend to book up very quickly so enquire early.",
      },
    ],
    relatedLocations: [
      "york",
      "leeds",
      "harrogate",
      "sheffield",
      "hull",
      "skipton",
      "scarborough",
    ],
    keywords: [
      "wedding coach hire yorkshire",
      "wedding minibus hire yorkshire",
      "wedding bus hire york",
      "wedding coach hire leeds",
      "wedding transport yorkshire",
    ],
  },
];

function getGuides(): Guide[] {
  const id = getSiteId();
  if (id === "northwest") return NW_GUIDES;
  if (id === "scotland") return SC_GUIDES;
  if (id === "midlands") return ML_GUIDES;
  if (id === "yorkshire") return YK_GUIDES;
  return NE_GUIDES;
}

export const GUIDES: Guide[] = getGuides();

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
