"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectDetail({ project: p }: { project: Project }) {
  const [dark, setDark] = useState(false);

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

  const RULED = `repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, var(--rule) 31px, var(--rule) 32px)`;

  return (
    <div style={{ ...(theme as React.CSSProperties), minHeight: "100vh", backgroundColor: "var(--bg)", color: "var(--fg)" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --font-hand: 'Caveat', cursive; --font-head: 'Raleway', sans-serif; }
        body { overflow-x: hidden; }
        ::selection { background: rgba(100,149,237,0.25); }

        .npd-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(20px, 5vw, 80px);
          height: 56px;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }

        .npd-logo {
          font-family: var(--font-head);
          font-size: 20px;
          font-weight: 700;
          color: var(--fg);
          text-decoration: none;
          letter-spacing: -0.03em;
        }

        .npd-back {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2vw, 24px);
          color: var(--fg3);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .npd-back:hover { color: var(--fg); }

        .npd-toggle {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          color: var(--fg3);
          padding: 4px 8px;
          transition: color 0.2s;
        }
        .npd-toggle:hover { color: var(--fg); }

        .npd-main {
          padding: clamp(48px, 6vw, 96px) clamp(20px, 5vw, 80px) 120px;
          background-image: ${RULED};
          background-size: 100% 32px;
          position: relative;
          min-height: calc(100vh - 56px);
        }

        .npd-margin-line {
          position: fixed;
          top: 56px;
          left: 36px;
          width: 1.5px;
          bottom: 0;
          background: var(--margin);
          pointer-events: none;
          z-index: 1;
        }

        @media (max-width: 600px) { .npd-margin-line { display: none; } }

        .npd-pill {
          font-family: var(--font-hand);
          font-size: clamp(20px, 1.8vw, 22px);
          color: var(--fg2);
          padding: 4px 16px;
          border-radius: 999px;
          border: 1.5px solid var(--border);
          display: inline-block;
        }

        .npd-link {
          font-family: var(--font-hand);
          font-size: clamp(22px, 2vw, 24px);
          color: var(--fg);
          text-decoration: none;
          border-bottom: 1.5px solid var(--border);
          padding-bottom: 2px;
          transition: border-color 0.2s, color 0.2s;
        }
        .npd-link:hover { border-color: var(--fg); }

        .npd-footer {
          padding: 20px clamp(20px, 5vw, 80px);
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>

      <nav className="npd-nav">
        <Link href="/" className="npd-logo">charlz.</Link>
        <Link href="/projects" className="npd-back">← projects</Link>
        <button className="npd-toggle" onClick={() => setDark(d => !d)} aria-label="Toggle dark mode">
          {dark ? "☀︎" : "☽"}
        </button>
      </nav>

      <div className="npd-margin-line" />

      <main className="npd-main">
        <p style={{
          fontFamily: "var(--font-hand)",
          fontSize: "clamp(18px, 1.8vw, 20px)",
          color: "var(--fg3)",
          marginBottom: 16,
          letterSpacing: "0.04em",
        }}>
          — {p.year} / {p.role}
        </p>

        <h1 style={{
          fontFamily: "var(--font-head)",
          fontWeight: 700,
          fontSize: "clamp(40px, 6vw, 80px)",
          letterSpacing: "-0.038em",
          lineHeight: 1.02,
          color: "var(--fg)",
          marginBottom: 12,
        }}>
          {p.name}
        </h1>

        <p style={{
          fontFamily: "var(--font-hand)",
          fontSize: "clamp(22px, 2.4vw, 28px)",
          color: "var(--fg3)",
          marginBottom: 48,
        }}>
          {p.tagline}
        </p>

        <div style={{
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: 64,
          boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.10)",
          maxWidth: 900,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={`${p.name} — ${p.tagline}`} style={{ width: "100%", height: "auto", display: "block" }} width={1200} height={750} fetchPriority="high" />
        </div>

        <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 56 }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {p.description.map((para, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-hand)",
                fontSize: "clamp(22px, 2.4vw, 26px)",
                lineHeight: 1.75,
                color: "var(--fg2)",
              }}>
                {para}
              </p>
            ))}
          </div>

          {p.highlights.length > 0 && (
            <div>
              <p style={{
                fontFamily: "var(--font-hand)",
                fontSize: "clamp(18px, 1.8vw, 20px)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--fg3)",
                marginBottom: 16,
              }}>
                Highlights
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {p.highlights.map((h, i) => (
                  <p key={i} style={{
                    fontFamily: "var(--font-hand)",
                    fontSize: "clamp(22px, 2.2vw, 25px)",
                    color: "var(--fg2)",
                    display: "flex",
                    gap: 12,
                    alignItems: "baseline",
                  }}>
                    <span style={{ color: "var(--fg3)", flexShrink: 0 }}>—</span>
                    {h}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div>
            <p style={{
              fontFamily: "var(--font-hand)",
              fontSize: "clamp(18px, 1.8vw, 20px)",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--fg3)",
              marginBottom: 16,
            }}>
              Built with
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {p.stack.map(s => (
                <span key={s} className="npd-pill">{s}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {p.url && (
              <a href={p.url} target="_blank" rel="noreferrer" className="npd-link">
                View live ↗
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" className="npd-link">
                GitHub ↗
              </a>
            )}
          </div>

        </div>
      </main>

      <footer className="npd-footer">
        <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(20px, 1.9vw, 22px)", color: "var(--fg3)" }}>
          © {new Date().getFullYear()} Charles Obuzor
        </span>
        <Link href="/projects" style={{
          fontFamily: "var(--font-hand)",
          fontSize: "clamp(20px, 1.9vw, 22px)",
          color: "var(--fg3)",
          textDecoration: "none",
          transition: "color 0.2s",
        }}>
          ← all projects
        </Link>
      </footer>
    </div>
  );
}
