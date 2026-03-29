"use client";

import { useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export function useGlobalDarkMode(_defaultDark = true) {
  const { darkMode, setDarkMode } = useTheme();
  const dark = darkMode === "dark";

  const setDark = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    setDarkMode((prev) => {
      const prevBool = prev === "dark";
      const nextValue = typeof next === "function" ? next(prevBool) : next;
      return nextValue ? "dark" : "light";
    });
  }, [setDarkMode]);

  return { dark, setDark };
}
