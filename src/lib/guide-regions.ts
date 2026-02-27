import { getSiteId } from "./siteConfig";

export interface GuideRegion {
  name: string;
  theName: string;
  slug: string;
  mainCity: string;
  areas: string;
  locations: string[];
}

const REGIONS: Record<string, GuideRegion> = {
  northeast: {
    name: "North East",
    theName: "the North East",
    slug: "north-east",
    mainCity: "Newcastle",
    areas: "Newcastle, Sunderland, Durham, Middlesbrough and Gateshead",
    locations: ["newcastle", "sunderland", "durham", "middlesbrough", "gateshead", "darlington"],
  },
  northwest: {
    name: "North West",
    theName: "the North West",
    slug: "north-west",
    mainCity: "Manchester",
    areas: "Manchester, Liverpool, Bolton, Preston and Warrington",
    locations: ["manchester", "liverpool", "bolton", "preston", "warrington", "stockport"],
  },
  scotland: {
    name: "Scotland",
    theName: "Scotland",
    slug: "scotland",
    mainCity: "Glasgow",
    areas: "Glasgow, Edinburgh, Aberdeen, Dundee and Inverness",
    locations: ["glasgow", "edinburgh", "aberdeen", "dundee", "inverness", "stirling"],
  },
  midlands: {
    name: "Midlands",
    theName: "the Midlands",
    slug: "midlands",
    mainCity: "Birmingham",
    areas: "Birmingham, Nottingham, Leicester, Coventry and Derby",
    locations: ["birmingham", "nottingham", "leicester", "coventry", "derby", "wolverhampton"],
  },
  yorkshire: {
    name: "Yorkshire",
    theName: "Yorkshire",
    slug: "yorkshire",
    mainCity: "Leeds",
    areas: "Leeds, Sheffield, Bradford, York and Hull",
    locations: ["leeds", "sheffield", "bradford", "york", "hull", "wakefield"],
  },
  east: {
    name: "East of England",
    theName: "the East of England",
    slug: "east-of-england",
    mainCity: "Norwich",
    areas: "Norwich, Cambridge, Ipswich, Colchester and Chelmsford",
    locations: ["norwich", "cambridge", "ipswich", "colchester", "chelmsford", "peterborough"],
  },
  london: {
    name: "London",
    theName: "London",
    slug: "london",
    mainCity: "London",
    areas: "Central London, North London, South London, East London and West London",
    locations: ["london", "croydon", "bromley", "enfield", "barnet", "ealing"],
  },
  southeast: {
    name: "South East",
    theName: "the South East",
    slug: "south-east",
    mainCity: "Brighton",
    areas: "Brighton, Southampton, Reading, Oxford and Guildford",
    locations: ["brighton", "southampton", "reading", "oxford", "guildford", "maidstone"],
  },
  southwest: {
    name: "South West",
    theName: "the South West",
    slug: "south-west",
    mainCity: "Bristol",
    areas: "Bristol, Bath, Exeter, Plymouth and Swindon",
    locations: ["bristol", "bath", "exeter", "plymouth", "swindon", "gloucester"],
  },
  wales: {
    name: "Wales",
    theName: "Wales",
    slug: "wales",
    mainCity: "Cardiff",
    areas: "Cardiff, Swansea, Newport, Wrexham and Bangor",
    locations: ["cardiff", "swansea", "newport", "wrexham", "bangor", "aberystwyth"],
  },
};

export function getGuideRegion(): GuideRegion | null {
  return REGIONS[getSiteId()] || null;
}
