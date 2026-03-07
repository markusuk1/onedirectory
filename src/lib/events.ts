import type { SiteId } from "./siteConfig";
import { fetchRssItems } from "./rssEvents";

export type EventCategory =
  | "Festival"
  | "Concert"
  | "Sport"
  | "Family"
  | "Theatre"
  | "Other";

export interface RegionalEvent {
  id: string;
  title: string;
  category: EventCategory;
  city: string;
  venue?: string;
  // ISO date (YYYY-MM-DD). Keep it simple; we can extend later.
  date: string;
  // Optional start time (HH:MM) for fixtures/concerts.
  startTime?: string;
  // Optional extra details (e.g. "Man United vs Liverpool").
  detail?: string;
  // Optional outbound reference
  url?: string;
  // Optional short note shown in cards (e.g. "High demand weekends")
  note?: string;
  // For aggregated sources
  source?: string;
}

// Keep events as code-imported JSON for now (fast, predictable, AdSense-safe).
// Later we can add RSS/API ingestion and cache.
import northwest from "../data/events/northwest.json";

const EVENTS_BY_SITE: Partial<Record<SiteId, RegionalEvent[]>> = {
  northwest: northwest as RegionalEvent[],
};

export function getRegionalEvents(siteId: SiteId): RegionalEvent[] {
  return EVENTS_BY_SITE[siteId] ?? [];
}

const RSS_SOURCES_BY_SITE: Partial<Record<SiteId, { url: string; source: string; category: EventCategory; city: string }[]>> = {
  northwest: [
    {
      url: "https://www.manchestereveningnews.co.uk/whats-on/?service=rss",
      source: "Manchester Evening News",
      category: "Other",
      city: "Manchester",
    },
    {
      url: "https://www.liverpool.com/?service=rss",
      source: "Liverpool.com",
      category: "Other",
      city: "Liverpool",
    },
  ],
};

export async function getRegionalEventsMerged(siteId: SiteId): Promise<RegionalEvent[]> {
  const curated = getRegionalEvents(siteId);
  const sources = RSS_SOURCES_BY_SITE[siteId] ?? [];

  if (sources.length === 0) return curated;

  const rssItems = await Promise.all(
    sources.map(async (s) => {
      try {
        const items = await fetchRssItems(s.url, s.source);
        return items
          .filter((i) => i.title)
          .map((i) => ({
            id: `rss:${s.source}:${i.id}`,
            title: i.title,
            category: s.category,
            city: s.city,
            venue: undefined,
            date: i.date ?? "2099-01-01",
            url: i.url,
            note: undefined,
            source: s.source,
          }) satisfies RegionalEvent);
      } catch {
        return [] as RegionalEvent[];
      }
    })
  );

  return [...curated, ...rssItems.flat()];
}

export async function getUpcomingRegionalEvents(siteId: SiteId, limit = 8): Promise<RegionalEvent[]> {
  // IMPORTANT: RSS items are news articles, not a reliable event calendar.
  // We only use the curated JSON events for the actual calendar.
  const now = new Date();
  const items = getRegionalEvents(siteId)
    .filter((e) => {
      const d = new Date(e.date + "T00:00:00");
      return !Number.isNaN(d.getTime()) && d >= new Date(now.toDateString());
    })
    .sort((a, b) => a.date.localeCompare(b.date));
  return items.slice(0, limit);
}

export interface RegionalNewsItem {
  id: string;
  title: string;
  url?: string;
  source: string;
  date?: string;
}

export async function getRegionalWhatsOnNews(siteId: SiteId, limit = 12): Promise<RegionalNewsItem[]> {
  const sources = RSS_SOURCES_BY_SITE[siteId] ?? [];
  if (sources.length === 0) return [];

  const banned = [
    "m&s",
    "aldi",
    "lidl",
    "tesco",
    "beauty",
    "recall",
    "shopping",
    "deal",
    "bargain",
    "price",
  ];
  const wanted = ["gig", "concert", "tour", "arena", "festival", "stage times", "setlist", "co-op live", "ao arena", "theatre", "tickets"]; 

  const items = await Promise.all(
    sources.map(async (s) => {
      try {
        const rss = await fetchRssItems(s.url, s.source);
        return rss
          .filter((i) => i.title)
          .filter((i) => {
            const t = i.title.toLowerCase();
            if (banned.some((b) => t.includes(b))) return false;
            return wanted.some((w) => t.includes(w));
          })
          .map((i) => ({
            id: `rss:${s.source}:${i.id}`,
            title: i.title,
            url: i.url,
            source: s.source,
            date: i.date,
          }));
      } catch {
        return [] as RegionalNewsItem[];
      }
    })
  );

  // Dedup by title
  const seen = new Set<string>();
  const flat = items.flat().filter((x) => {
    const k = x.title.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  // Latest first
  flat.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return flat.slice(0, limit);
}

export function formatEventDate(iso: string): string {
  // We keep it stable and locale-ish.
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}
