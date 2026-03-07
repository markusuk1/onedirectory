import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STATIC_ROUTES = new Set([
  "about",
  "guides",
  "get-quotes",
  "quote",
  "privacy",
  "api",
  "minibus-hire",
  "van-hire",
  "skip-hire",
  "locksmith",
  "_next",
  "images",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "ads.txt",
  "operator",
]);

export function middleware(request: NextRequest) {
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
