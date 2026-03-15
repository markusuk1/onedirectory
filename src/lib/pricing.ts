import { randomUUID } from "crypto";
import type { SiteId } from "./siteConfig";
import type { ProductId } from "./productConfig";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface PricingInput {
  product: ProductId;
  site: SiteId;
  details: Record<string, string | number | null | undefined>;
}

export interface GeneratedQuote {
  id: string;
  pricePence: number;
  operatorPricePence: number;
  platformFeePence: number;
  tier: Tier;
  summary: string;
}

export interface QuoteBatch {
  quotes: GeneratedQuote[];
  tier: Tier;
  expiresAt: Date;
}

export type Tier = "premium" | "mid" | "budget";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const REGIONAL_MULTIPLIERS: Record<SiteId, number> = {
  london: 1.2,
  southeast: 1.1,
  east: 1.05,
  midlands: 1.0,
  southwest: 1.0,
  northwest: 0.97,
  yorkshire: 0.95,
  scotland: 0.95,
  northeast: 0.93,
  wales: 0.92,
};

const MARGIN_RATES: Record<Tier, number> = {
  premium: 0.2,
  mid: 0.15,
  budget: 0.1,
};

const TIER_SHIFT: Record<Tier, number> = {
  premium: 0.12,
  mid: 0,
  budget: -0.12,
};

/* ------------------------------------------------------------------ */
/*  Base price calculation                                             */
/* ------------------------------------------------------------------ */

function toNumber(v: string | number | null | undefined, fallback: number): number {
  if (v == null) return fallback;
  const n = typeof v === "number" ? v : parseFloat(v);
  return isNaN(n) ? fallback : n;
}

function str(v: string | number | null | undefined): string {
  if (v == null) return "";
  return String(v).toLowerCase().trim();
}

function daysBetween(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return 1;
  const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 1);
}

