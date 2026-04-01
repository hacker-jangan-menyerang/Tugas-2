"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const user = session?.user;

  const handleLogout = async () => {
    setIsSigningOut(true);

    const { error } = await authClient.signOut();

    if (error) {
      setIsSigningOut(false);
      return;
    }

    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-20 border-b border-primary bg-background/80 backdrop-blur-xl">
      <div className="container-custom flex items-center justify-between h-16">
        <Link href="/home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg bg-accent">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L12 16M12 16L8 12M12 16L16 12" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
          <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
            하자메
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/home" className="text-sm font-medium text-primary">
            Home
          </Link>
          {isPending ? (
            <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Google profile"}
                  width={36}
                  height={36}
                  unoptimized
                  className="w-9 h-9 rounded-full object-cover border border-primary/20"
                />
              ) : (
                <div className="w-9 h-9 rounded-full border border-primary/20 bg-muted flex items-center justify-center text-xs font-semibold text-primary">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <button
                onClick={handleLogout}
                disabled={isSigningOut}
                className="text-sm py-2 px-4 rounded-lg border border-primary text-primary transition-all hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSigningOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="text-sm py-2 px-4 rounded-lg border border-primary text-primary transition-all hover:bg-muted">
                Sign In
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
