"use client";

import { useEffect, useRef, useState } from "react";

interface QuoteSearchAnimationProps {
  onComplete: () => void;
}

const PHASES = [
  { threshold: 0, text: "Searching operators in your area..." },
  { threshold: 20, text: "Requesting prices from local companies..." },
  { threshold: 40, text: "Comparing quotes..." },
  { threshold: 60, text: "Finding the best deals..." },
  { threshold: 80, text: "Almost there..." },
  { threshold: 95, text: "Finalising your quotes..." },
];

const DURATION_MS = 5000;

export default function QuoteSearchAnimation({ onComplete }: QuoteSearchAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const startRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    let rafId: number;

    function tick(timestamp: number) {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const linear = Math.min(elapsed / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - linear, 3);
      const pct = eased * 100;
      setProgress(pct);

      if (pct >= 99.5) {
        setProgress(100);
        if (!doneRef.current) {
          doneRef.current = true;
          setDone(true);
        }
        return;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const phaseText =
    [...PHASES].reverse().find((p) => progress >= p.threshold)?.text ?? PHASES[0].text;

  const roundedProgress = Math.round(progress);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 relative w-16 h-16">
          {done ? (
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {done ? "Quotes Ready!" : "Finding Your Best Prices"}
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          {done ? "We found 10 quotes from local operators" : phaseText}
        </p>

        {/* Progress bar */}
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full rounded-full transition-[width] duration-150 ease-linear ${
              done ? "bg-green-500" : "bg-primary"
            }`}
            style={{ width: `${roundedProgress}%` }}
          />
        </div>

        <p className="text-xs text-gray-400 mb-4">
          {roundedProgress}% complete
        </p>

        {/* See Quotes button — only shown when done */}
        {done && (
          <button
            type="button"
            onClick={onComplete}
            className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 rounded-xl transition-colors text-base shadow-lg shadow-accent/25"
          >
            See Your Quotes
          </button>
        )}
      </div>
    </div>
  );
}
