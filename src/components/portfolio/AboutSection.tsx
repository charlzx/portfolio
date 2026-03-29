"use client";

import AnimatedSection from "./AnimatedSection";
import About from "@/data/about";

const AboutSection = () => {
  return (
    <section id="about" className="px-4 py-14 md:px-12 md:py-18 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">[About]</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-foreground md:text-2xl">
            I build interfaces that feel intentional and usable.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="space-y-4 border border-border bg-card p-5 md:p-6">
              {About.paragraphs.map((text, index) => (
                <p key={index} className="text-[12px] leading-6 text-muted-foreground">
                  {index === 0 && text.includes("Charlz") ? (
                    <>
                      I&apos;m <span className="font-medium text-foreground">Charlz</span>
                      {text.slice(11)}
                    </>
                  ) : (
                    text
                  )}
                </p>
              ))}
            </div>

            <div className="border border-border bg-card p-5 md:p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">[Interests]</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {About.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-sm border border-border bg-secondary px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              <div className="mt-8 border-t border-border pt-4">
                <p className="text-[11px] leading-6 text-muted-foreground">
                  Available for freelance product work, redesigns, and frontend implementation.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;
