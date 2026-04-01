import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/is-admin";
import { headers } from "next/headers";

export async function checkIsAdmin(): Promise<boolean> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return false;
  }

  return isAdmin(session.user.email);
}
