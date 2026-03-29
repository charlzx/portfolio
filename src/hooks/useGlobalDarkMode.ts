"use client";

import { useEffect, useState, useCallback } from "react";

const THEME_MODE_KEY = "nb-theme";

type ThemeMode = "dark" | "light";

export function useGlobalDarkMode(defaultDark = true) {
  const [dark, setDarkState] = useState(defaultDark);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_MODE_KEY) as ThemeMode | null;
    if (saved === "light") setDarkState(false);
    if (saved === "dark") setDarkState(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_MODE_KEY, dark ? "dark" : "light");
  }, [dark]);

  const setDark = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    setDarkState((prev: boolean) => (typeof next === "function" ? next(prev) : next));
  }, []);

  return { dark, setDark };
}
