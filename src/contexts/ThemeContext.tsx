"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeColor = "amber" | "monochrome" | "navy" | "sunset" | "forest" | "lavender" | "peach";

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors: Record<ThemeColor, { primary: string; accent: string; name: string; isLight?: boolean }> = {
  amber: { primary: "45 100% 50%", accent: "45 100% 50%", name: "Amber" },
  monochrome: { primary: "0 0% 20%", accent: "0 0% 30%", name: "Monochrome", isLight: true },
  navy: { primary: "220 90% 35%", accent: "220 90% 30%", name: "Navy", isLight: true },
  sunset: { primary: "15 100% 60%", accent: "15 100% 55%", name: "Sunset" },
  forest: { primary: "130 100% 55%", accent: "130 100% 50%", name: "Forest" },
  lavender: { primary: "270 100% 75%", accent: "270 100% 70%", name: "Lavender" },
  peach: { primary: "25 90% 45%", accent: "25 90% 40%", name: "Peach", isLight: true },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeColor>("monochrome");
  const [mounted, setMounted] = useState(false);

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
    root.classList.remove("light", "dark", "navy", "sunset", "forest", "lavender", "peach");
    
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
