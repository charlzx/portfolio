export type Project = {
  id: string;
  name: string;
  image: string;
  url: string;
  github: string;
  year: string;
  tagline: string;
  stack: string[];
  role: string;
  description: string[];
  highlights: string[];
  metaDescription: string;
};

export const PROJECTS: Project[] = [
  {
    id: "crwn3",
    name: "CRWN3",
    image: "/crwn3.webp",
    url: "https://crwn3.vercel.app/",
    github: "https://github.com/charlzx/shop",
    year: "2024",
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
    year: "2024",
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
    id: "gta-radio",
    name: "GTA Radio",
    image: "/radio.webp",
    url: "https://gta-live.vercel.app/",
    github: "https://github.com/charlzx/gta-radio",
    year: "2024",
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
    id: "smart-gym",
    name: "Smart Gym",
    image: "/gymx.webp",
    url: "https://gymx.vercel.app/",
    github: "https://github.com/charlzx/gym-app",
    year: "2023",
    tagline: "Responsive fitness web experience.",
    stack: ["React", "Vite", "Tailwind", "Recharts"],
    role: "Solo — design & development",
    metaDescription: "Responsive fitness web app with workout tracking and data visualisation using Recharts. Built with React and Vite by Charles Obuzor.",
    description: [
      "Smart Gym is a fitness-focused web app designed to give users a clean, modern interface for tracking workouts and viewing progress. Recharts is used for visualising training data in a readable way.",
      "The project focused on responsive layout and a polished UI — the kind of interface a fitness brand would actually want to ship.",
    ],
    highlights: [
      "Recharts for workout data visualisation",
      "Fully responsive layout",
      "Clean, brand-ready UI",
    ],
  },
  {
    id: "solisys",
    name: "Solisys",
    image: "/solisys.webp",
    url: "https://solisys.vercel.app/",
    github: "https://github.com/charlzx/solisys",
    year: "2024",
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
    id: "portfolio",
    name: "This Portfolio",
    image: "/my-portfolio.webp",
    url: "https://charlz.dev",
    github: "https://github.com/charlzx/portfolio",
    year: "2025",
    tagline: "Personal portfolio & showcase.",
    stack: ["React", "Next.js", "Tailwind", "Framer Motion"],
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