export function calculateBasePrice(
  product: ProductId,
  details: Record<string, string | number | null | undefined>,
): number {
  switch (product) {
    case "minibus-hire": {
      const passengers = toNumber(details.passengers, 16);
      let base = passengers * 800;
      const journey = str(details.journeyType);
      if (journey === "return") base = Math.round(base * 1.7);
      else if (journey === "multi-stop") base = Math.round(base * 2.0);
      return Math.max(base, 15000);
    }

    case "van-hire": {
      const rates: Record<string, number> = {
        swb: 3500,
        lwb: 5000,
        luton: 7500,
        tipper: 8000,
        refrigerated: 9500,
        pickup: 6000,
        "not-sure": 5500,
      };
      const vanSize = str(details.vanSize);
      const dailyRate = rates[vanSize] ?? 5500;
      const days =
        details.startDate && details.endDate
          ? daysBetween(String(details.startDate), String(details.endDate))
          : 1;
      let base = dailyRate * days;
      if (str(details.driveType) === "with-driver") base += 5000 * days;
      return base;
    }

    case "skip-hire": {
      const sizes: Record<string, number> = {
        mini: 12000,
        midi: 20000,
        builders: 27500,
        large: 40000,
        roro: 65000,
      };
      const skipSize = str(details.skipSize);
      let base = sizes[skipSize] ?? 20000;
      if (str(details.placement) === "road") base += 3500;
      const waste = str(details.wasteType);
      if (waste === "soil-rubble" || waste === "construction") base += 2000;
      return base;
    }

    case "locksmith": {
      const prices: Record<string, number> = {
        "emergency-lockout": 9500,
        "lock-change": 7500,
        "lock-repair": 6500,
        "key-cutting": 3500,
        "auto-locksmith": 15000,
        "security-upgrade": 12000,
        other: 8000,
      };
      const serviceType = str(details.serviceType);
      let base = prices[serviceType] ?? 8000;
      const urgency = str(details.urgency);
      if (urgency === "emergency") base = Math.round(base * 1.5);
      else if (urgency === "today") base = Math.round(base * 1.2);
      return base;
    }

    case "removal-companies": {
      const moveType = str(details.moveType);
      let base: number;
      if (moveType === "office" || moveType === "commercial") {
        base = 80000;
      } else if (moveType === "man-and-van") {
        base = 15000;
      } else if (moveType === "storage") {
        base = 25000;
      } else if (moveType === "international") {
        base = 200000;
      } else {
        // House move
        const bedrooms = str(details.bedrooms);
        const bedroomPrices: Record<string, number> = {
          studio: 35000,
          "1": 35000,
          "2": 50000,
          "3": 70000,
          "4": 90000,
          "5": 110000,
        };
        base = bedroomPrices[bedrooms] ?? 70000;
        // Default to 5+ for anything higher
        if (toNumber(details.bedrooms, 0) >= 5) base = 110000;
      }
      const packing = str(details.needPacking);
      if (packing === "yes") base += 25000;
      else if (packing === "partial") base += 12000;
      return base;
    }

    case "bouncy-castle-hire": {
      const prices: Record<string, number> = {
        "bouncy-castle": 7500,
        "inflatable-slide": 9000,
        "soft-play": 8500,
        "assault-course": 12000,
        "disco-dome": 11000,
        "ball-pool": 7000,
      };
      return prices[str(details.serviceType)] ?? 8000;
    }

    case "limo-hire": {
      const basePrices: Record<string, number> = {
        "stretch-limo": 25000,
        "hummer-limo": 40000,
        "party-bus": 45000,
        "wedding-car": 30000,
        "vintage-classic": 35000,
        supercar: 50000,
        chauffeur: 20000,
      };
      let base = basePrices[str(details.serviceType)] ?? 25000;
      const hours = toNumber(details.hours, 3);
      if (hours > 3) {
        base += (hours - 3) * 6000;
      }
      return base;
    }

    case "plant-hire": {
      const dailyRates: Record<string, number> = {
        "mini-digger": 15000,
        excavator: 25000,
        dumper: 12000,
        telehandler: 20000,
        "cherry-picker": 18000,
        roller: 14000,
        forklift: 16000,
        other: 15000,
      };
      const daily = dailyRates[str(details.equipmentType)] ?? 15000;

      const durationMultipliers: Record<string, number> = {
        "1-day": 1,
        "2-3-days": 2.5,
        "1-week": 4,
        "2-weeks": 7,
        "1-month": 18,
        ongoing: 18,
      };
      const duration = str(details.duration);
      const mult = durationMultipliers[duration] ?? 1;
      let base = Math.round(daily * mult);

      if (str(details.operatedOrSelfDrive) === "operated") {
        base += 15000 * mult;
      }
      return base;
    }

    case "driving-lessons": {
      const hourlyRates: Record<string, number> = {
        weekly: 3500,
        intensive: 3200,
        refresher: 3800,
        "pass-plus": 3500,
        "mock-test": 4000,
      };
      const lessonType = str(details.lessonType);
      let rate = hourlyRates[lessonType] ?? 3500;
      if (str(details.transmission) === "automatic") rate += 300;

      if (lessonType === "intensive") return rate * 30;
      return rate; // per-hour price
    }

    case "pest-control": {
      const prices: Record<string, number> = {
        "rats-mice": 15000,
        "wasps-bees": 7500,
        cockroaches: 18000,
        "bed-bugs": 30000,
        fleas: 12000,
        ants: 8000,
        birds: 20000,
        moles: 12000,
        squirrels: 15000,
        other: 12000,
      };
      let base = prices[str(details.pestType)] ?? 12000;
      const urgency = str(details.urgency);
      if (urgency === "emergency") base = Math.round(base * 1.4);
      else if (urgency === "today") base = Math.round(base * 1.15);
      return base;
    }

    default:
      return 10000;
  }
}

/* ------------------------------------------------------------------ */
/*  Regional multiplier                                                */
/* ------------------------------------------------------------------ */

