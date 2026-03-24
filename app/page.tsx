"use client";

import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "crwn3",
    name: "CRWN3",
    url: "https://crwn3.vercel.app/",
    github: "https://github.com/charlzx/shop",
    year: "2024",
    status: "live",
    tagline: "Full-featured e-commerce storefront.",
    description:
      "A full-featured e-commerce site with product listings, a shopping cart, and a checkout process. Built with a focus on performance and user experience.",
    stack: ["React", "Vite", "Tailwind", "Leaflet.js"],
    accent: "#4ade80",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 8h20l-2 12H8L6 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="12" cy="25" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="22" cy="25" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 5h3l1 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "heirswealth",
    name: "Heirswealth",
    url: "https://heirswealth.com",
    github: "",
    year: "2024",
    status: "live",
    tagline: "Solar energy company website.",
    description:
      "A full-spectrum solar energy company offering residential, industrial, and community installations, delivering sustainable, cost-efficient power systems to empower clients long-term.",
    stack: ["React", "Vite", "Tailwind", "Framer Motion"],
    accent: "#fbbf24",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="16" y1="3" x2="16" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="25.5" x2="16" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="3" y1="16" x2="6.5" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="25.5" y1="16" x2="29" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7.1" y1="7.1" x2="9.6" y2="9.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="22.4" y1="22.4" x2="24.9" y2="24.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24.9" y1="7.1" x2="22.4" y2="9.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="9.6" y1="22.4" x2="7.1" y2="24.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "gta-radio",
    name: "GTA Radio",
    url: "https://gta-live.vercel.app/",
    github: "https://github.com/charlzx/gta-radio",
    year: "2024",
    status: "live",
    tagline: "Real-time synchronized GTA radio.",
    description:
      "A modern web application that recreates the authentic Grand Theft Auto radio experience with real-time synchronized playback across all users.",
    stack: ["React", "Vite", "Tailwind"],
    accent: "#f87171",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="10" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="18" r="1.5" fill="currentColor"/>
        <path d="M8 10V8a8 8 0 0 1 16 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "smart-gym",
    name: "Smart Gym",
    url: "https://gymx.vercel.app/",
    github: "https://github.com/charlzx/gym-app",
    year: "2023",
    status: "live",
    tagline: "Responsive fitness web experience.",
    description:
      "A responsive fitness website featuring workout program sections, class schedules, and modern UI components for an engaging user experience.",
    stack: ["React", "Vite", "Tailwind", "Recharts"],
    accent: "#a78bfa",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="14" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="26" y="14" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="8" y="11" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="20" y="11" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="12" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "solisys",
    name: "Solisys",
    url: "https://solisys.vercel.app/",
    github: "https://github.com/charlzx/solisys",
    year: "2024",
    status: "live",
    tagline: "Off-grid solar system designer.",
    description:
      "A web app that guides users through designing off-grid solar systems — from load estimation to inverter, battery, and panel sizing — with printable, client-ready summaries.",
    stack: ["React", "Tailwind", "Vite"],
    accent: "#34d399",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M5 22L10 10L16 18L21 12L27 22H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "portfolio",
    name: "This Portfolio",
    url: "https://charlz.dev",
    github: "https://github.com/charlzx/portfolio",
    year: "2025",
    status: "live",
    tagline: "Personal portfolio & showcase.",
    description:
      "The very site you are on now. A personal portfolio to showcase my frontend development skills, built with modern web technologies and clean design principles.",
    stack: ["React", "Next.js", "Tailwind", "Framer Motion"],
    accent: "#94a3b8",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 11h24" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8" cy="8.5" r="1" fill="currentColor"/>
        <circle cx="12" cy="8.5" r="1" fill="currentColor"/>
        <circle cx="16" cy="8.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

const SKILLS = [
  { category: "Frontend", items: ["React", "React Native", "Next.js", "TypeScript", "JavaScript", "Expo", "Tailwind CSS", "Framer Motion"] },
  { category: "Tools & Platform", items: ["Git / GitHub", "Vite", "Vercel", "Convex"] },
];

