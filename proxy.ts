import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    // Check if session cookie exists (prevents unauthenticated access)
    const sessionToken = request.cookies.get("better-auth.session_token")?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
