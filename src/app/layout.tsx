import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Utilizando Inter como fallback de alta performance para a San Francisco da Apple
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Felipe Marzochi | Web OS',
  description: 'Portfólio de Engenharia de Software e Desenvolvimento Full-Stack',
};

// Impede o pinch-to-zoom do Safari e garante escala 1:1 em todos os dispositivos
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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