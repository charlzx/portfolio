"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const navItems = [
  { name: "about", href: "about" },
  { name: "skills", href: "skills" },
  { name: "experience", href: "experience" },
  { name: "projects", href: "projects" },
  { name: "education", href: "education" },
  { name: "contact", href: "contact" },
];

// Animated hamburger menu path component
const Path = (props: React.ComponentProps<typeof motion.path>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) => (
  <motion.button 
    onClick={toggle} 
    className="lg:hidden p-2 z-50 text-foreground"
    initial={false}
    animate={isOpen ? "open" : "closed"}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </motion.button>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const handleNavClick = (sectionId: string) => {
    scrollTo(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2" data-cursorvariant="hover">
              <svg width="24" height="24" viewBox="0 0 100 100">
                <path d="M20,80 L50,20 L80,80 Z" fill="none" className="stroke-primary" strokeWidth="8"/>
                <path d="M25,70 L75,70" fill="none" className="stroke-primary" strokeWidth="8"/>
              </svg>
              <span className="text-lg font-bold tracking-wider">CHARLZ</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <span
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  data-cursorvariant="hover"
                  className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer"
                >
                  <span className="text-border">[</span>
                  {item.name}
                  <span className="text-border">]</span>
                </span>
              ))}
            </div>

            {/* Mobile/Tablet Menu Button */}
            <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile/Tablet Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <motion.div 
              className="flex flex-col items-start justify-center h-full px-8 gap-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {navItems.map((item) => (
                <motion.span
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-2xl md:text-3xl text-muted-foreground hover:text-primary transition-colors cursor-pointer font-mono"
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
                  }}
                >
                  <span className="text-border">[</span>
                  {item.name}
                  <span className="text-border">]</span>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
