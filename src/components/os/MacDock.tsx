'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../utils/audioEngine';
import { useWindowManager } from '../../store/useWindowManager';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  GlobeAltIcon,
  BuildingOfficeIcon,
  CommandLineIcon,
  PhotoIcon,
  AcademicCapIcon,
  LinkedInIcon,
  GitHubIcon,
  WhatsAppIcon
} from '../common/IconRegistry';

type DockItem = {
  id: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  gradient: string;
  href?: string;
};

type DockMenu = { item: DockItem; x: number; y: number } | null;

export const MacDock = () => {
  const { openApp, closeApp, focusApp, windows } = useWindowManager();
  const { t } = useLanguage();
  const [dockMenu, setDockMenu] = useState<DockMenu>(null);
  const [dockHovered, setDockHovered] = useState(false);

  const skillsLabel = 'Skills';

  const DOCK_ITEMS: DockItem[] = [
    { id: 'safari',   title: t.apps.safari,   icon: GlobeAltIcon,       gradient: 'from-blue-500 to-cyan-500'                  },
    { id: 'maps',     title: t.apps.maps,     icon: BuildingOfficeIcon,  gradient: 'from-emerald-500 to-teal-600'               },
    { id: 'skills',   title: skillsLabel,     icon: CommandLineIcon,     gradient: 'from-slate-500 to-slate-700'                },
    { id: 'photos',   title: t.apps.photos,   icon: PhotoIcon,           gradient: 'from-pink-400 to-violet-600'                },
    { id: 'finder',   title: t.apps.finder,   icon: AcademicCapIcon,     gradient: 'from-amber-400 to-orange-500'               },
    { id: 'messages', title: t.apps.messages, icon: WhatsAppIcon,        gradient: 'from-[#25D366] via-[#1ebe5d] to-[#128C7E]' },
    { id: 'linkedin', title: 'LinkedIn',       icon: LinkedInIcon,        gradient: 'from-[#0A66C2] to-[#0077B5]', href: 'https://www.linkedin.com/in/felipemarzochi/' },
    { id: 'github',   title: 'GitHub',         icon: GitHubIcon,          gradient: 'from-[#24292e] to-[#040d21]',  href: 'https://github.com/Fmarzochi'                },
  ];

  const anyFullScreen = windows.some((w) => w.isOpen && !w.isMinimized && w.isFullScreen);

  const isRunning = (id: string) =>
    windows.some((w) => w.id === id && w.isOpen && !w.isMinimized);

  const handleClick = (item: DockItem) => {
    playSound('click');
    if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (isRunning(item.id)) {
      focusApp(item.id);
    } else {
      openApp(item.id, item.title);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, item: DockItem) => {
    e.preventDefault();
    e.stopPropagation();
    (e.nativeEvent as Event).stopImmediatePropagation();
    setDockMenu({ item, x: e.clientX, y: e.clientY });
  };

  const closeDockMenu = () => setDockMenu(null);

  return (
    <>
      {dockMenu && (
        <div className="fixed inset-0 z-[9998]" onClick={closeDockMenu} />
      )}

      <AnimatePresence>
        {dockMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 6 }}
            transition={{ duration: 0.12 }}
            style={{
              top: Math.max(dockMenu.y - 120, 8),
              left: Math.min(Math.max(dockMenu.x - 80, 8), (typeof window !== 'undefined' ? window.innerWidth : 800) - 168),
            }}
            className="fixed z-[9999] w-40 overflow-hidden rounded-xl liquid-glass-context-menu"
          >
            <div className="py-1">
              <div className="px-3 py-2 text-[11px] font-bold text-white/40 uppercase tracking-wider truncate">
                {dockMenu.item.title}
              </div>
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <button
                onClick={() => {
                  if (isRunning(dockMenu.item.id)) {
                    closeApp(dockMenu.item.id);
                  } else {
                    openApp(dockMenu.item.id, dockMenu.item.title);
                  }
                  closeDockMenu();
                }}
                aria-label={isRunning(dockMenu.item.id) ? `Fechar ${dockMenu.item.title}` : `Abrir ${dockMenu.item.title}`}
                className="flex w-full items-center px-3 py-2.5 text-left text-[13px] text-white/85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset"
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = ''; }}
              >
                {isRunning(dockMenu.item.id) ? t.menu.close : t.menu.open}
              </button>
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <button
                onClick={() => window.location.reload()}
                aria-label="Recarregar página"
                className="flex w-full items-center px-3 py-2.5 text-left text-[13px] text-white/85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset"
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = ''; }}
              >
                {t.menu.reload}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 z-[200] flex justify-center items-end h-[100px] pointer-events-none">

        {anyFullScreen && (
          <div
            className="absolute bottom-0 left-0 right-0 h-3 pointer-events-auto"
            onMouseEnter={() => setDockHovered(true)}
          />
        )}

        <div
          className="transition-transform duration-300 ease-in-out pb-4 pointer-events-auto"
          style={{ transform: anyFullScreen && !dockHovered ? 'translateY(100%)' : 'translateY(0)' }}
          onMouseLeave={() => anyFullScreen && setDockHovered(false)}
        >
          <nav 
            className="liquid-glass-dock relative flex items-end gap-2 px-4 pt-3 pb-2.5 rounded-[22px] select-none"
            aria-label="Aplicativos principais"
          >

            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent rounded-full pointer-events-none" aria-hidden="true" />

            {DOCK_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.38, y: -16 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                onClick={() => { closeDockMenu(); handleClick(item); }}
                onContextMenu={e => handleContextMenu(e, item)}
                className="group relative flex flex-col items-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
                aria-label={`Abrir aplicativo ${item.title}`}
              >
                <div className={`app-icon relative h-12 w-12 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/12 pointer-events-none" aria-hidden="true" />
                  <item.icon className="h-[22px] w-[22px] text-white relative z-10" strokeWidth={1.5} aria-hidden="true" />
                </div>

                <div 
                  className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[10px] px-3 py-1 text-xs font-medium text-white/95 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out liquid-glass-context-menu"
                  aria-hidden="true"
                >
                  {item.title}
                </div>

                <div
                  className={`mt-1.5 h-[5px] w-[5px] rounded-full transition-all duration-300 ${
                    !item.href && isRunning(item.id)
                      ? 'bg-white/80 shadow-[0_0_4px_rgba(255,255,255,0.6)]'
                      : 'bg-transparent'
                  }`}
                  aria-hidden="true"
                />
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
