"use client";

import { useState, useEffect } from "react";

interface Metrics {
  period: number;
  quoteRequests: number;
  phoneReveals: number;
  websiteClicks: number;
  autoQuotesSent: number;
}

interface Props {
  slug: string;
  product: string;
  site: string;
}

export default function MetricsDashboard({ slug, product, site }: Props) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [period, setPeriod] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/operator/metrics?slug=${slug}&product=${product}&site=${site}&period=${period}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setMetrics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, product, site, period]);

  if (loading) {
    return (
      <div className="text-text-light py-8 text-center">
        Loading metrics...
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-text-light py-8 text-center">
        Unable to load metrics
      </div>
    );
  }

  const cards = [
    {
      label: "Quote Requests",
      value: metrics.quoteRequests,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Phone Reveals",
      value: metrics.phoneReveals,
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      label: "Website Clicks",
      value: metrics.websiteClicks,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      label: "Auto-Quotes Sent",
      value: metrics.autoQuotesSent,
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div>
      {/* Period selector */}
      <div className="flex gap-2 mb-6">
        {[7, 30, 90].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`text-sm px-4 py-2 rounded-lg border transition-colors ${
              period === p
                ? "bg-primary text-white border-primary"
                : "bg-white text-text border-border hover:border-primary"
            }`}
          >
            {p} days
          </button>
        ))}
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-border rounded-xl p-5"
          >
            <p className="text-sm text-text-light mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Total engagement */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h3 className="font-semibold text-text mb-2">Summary</h3>
        <p className="text-text-light text-sm">
          In the last {period} days, your listing received{" "}
          <strong className="text-text">
            {metrics.quoteRequests + metrics.phoneReveals + metrics.websiteClicks}
          </strong>{" "}
          total interactions across quote requests, phone reveals and website clicks.
          {metrics.autoQuotesSent > 0 &&
            ` ${metrics.autoQuotesSent} auto-quotes were sent to potential customers.`}
        </p>
      </div>
    </div>
  );
}
