/* Desenvolvido por Felipe Marzochi */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { VLibrasWidget } from '../components/common/VLibrasWidget';
import { LanguageProvider } from '../contexts/LanguageContext';
import { AccessibilityProvider } from '../contexts/AccessibilityContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-felipe-marzochi.vercel.app'),
  title: 'Portfólio Felipe Marzochi',
  description: 'Portfólio de Felipe Marzochi · Engenheiro de Software especializado em arquiteturas escaláveis (React · Next.js · Java · Cloud). Web OS interativo no browser.',
  keywords: [
    'Felipe Marzochi',
    'Engenheiro de Software Sênior',
    'Desenvolvedor Full Stack',
    'Arquitetura de Sistemas',
    'React Sênior',
    'Next.js 14',
    'TypeScript',
    'Java Spring Boot',
    'Docker',
    'AWS Cloud',
    'Americana SP',
    'SOLID',
    'Clean Code',
    'Web OS Portfólio',
    'fmarzochi',
  ],
  authors: [{ name: 'Felipe Marzochi', url: 'https://www.linkedin.com/in/felipemarzochi/' }],
  creator: 'Felipe Marzochi',
  publisher: 'Felipe Marzochi',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Portfólio Felipe Marzochi · Software Engineering',
    description: 'Explore um sistema operacional interativo no browser. Arquiteturas de alta performance com React, Next.js e Java.',
    siteName: 'Portfólio Felipe Marzochi',
    images: [
      {
        url: '/screenshots/01-login-screen.webp',
        width: 1200,
        height: 630,
        alt: 'Portfólio Felipe Marzochi · Web OS Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Marzochi · Engenheiro de Software',
    description: 'Web OS interativo construído com Next.js e rigor técnico.',
    images: ['/screenshots/01-login-screen.webp'],
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
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} overflow-hidden bg-black text-white selection:bg-blue-500/30`}>
        {/* SVG filter definitions for color blindness modes */}
        <svg className="a11y-filters-svg" aria-hidden="true" focusable="false">
          <defs>
            <filter id="a11y-deuteranopia" colorInterpolationFilters="linearRGB">
              <feColorMatrix type="matrix" values="0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0" />
            </filter>
            <filter id="a11y-protanopia" colorInterpolationFilters="linearRGB">
              <feColorMatrix type="matrix" values="0.152 1.052 -0.205 0 0  0.115 0.786 0.099 0 0  -0.004 -0.048 1.052 0 0  0 0 0 1 0" />
            </filter>
            <filter id="a11y-tritanopia" colorInterpolationFilters="linearRGB">
              <feColorMatrix type="matrix" values="1.256 -0.077 -0.179 0 0  -0.078 0.931 0.148 0 0  0.005 0.691 0.304 0 0  0 0 0 1 0" />
            </filter>
          </defs>
        </svg>

        {/* Skip to content — visible on first Tab press */}
        <a href="#main-content" className="skip-to-content">
          Pular para o conteúdo
        </a>

        <AccessibilityProvider>
          <LanguageProvider>
            {children}
            <VLibrasWidget />
          </LanguageProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
