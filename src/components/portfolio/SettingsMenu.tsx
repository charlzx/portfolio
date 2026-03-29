"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface SettingsMenuProps {
  iconOnly?: boolean;
}

const SettingsMenu = ({ iconOnly = false }: SettingsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { mode } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        data-cursorvariant="hover"
        className={iconOnly
          ? "text-muted-foreground hover:text-primary transition-colors"
          : "text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        }
        title="Settings"
        aria-label="Open settings"
      >
        <Settings size={14} />
        {!iconOnly && <span>[settings]</span>}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 bottom-10 w-56 rounded-lg border border-border bg-card p-3 shadow-xl"
          >
            <p className="mb-2 text-xs text-muted-foreground">
              <span className="text-primary">&gt;</span> Theme
            </p>

            <div className="flex items-center justify-center gap-1 border border-primary bg-primary/10 px-2 py-2 text-xs text-primary">
              <Moon size={14} />
              {mode}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsMenu;
