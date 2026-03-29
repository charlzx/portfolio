"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { PROJECTS } from "@/lib/projects";

const FALLBACK_PROJECT_IMAGE = "/placeholder.svg";

function ProjectCardImage({ src, alt }: { src: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_PROJECT_IMAGE);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      className="w-full aspect-video object-cover"
      width={1600}
      height={900}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => setImageSrc(FALLBACK_PROJECT_IMAGE)}
    />
  );
}

const ProjectsSection = () => {
  const filteredProjects = PROJECTS;

  return (
    <section id="projects" className="px-4 md:px-12 lg:px-24 py-16 md:py-20">
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

        </AnimatedSection>

        {/* Projects Grid */}
        <motion.div 
          key="projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 overflow-hidden"
              data-cursorvariant="hover"
            >
              {/* Project Image */}
              {project.image && (
                <a 
                  href={project.url || project.github || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-b border-border"
                >
                  <ProjectCardImage
                    src={project.image}
                    alt={`${project.name} preview`}
                  />
                </a>
              )}

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-foreground font-bold text-lg">
                  {project.name}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description[0]}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
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
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors"
                      data-cursorvariant="hover"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.url && (
                    <a 
                      href={project.url}
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
