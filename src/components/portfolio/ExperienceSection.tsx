"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Experience from "@/data/experience";

const ExperienceSection = () => {
  return (
    <section id="experience" className="px-4 md:px-12 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-muted-foreground text-sm mb-6">
            <span className="text-primary">charlz@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ git log --oneline experience</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Experience
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Experience.map((exp, index) => (
              <motion.div 
                key={index}
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-foreground font-semibold leading-tight">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-primary whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm font-mono mb-3">
                  <span className="text-primary">@</span> {exp.org}
                </p>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.notes}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ExperienceSection;
