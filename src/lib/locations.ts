import type { Location } from "@/types";

export const LOCATION_CONFIG: Record<
  string,
  { name: string; lat: number; lng: number; description: string }
> = {
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

export function getLocationFromFoundIn(foundIn: string): string {
  const mapping: Record<string, string> = {
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
  return mapping[foundIn] || "newcastle";
}

export function getAllLocationSlugs(): string[] {
  return Object.keys(LOCATION_CONFIG);
}

export function getLocationBySlug(slug: string): Location | null {
  const config = LOCATION_CONFIG[slug];
  if (!config) return null;
  return {
    slug,
    name: config.name,
    description: config.description,
    lat: config.lat,
    lng: config.lng,
    businessCount: 0, // populated by data.ts
  };
}
