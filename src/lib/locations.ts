import type { Location } from "@/types";
import { getSiteId } from "./siteConfig";

type LocationConfig = Record<
  string,
  { name: string; lat: number; lng: number; description: string }
>;

const NE_LOCATIONS: LocationConfig = {
  newcastle: {
    name: "Newcastle upon Tyne",
    lat: 54.9783,
    lng: -1.6178,
    description:
      "Compare minibus and coach hire companies in Newcastle upon Tyne. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Newcastle and the Tyne Valley.",
  },
  sunderland: {
    name: "Sunderland",
    lat: 54.9069,
    lng: -1.3838,
    description:
      "Find trusted minibus and coach hire companies in Sunderland. Compare prices for minibus hire, self-drive options, party buses and coach hire across Wearside.",
  },
  durham: {
    name: "Durham",
    lat: 54.7753,
    lng: -1.5849,
    description:
      "Browse minibus and coach hire operators in County Durham. Compare prices and reviews for minibus hire, coach hire and party buses across Durham and the surrounding area.",
  },
  middlesbrough: {
    name: "Middlesbrough",
    lat: 54.5742,
    lng: -1.235,
    description:
      "Compare minibus and coach hire in Middlesbrough. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Teesside.",
  },
  gateshead: {
    name: "Gateshead",
    lat: 54.9527,
    lng: -1.6035,
    description:
      "Find minibus and coach hire companies in Gateshead. Compare prices and reviews for group transport, party buses and coach hire across Gateshead and the Team Valley.",
  },
  darlington: {
    name: "Darlington",
    lat: 54.5235,
    lng: -1.5527,
    description:
      "Compare minibus and coach hire in Darlington. Find trusted operators for group transport, airport transfers and coach hire in Darlington and surrounding areas.",
  },
  hartlepool: {
    name: "Hartlepool",
    lat: 54.6863,
    lng: -1.2129,
    description:
      "Browse minibus and coach hire companies in Hartlepool. Compare prices for minibus hire, self-drive options and coach hire across Hartlepool and East Durham.",
  },
  northumberland: {
    name: "Northumberland",
    lat: 55.2083,
    lng: -2.0784,
    description:
      "Find minibus and coach hire across Northumberland. Compare operators in Alnwick, Morpeth, Hexham, Ashington and throughout the county.",
  },
  "stockton-on-tees": {
    name: "Stockton-on-Tees",
    lat: 54.5681,
    lng: -1.3187,
    description:
      "Compare minibus and coach hire in Stockton-on-Tees. Find group transport, self-drive options and coach hire across Stockton and the Tees Valley.",
  },
  redcar: {
    name: "Redcar",
    lat: 54.6152,
    lng: -1.0687,
    description:
      "Browse minibus and coach hire companies in Redcar. Compare prices for group transport, airport transfers and coach hire across Redcar and Cleveland.",
  },
  "whitley-bay": {
    name: "Whitley Bay",
    lat: 55.0461,
    lng: -1.4443,
    description:
      "Find minibus and coach hire in Whitley Bay and the North Tyneside coast. Compare prices for party buses, group transport and airport transfers.",
  },
  washington: {
    name: "Washington",
    lat: 54.9,
    lng: -1.52,
    description:
      "Compare minibus and coach hire in Washington, Tyne and Wear. Find operators for group transport, self-drive minibus hire and coach hire.",
  },
  tynemouth: {
    name: "Tynemouth",
    lat: 55.0175,
    lng: -1.4256,
    description:
      "Find minibus and coach hire in Tynemouth and North Shields. Compare prices for group transport, party buses and airport transfers.",
  },
  "south-shields": {
    name: "South Shields",
    lat: 54.9984,
    lng: -1.432,
    description:
      "Browse minibus and coach hire in South Shields. Compare prices for group transport, airport transfers and coach hire across South Tyneside.",
  },
  cramlington: {
    name: "Cramlington",
    lat: 55.0861,
    lng: -1.5854,
    description:
      "Find minibus and coach hire in Cramlington. Compare operators for group transport and coach hire in Cramlington and South East Northumberland.",
  },
  morpeth: {
    name: "Morpeth",
    lat: 55.1685,
    lng: -1.6908,
    description:
      "Compare minibus and coach hire in Morpeth. Find trusted operators for group transport and coach hire across Morpeth and Central Northumberland.",
  },
};

