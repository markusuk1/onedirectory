"use client";

import { useState } from "react";

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return phone;
  return phone.slice(0, 4) + "x".repeat(phone.length - 7) + phone.slice(-3);
}

export default function ClickToReveal({
  phone,
  internationalPhone,
  businessSlug,
}: {
  phone: string;
  internationalPhone: string | null;
  businessSlug: string;
}) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = async () => {
    setRevealed(true);
    try {
      await fetch("/api/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessSlug,
          type: "phone_reveal",
        }),
      });
    } catch {
      // silently fail - don't block the reveal
    }
  };

  const telHref = internationalPhone
    ? `tel:${internationalPhone.replace(/\s/g, "")}`
    : `tel:${phone.replace(/\s/g, "")}`;

  if (revealed) {
    return (
      <a
        href={telHref}
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        {phone}
      </a>
    );
  }

  return (
    <button
      onClick={handleReveal}
      className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full cursor-pointer"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
      <span>{maskPhone(phone)}</span>
      <span className="text-sm opacity-80">- Tap to reveal</span>
    </button>
  );
}
