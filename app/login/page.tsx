"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/home";
    }, 1500);
  };

  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[25vw] leading-none text-[var(--color-parchment)] opacity-[0.015] font-bold select-none">
          하자메
        </span>
      </div>

      <div className="w-full max-w-sm relative">
        <div className="text-center mb-10 fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 relative">
            <div className="absolute inset-0 rounded-full border border-[var(--color-blood)] opacity-30" />
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-[var(--color-blood)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2L12 16M12 16L8 12M12 16L16 12" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </div>

          <p className="text-xs tracking-[0.25em] text-[var(--color-silver)] uppercase mb-1">
            PKPL-D
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-parchment)] mb-1">
            Hacker Jangan Menyerang
          </h1>
        </div>

        <div className="glass rounded-xl p-8 fade-in-up fade-in-up-delay-2">
          <div className="text-center mb-6">
            <h2 className="text-base font-semibold tracking-wide text-[var(--color-parchment)] mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-[var(--color-silver)]">
              Sign in to continue
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="group w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-transparent border border-[var(--border)] rounded-lg text-[var(--color-parchment)] transition-all duration-300 hover:border-[var(--color-blood)] hover:bg-[var(--color-blood)]/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[var(--color-parchment)] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium">Continue with Google</span>
              </>
            )}
          </button>
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--color-silver)] uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <Link href="/home">
            <button className="btn-primary w-full text-center text-sm">
              Continue as Guest
            </button>
          </Link>
        </div>

        <div className="mt-8 text-center fade-in-up fade-in-up-delay-4">
          <p className="text-xs text-[var(--color-silver)] opacity-40 italic">
            &ldquo;A warrior&apos;s strength lies not in the blade, but in the restraint to not draw it.&rdquo;
          </p>
        </div>
      </div>
    </main>
  );
}
