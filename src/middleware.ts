import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STATIC_ROUTES = new Set([
  "about",
  "guides",
  "get-quotes",
  "quote",
  "api",
  "minibus-hire",
  "van-hire",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "ads.txt",
]);

export function middleware(request: NextRequest) {
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
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
