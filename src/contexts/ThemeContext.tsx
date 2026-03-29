"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";

export type ThemeMode = "dark";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo<ThemeContextType>(() => ({
    mode: "dark",
    setMode: () => {
      // Dark-only theme: kept for compatibility with existing callers.
    },
    toggleMode: () => {
      // Dark-only theme: kept for compatibility with existing callers.
    },
  }), []);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
