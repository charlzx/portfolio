"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const FORMSPREE_URL = "https://formspree.io/f/mandvdpe";

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

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const tapeStyle: React.CSSProperties = {
    position: "absolute",
    width: 64,
    height: 28,
    background: "rgba(255,255,240,0.58)",
    border: "1px solid rgba(220,210,150,0.5)",
    borderRadius: 2,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    zIndex: 10,
  };

  return (
    <div style={{ position: "relative", display: "inline-block", maxWidth: 560, width: "100%" }}>
      <style>{`
        .nb-cf-input {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          color: #1a1400;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid rgba(0,0,0,0.18);
          outline: none;
          padding: 8px 0;
          width: 100%;
          transition: border-color 0.2s;
        }
        .nb-cf-input::placeholder { color: #8a7a30; }
        .nb-cf-input:focus { border-bottom-color: rgba(0,0,0,0.45); }
        .nb-cf-textarea {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          color: #1a1400;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid rgba(0,0,0,0.18);
          outline: none;
          padding: 8px 0;
          width: 100%;
          resize: none;
          min-height: 130px;
          transition: border-color 0.2s;
        }
        .nb-cf-textarea::placeholder { color: #8a7a30; }
        .nb-cf-textarea:focus { border-bottom-color: rgba(0,0,0,0.45); }
        .nb-cf-btn {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2.2vw, 24px);
          font-weight: 700;
          color: #1a1400;
          background: rgba(0,0,0,0.08);
          border: 1.5px solid rgba(0,0,0,0.2);
          border-radius: 4px;
          padding: 8px 24px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .nb-cf-btn:hover { background: rgba(0,0,0,0.14); border-color: rgba(0,0,0,0.35); }
        .nb-cf-btn:disabled { opacity: 0.55; cursor: not-allowed; }
      `}</style>

      {/* Tape — top left */}
      <div style={{ ...tapeStyle, top: -14, left: 24, transform: "rotate(-42deg)" }} />
      {/* Tape — bottom right */}
      <div style={{ ...tapeStyle, bottom: -14, right: 24, transform: "rotate(-42deg)" }} />

      {/* Sticky note card */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fde84b",
          borderRadius: 2,
          padding: "40px 36px 36px",
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.07), 0 4px 10px rgba(0,0,0,0.10), 0 12px 28px rgba(0,0,0,0.12), 2px 16px 32px rgba(180,140,0,0.10)",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          transform: "rotate(-1.2deg)",
          transformOrigin: "center center",
        }}
      >
        <input
          className="nb-cf-input"
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={status === "sending"}
        />
        <input
          className="nb-cf-input"
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={status === "sending"}
        />
        <textarea
          className="nb-cf-textarea"
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
          disabled={status === "sending"}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <button type="submit" className="nb-cf-btn" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message →"}
          </button>
          {status === "success" && (
            <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", color: "#166534" }}>
              Message sent!
            </span>
          )}
          {status === "error" && (
            <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", color: "#991b1b" }}>
              Something went wrong. Try again.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [activeNav, setActiveNav] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = dark ? {
    "--bg":       "#111111",
    "--bg2":      "#1a1a1a",
    "--surface":  "#222222",
    "--rule":     "rgba(255,255,255,0.045)",
    "--margin":   "rgba(210,70,70,0.32)",
    "--fg":       "#e8dcc8",
    "--fg2":      "#a89878",
    "--fg3":      "#6a5a48",
    "--border":   "rgba(232,220,200,0.12)",
    "--shadow":   "rgba(0,0,0,0.4)",
  } : {
    "--bg":       "#f4f4f0",
    "--bg2":      "#ebebE7",
    "--surface":  "#f7f7f3",
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
          border: none;
          border-radius: 4px;
          color: var(--fg3);
          cursor: pointer;
          padding: 2px 10px;
          transition: color 0.2s;
          line-height: 1.5;
          flex-shrink: 0;
        }
        .nb-toggle:hover { color: var(--fg); }

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


        /* ── SKILLS PILLS ── */
        .nb-skills-groups {
          display: flex;
          flex-direction: column;
          gap: 40px;
          max-width: 720px;
        }

        .nb-skills-cat {
          font-family: var(--font-hand);
          font-size: clamp(18px, 1.8vw, 21px);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--fg3);
          margin-bottom: 16px;
        }

        .nb-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 12px;
        }

        .nb-pill {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2vw, 25px);
          color: var(--fg2);
          padding: 6px 18px;
          border-radius: 999px;
          border: 1.8px solid var(--border);
          background: transparent;
          line-height: 1.3;
          transition: border-color 0.2s, color 0.2s;
          cursor: default;
          position: relative;
        }
        .nb-pill:hover {
          border-color: var(--fg3);
          color: var(--fg);
        }

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
            maxWidth: "52ch",
            marginBottom: 40,
          }}>
            I build frontend the way I play chess; deliberate, clean, always thinking ahead.
            <br />
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
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <p style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", color: "#7a6600", marginBottom: 4 }}>Status</p>
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
                      transition: "color 0.2s",
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

      {/* ── ABOUT ── */}
      <section className="nb-section">
        <Reveal>
          <p className="nb-label">— 01 / about</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="nb-h2">A bit about me.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ maxWidth: 680 }}>
            <p style={{
              fontFamily: "var(--font-hand)",
              fontSize: "clamp(22px, 2.4vw, 26px)",
              lineHeight: 1.75,
              color: "var(--fg2)",
              marginBottom: 24,
            }}>
              I&apos;m Charlz, a frontend developer focused on building beautiful interfaces for the web. I focus on clean design, fast performance, and practical features. I enjoy breaking down problems and building tools that just work.
            </p>
            <p style={{
              fontFamily: "var(--font-hand)",
              fontSize: "clamp(22px, 2.4vw, 26px)",
              lineHeight: 1.75,
              color: "var(--fg2)",
            }}>
              When I&apos;m not debugging code or exploring new technologies, I read books, scroll online, test UI layouts, listen to{" "}
              <a href="https://open.spotify.com/user/s76ocb47g23yzpwrf939hyvvw" target="_blank" rel="noreferrer" style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: "3px" }}>music</a>
              {" "}or play{" "}
              <a href="https://www.chess.com/member/charlz-x" target="_blank" rel="noreferrer" style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: "3px" }}>chess</a>
              . I treat frontend development as a craft — something I do to stay sharp and think clearly.
            </p>
          </div>
        </Reveal>
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
          <div className="nb-skills-groups">
            {SKILLS.map((group, gi) => (
              <div key={group.category}>
                <p className="nb-skills-cat">{group.category}</p>
                <div className="nb-pills-row">
                  {group.items.map((item, ii) => (
                    <span
                      key={item}
                      className="nb-pill"
                      style={{ animationDelay: `${(gi * group.items.length + ii) * 0.04}s` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
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

        <Reveal delay={0.05}>
          <h2 style={{
            fontFamily: "var(--font-head)",
            fontWeight: 700,
            fontSize: "clamp(40px, 6vw, 80px)",
            letterSpacing: "-0.038em",
            lineHeight: 1.02,
            color: "var(--fg)",
            marginBottom: 16,
            whiteSpace: "nowrap",
          }}>
            Let&apos;s build <span style={{ color: "var(--fg3)" }}>something.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p style={{
            fontFamily: "var(--font-hand)",
            fontSize: "clamp(22px, 2.4vw, 26px)",
            lineHeight: 1.7,
            color: "var(--fg2)",
            marginBottom: 48,
            maxWidth: 560,
          }}>
            If you want to collaborate or talk shop, you can contact me.
            <br /><br />
            I&apos;m always interested in hearing about new projects, opportunities, or just connecting with fellow developers.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
            <ContactForm />
            {/* Links post-it */}
            <div style={{ position: "relative", display: "inline-block", maxWidth: 320, width: "100%", flexShrink: 0 }}>
              {/* Tape — top left */}
              <div style={{
                position: "absolute", top: -14, left: 20,
                width: 64, height: 28,
                background: "rgba(255,255,240,0.58)",
                border: "1px solid rgba(220,210,150,0.5)",
                borderRadius: 2, boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                transform: "rotate(-42deg)", zIndex: 10,
              }} />
              {/* Tape — bottom right */}
              <div style={{
                position: "absolute", bottom: -14, right: 20,
                width: 64, height: 28,
                background: "rgba(255,255,240,0.58)",
                border: "1px solid rgba(220,210,150,0.5)",
                borderRadius: 2, boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                transform: "rotate(-42deg)", zIndex: 10,
              }} />
              <div style={{
                background: "#fde84b",
                borderRadius: 2,
                padding: "36px 32px 32px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.07), 0 4px 10px rgba(0,0,0,0.10), 0 12px 28px rgba(0,0,0,0.12)",
                transform: "rotate(1.8deg)",
                transformOrigin: "center center",
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}>
                {[
                  {
                    handle: "@charlzx",
                    desc: "Check out my projects and contributions",
                    href: "https://github.com/charlzx",
                  },
                  {
                    handle: "@charlzObuzor",
                    desc: "Follow me on X",
                    href: "https://x.com/charlzObuzor",
                  },
                  {
                    handle: "charlesobuzor@outlook.com",
                    desc: "Send me an email",
                    href: "mailto:charlesobuzor@outlook.com",
                  },
                ].map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <span style={{
                      fontFamily: "var(--font-hand)",
                      fontSize: "clamp(22px, 2.2vw, 24px)",
                      fontWeight: 700,
                      color: "#1a1400",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      textDecorationColor: "rgba(0,0,0,0.3)",
                    }}>{item.handle}</span>
                    <span style={{
                      fontFamily: "var(--font-hand)",
                      fontSize: "clamp(18px, 1.8vw, 20px)",
                      color: "#7a6600",
                    }}>{item.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
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
