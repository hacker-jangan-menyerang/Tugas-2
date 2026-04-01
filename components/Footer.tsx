"use client";

import Image from "next/image";

type FooterProps = {
  themeAuthor?: string;
  themeAuthorAvatarUrl?: string;
  themeUpdatedAt?: string;
};

function getRelativeTime(isoDate?: string): string {
  if (!isoDate) return "unknown";

  const updatedAt = new Date(isoDate).getTime();
  if (Number.isNaN(updatedAt)) return "unknown";

  const diffMs = Date.now() - updatedAt;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  if (seconds > 0) return `${seconds}s ago`;
  return "just now";
}

export default function Footer({ themeAuthor, themeAuthorAvatarUrl, themeUpdatedAt }: FooterProps) {
  return (
    <footer className="relative z-10 py-12 px-6 border-t border-primary/10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
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
            <span className="text-sm font-bold text-primary">
              하자메
            </span>
          </div>

          <div className="text-center md:text-left">
            <p className="text-sm text-primary" style={{ opacity: 0.5 }}>
              &copy; 2026 Hacker Jangan Menyerang • PKPL D
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-4 self-stretch md:self-auto">
            {themeAuthor && (
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
                {themeAuthorAvatarUrl ? (
                  <Image
                    src={themeAuthorAvatarUrl}
                    alt={themeAuthor}
                    width={28}
                    height={28}
                    unoptimized
                    className="w-7 h-7 rounded-full border border-primary/20"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20" />
                )}
                <div className="leading-tight">
                  <p className="text-xs text-primary" style={{ opacity: 0.85 }}>
                    Theme by {themeAuthor}
                  </p>
                  <p className="text-[11px] text-primary" style={{ opacity: 0.5 }}>
                    Updated {getRelativeTime(themeUpdatedAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
