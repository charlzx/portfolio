import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://charlz.dev'),
  title: {
    default: "Charlz's Portfolio",
    template: '%s | Charlz Portfolio',
  },
  description: 'Frontend developer and UI engineer specializing in React, Next.js, TypeScript, and Tailwind CSS. Building beautiful, accessible, and performant web applications with modern technologies.',
  keywords: [
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Tailwind CSS',
    'Web Development',
    'Charles Obuzor',
    'Charlz',
    'Portfolio',
    'UI/UX Design',
    'JavaScript',
    'Full Stack Developer',
    'Software Engineer',
    'Web Designer',
  ],
  authors: [{ name: 'Charles Obuzor', url: 'https://charlz.dev' }],
  creator: 'Charles Obuzor',
  publisher: 'Charles Obuzor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://charlz.dev',
    title: 'Charlz - Frontend Developer & UI Engineer',
    description: 'Frontend developer specializing in React, Next.js, and TypeScript. Building beautiful, accessible web experiences.',
    siteName: "Charlz's Portfolio",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlz - Frontend Developer & UI Engineer',
    description: 'Frontend developer specializing in React, Next.js, and TypeScript. Building beautiful web experiences.',
    creator: '@charlzObuzor',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://charlz.dev',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const modeScript = `
    (function () {
      var root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add("dark");
    })();
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Charles Obuzor',
    alternateName: 'Charlz',
    url: 'https://charlz.dev',
    jobTitle: 'Frontend Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    sameAs: [
      'https://github.com/charlzx',
      'https://twitter.com/charlzObuzor',
      'https://linkedin.com/in/charlzObuzor',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Frontend Development',
      'UI/UX Design',
      'Web Development',
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${urbanist.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
