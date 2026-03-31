"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-primary bg-white/80 backdrop-blur-xl">
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
          <Link href="/login">
            <button className="text-sm py-2 px-4 rounded-lg border border-primary text-primary transition-all hover:bg-muted">
              Sign In
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
