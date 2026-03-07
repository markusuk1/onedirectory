import Parser from "rss-parser";

export interface RssEventItem {
  id: string;
  title: string;
  url?: string;
  // ISO date string if we can infer it
  date?: string;
  source: string;
}

const parser = new Parser({
  timeout: 8000,
});

function toIsoDate(d?: string): string | undefined {
  if (!d) return undefined;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return undefined;
  return dt.toISOString().slice(0, 10);
}

export async function fetchRssItems(url: string, sourceName: string): Promise<RssEventItem[]> {
  // Use global fetch so Next can cache at the HTTP layer if configured.
  // rss-parser can also fetch, but we want consistent caching behavior.
  const res = await fetch(url, {
    // Cache-ish: RSS does not need to refetch every request.
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`RSS fetch failed (${res.status}) for ${url}`);
  const xml = await res.text();

  const feed = await parser.parseString(xml);
  return (feed.items || []).map((it, idx) => ({
    id: (it.guid || it.id || it.link || `${sourceName}-${idx}`) as string,
    title: (it.title || "").trim(),
    url: it.link,
    date: toIsoDate((it as any).isoDate || it.pubDate),
    source: sourceName,
  }));
}
