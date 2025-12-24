"use client";

import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import AnimatedSection from "./AnimatedSection";
import Skills from "@/data/skills";

const SkillsSection = () => {
  return (
    <section id="skills" className="px-6 md:px-12 lg:px-24 py-20 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-muted-foreground text-sm mb-6">
            <span className="text-primary">charlz@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ npm list --depth=0</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <TerminalWindow title="installed_packages">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm mb-4">
                charlz@portfolio /home/charlz/skills
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    className="flex items-center gap-2 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="text-primary">├──</span>
                    <span className="text-foreground">{skill.name.toLowerCase().replace(/[.\s/]/g, '-')}</span>
                    <span className="text-muted-foreground">@{skill.version}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-muted-foreground text-xs">
                  <span className="text-primary">&gt;</span> {Skills.length} packages installed successfully
                </p>
              </div>
            </div>
          </TerminalWindow>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SkillsSection;
