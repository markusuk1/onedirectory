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

const SC_LOCATIONS: LocationConfig = {
  glasgow: {
    name: "Glasgow",
    lat: 55.8642,
    lng: -4.2518,
    description:
      "Compare minibus and coach hire companies in Glasgow. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Greater Glasgow.",
  },
  edinburgh: {
    name: "Edinburgh",
    lat: 55.9533,
    lng: -3.1883,
    description:
      "Find trusted minibus and coach hire companies in Edinburgh. Compare prices for minibus hire, party buses, coach hire and group transport across the capital.",
  },
  aberdeen: {
    name: "Aberdeen",
    lat: 57.1497,
    lng: -2.0943,
    description:
      "Browse minibus and coach hire operators in Aberdeen. Compare prices and reviews for group transport, airport transfers and coach hire across Aberdeenshire.",
  },
  dundee: {
    name: "Dundee",
    lat: 56.462,
    lng: -2.9707,
    description:
      "Compare minibus and coach hire in Dundee. Find the best operators for minibus hire, party buses and coach hire across Dundee and Angus.",
  },
  inverness: {
    name: "Inverness",
    lat: 57.4778,
    lng: -4.2247,
    description:
      "Find minibus and coach hire companies in Inverness. Compare prices for group transport, Highland tours and coach hire across the Highlands.",
  },
  stirling: {
    name: "Stirling",
    lat: 56.1165,
    lng: -3.9369,
    description:
      "Browse minibus and coach hire in Stirling. Compare operators for group transport, minibus hire and coach hire across Stirling and Central Scotland.",
  },
  perth: {
    name: "Perth",
    lat: 56.395,
    lng: -3.4308,
    description:
      "Compare minibus and coach hire in Perth. Find operators for group transport, coach hire and minibus hire across Perth and Perthshire.",
  },
  paisley: {
    name: "Paisley",
    lat: 55.8456,
    lng: -4.4239,
    description:
      "Find minibus and coach hire in Paisley. Compare prices for group transport, airport transfers and coach hire across Paisley and Renfrewshire.",
  },
  "east-kilbride": {
    name: "East Kilbride",
    lat: 55.7644,
    lng: -4.1769,
    description:
      "Browse minibus and coach hire in East Kilbride. Compare operators for group transport, minibus hire and coach hire across East Kilbride and South Lanarkshire.",
  },
  livingston: {
    name: "Livingston",
    lat: 55.9024,
    lng: -3.5159,
    description:
      "Compare minibus and coach hire in Livingston. Find operators for group transport and coach hire across Livingston and West Lothian.",
  },
  cumbernauld: {
    name: "Cumbernauld",
    lat: 55.9465,
    lng: -3.994,
    description:
      "Find minibus and coach hire in Cumbernauld. Compare prices for group transport, minibus hire and coach hire across Cumbernauld and North Lanarkshire.",
  },
  kirkcaldy: {
    name: "Kirkcaldy",
    lat: 56.1132,
    lng: -3.1595,
    description:
      "Browse minibus and coach hire in Kirkcaldy. Compare operators for group transport and coach hire across Kirkcaldy and the Kingdom of Fife.",
  },
  dunfermline: {
    name: "Dunfermline",
    lat: 56.0719,
    lng: -3.4393,
    description:
      "Compare minibus and coach hire in Dunfermline. Find operators for group transport and coach hire across Dunfermline and West Fife.",
  },
  ayr: {
    name: "Ayr",
    lat: 55.4588,
    lng: -4.6292,
    description:
      "Find minibus and coach hire in Ayr. Compare prices for group transport, race day transport and coach hire across Ayr and Ayrshire.",
  },
  kilmarnock: {
    name: "Kilmarnock",
    lat: 55.6113,
    lng: -4.4955,
    description:
      "Browse minibus and coach hire in Kilmarnock. Compare operators for group transport and coach hire across Kilmarnock and East Ayrshire.",
  },
  falkirk: {
    name: "Falkirk",
    lat: 56.0019,
    lng: -3.7839,
    description:
      "Compare minibus and coach hire in Falkirk. Find operators for group transport and coach hire across Falkirk and the Forth Valley.",
  },
  motherwell: {
    name: "Motherwell",
    lat: 55.7894,
    lng: -3.9915,
    description:
      "Find minibus and coach hire in Motherwell. Compare prices for group transport and coach hire across Motherwell and North Lanarkshire.",
  },
  hamilton: {
    name: "Hamilton",
    lat: 55.7731,
    lng: -4.038,
    description:
      "Browse minibus and coach hire in Hamilton. Compare operators for group transport, minibus hire and coach hire across Hamilton and South Lanarkshire.",
  },
  greenock: {
    name: "Greenock",
    lat: 55.9496,
    lng: -4.7645,
    description:
      "Compare minibus and coach hire in Greenock. Find operators for group transport and coach hire across Greenock and Inverclyde.",
  },
  dumfries: {
    name: "Dumfries",
    lat: 55.07,
    lng: -3.6129,
    description:
      "Find minibus and coach hire in Dumfries. Compare prices for group transport, coach hire and minibus hire across Dumfries and Galloway.",
  },
  "fort-william": {
    name: "Fort William",
    lat: 56.8198,
    lng: -5.1052,
    description:
      "Browse minibus and coach hire in Fort William. Compare operators for group transport, Highland tours and coach hire across Lochaber and the West Highlands.",
  },
  oban: {
    name: "Oban",
    lat: 56.4125,
    lng: -5.4724,
    description:
      "Compare minibus and coach hire in Oban. Find operators for group transport, island connections and coach hire across Oban and Argyll.",
  },
};

const ML_LOCATIONS: LocationConfig = {
  birmingham: {
    name: "Birmingham",
    lat: 52.4862,
    lng: -1.8904,
    description:
      "Compare minibus and coach hire companies in Birmingham. Find the best prices for minibus hire, party buses, airport transfers and coach hire across the West Midlands.",
  },
  nottingham: {
    name: "Nottingham",
    lat: 52.9548,
    lng: -1.1581,
    description:
      "Find trusted minibus and coach hire companies in Nottingham. Compare prices for minibus hire, party buses, coach hire and group transport across Nottinghamshire.",
  },
  leicester: {
    name: "Leicester",
    lat: 52.6369,
    lng: -1.1398,
    description:
      "Browse minibus and coach hire operators in Leicester. Compare prices and reviews for group transport, minibus hire and coach hire across Leicestershire.",
  },
  coventry: {
    name: "Coventry",
    lat: 52.4068,
    lng: -1.5197,
    description:
      "Compare minibus and coach hire in Coventry. Find the best operators for minibus hire, party buses and coach hire across Coventry and Warwickshire.",
  },
  derby: {
    name: "Derby",
    lat: 52.9225,
    lng: -1.4746,
    description:
      "Find minibus and coach hire companies in Derby. Compare prices for group transport, coach hire and minibus hire across Derby and Derbyshire.",
  },
  wolverhampton: {
    name: "Wolverhampton",
    lat: 52.587,
    lng: -2.1288,
    description:
      "Browse minibus and coach hire in Wolverhampton. Compare operators for group transport, minibus hire and coach hire across Wolverhampton and the Black Country.",
  },
  "stoke-on-trent": {
    name: "Stoke-on-Trent",
    lat: 53.0027,
    lng: -2.1794,
    description:
      "Compare minibus and coach hire in Stoke-on-Trent. Find operators for group transport and coach hire across the Potteries and North Staffordshire.",
  },
  walsall: {
    name: "Walsall",
    lat: 52.586,
    lng: -1.9829,
    description:
      "Find minibus and coach hire in Walsall. Compare prices for group transport, minibus hire and coach hire across Walsall and the surrounding area.",
  },
  dudley: {
    name: "Dudley",
    lat: 52.5085,
    lng: -2.0895,
    description:
      "Browse minibus and coach hire in Dudley. Compare operators for group transport, minibus hire and coach hire across Dudley and the Black Country.",
  },
  solihull: {
    name: "Solihull",
    lat: 52.412,
    lng: -1.7782,
    description:
      "Compare minibus and coach hire in Solihull. Find operators for group transport, airport transfers and coach hire across Solihull and South Birmingham.",
  },
  telford: {
    name: "Telford",
    lat: 52.679,
    lng: -2.4497,
    description:
      "Find minibus and coach hire in Telford. Compare prices for group transport and coach hire across Telford and Shropshire.",
  },
  shrewsbury: {
    name: "Shrewsbury",
    lat: 52.7074,
    lng: -2.7539,
    description:
      "Browse minibus and coach hire in Shrewsbury. Compare operators for group transport and coach hire across Shrewsbury and rural Shropshire.",
  },
  worcester: {
    name: "Worcester",
    lat: 52.1936,
    lng: -2.2216,
    description:
      "Compare minibus and coach hire in Worcester. Find operators for group transport and coach hire across Worcester and Worcestershire.",
  },
  hereford: {
    name: "Hereford",
    lat: 52.0565,
    lng: -2.716,
    description:
      "Find minibus and coach hire in Hereford. Compare prices for group transport, coach hire and minibus hire across Hereford and Herefordshire.",
  },
  stafford: {
    name: "Stafford",
    lat: 52.8072,
    lng: -2.1172,
    description:
      "Browse minibus and coach hire in Stafford. Compare operators for group transport, minibus hire and coach hire across Stafford and Staffordshire.",
  },
  "burton-upon-trent": {
    name: "Burton upon Trent",
    lat: 52.8023,
    lng: -1.6298,
    description:
      "Compare minibus and coach hire in Burton upon Trent. Find operators for group transport and coach hire across Burton and East Staffordshire.",
  },
  tamworth: {
    name: "Tamworth",
    lat: 52.6339,
    lng: -1.695,
    description:
      "Find minibus and coach hire in Tamworth. Compare prices for group transport and coach hire across Tamworth and South East Staffordshire.",
  },
  nuneaton: {
    name: "Nuneaton",
    lat: 52.523,
    lng: -1.4684,
    description:
      "Browse minibus and coach hire in Nuneaton. Compare operators for group transport, minibus hire and coach hire across Nuneaton and North Warwickshire.",
  },
  rugby: {
    name: "Rugby",
    lat: 52.371,
    lng: -1.2615,
    description:
      "Compare minibus and coach hire in Rugby. Find operators for group transport and coach hire across Rugby and eastern Warwickshire.",
  },
  northampton: {
    name: "Northampton",
    lat: 52.2405,
    lng: -0.9027,
    description:
      "Find minibus and coach hire in Northampton. Compare prices for group transport, coach hire and minibus hire across Northampton and Northamptonshire.",
  },
  lincoln: {
    name: "Lincoln",
    lat: 53.2307,
    lng: -0.5406,
    description:
      "Browse minibus and coach hire in Lincoln. Compare operators for group transport and coach hire across Lincoln and Lincolnshire.",
  },
  loughborough: {
    name: "Loughborough",
    lat: 52.7721,
    lng: -1.2064,
    description:
      "Compare minibus and coach hire in Loughborough. Find operators for group transport, university events and coach hire across North Leicestershire.",
  },
  mansfield: {
    name: "Mansfield",
    lat: 53.1397,
    lng: -1.1989,
    description:
      "Find minibus and coach hire in Mansfield. Compare prices for group transport and coach hire across Mansfield and North Nottinghamshire.",
  },
  chesterfield: {
    name: "Chesterfield",
    lat: 53.235,
    lng: -1.421,
    description:
      "Browse minibus and coach hire in Chesterfield. Compare operators for group transport, Peak District trips and coach hire across North Derbyshire.",
  },
  kettering: {
    name: "Kettering",
    lat: 52.3939,
    lng: -0.7256,
    description:
      "Compare minibus and coach hire in Kettering. Find operators for group transport and coach hire across Kettering and North Northamptonshire.",
  },
};

