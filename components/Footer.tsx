"use client";

export default function Footer() {
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

          <p className="text-sm text-primary" style={{ opacity: 0.5 }}>
            &copy; 2026 Hacker Jangan Menyerang • PKPL D
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-primary/5 text-primary hover:bg-primary/10"
              style={{ opacity: 0.5 }}
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
