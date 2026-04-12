import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Utilizando Inter como fallback de alta performance para a San Francisco da Apple
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfólio | Felipe Marzochi',
  description: 'Portfólio de Engenharia de Software e Desenvolvimento Full-Stack',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Portfólio | Felipe Marzochi',
  },
};

// Impede o pinch-to-zoom do Safari e garante escala 1:1 em todos os dispositivos
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // Expande o viewport para incluir safe areas
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