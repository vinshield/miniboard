import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware();

import { NextResponse } from "next/server";

// List of paths that should always go to the main domain
const authRoutes = ["/signin", "/signup", "/reset-password"];

// List of paths that should be protected/redirected
const protectedRoutes = ["/dashboard", "/settings", "/account"];

export function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Exclude static files, api routes, etc
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  // Check if it's a subdomain
  const isSubdomain =
    hostname !== "miniboard.site" && hostname !== "www.miniboard.site";

  // If it's a subdomain and trying to access auth routes, redirect to main domain
  if (
    isSubdomain &&
    authRoutes.some((route) => url.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(
      new URL(url.pathname, "https://miniboard.site"),
    );
  }

  // Handle subdomains for non-auth routes
  if (isSubdomain) {
    const subdomain = hostname.split(".miniboard.site")[0];
    return NextResponse.rewrite(
      new URL(`/u/${subdomain}${url.pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
