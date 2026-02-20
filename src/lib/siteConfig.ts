/**
 * Multi-site configuration.
 * Set NEXT_PUBLIC_SITE env var to switch between sites.
 * Defaults to 'northeast' if not set.
 */

export type SiteId = "northeast" | "northwest" | "scotland" | "midlands" | "yorkshire" | "east" | "london" | "southeast";

export interface SiteConfig {
  id: SiteId;
  name: string;
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
}

const SITE_CONFIGS: Record<SiteId, SiteConfig> = {
  northeast: {
    id: "northeast",
    name: "Minibus Hire North East",
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
  },
  northwest: {
    id: "northwest",
    name: "Minibus Hire North West",
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
  },
  scotland: {
    id: "scotland",
    name: "Minibus Hire Scotland",
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
  },
  midlands: {
    id: "midlands",
    name: "Minibus Hire Midlands",
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
  },
  yorkshire: {
    id: "yorkshire",
    name: "Minibus Hire Yorkshire",
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
  },
  east: {
    id: "east",
    name: "Minibus Hire East of England",
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
  },
  london: {
    id: "london",
    name: "Minibus Hire London",
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
  },
  southeast: {
    id: "southeast",
    name: "Minibus Hire South East",
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
  },
};

export function getSiteId(): SiteId {
  const site = process.env.NEXT_PUBLIC_SITE || "northeast";
  if (site === "northwest") return "northwest";
  if (site === "scotland") return "scotland";
  if (site === "midlands") return "midlands";
  if (site === "yorkshire") return "yorkshire";
  if (site === "east") return "east";
  if (site === "london") return "london";
  if (site === "southeast") return "southeast";
  return "northeast";
}

export function getSiteConfig(): SiteConfig {
  return SITE_CONFIGS[getSiteId()];
}
