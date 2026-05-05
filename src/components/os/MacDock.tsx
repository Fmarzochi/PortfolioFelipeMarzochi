'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../utils/audioEngine';
import { useWindowManager } from '../../store/useWindowManager';

/* Heroicons Solid */
const Squares2x2Icon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" />
  </svg>
);

const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.5 5.25C7.5 3.593 8.843 2.25 10.5 2.25h3c1.657 0 3 1.343 3 3v.455a31.141 31.141 0 0 1 4.774.789c1.454.217 2.476 1.482 2.476 2.916v3.032c0 1.211-.734 2.352-1.936 2.752A31.478 31.478 0 0 1 12 15.75a31.478 31.478 0 0 1-9.814-1.556C1.984 13.844 1.25 12.703 1.25 11.492V8.46c0-1.434 1.022-2.699 2.476-2.916A31.141 31.141 0 0 1 7.5 4.705V5.25Zm7.5 0v.091A33.138 33.138 0 0 0 12 5.25a33.138 33.138 0 0 0-3-.091V5.25A1.5 1.5 0 0 1 10.5 3.75h3A1.5 1.5 0 0 1 15 5.25Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    <path d="M3 18.4V15.6a.75.75 0 0 1 .25.057A33 33 0 0 0 12 17.25a33 33 0 0 0 8.75-1.593.75.75 0 0 1 .25-.057V18.4c0 1.452-1.047 2.727-2.523 2.923A40.614 40.614 0 0 1 12 21.75c-2.196 0-4.356-.155-6.477-.427C4.047 21.127 3 19.852 3 18.4Z" />
  </svg>
);

const CommandLineIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M2.25 6A3.75 3.75 0 0 1 6 2.25h12A3.75 3.75 0 0 1 21.75 6v12A3.75 3.75 0 0 1 18 21.75H6A3.75 3.75 0 0 1 2.25 18V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
  </svg>
);

const PhotoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06L9.81 10.06a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" />
  </svg>
);

const AcademicCapIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
    <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.71 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.46-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0 1 6 13.18v1.27a1.5 1.5 0 0 1-.14 2.508c-.09.38-.222.753-.397 1.107l.562.281c.51.256 1.012.515 1.512.778a36.708 36.708 0 0 0 .316-.977 1.5 1.5 0 0 1-.144-2.516V13.18a48.397 48.397 0 0 1 2.306-.822v1.255a1.5 1.5 0 0 0 .04 2.515l-.305.153c.088.372.22.73.394 1.072l-.394-.197a48.214 48.214 0 0 0-2.05-1.003.75.75 0 0 1-.461-.71c-.036-1.441-.122-2.87-.256-4.285A48.45 48.45 0 0 0 6 13.18v1.27Z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.338.627 4.532 1.723 6.426L2.667 29.333l7.14-1.689A13.267 13.267 0 0016 29.333c7.364 0 13.333-5.97 13.333-13.333S23.364 2.667 16 2.667z" fill="white" />
    <path d="M21.92 18.613c-.32-.16-1.893-.933-2.187-.96-.293-.027-.506-.16-.72.16-.213.32-.826 1.04-.986 1.253-.16.213-.346.24-.666.08-.32-.16-1.36-.5-2.587-1.6-.96-.853-1.6-1.907-1.787-2.227-.186-.32-.02-.493.14-.653.143-.143.32-.373.48-.56.16-.186.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.627-.52-.533-.72-.547-.187-.013-.4-.013-.614-.013-.213 0-.56.08-.853.373-.293.293-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.826.76.333 1.36.534 1.826.694.76.24 1.453.2 2 .12.613-.093 1.893-.773 2.16-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z" fill="white" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

type DockItem = {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  gradient: string;
  href?: string;
};

