"use client";

import TerminalWindow from "./TerminalWindow";
import AnimatedSection from "./AnimatedSection";
import { GraduationCap } from "lucide-react";
import Education from "@/data/education";

const EducationSection = () => {
  return (
    <section id="education" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-muted-foreground text-sm mb-6">
            <span className="text-primary">charlz@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ cat education.md</span>
          </div>
        </AnimatedSection>

        {Education.map((edu) => (
          <AnimatedSection key={`${edu.title}-${edu.place}`} delay={0.1}>
            <TerminalWindow title="education.md">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                
                <div>
                  <h3 className="text-foreground font-semibold text-lg">
                    {edu.title}
                  </h3>
                  <p className="text-primary">{edu.place}</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {edu.period}
                  </p>
                </div>
              </div>
            </TerminalWindow>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
