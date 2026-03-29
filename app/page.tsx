"use client";

import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  const sections = [
    { id: "hero", component: <HeroSection /> },
    { id: "about", component: <AboutSection /> },
    { id: "projects", component: <ProjectsSection /> },
    { id: "skills", component: <SkillsSection /> },
    { id: "contact", component: <ContactSection /> },
  ] as const;

  const getSectionToneClass = (index: number) =>
    index % 2 === 0 ? "bg-background" : "bg-secondary/30";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-14">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`${getSectionToneClass(index)} ${index === 0 ? "" : "border-t border-border/70"}`}
          >
            {section.component}
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
