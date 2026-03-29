"use client";

import AnimatedSection from "./AnimatedSection";
import { GraduationCap } from "lucide-react";
import Education from "@/data/education";

const EducationSection = () => {
  return (
    <section id="education" className="px-4 py-14 md:px-12 md:py-18 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Education</p>
        </AnimatedSection>

        {Education.map((edu, index) => (
          <AnimatedSection key={index} delay={0.05 + index * 0.03}>
            <article className="mt-5 border border-border bg-card p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-border bg-secondary">
                  <GraduationCap className="text-foreground" size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">{edu.title}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{edu.place}</p>
                  <p className="mt-3 text-[11px] text-foreground/80">{edu.period}</p>
                </div>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