export function applyRegionalMultiplier(pricePence: number, site: SiteId): number {
  const mult = REGIONAL_MULTIPLIERS[site] ?? 1.0;
  return Math.round(pricePence * mult);
}

/* ------------------------------------------------------------------ */
/*  Seasonal multiplier                                                */
/* ------------------------------------------------------------------ */

export function applySeasonalMultiplier(
  pricePence: number,
  product: ProductId,
  date?: string,
): number {
  const month = date ? new Date(date).getMonth() : new Date().getMonth(); // 0-indexed

  // Jun(5) - Aug(7): bouncy +8%, limo +8%, minibus +8%
  if (month >= 5 && month <= 7) {
    if (
      product === "bouncy-castle-hire" ||
      product === "limo-hire" ||
      product === "minibus-hire"
    ) {
      return Math.round(pricePence * 1.08);
    }
  }

  // Dec(11): minibus +10%, limo +10%
  if (month === 11) {
    if (product === "minibus-hire" || product === "limo-hire") {
      return Math.round(pricePence * 1.1);
    }
  }

  // Nov(10) - Feb(1): skip -5%, plant -5%
  if (month >= 10 || month <= 1) {
    if (product === "skip-hire" || product === "plant-hire") {
      return Math.round(pricePence * 0.95);
    }
  }

  return pricePence;
}

/* ------------------------------------------------------------------ */
/*  Price spread (gaussian-like)                                       */
/* ------------------------------------------------------------------ */

