"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "about" },
  { name: "Projects", href: "projects" },
  { name: "Skills", href: "skills" },
  { name: "Contact", href: "contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    if (isOpen) {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollTo(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[70] border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground"
              data-cursorvariant="hover"
            >
              Charles Obuzor
            </button>

            <div className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(e, item.href)}
                  data-cursorvariant="hover"
                  className="rounded-md px-2.5 py-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="relative h-9 w-9 rounded-md p-2 text-foreground lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="icon-close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X size={17} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="icon-menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Menu size={17} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] bg-background lg:hidden"
          >
            <div className="flex h-full flex-col px-6 py-6 md:px-12">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-foreground"
                  aria-label="Close navigation menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="my-auto flex flex-col gap-3">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="border-b border-border py-3 text-left text-[14px] uppercase tracking-[0.14em] text-foreground"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
