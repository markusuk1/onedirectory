/**
 * Multi-site configuration.
 * Set NEXT_PUBLIC_SITE env var to switch between sites.
 * Defaults to 'northeast' if not set.
 */

export type SiteId = "northeast" | "northwest";

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
};

export function getSiteId(): SiteId {
  const site = process.env.NEXT_PUBLIC_SITE || "northeast";
  if (site === "northwest") return "northwest";
  return "northeast";
}

export function getSiteConfig(): SiteConfig {
  return SITE_CONFIGS[getSiteId()];
}
