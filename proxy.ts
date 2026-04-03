import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/is-admin";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin: redirect non-admins to /access-denied
  if (pathname.startsWith("/admin")) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  }

  // Protect /api/admin/*: reject with 401/403
  if (pathname.startsWith("/api/admin")) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }
    if (!isAdmin(session.user?.email)) {
      return NextResponse.json({ isAdmin: false }, { status: 403 });
    }
  }

  // Protect /api/theme PUT: reject non-admins with 403
  if (pathname === "/api/theme" && req.method === "PUT") {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
  }
}

export const config = {
  matcher: ["/admin", "/api/admin/:path*", "/api/theme"],
};
