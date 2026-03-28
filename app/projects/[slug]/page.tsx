import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import ProjectDetail from "./ProjectDetail";

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.id }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find(pr => pr.id === slug);
  if (!p) return {};

  return {
    title: `${p.name} — Case Study`,
    description: p.metaDescription,
    alternates: {
      canonical: `https://charlz.dev/projects/${p.id}`,
    },
    openGraph: {
      type: "website",
      title: `${p.name} — ${p.tagline}`,
      description: p.metaDescription,
      url: `https://charlz.dev/projects/${p.id}`,
      images: [
        {
          url: `https://charlz.dev${p.image}`,
          width: 1200,
          height: 630,
          alt: `${p.name} — ${p.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} — ${p.tagline}`,
      description: p.metaDescription,
      images: [`https://charlz.dev${p.image}`],
    },
  };
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const p = PROJECTS.find(pr => pr.id === slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.metaDescription,
    url: p.url || `https://charlz.dev/projects/${p.id}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Charles Obuzor",
      url: "https://charlz.dev",
    },
    dateCreated: p.year,
    ...(p.github ? { codeRepository: p.github } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail project={p} />
    </>
  );
}
