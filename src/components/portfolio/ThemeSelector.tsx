"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Palette } from "lucide-react";
import { useTheme, themeColors, ThemeColor } from "@/contexts/ThemeContext";
import TerminalWindow from "./TerminalWindow";

interface ThemeSelectorProps {
  iconOnly?: boolean;
}

const ThemeSelector = ({ iconOnly = false }: ThemeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeSelect = (newTheme: ThemeColor) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-cursorvariant="hover"
        className={iconOnly 
          ? "text-muted-foreground hover:text-primary transition-colors" 
          : "text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        }
        title="Theme"
      >
        <Palette size={14} />
        {!iconOnly && <span>[theme]</span>}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <TerminalWindow title="theme_selector.sh">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                      <span className="text-primary">&gt;</span> Select terminal theme
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-muted-foreground hover:text-primary transition-colors p-1"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(themeColors) as ThemeColor[]).map((themeKey) => (
                      <motion.button
                        key={themeKey}
                        onClick={() => handleThemeSelect(themeKey)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-lg border-2 transition-colors text-left relative ${
                          theme === themeKey
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 bg-secondary"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              theme === themeKey ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                            }`}
                            style={{
                              backgroundColor: `hsl(${themeColors[themeKey].primary})`,
                            }}
                          />
                          <span
                            className="font-semibold text-sm"
                            style={{ color: `hsl(${themeColors[themeKey].primary})` }}
                          >
                            {themeColors[themeKey].name}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-muted-foreground text-xs">
                      <span className="text-primary">&gt;</span> Theme preference is saved locally
                    </p>
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSelector;
