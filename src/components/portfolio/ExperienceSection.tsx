"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Experience from "@/data/experience";

const ExperienceSection = () => {
  return (
    <section id="experience" className="px-4 py-14 md:px-12 md:py-18 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Experience</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-foreground md:text-2xl">
            Roles across freelance and product teams.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {Experience.map((exp, index) => (
              <motion.article
                key={index}
                className="border border-border bg-card p-4 transition-colors hover:bg-secondary"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.03, duration: 0.26 }}
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-tight text-foreground">{exp.role}</h3>
                  <span className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    {exp.period}
                  </span>
                </div>

                <p className="mb-3 text-[11px] uppercase tracking-[0.08em] text-foreground/80">{exp.org}</p>
                <p className="text-[11px] leading-5 text-muted-foreground">{exp.notes}</p>
              </motion.article>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ExperienceSection;
