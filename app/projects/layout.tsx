import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Frontend projects by Charles Obuzor — e-commerce storefronts, energy platforms, real-time web apps, and more. Built with React, Next.js, and TypeScript.",
  alternates: {
    canonical: "https://charlz.dev/projects",
  },
  openGraph: {
    title: "Projects — Charles Obuzor",
    description: "Frontend projects by Charles Obuzor — e-commerce, energy platforms, real-time web apps.",
    url: "https://charlz.dev/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
