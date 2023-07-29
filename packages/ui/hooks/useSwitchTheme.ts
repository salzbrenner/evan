"use client";
import { useState } from "react";

export const SAVED_THEME = "es_theme";

export const THEME = {
  light: "light",
  dark: "dark",
} as const;

export const checkTheme = () =>
  typeof window !== "undefined" &&
  document.documentElement.classList.contains(THEME.light)
    ? THEME.light
    : THEME.dark;

export function useSwitchTheme() {
  const [theme, setTheme] = useState(checkTheme());
  const switchTheme = () => {
    if (typeof window === "undefined") return;
    const newTheme = theme === THEME.light ? THEME.dark : THEME.light;
    document.documentElement.classList.toggle(THEME.light);
    document.documentElement.classList.toggle(THEME.dark);
    localStorage.setItem(SAVED_THEME, newTheme);
    setTheme(newTheme);
  };
  return { theme, switchTheme };
}
