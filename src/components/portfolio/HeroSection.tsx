"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "I turn ideas into interactive, responsive websites.";
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  const handleNavigate = (sectionId: string) => {
    scrollTo(sectionId);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-24 py-20 relative">
      <motion.div 
        className="max-w-6xl mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-muted-foreground text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-primary">charlz@portfolio</span>
          <span>:</span>
          <span className="text-blue-400">~</span>
          <span>$ whoami</span>
        </motion.div>
        
        <motion.h1 
          className="text-xl md:text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Hello<motion.span 
            className="inline-block origin-[70%_70%]"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              repeatDelay: 1,
              ease: "easeInOut"
            }}
            aria-label="waving hand"
          >👋🏾</motion.span>, I'm Charlz
        </motion.h1>
        
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {displayText}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-primary`} aria-hidden="true">▋</span>
        </motion.h2>
        
        <motion.div 
          className="text-muted-foreground text-sm space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p><span className="text-primary">&gt;</span> Frontend Developer</p>
          <p><span className="text-primary">&gt;</span> React • Next.js • TypeScript</p>
          <p><span className="text-primary">&gt;</span> Building beautiful interfaces for the web</p>
        </motion.div>

        <motion.div 
          className="mt-12 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button 
            onClick={() => handleNavigate("projects")}
            data-cursorvariant="hover"
            className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            [view_projects]
          </motion.button>
          <motion.button 
            onClick={() => handleNavigate("contact")}
            data-cursorvariant="hover"
            className="px-6 py-3 rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            [contact_me]
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="mt-16 md:mt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex justify-center md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2">
          <motion.span
            className="text-muted-foreground text-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-primary">&gt;</span> scroll_down
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
