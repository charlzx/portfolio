"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Skills from "@/data/skills";

const SkillsSection = () => {
  // Dynamically extract unique categories from skills data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(Skills.map(skill => skill.category))];
    const categoryList = uniqueCategories.map(cat => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1)
    }));
    
    // Only add "All" if there are multiple categories
    if (categoryList.length > 1) {
      return [{ id: "all", label: "All" }, ...categoryList];
    }
    return categoryList;
  }, []);

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "all");

  const filteredSkills = activeCategory === "all" 
    ? Skills 
    : Skills.filter(skill => skill.category === activeCategory);

  const showTabs = categories.length > 1;

  return (
    <section id="skills" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-muted-foreground text-sm mb-6 text-center">
            <span className="text-primary">charlz@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ cat technologies.json</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Technologies and Tools
          </h2>

          {/* Category Tabs - Only show if multiple categories */}
          {showTabs && (
            <div className="flex justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-primary text-primary hover:bg-primary/10'
                  }`}
                  data-cursorvariant="hover"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  [{category.label}]
                </motion.button>
              ))}
            </div>
          )}
        </AnimatedSection>

        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {filteredSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card border-l-4 border-l-primary border-y border-r border-border hover:bg-card/50 p-4 transition-all duration-300 group"
                data-cursorvariant="hover"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    {IconComponent && <IconComponent />}
                  </div>
                  <div className="text-foreground font-semibold text-sm whitespace-nowrap">
                    {skill.name}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
