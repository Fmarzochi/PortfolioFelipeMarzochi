'use client';

import { motion } from 'framer-motion';
import { Compass, Image as ImageIcon, Folder, TerminalSquare, Settings } from 'lucide-react';
import { playSound } from '../../utils/audioEngine';
import { useWindowManager } from '../../store/useWindowManager';

/* ── WhatsApp icon (SVG fiel ao logo oficial 2024) ───────────────────────── */
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.338.627 4.532 1.723 6.426L2.667 29.333l7.14-1.689A13.267 13.267 0 0016 29.333c7.364 0 13.333-5.97 13.333-13.333S23.364 2.667 16 2.667z"
      fill="white"
    />
    <path
      d="M21.92 18.613c-.32-.16-1.893-.933-2.187-.96-.293-.027-.506-.16-.72.16-.213.32-.826 1.04-.986 1.253-.16.213-.346.24-.666.08-.32-.16-1.36-.5-2.587-1.6-.96-.853-1.6-1.907-1.787-2.227-.186-.32-.02-.493.14-.653.143-.143.32-.373.48-.56.16-.186.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.627-.52-.533-.72-.547-.187-.013-.4-.013-.614-.013-.213 0-.56.08-.853.373-.293.293-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.826.76.333 1.36.534 1.826.694.76.24 1.453.2 2 .12.613-.093 1.893-.773 2.16-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z"
      fill="white"
    />
  </svg>
);

type DockItem = {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  gradient: string;
};

const DOCK_ITEMS: DockItem[] = [
  { id: 'finder',   title: 'Arquivos',  icon: Folder,        gradient: 'from-sky-400 to-blue-600'                   },
  { id: 'safari',   title: 'Portfólio', icon: Compass,       gradient: 'from-blue-400 to-cyan-500'                  },
  { id: 'skills',   title: 'Skills',    icon: TerminalSquare, gradient: 'from-slate-500 to-slate-700'               },
  { id: 'messages', title: 'Contato',   icon: WhatsAppIcon,  gradient: 'from-[#25D366] via-[#1ebe5d] to-[#128C7E]' },
  { id: 'photos',   title: 'Galeria',   icon: ImageIcon,     gradient: 'from-pink-400 to-violet-600'                },
  { id: 'settings', title: 'Ajustes',   icon: Settings,      gradient: 'from-gray-400 to-gray-600'                  },
];

export const MacDock = () => {
  const { openApp, closeApp, windows } = useWindowManager();

  const isRunning = (id: string) =>
    windows.some((w) => w.id === id && w.isOpen && !w.isMinimized);

  const handleAppClick = (id: string, title: string) => {
    playSound('click');
    if (isRunning(id)) {
      closeApp(id);
    } else {
      openApp(id, title);
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="liquid-glass-dock relative flex items-end gap-2 px-4 pt-3 pb-2.5 rounded-[22px] select-none">

        {/* Specular line at the very top edge of the dock */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent rounded-full pointer-events-none" />

        {DOCK_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.38, y: -16 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            onClick={() => handleAppClick(item.id, item.title)}
            className="group relative flex flex-col items-center cursor-pointer"
          >
            {/* App icon with gradient fill */}
            <div
              className={`app-icon relative h-12 w-12 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/12 pointer-events-none" />
              <item.icon className="h-[22px] w-[22px] text-white relative z-10" strokeWidth={1.5} />
            </div>

            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-[10px] bg-black/72 px-3 py-1 text-xs font-medium text-white/95 shadow-xl backdrop-blur-2xl ring-1 ring-white/12 group-hover:block pointer-events-none">
              {item.title}
            </div>

            {/* Running indicator dot */}
            <div
              className={`mt-1.5 h-[5px] w-[5px] rounded-full transition-all duration-300 ${
                isRunning(item.id)
                  ? 'bg-white/80 shadow-[0_0_4px_rgba(255,255,255,0.6)]'
                  : 'bg-transparent'
              }`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
