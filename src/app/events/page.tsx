import Link from "next/link";
import { getSiteConfig } from "@/lib/siteConfig";
import { formatEventDate, getRegionalEvents, getRegionalWhatsOnNews } from "@/lib/events";

export default async function EventsPage() {
  const site = getSiteConfig();
  const events = getRegionalEvents(site.id).slice().sort((a, b) => a.date.localeCompare(b.date));
  const whatsOnNews = await getRegionalWhatsOnNews(site.id, 12);

  return (
    <>
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">Events</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-4xl font-bold text-text mb-3">
          Events in {site.shortName}
        </h1>
        <p className="text-text-light mb-8">
          A curated list of events that commonly drive group travel demand. If you’re planning transport for any of these,
          request quotes with clear pickup and return windows.
        </p>

        {events.length === 0 ? (
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-text-light">No curated events have been added for this region yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((e) => (
              <div key={e.id} className="bg-white border border-border rounded-xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full inline-block mb-2">
                      {e.category}
                    </div>
                    <h2 className="text-lg font-bold text-text">{e.title}</h2>
                    {(e.detail || e.startTime) && (
                      <p className="text-text text-sm">
                        {e.detail ? e.detail : ""}
                        {e.detail && e.startTime ? " • " : ""}
                        {e.startTime ? e.startTime : ""}
                      </p>
                    )}
                    <p className="text-text-light text-sm">
                      {formatEventDate(e.date)} • {e.city}
                      {e.venue ? ` • ${e.venue}` : ""}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {e.url && (
                      <a
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition text-sm font-semibold"
                      >
                        Event info
                      </a>
                    )}
                    <Link
                      href="/get-quotes"
                      className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition text-sm font-semibold"
                    >
                      Get transport quotes
                    </Link>
                  </div>
                </div>

                {e.note && <p className="text-text-light text-sm mt-3">{e.note}</p>}
              </div>
            ))}
          </div>
        )}

        {whatsOnNews.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold text-text mb-4">
              What’s on coverage (from local sources)
            </h2>
            <p className="text-text-light mb-4">
              We only include items that look event-related. This is supporting context, not the calendar.
            </p>
            <div className="space-y-3">
              {whatsOnNews.map((n) => (
                <a
                  key={n.id}
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-border rounded-xl p-4 hover:border-primary hover:shadow-sm transition"
                >
                  <div className="text-xs text-text-light mb-1">
                    {n.source}{n.date ? ` • ${formatEventDate(n.date)}` : ""}
                  </div>
                  <div className="font-semibold text-text">{n.title}</div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
