'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BatteryMedium, Wifi, Signal,
  Compass, Map as MapIcon, Image as ImageIcon,
  Folder, TerminalSquare, Users,
} from 'lucide-react';
import { AppRegistry } from '../apps/AppRegistry';
import { ControlCenter } from './ControlCenter';
import { playSound } from '../../utils/audioEngine';
import { DynamicIsland } from './DynamicIsland';

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

/* ── App data ─────────────────────────────────────────────────────────────── */
type AppEntry = {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  gradient: string;
};

const HOME_APPS: AppEntry[] = [
  { id: 'safari',   title: 'Portfólio', icon: Compass,        gradient: 'from-blue-500 via-blue-400 to-cyan-400'      },
  { id: 'maps',     title: 'Jornada',   icon: MapIcon,        gradient: 'from-emerald-500 via-green-400 to-teal-400'  },
  { id: 'photos',   title: 'Galeria',   icon: ImageIcon,      gradient: 'from-pink-500 via-purple-500 to-violet-600'  },
  { id: 'finder',   title: 'Arquivos',  icon: Folder,         gradient: 'from-sky-500 via-blue-400 to-indigo-500'     },
  { id: 'skills',   title: 'Skills',    icon: TerminalSquare, gradient: 'from-slate-500 via-slate-600 to-slate-700'   },
  { id: 'contacts', title: 'Equipe',    icon: Users,          gradient: 'from-orange-500 via-amber-400 to-yellow-500' },
];

const DOCK_APPS: AppEntry[] = [
  { id: 'messages', title: 'Contato', icon: WhatsAppIcon,   gradient: 'from-[#25D366] via-[#1ebe5d] to-[#128C7E]'  },
  { id: 'safari',   title: 'Safari',  icon: Compass,        gradient: 'from-blue-500 via-blue-400 to-cyan-400'      },
  { id: 'skills',   title: 'Skills',  icon: TerminalSquare, gradient: 'from-slate-500 via-slate-600 to-slate-700'   },
  { id: 'photos',   title: 'Fotos',   icon: ImageIcon,      gradient: 'from-pink-500 via-purple-500 to-violet-600'  },
];

export const IOSMobile = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const handleOpenApp = (appId: string) => {
    playSound('click');
    setActiveApp((current) => (current === appId ? null : appId));
  };

  const handleCloseApp = () => {
    playSound('click');
    setActiveApp(null);
  };

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden overscroll-none bg-black text-white">

      {/* ── Springboard Wallpaper (iOS 26 deep system palette) ────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900" />
        {/* Aurora depth layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_55%_at_50%_-8%,rgba(99,55,215,0.60),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_10%_70%,rgba(30,80,200,0.35),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_90%_85%,rgba(15,100,90,0.30),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_75%_25%,rgba(160,50,200,0.22),transparent)]" />
      </div>

      {/* ── Dynamic Island ─────────────────────────────────────────────────── */}
      <DynamicIsland />

      {/* ── Status Bar ─────────────────────────────────────────────────────── */}
      <div className="relative z-[60] flex h-14 flex-shrink-0 items-center justify-between px-7 pt-safe pointer-events-none select-none">
        <div className="w-16 text-[15px] font-semibold tracking-wide tabular-nums pointer-events-auto">
          {time ? formatTime(time) : '--:--'}
        </div>
        <div
          className="flex w-16 cursor-pointer items-center justify-end gap-[5px] transition-opacity hover:opacity-70 pointer-events-auto"
          onClick={() => {
            playSound('click');
            setIsControlCenterOpen(!isControlCenterOpen);
          }}
        >
          <Signal size={13} className="fill-white text-white" strokeWidth={0} />
          <Wifi size={15} strokeWidth={1.5} />
          <BatteryMedium size={18} className="fill-white" strokeWidth={1} />
        </div>
      </div>

      {/* ── Control Center ─────────────────────────────────────────────────── */}
      <div className="absolute right-0 top-0 z-[70]">
        <ControlCenter isOpen={isControlCenterOpen} />
      </div>
      <AnimatePresence>
        {isControlCenterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsControlCenterOpen(false)}
            className="absolute inset-0 z-[65] bg-black/20 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* ── Springboard App Grid ───────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 pb-2">
        <div className="grid grid-cols-3 gap-x-5 gap-y-9 px-4">
          {HOME_APPS.map((app) => (
            <div key={app.id} className="flex flex-col items-center gap-[10px]">
              <motion.button
                whileTap={{ scale: 0.86 }}
                transition={{ type: 'spring', stiffness: 520, damping: 28 }}
                onClick={() => handleOpenApp(app.id)}
                className={`app-icon relative h-[72px] w-[72px] bg-gradient-to-br ${app.gradient} flex items-center justify-center overflow-hidden cursor-pointer`}
              >
                {/* Specular highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/10 pointer-events-none" />
                <app.icon className="h-[34px] w-[34px] text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
              </motion.button>
              <span className="text-[12px] font-medium text-white/90 tracking-[0.01em] drop-shadow-md select-none text-center leading-tight">
                {app.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Page Indicator Dots ────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-center gap-[6px] pb-4">
        <div className="h-[7px] w-[18px] rounded-full bg-white/85" />
        <div className="h-[7px] w-[7px] rounded-full bg-white/28" />
        <div className="h-[7px] w-[7px] rounded-full bg-white/28" />
      </div>

      {/* ── Dock (Glassmorphism) — z-[50] fica sempre acima do app sheet (z-40) */}
      <div className="relative z-[50] flex-shrink-0 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+18px)]">
        <div className="liquid-glass-dock relative flex h-[84px] items-center justify-around rounded-[30px] px-4">
          {DOCK_APPS.map((app) => (
            <motion.button
              key={app.id}
              whileTap={{ scale: 0.86 }}
              transition={{ type: 'spring', stiffness: 520, damping: 28 }}
              onClick={() => handleOpenApp(app.id)}
              className={`app-icon relative h-[60px] w-[60px] bg-gradient-to-br ${app.gradient} flex items-center justify-center overflow-hidden cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/10 pointer-events-none" />
              <app.icon className="h-7 w-7 text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Full-Screen App Sheet ──────────────────────────────────────────── */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            initial={{ y: '100%', scale: 0.97, opacity: 0.6 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: '100%', scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', damping: 27, stiffness: 310, mass: 0.85 }}
            className="absolute inset-0 z-40 overflow-hidden"
          >
            {/* App background */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-[#110e2a] to-[#090912]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(80,40,180,0.4),transparent)] pointer-events-none" />

            {/* pb-[110px] garante que o conteúdo não fique sob o dock (84px + 18px padding + margem) */}
            <div className="relative h-full w-full overflow-hidden pt-14 pb-[calc(env(safe-area-inset-bottom,0px)+110px)]">
              <AppRegistry appId={activeApp} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
