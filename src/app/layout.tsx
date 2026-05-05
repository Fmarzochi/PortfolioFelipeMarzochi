/* Desenvolvido por Felipe Marzochi */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Felipe Marzochi | Desenvolvedor Full Stack',
  description: 'Portfólio de Felipe Marzochi — Desenvolvedor Full Stack especializado em React, Next.js, TypeScript, Java e Spring Boot. Americana, SP.',
  keywords: [
    'Felipe Marzochi',
    'Desenvolvedor Full Stack',
    'Engenheiro de Software',
    'React',
    'Next.js',
    'TypeScript',
    'Java',
    'Spring Boot',
    'Node.js',
    'Tailwind CSS',
    'Framer Motion',
    'Zustand',
    'Americana SP',
    'São Paulo',
    'Brasil',
    'Portfólio',
    'Frontend Developer',
    'Backend Developer',
    'Software Engineer',
    'fmarzochi',
  ],
  authors: [{ name: 'Felipe Marzochi', url: 'https://github.com/Fmarzochi' }],
  creator: 'Felipe Marzochi',
  publisher: 'Felipe Marzochi',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Felipe Marzochi | Desenvolvedor Full Stack',
    description: 'Portfólio interativo de Felipe Marzochi — Web OS no browser com React, Next.js, TypeScript, Java e Spring Boot.',
    siteName: 'Portfólio Felipe Marzochi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Marzochi | Desenvolvedor Full Stack',
    description: 'Portfólio interativo de Felipe Marzochi — Web OS no browser com React, Next.js e Java.',
    creator: '@fmarzochi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Felipe Marzochi',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} overflow-hidden bg-black text-white selection:bg-blue-500/30 select-none`}>
        {children}
      </body>
    </html>
  );
}
