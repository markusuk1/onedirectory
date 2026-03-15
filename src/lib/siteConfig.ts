/**
 * Multi-site configuration.
 * Set NEXT_PUBLIC_SITE env var to switch between sites.
 * Defaults to 'northeast' if not set.
 */

export type SiteId = "northeast" | "northwest" | "scotland" | "midlands" | "yorkshire" | "east" | "london" | "southeast" | "southwest" | "wales";

export interface SiteConfig {
  id: SiteId;
  name: string;
  genericName: string;
  shortName: string;
  logoPrefix: string;
  domain: string;
  region: string;
  description: string;
  footerDescription: string;
  aboutDescription: string;
  locationsList: string; // comma-separated list of main locations for SEO text
  airportName: string;
  servicesAirportDesc: string;
  /** Unique about page content per region */
  aboutContent: {
    intro: string;
    mission: string;
    coverage: string;
    forOperators: string;
  };
  /** Unique homepage editorial content per region */
  homepageContent: {
    whatWeDo: { heading: string; body: string; bullets: string[] };
    whyWeDo: { heading: string; body: string; bullets: string[] };
  };
}

const SITE_CONFIGS: Record<SiteId, SiteConfig> = {
  northeast: {
    id: "northeast",
    name: "Minibus Hire North East",
    genericName: "Hire North East",
    shortName: "North East",
    logoPrefix: "NE",
    domain: "hirenortheast.co.uk",
    region: "North East England",
    description:
      "Compare minibus and coach hire companies across North East England. Get free quotes from trusted operators in Newcastle, Sunderland, Durham and more.",
    footerDescription:
      "The North East's largest directory of minibus and coach hire companies. Compare prices, read reviews and get free quotes from trusted local operators.",
    aboutDescription:
      "About Minibus Hire North East - the largest directory of minibus and coach hire companies in North East England.",
    locationsList:
      "Newcastle upon Tyne, Sunderland, Durham, Middlesbrough, Gateshead, Darlington, Hartlepool, Northumberland, Stockton-on-Tees, Redcar, Whitley Bay, Washington, Tynemouth, South Shields, Cramlington and Morpeth",
    airportName: "Newcastle International Airport",
    servicesAirportDesc:
      "Reliable minibus transfers to and from Newcastle, Durham Tees Valley and other airports.",
    aboutContent: {
      intro:
        "Hire North East is the region's dedicated directory for local service providers across Tyneside, Wearside, Teesside and County Durham. Whether you need transport for a wedding in Alnwick, a locksmith in Darlington at midnight, or a removal company for a house move in Sunderland, we connect you directly with experienced operators who know the area. Built with the North East's proud industrial heritage and tight-knit communities in mind, we understand that trust and reliability matter more here than flashy marketing. Every provider listed has local roots and a reputation to uphold.",
      mission:
        "The North East has always thrived on word-of-mouth recommendations — from the shipyards of the Tyne to the terraces of St James' Park, knowing someone who can help is part of the culture. But as the region's service economy grows, finding the right provider shouldn't mean endless scrolling or guesswork. We built this directory so that residents from Berwick to Middlesbrough can quickly find vetted, local operators and get quotes without the hassle.",
      coverage:
        "We cover the entire North East of England, from Northumberland's market towns and the Tyne Valley through Newcastle, Gateshead and Sunderland, down to County Durham, Darlington, Hartlepool, Stockton-on-Tees and Middlesbrough. Whether you're in a city centre or a rural village, our listed operators serve your area.",
      forOperators:
        "If you run a service business in the North East, listing with us puts you in front of customers actively searching for your services. You'll receive genuine leads with full job details, helping you fill your calendar and grow your business across the region without competing on price alone.",
    },
    homepageContent: {
      whatWeDo: {
        heading: "Your North East Services Hub",
        body: "We bring together the best local service providers across North East England into one easy-to-use directory. From the banks of the Tyne to the Durham Dales, find trusted operators, compare options and request free quotes — all in a few clicks.",
        bullets: [
          "Free, no-obligation quotes from verified local operators",
          "Coverage from Berwick-upon-Tweed to Middlesbrough",
          "Operators vetted for local knowledge and reliability",
          "Simple comparison across multiple service categories",
        ],
      },
      whyWeDo: {
        heading: "Built for the North East",
        body: "The North East deserves a directory that reflects its character — straightforward, community-driven and genuinely helpful. We started this project because too many national platforms overlook the region or lump it in with Yorkshire. This one is ours.",
        bullets: [
          "Supporting independent businesses across Tyneside, Wearside and Teesside",
          "Helping customers avoid national middlemen with inflated prices",
          "Championing the North East's growing service economy",
          "Keeping it local — every operator listed serves this region",
        ],
      },
    },
  },
  northwest: {
    id: "northwest",
    name: "Minibus Hire North West",
    genericName: "Hire North West",
    shortName: "North West",
    logoPrefix: "NW",
    domain: "hirenorthwest.co.uk",
    region: "North West England",
    description:
      "Compare minibus and coach hire companies across North West England. Get free quotes from trusted operators in Manchester, Liverpool, Preston and more.",
    footerDescription:
      "The North West's largest directory of minibus and coach hire companies. Compare prices, read reviews and get free quotes from trusted local operators.",
    aboutDescription:
      "About Minibus Hire North West - the largest directory of minibus and coach hire companies in North West England.",
    locationsList:
      "Manchester, Liverpool, Warrington, Bolton, Preston, Blackburn, Wigan, Burnley, Blackpool, Oldham, Salford, Rochdale, Stockport, Southport, Lancaster, Kendal, St Helens, Bury, Macclesfield, Crewe, Leigh, Chester and Chorley",
    airportName: "Manchester Airport",
    servicesAirportDesc:
      "Reliable minibus transfers to and from Manchester, Liverpool John Lennon and other airports.",
    aboutContent: {
      intro:
        "Hire North West is the go-to directory for finding reliable service providers across Greater Manchester, Merseyside, Lancashire, Cheshire and Cumbria. The North West is one of the UK's most economically dynamic regions — home to two of England's largest cities, three major universities, and a population that expects quality at a fair price. Whether you're organising group transport for a match day at Old Trafford, hiring a van for a flat move in Liverpool's Baltic Triangle, or booking pest control for a country pub in the Lake District, our listed operators have the local expertise to deliver.",
      mission:
        "With Manchester and Liverpool driving one of Europe's fastest-growing regional economies, demand for quality local services has never been higher. Yet the sheer number of providers can make it hard to know who to trust. We created this directory to cut through the noise — giving residents and businesses from the Wirral to the Ribble Valley a curated set of operators who actually serve their area, with transparent pricing and genuine reviews.",
      coverage:
        "Our directory spans the full North West region: Greater Manchester, Merseyside, Lancashire (including Blackpool, Preston and Burnley), Cheshire (Chester, Warrington, Crewe), and Cumbria (Carlisle, Kendal, Barrow). From urban centres to the rural edges of the Forest of Bowland, our operators have you covered.",
      forOperators:
        "Listing your business puts you in front of a huge customer base across the North West's diverse towns and cities. With over seven million residents in the region, our directory channels high-intent enquiries directly to you — no bidding wars, no wasted time, just genuine leads from people who need your service.",
    },
    homepageContent: {
      whatWeDo: {
        heading: "Connecting the North West With Trusted Providers",
        body: "From the Pennines to the Irish Sea, we make it simple to find and compare local service providers across North West England. Request free quotes from operators who know your area, whether you're in central Manchester or rural Cumbria.",
        bullets: [
          "Instant quotes from operators across Greater Manchester, Merseyside, Lancashire and Cheshire",
          "Trusted providers serving both major cities and smaller market towns",
          "No middlemen — you deal directly with the operator",
          "All major service categories covered in one place",
        ],
      },
      whyWeDo: {
        heading: "Supporting the North West's Local Economy",
        body: "The North West runs on enterprise and graft. From market traders to tech startups, this region builds things. We created this directory to make sure local service providers get the visibility they deserve — and customers get better options than faceless national chains.",
        bullets: [
          "Promoting independent operators over national aggregators",
          "Reflecting the North West's diversity of towns, cities and communities",
          "Giving small businesses a platform alongside established names",
          "Keeping spending local and strengthening regional supply chains",
        ],
      },
    },
  },
  scotland: {
    id: "scotland",
    name: "Minibus Hire Scotland",
    genericName: "We Hire Scotland",
    shortName: "Scotland",
    logoPrefix: "SC",
    domain: "wehirescotland.co.uk",
    region: "Scotland",
    description:
      "Compare minibus and coach hire companies across Scotland. Get free quotes from trusted operators in Glasgow, Edinburgh, Aberdeen, Dundee, Inverness and more.",
    footerDescription:
      "Scotland's largest directory of minibus and coach hire companies. Compare prices, read reviews and get free quotes from trusted local operators.",
    aboutDescription:
      "About Minibus Hire Scotland - the largest directory of minibus and coach hire companies in Scotland.",
    locationsList:
      "Glasgow, Edinburgh, Aberdeen, Dundee, Inverness, Stirling, Perth, Paisley, East Kilbride, Livingston, Cumbernauld, Kirkcaldy, Dunfermline, Ayr, Kilmarnock, Falkirk, Motherwell, Hamilton, Greenock, Dumfries, Fort William and Oban",
    airportName: "Glasgow Airport",
    servicesAirportDesc:
      "Reliable minibus transfers to and from Glasgow, Edinburgh, Aberdeen and other Scottish airports.",
    aboutContent: {
      intro:
        "We Hire Scotland is a comprehensive directory of service providers covering every corner of the country — from the Borders to the Highlands, the Central Belt to the Islands. Scotland's geography presents unique challenges: a ceilidh in a remote glen, a festival flat-pack delivery during the Edinburgh Fringe, or emergency locksmith cover in an Aberdeen tenement all require operators who truly understand the terrain and the weather. Our listed providers are based in Scotland, experienced with Scottish conditions, and ready to serve communities of every size.",
      mission:
        "Scotland's service landscape is split between densely populated Central Belt cities and vast rural areas where finding a reliable provider can take hours of searching. National directories often have thin coverage north of Perth, and Highland and Island communities are frequently underserved. We built this platform to ensure that whether you're in a Glasgow postcode or a remote Argyll village, you can find a trusted local operator without resorting to providers hundreds of miles away.",
      coverage:
        "We cover all of Scotland: Glasgow, Edinburgh, Aberdeen, Dundee and the Central Belt cities; the Highlands and Islands including Inverness, Fort William, Oban and Skye; the Borders, Dumfries and Galloway; Fife, Tayside, Angus and the North East coast. Our operators serve both urban and rural communities across the country.",
      forOperators:
        "Scotland's tourism-driven peaks and troughs mean lead flow matters. Listing with us connects you with customers searching specifically for services in your area — from Edinburgh festival season to Highland wedding season. Grow your bookings year-round with qualified enquiries from across the country.",
    },
    homepageContent: {
      whatWeDo: {
        heading: "Scotland's Local Services Directory",
        body: "We connect people across Scotland with trusted local service providers. Whether you need transport in Glasgow, a tradesperson in Edinburgh, or specialist hire in the Highlands, browse verified operators and request free quotes tailored to your location.",
        bullets: [
          "Operators covering the Central Belt, Highlands, Islands and Borders",
          "Free quotes with no obligation — compare and choose",
          "Providers experienced with Scottish weather, roads and regulations",
          "Coverage in areas where national directories fall short",
        ],
      },
      whyWeDo: {
        heading: "Made for Scotland, Not Bolted On",
        body: "Too many UK directories treat Scotland as an afterthought — thin listings, English-centric assumptions, and poor rural coverage. We built this from the ground up for Scottish communities, with operators who understand the distances, the climate and the culture.",
        bullets: [
          "Genuine Scotland-wide coverage, not just the Central Belt",
          "Supporting small operators in rural and island communities",
          "Helping Scottish businesses compete with national chains",
          "Respecting the unique needs of Scottish customers and geography",
        ],
      },
    },
  },
  midlands: {
    id: "midlands",
    name: "Minibus Hire Midlands",
    genericName: "Hire Midlands",
    shortName: "Midlands",
    logoPrefix: "ML",
    domain: "hiremidlands.co.uk",
    region: "the Midlands",
    description:
      "Compare minibus and coach hire companies across the Midlands. Get free quotes from trusted operators in Birmingham, Nottingham, Leicester, Coventry and more.",
    footerDescription:
      "The Midlands' largest directory of minibus and coach hire companies. Compare prices, read reviews and get free quotes from trusted local operators.",
    aboutDescription:
      "About Minibus Hire Midlands - the largest directory of minibus and coach hire companies in the Midlands.",
    locationsList:
      "Birmingham, Nottingham, Leicester, Coventry, Derby, Wolverhampton, Stoke-on-Trent, Walsall, Dudley, Solihull, Telford, Shrewsbury, Worcester, Hereford, Stafford, Northampton, Lincoln, Chesterfield, Mansfield, Loughborough, Nuneaton, Rugby, Redditch, Kidderminster, Burton upon Trent, Tamworth, Kettering, Corby and Wellingborough",
    airportName: "Birmingham Airport",
    servicesAirportDesc:
      "Reliable minibus transfers to and from Birmingham, East Midlands and other airports.",
    aboutContent: {
      intro:
        "Hire Midlands is the definitive directory for service providers across the East and West Midlands — the UK's manufacturing and logistics heartland. With Birmingham as the country's second city, the NEC hosting major exhibitions year-round, and HS2 reshaping the region's connectivity, demand for quality local services is accelerating. From coach hire for conference delegates in Coventry to skip hire on a Nottingham building site, our directory connects you with operators who understand the Midlands' unique mix of heavy industry, growing tech sectors, and diverse multicultural communities.",
      mission:
        "The Midlands sits at the geographic centre of England, yet it's often overlooked by London-centric platforms. This region has the UK's largest concentration of logistics and distribution hubs, a booming construction sector, and some of the most diverse communities in the country. We built this directory because Midlands residents and businesses deserve a platform that reflects their scale and ambition — connecting them with local operators rather than distant call centres.",
      coverage:
        "We cover both the East and West Midlands: Birmingham, Wolverhampton, Coventry, Stoke-on-Trent, and the Black Country in the west; Nottingham, Leicester, Derby, Northampton, and Lincoln in the east. From Shropshire's market towns to Leicestershire's villages, our listed operators serve the full Midlands region.",
      forOperators:
        "The Midlands is the UK's busiest region for events, logistics and construction — meaning a steady stream of customers need your services. Listing with us positions your business in front of high-intent searchers across a region of nearly eleven million people, with leads delivered directly to you.",
    },
    homepageContent: {
      whatWeDo: {
        heading: "The Midlands' Service Provider Directory",
        body: "We bring together trusted operators from across the East and West Midlands in one searchable directory. Whether you're planning an event at the NEC, moving house in Leicester, or need a tradesperson in Stoke, find the right provider and get quotes fast.",
        bullets: [
          "Operators spanning Birmingham to Nottingham and everywhere between",
          "Free quotes from providers who serve your specific area",
          "Categories covering transport, trades, hire and specialist services",
          "Designed for the Midlands' pace — fast responses, no fuss",
        ],
      },
      whyWeDo: {
        heading: "Powering the Engine of England",
        body: "The Midlands produces more than any other UK region outside London — and that takes reliable service providers. We created this directory to ensure the businesses and residents driving this economic engine can find quality local operators without wading through irrelevant national results.",
        bullets: [
          "Reflecting the Midlands' industrial strength and growing service economy",
          "Equal coverage for both East and West Midlands communities",
          "Supporting the region's diverse small business landscape",
          "Connecting operators with the steady demand that the Midlands generates",
        ],
      },
    },
  },
  yorkshire: {
    id: "yorkshire",
    name: "Minibus Hire Yorkshire",
    genericName: "Hire Yorkshire",
    shortName: "Yorkshire",
    logoPrefix: "YK",
    domain: "hire-yorkshire.co.uk",
    region: "Yorkshire",
    description:
      "Compare minibus and coach hire companies across Yorkshire. Get free quotes from trusted operators in Leeds, Sheffield, York, Hull, Bradford and more.",
    footerDescription:
      "Yorkshire's largest directory of minibus and coach hire companies. Compare prices, read reviews and get free quotes from trusted local operators.",
    aboutDescription:
      "About Minibus Hire Yorkshire - the largest directory of minibus and coach hire companies in Yorkshire.",
    locationsList:
      "Leeds, Sheffield, York, Hull, Bradford, Doncaster, Huddersfield, Harrogate, Wakefield, Rotherham, Barnsley, Halifax, Scarborough, Selby, Skipton, Bridlington, Beverley, Dewsbury, Keighley, Pontefract, Whitby, Northallerton, Ripon, Goole, Castleford, Wetherby, Batley, Driffield, Pocklington and Todmorden",
    airportName: "Leeds Bradford Airport",
    servicesAirportDesc:
      "Reliable minibus transfers to and from Leeds Bradford, Manchester and other airports.",
    aboutContent: {
      intro:
        "Hire Yorkshire is the region's own directory for finding trusted service providers across West, South, North and East Yorkshire. This is a county with immense variety — from the financial districts of Leeds and Sheffield's advanced manufacturing quarter to the moors of the Peak District and the heritage coast around Whitby. Yorkshire folk are famously direct and value-conscious, and our directory reflects that: no filler, no inflated claims, just a straightforward way to find local operators who know the county inside out and deliver on their promises.",
      mission:
        "Yorkshire has the population and economy of a small country, yet finding a reliable local provider can still mean sifting through London-based aggregators with little understanding of the region. We built this directory for the people of Yorkshire — so that whether you need a minibus for a Headingley stag do, a bouncy castle for a village fete in the Dales, or a removal company for a move across the Humber, you can find someone local and get a fair price.",
      coverage:
        "We cover all four Yorkshires: West Yorkshire (Leeds, Bradford, Huddersfield, Wakefield, Halifax), South Yorkshire (Sheffield, Doncaster, Rotherham, Barnsley), North Yorkshire (York, Harrogate, Scarborough, Skipton, Northallerton, Whitby, Ripon) and East Yorkshire (Hull, Beverley, Bridlington, Driffield). From the Pennine hills to the Holderness coast, our operators serve the lot.",
      forOperators:
        "Yorkshire's blend of cities, towns, countryside and coast means demand for services varies by season and area. Our directory ensures you receive leads from customers in your actual coverage zone, not speculative enquiries from the wrong side of the Pennines. Grow your business with genuine, local demand.",
    },
    homepageContent: {
      whatWeDo: {
        heading: "Yorkshire's Trusted Services Directory",
        body: "We make it easy to find and compare local service providers across Yorkshire. From the urban centres of Leeds and Sheffield to the market towns of the Dales and Moors, browse operators by category, check their credentials and request free quotes — no sign-up needed.",
        bullets: [
          "Free quotes from operators based across all four Yorkshires",
          "Straightforward listings — no hidden fees or middlemen",
          "Providers covering cities, countryside and coastal areas",
          "Built by people who understand Yorkshire's geography and expectations",
        ],
      },
      whyWeDo: {
        heading: "Proper Yorkshire, Properly Represented",
        body: "Yorkshire's economy is bigger than many European countries, but local service providers are often drowned out by national platforms. We created this directory so that Yorkshire businesses get the visibility they deserve — and customers get the honest, no-nonsense service the county is known for.",
        bullets: [
          "Championing Yorkshire's independent service providers",
          "Fair representation for smaller towns and rural areas",
          "Keeping it real — no inflated reviews or pay-to-rank listings",
          "Strengthening the local economy by connecting supply with demand",
        ],
      },
    },
  },
  east: {
    id: "east",
    name: "Minibus Hire East of England",
    genericName: "Hire East",
    shortName: "East of England",
    logoPrefix: "EE",
    domain: "hireeast.co.uk",
    region: "East of England",
    description:
      "Compare minibus and coach hire companies across East of England. Get free quotes from trusted operators in Norwich, Cambridge, Ipswich, Peterborough and more.",
    footerDescription:
      "The East of England's largest directory of minibus and coach hire companies. Compare prices, read reviews and get free quotes from trusted local operators.",
    aboutDescription:
      "About Minibus Hire East of England - the largest directory of minibus and coach hire companies in East of England.",
    locationsList:
      "Norwich, Cambridge, Ipswich, Peterborough, Colchester, Chelmsford, Southend-on-Sea, Luton, Bedford, Basildon, Stevenage, Harlow, Great Yarmouth, Kings Lynn, Bury St Edmunds, Lowestoft, Watford, St Albans, Hertford, Huntingdon, Braintree, Clacton-on-Sea, Newmarket, Thetford and Welwyn Garden City",
    airportName: "London Stansted Airport",
    servicesAirportDesc:
      "Reliable minibus transfers to and from Stansted, Luton and other airports.",
    aboutContent: {
      intro:
        "Hire East is the dedicated directory for service providers across East of England — a region stretching from the university city of Cambridge to the Norfolk Broads, from the Essex coast to the Hertfordshire commuter belt. This is a region of contrasts: world-leading tech and biotech clusters sit alongside some of England's most agricultural counties, and busy commuter towns border quiet fenland villages. Our directory helps residents and businesses across this varied landscape find reliable local operators who understand the specific needs of their area.",
      mission:
        "The East of England is one of the UK's fastest-growing regions, with the Cambridge tech corridor attracting international investment and Stansted driving a logistics boom. Yet outside these hotspots, many communities are genuinely rural, and finding a good local operator can mean relying on word of mouth or outdated directories. We created this platform to bridge that gap — giving the same quality of access to someone in a Suffolk village as someone in a Cambridge suburb.",
      coverage:
        "We cover the full East of England region: Norfolk (Norwich, Great Yarmouth, King's Lynn), Suffolk (Ipswich, Bury St Edmunds, Lowestoft), Cambridgeshire (Cambridge, Peterborough, Huntingdon), Essex (Chelmsford, Colchester, Southend, Basildon), Hertfordshire (Watford, St Albans, Stevenage, Hertford) and Bedfordshire (Luton, Bedford). From the Fens to the coast, we have operators listed throughout.",
      forOperators:
        "The East of England's mix of commuter demand, rural communities and seasonal tourism creates diverse opportunities for service providers. Listing with us connects you with customers searching specifically in your area — from corporate events near Cambridge to house moves in coastal Norfolk.",
    },
    homepageContent: {
      whatWeDo: {
        heading: "East of England's Local Services Hub",
        body: "We connect people across East of England with trusted, local service providers. Whether you need hire services in Cambridge, a tradesperson in Norwich, or specialist support anywhere from the Essex coast to the Fens, browse our directory and get free quotes.",
        bullets: [
          "Operators covering Norfolk, Suffolk, Essex, Cambridgeshire, Hertfordshire and Bedfordshire",
          "Free, no-obligation quotes tailored to your location",
          "Providers experienced with both urban and deeply rural areas",
          "Easy comparison across all major service categories",
        ],
      },
      whyWeDo: {
        heading: "Serving a Region of Contrasts",
        body: "From the Cambridge tech cluster to fenland farming communities, the East of England defies simple categorisation. We built this directory because a one-size-fits-all national platform cannot reflect the region's diversity — and local operators deserve a platform that understands their market.",
        bullets: [
          "Genuine coverage beyond the M25 commuter belt",
          "Supporting rural operators who are invisible on national platforms",
          "Reflecting the East's unique blend of agriculture, tech and tourism",
          "Helping growing communities find services that keep pace with demand",
        ],
      },
    },
  },
  london: {
    id: "london",
    name: "Minibus Hire London",
    genericName: "We Hire London",
    shortName: "London",
    logoPrefix: "LN",
    domain: "wehirelondon.co.uk",
    region: "London",
    description:
      "Compare minibus and coach hire companies across London. Get free quotes from trusted operators in Central London, Westminster, Kensington, Greenwich and more.",
    footerDescription:
      "London's largest directory of minibus and coach hire companies. Compare prices, read reviews and get free quotes from trusted local operators.",
    aboutDescription:
      "About Minibus Hire London - the largest directory of minibus and coach hire companies in London.",
    locationsList:
      "Central London, Westminster, Wimbledon, City of London, Kensington, Barnet, Dagenham, Brixton, Twickenham, Greenwich, Hayes, Lewisham, Islington, Acton, Bromley, Docklands, Chelsea, Putney, Mitcham, Sutton, Orpington, Romford, Richmond, Wembley, Hampstead, Highgate, Stratford, Barking, Canary Wharf, Hounslow, Uxbridge, Enfield, Hackney, Ealing and Camden",
    airportName: "London Heathrow Airport",
    servicesAirportDesc:
      "Reliable minibus transfers to and from Heathrow, Gatwick, Stansted, Luton and London City airports.",
    aboutContent: {
      intro:
        "We Hire London is the capital's dedicated directory for local service providers across all 32 boroughs and the City. London operates at a scale and intensity unlike anywhere else in the UK — nine million residents, millions of annual visitors, and a service economy that never stops. Finding a reliable operator in London means navigating a vast, fragmented market where quality varies enormously from one postcode to the next. Our directory cuts through that complexity by listing verified providers who serve specific areas of the city, so you can find someone who actually knows your neighbourhood.",
      mission:
        "London's service market is paradoxically both oversaturated and underserved. Thousands of operators compete for attention, yet customers regularly struggle to find someone who covers their specific borough, answers the phone, and turns up on time. We built this directory to solve that problem — curating operators by the areas they genuinely serve and the services they actually provide, rather than listing everyone who pays for a London postcode.",
      coverage:
        "We cover all of Greater London: from Barnet and Enfield in the north to Croydon and Bromley in the south, from Hillingdon and Hounslow in the west to Barking, Dagenham and Havering in the east. Central London boroughs including Westminster, Camden, Islington, Kensington and Chelsea, Southwark, Lambeth and the City are all covered. Every operator is listed against the boroughs they serve.",
      forOperators:
        "London's density means competition is fierce, but demand is enormous. Listing with us gets your business in front of customers searching in your specific boroughs — not across all of London. You'll receive qualified leads from people who need your service in areas you actually cover, reducing wasted time and increasing conversion.",
    },
    homepageContent: {
      whatWeDo: {
        heading: "London's Local Services Directory",
        body: "We help Londoners find trusted service providers in their borough. With thousands of operators across the capital, our directory filters by area and category so you can skip the noise, compare genuine local options and get free quotes from providers who serve your part of the city.",
        bullets: [
          "Operators filtered by the London boroughs they actually serve",
          "Free quotes with no obligation — compare and choose",
          "Coverage across all 32 boroughs plus the City of London",
          "Every major service category represented in one place",
        ],
      },
      whyWeDo: {
        heading: "Cutting Through London's Noise",
        body: "In a city of nine million people, finding the right local service provider shouldn't mean hours of searching. We built this directory because London's sheer scale makes generic national platforms almost useless — you need operators who know your area and can get to you quickly.",
        bullets: [
          "Borough-level accuracy, not vague London-wide listings",
          "Supporting small operators competing against large franchises",
          "Helping customers find providers who genuinely serve their area",
          "Reflecting London's diversity through a wide range of service categories",
        ],
      },
    },
  },
  southeast: {
    id: "southeast",
    name: "Minibus Hire South East",
    genericName: "Hire South East",
    shortName: "South East",
    logoPrefix: "SE",
    domain: "hiresoutheast.co.uk",
    region: "South East England",
    description:
      "Compare minibus and coach hire companies across South East England. Get free quotes from operators in Brighton, Southampton, Portsmouth, Oxford and more.",
    footerDescription:
      "The South East's largest directory of minibus and coach hire companies. Compare prices, read reviews and get free quotes from trusted local operators.",
    aboutDescription:
      "About Minibus Hire South East - the largest directory of minibus and coach hire companies in South East England.",
    locationsList:
      "Brighton, Southampton, Portsmouth, Rochester, Slough, High Wycombe, Winchester, Maidstone, Basingstoke, Milton Keynes, Oxford, Horsham, Eastbourne, Dartford, Newbury, Guildford, Canterbury, Reading, Crawley, Worthing, Tunbridge Wells, Chichester, Aylesbury and Windsor",
    airportName: "London Gatwick Airport",
    servicesAirportDesc:
      "Reliable minibus transfers to and from Gatwick, Southampton, Heathrow and other airports.",
    aboutContent: {
      intro:
        "Hire South East is the directory for finding trusted service providers across South East England — the UK's most economically productive region outside London. From the commuter towns of the Home Counties to the naval heritage of Portsmouth, the university cities of Oxford and Brighton to the garden towns of Kent, this region has a huge and varied demand for quality local services. Our directory lists operators who serve specific areas of the South East, cutting through the clutter of London-focused results that dominate most search engines.",
      mission:
        "The South East is often treated as an extension of London, but it has its own identity, its own economy and its own needs. Affluent commuter towns sit alongside coastal communities with very different challenges. University cities generate year-round demand for hire services, while Gatwick and Southampton drive a constant need for transport. We built this directory because South East residents deserve search results that reflect their area — not London spillover.",
      coverage:
        "We cover the entire South East region: Kent (Maidstone, Canterbury, Dartford, Rochester), Sussex (Brighton, Eastbourne, Crawley, Horsham, Worthing, Chichester), Hampshire (Southampton, Portsmouth, Basingstoke, Winchester), Surrey (Guildford), Berkshire (Reading, Slough, Newbury, Windsor), Buckinghamshire (High Wycombe, Aylesbury, Milton Keynes) and Oxfordshire (Oxford). From the Channel coast to the Chilterns, our operators serve the full region.",
      forOperators:
        "The South East's high population density and spending power make it one of the UK's most attractive markets for service providers. Listing with us puts your business in front of affluent, high-intent customers searching in your area — from wedding season in the Cotswolds to student moves in Brighton and corporate events near Gatwick.",
    },
    homepageContent: {
      whatWeDo: {
        heading: "South East England's Services Directory",
        body: "We make it simple to find and compare local service providers across South East England. From the Kent coast to the Oxfordshire countryside, browse verified operators by category and location, then request free quotes — no sign-up, no commitment.",
        bullets: [
          "Free quotes from operators across Kent, Sussex, Hampshire, Surrey, Berkshire, Buckinghamshire and Oxfordshire",
          "Listings filtered by the areas operators actually serve",
          "Categories covering transport, trades, hire and specialist services",
          "Results that reflect the South East, not London overflow",
        ],
      },
      whyWeDo: {
        heading: "More Than London's Commuter Belt",
        body: "The South East has its own thriving economy, its own communities and its own challenges. We created this directory to give the region's service providers proper visibility — and to help customers find operators who are local to them, not based in central London.",
        bullets: [
          "Dedicated South East coverage, not a London afterthought",
          "Supporting providers in coastal, rural and commuter communities equally",
          "Connecting high-quality operators with the region's strong demand",
          "Recognising the South East's diversity beyond the M25",
        ],
      },
    },
  },
  southwest: {
    id: "southwest",
    name: "Minibus Hire South West",
    genericName: "Hire South West",
    shortName: "South West",
    logoPrefix: "SW",
    domain: "hiresouthwest.co.uk",
    region: "South West England",
    description:
      "Compare minibus and coach hire companies across South West England. Get free quotes from trusted operators in Bristol, Exeter, Plymouth, Bath and more.",
    footerDescription:
      "The South West's largest directory of minibus and coach hire companies. Compare prices, read reviews and get free quotes from trusted local operators.",
    aboutDescription:
      "About Minibus Hire South West - the largest directory of minibus and coach hire companies in South West England.",
    locationsList:
      "Bristol, Plymouth, Exeter, Bath, Bournemouth, Gloucester, Cheltenham, Swindon, Taunton, Torquay, Truro, Salisbury, Poole, Weymouth, Barnstaple, Penzance, Newquay, Yeovil, Chippenham and Bridgwater",
    airportName: "Bristol Airport",
    servicesAirportDesc:
      "Reliable minibus transfers to and from Bristol, Exeter, Bournemouth and other airports.",
    aboutContent: {
      intro:
        "Hire South West is the region's directory for finding reliable service providers from Bristol to Penzance and everywhere between. The South West is the UK's largest region by area, and its economy spans Bristol's booming tech and creative sectors, Devon and Cornwall's tourism industry, Somerset's agricultural heartland, and Dorset's mix of retirement communities and outdoor recreation. Distance and seasonality shape everything here — an operator in Truro faces entirely different challenges to one in Swindon. Our directory lists providers who understand their patch and can deliver regardless of the season or the state of the A30.",
      mission:
        "The South West's sheer geographic spread means that national directories consistently underserve it. A search for services in Cornwall might return results from Bristol, two hundred miles away. Rural communities in mid-Devon or the Mendips are often invisible online. We built this platform so that every part of the South West — from university cities to fishing villages, festival fields to market towns — has access to genuine local operators who can actually reach them.",
      coverage:
        "We cover the full South West region: Bristol, Bath, Gloucestershire (Gloucester, Cheltenham), Wiltshire (Swindon, Salisbury, Chippenham), Somerset (Taunton, Yeovil, Bridgwater), Devon (Exeter, Plymouth, Torquay, Barnstaple), Cornwall (Truro, Newquay, Penzance) and Dorset (Bournemouth, Poole, Weymouth). From the Severn Estuary to Land's End, our operators serve the full peninsula.",
      forOperators:
        "The South West's tourism peaks create intense seasonal demand, while year-round residents need services consistently. Listing with us helps you capture both — getting your business in front of holiday planners, festival organisers, new homeowners and local businesses who are actively searching in your area.",
    },
    homepageContent: {
      whatWeDo: {
        heading: "The South West's Service Provider Directory",
        body: "We connect people across South West England with trusted local operators. Whether you're planning a Glastonbury festival run, moving to a Cornish village, or need a tradesperson in Bristol, browse by category and location to find providers who actually serve your area.",
        bullets: [
          "Operators covering Bristol, Devon, Cornwall, Somerset, Dorset, Gloucestershire and Wiltshire",
          "Free quotes from providers who genuinely serve your area",
          "Coverage that extends to rural and coastal communities",
          "Built for the South West's unique mix of tourism and year-round demand",
        ],
      },
      whyWeDo: {
        heading: "Serving the UK's Longest Region",
        body: "The South West stretches further than people realise — Bristol to Penzance is the same distance as London to Newcastle. National directories can't handle that spread. We built this platform so that every community in the region has access to local services, not just the cities.",
        bullets: [
          "Genuine coverage beyond Bristol and the M5 corridor",
          "Supporting seasonal operators with year-round visibility",
          "Ensuring rural and coastal communities aren't left behind",
          "Reflecting the South West's creative, independent business culture",
        ],
      },
    },
  },
  wales: {
    id: "wales",
    name: "Minibus Hire Wales",
    genericName: "Hire Wales",
    shortName: "Wales",
    logoPrefix: "WL",
    domain: "hirewales.co.uk",
    region: "Wales",
    description:
      "Compare minibus and coach hire companies across Wales. Get free quotes from trusted operators in Cardiff, Swansea, Newport, Wrexham, Bangor and more.",
    footerDescription:
      "Wales's largest directory of minibus and coach hire companies. Compare prices, read reviews and get free quotes from trusted local operators.",
    aboutDescription:
      "About Minibus Hire Wales - the largest directory of minibus and coach hire companies in Wales.",
    locationsList:
      "Cardiff, Swansea, Newport, Wrexham, Bangor, Llandudno, Rhyl, Bridgend, Neath, Caerphilly, Merthyr Tydfil, Llanelli, Aberystwyth, Caernarfon, Holyhead, Barry, Pontypridd, Port Talbot, Monmouth and Abergavenny",
    airportName: "Cardiff Airport",
    servicesAirportDesc:
      "Reliable minibus transfers to and from Cardiff, Bristol and other airports.",
    aboutContent: {
      intro:
        "Hire Wales is the dedicated directory for finding service providers across Wales — a nation with its own language, its own culture, and its own way of doing business. From Cardiff's cosmopolitan capital economy to the post-industrial valleys, from Snowdonia's adventure tourism industry to the farmlands of Powys and Pembrokeshire's coastal tourism, Wales needs service providers who understand its distinct character. Our directory lists Welsh operators and those who genuinely serve Welsh communities, making it easy to find trusted local providers wherever you are in the country.",
      mission:
        "Wales faces a persistent challenge: national UK platforms are overwhelmingly England-centric, and Welsh communities — especially in the north and west — are chronically underserved online. Finding a local operator in Welsh-speaking heartlands or the Valleys shouldn't require trawling through results from Birmingham or Bristol. We built this directory to put Welsh businesses first and ensure that every community, from the Menai Strait to the Severn Bridge, can find quality local services.",
      coverage:
        "We cover all of Wales: South Wales (Cardiff, Swansea, Newport, Bridgend, Merthyr Tydfil, Pontypridd, Neath, Port Talbot, Barry), the Valleys (Caerphilly, Rhondda, Blaenau Gwent), West Wales (Llanelli, Carmarthen, Pembrokeshire, Aberystwyth, Ceredigion), North Wales (Wrexham, Bangor, Caernarfon, Llandudno, Rhyl, Holyhead) and Mid Wales (Powys, Brecon, Newtown). From coast to mountains, we have it covered.",
      forOperators:
        "Wales's growing tourism sector, strong community identity and steady residential demand create real opportunities for local service providers. Listing with us connects you with customers across Wales who are searching specifically for services in their area — not generic UK-wide results dominated by English operators.",
    },
    homepageContent: {
      whatWeDo: {
        heading: "Wales's Own Services Directory",
        body: "We help people across Wales find trusted local service providers. From Cardiff Bay to Caernarfon Castle, browse Welsh operators by category and location, compare options and request free quotes — all without creating an account or paying a fee.",
        bullets: [
          "Welsh operators covering South, North, West and Mid Wales",
          "Free quotes with no obligation or hidden charges",
          "Providers who understand Welsh communities and geography",
          "Coverage that includes rural, valley and coastal areas",
        ],
      },
      whyWeDo: {
        heading: "A Directory That Puts Wales First",
        body: "Welsh businesses are too often invisible on UK-wide platforms, and Welsh customers too often get results for operators based over the border. We built this directory because Wales deserves its own space — one that reflects its bilingual culture, its strong local identity, and its diverse geography.",
        bullets: [
          "Prioritising Welsh operators over cross-border results",
          "Supporting businesses in the Valleys, rural areas and coastal towns",
          "Reflecting Wales's unique cultural and linguistic identity",
          "Giving Welsh communities the same quality of online access as major English cities",
        ],
      },
    },
  },
};

