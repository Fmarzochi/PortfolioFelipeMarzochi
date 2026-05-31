'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Info, Mail, ExternalLink, Linkedin, ImageIcon, X, AlertTriangle } from 'lucide-react';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useOSContext, WALLPAPERS } from '../../contexts/OSContext';
import { useWindowManager } from '../../store/useWindowManager';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useState, useEffect } from 'react';

export const ContextMenu = () => {
  const { isOpen, x, y } = useContextMenu();
  const { cycleWallpaper, wallpaperIndex } = useOSContext();
  const { openApp } = useWindowManager();
  const isMobile = useIsMobile();
  const [confirmReload, setConfirmReload] = useState(false);

  useEffect(() => {
    if (!isOpen) setConfirmReload(false);
  }, [isOpen]);

  const openMobileOrDesktop = (appId: string, title: string) => {
    if (isMobile) {
      document.dispatchEvent(new CustomEvent('ios-open-app', { detail: { appId } }));
    } else {
      openApp(appId, title);
    }
  };

  const nextWallpaperLabel = WALLPAPERS[(wallpaperIndex + 1) % WALLPAPERS.length].label;

  // Clamp position so the menu never overflows the viewport on mobile
  const safeX = typeof window !== 'undefined' ? Math.min(x, window.innerWidth - 240) : x;
  const safeY = typeof window !== 'undefined' ? Math.min(y, window.innerHeight - 320) : y;

  const menuItems = [
    {
      label: 'Sobre Felipe Marzochi',
      icon: <Info size={14} />,
      action: () => openMobileOrDesktop('safari', 'Portfólio'),
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
      action: () => openMobileOrDesktop('messages', 'Contato'),
    },
    { label: '---', isSeparator: true } as const,
    {
      label: `Fundo: ${nextWallpaperLabel}`,
      icon: <ImageIcon size={14} />,
      action: cycleWallpaper,
    },
    { label: '---', isSeparator: true } as const,
    ...(confirmReload ? [
      {
        label: 'Confirmar recarga?',
        icon: <AlertTriangle size={14} className="text-red-400" />,
        action: () => window.location.reload(),
        danger: true,
      } as const,
      {
        label: 'Cancelar',
        icon: <X size={14} />,
        action: () => setConfirmReload(false),
      } as const,
    ] : [
      {
        label: 'Recarregar',
        icon: <RefreshCw size={14} />,
        action: () => setConfirmReload(true),
      } as const,
    ]),
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
          role="menu"
          aria-label="Menu de contexto"
          className="fixed z-[9999] min-w-[220px] overflow-hidden rounded-xl liquid-glass-context-menu"
        >
          <div className="py-1">
            {menuItems.map((item, index) => {
              if ('isSeparator' in item && item.isSeparator) {
                return <div key={index} className="my-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />;
              }
              return (
                <button
                  key={index}
                  onClick={item.action}
                  role="menuitem"
                  className={`flex w-full items-center gap-2.5 px-3 py-[7px] text-left text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset ${'danger' in item && item.danger ? 'text-red-400 hover:bg-red-500/15 hover:text-red-300' : 'text-white/85 hover:text-white'}`}
                  style={!('danger' in item && item.danger) ? { ['--tw-hover-bg' as string]: 'rgba(255,255,255,0.12)' } : undefined}
                  onMouseEnter={e => { if (!('danger' in item && item.danger)) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = ''; }}
                >
                  <span className={'danger' in item && item.danger ? 'text-red-400' : 'text-white/50'}>{item.icon}</span>
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
