"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeColor = "navy" | "sunset";
export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeColor;
  mode: ThemeMode;
  setTheme: (theme: ThemeColor) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors: Record<ThemeColor, { primary: string; accent: string; name: string; isLight?: boolean }> = {
  navy: { primary: "220 90% 35%", accent: "220 90% 30%", name: "Navy", isLight: true },
  sunset: { primary: "15 100% 60%", accent: "15 100% 55%", name: "Sunset" },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeColor>("navy");
  const [mounted, setMounted] = useState(false);

  const mode: ThemeMode = themeColors[theme].isLight ? "light" : "dark";

  const setMode = (nextMode: ThemeMode) => {
    setTheme(nextMode === "light" ? "navy" : "sunset");
  };

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-theme") as ThemeColor;
    // Validate saved theme exists in current theme options
    if (saved && themeColors[saved]) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem("portfolio-theme", theme);
    const root = document.documentElement;
    const colors = themeColors[theme];
    
    // Safety check
    if (!colors) return;
    
    // Remove all theme classes
    root.classList.remove("light", "dark", "navy", "sunset");
    
    // Add appropriate theme class
    if (colors.isLight) {
      root.classList.add(theme);
    } else {
      root.classList.add("dark", theme);
    }
    
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--foreground", colors.primary);
    root.style.setProperty("--card-foreground", colors.primary);
    root.style.setProperty("--popover-foreground", colors.primary);
    root.style.setProperty("--secondary-foreground", colors.primary);
    root.style.setProperty("--ring", colors.primary);
    root.style.setProperty("--terminal-cursor", colors.primary);
    root.style.setProperty("--border", `${colors.primary.split(" ")[0]} 30% 20%`);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggleMode }}>
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

export { themeColors };
