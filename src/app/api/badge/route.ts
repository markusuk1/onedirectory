import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/siteConfig";

/**
 * Dynamic SVG badge showing the site name.
 * Operators embed this on their websites as a backlink to us.
 * Usage: <img src="https://hireeast.co.uk/api/badge" alt="Listed on Hire East" />
 */
export async function GET() {
  const site = getSiteConfig();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="56" viewBox="0 0 240 56">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <filter id="shadow" x="-4%" y="-4%" width="108%" height="116%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="240" height="56" rx="10" fill="url(#bg)" filter="url(#shadow)"/>
  <!-- Shield icon -->
  <g transform="translate(14, 12)">
    <path d="M16 2.5L4 7.5v8c0 7.5 5.1 14.5 12 16 6.9-1.5 12-8.5 12-16v-8L16 2.5z" fill="#22c55e" opacity="0.9"/>
    <path d="M16 2.5L4 7.5v8c0 7.5 5.1 14.5 12 16 6.9-1.5 12-8.5 12-16v-8L16 2.5z" fill="none" stroke="white" stroke-width="1.5" opacity="0.3"/>
    <path d="M11 16l3.5 3.5 7-7" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <!-- Text -->
  <text x="52" y="23" font-family="Arial,Helvetica,sans-serif" font-size="10" font-weight="700" fill="#bfdbfe" letter-spacing="1">VERIFIED LISTING</text>
  <text x="52" y="42" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="700" fill="#ffffff">${site.genericName}</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
