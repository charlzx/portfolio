"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user reaches contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const contactTop = contactSection.offsetTop;
        setShowScrollTop(window.scrollY + window.innerHeight >= contactTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 z-50 rounded-md border border-border bg-card p-2.5 text-foreground transition-colors hover:bg-secondary md:right-8"
          data-cursorvariant="hover"
          aria-label="Scroll to top"
        >
          <ArrowUp size={15} />
        </button>
      )}

      <footer className="border-t border-border px-4 py-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="order-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground md:order-1">
              © {currentYear} Charles Obuzor
            </div>

            <div className="order-1 flex items-center gap-4 md:order-2">
              <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Designing and building on the web</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
