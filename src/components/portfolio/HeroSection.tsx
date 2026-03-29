"use client";

import { motion } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const HeroSection = () => {
  const { scrollTo } = useSmoothScroll();

  const handleNavigate = (sectionId: string) => {
    scrollTo(sectionId);
  };

  return (
    <section className="px-4 pb-20 pt-24 md:px-12 md:pb-28 md:pt-28 lg:px-24">
      <motion.div
        className="mx-auto w-full max-w-6xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Frontend Developer · Nigeria
          </p>

          <h1 className="max-w-[14ch] text-2xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground md:text-4xl">
            Building clean digital products with strong interaction detail.
          </h1>

          <p className="max-w-[56ch] text-[12px] leading-6 text-muted-foreground">
            I design and ship modern web experiences focused on clarity, performance,
            and product feel. My stack is React, Next.js, TypeScript, and practical UI systems.
          </p>

          <div className="grid gap-3 pt-1 md:grid-cols-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Focus</p>
              <p className="mt-1.5 text-[12px] leading-5 text-foreground">Product UI Engineering</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Stack</p>
              <p className="mt-1.5 text-[12px] leading-5 text-foreground">React · Next.js · TypeScript</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Availability</p>
              <p className="mt-1.5 text-[12px] leading-5 text-foreground">Open for select freelance work</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <motion.button
              onClick={() => handleNavigate("projects")}
              data-cursorvariant="hover"
              className="bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-opacity hover:opacity-90"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              View Projects
            </motion.button>
            <motion.button
              onClick={() => handleNavigate("contact")}
              data-cursorvariant="hover"
              className="border border-border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-secondary"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              Contact
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
