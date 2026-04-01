
import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import {
  DEFAULT_THEME,
  Theme,
  ThemeInput,
  ThemeFont,
  isThemeFont,
  normalizeHexColor,
} from "@/lib/theme-shared";

const THEME_CONFIG_ID = 1;

async function ensureThemeConfig() {
  return prisma.siteConfig.upsert({
    where: { id: THEME_CONFIG_ID },
    update: {},
    create: {
      id: THEME_CONFIG_ID,
      primaryColor: DEFAULT_THEME.primary,
      accentColor: DEFAULT_THEME.accent,
      foregroundColor: DEFAULT_THEME.foreground,
      backgroundColor: DEFAULT_THEME.background,
      fontFamily: DEFAULT_THEME.font,
      authorName: DEFAULT_THEME.authorName,
      authorAvatarUrl: DEFAULT_THEME.authorAvatarUrl,
    },
  });
}

function toIsoString(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function sanitizeFont(value: unknown, fallback: ThemeFont): ThemeFont {
  return isThemeFont(value) ? value : fallback;
}

function mapSiteConfigToTheme(siteConfig: {
  primaryColor: string;
  accentColor: string;
  foregroundColor: string;
  backgroundColor: string;
  fontFamily: string;
  authorName: string;
  authorAvatarUrl: string;
  updatedAt: Date | string;
}): Theme {
  return {
    primary: normalizeHexColor(siteConfig.primaryColor, DEFAULT_THEME.primary),
    accent: normalizeHexColor(siteConfig.accentColor, DEFAULT_THEME.accent),
    foreground: normalizeHexColor(siteConfig.foregroundColor, DEFAULT_THEME.foreground),
    background: normalizeHexColor(siteConfig.backgroundColor, DEFAULT_THEME.background),
    font: sanitizeFont(siteConfig.fontFamily, DEFAULT_THEME.font),
    authorName: siteConfig.authorName || DEFAULT_THEME.authorName,
    authorAvatarUrl: siteConfig.authorAvatarUrl || DEFAULT_THEME.authorAvatarUrl,
    updatedAt: toIsoString(siteConfig.updatedAt),
  };
}

export async function getTheme(): Promise<Theme> {
  noStore();
  const siteConfig = await ensureThemeConfig();
  return mapSiteConfigToTheme(siteConfig);
}

export async function setTheme(
  input: ThemeInput,
  meta?: { authorName?: string | null; authorAvatarUrl?: string | null }
): Promise<Theme> {
  const currentConfig = await ensureThemeConfig();

  const currentTheme = mapSiteConfigToTheme(currentConfig);

  const nextTheme: Theme = {
    primary: normalizeHexColor(input.primary, currentTheme.primary),
    accent: normalizeHexColor(input.accent, currentTheme.accent),
    foreground: normalizeHexColor(input.foreground, currentTheme.foreground),
    background: normalizeHexColor(input.background, currentTheme.background),
    font: sanitizeFont(input.font, currentTheme.font),
    authorName: meta?.authorName?.trim() || currentTheme.authorName,
    authorAvatarUrl: meta?.authorAvatarUrl?.trim() || currentTheme.authorAvatarUrl,
    updatedAt: new Date().toISOString(),
  };

  const updated = await prisma.siteConfig.update({
    where: { id: THEME_CONFIG_ID },
    data: {
      primaryColor: nextTheme.primary,
      accentColor: nextTheme.accent,
      foregroundColor: nextTheme.foreground,
      backgroundColor: nextTheme.background,
      fontFamily: nextTheme.font,
      authorName: nextTheme.authorName,
      authorAvatarUrl: nextTheme.authorAvatarUrl,
    },
  });

  return mapSiteConfigToTheme(updated);
}

export const saveTheme = setTheme;
