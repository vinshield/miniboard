import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware();

export function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Exclude static files, api routes, etc.
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  // Handle main domain
  if (hostname === "miniboard.site" || hostname === "www.miniboard.site") {
    return NextResponse.next();
  }

  // Handle subdomains
  const subdomain = hostname.split(".miniboard.site")[0];
  if (subdomain) {
    // Rewrite to the /profile/[username] page while preserving the URL
    return NextResponse.rewrite(
      new URL(`/profile/${subdomain}${url.pathname}`, request.url),
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
