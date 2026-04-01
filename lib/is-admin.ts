export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;

  const normalizedEmail = email.trim().toLowerCase();
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(normalizedEmail);
}
