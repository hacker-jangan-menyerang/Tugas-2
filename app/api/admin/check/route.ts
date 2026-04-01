import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/is-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }

  return NextResponse.json({
    isAdmin: isAdmin(session.user.email),
    user: { email: session.user.email, name: session.user.name },
  });
}
