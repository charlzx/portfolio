export type Project = {
  id: string;
  name: string;
  image: string;
  url: string;
  github: string;
  tagline: string;
  stack: string[];
  role: string;
  description: string[];
  highlights: string[];
  metaDescription: string;
};

const PROJECTS_DATA: Project[] = [
  {
    id: "checkwall",
    name: "Checkwall",
    image: "/checkwall.webp",
    url: "https://checkwall.dev",
    github: "",
    tagline: "Runtime security scanner for indie developers.",
    stack: ["React", "Vite", "TypeScript", "Node.js", "Prisma"],
    role: "Solo — design & development",
    metaDescription: "Checkwall is a runtime web security scanner built for indie developers and AI-assisted builders. Scan any URL and get actionable security insights instantly.",
    description: [
      "Checkwall is a URL-based runtime web security scanner built for non-technical indie developers and vibe coders — people shipping products with AI coding tools who lack a security review layer. It scans live URLs and returns structured, actionable findings without requiring any technical setup from the user.",
      "The backend is built on Node.js with Prisma for data access, and the product runs on a credit-based pricing model with a restrictive free tier designed to support automated scanning in later phases. The focus throughout has been on clear output over raw data — security results that a non-expert can read and act on.",
    ],
    highlights: [
      "URL-based runtime scanning — no install required",
      "Credit-based pricing with a restrictive free tier",
      "Node.js backend with Prisma ORM",
      "Built for indie developers and AI-assisted builders",
    ],
  },
  {
    id: "json-tree",
    name: "JSON Tree",
    image: "/json-tree.webp",
    url: "https://json-3.vercel.app/",
    github: "https://github.com/charlzx/json-tree",
    tagline: "Interactive JSON viewer/editor with tree mode and formatting tools.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Monaco Editor"],
    role: "Solo — design & development",
    metaDescription: "JSON Tree is a browser-based JSON utility for viewing, editing, formatting, minifying, and exploring large JSON structures in both text and tree views.",
    description: [
      "JSON Tree combines text-editor workflows with structured tree exploration, making large JSON payloads easier to read, edit, and debug.",
      "It supports JSON validation, format/minify actions, clipboard flows, search, and light/dark themes, with Monaco-powered editing for a familiar developer experience.",
    ],
    highlights: [
      "Tree view + text editor workflow",
      "Format/minify with validation feedback",
      "Search and clipboard support",
      "Monaco-powered editing experience",
      "Light and dark theme toggle",
    ],
  },
  {
    id: "solisys",
    name: "Solisys",
    image: "/solisys.webp",
    url: "https://solisys.vercel.app/",
    github: "https://github.com/charlzx/solisys",
    tagline: "Off-grid solar system designer.",
    stack: ["React", "Tailwind", "Vite"],
    role: "Solo — design & development",
    metaDescription: "Off-grid solar system designer. Enter your energy requirements and get panel, battery, and inverter specifications. Built with React.",
    description: [
      "Solisys is a tool for designing off-grid solar systems. Users can input their energy requirements and the app calculates what panel, battery, and inverter specifications they need.",
      "Built with a practical use case in mind — particularly relevant in markets with unreliable grid power — the project is both a technical demo and a genuinely useful calculator.",
    ],
    highlights: [
      "Solar system sizing calculator",
      "Input-driven recommendations",
      "Clean, practical UI",
    ],
  },
  {
    id: "polys",
    name: "Polys",
    image: "/polys.webp",
    url: "https://polys.vercel.app",
    github: "https://github.com/charlzx/polys",
    tagline: "Prediction market intelligence — real-time odds, arbitrage, and whale tracking.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Gemini AI"],
    role: "Solo — design & development",
    metaDescription: "Polys aggregates live prediction market data from Polymarket and Kalshi — tracking odds via WebSocket, detecting cross-platform arbitrage, monitoring whale wallets, and surfacing AI-generated market insights.",
    description: [
      "A full-stack prediction market intelligence platform built with Next.js 16 App Router. Polys pulls live data from Polymarket and Kalshi, normalizes it into a unified market type, and delivers real-time odds updates via the Polymarket CLOB WebSocket — falling back to REST polling when the stream is unavailable.",
      "The platform includes a cross-platform arbitrage scanner using Jaccard similarity matching, a whale wallet tracker with live trade feeds, email alerts with a cron-driven check engine, and four distinct Gemini AI surfaces: per-market analysis, dashboard intelligence, watchlist one-liners, and smart suggestions. Auth, watchlists, alerts, and notifications are all persisted in Supabase with RLS.",
    ],
    highlights: [
      "Polymarket CLOB WebSocket with REST fallback",
      "Polymarket × Kalshi arbitrage detection",
      "Cron-driven email alert engine via Resend",
      "Gemini AI market summaries and intelligence feed",
      "Realtime notifications",
    ],
  },
  {
    id: "gta-radio",
    name: "GTA Radio",
    image: "/radio.webp",
    url: "https://gta-live.vercel.app/",
    github: "https://github.com/charlzx/gta-radio",
    tagline: "Real-time synchronized GTA radio.",
    stack: ["React", "Vite", "Tailwind"],
    role: "Solo — design & development",
    metaDescription: "Browser-based GTA radio with real-time sync. Every listener hears the same station at the same point — no WebSocket server required.",
    description: [
      "GTA Radio replicates the in-game radio experience from Grand Theft Auto in the browser. Every listener hears the same station at the same point in time — exactly as it works in the game.",
      "The synchronization is based on calculating playback offset from a fixed epoch, meaning no WebSocket server is needed to keep listeners in sync. The result is a stateless, highly scalable approach to shared audio playback.",
    ],
    highlights: [
      "Real-time sync without a persistent server",
      "Epoch-based offset calculation",
      "Multiple GTA stations supported",
      "Deployed on Vercel",
    ],
  },
  {
    id: "oreon",
    name: "Oreon",
    image: "/oreon.webp",
    url: "https://oreon.com.ng",
    github: "",
    tagline: "Brand website for a Nigerian professional paint manufacturer.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: "Solo — design & development",
    metaDescription: "Oreon is a Nigerian paint manufacturer producing professional-grade coatings for interior, exterior, and floor surfaces. The site covers their full product range — Satin, Emulsion, Matt, Silk, Text-Coat, and Screeding — with product-specific enquiry flows and WhatsApp integration.",
    description: [
      "A production marketing site built with Next.js App Router for Oreon, a new Nigerian paint brand manufacturing professional-grade coatings formulated for the Nigerian climate. The site covers six products across interior, exterior, and floor categories, each with a dedicated subpage, WhatsApp pre-fill CTA, and datasheet request flow.",
      "Built with SEO as a primary constraint — server-rendered pages, optimised metadata per route, auto-generated sitemap, and AI crawler blocking via robots.txt. Includes a hero with looping background video, a multi-category FAQ accordion, and a contact form with enquiry type routing.",
    ],
    highlights: [
      "Six individual product subpages with WhatsApp pre-fill CTAs",
      "Next.js App Router with full SSR for SEO performance",
      "Auto-generated sitemap referencing production domain",
      "Robots.txt with AI crawler and FacebookBot blocking",
      "Open Graph metadata verified across all routes",
      "Contact form with enquiry type routing",
    ],
  },
  {
    id: "audiophile",
    name: "Audiophile",
    image: "/audiophile.webp",
    url: "https://audiophilx.vercel.app",
    github: "https://github.com/charlzx/audiophile",
    tagline: "Full-stack e-commerce storefront for a premium audio equipment brand.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: "Solo — design & development",
    metaDescription: "Audiophile is a fully functional e-commerce storefront built on Next.js — covering product listings, individual product pages, a persistent cart, and checkout across three product categories: headphones, speakers, and earphones.",
    description: [
      "An e-commerce storefront implementation built with Next.js App Router, based on the Frontend Mentor Audiophile challenge. The site covers three product categories — headphones, speakers, and earphones — each with dedicated listing and individual product pages.",
      "Features include a quantity-adjustable cart with persistent state, product gallery views, and a related products recommendation system per product page. Routing is fully dynamic via Next.js, with each product resolved from a slug-based URL structure.",
    ],
    highlights: [
      "Dynamic slug-based routing for all product pages",
      "Persistent cart with quantity controls",
      "Three product categories with individual listing pages",
      "Product gallery and related product recommendations",
      "Responsive layout across mobile, tablet, and desktop",
    ],
  },
  {
    id: "readme-editor",
    name: "Readme Editor",
    image: "/readme-editor.webp",
    url: "https://readme-editorx.vercel.app/",
    github: "https://github.com/charlzx/readme-editor",
    tagline: "Markdown README editor with live preview and export-focused workflow.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Monaco Editor"],
    role: "Solo — design & development",
    metaDescription: "Readme Editor is a browser-based Markdown README editor that combines an IDE-like writing experience with live preview, formatting controls, and quick export/copy flows.",
    description: [
      "Readme Editor is a dedicated README writing tool designed for developers who want a faster workflow than editing raw markdown files manually. It blends a code-editor style interface with structured authoring controls and real-time preview.",
      "The app includes markdown-focused editing actions (headings, emphasis, lists, code blocks, and tables), live preview behavior, and export/copy utilities so README drafts can be polished and moved directly into repositories with minimal friction.",
    ],
    highlights: [
      "Live Markdown README preview",
      "Editor + preview workflow in one interface",
      "Formatting actions for common README structures",
      "Copy/export utilities for publishing",
      "Fast browser-based experience",
    ],
  },
  {
    id: "crwn3",
    name: "CRWN3",
    image: "/crwn3.webp",
    url: "https://crwn3.vercel.app/",
    github: "https://github.com/charlzx/shop",
    tagline: "Full-featured e-commerce storefront.",
    stack: ["React", "Vite", "Tailwind", "Leaflet.js"],
    role: "Solo — design & development",
    metaDescription: "Full-featured e-commerce storefront with cart, checkout, and Leaflet.js map integration. Built with React and Vite by Charles Obuzor.",
    description: [
      "CRWN3 is a full-featured e-commerce platform built as a production-grade reference for client engagements. It covers the complete shopping flow — product listings, cart management, checkout — with a Leaflet.js map integration for location-based features.",
      "The project was built to demonstrate what a real commercial storefront looks like end-to-end, from state management to UI polish. I focused on clean component architecture and responsive design throughout.",
    ],
    highlights: [
      "Full shopping cart and checkout flow",
      "Leaflet.js map integration",
      "Responsive across all viewports",
      "Deployed on Vercel",
    ],
  },
  {
    id: "heirswealth",
    name: "Heirswealth",
    image: "/heirswealth.webp",
    url: "https://heirswealth.com",
    github: "",
    tagline: "Solar energy company website.",
    stack: ["React", "Vite", "Tailwind", "Framer Motion"],
    role: "Freelance — design & development",
    metaDescription: "Company website for a Nigerian solar energy provider. Built with React, Vite, and Framer Motion. Mobile-first and performance-optimised.",
    description: [
      "Heirswealth is a solar energy provider operating in Nigeria. I built their company website with a focus on communicating credibility and reach to potential clients and investors.",
      "The site uses Framer Motion for smooth entrance animations and is built mobile-first with performance-optimised asset delivery. It's maintained on behalf of the client and has been live since delivery.",
    ],
    highlights: [
      "Framer Motion page animations",
      "Mobile-first, performance optimised",
      "Client project — live in production",
    ],
  },
  {
    id: "portfolio",
    name: "This Portfolio",
    image: "/my-portfolio.webp",
    url: "https://charlz.dev",
    github: "https://github.com/charlzx/portfolio",
    tagline: "Personal portfolio & showcase.",
    stack: ["Next.js", "TypeScript", "CSS"],
    role: "Solo — design & development",
    metaDescription: "Personal portfolio built with Next.js and a handwriting aesthetic — Caveat font, ruled lines, and a Moleskine-inspired dark mode.",
    description: [
      "The portfolio you're looking at right now. Built with a notebook and handwriting aesthetic — Caveat for body text, Raleway for headings, ruled lines every 32px, and a red margin line on the left.",
      "No component library, no Tailwind utility classes for layout — everything is written in inline styles and a single scoped style tag per page. The goal was to keep the design tight and handcrafted.",
    ],
    highlights: [
      "Notebook / Moleskine aesthetic",
      "Caveat + Raleway type pairing",
      "Dark mode with cool near-black",
      "Formspree contact form",
    ],
  },
];

export const PROJECTS: Project[] = PROJECTS_DATA;