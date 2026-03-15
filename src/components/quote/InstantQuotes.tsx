"use client";

import { useCallback, useState } from "react";
import QuoteSearchAnimation from "./QuoteSearchAnimation";
import QuoteCard from "./QuoteCard";

interface Quote {
  id: string;
  pricePence: number;
  summary: string;
  tier: string;
}

interface InstantQuotesProps {
  quotes: Quote[];
  sessionId: string;
  product: string;
  onAccepted?: () => void;
}

type Stage = "searching" | "ready" | "viewing" | "accepting" | "confirmed" | "waiting";

export default function InstantQuotes({ quotes, sessionId, product, onAccepted }: InstantQuotesProps) {
  const [stage, setStage] = useState<Stage>("searching");
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sortedQuotes = [...quotes].sort((a, b) => a.pricePence - b.pricePence);
  const selectedQuote = sortedQuotes.find((q) => q.id === selectedQuoteId);

  const handleSearchComplete = useCallback(() => {
    setStage("ready");
  }, []);

  function handleOpenQuotes() {
    setStage("viewing");
  }

  function handleSelectQuote(id: string) {
    setSelectedQuoteId(id);
  }

  function handleAcceptSelected() {
    if (!selectedQuoteId) return;
    setStage("accepting");
    setError(null);
  }

  function handleCloseModal() {
    setStage("ready");
    setSelectedQuoteId(null);
  }

  function handleWaitForMore() {
    setStage("waiting");
    // In production this would trigger a server call to schedule the 2nd batch
    // For now we show a confirmation
  }

  async function handleAccept(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedQuoteId) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/quotes/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteId: selectedQuoteId,
          sessionId,
          product,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStage("confirmed");
      onAccepted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm";

  /* ── Progress modal ──────────────────────── */
  if (stage === "searching") {
    return <QuoteSearchAnimation onComplete={handleSearchComplete} />;
  }

  /* ── Confirmed ───────────────────────────── */
  if (stage === "confirmed") {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-green-50 border border-green-200 p-8 text-center mt-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800">Quote Accepted!</h3>
        <p className="mt-2 text-sm text-green-700">
          We&apos;re contacting operators in your area now. You&apos;ll hear back shortly.
        </p>
        <p className="mt-1 text-xs text-green-600">
          Your selected quote: £{selectedQuote ? Math.round(selectedQuote.pricePence / 100) : "—"}
        </p>
      </div>
    );
  }

  /* ── Waiting for more quotes ─────────────── */
  if (stage === "waiting") {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-blue-50 border border-blue-200 p-8 text-center mt-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
          <svg className="h-7 w-7 text-blue-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-blue-800">More Quotes Coming!</h3>
        <p className="mt-2 text-sm text-blue-700">
          We&apos;re reaching out to more operators for better prices. We&apos;ll send new quotes to you shortly.
        </p>
        <p className="mt-1 text-xs text-blue-600">
          Check your email and phone for updated quotes.
        </p>
        <button
          type="button"
          onClick={() => setStage("ready")}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline"
        >
          View current quotes
        </button>
      </div>
    );
  }

  /* ── Ready state (button visible) ────────── */
  if (stage === "ready") {
    return (
      <div className="text-center space-y-4 mt-6">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium text-green-700">{quotes.length} quotes found</span>
        </div>
        <div>
          <button
            type="button"
            onClick={handleOpenQuotes}
            className="bg-accent hover:bg-accent-dark text-white font-semibold py-3.5 px-8 rounded-xl transition-colors text-lg shadow-lg shadow-accent/25"
          >
            View Your Quotes
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Prices from £{Math.round(sortedQuotes[0].pricePence / 100)} to £{Math.round(sortedQuotes[sortedQuotes.length - 1].pricePence / 100)}
        </p>
      </div>
    );
  }

  /* ── Quotes modal ────────────────────────── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {stage === "accepting" ? "Complete Your Booking" : "Your Instant Quotes"}
            </h2>
            {stage === "viewing" && (
              <p className="text-xs text-gray-500 mt-0.5">
                Select a quote to accept, or wait for more
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {stage === "viewing" && (
            <div className="space-y-2">
              {sortedQuotes.map((q, i) => (
                <QuoteCard
                  key={q.id}
                  id={q.id}
                  pricePence={q.pricePence}
                  summary={q.summary}
                  isSelected={selectedQuoteId === q.id}
                  onSelect={handleSelectQuote}
                  rank={i + 1}
                />
              ))}
            </div>
          )}

          {stage === "accepting" && selectedQuote && (
            <div className="space-y-5">
              {/* Selected quote summary */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4">
                <div>
                  <p className="text-xs text-blue-500 uppercase tracking-wide font-medium">Your selected quote</p>
                  <p className="text-2xl font-bold text-gray-900">£{Math.round(selectedQuote.pricePence / 100)}</p>
                </div>
                <p className="text-sm text-gray-600 flex-1">{selectedQuote.summary}</p>
                <button
                  type="button"
                  onClick={() => setStage("viewing")}
                  className="text-xs text-blue-600 hover:text-blue-800 underline flex-shrink-0"
                >
                  Change
                </button>
              </div>

              {/* Contact form */}
              <form onSubmit={handleAccept} className="space-y-4">
                <div>
                  <label htmlFor="iq-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="iq-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="iq-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="iq-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="iq-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="iq-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    placeholder="07xxx xxxxxx"
                  />
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to be contacted by matched operators about this job
                  </span>
                </label>

                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !consent}
                  className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Confirm & Get Matched"}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Prices are estimates — final price confirmed by your matched operator
                </p>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        {stage === "viewing" && (
          <div className="px-6 py-4 border-t border-gray-100 space-y-2">
            <button
              type="button"
              onClick={handleAcceptSelected}
              disabled={!selectedQuoteId}
              className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedQuoteId
                ? `Accept Quote — £${Math.round((sortedQuotes.find((q) => q.id === selectedQuoteId)?.pricePence ?? 0) / 100)}`
                : "Select a quote above"}
            </button>
            <button
              type="button"
              onClick={handleWaitForMore}
              className="w-full text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors"
            >
              Wait for more quotes &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
