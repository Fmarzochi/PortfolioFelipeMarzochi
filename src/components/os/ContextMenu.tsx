'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Info, Mail, ExternalLink, Linkedin, ImageIcon } from 'lucide-react';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useOSContext, WALLPAPERS } from '../../contexts/OSContext';
import { useWindowManager } from '../../store/useWindowManager';

export const ContextMenu = () => {
  const { isOpen, x, y } = useContextMenu();
  const { cycleWallpaper, wallpaperIndex } = useOSContext();
  const { openApp } = useWindowManager();

  const nextWallpaperLabel = WALLPAPERS[(wallpaperIndex + 1) % WALLPAPERS.length].label;

  // Clamp position so the menu never overflows the viewport on mobile
  const safeX = typeof window !== 'undefined' ? Math.min(x, window.innerWidth - 240) : x;
  const safeY = typeof window !== 'undefined' ? Math.min(y, window.innerHeight - 320) : y;

  const menuItems = [
    {
      label: 'Sobre Felipe Marzochi',
      icon: <Info size={14} />,
      action: () => openApp('safari', 'Portfólio'),
    },
    {
      label: 'GitHub',
      icon: <ExternalLink size={14} />,
      action: () => window.open('https://github.com/Fmarzochi', '_blank'),
    },
    {
      label: 'LinkedIn',
      icon: <Linkedin size={14} />,
      action: () => window.open('https://linkedin.com/in/felipemarzochi', '_blank'),
    },
    {
      label: 'Contato',
      icon: <Mail size={14} />,
      action: () => openApp('messages', 'Contato'),
    },
    { label: '---', isSeparator: true } as const,
    {
      label: `Fundo: ${nextWallpaperLabel}`,
      icon: <ImageIcon size={14} />,
      action: cycleWallpaper,
    },
    { label: '---', isSeparator: true } as const,
    {
      label: 'Recarregar',
      icon: <RefreshCw size={14} />,
      action: () => window.location.reload(),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
          style={{ top: safeY, left: safeX }}
          className="fixed z-[9999] min-w-[220px] overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-2xl"
        >
          <div className="py-1">
            {menuItems.map((item, index) => {
              if ('isSeparator' in item && item.isSeparator) {
                return <div key={index} className="my-1 h-px bg-white/10" />;
              }
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <span className="text-white/50">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
