"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Experience from "@/data/experience";

const ExperienceSection = () => {
  return (
    <section id="experience" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-muted-foreground text-sm mb-6">
            <span className="text-primary">charlz@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ git log --oneline experience</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-12">
            <span className="text-primary">&gt;</span> Experience
          </h2>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {Experience.map((exp, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Timeline dot */}
                  <motion.div 
                    className="absolute left-0 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
                  />
                  
                  {/* Content card */}
                  <div className={`ml-6 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'}`}>
                    <motion.div 
                      className="p-5 bg-card border border-border hover:border-primary/30 transition-colors"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {/* Period */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-mono text-primary">
                          {exp.period}
                        </span>
                      </div>
                      
                      {/* Role & Company */}
                      <h3 className="text-foreground font-semibold text-lg leading-tight mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-muted-foreground text-sm font-mono mb-3">
                        <span className="text-primary">@</span> {exp.org}
                      </p>
                      
                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {exp.notes}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
