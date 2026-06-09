import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dict, type Locale } from "@/i18n/dict";

type Theme = "light" | "dark";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  toggleLocale: () => void;
};

const AppCtx = createContext<Ctx | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => (typeof window !== "undefined" ? (localStorage.getItem("locale") as Locale) : null) || "en");
  const [theme, setThemeState] = useState<Theme>(() => (typeof window !== "undefined" ? (localStorage.getItem("theme") as Theme) : null) || "dark");

  const dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    if (typeof window !== "undefined") localStorage.setItem("locale", locale);
  }, [locale, dir]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (typeof window !== "undefined") localStorage.setItem("theme", theme);
  }, [theme]);

  const t = useCallback(
    (key: string) => {
      const table = dict[locale] as Record<string, string>;
      return table[key] ?? (dict.en as Record<string, string>)[key] ?? key;
    },
    [locale],
  );

  const value = useMemo<Ctx>(
    () => ({
      locale,
      setLocale: setLocaleState,
      dir,
      t,
      theme,
      setTheme: setThemeState,
      toggleTheme: () => setThemeState((p) => (p === "dark" ? "light" : "dark")),
      toggleLocale: () => setLocaleState((p) => (p === "en" ? "ar" : "en")),
    }),
    [locale, dir, t, theme],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const useT = () => useApp().t;
