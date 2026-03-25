"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const FORMSPREE_URL = "https://formspree.io/f/mandvdpe";

const SKILLS = [
  { category: "Frontend", items: ["React", "React Native", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Expo", "Tailwind CSS", "Framer Motion"] },
  { category: "Tools & Platform", items: ["Git / GitHub", "Vite", "Vercel", "npm", "VS Code", "Figma", "Convex"] },
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

const TORN_POINTS = Array.from({ length: 81 }, (_, i) => `${i * 18},${i % 2 === 0 ? 3 : 12}`).join(" ");

function TornEdge() {
  return (
    <div aria-hidden="true" style={{ width: "100%", lineHeight: 0, display: "block", pointerEvents: "none", overflow: "hidden" }}>
      <svg viewBox="0 0 1440 15" preserveAspectRatio="none" style={{ width: "100%", height: 15, display: "block" }}>
        <polyline points={TORN_POINTS} stroke="var(--border)" strokeWidth="1.5" fill="none" strokeLinejoin="miter" />
      </svg>
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
    width: 96,
    height: 28,
    background: "rgba(255,255,240,0.58)",
    border: "1px solid rgba(220,210,150,0.5)",
    borderRadius: 2,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    zIndex: 10,
  };

  return (
    <div style={{ position: "relative", display: "inline-block", maxWidth: 400, width: "100%", transformOrigin: "top center", animation: "postItWave 9s ease-in-out infinite" }}>
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
        .nb-cf-textarea { scrollbar-width: none; }
        .nb-cf-textarea::-webkit-scrollbar { display: none; }
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

      {/* Sticky note card */}
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
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
          overflow: "visible",
        }}
      >
        {/* Tape — top center */}
        <div style={{ ...tapeStyle, top: -14, left: "50%", transform: "translateX(-50%) rotate(-3deg)" }} />
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
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

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
      const scrollY = window.scrollY;
      const sections = SCROLL_ITEMS.map(id => document.getElementById(id));
      const scrollYNav = scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i]!.offsetTop <= scrollYNav) {
          setActiveNav(SCROLL_ITEMS[i]);
          break;
        }
      }
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? scrollY / max : 0);
      setShowScrollTop(scrollY > window.innerHeight * 0.8);
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
    <div className="nb-root" style={{ ...(theme as React.CSSProperties) }} suppressHydrationWarning>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --font-hand: 'Caveat', cursive; --font-head: 'Raleway', sans-serif; }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body { overflow-x: hidden; }
        ::selection { background: rgba(100,149,237,0.25); }

        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

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
          animation: pageFadeIn 0.35s ease both;
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
          background-color: var(--bg);
          background-image: ${RULED};
          background-size: 100% 32px;
          transition: background-color 0.35s;
        }
        .nb-nav::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: 36px;
          width: 1.5px;
          background: var(--margin);
          pointer-events: none;
          transition: background 0.35s;
        }
        @media (max-width: 700px) { .nb-nav::after { display: none; } }
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
          border-radius: 2px;
          transform-origin: center;
          transition: transform 0.3s ease, opacity 0.25s ease;
        }
        .nb-hamburger.open .nb-hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nb-hamburger.open .nb-hamburger-line:nth-child(2) { opacity: 0; transform: scaleX(0.3); }
        .nb-hamburger.open .nb-hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
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


        /* ── SKILL NOTES ── */
        .nb-skill-notes {
          display: flex;
          flex-wrap: wrap;
          gap: 56px 48px;
          align-items: flex-start;
          padding-top: 24px;
        }
        .nb-skill-note {
          position: relative;
          background: #fde84b;
          border-radius: 2px;
          padding: 40px 28px 32px;
          min-width: 260px;
          max-width: 340px;
          box-shadow:
            0 1px 2px rgba(0,0,0,0.07),
            0 4px 10px rgba(0,0,0,0.10),
            0 12px 28px rgba(0,0,0,0.13),
            2px 16px 32px rgba(180,140,0,0.10);
          transform-origin: top center;
        }
        .nb-skill-note::before {
          content: '';
          position: absolute;
          top: -12px; left: 50%;
          transform: translateX(-50%) rotate(-1deg);
          width: 48px; height: 22px;
          background: rgba(255,255,240,0.62);
          border: 1px solid rgba(220,210,150,0.55);
          border-radius: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.10);
        }
        .nb-skill-note:nth-child(1) { animation: skillWave1 5s ease-in-out infinite; }
        .nb-skill-note:nth-child(2) { animation: skillWave2 6.2s ease-in-out infinite; }
        .nb-skill-note:nth-child(3) { animation: skillWave3 4.8s ease-in-out infinite; }
        @keyframes skillWave1 {
          0%  { transform: rotate(-3deg); }
          30% { transform: rotate(-0.5deg); }
          70% { transform: rotate(-5.5deg); }
          100%{ transform: rotate(-3deg); }
        }
        @keyframes skillWave2 {
          0%  { transform: rotate(2deg); }
          30% { transform: rotate(4.5deg); }
          70% { transform: rotate(-0.5deg); }
          100%{ transform: rotate(2deg); }
        }
        @keyframes skillWave3 {
          0%  { transform: rotate(-1.5deg); }
          30% { transform: rotate(1deg); }
          70% { transform: rotate(-4deg); }
          100%{ transform: rotate(-1.5deg); }
        }
        .nb-skill-note-cat {
          font-family: var(--font-hand);
          font-size: clamp(14px, 1.3vw, 15px);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
          margin-bottom: 20px;
        }
        .nb-skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 8px;
        }
        .nb-skill-tag {
          font-family: var(--font-hand);
          font-size: clamp(20px, 1.9vw, 23px);
          color: #1a1200;
          background: rgba(0,0,0,0.09);
          border-radius: 3px;
          padding: 3px 12px;
          line-height: 1.4;
        }
        @media (max-width: 680px) {
          .nb-skill-notes { flex-direction: column; align-items: flex-start; gap: 48px; }
          .nb-skill-note { max-width: 100%; width: 90%; }
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
            min-height: auto;
            padding-top: 90px;
            padding-bottom: 48px;
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
          transform-origin: top center;
          animation: postItWave 5s ease-in-out infinite;
        }
        @keyframes postItWave {
          0%   { transform: rotate(-4.5deg); }
          25%  { transform: rotate(0deg); }
          75%  { transform: rotate(-9deg); }
          100% { transform: rotate(-4.5deg); }
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
        @media (max-width: 860px) { .nb-margin-note { max-width: 380px; width: 90%; justify-self: center; margin: 0 auto; } }

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

        /* ── READING PROGRESS BAR ── */
        .nb-progress {
          position: fixed;
          top: 0; left: 0;
          height: 3px;
          background: linear-gradient(90deg, #e8a020, #e8d040);
          z-index: 100;
          pointer-events: none;
          border-radius: 0 2px 2px 0;
        }

        /* ── AVAILABLE BADGE ── */
        .nb-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-hand);
          font-size: 13px;
          color: var(--fg3);
          margin-left: 10px;
          vertical-align: middle;
        }
        .nb-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          position: relative;
          flex-shrink: 0;
          display: inline-block;
        }
        .nb-badge-dot::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px solid #22c55e;
          animation: nbPulse 2s ease-out infinite;
        }
        @keyframes nbPulse {
          0%   { opacity: 0.9; transform: scale(1); }
          70%  { opacity: 0;   transform: scale(2.4); }
          100% { opacity: 0;   transform: scale(2.4); }
        }
        @media (max-width: 600px) { .nb-badge { display: none; } }

        /* ── SCROLL TO TOP TAB ── */
        .nb-scroll-top {
          position: fixed;
          bottom: 0; right: 44px;
          width: 44px;
          padding: 10px 0;
          background: var(--fg);
          color: var(--bg);
          border: none;
          border-radius: 8px 8px 0 0;
          font-family: var(--font-hand);
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          z-index: 40;
          box-shadow: 0 -2px 14px var(--shadow);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .nb-scroll-top:hover { opacity: 0.82; }
        .nb-scroll-top.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .nb-scroll-top.hidden  { opacity: 0; pointer-events: none; transform: translateY(100%); }

        /* ── REMOVE SECTION BORDER ── */
        .nb-section { border-top: none; }
        .nb-footer   { border-top: none; }

        /* ── CONTACT GRID ── */
        @media (max-width: 860px) {
          .nb-contact-grid { grid-template-columns: 1fr !important; }
        }

        /* ── DOODLE SVGs ── */
        .nb-doodle { pointer-events: none; }
        @media (max-width: 700px) {
          .nb-doodle-margin { display: none; }
          .nb-doodle-hero   { display: none; }
        }

      `}</style>

      {/* Reading progress bar */}
      <div className="nb-progress" style={{ width: `${scrollProgress * 100}%` }} />

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
            suppressHydrationWarning
          >
            {dark ? "☀︎" : "☽"}
          </button>
          <button
            className={`nb-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Open menu"
          >
            <span className="nb-hamburger-line" />
            <span className="nb-hamburger-line" />
            <span className="nb-hamburger-line" />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" className="nb-hero" style={{ position: "relative" }}>
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
            fontSize: "clamp(44px, 6.5vw, 88px)",
            letterSpacing: "-0.038em",
            lineHeight: 1.0,
            color: "var(--fg)",
            marginBottom: 8,
          }}>
            Charles <span style={{ color: "var(--fg3)" }}>Obuzor.</span>
          </h1>

          {/* Wavy underline doodle */}
          <svg aria-hidden="true" className="nb-doodle nb-doodle-hero" viewBox="0 0 340 12"
            style={{ display: "block", width: "min(340px, 90%)", height: 12, marginBottom: 20, opacity: 0.38 }}>
            <path d="M0,8 Q21,2 42,8 Q63,14 84,8 Q105,2 126,8 Q147,14 168,8 Q189,2 210,8 Q231,14 252,8 Q273,2 294,8 Q315,14 336,8"
              stroke="var(--fg3)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>

          <p className="a3" style={{
            fontFamily: "var(--font-hand)",
            fontSize: "clamp(22px, 2.4vw, 26px)",
            lineHeight: 1.65,
            color: "var(--fg2)",
            maxWidth: "52ch",
            marginBottom: 40,
          }}>
            I build stuff.
            <br />
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              React · Next.js · React Native · TypeScript.
            </span>
          </p>

          <div className="a4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "View Projects", href: "/projects", download: false, isLink: true },
              { label: "GitHub", href: "https://github.com/charlzx", download: false, isLink: false },
              { label: "Download CV", href: "/charles-obuzor-cv.pdf", download: true, isLink: false },
            ].map(btn => (
              btn.isLink
                ? <Link key={btn.label} href={btn.href} className="nb-btn-out" style={{ minWidth: 160, justifyContent: "center" }}>
                    {btn.label} ↗
                  </Link>
                : <a key={btn.label} href={btn.href} target={btn.download ? undefined : "_blank"} rel="noreferrer"
                    download={btn.download || undefined} className="nb-btn-out"
                    style={{ minWidth: 160, justifyContent: "center" }}>
                    {btn.label} ↗
                  </a>
            ))}
          </div>

          {/* Curly arrow doodle pointing to first button */}
          <svg aria-hidden="true" className="nb-doodle nb-doodle-hero" viewBox="0 0 72 44"
            style={{ display: "block", width: 60, height: "auto", marginTop: 6, opacity: 0.3 }}>
            <path d="M8,38 Q12,10 58,8" stroke="var(--fg3)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M50,3 L58,8 L52,15" stroke="var(--fg3)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>


        {/* Right: links sticky note */}
        <div className="a5">
          <div className="nb-margin-note" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {/* GitHub */}
            <a href="https://github.com/charlzx" target="_blank" rel="noreferrer"
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", fontWeight: 700, color: "#1a1400", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationColor: "rgba(0,0,0,0.3)" }}>@charlzx</span>
              <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(18px, 1.8vw, 20px)", color: "#7a6600" }}>Check out my projects and contributions</span>
            </a>

            {/* X / Twitter */}
            <a href="https://x.com/charlzObuzor" target="_blank" rel="noreferrer"
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", fontWeight: 700, color: "#1a1400", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationColor: "rgba(0,0,0,0.3)" }}>@charlzObuzor</span>
              <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(18px, 1.8vw, 20px)", color: "#7a6600" }}>Follow me on X</span>
            </a>

            {/* Email — click to copy */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                navigator.clipboard.writeText("charlesobuzor@outlook.com");
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
              }}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") e.currentTarget.click(); }}
              style={{ display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
            >
              <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.2vw, 24px)", fontWeight: 700, color: "#1a1400", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationColor: "rgba(0,0,0,0.3)" }}>charlesobuzor@outlook.com</span>
              <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(18px, 1.8vw, 20px)", color: emailCopied ? "#166534" : "#7a6600", transition: "color 0.2s" }}>
                {emailCopied ? "Copied! ✓" : "Click to copy email"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <TornEdge />
      <section className="nb-section" style={{ position: "relative" }}>
        {/* Margin scribble doodles */}
        <svg aria-hidden="true" className="nb-doodle nb-doodle-margin" viewBox="0 0 24 54"
          style={{ position: "absolute", left: 44, top: 80, width: 22, height: "auto", opacity: 0.28 }}>
          <polygon points="12,2 14.5,9 22,9 16,13.5 18.5,21 12,16.5 5.5,21 8,13.5 2,9 9.5,9"
            stroke="var(--fg3)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
          <circle cx="12" cy="40" r="6" stroke="var(--fg3)" strokeWidth="1.2" fill="none" />
        </svg>

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
              I&apos;m Charlz — a frontend developer building responsive web apps and cross-platform mobile products. I turn ideas into functional, well-built products.
            </p>
            <p style={{
              fontFamily: "var(--font-hand)",
              fontSize: "clamp(22px, 2.4vw, 26px)",
              lineHeight: 1.75,
              color: "var(--fg2)",
            }}>
              Outside of work I read, listen to{" "}
              <a href="https://open.spotify.com/user/s76ocb47g23yzpwrf939hyvvw" target="_blank" rel="noreferrer" style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: "3px" }}>music</a>
              {" "}and play{" "}
              <a href="https://www.chess.com/member/charlz-x" target="_blank" rel="noreferrer" style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: "3px" }}>chess</a>
              . I approach development the same way — deliberately, patiently, always thinking a few moves ahead.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── SKILLS ── */}
      <TornEdge />
      <section id="skills" className="nb-section nb-section-alt" style={{ position: "relative" }}>
        <Reveal>
          <p className="nb-label">— 02 / skills</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="nb-h2">What I work with.</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="nb-skill-notes">
            {SKILLS.map((group) => (
              <div key={group.category} className="nb-skill-note">
                <p className="nb-skill-note-cat">{group.category}</p>
                <div className="nb-skill-tags">
                  {group.items.map(item => (
                    <span key={item} className="nb-skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <TornEdge />
      <section id="contact" className="nb-section" style={{ paddingBottom: 120, position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px 64px",
          alignItems: "start",
        }} className="nb-contact-grid">
          {/* Left: label + heading + copy */}
          <div>
            <Reveal>
              <p className="nb-label">— 03 / contact</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="nb-h2">
                Let&apos;s build <span style={{ color: "var(--fg3)" }}>something.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p style={{
                fontFamily: "var(--font-hand)",
                fontSize: "clamp(22px, 2.4vw, 26px)",
                lineHeight: 1.7,
                color: "var(--fg2)",
              }}>
                If you want to collaborate or talk shop, you can contact me.
                <br /><br />
                I&apos;m always interested in hearing about new projects, opportunities, or just connecting with fellow developers.
              </p>
            </Reveal>
          </div>

          {/* Right: post-it form */}
          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Floating scroll-to-top tab */}
      <button
        className={`nb-scroll-top ${showScrollTop ? "visible" : "hidden"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      {/* ── FOOTER ── */}
      <TornEdge />
      <footer className="nb-footer">
        <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(20px, 1.9vw, 22px)", color: "var(--fg3)" }}>
          © {new Date().getFullYear()} Charles Obuzor
        </span>

        <a
          href="#about"
          className="nb-footer-link"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >↑ top</a>
      </footer>
    </div>
  );
}
