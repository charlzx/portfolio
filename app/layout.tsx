import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://charlz.dev'),
  title: {
    default: "Charlz's Portfolio",
    template: '%s | Charlz Portfolio',
  },
  description: 'Frontend and mobile developer. I build products solo — web apps, mobile apps, and developer tooling. React 19, React Native, TypeScript.',
  keywords: [
    'Frontend Developer',
    'React Developer',
    'React Native',
    'TypeScript',
    'Tailwind CSS',
    'Web Development',
    'Charles Obuzor',
    'Charlz',
    'Portfolio',
    'Mobile Developer',
    'JavaScript',
    'Software Engineer',
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
    title: 'Charlz - Frontend & Mobile Developer',
    description: 'Frontend and mobile developer building web apps, mobile apps, and developer tooling.',
    siteName: "Charlz's Portfolio",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlz - Frontend & Mobile Developer',
    description: 'Frontend and mobile developer building web apps, mobile apps, and developer tooling.',
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
    worksFor: {
      '@type': 'Organization',
      name: 'Emerj LLC',
    },
    sameAs: [
      'https://github.com/charlzx',
      'https://twitter.com/charlzObuzor',
      'https://linkedin.com/in/charlzObuzor',
    ],
    knowsAbout: [
      'React',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Frontend Development',
      'Mobile Development',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
