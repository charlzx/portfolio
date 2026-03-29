"use client";

import { Terminal, ArrowUp } from "lucide-react";
import Link from "next/link";
import SettingsMenu from "./SettingsMenu";
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
      {/* Floating scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-4 md:right-8 bottom-8 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          data-cursorvariant="hover"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <footer className="px-4 md:px-12 lg:px-24 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          {/* Footer content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-muted-foreground text-sm text-center md:text-left order-2 md:order-1">
              <span className="text-primary">&gt;</span> © {currentYear} Charlz. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-muted-foreground text-xs order-1 md:order-2">
              <span><span className="text-primary">status:</span> online</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline"><span className="text-primary">uptime:</span> 99.9%</span>
              <span className="hidden sm:inline">|</span>
              <Link
                href="/terminal"
                data-cursorvariant="hover"
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                title="Terminal"
              >
                <Terminal size={14} />
              </Link>
              <span>|</span>
              <div className="p-2">
                <SettingsMenu iconOnly />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
