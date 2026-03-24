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
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
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
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
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
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
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
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
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
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
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
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
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

function useInView(threshold = 0.12) {
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [activeNav, setActiveNav] = useState("about");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const theme = dark ? {
    "--bg":       "#17150e",
    "--bg2":      "#1c1a12",
    "--surface":  "#1e1c14",
    "--card":     "#22201a",
    "--rule":     "rgba(255,255,255,0.045)",
    "--margin":   "rgba(210,70,70,0.28)",
    "--fg":       "#e8dcc8",
    "--fg2":      "#a89878",
    "--fg3":      "#6a5a48",
    "--border":   "rgba(232,220,200,0.11)",
    "--chip-bg":  "rgba(232,220,200,0.07)",
    "--shadow":   "rgba(0,0,0,0.35)",
    "--ink-dim":  "rgba(232,220,200,0.08)",
  } : {
    "--bg":       "#fdfaf3",
    "--bg2":      "#f8f4e8",
    "--surface":  "#fdf8ed",
    "--card":     "#fefbf0",
    "--rule":     "rgba(100,149,237,0.17)",
    "--margin":   "rgba(220,55,55,0.38)",
    "--fg":       "#1a1208",
    "--fg2":      "#3d2e1a",
    "--fg3":      "#9a8870",
    "--border":   "rgba(26,18,8,0.13)",
    "--chip-bg":  "rgba(26,18,8,0.06)",
    "--shadow":   "rgba(26,18,8,0.09)",
    "--ink-dim":  "rgba(26,18,8,0.06)",
  };

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_ITEMS.map(id => document.getElementById(id));
      const scrollY = window.scrollY + 100;
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

  const PAD = "clamp(20px, 6vw, 96px)";
  const PAD_L = "clamp(20px, 8vw, 112px)";

  return (
    <div
      className="nb-root"
      style={{ ...(theme as React.CSSProperties) }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --font-hand: 'Caveat', cursive;
          --font-head: 'Raleway', sans-serif;
          --rule-h: 32px;
        }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: rgba(100,149,237,0.22); }

        /* ── NOTEBOOK BASE ─────────────────── */
        .nb-root {
          background-color: var(--bg);
          background-image:
            repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent calc(var(--rule-h) - 1px),
              var(--rule) calc(var(--rule-h) - 1px),
              var(--rule) var(--rule-h)
            );
          background-size: 100% var(--rule-h);
          color: var(--fg);
          font-family: var(--font-hand);
          min-height: 100vh;
          transition: background-color 0.35s, color 0.3s;
          position: relative;
        }

        /* ── MARGIN LINE ───────────────────── */
        .nb-margin {
          position: fixed;
          top: 0; bottom: 0;
          left: 72px;
          width: 1.5px;
          background: var(--margin);
          z-index: 5;
          pointer-events: none;
          transition: background 0.35s;
        }
        @media (max-width: 640px) { .nb-margin { display: none; } }

        /* ── NAV ───────────────────────────── */
        .nb-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 40;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(20px, 6vw, 96px) 0 clamp(20px, 8vw, 112px);
          border-bottom: 1px solid var(--border);
          background-color: var(--bg);
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent calc(var(--rule-h) - 1px),
            var(--rule) calc(var(--rule-h) - 1px),
            var(--rule) var(--rule-h)
          );
          background-size: 100% var(--rule-h);
          transition: background-color 0.35s;
        }

        .nb-logo {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.02em;
          color: var(--fg);
          text-decoration: none;
        }

        .nb-nav-links {
          display: flex;
          gap: 28px;
          align-items: center;
        }

        .nb-nav-link {
          font-family: var(--font-hand);
          font-size: 20px;
          font-weight: 600;
          color: var(--fg3);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
          line-height: 1;
        }
        .nb-nav-link:hover { color: var(--fg2); }
        .nb-nav-link.active {
          color: var(--fg);
          text-decoration: underline;
          text-decoration-style: wavy;
          text-underline-offset: 3px;
          text-decoration-color: var(--margin);
        }

        /* ── THEME TOGGLE ──────────────────── */
        .nb-toggle {
          font-family: var(--font-hand);
          font-size: 22px;
          background: none;
          border: 1.5px solid var(--border);
          border-radius: 4px;
          color: var(--fg3);
          cursor: pointer;
          padding: 2px 10px;
          transition: color 0.2s, border-color 0.2s;
          line-height: 1.4;
          flex-shrink: 0;
        }
        .nb-toggle:hover { color: var(--fg); border-color: var(--fg3); }

        /* ── SECTIONS ──────────────────────── */
        .nb-section {
          padding: 96px clamp(20px, 6vw, 96px) 96px clamp(20px, 8vw, 112px);
          border-top: 1px solid var(--border);
        }

        /* ── SECTION LABEL ─────────────────── */
        .nb-label {
          font-family: var(--font-hand);
          font-size: 16px;
          color: var(--fg3);
          margin-bottom: 24px;
          letter-spacing: 0.04em;
        }

        /* ── HEADINGS ──────────────────────── */
        .nb-h2 {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: clamp(28px, 4vw, 52px);
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: var(--fg);
          margin-bottom: 56px;
        }

        /* ── PROJECT GRID ──────────────────── */
        .nb-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) { .nb-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .nb-grid { grid-template-columns: 1fr; } }

        /* ── PROJECT CARD (index card) ─────── */
        .nb-card {
          border: 1px solid var(--border);
          border-radius: 3px;
          background-color: var(--card);
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent calc(var(--rule-h) - 1px),
            var(--ink-dim) calc(var(--rule-h) - 1px),
            var(--ink-dim) var(--rule-h)
          );
          background-size: 100% var(--rule-h);
          box-shadow: 2px 3px 10px var(--shadow);
          transition: transform 0.25s, box-shadow 0.25s;
          overflow: hidden;
          cursor: pointer;
        }
        .nb-card:hover {
          transform: translateY(-4px) rotate(0.25deg);
          box-shadow: 4px 8px 24px var(--shadow);
        }

        /* ── CARD ACCENT STRIP ─────────────── */
        .nb-card-strip {
          height: 4px;
          width: 100%;
        }

        /* ── STATUS BADGE ──────────────────── */
        .nb-badge {
          font-family: var(--font-hand);
          font-size: 14px;
          font-weight: 600;
          padding: 1px 8px;
          border-radius: 2px;
          display: inline-block;
        }

        /* ── TECH CHIP ─────────────────────── */
        .nb-chip {
          font-family: var(--font-hand);
          font-size: 15px;
          color: var(--fg3);
          background: var(--chip-bg);
          border: 1px solid var(--border);
          padding: 1px 8px;
          border-radius: 2px;
          display: inline-block;
        }

        /* ── SKILL TAG ─────────────────────── */
        .nb-tag {
          font-family: var(--font-hand);
          font-size: 18px;
          color: var(--fg2);
          border: 1.5px solid var(--border);
          padding: 3px 14px;
          border-radius: 2px;
          display: inline-block;
          transition: border-color 0.2s, color 0.2s;
          background: var(--chip-bg);
        }
        .nb-tag:hover { border-color: var(--fg3); color: var(--fg); }

        /* ── EXPANDED CARD BODY ────────────── */
        .nb-expand {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
        }

        /* ── EXPERIENCE ROW ────────────────── */
        .nb-exp-row {
          display: grid;
          grid-template-columns: 172px 1fr;
          gap: 28px;
          padding: 28px 0;
          border-bottom: 1px dashed var(--border);
        }
        @media (max-width: 600px) { .nb-exp-row { grid-template-columns: 1fr; gap: 6px; } }

        /* ── BUTTONS ───────────────────────── */
        .nb-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-hand);
          font-size: 20px;
          font-weight: 600;
          color: var(--bg);
          background: var(--fg);
          border: none;
          padding: 6px 22px;
          border-radius: 3px;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.15s;
          line-height: 1.5;
        }
        .nb-btn:hover { opacity: 0.85; transform: translateY(-1px); }

        .nb-btn-out {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-hand);
          font-size: 20px;
          font-weight: 600;
          color: var(--fg);
          background: transparent;
          border: 1.5px solid var(--fg3);
          padding: 5px 22px;
          border-radius: 3px;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, transform 0.15s;
          line-height: 1.5;
        }
        .nb-btn-out:hover { border-color: var(--fg); transform: translateY(-1px); }

        /* ── LINK ARROW ────────────────────── */
        .nb-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-hand);
          font-size: 18px;
          font-weight: 500;
          color: var(--fg2);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nb-link:hover { color: var(--fg); }

        /* ── HERO ANIMATIONS ───────────────── */
        @keyframes nbFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a1 { animation: nbFadeUp 0.7s ease 0.1s both; }
        .a2 { animation: nbFadeUp 0.7s ease 0.25s both; }
        .a3 { animation: nbFadeUp 0.7s ease 0.42s both; }
        .a4 { animation: nbFadeUp 0.7s ease 0.58s both; }
      `}</style>

      {/* Red margin line */}
      <div className="nb-margin" />

      {/* ── NAV ─────────────────────────────── */}
      <nav className="nb-nav">
        <span className="nb-logo">charlz.</span>
        <div className="nb-nav-links">
          {NAV_ITEMS.map(id => (
            <button
              key={id}
              className={`nb-nav-link${activeNav === id ? " active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {id}
            </button>
          ))}
        </div>
        <button
          className="nb-toggle"
          onClick={() => setDark(d => !d)}
          aria-label="Toggle theme"
        >
          {dark ? "☀︎" : "☽"}
        </button>
      </nav>

      {/* ── HERO ────────────────────────────── */}
      <section
        id="about"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: `120px ${PAD} 96px ${PAD_L}`,
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <div className="a1" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--font-hand)", fontSize: 17, color: "var(--fg3)" }}>
              pg. 01 — intro
            </span>
            <span style={{ height: 1, width: 40, background: "var(--border)", display: "block" }} />
            <span style={{ fontFamily: "var(--font-hand)", fontSize: 17, color: "var(--fg3)" }}>
              Abuja, Nigeria
            </span>
          </div>

          <h1 className="a2" style={{
            fontFamily: "var(--font-head)",
            fontWeight: 700,
            fontSize: "clamp(52px, 8.5vw, 112px)",
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            color: "var(--fg)",
            marginBottom: 24,
          }}>
            Charles<br/>
            <em style={{ color: "var(--fg3)", fontStyle: "italic" }}>Obuzor.</em>
          </h1>

          <p className="a3" style={{
            fontFamily: "var(--font-hand)",
            fontSize: "clamp(18px, 2.2vw, 24px)",
            lineHeight: 1.65,
            color: "var(--fg2)",
            maxWidth: "48ch",
            marginBottom: 40,
          }}>
            Frontend developer focused on building beautiful interfaces for the web.
            Clean design, fast performance, practical features.{" "}
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>React · Next.js · React Native · TypeScript.</span>
          </p>

          <div className="a4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="nb-btn" onClick={() => scrollTo("projects")}>
              View Projects →
            </button>
            <a href="https://github.com/charlzx" target="_blank" rel="noreferrer" className="nb-btn-out">
              GitHub
            </a>
            <a href="mailto:hello@charlz.dev" className="nb-btn-out">
              hello@charlz.dev
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute",
          right: PAD,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}>
          <span style={{ fontFamily: "var(--font-hand)", fontSize: 15, color: "var(--fg3)", writingMode: "vertical-rl" }}>scroll</span>
          <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, var(--fg3), transparent)` }} />
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────── */}
      <section id="projects" className="nb-section">
        <Reveal>
          <p className="nb-label">— 02 / projects</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="nb-h2">Things I&apos;ve built.</h2>
        </Reveal>

        <div className="nb-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div
                className="nb-card"
                onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
                style={{ userSelect: "none" }}
              >
                {/* Accent color strip */}
                <div className="nb-card-strip" style={{ background: p.accent + "66" }} />

                {/* Card header */}
                <div style={{ padding: "18px 20px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ color: p.accent }}>{p.icon}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--fg3)" }}>{p.year}</span>
                      <span
                        className="nb-badge"
                        style={{
                          background: p.status === "live" ? "rgba(74,222,128,0.14)" : "rgba(148,163,184,0.14)",
                          color: p.status === "live" ? "#4ade80" : "#94a3b8",
                        }}
                      >
                        {p.status === "live" ? "live ✓" : p.status}
                      </span>
                    </div>
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-head)",
                    fontWeight: 600,
                    fontSize: 20,
                    letterSpacing: "-0.01em",
                    color: "var(--fg)",
                    marginBottom: 6,
                    lineHeight: 1.2,
                  }}>
                    {p.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-hand)", fontSize: 17, color: "var(--fg2)", lineHeight: 1.4 }}>
                    {p.tagline}
                  </p>
                </div>

                {/* Divider */}
                {expandedProject === p.id && (
                  <div style={{ height: 1, background: "var(--border)", margin: "0 20px" }} />
                )}

                {/* Expandable body */}
                <div
                  className="nb-expand"
                  style={{
                    maxHeight: expandedProject === p.id ? 340 : 0,
                    opacity: expandedProject === p.id ? 1 : 0,
                    padding: expandedProject === p.id ? "16px 20px 20px" : "0 20px",
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-hand)",
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: "var(--fg2)",
                    marginBottom: 14,
                  }}>
                    {p.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                    {p.stack.map(s => <span key={s} className="nb-chip">{s}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" className="nb-link" onClick={e => e.stopPropagation()}>
                        live site ↗
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="nb-link" onClick={e => e.stopPropagation()}>
                        github ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Chevron */}
                <div style={{ padding: "8px 20px", display: "flex", justifyContent: "flex-end" }}>
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

      {/* ── EXPERIENCE ──────────────────────── */}
      <section
        id="experience"
        className="nb-section"
        style={{ backgroundColor: "var(--bg2)" }}
      >
        <Reveal>
          <p className="nb-label">— 03 / experience</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="nb-h2">Where I&apos;ve worked.</h2>
        </Reveal>

        <div style={{ maxWidth: 740 }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="nb-exp-row">
                <div>
                  <p style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--fg3)", marginBottom: 4, lineHeight: 1.3 }}>
                    {e.period}
                  </p>
                  <p style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--fg2)", fontWeight: 600 }}>
                    {e.org}
                  </p>
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-head)",
                    fontWeight: 600,
                    fontSize: 18,
                    letterSpacing: "-0.01em",
                    color: "var(--fg)",
                    marginBottom: 8,
                    lineHeight: 1.3,
                  }}>
                    {e.role}
                  </h3>
                  <p style={{ fontFamily: "var(--font-hand)", fontSize: 17, lineHeight: 1.65, color: "var(--fg2)" }}>
                    {e.notes}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Skills */}
        <Reveal delay={0.12}>
          <div style={{ marginTop: 64 }}>
            <p className="nb-label" style={{ marginBottom: 20 }}>— skills &amp; tools</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {SKILLS.map(group => (
                <div key={group.category}>
                  <p style={{
                    fontFamily: "var(--font-hand)",
                    fontSize: 14,
                    color: "var(--fg3)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}>
                    {group.category}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.map(item => (
                      <span key={item} className="nb-tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ─────────────────────────── */}
      <section id="contact" className="nb-section" style={{ paddingBottom: 128 }}>
        <Reveal>
          <p className="nb-label">— 04 / contact</p>
        </Reveal>
        <div style={{ maxWidth: 580 }}>
          <Reveal delay={0.05}>
            <h2 style={{
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 68px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "var(--fg)",
              marginBottom: 20,
            }}>
              Let&apos;s build<br/>
              <em style={{ color: "var(--fg3)", fontStyle: "italic" }}>something.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{
              fontFamily: "var(--font-hand)",
              fontSize: "clamp(17px, 2vw, 21px)",
              lineHeight: 1.7,
              color: "var(--fg2)",
              marginBottom: 40,
            }}>
              Open to freelance work, collaborations, and full-time engineering roles.
              Remote-first.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="mailto:hello@charlz.dev" className="nb-btn">
                hello@charlz.dev
              </a>
              <a href="https://linkedin.com/in/charlzObuzor" target="_blank" rel="noreferrer" className="nb-btn-out">
                LinkedIn ↗
              </a>
              <a href="https://twitter.com/charlzObuzor" target="_blank" rel="noreferrer" className="nb-btn-out">
                X / Twitter ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────── */}
      <footer style={{
        padding: `20px ${PAD} 20px ${PAD_L}`,
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <span style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--fg3)" }}>
          © 2025 Charles Obuzor — charlz.dev
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "github", href: "https://github.com/charlzx" },
            { label: "linkedin", href: "https://linkedin.com/in/charlzObuzor" },
            { label: "twitter", href: "https://twitter.com/charlzObuzor" },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: 17,
                color: "var(--fg3)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
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
