"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Projects from "@/data/projects";

const ProjectsSection = () => {
  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-20 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-muted-foreground text-sm mb-6">
            <span className="text-primary">charlz@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ ls -la projects/</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-12">
            <span className="text-primary">&gt;</span> My Projects
          </h2>
        </AnimatedSection>

        <div className="space-y-16 md:space-y-24">
          {Projects.map((project, index) => {
            const isReversed = index % 2 !== 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isReversed ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Project Image */}
                {project.imageUrl && (
                  <div className="w-full md:w-2/5">
                    <a 
                      href={project.liveUrl || project.githubUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursorvariant="hover"
                    >
                      <Image
                        src={project.imageUrl}
                        alt={`${project.title} preview`}
                        className="w-full h-auto object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                        width={500}
                        height={300}
                      />
                    </a>
                  </div>
                )}

                {/* Content */}
                <div className="w-full md:w-3/5 space-y-4">
                  <h3 className="text-foreground font-bold text-xl">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
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
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
