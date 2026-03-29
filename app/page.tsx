"use client";

import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  const USE_SECTION_TONES = false;

  const sectionBackgrounds = {
    hero: {
      backgroundColor: "#0f172a",
      backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.16) 0%, rgba(15, 23, 42, 0.98) 60%)",
    },
    about: {
      backgroundColor: "#0f1a14",
      backgroundImage: "linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(15, 26, 20, 0.98) 62%)",
    },
    projects: {
      backgroundColor: "#1f1410",
      backgroundImage: "linear-gradient(135deg, rgba(249, 115, 22, 0.16) 0%, rgba(31, 20, 16, 0.98) 62%)",
    },
    skills: {
      backgroundColor: "#11202a",
      backgroundImage: "linear-gradient(135deg, rgba(6, 182, 212, 0.14) 0%, rgba(17, 32, 42, 0.98) 62%)",
    },
    contact: {
      backgroundColor: "#1f1711",
      backgroundImage: "linear-gradient(135deg, rgba(245, 158, 11, 0.14) 0%, rgba(31, 23, 17, 0.98) 62%)",
    },
  } as const;

  const getSectionStyle = (key: keyof typeof sectionBackgrounds): React.CSSProperties => {
    if (!USE_SECTION_TONES) return {};
    return {
      backgroundColor: sectionBackgrounds[key].backgroundColor,
      backgroundImage: sectionBackgrounds[key].backgroundImage,
      borderTop: "1px solid hsl(var(--border))",
    };
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-14">
        <div style={getSectionStyle("hero")}>
          <HeroSection />
        </div>
        <div style={getSectionStyle("about")}>
          <AboutSection />
        </div>
        <div style={getSectionStyle("projects")}>
          <ProjectsSection />
        </div>
        <div style={getSectionStyle("skills")}>
          <SkillsSection />
        </div>
        <div style={getSectionStyle("contact")}>
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
