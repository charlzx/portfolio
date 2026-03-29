"use client";

import AnimatedSection from "./AnimatedSection";
import About from "@/data/about";

const AboutSection = () => {
  return (
    <section id="about" className="px-4 md:px-12 lg:px-24 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-muted-foreground text-sm mb-6">
            <span className="text-primary">charlz@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ cat about.txt</span>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.1}>
        <div className="terminal-window bg-card border-y border-border">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="ml-2 text-xs text-muted-foreground font-mono">about.txt</span>
          </div>
          <div className="px-6 md:px-12 lg:px-24 py-6">
            <div className="max-w-6xl mx-auto">
              <div className="space-y-4 text-foreground/90">
                {About.paragraphs.map((text, index) => (
                  <p key={`${text.slice(0, 24)}-${index}`}>
                    {index === 0 && text.includes("Charlz") ? (
                      <>
                        I&apos;m <span className="text-primary font-semibold">Charlz</span>
                        {text.slice(11)}
                      </>
                    ) : (
                      text
                    )}
                  </p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-muted-foreground text-sm mb-2">
                  <span className="text-primary">&gt;</span> interests.list()
                </p>
                <div className="flex flex-wrap gap-2">
                  {About.interests.map((interest) => (
                    <span 
                      key={interest}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default AboutSection;