const EXPERIENCE = [
  {
    role: "Freelance Frontend Developer",
    org: "Self-Employed",
    period: "2022 — Present",
    notes: "Partnered with clients, startups and small businesses to build and scale websites and applications. Specialized in creating responsive, high-performance UIs based on specifications.",
  },
  {
    role: "Frontend Developer",
    org: "Zuri Team, Inc.",
    period: "Mar 2021 — Jul 2021",
    notes: "Worked with teams to build full web applications. Focused on responsive UIs, API integration, and collaboration with GitHub.",
  },
  {
    role: "Frontend Intern",
    org: "Levelop (StudentBuild Study Group)",
    period: "Aug 2020 — Dec 2020",
    notes: "Built test projects and collaborated with peers on React.js features. Gained experience in debugging, code reviews, and teamwork.",
  },
  {
    role: "Student Intern",
    org: "Emerging Platforms Ltd",
    period: "Feb 2020 — Sep 2020",
    notes: "Started learning tech with focus on HTML, CSS, and JavaScript to build simple web projects.",
  },
];

const NAV_ITEMS = ["about", "projects", "experience", "contact"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible] as const;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      style={{
        width: 40,
        height: 24,
        borderRadius: 12,
        border: "1.5px solid var(--border)",
        background: "var(--surface)",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "border-color 0.2s",
      }}
    >
      <span style={{
        position: "absolute",
        top: 3,
        left: dark ? 18 : 3,
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: "var(--fg)",
        transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}/>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { label: string; bg: string; color: string }> = {
    live:     { label: "Live",     bg: "rgba(74,222,128,0.12)", color: "#4ade80" },
    dev:      { label: "In Dev",   bg: "rgba(251,191,36,0.12)",  color: "#fbbf24" },
    archived: { label: "Archived", bg: "rgba(148,163,184,0.12)", color: "#94a3b8" },
  };
  const c = cfg[status] ?? cfg.live;
  return (
    <span style={{
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.07em",
      textTransform: "uppercase",
      background: c.bg,
      color: c.color,
      padding: "3px 10px",
      borderRadius: 4,
      fontFamily: "var(--font-mono)",
    }}>
      {c.label}
    </span>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("about");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const theme = dark ? {
    "--bg": "#0c0c0d",
    "--bg2": "#111113",
    "--surface": "#1a1a1e",
    "--surface2": "#242428",
    "--border": "rgba(255,255,255,0.08)",
    "--border2": "rgba(255,255,255,0.04)",
    "--fg": "#f0f0f0",
    "--fg2": "#a0a0a8",
    "--fg3": "#60606a",
  } : {
    "--bg": "#fafafa",
    "--bg2": "#f4f4f6",
    "--surface": "#ffffff",
    "--surface2": "#f0f0f4",
    "--border": "rgba(0,0,0,0.08)",
    "--border2": "rgba(0,0,0,0.04)",
    "--fg": "#0c0c0d",
    "--fg2": "#505060",
    "--fg3": "#9090a0",
  };

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_ITEMS.map(id => document.getElementById(id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i]!.offsetTop <= scrollY) {
          setActiveNav(NAV_ITEMS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ ...(theme as React.CSSProperties), fontFamily: "var(--font-sans)", background: "var(--bg)", color: "var(--fg)", minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --font-sans: 'Space Grotesk', sans-serif; --font-mono: 'DM Mono', monospace; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: rgba(226,232,240,0.15); }

        .nav-link {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--fg3);
          cursor: pointer;
          transition: color 0.2s;
          font-family: var(--font-mono);
          background: none;
          border: none;
          padding: 0;
        }
        .nav-link:hover, .nav-link.active { color: var(--fg); }

        .project-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--surface);
          transition: border-color 0.2s, transform 0.25s, box-shadow 0.25s;
          overflow: hidden;
          cursor: pointer;
        }
        .project-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.18);
        }

        .chip {
          display: inline-block;
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--fg3);
          background: var(--surface2);
          border: 1px solid var(--border);
          padding: 3px 10px;
          border-radius: 4px;
        }

        .skill-chip {
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--fg2);
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 6px 14px;
          border-radius: 6px;
          transition: border-color 0.2s, color 0.2s;
        }
        .skill-chip:hover { border-color: var(--fg3); color: var(--fg); }

        .link-arrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          font-family: var(--font-mono);
          color: var(--fg2);
          text-decoration: none;
          transition: color 0.2s, gap 0.2s;
        }
        .link-arrow:hover { color: var(--fg); gap: 10px; }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
          color: var(--bg);
          background: var(--fg);
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
          color: var(--fg);
          background: transparent;
          border: 1.5px solid var(--border);
          padding: 11px 24px;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, transform 0.15s;
        }
        .btn-outline:hover { border-color: var(--fg3); transform: translateY(-1px); }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .grid-3 { grid-template-columns: 1fr; } }

        .section-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-family: var(--font-mono);
          color: var(--fg3);
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--border);
        }

        .hero-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--fg3);
          letter-spacing: 0.08em;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeUp 0.65s ease 0.1s both; }
        .anim-2 { animation: fadeUp 0.65s ease 0.22s both; }
        .anim-3 { animation: fadeUp 0.65s ease 0.36s both; }
        .anim-4 { animation: fadeUp 0.65s ease 0.5s both; }

        .expanded-body {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
        }

        .exp-row {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 24px;
          padding: 28px 0;
          border-bottom: 1px solid var(--border2);
        }
        @media (max-width: 600px) {
          .exp-row { grid-template-columns: 1fr; gap: 8px; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(20px, 5vw, 80px)",
        borderBottom: "1px solid var(--border2)",
        background: dark ? "rgba(12,12,13,0.88)" : "rgba(250,250,250,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}>
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          charlz
        </span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_ITEMS.map(id => (
            <button key={id} className={`nav-link${activeNav === id ? " active" : ""}`} onClick={() => scrollTo(id)}>
              {id}
            </button>
          ))}
        </div>
        <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
      </nav>

      {/* HERO */}
      <section id="about" style={{
        minHeight: "100svh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "120px clamp(20px, 5vw, 80px) 80px",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(var(--border2) 1px, transparent 1px), linear-gradient(90deg, var(--border2) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          pointerEvents: "none",
        }}/>

        <div style={{ position: "relative", maxWidth: 820, zIndex: 1 }}>
          <div className="anim-1" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <span className="hero-meta">01 / intro</span>
            <span style={{ width: 48, height: 1, background: "var(--border)", display: "block" }}/>
            <span className="hero-meta">Abuja, Nigeria</span>
          </div>

          <h1 className="anim-2" style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(44px, 7.5vw, 96px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: "var(--fg)",
            marginBottom: 28,
          }}>
            Charles<br/>
            <span style={{ color: "var(--fg3)" }}>Obuzor</span>
          </h1>

          <p className="anim-3" style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(13px, 1.6vw, 16px)",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--fg2)",
            maxWidth: "54ch",
            marginBottom: 44,
          }}>
            Frontend developer focused on building beautiful interfaces for the web.
            Clean design, fast performance, practical features.
            React, Next.js, React Native, TypeScript.
          </p>

          <div className="anim-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("projects")}>
              Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <a href="https://github.com/charlzx" target="_blank" rel="noreferrer" className="btn-outline">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub
            </a>
            <a href="mailto:hello@charlz.dev" className="btn-outline">
              hello@charlz.dev
            </a>
          </div>
        </div>

        <div style={{
          position: "absolute", right: "clamp(20px, 5vw, 80px)", bottom: 80,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg3)", letterSpacing: "0.12em", writingMode: "vertical-rl" }}>scroll</span>
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, var(--fg3), transparent)` }}/>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px clamp(20px, 5vw, 80px)", borderTop: "1px solid var(--border2)" }}>
        <Reveal><div className="section-label">02 / projects</div></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(28px, 4.5vw, 56px)",
            letterSpacing: "-0.025em", lineHeight: 1.08,
            color: "var(--fg)", marginBottom: 56,
          }}>
            Things I&apos;ve built.
          </h2>
        </Reveal>

        <div className="grid-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <div
                className="project-card"
                onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
                style={{ userSelect: "none" }}
              >
                <div style={{
                  padding: "24px 24px 18px",
                  borderBottom: expandedProject === p.id ? "1px solid var(--border)" : "1px solid transparent",
                  transition: "border-color 0.3s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <div style={{ color: p.accent }}>{p.icon}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)" }}>{p.year}</span>
                      <StatusBadge status={p.status} />
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 19, letterSpacing: "-0.015em", color: "var(--fg)", marginBottom: 6 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 300, color: "var(--fg2)", lineHeight: 1.5 }}>
                    {p.tagline}
                  </p>
                </div>

                <div className="expanded-body" style={{
                  maxHeight: expandedProject === p.id ? 320 : 0,
                  opacity: expandedProject === p.id ? 1 : 0,
                  padding: expandedProject === p.id ? "18px 24px 22px" : "0 24px",
                }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 300, lineHeight: 1.8, color: "var(--fg2)", marginBottom: 14 }}>
                    {p.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                    {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 16 }}>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" className="link-arrow" onClick={e => e.stopPropagation()}>
                        Live site
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="link-arrow" onClick={e => e.stopPropagation()}>
                        GitHub
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    )}
                  </div>
                </div>

                <div style={{ padding: "8px 24px", display: "flex", justifyContent: "flex-end" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
                    color: "var(--fg3)",
                    transform: expandedProject === p.id ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}>
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px clamp(20px, 5vw, 80px)", borderTop: "1px solid var(--border2)", background: "var(--bg2)" }}>
        <Reveal><div className="section-label">03 / experience</div></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(28px, 4.5vw, 56px)",
            letterSpacing: "-0.025em", lineHeight: 1.08,
            color: "var(--fg)", marginBottom: 56,
          }}>
            Where I&apos;ve worked.
          </h2>
        </Reveal>

        <div style={{ maxWidth: 720 }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="exp-row">
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)", marginBottom: 4 }}>{e.period}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg2)", fontWeight: 500 }}>{e.org}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em", color: "var(--fg)", marginBottom: 8 }}>{e.role}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 300, lineHeight: 1.75, color: "var(--fg2)" }}>{e.notes}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Skills */}
        <Reveal delay={0.1}>
          <div style={{ marginTop: 64 }}>
            <div className="section-label" style={{ marginBottom: 24 }}>stack</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {SKILLS.map((group) => (
                <div key={group.category}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg3)", marginBottom: 12 }}>
                    {group.category}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.map(item => <span key={item} className="skill-chip">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px clamp(20px, 5vw, 80px) 120px", borderTop: "1px solid var(--border2)" }}>
        <Reveal><div className="section-label">04 / contact</div></Reveal>
        <div style={{ maxWidth: 600 }}>
          <Reveal delay={0.05}>
            <h2 style={{
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(28px, 4.5vw, 64px)",
              letterSpacing: "-0.03em", lineHeight: 1.05,
              color: "var(--fg)", marginBottom: 20,
            }}>
              Let&apos;s build<br/>
              <span style={{ color: "var(--fg3)" }}>something.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: "var(--fg2)", marginBottom: 44 }}>
              Open to freelance work, collaborations, and full-time engineering roles.
              Remote-first.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="mailto:hello@charlz.dev" className="btn-primary">hello@charlz.dev</a>
              <a href="https://linkedin.com/in/charlzObuzor" target="_blank" rel="noreferrer" className="btn-outline">LinkedIn ↗</a>
              <a href="https://twitter.com/charlzObuzor" target="_blank" rel="noreferrer" className="btn-outline">X / Twitter ↗</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "24px clamp(20px, 5vw, 80px)",
        borderTop: "1px solid var(--border2)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg3)" }}>© 2025 Charles Obuzor</span>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "github", href: "https://github.com/charlzx" },
            { label: "linkedin", href: "https://linkedin.com/in/charlzObuzor" },
            { label: "twitter", href: "https://twitter.com/charlzObuzor" },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
              style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "var(--fg)"}
              onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "var(--fg3)"}
            >
              {l.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