const NW_LOCATIONS: LocationConfig = {
  manchester: {
    name: "Manchester",
    lat: 53.4808,
    lng: -2.2426,
    description:
      "Compare minibus and coach hire companies in Manchester. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Greater Manchester.",
  },
  liverpool: {
    name: "Liverpool",
    lat: 53.4084,
    lng: -2.9916,
    description:
      "Find trusted minibus and coach hire companies in Liverpool. Compare prices for minibus hire, party buses, coach hire and group transport across Merseyside.",
  },
  warrington: {
    name: "Warrington",
    lat: 53.39,
    lng: -2.597,
    description:
      "Browse minibus and coach hire operators in Warrington. Compare prices and reviews for group transport, airport transfers and coach hire across Warrington and Cheshire.",
  },
  bolton: {
    name: "Bolton",
    lat: 53.578,
    lng: -2.4282,
    description:
      "Compare minibus and coach hire in Bolton. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Bolton and surrounding areas.",
  },
  preston: {
    name: "Preston",
    lat: 53.7632,
    lng: -2.7031,
    description:
      "Find minibus and coach hire companies in Preston. Compare prices for group transport, coach hire, party buses and airport transfers across Preston and Central Lancashire.",
  },
  blackburn: {
    name: "Blackburn",
    lat: 53.7485,
    lng: -2.4847,
    description:
      "Browse minibus and coach hire in Blackburn. Compare operators for group transport, minibus hire and coach hire across Blackburn with Darwen and East Lancashire.",
  },
  wigan: {
    name: "Wigan",
    lat: 53.545,
    lng: -2.6325,
    description:
      "Compare minibus and coach hire in Wigan. Find trusted operators for group transport, minibus hire and coach hire across Wigan and the surrounding borough.",
  },
  burnley: {
    name: "Burnley",
    lat: 53.7893,
    lng: -2.2483,
    description:
      "Find minibus and coach hire in Burnley. Compare prices for group transport, coach hire and minibus hire across Burnley, Pendle and the Ribble Valley.",
  },
  blackpool: {
    name: "Blackpool",
    lat: 53.8142,
    lng: -3.0503,
    description:
      "Browse minibus and coach hire companies in Blackpool. Compare prices for party buses, group transport and coach hire across the Fylde Coast.",
  },
  oldham: {
    name: "Oldham",
    lat: 53.5409,
    lng: -2.1114,
    description:
      "Compare minibus and coach hire in Oldham. Find operators for group transport, minibus hire and coach hire across Oldham and the Saddleworth area.",
  },
  salford: {
    name: "Salford",
    lat: 53.4875,
    lng: -2.2901,
    description:
      "Find minibus and coach hire companies in Salford. Compare prices for group transport, minibus hire and coach hire across Salford, Eccles and Swinton.",
  },
  rochdale: {
    name: "Rochdale",
    lat: 53.6097,
    lng: -2.1561,
    description:
      "Browse minibus and coach hire in Rochdale. Compare operators for group transport, minibus hire and coach hire across Rochdale, Heywood and Middleton.",
  },
  stockport: {
    name: "Stockport",
    lat: 53.4106,
    lng: -2.1575,
    description:
      "Compare minibus and coach hire in Stockport. Find trusted operators for group transport, minibus hire and coach hire across Stockport and South Manchester.",
  },
  southport: {
    name: "Southport",
    lat: 53.6475,
    lng: -3.0053,
    description:
      "Find minibus and coach hire in Southport. Compare prices for group transport, coach hire and minibus hire across Southport and the Sefton coast.",
  },
  lancaster: {
    name: "Lancaster",
    lat: 54.0466,
    lng: -2.8007,
    description:
      "Browse minibus and coach hire companies in Lancaster. Compare operators for group transport, minibus hire and coach hire across Lancaster and North Lancashire.",
  },
  kendal: {
    name: "Kendal",
    lat: 54.328,
    lng: -2.7461,
    description:
      "Compare minibus and coach hire in Kendal. Find operators for group transport, minibus hire and coach hire across Kendal, the Lake District and South Cumbria.",
  },
  "st-helens": {
    name: "St Helens",
    lat: 53.4534,
    lng: -2.7369,
    description:
      "Find minibus and coach hire in St Helens. Compare prices for group transport, minibus hire and coach hire across St Helens and the surrounding area.",
  },
  bury: {
    name: "Bury",
    lat: 53.5933,
    lng: -2.2966,
    description:
      "Browse minibus and coach hire in Bury. Compare operators for group transport, minibus hire and coach hire across Bury, Ramsbottom and Tottington.",
  },
  macclesfield: {
    name: "Macclesfield",
    lat: 53.2587,
    lng: -2.1257,
    description:
      "Compare minibus and coach hire in Macclesfield. Find operators for group transport and coach hire across Macclesfield, Congleton and East Cheshire.",
  },
  crewe: {
    name: "Crewe",
    lat: 53.0988,
    lng: -2.4404,
    description:
      "Find minibus and coach hire in Crewe. Compare prices for group transport, minibus hire and coach hire across Crewe, Nantwich and South Cheshire.",
  },
  leigh: {
    name: "Leigh",
    lat: 53.4964,
    lng: -2.5152,
    description:
      "Browse minibus and coach hire in Leigh. Compare operators for group transport and minibus hire across Leigh, Atherton and Tyldesley.",
  },
  chester: {
    name: "Chester",
    lat: 53.193,
    lng: -2.8931,
    description:
      "Compare minibus and coach hire in Chester. Find operators for group transport, coach hire and minibus hire across Chester and West Cheshire.",
  },
  chorley: {
    name: "Chorley",
    lat: 53.653,
    lng: -2.6325,
    description:
      "Find minibus and coach hire in Chorley. Compare prices for group transport, minibus hire and coach hire across Chorley and South Ribble.",
  },
};

