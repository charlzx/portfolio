import HomePage from '../src/page-components/HomePage';

export const metadata = {
  title: "Home | Charlz's Portfolio",
  description: "Welcome to Charlz's portfolio. Discover beautiful web experiences, frontend skills, and ways to connect.",
  keywords: 'Frontend Developer, React, Next.js, Tailwind CSS, Portfolio, Web Development, Charles Obuzor, UI, UX, JavaScript',
  authors: [{ name: 'Charles Obuzor' }],
  openGraph: {
    title: "Charlz's Portfolio",
    description: "Frontend developer specializing in React, Next.js, and Tailwind CSS",
    url: 'https://charlz.dev',
    siteName: "Charlz's Portfolio",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Charlz's Portfolio",
    description: "Frontend developer specializing in React, Next.js, and Tailwind CSS",
  },
};

export default function Page() {
  return <HomePage />;
}
