import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://charlz.dev'),
  title: {
    default: "Charles Obuzor — Frontend Developer",
    template: '%s — charlz.dev',
  },
  description: 'Charles Obuzor is a frontend developer with 4+ years of experience building web and mobile products with React, Next.js, React Native, and TypeScript.',
  keywords: [
    'Charles Obuzor',
    'Charlz',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'React Native',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Mobile Developer',
    'Portfolio',
    'charlz.dev',
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
    title: 'Charles Obuzor — Frontend Developer',
    description: 'Frontend developer building web and mobile products with React, Next.js, and TypeScript.',
    siteName: 'charlz.dev',
    images: [
      {
        url: 'https://charlz.dev/my-portfolio.webp',
        width: 1200,
        height: 630,
        alt: 'Charles Obuzor — Frontend Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charles Obuzor — Frontend Developer',
    description: 'Frontend developer building web and mobile products with React, Next.js, and TypeScript.',
    creator: '@charlzObuzor',
    images: ['https://charlz.dev/my-portfolio.webp'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Charles Obuzor',
    alternateName: 'Charlz',
    url: 'https://charlz.dev',
    jobTitle: 'Frontend Developer',
    sameAs: [
      'https://github.com/charlzx',
      'https://twitter.com/charlzObuzor',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Frontend Development',
      'Mobile Development',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