function gaussianRandom(): number {
  // Box-Muller transform
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function roundTo100(pence: number): number {
  return Math.round(pence / 100) * 100;
}

export function generatePriceSpread(
  centerPricePence: number,
  count: number,
  tier: Tier,
): number[] {
  const shift = TIER_SHIFT[tier];
  const shiftedCenter = Math.round(centerPricePence * (1 + shift));
  const stddev = shiftedCenter * 0.07;

  const prices: number[] = [];
  for (let i = 0; i < count; i++) {
    const offset = gaussianRandom() * stddev;
    const price = roundTo100(shiftedCenter + offset);
    prices.push(Math.max(price, 100)); // never below £1
  }

  prices.sort((a, b) => a - b);
  return prices;
}

/* ------------------------------------------------------------------ */
/*  Margin calculation                                                 */
/* ------------------------------------------------------------------ */

export function calculateMargin(
  pricePence: number,
  tier: Tier,
): { operatorPricePence: number; platformFeePence: number } {
  const rate = MARGIN_RATES[tier];
  const platformFeePence = Math.round(pricePence * rate);
  const operatorPricePence = pricePence - platformFeePence;
  return { operatorPricePence, platformFeePence };
}

/* ------------------------------------------------------------------ */
/*  Floor prices                                                       */
/* ------------------------------------------------------------------ */

export function applyFloorPrice(
  operatorPricePence: number,
  product: ProductId,
  details: Record<string, unknown>,
): number {
  let floor: number;

  switch (product) {
    case "skip-hire": {
      const floors: Record<string, number> = {
        mini: 6000,
        midi: 12000,
        builders: 15000,
        large: 25000,
        roro: 40000,
      };
      const size = String(details.skipSize ?? "").toLowerCase().trim();
      floor = floors[size] ?? 10000;
      break;
    }
    case "minibus-hire":
      floor = 8000;
      break;
    case "van-hire": {
      const days =
        details.startDate && details.endDate
          ? daysBetween(String(details.startDate), String(details.endDate))
          : 1;
      floor = 2500 * days;
      break;
    }
    case "locksmith":
      floor = 4500;
      break;
    case "removal-companies": {
      const mt = String(details.moveType ?? "").toLowerCase().trim();
      floor = mt === "man-and-van" ? 8000 : 20000;
      break;
    }
    case "bouncy-castle-hire":
      floor = 4500;
      break;
    case "limo-hire":
      floor = 10000;
      break;
    case "plant-hire": {
      const durationMultipliers: Record<string, number> = {
        "1-day": 1,
        "2-3-days": 2.5,
        "1-week": 4,
        "2-weeks": 7,
        "1-month": 18,
        ongoing: 18,
      };
      const dur = String(details.duration ?? "").toLowerCase().trim();
      const mult = durationMultipliers[dur] ?? 1;
      floor = 5000 * mult;
      break;
    }
    case "driving-lessons":
      floor = 2500;
      break;
    case "pest-control":
      floor = 4000;
      break;
    default:
      floor = 5000;
  }

  return Math.max(operatorPricePence, floor);
}

/* ------------------------------------------------------------------ */
/*  Summary builder                                                    */
/* ------------------------------------------------------------------ */

function extractOutwardCode(
  details: Record<string, string | number | null | undefined>,
): string | null {
  const fields = ["postcode", "address", "location", "area"];
  const re = /([A-Z]{1,2}\d{1,2}[A-Z]?)\s*\d[A-Z]{2}/i;
  for (const f of fields) {
    const v = details[f];
    if (v == null) continue;
    const match = String(v).match(re);
    if (match) return match[1].toUpperCase();
  }
  return null;
}

function labelise(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDate(d: string | number | null | undefined): string {
  if (d == null) return "";
  const date = new Date(String(d));
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
}

export function buildSummary(
  product: ProductId,
  details: Record<string, string | number | null | undefined>,
): string {
  const postcode = extractOutwardCode(details);
  const pc = postcode ? ` — ${postcode}` : "";

  switch (product) {
    case "skip-hire": {
      const size = details.skipSize ? labelise(str(details.skipSize)) : "Skip";
      const duration = details.duration ? labelise(str(details.duration)) : "";
      const parts = [`${size} Skip`, duration, postcode].filter(Boolean);
      return parts.join(" — ");
    }

    case "minibus-hire": {
      const pax = details.passengers ? `${details.passengers}-seat Minibus` : "Minibus";
      const journey = details.journeyType ? labelise(str(details.journeyType)) : "";
      const date = formatDate(details.date || details.travelDate);
      const parts = [pax, journey, date].filter(Boolean);
      return parts.join(" — ");
    }

    case "van-hire": {
      const vanSize = details.vanSize ? `${labelise(str(details.vanSize))} Van` : "Van";
      const days =
        details.startDate && details.endDate
          ? daysBetween(String(details.startDate), String(details.endDate))
          : null;
      const daysStr = days ? `${days} day${days > 1 ? "s" : ""}` : "";
      const drive = details.driveType ? labelise(str(details.driveType)) : "";
      const parts = [vanSize, daysStr, drive].filter(Boolean);
      return parts.join(" — ");
    }

    case "locksmith": {
      const service = details.serviceType ? labelise(str(details.serviceType)) : "Locksmith";
      const prop = details.propertyType ? labelise(str(details.propertyType)) : "";
      const parts = [service, prop].filter(Boolean);
      return parts.join(" — ");
    }

    case "removal-companies": {
      const bedrooms = details.bedrooms ? `${labelise(str(details.bedrooms))}-Bed` : "";
      const moveType = str(details.moveType);
      let desc: string;
      if (moveType === "man-and-van") {
        desc = "Man and Van";
      } else if (moveType === "office" || moveType === "commercial") {
        desc = "Office Move";
      } else if (moveType === "international") {
        desc = "International Move";
      } else if (moveType === "storage") {
        desc = "Storage";
      } else {
        desc = bedrooms ? `${bedrooms} House Move` : "House Move";
      }
      const packing = str(details.needPacking);
      const packLabel =
        packing === "yes" ? "With Packing" : packing === "partial" ? "Partial Packing" : "";
      const parts = [desc, packLabel].filter(Boolean);
      return parts.join(" — ");
    }

    case "bouncy-castle-hire": {
      const service = details.serviceType
        ? labelise(str(details.serviceType))
        : "Bouncy Castle";
      const event = details.eventType ? labelise(str(details.eventType)) : "";
      const indoor = details.indoorOutdoor ? labelise(str(details.indoorOutdoor)) : "";
      const parts = [service, event, indoor].filter(Boolean);
      return parts.join(" — ");
    }

    case "limo-hire": {
      const service = details.serviceType ? labelise(str(details.serviceType)) : "Limo";
      const occasion = details.occasion ? labelise(str(details.occasion)) : "";
      const hours = details.hours ? `${details.hours} hours` : "";
      const parts = [service, occasion, hours].filter(Boolean);
      return parts.join(" — ");
    }

    case "plant-hire": {
      const equip = details.equipmentType
        ? labelise(str(details.equipmentType))
        : "Plant Equipment";
      const duration = details.duration ? labelise(str(details.duration)) : "";
      const operated =
        str(details.operatedOrSelfDrive) === "operated" ? "Operated" : "Self-drive";
      const parts = [equip, duration, operated].filter(Boolean);
      return parts.join(" — ");
    }

    case "driving-lessons": {
      const lesson = details.lessonType
        ? `${labelise(str(details.lessonType))} Lessons`
        : "Driving Lessons";
      const trans = details.transmission ? labelise(str(details.transmission)) : "";
      const parts = [lesson, trans].filter(Boolean);
      return parts.join(" — ");
    }

    case "pest-control": {
      const pest = details.pestType ? labelise(str(details.pestType)) : "Pest Control";
      const urgency = details.urgency ? labelise(str(details.urgency)) : "";
      const parts = [pest, urgency].filter(Boolean);
      return parts.join(" — ");
    }

    default:
      return `Quote${pc}`;
  }
}

/* ------------------------------------------------------------------ */
/*  Main entry point                                                   */
/* ------------------------------------------------------------------ */

export function generateInstantQuotes(input: PricingInput, tier: Tier): QuoteBatch {
  const { product, site, details } = input;

  // 1. Calculate base price from product + details
  let basePence = calculateBasePrice(product, details);

  // 2. Apply regional multiplier
  basePence = applyRegionalMultiplier(basePence, site);

  // 3. Apply seasonal multiplier (use date from details if available)
  const dateField =
    details.date || details.travelDate || details.startDate || details.eventDate;
  basePence = applySeasonalMultiplier(
    basePence,
    product,
    dateField != null ? String(dateField) : undefined,
  );

  // 4. Generate 10 price variants around the base
  const prices = generatePriceSpread(basePence, 10, tier);

  // 5. Build summary
  const summary = buildSummary(product, details);

  // 6. Build quotes with margin + floor enforcement
  const quotes: GeneratedQuote[] = prices.map((pricePence) => {
    const { operatorPricePence: rawOpPence, platformFeePence: rawPlatformPence } =
      calculateMargin(pricePence, tier);

    // Enforce floor price for operator
    const flooredOpPence = applyFloorPrice(rawOpPence, product, details);

    let finalCustomerPrice = pricePence;
    let finalOpPence = rawOpPence;
    let finalPlatformPence = rawPlatformPence;

    if (flooredOpPence > rawOpPence) {
      // Operator was below floor — raise customer price so platform still gets its margin
      const rate = MARGIN_RATES[tier];
      // operatorPricePence = customerPrice * (1 - rate) = flooredOpPence
      // => customerPrice = flooredOpPence / (1 - rate)
      finalCustomerPrice = roundTo100(Math.ceil(flooredOpPence / (1 - rate)));
      finalPlatformPence = finalCustomerPrice - flooredOpPence;
      finalOpPence = flooredOpPence;
    }

    return {
      id: randomUUID(),
      pricePence: finalCustomerPrice,
      operatorPricePence: finalOpPence,
      platformFeePence: finalPlatformPence,
      tier,
      summary,
    };
  });

  // Sort by customer price ascending
  quotes.sort((a, b) => a.pricePence - b.pricePence);

  // 7. Expiry — quotes valid for 30 minutes
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  return { quotes, tier, expiresAt };
}
