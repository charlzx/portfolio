"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Projects from "@/data/projects";

const ProjectsSection = () => {
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(Projects.map(project => project.category))];
    const projectCategories = uniqueCategories.map(cat => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1)
    }));

    return [{ id: "all", label: "All" }, ...projectCategories];
  }, []);

  const [activeTab, setActiveTab] = useState("all");
  
  const filteredProjects = activeTab === "all"
    ? Projects
    : Projects.filter(project => project.category === activeTab);

  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const updateColumnCount = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 1280) {
        setColumnCount(3);
      } else if (window.innerWidth >= 768) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const projectColumns = useMemo(() => {
    const columns: Array<Array<{ project: (typeof Projects)[number]; index: number }>> = Array.from(
      { length: columnCount },
      () => []
    );

    filteredProjects.forEach((project, index) => {
      columns[index % columnCount].push({ project, index });
    });

    return columns;
  }, [filteredProjects, columnCount]);

  const showTabs = categories.length > 0;

  return (
    <section id="projects" className="px-4 py-14 md:px-12 md:py-18 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">[Selected Work]</p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-foreground md:text-2xl">
                Things I've built.
              </h2>
            </div>

            {showTabs && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`rounded-md border px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] transition-colors ${
                      activeTab === category.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                    data-cursorvariant="hover"
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    [{category.label}]
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
          className="mt-8 grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {projectColumns.map((column, columnIndex) => (
            <div key={`project-column-${columnIndex}`} className="space-y-4">
              {column.map(({ project, index }) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.34, ease: "easeOut", delay: index * 0.03 }}
                  className="border-b border-border bg-card"
                  data-cursorvariant="hover"
                >
                  {project.imageUrl ? (
                    <a
                      href={project.liveUrl || project.githubUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden"
                    >
                      <Image
                        src={project.imageUrl}
                        alt={`${project.title} preview`}
                        className="h-auto w-full bg-black/20 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        width={640}
                        height={400}
                      />
                    </a>
                  ) : (
                    <div className="px-4 py-10 text-center text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                      Preview unavailable
                    </div>
                  )}

                  <div className="flex flex-col space-y-3 p-4">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">{project.title}</h3>
                      <p className="text-[11px] leading-5 text-muted-foreground">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 pt-2">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
                          data-cursorvariant="hover"
                        >
                          <Github size={13} />
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
                          data-cursorvariant="hover"
                        >
                          <ExternalLink size={13} />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
