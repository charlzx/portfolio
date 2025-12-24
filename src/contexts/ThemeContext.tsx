"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeColor = "amber" | "white" | "matrix" | "red" | "cyan" | "purple" | "light";

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors: Record<ThemeColor, { primary: string; accent: string; name: string; isLight?: boolean }> = {
  amber: { primary: "45 100% 50%", accent: "45 100% 50%", name: "Amber" },
  white: { primary: "0 0% 95%", accent: "0 0% 85%", name: "Monochrome" },
  matrix: { primary: "120 100% 50%", accent: "120 100% 40%", name: "Matrix" },
  red: { primary: "0 80% 55%", accent: "0 70% 50%", name: "Crimson" },
  cyan: { primary: "185 100% 50%", accent: "185 100% 40%", name: "Cyan" },
  purple: { primary: "270 70% 60%", accent: "270 70% 50%", name: "Purple" },
  light: { primary: "220 80% 50%", accent: "220 80% 50%", name: "Light", isLight: true },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeColor>("white");
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) {
      setTheme(saved as ThemeColor);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem("portfolio-theme", theme);
    const root = document.documentElement;
    const colors = themeColors[theme];
    
    // Toggle light/dark class
    if (colors.isLight) {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
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
    <ThemeContext.Provider value={{ theme, setTheme }}>
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