const DOCK_ITEMS: DockItem[] = [
  { id: 'safari',   title: 'Portfólio',           icon: Squares2x2Icon,  gradient: 'from-blue-500 to-cyan-500'                 },
  { id: 'maps',     title: 'Experiência',          icon: BriefcaseIcon,   gradient: 'from-emerald-500 to-teal-600'              },
  { id: 'skills',   title: 'Skills',              icon: CommandLineIcon, gradient: 'from-slate-500 to-slate-700'               },
  { id: 'photos',   title: 'Galeria de Projetos',  icon: PhotoIcon,       gradient: 'from-pink-400 to-violet-600'               },
  { id: 'finder',   title: 'Diplomas',            icon: AcademicCapIcon, gradient: 'from-amber-400 to-orange-500'              },
  { id: 'messages', title: 'Contato',             icon: WhatsAppIcon,    gradient: 'from-[#25D366] via-[#1ebe5d] to-[#128C7E]'},
  { id: 'linkedin', title: 'LinkedIn',            icon: LinkedInIcon,    gradient: 'from-[#0A66C2] to-[#0077B5]', href: 'https://www.linkedin.com/in/felipemarzochi/' },
  { id: 'github',   title: 'GitHub',              icon: GitHubIcon,      gradient: 'from-[#24292e] to-[#040d21]',  href: 'https://github.com/Fmarzochi'                },
];

type DockMenu = { item: DockItem; x: number; y: number } | null;

export const MacDock = () => {
  const { openApp, closeApp, focusApp, windows } = useWindowManager();
  const [dockMenu, setDockMenu] = useState<DockMenu>(null);

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
      {/* Click-outside overlay to close dock menu */}
      {dockMenu && (
        <div className="fixed inset-0 z-[9998]" onClick={closeDockMenu} />
      )}

      {/* Dock mini-menu */}
      <AnimatePresence>
        {dockMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 6 }}
            transition={{ duration: 0.12 }}
            style={{
              top: Math.max(dockMenu.y - 120, 8),
              left: Math.min(Math.max(dockMenu.x - 80, 8), window.innerWidth - 168),
            }}
            className="fixed z-[9999] w-40 overflow-hidden rounded-xl border border-white/10 bg-black/75 shadow-2xl backdrop-blur-2xl"
          >
            <div className="py-1">
              <div className="px-3 py-2 text-[11px] font-bold text-white/40 uppercase tracking-wider truncate">
                {dockMenu.item.title}
              </div>
              <div className="h-px bg-white/10" />
              <button
                onClick={() => {
                  if (isRunning(dockMenu.item.id)) {
                    closeApp(dockMenu.item.id);
                  } else {
                    openApp(dockMenu.item.id, dockMenu.item.title);
                  }
                  closeDockMenu();
                }}
                className="flex w-full items-center px-3 py-2.5 text-left text-sm text-white/85 hover:bg-white/10 transition-colors"
              >
                {isRunning(dockMenu.item.id) ? 'Fechar' : 'Abrir'}
              </button>
              <div className="h-px bg-white/10" />
              <button
                onClick={() => window.location.reload()}
                className="flex w-full items-center px-3 py-2.5 text-left text-sm text-white/85 hover:bg-white/10 transition-colors"
              >
                Recarregar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock */}
      <div className="group/dock absolute bottom-0 left-0 right-0 z-[200] flex justify-center items-end h-[100px]">
        <div
          className={`transition-transform duration-300 ease-in-out pb-4
            ${anyFullScreen ? 'translate-y-full group-hover/dock:translate-y-0' : 'translate-y-0'}
          `}
        >
          <div className="liquid-glass-dock relative flex items-end gap-2 px-4 pt-3 pb-2.5 rounded-[22px] select-none">

            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent rounded-full pointer-events-none" />

            {DOCK_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.38, y: -16 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                onClick={() => { closeDockMenu(); handleClick(item); }}
                onContextMenu={e => handleContextMenu(e, item)}
                className="group relative flex flex-col items-center cursor-pointer"
              >
                <div className={`app-icon relative h-12 w-12 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/12 pointer-events-none" />
                  <item.icon className="h-[22px] w-[22px] text-white relative z-10" strokeWidth={1.5} />
                </div>

                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[10px] bg-black/72 px-3 py-1 text-xs font-medium text-white/95 shadow-xl backdrop-blur-2xl ring-1 ring-white/12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
                  {item.title}
                </div>

                <div
                  className={`mt-1.5 h-[5px] w-[5px] rounded-full transition-all duration-300 ${
                    !item.href && isRunning(item.id)
                      ? 'bg-white/80 shadow-[0_0_4px_rgba(255,255,255,0.6)]'
                      : 'bg-transparent'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
