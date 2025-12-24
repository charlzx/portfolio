"use client";

import { Terminal } from "lucide-react";
import Link from "next/link";
import ThemeSelector from "./ThemeSelector";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 lg:px-24 py-8 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-muted-foreground text-sm">
          <span className="text-primary">&gt;</span> © {currentYear} Charlz. All rights reserved.
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground text-xs">
          <span><span className="text-primary">status:</span> online</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline"><span className="text-primary">uptime:</span> 99.9%</span>
          <span>|</span>
          <Link
            href="/terminal"
            data-cursorvariant="hover"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Terminal"
          >
            <Terminal size={14} />
          </Link>
          <ThemeSelector iconOnly />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
