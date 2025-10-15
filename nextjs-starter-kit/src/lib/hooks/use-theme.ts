"use client";

import { useTheme as useThemeContext } from "@/lib/contexts/theme-context";

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const setSystemTheme = () => {
    setTheme("system");
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
    toggleTheme,
    setSystemTheme,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
  };
}
