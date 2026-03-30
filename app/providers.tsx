"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useInteractiveCursor } from "@/hooks/useInteractiveCursor";
import Preloader from "@/components/portfolio/Preloader";

// Grid Pattern Background Component
const GridPatternBackground = () => {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--foreground) / 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--foreground) / 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    />
  );
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true to avoid flash
  const pathname = usePathname();
  const isTerminalPage = pathname === '/terminal';

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Hide loader after delay
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const { x: cursorX, y: cursorY, cursorVariant, cursorVariants } = useInteractiveCursor(isTouchDevice || isTerminalPage);
  const smoothCursorX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const springConfig = { type: 'spring' as const, stiffness: 200, damping: 20 };

  return (
    <ThemeProvider>
      <div className={`relative min-h-screen ${!isTouchDevice && !isTerminalPage ? 'cursor-none' : 'cursor-auto'}`}>
        {/* Grid Pattern Background */}
        {!isTerminalPage && <GridPatternBackground />}
        
        {/* Custom Cursor */}
        {!isTouchDevice && !isTerminalPage && (
          <motion.div
            variants={cursorVariants}
            animate={cursorVariant}
            transition={springConfig}
            className="pointer-events-none fixed top-0 left-0 z-[100]"
            style={{
              x: smoothCursorX,
              y: smoothCursorY,
              borderRadius: '9999px',
              translateX: '-50%',
              translateY: '-50%'
            }}
          />
        )}
        
        <AnimatePresence>
          {isLoading && <Preloader />}
        </AnimatePresence>
        
        <div className="relative z-10">
          {!isLoading && children}
        </div>
      </div>
    </ThemeProvider>
  );
}
