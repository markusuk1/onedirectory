/**
 * Multi-site configuration.
 * Set NEXT_PUBLIC_SITE env var to switch between sites.
 * Defaults to 'northeast' if not set.
 */

export type SiteId = "northeast" | "northwest" | "scotland" | "midlands" | "yorkshire";

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
      "Compare minibus and coach hire companies across the North East of England. Get free quotes from trusted operators in Newcastle, Sunderland, Durham, Middlesbrough and more.",
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
      "Compare minibus and coach hire companies across the North West of England. Get free quotes from trusted operators in Manchester, Liverpool, Preston, Bolton and more.",
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
      "Compare minibus and coach hire companies across the Midlands. Get free quotes from trusted operators in Birmingham, Nottingham, Leicester, Coventry, Derby and more.",
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
    domain: "hireyorkshire.co.uk",
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
};

export function getSiteId(): SiteId {
  const site = process.env.NEXT_PUBLIC_SITE || "northeast";
  if (site === "northwest") return "northwest";
  if (site === "scotland") return "scotland";
  if (site === "midlands") return "midlands";
  if (site === "yorkshire") return "yorkshire";
  return "northeast";
}

export function getSiteConfig(): SiteConfig {
  return SITE_CONFIGS[getSiteId()];
}
