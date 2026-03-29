"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Skills from "@/data/skills";

const SkillsSection = () => {
  const groupedSkills = useMemo(() => {
    const categoryOrder = ["frontend", "backend", "tools"];
    const grouped = Skills.reduce<Record<string, typeof Skills>>((accumulator, skill) => {
      if (!accumulator[skill.category]) {
        accumulator[skill.category] = [];
      }

      accumulator[skill.category].push(skill);
      return accumulator;
    }, {});

    return Object.keys(grouped)
      .sort((first, second) => {
        const firstIndex = categoryOrder.indexOf(first);
        const secondIndex = categoryOrder.indexOf(second);
        return (firstIndex === -1 ? 99 : firstIndex) - (secondIndex === -1 ? 99 : secondIndex);
      })
      .map((category) => ({
        id: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        items: grouped[category],
      }));
  }, []);

  return (
    <section id="skills" className="px-4 py-14 md:px-12 md:py-18 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Tools</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-foreground md:text-2xl">
            Core technologies and systems I work with.
          </h2>
        </AnimatedSection>

        <div className="mt-8 border-t border-border">
          {groupedSkills.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.25, delay: groupIndex * 0.04 }}
              className="grid border-b border-border py-5 md:grid-cols-[140px_minmax(0,1fr)] md:gap-6"
            >
              <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:mb-0">
                {group.label}
              </p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {group.items.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2.5 border-b border-border/70 py-2 sm:border-b-0"
                      data-cursorvariant="hover"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center text-foreground/90">
                        {IconComponent && <IconComponent />}
                      </div>
                      <p className="text-[11px] font-medium tracking-[0.01em] text-foreground">
                        {skill.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
