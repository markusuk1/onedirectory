import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PRODUCT_SLUGS } from "@/lib/productConfig";

const STATIC_ROUTES = new Set([
  "about",
  "blog",
  "faq",
  "guides",
  "jobs",
  "quotes",
  "get-quotes",
  "quote",
  "privacy",
  "api",
  // Product slugs are imported from productConfig so new products are
  // automatically included — no manual update needed.
  ...PRODUCT_SLUGS,
  "_next",
  "images",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "ads.txt",
  "operator",
  "leads",
  "terms",
  "contact",
  "site",
  "events",
]);

// Domains that have hosted mini-sites on subdomains
const HOSTED_DOMAINS = [
  "hirenortheast.co.uk",
];

export function middleware(request: NextRequest) {
  // Subdomain routing — hosted mini-sites
  const host = request.headers.get("host") || "";
  for (const domain of HOSTED_DOMAINS) {
    if (host !== domain && host !== `www.${domain}` && host.endsWith(`.${domain}`)) {
      const subdomain = host.replace(`.${domain}`, "");
      const url = request.nextUrl.clone();
      url.pathname = `/site/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;
      const response = NextResponse.rewrite(url);
      response.headers.set("x-hosted-site", subdomain);
      return response;
    }
  }

  // Defensive URL cleanup: some clients accidentally append a backtick, which shows up as `%60`.
  // Example: /minibus-hire/events%60
  if (request.nextUrl.pathname.includes("%60") || request.nextUrl.pathname.includes("`")) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.replaceAll("%60", "").replaceAll("`", "");
    return NextResponse.redirect(url, 301);
  }

  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  if (segments.length === 0) return;
  if (STATIC_ROUTES.has(segments[0])) return;

  // Skip files with extensions (e.g. icon.svg, manifest.json)
  if (segments[segments.length - 1].includes(".")) return;

  // Old URL pattern: /{location} or /{location}/{business}
  // Redirect to /minibus-hire/...
  const url = request.nextUrl.clone();
  url.pathname = `/minibus-hire${request.nextUrl.pathname}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|images/|favicon.ico).*)",
  ],
};
