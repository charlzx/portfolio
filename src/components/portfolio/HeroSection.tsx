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
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground md:text-[13px]">
            Charles Obuzor.
          </p>

          <h1 className="max-w-[24ch] text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-foreground md:text-6xl">
            I build stuff.
          </h1>

          <p className="max-w-[80ch] text-[14px] leading-7 text-muted-foreground md:text-[16px]">
            React · Next.js · React Native · TypeScript.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <motion.button
              onClick={() => handleNavigate("projects")}
              data-cursorvariant="hover"
              className="bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-opacity hover:opacity-90"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              [view_projects]
            </motion.button>
            <motion.button
              onClick={() => handleNavigate("contact")}
              data-cursorvariant="hover"
              className="border border-border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-secondary"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              [contact_me]
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