const YK_LOCATIONS: LocationConfig = {
  leeds: {
    name: "Leeds",
    lat: 53.8008,
    lng: -1.5491,
    description:
      "Compare minibus and coach hire companies in Leeds. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Leeds and West Yorkshire.",
  },
  sheffield: {
    name: "Sheffield",
    lat: 53.3811,
    lng: -1.4701,
    description:
      "Find trusted minibus and coach hire companies in Sheffield. Compare prices for minibus hire, party buses, coach hire and group transport across Sheffield and South Yorkshire.",
  },
  york: {
    name: "York",
    lat: 53.9591,
    lng: -1.0815,
    description:
      "Browse minibus and coach hire operators in York. Compare prices and reviews for group transport, race day hire, city tours and coach hire across York and North Yorkshire.",
  },
  hull: {
    name: "Hull",
    lat: 53.7457,
    lng: -0.3367,
    description:
      "Compare minibus and coach hire in Hull. Find the best operators for minibus hire, party buses and coach hire across Hull and East Yorkshire.",
  },
  bradford: {
    name: "Bradford",
    lat: 53.796,
    lng: -1.7594,
    description:
      "Find minibus and coach hire companies in Bradford. Compare prices for group transport, coach hire and minibus hire across Bradford and the surrounding area.",
  },
  doncaster: {
    name: "Doncaster",
    lat: 53.5228,
    lng: -1.1285,
    description:
      "Browse minibus and coach hire in Doncaster. Compare operators for group transport, race day hire, minibus hire and coach hire across Doncaster and South Yorkshire.",
  },
  huddersfield: {
    name: "Huddersfield",
    lat: 53.6458,
    lng: -1.785,
    description:
      "Compare minibus and coach hire in Huddersfield. Find operators for group transport, match day hire and coach hire across Huddersfield and Kirklees.",
  },
  harrogate: {
    name: "Harrogate",
    lat: 53.9921,
    lng: -1.5418,
    description:
      "Find minibus and coach hire in Harrogate. Compare prices for group transport, event hire and coach hire across Harrogate, Knaresborough and the surrounding area.",
  },
  wakefield: {
    name: "Wakefield",
    lat: 53.683,
    lng: -1.4991,
    description:
      "Browse minibus and coach hire in Wakefield. Compare operators for group transport, minibus hire and coach hire across the Wakefield district.",
  },
  rotherham: {
    name: "Rotherham",
    lat: 53.4326,
    lng: -1.3568,
    description:
      "Compare minibus and coach hire in Rotherham. Find operators for group transport and coach hire across Rotherham and South Yorkshire.",
  },
  barnsley: {
    name: "Barnsley",
    lat: 53.5529,
    lng: -1.4793,
    description:
      "Find minibus and coach hire in Barnsley. Compare prices for group transport, minibus hire and coach hire across Barnsley and the surrounding area.",
  },
  halifax: {
    name: "Halifax",
    lat: 53.7248,
    lng: -1.8658,
    description:
      "Browse minibus and coach hire in Halifax. Compare operators for group transport and coach hire across Halifax and Calderdale.",
  },
  scarborough: {
    name: "Scarborough",
    lat: 54.2793,
    lng: -0.4049,
    description:
      "Compare minibus and coach hire in Scarborough. Find operators for group transport, coastal trips and coach hire across Scarborough and the Yorkshire Coast.",
  },
  selby: {
    name: "Selby",
    lat: 53.782,
    lng: -1.0701,
    description:
      "Find minibus and coach hire in Selby. Compare prices for group transport and coach hire across Selby and the surrounding area.",
  },
  skipton: {
    name: "Skipton",
    lat: 53.9609,
    lng: -2.0174,
    description:
      "Browse minibus and coach hire in Skipton. Compare operators for group transport, Yorkshire Dales trips and coach hire across Skipton and Craven.",
  },
  bridlington: {
    name: "Bridlington",
    lat: 54.0841,
    lng: -0.1917,
    description:
      "Compare minibus and coach hire in Bridlington. Find operators for group transport and coach hire across Bridlington and the East Yorkshire coast.",
  },
  beverley: {
    name: "Beverley",
    lat: 53.8428,
    lng: -0.4284,
    description:
      "Find minibus and coach hire in Beverley. Compare prices for group transport, race day hire and coach hire across Beverley and East Yorkshire.",
  },
  dewsbury: {
    name: "Dewsbury",
    lat: 53.6908,
    lng: -1.6317,
    description:
      "Browse minibus and coach hire in Dewsbury. Compare operators for group transport and coach hire across Dewsbury and North Kirklees.",
  },
  keighley: {
    name: "Keighley",
    lat: 53.8679,
    lng: -1.9114,
    description:
      "Compare minibus and coach hire in Keighley. Find operators for group transport and coach hire across Keighley and the Aire Valley.",
  },
  pontefract: {
    name: "Pontefract",
    lat: 53.6918,
    lng: -1.3118,
    description:
      "Find minibus and coach hire in Pontefract. Compare prices for group transport, race day hire and coach hire across Pontefract and the Five Towns.",
  },
  whitby: {
    name: "Whitby",
    lat: 54.4858,
    lng: -0.6206,
    description:
      "Browse minibus and coach hire in Whitby. Compare operators for group transport, coastal trips and coach hire across Whitby and the North Yorkshire Moors.",
  },
  northallerton: {
    name: "Northallerton",
    lat: 54.3379,
    lng: -1.4285,
    description:
      "Compare minibus and coach hire in Northallerton. Find operators for group transport and coach hire across Northallerton and Hambleton.",
  },
  ripon: {
    name: "Ripon",
    lat: 54.1381,
    lng: -1.5245,
    description:
      "Find minibus and coach hire in Ripon. Compare prices for group transport and coach hire across Ripon and the Harrogate district.",
  },
  goole: {
    name: "Goole",
    lat: 53.7046,
    lng: -0.8687,
    description:
      "Browse minibus and coach hire in Goole. Compare operators for group transport and coach hire across Goole and the East Riding.",
  },
  castleford: {
    name: "Castleford",
    lat: 53.7252,
    lng: -1.356,
    description:
      "Compare minibus and coach hire in Castleford. Find operators for group transport and coach hire across Castleford and the Wakefield district.",
  },
  wetherby: {
    name: "Wetherby",
    lat: 53.9271,
    lng: -1.3863,
    description:
      "Find minibus and coach hire in Wetherby. Compare prices for group transport, race day hire and coach hire across Wetherby and North Leeds.",
  },
  batley: {
    name: "Batley",
    lat: 53.7152,
    lng: -1.6352,
    description:
      "Browse minibus and coach hire in Batley. Compare operators for group transport and coach hire across Batley and the Spen Valley.",
  },
  driffield: {
    name: "Driffield",
    lat: 54.0018,
    lng: -0.4394,
    description:
      "Compare minibus and coach hire in Driffield. Find operators for group transport and coach hire across Driffield and the Yorkshire Wolds.",
  },
  pocklington: {
    name: "Pocklington",
    lat: 53.9307,
    lng: -0.778,
    description:
      "Find minibus and coach hire in Pocklington. Compare prices for group transport and coach hire across Pocklington and the East Riding.",
  },
  todmorden: {
    name: "Todmorden",
    lat: 53.7143,
    lng: -2.0973,
    description:
      "Browse minibus and coach hire in Todmorden. Compare operators for group transport and coach hire across Todmorden and the Upper Calder Valley.",
  },
};

const EA_LOCATIONS: LocationConfig = {
  norwich: {
    name: "Norwich",
    lat: 52.6286,
    lng: 1.2974,
    description:
      "Compare minibus and coach hire companies in Norwich. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Norwich and Norfolk.",
  },
  cambridge: {
    name: "Cambridge",
    lat: 52.2044,
    lng: 0.1235,
    description:
      "Find trusted minibus and coach hire companies in Cambridge. Compare prices for minibus hire, party buses, coach hire and group transport across Cambridgeshire.",
  },
  ipswich: {
    name: "Ipswich",
    lat: 52.0567,
    lng: 1.1482,
    description:
      "Browse minibus and coach hire operators in Ipswich. Compare prices and reviews for group transport, airport transfers and coach hire across Ipswich and Suffolk.",
  },
  peterborough: {
    name: "Peterborough",
    lat: 52.5729,
    lng: -0.2416,
    description:
      "Compare minibus and coach hire in Peterborough. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Peterborough and the Fens.",
  },
  colchester: {
    name: "Colchester",
    lat: 51.8948,
    lng: 0.9024,
    description:
      "Find minibus and coach hire companies in Colchester. Compare prices for group transport, coach hire and minibus hire across Colchester and North Essex.",
  },
  chelmsford: {
    name: "Chelmsford",
    lat: 51.7356,
    lng: 0.4685,
    description:
      "Browse minibus and coach hire in Chelmsford. Compare operators for group transport, minibus hire and coach hire across Chelmsford and Central Essex.",
  },
  "southend-on-sea": {
    name: "Southend-on-Sea",
    lat: 51.5406,
    lng: 0.7077,
    description:
      "Compare minibus and coach hire in Southend-on-Sea. Find operators for group transport, party buses and coach hire across Southend and the Essex coast.",
  },
  luton: {
    name: "Luton",
    lat: 51.8787,
    lng: -0.42,
    description:
      "Find minibus and coach hire in Luton. Compare prices for airport transfers, group transport and coach hire across Luton and South Bedfordshire.",
  },
  bedford: {
    name: "Bedford",
    lat: 52.1356,
    lng: -0.4685,
    description:
      "Browse minibus and coach hire companies in Bedford. Compare prices for group transport, minibus hire and coach hire across Bedford and Bedfordshire.",
  },
  basildon: {
    name: "Basildon",
    lat: 51.5761,
    lng: 0.4886,
    description:
      "Compare minibus and coach hire in Basildon. Find operators for group transport, party buses and coach hire across Basildon and South Essex.",
  },
  stevenage: {
    name: "Stevenage",
    lat: 51.9022,
    lng: -0.2028,
    description:
      "Find minibus and coach hire in Stevenage. Compare prices for group transport and coach hire across Stevenage and North Hertfordshire.",
  },
  harlow: {
    name: "Harlow",
    lat: 51.7727,
    lng: 0.1072,
    description:
      "Browse minibus and coach hire in Harlow. Compare operators for group transport, Stansted airport transfers and coach hire across Harlow and West Essex.",
  },
  "great-yarmouth": {
    name: "Great Yarmouth",
    lat: 52.6069,
    lng: 1.7298,
    description:
      "Compare minibus and coach hire in Great Yarmouth. Find operators for group transport, coastal trips and coach hire across Great Yarmouth and the Norfolk Broads.",
  },
  "kings-lynn": {
    name: "Kings Lynn",
    lat: 52.7543,
    lng: 0.3956,
    description:
      "Find minibus and coach hire in Kings Lynn. Compare prices for group transport and coach hire across Kings Lynn and West Norfolk.",
  },
  "bury-st-edmunds": {
    name: "Bury St Edmunds",
    lat: 52.2474,
    lng: 0.7183,
    description:
      "Browse minibus and coach hire in Bury St Edmunds. Compare operators for group transport and coach hire across Bury St Edmunds and West Suffolk.",
  },
  lowestoft: {
    name: "Lowestoft",
    lat: 52.4776,
    lng: 1.7503,
    description:
      "Compare minibus and coach hire in Lowestoft. Find operators for group transport and coach hire across Lowestoft and the Suffolk coast.",
  },
  watford: {
    name: "Watford",
    lat: 51.6565,
    lng: -0.3903,
    description:
      "Find minibus and coach hire in Watford. Compare prices for group transport, airport transfers and coach hire across Watford and South West Hertfordshire.",
  },
  "st-albans": {
    name: "St Albans",
    lat: 51.755,
    lng: -0.336,
    description:
      "Browse minibus and coach hire in St Albans. Compare operators for group transport, Luton airport transfers and coach hire across St Albans and Hertfordshire.",
  },
  hertford: {
    name: "Hertford",
    lat: 51.7961,
    lng: -0.0785,
    description:
      "Compare minibus and coach hire in Hertford. Find operators for group transport and coach hire across Hertford and East Hertfordshire.",
  },
  huntingdon: {
    name: "Huntingdon",
    lat: 52.331,
    lng: -0.1869,
    description:
      "Find minibus and coach hire in Huntingdon. Compare prices for group transport and coach hire across Huntingdon and the surrounding area.",
  },
  braintree: {
    name: "Braintree",
    lat: 51.8786,
    lng: 0.5535,
    description:
      "Browse minibus and coach hire in Braintree. Compare operators for group transport and coach hire across Braintree and North Essex.",
  },
  "clacton-on-sea": {
    name: "Clacton-on-Sea",
    lat: 51.7898,
    lng: 1.1565,
    description:
      "Compare minibus and coach hire in Clacton-on-Sea. Find operators for group transport and coach hire across the Tendring coast.",
  },
  newmarket: {
    name: "Newmarket",
    lat: 52.246,
    lng: 0.4054,
    description:
      "Find minibus and coach hire in Newmarket. Compare prices for group transport, race day hire and coach hire across Newmarket and West Suffolk.",
  },
  thetford: {
    name: "Thetford",
    lat: 52.413,
    lng: 0.7401,
    description:
      "Browse minibus and coach hire in Thetford. Compare operators for group transport and coach hire across Thetford and the Breckland area.",
  },
  "welwyn-garden-city": {
    name: "Welwyn Garden City",
    lat: 51.801,
    lng: -0.1989,
    description:
      "Compare minibus and coach hire in Welwyn Garden City. Find operators for group transport and coach hire across Welwyn, Hatfield and Central Hertfordshire.",
  },
  "st-neots": {
    name: "St Neots",
    lat: 52.229,
    lng: -0.27,
    description:
      "Find minibus and coach hire in St Neots. Compare prices for group transport and coach hire across St Neots and South Cambridgeshire.",
  },
};

