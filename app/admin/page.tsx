"use client";

import { FormEvent, useEffect, useState } from "react";
import { Sketch } from "@uiw/react-color";
import { DEFAULT_THEME, FONT_OPTIONS, ThemeFont } from "@/lib/theme-shared";

type ThemeForm = {
  primary: string;
  accent: string;
  foreground: string;
  background: string;
  font: ThemeFont;
};

const INITIAL_THEME: ThemeForm = {
  primary: DEFAULT_THEME.primary,
  accent: DEFAULT_THEME.accent,
  foreground: DEFAULT_THEME.foreground,
  background: DEFAULT_THEME.background,
  font: DEFAULT_THEME.font,
};

const FONT_CLASS_MAP: Record<ThemeFont, string> = {
  Inter: "font-inter",
  Roboto: "font-roboto",
  Poppins: "font-poppins",
  Montserrat: "font-montserrat",
  "Open Sans": "font-open-sans",
};

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

export default function AdminPage() {
  const [form, setForm] = useState<ThemeForm>(INITIAL_THEME);
  const [activeColorKey, setActiveColorKey] = useState<keyof Omit<ThemeForm, "font">>("primary");
  const [pickerWidth, setPickerWidth] = useState(320);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isThemeLoading, setIsThemeLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const updatePickerWidth = () => {
      const max = 520;
      const min = 260;
      const screenBased = window.innerWidth - 96;
      setPickerWidth(Math.max(min, Math.min(max, screenBased)));
    };

    updatePickerWidth();
    window.addEventListener("resize", updatePickerWidth);

    return () => window.removeEventListener("resize", updatePickerWidth);
  }, []);

  useEffect(() => {
    async function fetchTheme() {
      try {
        const response = await fetch("/api/theme", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load theme");
        }

        const data = (await response.json()) as ThemeForm;
        setForm({
          primary: data.primary,
          accent: data.accent,
          foreground: data.foreground,
          background: data.background,
          font: data.font,
        });
      } catch {
        setErrorMessage("Failed to load theme settings.");
      } finally {
        setIsThemeLoading(false);
      }
    }

    fetchTheme();
  }, []);

  const onColorChange = (key: keyof Omit<ThemeForm, "font">, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onFontChange = (value: string) => {
    setForm((prev) => ({ ...prev, font: value as ThemeFont }));
  };

  const openPicker = (key: keyof Omit<ThemeForm, "font">) => {
    setActiveColorKey(key);
    setIsPickerOpen(true);
  };

  const closePicker = () => {
    setIsPickerOpen(false);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/theme", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to save theme");
      }

      window.location.assign("/home");
    } catch {
      setErrorMessage("Failed to save theme. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const onReset = () => {
    setForm(INITIAL_THEME);
    setActiveColorKey("primary");
    setIsPickerOpen(false);
    setErrorMessage(null);
  };

  if (isThemeLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Verifying access...</p>
        </div>
      </main>
    );
  }

  const colorFields: Array<{ key: keyof Omit<ThemeForm, "font">; label: string }> = [
    { key: "primary", label: "Primary" },
    { key: "accent", label: "Accent" },
    { key: "foreground", label: "Foreground" },
    { key: "background", label: "Background" },
  ];

  const activeColorLabel = colorFields.find((field) => field.key === activeColorKey)?.label ?? "Primary";
  const currentPickerColor = HEX_COLOR_REGEX.test(form[activeColorKey])
    ? form[activeColorKey]
    : INITIAL_THEME[activeColorKey];

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl">
        <form onSubmit={onSubmit} className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
          <section className="rounded-xl border border-border bg-card text-card-foreground shadow-md p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">Theme Editor</h1>
                <p className="text-sm text-muted-foreground mt-1">Set colors and font, then save.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onReset}
                  disabled={isSaving}
                  className="shrink-0 text-sm py-2.5 px-4 rounded-lg border border-border text-foreground hover:bg-muted transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="shrink-0 text-sm py-2.5 px-4 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {colorFields.map((field) => (
                <label key={field.key} className="space-y-2">
                  <span className="text-sm font-medium text-foreground">{field.label}</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openPicker(field.key)}
                      aria-label={`Open ${field.label} color picker`}
                      className={`w-10 h-10 rounded-md border transition-all ${
                        activeColorKey === field.key
                          ? "border-primary ring-2 ring-primary/25"
                          : "border-border hover:scale-105"
                      }`}
                      style={{ backgroundColor: form[field.key] }}
                    />
                    <input
                      type="text"
                      value={form[field.key]}
                      onChange={(e) => onColorChange(field.key, e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-border bg-card text-foreground"
                    />
                  </div>
                </label>
              ))}
            </div>

            <label className="space-y-2 block">
              <span className="text-sm font-medium text-foreground">Font</span>
              <select
                value={form.font}
                onChange={(e) => onFontChange(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-card text-foreground"
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </label>

            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
          </section>

          <aside
            className={`glass rounded-xl p-6 sm:p-7 border ${FONT_CLASS_MAP[form.font]}`}
            style={{
              backgroundColor: form.background,
              color: form.foreground,
              borderColor: `${form.primary}33`,
            }}
          >
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: form.accent }}>
              Live Preview
            </p>
            <h2 className="text-3xl font-bold mt-3" style={{ color: form.primary }}>
              하자메
            </h2>
            <p className="mt-3 text-sm" style={{ color: form.foreground }}>
              Hacker Jangan Menyerang. Security through knowledge, not attack.
            </p>

            <div className="mt-6 rounded-lg p-4 border" style={{ borderColor: `${form.primary}33` }}>
              <p className="text-sm font-semibold" style={{ color: form.primary }}>
                Card Preview
              </p>
              <p className="text-sm mt-1" style={{ color: form.foreground }}>
                This is how your main card and text colors will look.
              </p>
              <button
                type="button"
                className="mt-4 px-4 py-2 rounded-md text-sm text-white"
                style={{ backgroundColor: form.accent }}
              >
                Action Button
              </button>
            </div>
          </aside>
        </form>

        {isPickerOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 sm:p-6"
            onClick={closePicker}
          >
            <div
              className="w-full max-w-2xl rounded-xl border border-border bg-card text-card-foreground shadow-xl p-4 sm:p-6"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Color Picker ${activeColorLabel}`}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-foreground">
                  Color Picker: {activeColorLabel}
                </p>
                <button
                  type="button"
                  onClick={closePicker}
                  className="text-xs px-2 py-1 rounded border border-border text-foreground hover:bg-muted"
                >
                  Close
                </button>
              </div>

              <Sketch
                disableAlpha
                width={pickerWidth}
                color={currentPickerColor}
                onChange={(color) => onColorChange(activeColorKey, color.hex)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
