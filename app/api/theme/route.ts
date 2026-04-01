import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/is-admin";
import { getTheme, setTheme } from "@/lib/theme";
import { ThemeInput } from "@/lib/theme-shared";

export async function GET() {
  const theme = await getTheme();
  return NextResponse.json(theme);
}

export async function PUT(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session || !isAdmin(session.user.email)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  let payload: ThemeInput;

  try {
    payload = (await request.json()) as ThemeInput;
  } catch {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const theme = await setTheme(payload, {
    authorName: session.user.name || session.user.email,
    authorAvatarUrl: session.user.image,
  });

  return NextResponse.json(theme);
}