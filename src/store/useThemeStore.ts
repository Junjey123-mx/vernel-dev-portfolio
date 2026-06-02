import { useCallback, useEffect, useMemo, useState } from "react";

export type ThemeMode = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

const THEME_STORAGE_KEY = "vernel-dev-theme";
const DEFAULT_THEME = "dark" as const satisfies ThemeMode;

function canUseDOM(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "dark" || value === "light" || value === "system";
}

function getStoredTheme(): ThemeMode {
  if (!canUseDOM()) {
    return DEFAULT_THEME;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeMode(storedTheme) ? storedTheme : DEFAULT_THEME;
}

function resolveTheme(theme: ThemeMode): ResolvedTheme {
  if (theme !== "system") {
    return theme;
  }

  if (!canUseDOM()) {
    return DEFAULT_THEME;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyThemeToDocument(theme: ThemeMode): ResolvedTheme {
  const resolvedTheme = resolveTheme(theme);

  if (!canUseDOM()) {
    return resolvedTheme;
  }

  const root = document.documentElement;

  root.classList.remove("theme-dark", "theme-light");
  root.classList.add(`theme-${resolvedTheme}`);
  root.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;

  return resolvedTheme;
}

export function useThemeStore() {
  const [theme, setThemeState] = useState<ThemeMode>(() => getStoredTheme());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(getStoredTheme()));

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme);

    if (canUseDOM()) {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    }

    setResolvedTheme(applyThemeToDocument(nextTheme));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    setResolvedTheme(applyThemeToDocument(theme));

    if (!canUseDOM() || theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

    const handleChange = () => {
      setResolvedTheme(applyThemeToDocument("system"));
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );
}
