export const FONT_OPTIONS = ["Inter", "Roboto", "Poppins", "Montserrat", "Open Sans"] as const;

export type ThemeFont = (typeof FONT_OPTIONS)[number];

export type Theme = {
  primary: string;
  accent: string;
  foreground: string;
  background: string;
  font: ThemeFont;
  authorName: string;
  authorAvatarUrl: string;
  updatedAt: string;
};

export type ThemeInput = Partial<Pick<Theme, "primary" | "accent" | "foreground" | "background" | "font">>;

export const DEFAULT_THEME: Theme = {
  primary: "#0f172a",
  accent: "#8b0000",
  foreground: "#0f172a",
  background: "#ffffff",
  font: "Inter",
  authorName: "System",
  authorAvatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=System&backgroundColor=c41e3a",
  updatedAt: new Date(0).toISOString(),
};

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

export function isThemeFont(value: unknown): value is ThemeFont {
  return typeof value === "string" && FONT_OPTIONS.includes(value as ThemeFont);
}

export function normalizeHexColor(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  return HEX_COLOR_REGEX.test(value) ? value : fallback;
}

export function fontToCssVariable(font: ThemeFont): string {
  switch (font) {
    case "Inter":
      return "var(--font-inter)";
    case "Roboto":
      return "var(--font-roboto)";
    case "Poppins":
      return "var(--font-poppins)";
    case "Montserrat":
      return "var(--font-montserrat)";
    case "Open Sans":
      return "var(--font-open-sans)";
    default:
      return "var(--font-inter)";
  }
}