export function getSiteId(): SiteId {
  const site = process.env.NEXT_PUBLIC_SITE;
  const isVercelBuild = process.env.VERCEL === "1";

  if (!site) {
    if (isVercelBuild) {
      throw new Error("NEXT_PUBLIC_SITE must be set for production builds");
    }
    return "northeast";
  }

  if (site === "northeast") return "northeast";
  if (site === "northwest") return "northwest";
  if (site === "scotland") return "scotland";
  if (site === "midlands") return "midlands";
  if (site === "yorkshire") return "yorkshire";
  if (site === "east") return "east";
  if (site === "london") return "london";
  if (site === "southeast") return "southeast";
  if (site === "southwest") return "southwest";
  if (site === "wales") return "wales";

  if (isVercelBuild) {
    throw new Error(`Unsupported NEXT_PUBLIC_SITE value: ${site}`);
  }

  return "northeast";
}

export function getSiteConfig(): SiteConfig {
  return SITE_CONFIGS[getSiteId()];
}

export const ALL_REGIONS = Object.values(SITE_CONFIGS).map(({ id, shortName, domain }) => ({
  id,
  shortName,
  domain,
}));

const HOSTED_SITES: Record<string, { businessSlug: string; product: string }> = {
  "mpm-transport": { businessSlug: "mpm-transport", product: "minibus-hire" },
};

export function getHostedSite(subdomain: string) {
  return HOSTED_SITES[subdomain] || null;
}