const LN_LOCATIONS: LocationConfig = {
  "central-london": {
    name: "Central London",
    lat: 51.5074,
    lng: -0.1278,
    description:
      "Compare minibus and coach hire companies in Central London. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Central London and the West End.",
  },
  westminster: {
    name: "Westminster",
    lat: 51.4975,
    lng: -0.1357,
    description:
      "Find trusted minibus and coach hire companies in Westminster. Compare prices for minibus hire, party buses, coach hire and group transport across Westminster and surrounding areas.",
  },
  wimbledon: {
    name: "Wimbledon",
    lat: 51.4214,
    lng: -0.2064,
    description:
      "Browse minibus and coach hire operators in Wimbledon. Compare prices and reviews for group transport, event hire and coach hire across Wimbledon and South West London.",
  },
  "city-of-london": {
    name: "City of London",
    lat: 51.5155,
    lng: -0.0922,
    description:
      "Compare minibus and coach hire in the City of London. Find the best operators for minibus hire, corporate transport and coach hire across the Square Mile.",
  },
  kensington: {
    name: "Kensington",
    lat: 51.4988,
    lng: -0.1749,
    description:
      "Find minibus and coach hire companies in Kensington. Compare prices for group transport, event hire and coach hire across Kensington and West London.",
  },
  barnet: {
    name: "Barnet",
    lat: 51.6532,
    lng: -0.1997,
    description:
      "Browse minibus and coach hire in Barnet. Compare operators for group transport, minibus hire and coach hire across Barnet and North London.",
  },
  dagenham: {
    name: "Dagenham",
    lat: 51.5444,
    lng: 0.1548,
    description:
      "Compare minibus and coach hire in Dagenham. Find operators for group transport, minibus hire and coach hire across Dagenham and East London.",
  },
  brixton: {
    name: "Brixton",
    lat: 51.4613,
    lng: -0.1156,
    description:
      "Find minibus and coach hire in Brixton. Compare prices for group transport, party buses and coach hire across Brixton and South London.",
  },
  twickenham: {
    name: "Twickenham",
    lat: 51.449,
    lng: -0.3377,
    description:
      "Browse minibus and coach hire in Twickenham. Compare operators for group transport, match day hire and coach hire across Twickenham and South West London.",
  },
  greenwich: {
    name: "Greenwich",
    lat: 51.4769,
    lng: -0.0005,
    description:
      "Compare minibus and coach hire in Greenwich. Find operators for group transport, sightseeing tours and coach hire across Greenwich and South East London.",
  },
  hayes: {
    name: "Hayes",
    lat: 51.5127,
    lng: -0.4213,
    description:
      "Find minibus and coach hire in Hayes. Compare prices for group transport, Heathrow airport transfers and coach hire across Hayes and West London.",
  },
  lewisham: {
    name: "Lewisham",
    lat: 51.4415,
    lng: -0.0117,
    description:
      "Browse minibus and coach hire in Lewisham. Compare operators for group transport, minibus hire and coach hire across Lewisham and South East London.",
  },
  islington: {
    name: "Islington",
    lat: 51.5362,
    lng: -0.1033,
    description:
      "Compare minibus and coach hire in Islington. Find operators for group transport, party buses and coach hire across Islington and North London.",
  },
  acton: {
    name: "Acton",
    lat: 51.5095,
    lng: -0.2716,
    description:
      "Find minibus and coach hire in Acton. Compare prices for group transport and coach hire across Acton and West London.",
  },
  bromley: {
    name: "Bromley",
    lat: 51.4039,
    lng: 0.0198,
    description:
      "Browse minibus and coach hire in Bromley. Compare operators for group transport, minibus hire and coach hire across Bromley and South East London.",
  },
  docklands: {
    name: "Docklands",
    lat: 51.4953,
    lng: -0.0235,
    description:
      "Compare minibus and coach hire in Docklands. Find operators for group transport, corporate hire and coach hire across London Docklands and East London.",
  },
  stansted: {
    name: "Stansted",
    lat: 51.885,
    lng: 0.235,
    description:
      "Find minibus and coach hire near Stansted Airport. Compare prices for airport transfers, group transport and coach hire across Stansted and the surrounding area.",
  },
  chelsea: {
    name: "Chelsea",
    lat: 51.4875,
    lng: -0.1687,
    description:
      "Browse minibus and coach hire in Chelsea. Compare operators for group transport, event hire and coach hire across Chelsea and South West London.",
  },
  putney: {
    name: "Putney",
    lat: 51.4585,
    lng: -0.2163,
    description:
      "Compare minibus and coach hire in Putney. Find operators for group transport and coach hire across Putney and South West London.",
  },
  mitcham: {
    name: "Mitcham",
    lat: 51.4009,
    lng: -0.1539,
    description:
      "Find minibus and coach hire in Mitcham. Compare prices for group transport, minibus hire and coach hire across Mitcham and South London.",
  },
  sutton: {
    name: "Sutton",
    lat: 51.3618,
    lng: -0.1945,
    description:
      "Browse minibus and coach hire in Sutton. Compare operators for group transport and coach hire across Sutton and the surrounding area.",
  },
  orpington: {
    name: "Orpington",
    lat: 51.3742,
    lng: 0.0987,
    description:
      "Compare minibus and coach hire in Orpington. Find operators for group transport and coach hire across Orpington and the London Borough of Bromley.",
  },
  romford: {
    name: "Romford",
    lat: 51.5768,
    lng: 0.1801,
    description:
      "Find minibus and coach hire in Romford. Compare prices for group transport, minibus hire and coach hire across Romford and East London.",
  },
  richmond: {
    name: "Richmond",
    lat: 51.4613,
    lng: -0.3037,
    description:
      "Browse minibus and coach hire in Richmond. Compare operators for group transport, event hire and coach hire across Richmond upon Thames and South West London.",
  },
  wembley: {
    name: "Wembley",
    lat: 51.5523,
    lng: -0.2965,
    description:
      "Compare minibus and coach hire in Wembley. Find operators for group transport, match day hire and coach hire across Wembley and North West London.",
  },
  hampstead: {
    name: "Hampstead",
    lat: 51.556,
    lng: -0.1781,
    description:
      "Find minibus and coach hire in Hampstead. Compare prices for group transport and coach hire across Hampstead and North London.",
  },
  highgate: {
    name: "Highgate",
    lat: 51.5716,
    lng: -0.1448,
    description:
      "Browse minibus and coach hire in Highgate. Compare operators for group transport and coach hire across Highgate and North London.",
  },
  "muswell-hill": {
    name: "Muswell Hill",
    lat: 51.5893,
    lng: -0.1441,
    description:
      "Compare minibus and coach hire in Muswell Hill. Find operators for group transport and coach hire across Muswell Hill and North London.",
  },
  stratford: {
    name: "Stratford",
    lat: 51.5423,
    lng: -0.0003,
    description:
      "Find minibus and coach hire in Stratford. Compare prices for group transport, Olympic Park events and coach hire across Stratford and East London.",
  },
  barking: {
    name: "Barking",
    lat: 51.5397,
    lng: 0.0808,
    description:
      "Browse minibus and coach hire in Barking. Compare operators for group transport, minibus hire and coach hire across Barking and East London.",
  },
  "canary-wharf": {
    name: "Canary Wharf",
    lat: 51.5054,
    lng: -0.0235,
    description:
      "Compare minibus and coach hire in Canary Wharf. Find operators for corporate transport, group hire and coach hire across Canary Wharf and the Docklands.",
  },
  hounslow: {
    name: "Hounslow",
    lat: 51.4668,
    lng: -0.3613,
    description:
      "Find minibus and coach hire in Hounslow. Compare prices for group transport, Heathrow airport transfers and coach hire across Hounslow and West London.",
  },
  uxbridge: {
    name: "Uxbridge",
    lat: 51.5468,
    lng: -0.4777,
    description:
      "Browse minibus and coach hire in Uxbridge. Compare operators for group transport, minibus hire and coach hire across Uxbridge and the London Borough of Hillingdon.",
  },
  enfield: {
    name: "Enfield",
    lat: 51.6522,
    lng: -0.0808,
    description:
      "Compare minibus and coach hire in Enfield. Find operators for group transport and coach hire across Enfield and North London.",
  },
  "wood-green": {
    name: "Wood Green",
    lat: 51.5975,
    lng: -0.1097,
    description:
      "Find minibus and coach hire in Wood Green. Compare prices for group transport and coach hire across Wood Green and the London Borough of Haringey.",
  },
  tooting: {
    name: "Tooting",
    lat: 51.4274,
    lng: -0.168,
    description:
      "Browse minibus and coach hire in Tooting. Compare operators for group transport and coach hire across Tooting and South London.",
  },
  battersea: {
    name: "Battersea",
    lat: 51.4756,
    lng: -0.1459,
    description:
      "Compare minibus and coach hire in Battersea. Find operators for group transport, event hire and coach hire across Battersea and South West London.",
  },
  hackney: {
    name: "Hackney",
    lat: 51.5449,
    lng: -0.0553,
    description:
      "Find minibus and coach hire in Hackney. Compare prices for group transport, party buses and coach hire across Hackney and East London.",
  },
  walthamstow: {
    name: "Walthamstow",
    lat: 51.5842,
    lng: -0.0198,
    description:
      "Browse minibus and coach hire in Walthamstow. Compare operators for group transport and coach hire across Walthamstow and North East London.",
  },
  fulham: {
    name: "Fulham",
    lat: 51.4737,
    lng: -0.2021,
    description:
      "Compare minibus and coach hire in Fulham. Find operators for group transport, match day hire and coach hire across Fulham and South West London.",
  },
  ealing: {
    name: "Ealing",
    lat: 51.5133,
    lng: -0.3045,
    description:
      "Find minibus and coach hire in Ealing. Compare prices for group transport, minibus hire and coach hire across Ealing and West London.",
  },
  gatwick: {
    name: "Gatwick",
    lat: 51.1537,
    lng: -0.1821,
    description:
      "Browse minibus and coach hire near Gatwick Airport. Compare operators for airport transfers, group transport and coach hire across the Gatwick area.",
  },
  "london-city-airport": {
    name: "London City Airport",
    lat: 51.5048,
    lng: 0.0495,
    description:
      "Compare minibus and coach hire near London City Airport. Find operators for airport transfers, corporate transport and coach hire across East London.",
  },
  camden: {
    name: "Camden",
    lat: 51.5416,
    lng: -0.1426,
    description:
      "Find minibus and coach hire in Camden. Compare prices for group transport, party buses and coach hire across Camden and North London.",
  },
  hornsey: {
    name: "Hornsey",
    lat: 51.5868,
    lng: -0.118,
    description:
      "Browse minibus and coach hire in Hornsey. Compare operators for group transport and coach hire across Hornsey and the London Borough of Haringey.",
  },
  edmonton: {
    name: "Edmonton",
    lat: 51.6154,
    lng: -0.0605,
    description:
      "Compare minibus and coach hire in Edmonton. Find operators for group transport and coach hire across Edmonton and North London.",
  },
  leyton: {
    name: "Leyton",
    lat: 51.5566,
    lng: -0.0134,
    description:
      "Find minibus and coach hire in Leyton. Compare prices for group transport and coach hire across Leyton and East London.",
  },
  "east-ham": {
    name: "East Ham",
    lat: 51.5323,
    lng: 0.0554,
    description:
      "Browse minibus and coach hire in East Ham. Compare operators for group transport and coach hire across East Ham and the London Borough of Newham.",
  },
  ilford: {
    name: "Ilford",
    lat: 51.5588,
    lng: 0.0737,
    description:
      "Compare minibus and coach hire in Ilford. Find operators for group transport, minibus hire and coach hire across Ilford and the London Borough of Redbridge.",
  },
  "shepherds-bush": {
    name: "Shepherds Bush",
    lat: 51.5042,
    lng: -0.2265,
    description:
      "Find minibus and coach hire in Shepherds Bush. Compare prices for group transport, event hire and coach hire across Shepherds Bush and West London.",
  },
  brentford: {
    name: "Brentford",
    lat: 51.4871,
    lng: -0.3088,
    description:
      "Browse minibus and coach hire in Brentford. Compare operators for group transport, match day hire and coach hire across Brentford and West London.",
  },
  kingston: {
    name: "Kingston",
    lat: 51.4123,
    lng: -0.3007,
    description:
      "Compare minibus and coach hire in Kingston upon Thames. Find operators for group transport and coach hire across Kingston and South West London.",
  },
  clapham: {
    name: "Clapham",
    lat: 51.4618,
    lng: -0.1384,
    description:
      "Find minibus and coach hire in Clapham. Compare prices for group transport, party buses and coach hire across Clapham and South London.",
  },
  dulwich: {
    name: "Dulwich",
    lat: 51.4452,
    lng: -0.0861,
    description:
      "Browse minibus and coach hire in Dulwich. Compare operators for group transport and coach hire across Dulwich and South East London.",
  },
  streatham: {
    name: "Streatham",
    lat: 51.4279,
    lng: -0.1233,
    description:
      "Compare minibus and coach hire in Streatham. Find operators for group transport and coach hire across Streatham and South London.",
  },
  chingford: {
    name: "Chingford",
    lat: 51.6234,
    lng: -0.0098,
    description:
      "Find minibus and coach hire in Chingford. Compare prices for group transport and coach hire across Chingford and North East London.",
  },
  woodford: {
    name: "Woodford",
    lat: 51.5908,
    lng: 0.0341,
    description:
      "Browse minibus and coach hire in Woodford. Compare operators for group transport and coach hire across Woodford and the London Borough of Redbridge.",
  },
  wanstead: {
    name: "Wanstead",
    lat: 51.5758,
    lng: 0.0286,
    description:
      "Compare minibus and coach hire in Wanstead. Find operators for group transport and coach hire across Wanstead and East London.",
  },
  hammersmith: {
    name: "Hammersmith",
    lat: 51.4927,
    lng: -0.2248,
    description:
      "Find minibus and coach hire in Hammersmith. Compare prices for group transport, event hire and coach hire across Hammersmith and West London.",
  },
  surbiton: {
    name: "Surbiton",
    lat: 51.3942,
    lng: -0.3065,
    description:
      "Browse minibus and coach hire in Surbiton. Compare operators for group transport and coach hire across Surbiton and South West London.",
  },
  feltham: {
    name: "Feltham",
    lat: 51.4496,
    lng: -0.4092,
    description:
      "Compare minibus and coach hire in Feltham. Find operators for group transport, Heathrow airport transfers and coach hire across Feltham and West London.",
  },
  ruislip: {
    name: "Ruislip",
    lat: 51.5766,
    lng: -0.4263,
    description:
      "Find minibus and coach hire in Ruislip. Compare prices for group transport and coach hire across Ruislip and the London Borough of Hillingdon.",
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

const SC_LOCATION_MAP: Record<string, string> = {
  Glasgow: "glasgow",
  Edinburgh: "edinburgh",
  Aberdeen: "aberdeen",
  Dundee: "dundee",
  Inverness: "inverness",
  Stirling: "stirling",
  Perth: "perth",
  Paisley: "paisley",
  "East Kilbride": "east-kilbride",
  Livingston: "livingston",
  Cumbernauld: "cumbernauld",
  Kirkcaldy: "kirkcaldy",
  Dunfermline: "dunfermline",
  Ayr: "ayr",
  Kilmarnock: "kilmarnock",
  Falkirk: "falkirk",
  Motherwell: "motherwell",
  Hamilton: "hamilton",
  Greenock: "greenock",
  Dumfries: "dumfries",
  "Fort William": "fort-william",
  Oban: "oban",
};

const ML_LOCATION_MAP: Record<string, string> = {
  Birmingham: "birmingham",
  Nottingham: "nottingham",
  Leicester: "leicester",
  Coventry: "coventry",
  Derby: "derby",
  Wolverhampton: "wolverhampton",
  "Stoke-on-Trent": "stoke-on-trent",
  Walsall: "walsall",
  Dudley: "dudley",
  Solihull: "solihull",
  Telford: "telford",
  Shrewsbury: "shrewsbury",
  Worcester: "worcester",
  Hereford: "hereford",
  Stafford: "stafford",
  "Burton upon Trent": "burton-upon-trent",
  Tamworth: "tamworth",
  Nuneaton: "nuneaton",
  Rugby: "rugby",
  Northampton: "northampton",
  Lincoln: "lincoln",
  Loughborough: "loughborough",
  Mansfield: "mansfield",
  Chesterfield: "chesterfield",
  Kettering: "kettering",
};

const YK_LOCATION_MAP: Record<string, string> = {
  Leeds: "leeds",
  Sheffield: "sheffield",
  York: "york",
  Hull: "hull",
  Bradford: "bradford",
  Doncaster: "doncaster",
  Huddersfield: "huddersfield",
  Harrogate: "harrogate",
  Wakefield: "wakefield",
  Rotherham: "rotherham",
  Barnsley: "barnsley",
  Halifax: "halifax",
  Scarborough: "scarborough",
  Selby: "selby",
  Skipton: "skipton",
  Bridlington: "bridlington",
  Beverley: "beverley",
  Dewsbury: "dewsbury",
  Keighley: "keighley",
  Pontefract: "pontefract",
  Whitby: "whitby",
  Northallerton: "northallerton",
  Ripon: "ripon",
  Goole: "goole",
  Castleford: "castleford",
  Wetherby: "wetherby",
  Batley: "batley",
  Driffield: "driffield",
  Pocklington: "pocklington",
  Todmorden: "todmorden",
};

const EA_LOCATION_MAP: Record<string, string> = {
  Norwich: "norwich",
  Cambridge: "cambridge",
  Ipswich: "ipswich",
  Peterborough: "peterborough",
  Colchester: "colchester",
  Chelmsford: "chelmsford",
  "Southend-on-Sea": "southend-on-sea",
  Luton: "luton",
  Bedford: "bedford",
  Basildon: "basildon",
  Stevenage: "stevenage",
  Harlow: "harlow",
  "Great Yarmouth": "great-yarmouth",
  "Kings Lynn": "kings-lynn",
  "Bury St Edmunds": "bury-st-edmunds",
  Lowestoft: "lowestoft",
  Watford: "watford",
  "St Albans": "st-albans",
  Hertford: "hertford",
  Huntingdon: "huntingdon",
  Braintree: "braintree",
  "Clacton-on-Sea": "clacton-on-sea",
  Newmarket: "newmarket",
  Thetford: "thetford",
  "Welwyn Garden City": "welwyn-garden-city",
  "St Neots": "st-neots",
};

const LN_LOCATION_MAP: Record<string, string> = {
  "Central London": "central-london",
  Westminster: "westminster",
  Wimbledon: "wimbledon",
  "City of London": "city-of-london",
  Kensington: "kensington",
  Barnet: "barnet",
  Dagenham: "dagenham",
  Brixton: "brixton",
  Twickenham: "twickenham",
  Greenwich: "greenwich",
  Hayes: "hayes",
  Lewisham: "lewisham",
  Islington: "islington",
  Acton: "acton",
  Bromley: "bromley",
  Docklands: "docklands",
  Stansted: "stansted",
  Chelsea: "chelsea",
  Putney: "putney",
  Mitcham: "mitcham",
  Sutton: "sutton",
  Orpington: "orpington",
  Romford: "romford",
  Richmond: "richmond",
  Wembley: "wembley",
  Hampstead: "hampstead",
  Highgate: "highgate",
  "Muswell Hill": "muswell-hill",
  Stratford: "stratford",
  Barking: "barking",
  "Canary Wharf": "canary-wharf",
  Hounslow: "hounslow",
  Uxbridge: "uxbridge",
  Enfield: "enfield",
  "Wood Green": "wood-green",
  Tooting: "tooting",
  Battersea: "battersea",
  Hackney: "hackney",
  Walthamstow: "walthamstow",
  Fulham: "fulham",
  Ealing: "ealing",
  Gatwick: "gatwick",
  "London City Airport": "london-city-airport",
  Camden: "camden",
  Hornsey: "hornsey",
  Edmonton: "edmonton",
  Leyton: "leyton",
  "East Ham": "east-ham",
  Ilford: "ilford",
  "Shepherds Bush": "shepherds-bush",
  Brentford: "brentford",
  Kingston: "kingston",
  Clapham: "clapham",
  Dulwich: "dulwich",
  Streatham: "streatham",
  Chingford: "chingford",
  Woodford: "woodford",
  Wanstead: "wanstead",
  Hammersmith: "hammersmith",
  Surbiton: "surbiton",
  Feltham: "feltham",
  Ruislip: "ruislip",
};

const SW_LOCATIONS: LocationConfig = {
  "bristol": { name: "Bristol", lat: 51.4545, lng: -2.5879, description: "Compare minibus and coach hire companies in Bristol. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Bristol and the surrounding area." },
  "plymouth": { name: "Plymouth", lat: 50.3755, lng: -4.1427, description: "Find trusted minibus and coach hire companies in Plymouth. Compare prices for minibus hire, party buses, coach hire and group transport across Plymouth and South Devon." },
  "salisbury": { name: "Salisbury", lat: 51.0688, lng: -1.7945, description: "Browse minibus and coach hire operators in Salisbury. Compare prices and reviews for group transport, airport transfers and coach hire across Salisbury and South Wiltshire." },
  "torquay": { name: "Torquay", lat: 50.4619, lng: -3.5253, description: "Compare minibus and coach hire in Torquay. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Torquay and the English Riviera." },
  "truro": { name: "Truro", lat: 50.2632, lng: -5.051, description: "Find minibus and coach hire companies in Truro. Compare prices for group transport, coach hire and minibus hire across Truro and Central Cornwall." },
  "exeter": { name: "Exeter", lat: 50.7184, lng: -3.5339, description: "Browse minibus and coach hire in Exeter. Compare operators for group transport, minibus hire and coach hire across Exeter and East Devon." },
  "weston-super-mare": { name: "Weston-super-Mare", lat: 51.346, lng: -2.977, description: "Compare minibus and coach hire in Weston-super-Mare. Find operators for group transport and coach hire across Weston-super-Mare and North Somerset." },
  "bournemouth": { name: "Bournemouth", lat: 50.7192, lng: -1.8808, description: "Find minibus and coach hire in Bournemouth. Compare prices for group transport and coach hire across Bournemouth and the Dorset coast." },
  "bath": { name: "Bath", lat: 51.3811, lng: -2.359, description: "Compare minibus and coach hire companies in Bath. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Bath and North East Somerset." },
  "gloucester": { name: "Gloucester", lat: 51.8642, lng: -2.2382, description: "Find trusted minibus and coach hire companies in Gloucester. Compare prices for minibus hire, party buses, coach hire and group transport across Gloucester and Gloucestershire." },
  "wells": { name: "Wells", lat: 51.209, lng: -2.6471, description: "Browse minibus and coach hire operators in Wells. Compare prices and reviews for group transport, airport transfers and coach hire across Wells and the Mendip Hills." },
  "weymouth": { name: "Weymouth", lat: 50.6095, lng: -2.4519, description: "Compare minibus and coach hire in Weymouth. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Weymouth and South Dorset." },
  "clevedon": { name: "Clevedon", lat: 51.4385, lng: -2.854, description: "Find minibus and coach hire companies in Clevedon. Compare prices for group transport, coach hire and minibus hire across Clevedon and North Somerset." },
  "stroud": { name: "Stroud", lat: 51.744, lng: -2.2145, description: "Browse minibus and coach hire in Stroud. Compare operators for group transport, minibus hire and coach hire across Stroud and the Cotswold valleys." },
  "dursley": { name: "Dursley", lat: 51.6807, lng: -2.3537, description: "Compare minibus and coach hire in Dursley. Find operators for group transport and coach hire across Dursley and the South Cotswolds." },
  "glastonbury": { name: "Glastonbury", lat: 51.1483, lng: -2.714, description: "Find minibus and coach hire in Glastonbury. Compare prices for group transport and coach hire across Glastonbury and the Somerset Levels." },
  "taunton": { name: "Taunton", lat: 51.0154, lng: -3.1003, description: "Compare minibus and coach hire companies in Taunton. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Taunton and West Somerset." },
  "minehead": { name: "Minehead", lat: 51.2045, lng: -3.4738, description: "Find trusted minibus and coach hire companies in Minehead. Compare prices for minibus hire, party buses, coach hire and group transport across Minehead and Exmoor." },
  "newton-abbot": { name: "Newton Abbot", lat: 50.528, lng: -3.6097, description: "Browse minibus and coach hire operators in Newton Abbot. Compare prices and reviews for group transport, airport transfers and coach hire across Newton Abbot and South Devon." },
  "bideford": { name: "Bideford", lat: 51.0168, lng: -4.2064, description: "Compare minibus and coach hire in Bideford. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Bideford and North Devon." },
  "sidmouth": { name: "Sidmouth", lat: 50.6789, lng: -3.239, description: "Find minibus and coach hire companies in Sidmouth. Compare prices for group transport, coach hire and minibus hire across Sidmouth and the Jurassic Coast." },
  "helston": { name: "Helston", lat: 50.1003, lng: -5.275, description: "Browse minibus and coach hire in Helston. Compare operators for group transport, minibus hire and coach hire across Helston and the Lizard Peninsula." },
  "cheltenham": { name: "Cheltenham", lat: 51.8994, lng: -2.0783, description: "Compare minibus and coach hire in Cheltenham. Find operators for group transport and coach hire across Cheltenham and the Cotswolds." },
  "cirencester": { name: "Cirencester", lat: 51.7144, lng: -1.9686, description: "Find minibus and coach hire in Cirencester. Compare prices for group transport and coach hire across Cirencester and the Cotswolds." },
  "calne": { name: "Calne", lat: 51.438, lng: -2.005, description: "Compare minibus and coach hire companies in Calne. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Calne and North Wiltshire." },
  "christchurch": { name: "Christchurch", lat: 50.7353, lng: -1.773, description: "Find trusted minibus and coach hire companies in Christchurch. Compare prices for minibus hire, party buses, coach hire and group transport across Christchurch and East Dorset." },
  "portishead": { name: "Portishead", lat: 51.4837, lng: -2.7628, description: "Browse minibus and coach hire operators in Portishead. Compare prices and reviews for group transport, airport transfers and coach hire across Portishead and North Somerset." },
  "keynsham": { name: "Keynsham", lat: 51.414, lng: -2.497, description: "Compare minibus and coach hire in Keynsham. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Keynsham and the Bristol area." },
  "thornbury": { name: "Thornbury", lat: 51.6086, lng: -2.5252, description: "Find minibus and coach hire companies in Thornbury. Compare prices for group transport, coach hire and minibus hire across Thornbury and South Gloucestershire." },
  "chippenham": { name: "Chippenham", lat: 51.4613, lng: -2.116, description: "Browse minibus and coach hire in Chippenham. Compare operators for group transport, minibus hire and coach hire across Chippenham and North Wiltshire." },
  "devizes": { name: "Devizes", lat: 51.353, lng: -1.996, description: "Compare minibus and coach hire in Devizes. Find operators for group transport and coach hire across Devizes and Central Wiltshire." },
  "warminster": { name: "Warminster", lat: 51.206, lng: -2.179, description: "Find minibus and coach hire in Warminster. Compare prices for group transport and coach hire across Warminster and West Wiltshire." },
  "yeovil": { name: "Yeovil", lat: 50.9423, lng: -2.6341, description: "Compare minibus and coach hire companies in Yeovil. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Yeovil and South Somerset." },
  "bridgwater": { name: "Bridgwater", lat: 51.128, lng: -3.0036, description: "Find trusted minibus and coach hire companies in Bridgwater. Compare prices for minibus hire, party buses, coach hire and group transport across Bridgwater and the Somerset Levels." },
  "wimborne-minster": { name: "Wimborne Minster", lat: 50.8, lng: -1.986, description: "Browse minibus and coach hire operators in Wimborne Minster. Compare prices and reviews for group transport, airport transfers and coach hire across Wimborne Minster and East Dorset." },
  "exmouth": { name: "Exmouth", lat: 50.6196, lng: -3.4137, description: "Compare minibus and coach hire in Exmouth. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Exmouth and the Exe Estuary." },
  "penzance": { name: "Penzance", lat: 50.1186, lng: -5.5372, description: "Find minibus and coach hire companies in Penzance. Compare prices for group transport, coach hire and minibus hire across Penzance and West Cornwall." },
  "bodmin": { name: "Bodmin", lat: 50.4722, lng: -4.7193, description: "Browse minibus and coach hire in Bodmin. Compare operators for group transport, minibus hire and coach hire across Bodmin and Mid Cornwall." },
  "saltash": { name: "Saltash", lat: 50.4084, lng: -4.2125, description: "Compare minibus and coach hire in Saltash. Find operators for group transport and coach hire across Saltash and the Tamar Valley." },
  "yate": { name: "Yate", lat: 51.5396, lng: -2.4232, description: "Find minibus and coach hire in Yate. Compare prices for group transport and coach hire across Yate and South Gloucestershire." },
  "chipping-sodbury": { name: "Chipping Sodbury", lat: 51.5402, lng: -2.3933, description: "Compare minibus and coach hire companies in Chipping Sodbury. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Chipping Sodbury and South Gloucestershire." },
  "burnham-on-sea": { name: "Burnham-on-Sea", lat: 51.238, lng: -3.0, description: "Find trusted minibus and coach hire companies in Burnham-on-Sea. Compare prices for minibus hire, party buses, coach hire and group transport across Burnham-on-Sea and Sedgemoor." },
  "poole": { name: "Poole", lat: 50.7151, lng: -1.9872, description: "Browse minibus and coach hire operators in Poole. Compare prices and reviews for group transport, airport transfers and coach hire across Poole and the Dorset coast." },
  "dorchester": { name: "Dorchester", lat: 50.7155, lng: -2.4375, description: "Compare minibus and coach hire in Dorchester. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Dorchester and West Dorset." },
  "shaftesbury": { name: "Shaftesbury", lat: 51.0055, lng: -2.1985, description: "Find minibus and coach hire companies in Shaftesbury. Compare prices for group transport, coach hire and minibus hire across Shaftesbury and North Dorset." },
  "sherborne": { name: "Sherborne", lat: 50.9462, lng: -2.5175, description: "Browse minibus and coach hire in Sherborne. Compare operators for group transport, minibus hire and coach hire across Sherborne and North Dorset." },
  "tiverton": { name: "Tiverton", lat: 50.9022, lng: -3.489, description: "Compare minibus and coach hire in Tiverton. Find operators for group transport and coach hire across Tiverton and Mid Devon." },
  "teignmouth": { name: "Teignmouth", lat: 50.547, lng: -3.495, description: "Find minibus and coach hire in Teignmouth. Compare prices for group transport and coach hire across Teignmouth and the South Devon coast." },
  "dawlish": { name: "Dawlish", lat: 50.581, lng: -3.466, description: "Compare minibus and coach hire companies in Dawlish. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Dawlish and the South Devon coast." },
  "cullompton": { name: "Cullompton", lat: 50.8566, lng: -3.3906, description: "Find trusted minibus and coach hire companies in Cullompton. Compare prices for minibus hire, party buses, coach hire and group transport across Cullompton and Mid Devon." },
  "falmouth": { name: "Falmouth", lat: 50.1526, lng: -5.0711, description: "Browse minibus and coach hire operators in Falmouth. Compare prices and reviews for group transport, airport transfers and coach hire across Falmouth and the Carrick Roads." },
  "redruth": { name: "Redruth", lat: 50.233, lng: -5.226, description: "Compare minibus and coach hire in Redruth. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Redruth and Central Cornwall." },
  "camborne": { name: "Camborne", lat: 50.213, lng: -5.297, description: "Find minibus and coach hire companies in Camborne. Compare prices for group transport, coach hire and minibus hire across Camborne and West Cornwall." },
  "tewkesbury": { name: "Tewkesbury", lat: 51.9923, lng: -2.16, description: "Browse minibus and coach hire in Tewkesbury. Compare operators for group transport, minibus hire and coach hire across Tewkesbury and North Gloucestershire." },
  "swindon": { name: "Swindon", lat: 51.5558, lng: -1.7797, description: "Compare minibus and coach hire in Swindon. Find operators for group transport and coach hire across Swindon and North East Wiltshire." },
  "trowbridge": { name: "Trowbridge", lat: 51.318, lng: -2.208, description: "Find minibus and coach hire in Trowbridge. Compare prices for group transport and coach hire across Trowbridge and West Wiltshire." },
  "shepton-mallet": { name: "Shepton Mallet", lat: 51.189, lng: -2.546, description: "Compare minibus and coach hire companies in Shepton Mallet. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Shepton Mallet and the Mendip Hills." },
  "street": { name: "Street", lat: 51.124, lng: -2.738, description: "Find trusted minibus and coach hire companies in Street. Compare prices for minibus hire, party buses, coach hire and group transport across Street and Central Somerset." },
  "blandford-forum": { name: "Blandford Forum", lat: 50.858, lng: -2.164, description: "Browse minibus and coach hire operators in Blandford Forum. Compare prices and reviews for group transport, airport transfers and coach hire across Blandford Forum and the Dorset countryside." },
  "barnstaple": { name: "Barnstaple", lat: 51.0801, lng: -4.0584, description: "Compare minibus and coach hire in Barnstaple. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Barnstaple and North Devon." },
  "crediton": { name: "Crediton", lat: 50.79, lng: -3.658, description: "Find minibus and coach hire companies in Crediton. Compare prices for group transport, coach hire and minibus hire across Crediton and Mid Devon." },
  "honiton": { name: "Honiton", lat: 50.798, lng: -3.187, description: "Browse minibus and coach hire in Honiton. Compare operators for group transport, minibus hire and coach hire across Honiton and East Devon." },
  "newquay": { name: "Newquay", lat: 50.412, lng: -5.0757, description: "Compare minibus and coach hire in Newquay. Find operators for group transport and coach hire across Newquay and the North Cornwall coast." },
  "launceston": { name: "Launceston", lat: 50.637, lng: -4.3593, description: "Find minibus and coach hire in Launceston. Compare prices for group transport and coach hire across Launceston and East Cornwall." },
  "bude": { name: "Bude", lat: 50.8296, lng: -4.5432, description: "Compare minibus and coach hire companies in Bude. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Bude and the North Cornwall coast." },
  "wadebridge": { name: "Wadebridge", lat: 50.517, lng: -4.834, description: "Find trusted minibus and coach hire companies in Wadebridge. Compare prices for minibus hire, party buses, coach hire and group transport across Wadebridge and the Camel Estuary." },
};

const WL_LOCATIONS: LocationConfig = {
  "cardiff": { name: "Cardiff", lat: 51.4816, lng: -3.1791, description: "Compare minibus and coach hire companies in Cardiff. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Cardiff and the Vale of Glamorgan." },
  "wrexham": { name: "Wrexham", lat: 53.0468, lng: -2.9925, description: "Find trusted minibus and coach hire companies in Wrexham. Compare prices for minibus hire, party buses, coach hire and group transport across Wrexham and North East Wales." },
  "caerphilly": { name: "Caerphilly", lat: 51.5783, lng: -3.2179, description: "Browse minibus and coach hire operators in Caerphilly. Compare prices and reviews for group transport, airport transfers and coach hire across Caerphilly and the Valleys." },
  "bangor": { name: "Bangor", lat: 53.2274, lng: -4.1293, description: "Compare minibus and coach hire in Bangor. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Bangor and North West Wales." },
  "swansea": { name: "Swansea", lat: 51.6214, lng: -3.9436, description: "Find minibus and coach hire companies in Swansea. Compare prices for group transport, coach hire and minibus hire across Swansea and the Gower Peninsula." },
  "neath": { name: "Neath", lat: 51.6605, lng: -3.8048, description: "Browse minibus and coach hire in Neath. Compare operators for group transport, minibus hire and coach hire across Neath and the Neath Valley." },
  "merthyr-tydfil": { name: "Merthyr Tydfil", lat: 51.7481, lng: -3.378, description: "Compare minibus and coach hire in Merthyr Tydfil. Find operators for group transport and coach hire across Merthyr Tydfil and the Heads of the Valleys." },
  "rhyl": { name: "Rhyl", lat: 53.3192, lng: -3.4916, description: "Find minibus and coach hire in Rhyl. Compare prices for group transport and coach hire across Rhyl and the North Wales coast." },
  "newport": { name: "Newport", lat: 51.5842, lng: -2.9977, description: "Compare minibus and coach hire companies in Newport. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Newport and South East Wales." },
  "bridgend": { name: "Bridgend", lat: 51.5042, lng: -3.5768, description: "Find trusted minibus and coach hire companies in Bridgend. Compare prices for minibus hire, party buses, coach hire and group transport across Bridgend and the surrounding area." },
  "port-talbot": { name: "Port Talbot", lat: 51.5906, lng: -3.7781, description: "Browse minibus and coach hire operators in Port Talbot. Compare prices and reviews for group transport, airport transfers and coach hire across Port Talbot and Neath Port Talbot." },
  "llanelli": { name: "Llanelli", lat: 51.684, lng: -4.1631, description: "Compare minibus and coach hire in Llanelli. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Llanelli and Carmarthenshire." },
  "llangollen": { name: "Llangollen", lat: 52.9705, lng: -3.1716, description: "Find minibus and coach hire companies in Llangollen. Compare prices for group transport, coach hire and minibus hire across Llangollen and the Dee Valley." },
  "caldicot": { name: "Caldicot", lat: 51.5887, lng: -2.7504, description: "Browse minibus and coach hire in Caldicot. Compare operators for group transport, minibus hire and coach hire across Caldicot and South Monmouthshire." },
  "monmouth": { name: "Monmouth", lat: 51.8126, lng: -2.7163, description: "Compare minibus and coach hire in Monmouth. Find operators for group transport and coach hire across Monmouth and the Wye Valley." },
  "porthmadog": { name: "Porthmadog", lat: 52.9278, lng: -4.1313, description: "Find minibus and coach hire in Porthmadog. Compare prices for group transport and coach hire across Porthmadog and Snowdonia." },
  "ebbw-vale": { name: "Ebbw Vale", lat: 51.7801, lng: -3.2085, description: "Compare minibus and coach hire companies in Ebbw Vale. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Ebbw Vale and Blaenau Gwent." },
  "aberystwyth": { name: "Aberystwyth", lat: 52.4153, lng: -4.0829, description: "Find trusted minibus and coach hire companies in Aberystwyth. Compare prices for minibus hire, party buses, coach hire and group transport across Aberystwyth and Ceredigion." },
  "welshpool": { name: "Welshpool", lat: 52.6598, lng: -3.147, description: "Browse minibus and coach hire operators in Welshpool. Compare prices and reviews for group transport, airport transfers and coach hire across Welshpool and Powys." },
  "oswestry": { name: "Oswestry", lat: 52.8598, lng: -3.0536, description: "Compare minibus and coach hire in Oswestry. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Oswestry and the Welsh Marches." },
  "ruthin": { name: "Ruthin", lat: 53.114, lng: -3.3098, description: "Find minibus and coach hire companies in Ruthin. Compare prices for group transport, coach hire and minibus hire across Ruthin and the Vale of Clwyd." },
  "pontypool": { name: "Pontypool", lat: 51.702, lng: -3.041, description: "Browse minibus and coach hire in Pontypool. Compare operators for group transport, minibus hire and coach hire across Pontypool and Torfaen." },
  "llandudno": { name: "Llandudno", lat: 53.3241, lng: -3.8276, description: "Compare minibus and coach hire in Llandudno. Find operators for group transport and coach hire across Llandudno and the North Wales coast." },
  "holyhead": { name: "Holyhead", lat: 53.3093, lng: -4.633, description: "Find minibus and coach hire in Holyhead. Compare prices for group transport and coach hire across Holyhead and Anglesey." },
  "barry": { name: "Barry", lat: 51.3985, lng: -3.2837, description: "Compare minibus and coach hire companies in Barry. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Barry and the Vale of Glamorgan." },
  "pontypridd": { name: "Pontypridd", lat: 51.6021, lng: -3.3421, description: "Find trusted minibus and coach hire companies in Pontypridd. Compare prices for minibus hire, party buses, coach hire and group transport across Pontypridd and the Rhondda Valleys." },
  "aberdare": { name: "Aberdare", lat: 51.7151, lng: -3.443, description: "Browse minibus and coach hire operators in Aberdare. Compare prices and reviews for group transport, airport transfers and coach hire across Aberdare and the Cynon Valley." },
  "colwyn-bay": { name: "Colwyn Bay", lat: 53.294, lng: -3.728, description: "Compare minibus and coach hire in Colwyn Bay. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Colwyn Bay and the North Wales coast." },
  "caernarfon": { name: "Caernarfon", lat: 53.1394, lng: -4.276, description: "Find minibus and coach hire companies in Caernarfon. Compare prices for group transport, coach hire and minibus hire across Caernarfon and Gwynedd." },
  "st-asaph": { name: "St Asaph", lat: 53.257, lng: -3.443, description: "Browse minibus and coach hire in St Asaph. Compare operators for group transport, minibus hire and coach hire across St Asaph and the Vale of Clwyd." },
  "mold": { name: "Mold", lat: 53.167, lng: -3.14, description: "Compare minibus and coach hire in Mold. Find operators for group transport and coach hire across Mold and Flintshire." },
  "abergavenny": { name: "Abergavenny", lat: 51.8237, lng: -3.0167, description: "Find minibus and coach hire in Abergavenny. Compare prices for group transport and coach hire across Abergavenny and the Brecon Beacons." },
  "chepstow": { name: "Chepstow", lat: 51.6416, lng: -2.6738, description: "Compare minibus and coach hire companies in Chepstow. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Chepstow and the Wye Valley." },
  "prestatyn": { name: "Prestatyn", lat: 53.336, lng: -3.405, description: "Find trusted minibus and coach hire companies in Prestatyn. Compare prices for minibus hire, party buses, coach hire and group transport across Prestatyn and the North Wales coast." },
  "pwllheli": { name: "Pwllheli", lat: 52.8881, lng: -4.415, description: "Browse minibus and coach hire operators in Pwllheli. Compare prices and reviews for group transport, airport transfers and coach hire across Pwllheli and the Llyn Peninsula." },
  "newtown": { name: "Newtown", lat: 52.513, lng: -3.314, description: "Compare minibus and coach hire in Newtown. Find the best operators for minibus hire, self-drive options, party buses and coach hire across Newtown and Mid Wales." },
  "denbigh": { name: "Denbigh", lat: 53.184, lng: -3.416, description: "Find minibus and coach hire companies in Denbigh. Compare prices for group transport, coach hire and minibus hire across Denbigh and the Vale of Clwyd." },
  "flint": { name: "Flint", lat: 53.248, lng: -3.133, description: "Browse minibus and coach hire in Flint. Compare operators for group transport, minibus hire and coach hire across Flint and Deeside." },
  "dolgellau": { name: "Dolgellau", lat: 52.742, lng: -3.888, description: "Compare minibus and coach hire in Dolgellau. Find operators for group transport and coach hire across Dolgellau and Southern Snowdonia." },
  "tywyn": { name: "Tywyn", lat: 52.586, lng: -4.09, description: "Find minibus and coach hire in Tywyn. Compare prices for group transport and coach hire across Tywyn and the Cardigan Bay coast." },
  "machynlleth": { name: "Machynlleth", lat: 52.595, lng: -3.854, description: "Compare minibus and coach hire companies in Machynlleth. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Machynlleth and Mid Wales." },
};

const SE_LOCATIONS: LocationConfig = {
  brighton: { name: "Brighton", lat: 50.8225, lng: -0.1372, description: "Compare minibus and coach hire companies in Brighton. Find the best prices for minibus hire, party buses, airport transfers and coach hire across Brighton and the South Coast." },
  southampton: { name: "Southampton", lat: 50.9097, lng: -1.4044, description: "Find trusted minibus and coach hire companies in Southampton. Compare prices for minibus hire, party buses, coach hire and group transport across Southampton and Hampshire." },
  portsmouth: { name: "Portsmouth", lat: 50.8198, lng: -1.0880, description: "Browse minibus and coach hire operators in Portsmouth. Compare prices and reviews for group transport, airport transfers and coach hire across Portsmouth and Southsea." },
  rochester: { name: "Rochester", lat: 51.3884, lng: 0.5069, description: "Compare minibus and coach hire in Rochester. Find the best operators for minibus hire, party buses and coach hire across Rochester and the Medway Towns." },
  slough: { name: "Slough", lat: 51.5105, lng: -0.5950, description: "Find minibus and coach hire companies in Slough. Compare prices for group transport, Heathrow airport transfers and coach hire across Slough and East Berkshire." },
  "high-wycombe": { name: "High Wycombe", lat: 51.6287, lng: -0.7482, description: "Browse minibus and coach hire in High Wycombe. Compare operators for group transport, minibus hire and coach hire across High Wycombe and South Buckinghamshire." },
  winchester: { name: "Winchester", lat: 51.0632, lng: -1.3080, description: "Compare minibus and coach hire in Winchester. Find operators for group transport, event hire and coach hire across Winchester and Central Hampshire." },
  maidstone: { name: "Maidstone", lat: 51.2724, lng: 0.5227, description: "Find minibus and coach hire in Maidstone. Compare prices for group transport, minibus hire and coach hire across Maidstone and the Heart of Kent." },
  basingstoke: { name: "Basingstoke", lat: 51.2667, lng: -1.0876, description: "Browse minibus and coach hire companies in Basingstoke. Compare prices for group transport, minibus hire and coach hire across Basingstoke and North Hampshire." },
  "milton-keynes": { name: "Milton Keynes", lat: 52.0406, lng: -0.7594, description: "Compare minibus and coach hire in Milton Keynes. Find the best operators for minibus hire, party buses and coach hire across Milton Keynes and North Buckinghamshire." },
  oxford: { name: "Oxford", lat: 51.7520, lng: -1.2577, description: "Discover minibus and coach hire companies in Oxford. Compare prices for group transport, university events and coach hire across Oxford and Oxfordshire." },
  horsham: { name: "Horsham", lat: 51.0637, lng: -0.3264, description: "Find minibus and coach hire in Horsham. Compare prices for group transport and coach hire across Horsham and West Sussex." },
  eastbourne: { name: "Eastbourne", lat: 50.7684, lng: 0.2905, description: "Browse minibus and coach hire in Eastbourne. Compare operators for group transport, coastal trips and coach hire across Eastbourne and the Sussex coast." },
  dartford: { name: "Dartford", lat: 51.4462, lng: 0.2149, description: "Compare minibus and coach hire in Dartford. Find operators for group transport, minibus hire and coach hire across Dartford and North West Kent." },
  newbury: { name: "Newbury", lat: 51.4010, lng: -1.3230, description: "Find minibus and coach hire in Newbury. Compare prices for group transport, race day hire and coach hire across Newbury and West Berkshire." },
  aldershot: { name: "Aldershot", lat: 51.2487, lng: -0.7638, description: "Browse minibus and coach hire in Aldershot. Compare operators for group transport, minibus hire and coach hire across Aldershot and North East Hampshire." },
  guildford: { name: "Guildford", lat: 51.2362, lng: -0.5704, description: "Compare minibus and coach hire in Guildford. Find operators for group transport, university events and coach hire across Guildford and Surrey." },
  hove: { name: "Hove", lat: 50.8352, lng: -0.1728, description: "Find minibus and coach hire in Hove. Compare prices for group transport, party buses and coach hire across Hove and the Brighton area." },
  worthing: { name: "Worthing", lat: 50.8147, lng: -0.3714, description: "Browse minibus and coach hire in Worthing. Compare operators for group transport, coastal trips and coach hire across Worthing and West Sussex." },
  crawley: { name: "Crawley", lat: 51.1092, lng: -0.1872, description: "Compare minibus and coach hire in Crawley. Find operators for group transport, Gatwick airport transfers and coach hire across Crawley and North Sussex." },
  canterbury: { name: "Canterbury", lat: 51.2802, lng: 1.0789, description: "Find trusted minibus and coach hire in Canterbury. Compare prices for group transport, cathedral city tours and coach hire across Canterbury and East Kent." },
  epsom: { name: "Epsom", lat: 51.3360, lng: -0.2685, description: "Browse minibus and coach hire in Epsom. Compare operators for group transport, race day hire and coach hire across Epsom and North Surrey." },
  newport: { name: "Newport", lat: 50.7010, lng: -1.2923, description: "Compare minibus and coach hire in Newport, Isle of Wight. Find operators for group transport, island tours and coach hire across the Isle of Wight." },
  hastings: { name: "Hastings", lat: 50.8543, lng: 0.5729, description: "Find minibus and coach hire in Hastings. Compare prices for group transport, coastal trips and coach hire across Hastings and East Sussex." },
  chatham: { name: "Chatham", lat: 51.3700, lng: 0.5217, description: "Browse minibus and coach hire in Chatham. Compare operators for group transport, minibus hire and coach hire across Chatham and the Medway Towns." },
  "tunbridge-wells": { name: "Tunbridge Wells", lat: 51.1322, lng: 0.2631, description: "Compare minibus and coach hire in Tunbridge Wells. Find operators for group transport and coach hire across Tunbridge Wells and the Kent Weald." },
  sevenoaks: { name: "Sevenoaks", lat: 51.2728, lng: 0.1904, description: "Find minibus and coach hire in Sevenoaks. Compare prices for group transport and coach hire across Sevenoaks and West Kent." },
  bicester: { name: "Bicester", lat: 51.9003, lng: -1.1536, description: "Browse minibus and coach hire in Bicester. Compare operators for group transport, shopping village trips and coach hire across Bicester and North Oxfordshire." },
  aylesbury: { name: "Aylesbury", lat: 51.8168, lng: -0.8084, description: "Compare minibus and coach hire in Aylesbury. Find operators for group transport and coach hire across Aylesbury and the Vale of Aylesbury." },
  gosport: { name: "Gosport", lat: 50.7948, lng: -1.1243, description: "Find minibus and coach hire in Gosport. Compare prices for group transport and coach hire across Gosport and the Portsmouth Harbour area." },
  chichester: { name: "Chichester", lat: 50.8365, lng: -0.7792, description: "Browse minibus and coach hire in Chichester. Compare operators for group transport, Goodwood event hire and coach hire across Chichester and West Sussex." },
  gillingham: { name: "Gillingham", lat: 51.3859, lng: 0.5488, description: "Compare minibus and coach hire in Gillingham. Find operators for group transport and coach hire across Gillingham and the Medway area." },
  tonbridge: { name: "Tonbridge", lat: 51.1949, lng: 0.2746, description: "Find minibus and coach hire in Tonbridge. Compare prices for group transport and coach hire across Tonbridge and the Medway Valley." },
  whitstable: { name: "Whitstable", lat: 51.3608, lng: 1.0257, description: "Browse minibus and coach hire in Whitstable. Compare operators for group transport, coastal trips and coach hire across Whitstable and North Kent." },
  reading: { name: "Reading", lat: 51.4543, lng: -0.9781, description: "Compare minibus and coach hire in Reading. Find the best operators for minibus hire, festival transport and coach hire across Reading and the Thames Valley." },
  maidenhead: { name: "Maidenhead", lat: 51.5221, lng: -0.7177, description: "Find minibus and coach hire in Maidenhead. Compare prices for group transport and coach hire across Maidenhead and the Royal Borough of Windsor and Maidenhead." },
  didcot: { name: "Didcot", lat: 51.6063, lng: -1.2411, description: "Browse minibus and coach hire in Didcot. Compare operators for group transport and coach hire across Didcot and South Oxfordshire." },
  ashford: { name: "Ashford", lat: 51.1465, lng: 0.8746, description: "Compare minibus and coach hire in Ashford. Find operators for group transport, Channel Tunnel transfers and coach hire across Ashford and East Kent." },
  faversham: { name: "Faversham", lat: 51.3148, lng: 0.8889, description: "Find minibus and coach hire in Faversham. Compare prices for group transport and coach hire across Faversham and the Swale area." },
  windsor: { name: "Windsor", lat: 51.4812, lng: -0.6044, description: "Browse minibus and coach hire in Windsor. Compare operators for group transport, castle visits and coach hire across Windsor and East Berkshire." },
  wokingham: { name: "Wokingham", lat: 51.4113, lng: -0.8340, description: "Compare minibus and coach hire in Wokingham. Find operators for group transport and coach hire across Wokingham and the surrounding Berkshire area." },
  banbury: { name: "Banbury", lat: 52.0629, lng: -1.3398, description: "Find minibus and coach hire in Banbury. Compare prices for group transport and coach hire across Banbury and North Oxfordshire." },
  witney: { name: "Witney", lat: 51.7859, lng: -1.4863, description: "Browse minibus and coach hire in Witney. Compare operators for group transport and coach hire across Witney and West Oxfordshire." },
  chesham: { name: "Chesham", lat: 51.7050, lng: -0.6119, description: "Compare minibus and coach hire in Chesham. Find operators for group transport and coach hire across Chesham and the Chiltern Hills." },
  camberley: { name: "Camberley", lat: 51.3355, lng: -0.7672, description: "Find minibus and coach hire in Camberley. Compare prices for group transport and coach hire across Camberley and North West Surrey." },
  redhill: { name: "Redhill", lat: 51.2400, lng: -0.1706, description: "Browse minibus and coach hire in Redhill. Compare operators for group transport, Gatwick airport transfers and coach hire across Redhill and East Surrey." },
  havant: { name: "Havant", lat: 50.8518, lng: -0.9838, description: "Compare minibus and coach hire in Havant. Find operators for group transport and coach hire across Havant and South East Hampshire." },
  bexhill: { name: "Bexhill", lat: 50.8429, lng: 0.4677, description: "Find minibus and coach hire in Bexhill. Compare prices for group transport and coach hire across Bexhill-on-Sea and the East Sussex coast." },
  margate: { name: "Margate", lat: 51.3813, lng: 1.3862, description: "Browse minibus and coach hire in Margate. Compare operators for group transport, seaside trips and coach hire across Margate and the Isle of Thanet." },
  ramsgate: { name: "Ramsgate", lat: 51.3359, lng: 1.4168, description: "Compare minibus and coach hire in Ramsgate. Find operators for group transport and coach hire across Ramsgate and the Isle of Thanet." },
  bracknell: { name: "Bracknell", lat: 51.4135, lng: -0.7519, description: "Find minibus and coach hire in Bracknell. Compare prices for group transport and coach hire across Bracknell and the Bracknell Forest area." },
  kidlington: { name: "Kidlington", lat: 51.8233, lng: -1.2918, description: "Browse minibus and coach hire in Kidlington. Compare operators for group transport and coach hire across Kidlington and North Oxford." },
  amersham: { name: "Amersham", lat: 51.6743, lng: -0.6073, description: "Compare minibus and coach hire in Amersham. Find operators for group transport and coach hire across Amersham and the Chilterns." },
  beaconsfield: { name: "Beaconsfield", lat: 51.6114, lng: -0.6339, description: "Find minibus and coach hire in Beaconsfield. Compare prices for group transport and coach hire across Beaconsfield and South Buckinghamshire." },
  ryde: { name: "Ryde", lat: 50.7268, lng: -1.1612, description: "Browse minibus and coach hire in Ryde. Compare operators for group transport, island tours and coach hire across Ryde and the Isle of Wight." },
  eastleigh: { name: "Eastleigh", lat: 50.9690, lng: -1.3500, description: "Compare minibus and coach hire in Eastleigh. Find operators for group transport, Southampton airport transfers and coach hire across Eastleigh and Central Hampshire." },
  littlehampton: { name: "Littlehampton", lat: 50.8104, lng: -0.5401, description: "Find minibus and coach hire in Littlehampton. Compare prices for group transport and coach hire across Littlehampton and the West Sussex coast." },
  "burgess-hill": { name: "Burgess Hill", lat: 50.9533, lng: -0.1287, description: "Browse minibus and coach hire in Burgess Hill. Compare operators for group transport and coach hire across Burgess Hill and Mid Sussex." },
  abingdon: { name: "Abingdon", lat: 51.6709, lng: -1.2825, description: "Compare minibus and coach hire in Abingdon. Find operators for group transport and coach hire across Abingdon-on-Thames and the Vale of White Horse." },
  carterton: { name: "Carterton", lat: 51.7592, lng: -1.5915, description: "Find minibus and coach hire in Carterton. Compare prices for group transport and coach hire across Carterton and West Oxfordshire." },
  ewell: { name: "Ewell", lat: 51.3500, lng: -0.2490, description: "Browse minibus and coach hire in Ewell. Compare operators for group transport, Epsom Downs race day hire and coach hire across Ewell and North Surrey." },
  esher: { name: "Esher", lat: 51.3694, lng: -0.3654, description: "Compare minibus and coach hire in Esher. Find operators for group transport, Sandown Park events and coach hire across Esher and Elmbridge." },
  weybridge: { name: "Weybridge", lat: 51.3713, lng: -0.4571, description: "Find minibus and coach hire in Weybridge. Compare prices for group transport and coach hire across Weybridge and the Elmbridge area." },
  cowes: { name: "Cowes", lat: 50.7620, lng: -1.2989, description: "Browse minibus and coach hire in Cowes. Compare operators for group transport, regatta events and coach hire across Cowes and the Isle of Wight." },
  fareham: { name: "Fareham", lat: 50.8510, lng: -1.1785, description: "Compare minibus and coach hire in Fareham. Find operators for group transport and coach hire across Fareham and South Hampshire." },
  farnborough: { name: "Farnborough", lat: 51.2926, lng: -0.7558, description: "Find minibus and coach hire in Farnborough. Compare prices for group transport, airshow events and coach hire across Farnborough and North East Hampshire." },
  "haywards-heath": { name: "Haywards Heath", lat: 51.0048, lng: -0.1044, description: "Browse minibus and coach hire in Haywards Heath. Compare operators for group transport and coach hire across Haywards Heath and Mid Sussex." },
  folkestone: { name: "Folkestone", lat: 51.0816, lng: 1.1666, description: "Compare minibus and coach hire in Folkestone. Find operators for group transport, Channel crossings and coach hire across Folkestone and the Kent coast." },
  dover: { name: "Dover", lat: 51.1279, lng: 1.3134, description: "Find minibus and coach hire in Dover. Compare prices for group transport, port transfers and coach hire across Dover and the White Cliffs area." },
  "herne-bay": { name: "Herne Bay", lat: 51.3726, lng: 1.1291, description: "Browse minibus and coach hire in Herne Bay. Compare operators for group transport, seaside trips and coach hire across Herne Bay and North Kent." },
  sittingbourne: { name: "Sittingbourne", lat: 51.3400, lng: 0.7322, description: "Compare minibus and coach hire in Sittingbourne. Find operators for group transport and coach hire across Sittingbourne and the Swale area." },
  ascot: { name: "Ascot", lat: 51.4084, lng: -0.6707, description: "Find minibus and coach hire in Ascot. Compare prices for group transport, race day hire and coach hire across Ascot and East Berkshire." },
  marlow: { name: "Marlow", lat: 51.5714, lng: -0.7761, description: "Browse minibus and coach hire in Marlow. Compare operators for group transport, regatta events and coach hire across Marlow and the Thames Valley." },
  woking: { name: "Woking", lat: 51.3162, lng: -0.5560, description: "Compare minibus and coach hire in Woking. Find operators for group transport and coach hire across Woking and Central Surrey." },
  farnham: { name: "Farnham", lat: 51.2146, lng: -0.7993, description: "Find minibus and coach hire in Farnham. Compare prices for group transport and coach hire across Farnham and the Surrey-Hampshire border." },
  leatherhead: { name: "Leatherhead", lat: 51.2963, lng: -0.3290, description: "Browse minibus and coach hire in Leatherhead. Compare operators for group transport and coach hire across Leatherhead and the Mole Valley." },
  "walton-on-thames": { name: "Walton-on-Thames", lat: 51.3868, lng: -0.4132, description: "Compare minibus and coach hire in Walton-on-Thames. Find operators for group transport and coach hire across Walton-on-Thames and Elmbridge." },
};

const SE_LOCATION_MAP: Record<string, string> = {
  Brighton: "brighton",
  Southampton: "southampton",
  Portsmouth: "portsmouth",
  Rochester: "rochester",
  Slough: "slough",
  "High Wycombe": "high-wycombe",
  Winchester: "winchester",
  Maidstone: "maidstone",
  Basingstoke: "basingstoke",
  "Milton Keynes": "milton-keynes",
  Oxford: "oxford",
  Horsham: "horsham",
  Eastbourne: "eastbourne",
  Dartford: "dartford",
  Newbury: "newbury",
  Aldershot: "aldershot",
  Guildford: "guildford",
  Hove: "hove",
  Worthing: "worthing",
  Crawley: "crawley",
  Canterbury: "canterbury",
  Epsom: "epsom",
  Newport: "newport",
  Hastings: "hastings",
  Chatham: "chatham",
  "Tunbridge Wells": "tunbridge-wells",
  Sevenoaks: "sevenoaks",
  Bicester: "bicester",
  Aylesbury: "aylesbury",
  Gosport: "gosport",
  Chichester: "chichester",
  Gillingham: "gillingham",
  Tonbridge: "tonbridge",
  Whitstable: "whitstable",
  Reading: "reading",
  Maidenhead: "maidenhead",
  Didcot: "didcot",
  Ashford: "ashford",
  Faversham: "faversham",
  Windsor: "windsor",
  Wokingham: "wokingham",
  Banbury: "banbury",
  Witney: "witney",
  Chesham: "chesham",
  Camberley: "camberley",
  Redhill: "redhill",
  Havant: "havant",
  Bexhill: "bexhill",
  Margate: "margate",
  Ramsgate: "ramsgate",
  Bracknell: "bracknell",
  Kidlington: "kidlington",
  Amersham: "amersham",
  Beaconsfield: "beaconsfield",
  Ryde: "ryde",
  Eastleigh: "eastleigh",
  Littlehampton: "littlehampton",
  "Burgess Hill": "burgess-hill",
  Abingdon: "abingdon",
  Carterton: "carterton",
  Ewell: "ewell",
  Esher: "esher",
  Weybridge: "weybridge",
  Cowes: "cowes",
  Fareham: "fareham",
  Farnborough: "farnborough",
  "Haywards Heath": "haywards-heath",
  Folkestone: "folkestone",
  Dover: "dover",
  "Herne Bay": "herne-bay",
  Sittingbourne: "sittingbourne",
  Ascot: "ascot",
  Marlow: "marlow",
  Woking: "woking",
  Farnham: "farnham",
  Leatherhead: "leatherhead",
  "Walton-on-Thames": "walton-on-thames",
};

const SW_LOCATION_MAP: Record<string, string> = {
  Bristol: "bristol",
  Plymouth: "plymouth",
  Salisbury: "salisbury",
  Torquay: "torquay",
  Truro: "truro",
  Exeter: "exeter",
  "Weston-super-Mare": "weston-super-mare",
  Bournemouth: "bournemouth",
  Bath: "bath",
  Gloucester: "gloucester",
  Wells: "wells",
  Weymouth: "weymouth",
  Clevedon: "clevedon",
  Stroud: "stroud",
  Dursley: "dursley",
  Glastonbury: "glastonbury",
  Taunton: "taunton",
  Minehead: "minehead",
  "Newton Abbot": "newton-abbot",
  Bideford: "bideford",
  Sidmouth: "sidmouth",
  Helston: "helston",
  Cheltenham: "cheltenham",
  Cirencester: "cirencester",
  Calne: "calne",
  Christchurch: "christchurch",
  Portishead: "portishead",
  Keynsham: "keynsham",
  Thornbury: "thornbury",
  Chippenham: "chippenham",
  Devizes: "devizes",
  Warminster: "warminster",
  Yeovil: "yeovil",
  Bridgwater: "bridgwater",
  "Wimborne Minster": "wimborne-minster",
  Exmouth: "exmouth",
  Penzance: "penzance",
  Bodmin: "bodmin",
  Saltash: "saltash",
  Yate: "yate",
  "Chipping Sodbury": "chipping-sodbury",
  "Burnham-on-Sea": "burnham-on-sea",
  Poole: "poole",
  Dorchester: "dorchester",
  Shaftesbury: "shaftesbury",
  Sherborne: "sherborne",
  Tiverton: "tiverton",
  Teignmouth: "teignmouth",
  Dawlish: "dawlish",
  Cullompton: "cullompton",
  Falmouth: "falmouth",
  Redruth: "redruth",
  Camborne: "camborne",
  Tewkesbury: "tewkesbury",
  Swindon: "swindon",
  Trowbridge: "trowbridge",
  "Shepton Mallet": "shepton-mallet",
  Street: "street",
  "Blandford Forum": "blandford-forum",
  Barnstaple: "barnstaple",
  Crediton: "crediton",
  Honiton: "honiton",
  Newquay: "newquay",
  Launceston: "launceston",
  Bude: "bude",
  Wadebridge: "wadebridge",
};

const WL_LOCATION_MAP: Record<string, string> = {
  Cardiff: "cardiff",
  Wrexham: "wrexham",
  Caerphilly: "caerphilly",
  Bangor: "bangor",
  Swansea: "swansea",
  Neath: "neath",
  "Merthyr Tydfil": "merthyr-tydfil",
  Rhyl: "rhyl",
  Newport: "newport",
  Bridgend: "bridgend",
  "Port Talbot": "port-talbot",
  Llanelli: "llanelli",
  Llangollen: "llangollen",
  Caldicot: "caldicot",
  Monmouth: "monmouth",
  Porthmadog: "porthmadog",
  "Ebbw Vale": "ebbw-vale",
  Aberystwyth: "aberystwyth",
  Welshpool: "welshpool",
  Oswestry: "oswestry",
  Ruthin: "ruthin",
  Pontypool: "pontypool",
  Llandudno: "llandudno",
  Holyhead: "holyhead",
  Barry: "barry",
  Pontypridd: "pontypridd",
  Aberdare: "aberdare",
  "Colwyn Bay": "colwyn-bay",
  Caernarfon: "caernarfon",
  "St Asaph": "st-asaph",
  Mold: "mold",
  Abergavenny: "abergavenny",
  Chepstow: "chepstow",
  Prestatyn: "prestatyn",
  Pwllheli: "pwllheli",
  Newtown: "newtown",
  Denbigh: "denbigh",
  Flint: "flint",
  Dolgellau: "dolgellau",
  Tywyn: "tywyn",
  Machynlleth: "machynlleth",
};

export function getLocationConfig(): LocationConfig {
  const id = getSiteId();
  if (id === "northwest") return NW_LOCATIONS;
  if (id === "scotland") return SC_LOCATIONS;
  if (id === "midlands") return ML_LOCATIONS;
  if (id === "yorkshire") return YK_LOCATIONS;
  if (id === "east") return EA_LOCATIONS;
  if (id === "london") return LN_LOCATIONS;
  if (id === "southeast") return SE_LOCATIONS;
  if (id === "southwest") return SW_LOCATIONS;
  if (id === "wales") return WL_LOCATIONS;
  return NE_LOCATIONS;
}

export const LOCATION_CONFIG = getLocationConfig();

export function getLocationFromFoundIn(foundIn: string): string {
  const id = getSiteId();
  let mapping: Record<string, string>;
  if (id === "northwest") mapping = NW_LOCATION_MAP;
  else if (id === "scotland") mapping = SC_LOCATION_MAP;
  else if (id === "midlands") mapping = ML_LOCATION_MAP;
  else if (id === "yorkshire") mapping = YK_LOCATION_MAP;
  else if (id === "east") mapping = EA_LOCATION_MAP;
  else if (id === "london") mapping = LN_LOCATION_MAP;
  else if (id === "southeast") mapping = SE_LOCATION_MAP;
  else if (id === "southwest") mapping = SW_LOCATION_MAP;
  else if (id === "wales") mapping = WL_LOCATION_MAP;
  else mapping = NE_LOCATION_MAP;
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