const NE_LOCATION_MAP: Record<string, string> = {
  "Newcastle upon Tyne": "newcastle",
  Sunderland: "sunderland",
  Durham: "durham",
  Middlesbrough: "middlesbrough",
  Gateshead: "gateshead",
  Darlington: "darlington",
  Hartlepool: "hartlepool",
  Northumberland: "northumberland",
  "Stockton-on-Tees": "stockton-on-tees",
  Redcar: "redcar",
  "Whitley Bay": "whitley-bay",
  Washington: "washington",
  Tynemouth: "tynemouth",
  "South Shields": "south-shields",
  Cramlington: "cramlington",
  Morpeth: "morpeth",
};

const NW_LOCATION_MAP: Record<string, string> = {
  Manchester: "manchester",
  Liverpool: "liverpool",
  Warrington: "warrington",
  Bolton: "bolton",
  Preston: "preston",
  Blackburn: "blackburn",
  Wigan: "wigan",
  Burnley: "burnley",
  Blackpool: "blackpool",
  Oldham: "oldham",
  Salford: "salford",
  Rochdale: "rochdale",
  Stockport: "stockport",
  Southport: "southport",
  Lancaster: "lancaster",
  Kendal: "kendal",
  "St Helens": "st-helens",
  Bury: "bury",
  Macclesfield: "macclesfield",
  Crewe: "crewe",
  Leigh: "leigh",
  Chester: "chester",
  Chorley: "chorley",
};

export function getLocationConfig(): LocationConfig {
  return getSiteId() === "northwest" ? NW_LOCATIONS : NE_LOCATIONS;
}

export const LOCATION_CONFIG = getLocationConfig();

export function getLocationFromFoundIn(foundIn: string): string {
  const mapping =
    getSiteId() === "northwest" ? NW_LOCATION_MAP : NE_LOCATION_MAP;
  return mapping[foundIn] || Object.values(mapping)[0];
}

export function getAllLocationSlugs(): string[] {
  return Object.keys(getLocationConfig());
}

export function getLocationBySlug(slug: string): Location | null {
  const config = getLocationConfig()[slug];
  if (!config) return null;
  return {
    slug,
    name: config.name,
    description: config.description,
    lat: config.lat,
    lng: config.lng,
    businessCount: 0,
  };
}
