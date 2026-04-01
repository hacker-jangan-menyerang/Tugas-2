"use client";

import { useEffect } from "react";
import { fontToCssVariable, Theme } from "@/lib/theme-shared";

export default function ThemeHydrator() {
  useEffect(() => {
    let active = true;

    async function hydrateTheme() {
      try {
        const response = await fetch("/api/theme", { cache: "no-store" });
        if (!response.ok) return;

        const theme = (await response.json()) as Theme;
        if (!active) return;

        const root = document.documentElement;
        const selectedFontVar = fontToCssVariable(theme.font);

        root.style.setProperty("--primary", theme.primary);
        root.style.setProperty("--accent", theme.accent);
        root.style.setProperty("--foreground", theme.foreground);
        root.style.setProperty("--background", theme.background);
        root.style.setProperty("--font-heading", `${selectedFontVar}, sans-serif`);
        root.style.setProperty("--font-body", `${selectedFontVar}, sans-serif`);

        document.body.style.backgroundColor = theme.background;
      } catch {
        // Keep server-rendered theme if hydration fetch fails.
      }
    }

    hydrateTheme();

    return () => {
      active = false;
    };
  }, []);

  return null;
}