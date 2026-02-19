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

export function getLocationConfig(): LocationConfig {
  const id = getSiteId();
  if (id === "northwest") return NW_LOCATIONS;
  if (id === "scotland") return SC_LOCATIONS;
  if (id === "midlands") return ML_LOCATIONS;
  if (id === "yorkshire") return YK_LOCATIONS;
  if (id === "east") return EA_LOCATIONS;
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
