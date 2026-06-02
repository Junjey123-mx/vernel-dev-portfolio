import type { ReactNode } from "react";

import { ThemeContext } from "@/app/providers/theme-context";
import { useThemeStore } from "@/store/useThemeStore";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeStore = useThemeStore();

  return <ThemeContext.Provider value={themeStore}>{children}</ThemeContext.Provider>;
}
