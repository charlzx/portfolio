"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SKILLS = [
  { category: "Frontend", items: ["React", "React Native", "Next.js", "TypeScript", "JavaScript", "Expo", "Tailwind CSS", "Framer Motion"] },
  { category: "Tools & Platform", items: ["Git / GitHub", "Vite", "Vercel", "Convex"] },
];

const SCROLL_ITEMS = ["about", "skills", "contact"];

const NAV_LINKS = [
  { label: "about",    href: null },
  { label: "projects", href: "/projects" },
  { label: "skills",   href: null },
  { label: "contact",  href: null },
];

function useInView(threshold = 0.1) {
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
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [activeNav, setActiveNav] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = dark ? {
    "--bg":       "#17150e",
    "--bg2":      "#1c1a12",
    "--surface":  "#211f17",
    "--rule":     "rgba(255,255,255,0.045)",
    "--margin":   "rgba(210,70,70,0.32)",
    "--fg":       "#e8dcc8",
    "--fg2":      "#a89878",
    "--fg3":      "#6a5a48",
    "--border":   "rgba(232,220,200,0.12)",
    "--shadow":   "rgba(0,0,0,0.4)",
  } : {
    "--bg":       "#fdfaf3",
    "--bg2":      "#f8f4e8",
    "--surface":  "#fef9ec",
    "--rule":     "rgba(100,149,237,0.17)",
    "--margin":   "rgba(210,50,50,0.4)",
    "--fg":       "#1a1208",
    "--fg2":      "#3d2e1a",
    "--fg3":      "#9a8870",
    "--border":   "rgba(26,18,8,0.13)",
    "--shadow":   "rgba(26,18,8,0.1)",
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const sections = SCROLL_ITEMS.map(id => document.getElementById(id));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i]!.offsetTop <= scrollY) {
          setActiveNav(SCROLL_ITEMS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const RULED = `repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, var(--rule) 31px, var(--rule) 32px)`;
  const H_PAD = "clamp(20px, 4vw, 72px)";
  const H_PAD_L = "clamp(20px, 5vw, 80px)";

  return (
    <div className="nb-root" style={{ ...(theme as React.CSSProperties) }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --font-hand: 'Caveat', cursive; --font-head: 'Raleway', sans-serif; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: rgba(100,149,237,0.25); }

        /* ── NOTEBOOK ROOT ── */
        .nb-root {
          background-color: var(--bg);
          background-image: ${RULED};
          background-size: 100% 32px;
          color: var(--fg);
          font-family: var(--font-hand);
          min-height: 100vh;
          transition: background-color 0.35s, color 0.3s;
          position: relative;
        }

        /* ── RED MARGIN LINE ── */
        .nb-margin {
          position: fixed;
          top: 0; bottom: 0; left: 36px;
          width: 1.5px;
          background: var(--margin);
          z-index: 5;
          pointer-events: none;
          transition: background 0.35s;
        }
        @media (max-width: 700px) { .nb-margin { display: none; } }

        /* ── NAV ── */
        .nb-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(20px, 4vw, 72px) 0 clamp(20px, 5vw, 80px);
          border-bottom: 1px solid var(--border);
          background-color: var(--bg);
          background-image: ${RULED};
          background-size: 100% 32px;
          transition: background-color 0.35s;
        }
        .nb-logo {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.02em;
          color: var(--fg);
          cursor: pointer;
        }
        .nb-nav-links {
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .nb-nav-link {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          font-weight: 600;
          color: var(--fg3);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
          line-height: 1;
          text-decoration: none;
        }
        .nb-nav-link:hover { color: var(--fg2); }
        .nb-nav-link.active {
          color: var(--fg);
          text-decoration: underline;
          text-decoration-style: wavy;
          text-underline-offset: 4px;
          text-decoration-color: var(--margin);
        }

        /* ── HAMBURGER ── */
        .nb-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--fg);
          padding: 4px;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          justify-content: center;
        }
        .nb-hamburger-line {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--fg);
          transition: opacity 0.2s, transform 0.2s;
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .nb-nav-links { display: none; }
          .nb-hamburger { display: flex; }
        }

        /* ── TOGGLE ── */
        .nb-toggle {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          background: none;
          border: 1.5px solid var(--border);
          border-radius: 4px;
          color: var(--fg3);
          cursor: pointer;
          padding: 2px 10px;
          transition: color 0.2s, border-color 0.2s;
          line-height: 1.5;
          flex-shrink: 0;
        }
        .nb-toggle:hover { color: var(--fg); border-color: var(--fg3); }

        /* ── MOBILE MENU OVERLAY ── */
        .nb-mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 55;
          background-color: var(--bg);
          background-image: ${RULED};
          background-size: 100% 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 80px 10vw;
          gap: 12px;
          transition: opacity 0.25s, transform 0.25s;
        }
        .nb-mobile-menu.open { opacity: 1; transform: translateY(0); pointer-events: all; }
        .nb-mobile-menu.closed { opacity: 0; transform: translateY(-12px); pointer-events: none; }
        .nb-mobile-menu-link {
          font-family: var(--font-hand);
          font-size: clamp(48px, 10vw, 56px);
          font-weight: 700;
          color: var(--fg3);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          line-height: 1.1;
          transition: color 0.15s;
          text-align: left;
          text-decoration: none;
        }
        .nb-mobile-menu-link:hover { color: var(--fg); }
        .nb-mobile-menu-link.active {
          color: var(--fg);
          text-decoration: underline;
          text-decoration-style: wavy;
          text-decoration-color: var(--margin);
          text-underline-offset: 5px;
        }
        .nb-mobile-menu-close {
          position: absolute;
          top: 18px;
          right: clamp(20px, 4vw, 72px);
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.5vw, 28px);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--fg3);
          padding: 4px;
        }

        /* ── SECTIONS ── */
        .nb-section {
          padding: 100px clamp(20px, 4vw, 72px) 100px clamp(20px, 5vw, 80px);
          border-top: 1px solid var(--border);
        }
        .nb-section-alt {
          background-color: var(--bg2);
          background-image: ${RULED};
          background-size: 100% 32px;
        }

        /* ── SECTION LABEL ── */
        .nb-label {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          color: var(--fg3);
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }

        /* ── SECTION HEADING ── */
        .nb-h2 {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: clamp(32px, 4.5vw, 58px);
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: var(--fg);
          margin-bottom: 60px;
        }


        /* ── SKILLS LIST ── */
        .nb-skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px 48px;
          max-width: 680px;
        }
        @media (max-width: 540px) { .nb-skills-grid { grid-template-columns: 1fr; } }

        .nb-skills-cat {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          color: var(--fg3);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-bottom: 1.5px solid var(--border);
          padding-bottom: 6px;
          margin-bottom: 14px;
        }

        .nb-skill-item {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 26px);
          color: var(--fg2);
          padding: 3px 0;
          line-height: 1.4;
          display: flex;
          gap: 10px;
          align-items: baseline;
        }
        .nb-skill-item::before { content: "—"; color: var(--fg3); flex-shrink: 0; }

        /* ── BUTTONS ── */
        .nb-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          font-weight: 600;
          color: var(--bg);
          background: var(--fg);
          border: none;
          padding: 8px 26px;
          border-radius: 3px;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.15s;
          line-height: 1.4;
        }
        .nb-btn:hover { opacity: 0.85; transform: translateY(-1px); }

        .nb-btn-out {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          font-weight: 600;
          color: var(--fg);
          background: transparent;
          border: 1.5px solid var(--fg3);
          padding: 7px 26px;
          border-radius: 3px;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
          line-height: 1.4;
        }
        .nb-btn-out:hover { border-color: var(--fg); transform: translateY(-1px); }

        /* ── HERO LAYOUT ── */
        .nb-hero {
          min-height: 100svh;
          display: grid;
          grid-template-columns: 58fr 42fr;
          gap: 40px;
          align-items: center;
          padding: 100px clamp(20px, 4vw, 72px) 80px clamp(20px, 5vw, 80px);
        }
        @media (max-width: 860px) {
          .nb-hero {
            grid-template-columns: 1fr;
            padding-top: 90px;
            padding-bottom: 60px;
          }
        }

        /* ── MARGIN NOTE (hero right panel) ── */
        .nb-margin-note {
          position: relative;
          background-color: #fde84b;
          background-image: none;
          border: none;
          border-radius: 2px;
          padding: 36px 32px 32px;
          box-shadow:
            0 1px 2px rgba(0,0,0,0.07),
            0 4px 10px rgba(0,0,0,0.10),
            0 12px 28px rgba(0,0,0,0.12),
            2px 16px 32px rgba(180,140,0,0.10);
          max-width: 380px;
          width: 100%;
          justify-self: center;
          transform: rotate(-4.5deg);
          transform-origin: top center;
        }
        /* Tape strip across the top */
        .nb-margin-note::before {
          content: '';
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%) rotate(1.5deg);
          width: 56px;
          height: 26px;
          background: rgba(255,255,240,0.62);
          border: 1px solid rgba(220,210,150,0.55);
          border-radius: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.10);
        }
        @media (max-width: 860px) { .nb-margin-note { max-width: 100%; justify-self: start; } }

        /* ── HERO ANIMATIONS ── */
        @keyframes nbFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a1 { animation: nbFadeUp 0.7s ease 0.08s both; }
        .a2 { animation: nbFadeUp 0.7s ease 0.22s both; }
        .a3 { animation: nbFadeUp 0.7s ease 0.38s both; }
        .a4 { animation: nbFadeUp 0.7s ease 0.52s both; }
        .a5 { animation: nbFadeUp 0.7s ease 0.64s both; }

        /* ── FOOTER ── */
        .nb-footer {
          padding: 20px clamp(20px, 4vw, 72px) 20px clamp(20px, 5vw, 80px);
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .nb-footer-link {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          color: var(--fg3);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nb-footer-link:hover { color: var(--fg); }

      `}</style>

      {/* Red margin line */}
      <div className="nb-margin" />

      {/* Mobile menu overlay */}
      <div className={`nb-mobile-menu ${menuOpen ? "open" : "closed"}`}>
        <button className="nb-mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          ✕
        </button>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", color: "var(--fg3)" }}>charlz.</span>
        </div>
        {NAV_LINKS.map(({ label, href }) =>
          href ? (
            <Link
              key={label}
              href={href}
              className="nb-mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ) : (
            <button
              key={label}
              className={`nb-mobile-menu-link${activeNav === label ? " active" : ""}`}
              onClick={() => scrollTo(label)}
            >
              {label}
            </button>
          )
        )}
      </div>

      {/* ── NAV ── */}
      <nav className="nb-nav">
        <span className="nb-logo" onClick={() => scrollTo("about")}>charlz.</span>
        <div className="nb-nav-links">
          {NAV_LINKS.map(({ label, href }) =>
            href ? (
              <Link key={label} href={href} className="nb-nav-link">
                {label}
              </Link>
            ) : (
              <button
                key={label}
                className={`nb-nav-link${activeNav === label ? " active" : ""}`}
                onClick={() => scrollTo(label)}
              >
                {label}
              </button>
            )
          )}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            className="nb-toggle"
            onClick={() => setDark(d => !d)}
            aria-label="Toggle theme"
          >
            {dark ? "☀︎" : "☽"}
          </button>
          <button
            className="nb-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Open menu"
          >
            {menuOpen ? (
              <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.4vw, 26px)", color: "var(--fg)", lineHeight: 1 }}>✕</span>
            ) : (
              <>
                <span className="nb-hamburger-line" />
                <span className="nb-hamburger-line" />
                <span className="nb-hamburger-line" />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" className="nb-hero">
        {/* Left: name + tagline + CTA */}
        <div>
          <div className="a1" style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", color: "var(--fg3)" }}>
              pg. 01 — intro
            </span>
          </div>

          <h1 className="a2" style={{
            fontFamily: "var(--font-head)",
            fontWeight: 700,
            fontSize: "clamp(56px, 9vw, 120px)",
            letterSpacing: "-0.038em",
            lineHeight: 1.0,
            color: "var(--fg)",
            marginBottom: 28,
          }}>
            Charles<br />
            <span style={{ color: "var(--fg3)" }}>Obuzor.</span>
          </h1>

          <p className="a3" style={{
            fontFamily: "var(--font-hand)",
            fontSize: "clamp(22px, 2.4vw, 26px)",
            lineHeight: 1.65,
            color: "var(--fg2)",
            maxWidth: "42ch",
            marginBottom: 40,
          }}>
            Frontend developer building beautiful interfaces
            for the web.{" "}
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              React · Next.js · React Native · TypeScript.
            </span>
          </p>

          <div className="a4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/projects" className="nb-btn">
              View Projects →
            </Link>
            <a href="https://github.com/charlzx" target="_blank" rel="noreferrer" className="nb-btn-out">
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Right: margin note sticky panel */}
        <div className="a5">
          <div className="nb-margin-note">
            <p style={{
              fontFamily: "var(--font-hand)",
              fontSize: "clamp(22px, 2.2vw, 24px)",
              color: "#7a6600",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: 20,
              borderBottom: "1px solid rgba(0,0,0,0.12)",
              paddingBottom: 12,
            }}>
              — about me
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <p style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", color: "#7a6600" }}>Status</p>
                <p style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.5vw, 26px)", color: "#1a1400", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block", flexShrink: 0 }} />
                  Available for work
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", color: "#7a6600", marginBottom: 8 }}>Find me</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    { label: "github.com/charlzx", href: "https://github.com/charlzx" },
                    { label: "charlesobuzor@outlook.com", href: "mailto:charlesobuzor@outlook.com" },
                    { label: "linkedin ↗", href: "https://linkedin.com/in/charlzObuzor" },
                  ].map(l => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" style={{
                      fontFamily: "var(--font-hand)",
                      fontSize: "clamp(20px, 1.9vw, 22px)",
                      color: "#3a3000",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      textDecorationColor: "rgba(0,0,0,0.25)",
                      transition: "color 0.2s, text-decoration-color 0.2s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#000")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#3a3000")}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="nb-section nb-section-alt">
        <Reveal>
          <p className="nb-label">— 02 / skills</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="nb-h2">What I work with.</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="nb-skills-grid">
            {SKILLS.map(group => (
              <div key={group.category}>
                <p className="nb-skills-cat">{group.category}</p>
                {group.items.map(item => (
                  <p key={item} className="nb-skill-item">{item}</p>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="nb-section" style={{ paddingBottom: 120 }}>
        <Reveal>
          <p className="nb-label">— 03 / contact</p>
        </Reveal>

        <div style={{ maxWidth: 640 }}>
          <Reveal delay={0.05}>
            <h2 style={{
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              fontSize: "clamp(40px, 6vw, 80px)",
              letterSpacing: "-0.038em",
              lineHeight: 1.02,
              color: "var(--fg)",
              marginBottom: 24,
            }}>
              Let&apos;s build<br />
              <em style={{ color: "var(--fg3)", fontStyle: "italic" }}>something.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{
              fontFamily: "var(--font-hand)",
              fontSize: "clamp(22px, 2.4vw, 26px)",
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
              <a href="mailto:charlesobuzor@outlook.com" className="nb-btn">
                charlesobuzor@outlook.com
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

      {/* ── FOOTER ── */}
      <footer className="nb-footer">
        <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", color: "var(--fg3)" }}>
          © {new Date().getFullYear()} Charles Obuzor
        </span>
      </footer>
    </div>
  );
}
