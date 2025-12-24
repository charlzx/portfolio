import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Charlz - Frontend Developer Portfolio",
  description: "Frontend developer focused on building beautiful interfaces for the web. Specializing in React, Next.js, and Tailwind CSS.",
  keywords: ['Frontend Developer', 'React', 'Next.js', 'Tailwind CSS', 'Portfolio', 'Web Development', 'Charles Obuzor', 'UI', 'UX', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Charles Obuzor' }],
  creator: 'Charles Obuzor',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Charlz - Frontend Developer Portfolio",
    description: "Frontend developer specializing in React, Next.js, and Tailwind CSS. Building beautiful, responsive web experiences.",
    url: 'https://charlz.dev',
    siteName: "Charlz's Portfolio",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Charlz - Frontend Developer Portfolio",
    description: "Frontend developer specializing in React, Next.js, and Tailwind CSS",
    creator: '@charlzx',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-mono antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
