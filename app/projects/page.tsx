"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

const CARD_ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => setVisible(true);
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) show(); },
      { threshold: 0, rootMargin: "0px 0px 60px 0px" }
    );
    observer.observe(el);
    const fallback = setTimeout(show, 1000);
    return () => { observer.disconnect(); clearTimeout(fallback); };
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

export default function ProjectsPage() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("nb-theme");
    if (saved === "light") setDark(false);
    else if (saved !== "dark") setDark(true);
  }, []);
  useEffect(() => {
    localStorage.setItem("nb-theme", dark ? "dark" : "light");
  }, [dark]);
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = dark ? {
    "--bg":     "#111111",
    "--bg2":    "#1a1a1a",
    "--rule":   "rgba(255,255,255,0.045)",
    "--margin": "rgba(210,70,70,0.32)",
    "--fg":     "#e8dcc8",
    "--fg2":    "#a89878",
    "--fg3":    "#6a5a48",
    "--border": "rgba(232,220,200,0.12)",
  } : {
    "--bg":     "#f4f4f0",
    "--bg2":    "#ebebE7",
    "--rule":   "rgba(100,149,237,0.17)",
    "--margin": "rgba(210,50,50,0.4)",
    "--fg":     "#1a1208",
    "--fg2":    "#3d2e1a",
    "--fg3":    "#9a8870",
    "--border": "rgba(26,18,8,0.13)",
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const RULED = `repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, var(--rule) 31px, var(--rule) 32px)`;

  const NAV_LINKS = [
    { label: "about", href: "/#about" },
    { label: "projects", href: "/projects" },
    { label: "skills", href: "/#skills" },
    { label: "contact", href: "/#contact" },
  ];

  return (
    <div className="nbp-root" style={{ ...(theme as React.CSSProperties) }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --font-hand: 'Caveat', cursive; --font-head: 'Raleway', sans-serif; }
        body { overflow-x: hidden; }
        ::selection { background: rgba(100,149,237,0.25); }

        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nbp-root {
          background-color: var(--bg);
          background-image: ${RULED};
          animation: pageFadeIn 0.35s ease both;
          background-size: 100% 32px;
          color: var(--fg);
          font-family: var(--font-hand);
          min-height: 100vh;
          transition: background-color 0.35s, color 0.3s;
          position: relative;
        }

        /* ── RED MARGIN LINE ── */
        .nbp-margin {
          position: fixed;
          top: 0; bottom: 0; left: 36px;
          width: 1.5px;
          background: var(--margin);
          z-index: 5;
          pointer-events: none;
          transition: background 0.35s;
        }
        @media (max-width: 700px) { .nbp-margin { display: none; } }

        /* ── NAV ── */
        .nbp-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(20px, 4vw, 72px) 0 clamp(20px, 5vw, 80px);
          background-color: var(--bg);
          background-image: ${RULED};
          background-size: 100% 32px;
          transition: background-color 0.35s;
        }
        .nbp-nav::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: 36px;
          width: 1.5px;
          background: var(--margin);
          pointer-events: none;
          transition: background 0.35s;
        }
        @media (max-width: 700px) { .nbp-nav::after { display: none; } }
        .nbp-logo {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.02em;
          color: var(--fg);
          text-decoration: none;
        }
        .nbp-nav-links {
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .nbp-nav-link {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          font-weight: 600;
          color: var(--fg3);
          text-decoration: none;
          transition: color 0.2s;
          line-height: 1;
        }
        .nbp-nav-link:hover { color: var(--fg2); }
        .nbp-nav-link.active {
          color: var(--fg);
          text-decoration: underline;
          text-decoration-style: wavy;
          text-underline-offset: 4px;
          text-decoration-color: var(--margin);
        }

        /* ── HAMBURGER ── */
        .nbp-hamburger {
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
        .nbp-hamburger-line {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--fg);
          border-radius: 2px;
          transform-origin: center;
          transition: transform 0.3s ease, opacity 0.25s ease;
        }
        .nbp-hamburger.open .nbp-hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nbp-hamburger.open .nbp-hamburger-line:nth-child(2) { opacity: 0; transform: scaleX(0.3); }
        .nbp-hamburger.open .nbp-hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        @media (max-width: 768px) {
          .nbp-nav-links { display: none; }
          .nbp-hamburger { display: flex; }
        }

        /* ── TOGGLE ── */
        .nbp-toggle {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          background: none;
          border: none;
          border-radius: 4px;
          color: var(--fg3);
          cursor: pointer;
          padding: 2px 10px;
          transition: color 0.2s;
          line-height: 1.5;
          flex-shrink: 0;
        }
        .nbp-toggle:hover { color: var(--fg); }

        /* ── MOBILE MENU ── */
        .nbp-mobile-menu {
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
        .nbp-mobile-menu.open  { opacity: 1; transform: translateY(0); pointer-events: all; }
        .nbp-mobile-menu.closed { opacity: 0; transform: translateY(-12px); pointer-events: none; }
        .nbp-mobile-menu-link {
          font-family: var(--font-hand);
          font-size: clamp(48px, 10vw, 56px);
          font-weight: 700;
          color: var(--fg3);
          text-decoration: none;
          padding: 4px 0;
          line-height: 1.1;
          transition: color 0.15s;
        }
        .nbp-mobile-menu-link:hover { color: var(--fg); }
        .nbp-mobile-menu-link.active {
          color: var(--fg);
          text-decoration: underline;
          text-decoration-style: wavy;
          text-decoration-color: var(--margin);
          text-underline-offset: 5px;
        }
        .nbp-mobile-menu-close {
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

        /* ── MAIN CONTENT ── */
        .nbp-main {
          padding: 100px clamp(20px, 4vw, 72px) 120px clamp(20px, 5vw, 80px);
          border-top: 1px solid var(--border);
        }

        .nbp-label {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          color: var(--fg3);
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }

        .nbp-h1 {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: clamp(32px, 4.5vw, 58px);
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: var(--fg);
          margin-bottom: 60px;
        }

        /* ── PHOTO BOARD ── */
        .nbp-photo-board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 56px 36px;
        }
        @media (max-width: 960px) {
          .nbp-photo-board { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .nbp-photo-board { grid-template-columns: 1fr; gap: 48px 0; }
        }

        .nbp-photo-card {
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 0.28s ease;
          z-index: 1;
        }
        .nbp-photo-card:hover {
          transform: scale(1.05) translateY(-6px) rotate(0deg) !important;
          z-index: 4;
        }
        @media (max-width: 540px) {
          .nbp-photo-card { transform: none !important; }
        }

        .nbp-photo-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: visible;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.10),
            0 6px 18px rgba(0,0,0,0.14),
            0 16px 36px rgba(0,0,0,0.10);
          border-radius: 2px;
          transition: box-shadow 0.28s ease;
        }
        .nbp-photo-card:hover .nbp-photo-img-wrap {
          box-shadow:
            0 4px 8px rgba(0,0,0,0.14),
            0 12px 32px rgba(0,0,0,0.18),
            0 28px 56px rgba(0,0,0,0.14);
        }
        .nbp-photo-img-wrap::before {
          content: '';
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%) rotate(1deg);
          width: 58px;
          height: 26px;
          background: rgba(255,255,240,0.68);
          border: 1px solid rgba(220,210,150,0.6);
          border-radius: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
          z-index: 3;
          pointer-events: none;
        }

        .nbp-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 2px;
          position: relative;
          z-index: 1;
        }

        .nbp-photo-info {
          padding: 18px 4px 0;
        }

        .nbp-photo-name {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: clamp(18px, 1.8vw, 22px);
          letter-spacing: -0.02em;
          color: var(--fg);
          line-height: 1.15;
          margin-bottom: 5px;
        }

        .nbp-photo-tagline {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2vw, 24px);
          color: var(--fg2);
          line-height: 1.4;
          margin-bottom: 10px;
        }

        .nbp-photo-tech {
          font-family: var(--font-hand);
          font-size: clamp(18px, 1.6vw, 20px);
          color: var(--fg3);
          line-height: 1.2;
        }

        .nbp-photo-links {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .nbp-photo-card:hover .nbp-photo-links { opacity: 1; transform: translateY(0); }
        @media (max-width: 540px) {
          .nbp-photo-links { opacity: 1; transform: none; }
        }

        .nbp-photo-link {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2vw, 24px);
          font-weight: 600;
          color: var(--fg2);
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: var(--border);
          transition: color 0.15s, text-decoration-color 0.15s;
        }
        .nbp-photo-link:hover { color: var(--fg); text-decoration-color: var(--fg3); }

        /* ── FOOTER ── */
        .nbp-footer {
          padding: 20px clamp(20px, 4vw, 72px) 20px clamp(20px, 5vw, 80px);
          border-top: 1px solid var(--border);
        }
        .nbp-footer-text {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          color: var(--fg3);
        }
      `}</style>

      <div className="nbp-margin" />

      {/* Mobile menu */}
      <div className={`nbp-mobile-menu ${menuOpen ? "open" : "closed"}`}>
        <button className="nbp-mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", color: "var(--fg3)" }}>charlz.</span>
        </div>
        {NAV_LINKS.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`nbp-mobile-menu-link${l.label === "projects" ? " active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Nav */}
      <nav className="nbp-nav">
        <Link href="/" className="nbp-logo">charlz.</Link>
        <div className="nbp-nav-links">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`nbp-nav-link${l.label === "projects" ? " active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="nbp-toggle" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
            {dark ? "☀︎" : "☽"}
          </button>
          <button className={`nbp-hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Open menu">
            <span className="nbp-hamburger-line" />
            <span className="nbp-hamburger-line" />
            <span className="nbp-hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="nbp-main">
        <Reveal>
          <p className="nbp-label">— projects</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="nbp-h1">Things I&apos;ve built.</h1>
        </Reveal>

        <div className="nbp-photo-board">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div
                className="nbp-photo-card"
                style={{ transform: `rotate(${CARD_ROTATIONS[i]}deg)` }}
              >
                <div className="nbp-photo-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={`${p.name} — ${p.tagline}`} className="nbp-photo-img" loading="lazy" width={800} height={500} />
                </div>
                <div className="nbp-photo-info">
                  <p className="nbp-photo-name">{p.name}</p>
                  <p className="nbp-photo-tagline">{p.tagline}</p>
                  <p className="nbp-photo-tech" style={{ marginBottom: 10 }}>
                    {p.stack.join(", ")}
                  </p>
                  <div className="nbp-photo-links">
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" className="nbp-photo-link">live ↗</a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="nbp-photo-link">github ↗</a>
                    )}
                    <Link href={`/projects/${p.id}`} className="nbp-photo-link">case study →</Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </main>

      <footer className="nbp-footer">
        <span className="nbp-footer-text">© {new Date().getFullYear()} Charles Obuzor</span>
      </footer>
    </div>
  );
}
