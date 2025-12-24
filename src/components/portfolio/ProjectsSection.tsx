"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Projects from "@/data/projects";

const ProjectsSection = () => {
  // Dynamically extract unique categories from projects data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(Projects.map(project => project.category))];
    return uniqueCategories.map(cat => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1)
    }));
  }, []);

  const [activeTab, setActiveTab] = useState(categories[0]?.id || 'personal');
  
  const filteredProjects = Projects.filter(project => project.category === activeTab);
  const showTabs = categories.length > 1;

  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-muted-foreground text-sm mb-6 text-center">
            <span className="text-primary">charlz@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ ls -la projects/</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            My Projects
          </h2>

          {/* Tabs - Only show if multiple categories */}
          {showTabs && (
            <div className="flex justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-primary text-primary hover:bg-primary/10'
                  }`}
                  data-cursorvariant="hover"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  [{category.id}_projects]
                </motion.button>
              ))}
            </div>
          )}
        </AnimatedSection>

        {/* Projects Grid */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
              data-cursorvariant="hover"
            >
              {/* Project Image */}
              {project.imageUrl && (
                <a 
                  href={project.liveUrl || project.githubUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-b border-border"
                >
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} preview`}
                    className="w-full aspect-video object-cover"
                    width={500}
                    height={300}
                  />
                </a>
              )}

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-foreground font-bold text-lg">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-2">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors"
                      data-cursorvariant="hover"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors"
                      data-cursorvariant="hover"
                    >
                      <ExternalLink size={16} />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
