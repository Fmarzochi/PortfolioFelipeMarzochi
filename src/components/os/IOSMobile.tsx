'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, Map as MapIcon, Image as ImageIcon,
} from 'lucide-react';
import { AppRegistry } from '../apps/AppRegistry';
import { ControlCenter } from './ControlCenter';
import { playSound } from '../../utils/audioEngine';

const DiplomasIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 1L3 5v6c0 5.25 3.75 10.15 9 11.35C17.25 21.15 21 16.25 21 11V5L12 1zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z"/>
    <path d="M10.5 13.5l-2-2-1 1 3 3 5-5-1-1z"/>
  </svg>
);

const SkillsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
    <line x1="12" y1="2" x2="10" y2="22"/>
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
  href?: string;
};

const DEFAULT_HOME_APPS: AppEntry[] = [
  { id: 'safari',   title: 'Portfólio',               icon: Compass,      gradient: 'from-blue-500 via-blue-400 to-cyan-400'      },
  { id: 'maps',     title: 'Experiência Profissional', icon: MapIcon,      gradient: 'from-emerald-500 via-green-400 to-teal-400'  },
  { id: 'photos',   title: 'Galeria de Projetos',      icon: ImageIcon,    gradient: 'from-pink-500 via-purple-500 to-violet-600'  },
  { id: 'finder',   title: 'Diplomas',                 icon: DiplomasIcon, gradient: 'from-amber-400 via-orange-400 to-orange-500' },
  { id: 'skills',   title: 'Skills',                   icon: SkillsIcon,   gradient: 'from-slate-500 via-slate-600 to-slate-700'   },
];

const DOCK_APPS: AppEntry[] = [
  { id: 'messages',  title: 'Contato',  icon: WhatsAppIcon,  gradient: 'from-[#25D366] via-[#1ebe5d] to-[#128C7E]'                                          },
  { id: 'safari',    title: 'Safari',   icon: Compass,       gradient: 'from-blue-500 via-blue-400 to-cyan-400'                                              },
  { id: 'skills',    title: 'Skills',   icon: SkillsIcon,    gradient: 'from-slate-500 via-slate-600 to-slate-700'                                          },
  { id: 'linkedin',  title: 'LinkedIn', icon: LinkedInIcon,  gradient: 'from-[#0A66C2] to-[#0077B5]', href: 'https://www.linkedin.com/in/felipemarzochi/'   },
  { id: 'github',    title: 'GitHub',   icon: GitHubIcon,    gradient: 'from-[#24292e] to-[#040d21]',  href: 'https://github.com/Fmarzochi'                  },
];

export const IOSMobile = () => {
  const [homeApps, setHomeApps] = useState([...DEFAULT_HOME_APPS]);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Refs for drag-to-reorder
  const iconRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const capturedRects = useRef<Record<string, DOMRect>>({});
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enterEditMode = useCallback(() => {
    playSound('click');
    setEditMode(true);
  }, []);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  }, []);

  // Cancel long press on any app-related interaction
  useEffect(() => {
    if (activeApp) {
      cancelLongPress();
      setEditMode(false);
    }
  }, [activeApp, cancelLongPress]);

  const captureRects = useCallback(() => {
    for (const [id, el] of Object.entries(iconRefs.current)) {
      if (el) capturedRects.current[id] = el.getBoundingClientRect();
    }
  }, []);

  const handleDragEnd = useCallback((draggedId: string, offsetX: number, offsetY: number) => {
    const draggedRect = capturedRects.current[draggedId];
    if (!draggedRect) return;

    const cx = draggedRect.left + draggedRect.width / 2 + offsetX;
    const cy = draggedRect.top + draggedRect.height / 2 + offsetY;

    let closestId: string | null = null;
    let closestDist = Infinity;

    for (const [id, rect] of Object.entries(capturedRects.current)) {
      if (id === draggedId) continue;
      const rcx = rect.left + rect.width / 2;
      const rcy = rect.top + rect.height / 2;
      const dist = Math.hypot(cx - rcx, cy - rcy);
      if (dist < closestDist) {
        closestDist = dist;
        closestId = id;
      }
    }

    if (closestId && closestDist < 90) {
      setHomeApps((prev) => {
        const next = [...prev];
        const fromIdx = next.findIndex((a) => a.id === draggedId);
        const toIdx = next.findIndex((a) => a.id === closestId);
        if (fromIdx !== -1 && toIdx !== -1) {
          [next[fromIdx], next[toIdx]] = [next[toIdx], next[fromIdx]];
        }
        return next;
      });
    }
  }, []);

  const handleOpenApp = (app: AppEntry) => {
    if (editMode) {
      setEditMode(false);
      return;
    }
    cancelLongPress();
    playSound('click');
    if (app.href) {
      window.open(app.href, '_blank', 'noopener,noreferrer');
      return;
    }
    setActiveApp((current) => (current === app.id ? null : app.id));
  };

  const handleCloseApp = () => {
    playSound('click');
    setActiveApp(null);
  };

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden overscroll-none bg-black text-white">

      {/* ── Springboard Wallpaper ────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_55%_at_50%_-8%,rgba(99,55,215,0.60),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_10%_70%,rgba(30,80,200,0.35),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_90%_85%,rgba(15,100,90,0.30),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_75%_25%,rgba(160,50,200,0.22),transparent)]" />
      </div>

      {/* ── Control Center ───────────────────────────────────────────────── */}
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

      {/* ── Edit mode banner ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[env(safe-area-inset-top,12px)] left-0 right-0 z-30 flex justify-center"
          >
            <div className="flex items-center gap-3 rounded-full bg-black/60 backdrop-blur-xl px-5 py-2 ring-1 ring-white/15">
              <span className="text-xs text-white/70">Arraste para reorganizar</span>
              <button
                onClick={() => setEditMode(false)}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                Concluído
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Springboard App Grid ─────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 pt-6 pb-2">
        <div className="grid grid-cols-3 gap-x-5 gap-y-9 px-4">
          {homeApps.map((app) => (
            <div key={app.id} className="flex flex-col items-center gap-[10px]">
              <motion.div
                ref={(el) => { iconRefs.current[app.id] = el; }}
                layout
                layoutId={`icon-${app.id}`}
                animate={
                  editMode
                    ? {
                        rotate: [0, -2, 2, -2, 2, 0],
                        transition: { repeat: Infinity, repeatType: 'loop', duration: 0.45, ease: 'easeInOut' },
                      }
                    : { rotate: 0 }
                }
                drag={editMode}
                dragMomentum={false}
                dragElastic={0.12}
                onDragStart={captureRects}
                onDragEnd={(_, info) => handleDragEnd(app.id, info.offset.x, info.offset.y)}
                whileTap={!editMode ? { scale: 0.86 } : undefined}
                transition={{ layout: { type: 'spring', stiffness: 380, damping: 28 } }}
                className={editMode ? 'z-20 cursor-grab active:cursor-grabbing' : ''}
                onTouchStart={() => {
                  if (!editMode && !activeApp) {
                    longPressTimer.current = setTimeout(enterEditMode, 600);
                  }
                }}
                onTouchEnd={cancelLongPress}
                onTouchMove={cancelLongPress}
                onMouseDown={() => {
                  if (!editMode && !activeApp) {
                    longPressTimer.current = setTimeout(enterEditMode, 600);
                  }
                }}
                onMouseUp={cancelLongPress}
              >
                <button
                  onClick={() => handleOpenApp(app)}
                  className={`app-icon relative h-[72px] w-[72px] bg-gradient-to-br ${app.gradient} flex items-center justify-center overflow-hidden cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/10 pointer-events-none" />
                  <app.icon className="h-[34px] w-[34px] text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
                </button>
              </motion.div>
              <span className="text-[11px] font-medium text-white/90 tracking-[0.01em] drop-shadow-md select-none text-center leading-tight max-w-[80px]">
                {app.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Page Indicator Dots ───────────────────────────────────────────── */}
      {!activeApp && !editMode && (
        <div className="relative z-10 flex items-center justify-center gap-[6px] pb-4">
          <div className="h-[7px] w-[18px] rounded-full bg-white/85" />
          <div className="h-[7px] w-[7px] rounded-full bg-white/28" />
          <div className="h-[7px] w-[7px] rounded-full bg-white/28" />
        </div>
      )}

      {/* ── Dock ─────────────────────────────────────────────────────────── */}
      {!activeApp && !editMode && (
        <div className="relative z-[50] flex-shrink-0 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+18px)]">
          <div className="liquid-glass-dock relative flex h-[84px] items-center justify-around rounded-[30px] px-4">
            {DOCK_APPS.map((app) => (
              <motion.button
                key={app.id}
                whileTap={{ scale: 0.86 }}
                transition={{ type: 'spring', stiffness: 520, damping: 28 }}
                onClick={() => handleOpenApp(app)}
                className={`app-icon relative h-[60px] w-[60px] bg-gradient-to-br ${app.gradient} flex items-center justify-center overflow-hidden cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/10 pointer-events-none" />
                <app.icon className="h-7 w-7 text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* ── Full-Screen App Sheet ─────────────────────────────────────────── */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            initial={{ y: '100%', scale: 0.97, opacity: 0.6 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: '100%', scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', damping: 27, stiffness: 310, mass: 0.85 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.25 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y > 60 || info.velocity.y > 400) handleCloseApp();
            }}
            className="absolute inset-0 z-40 flex flex-col overflow-hidden"
            style={{ touchAction: 'none' }}
          >
            {/* App background */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-[#110e2a] to-[#090912]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(80,40,180,0.4),transparent)] pointer-events-none" />

            {/* Swipe handle */}
            <div className="relative z-10 flex flex-col items-center pt-[env(safe-area-inset-top,12px)] pb-2 shrink-0">
              <div className="h-[5px] w-[48px] rounded-full bg-white/30 mt-2" />
            </div>

            {/* App content */}
            <div
              className="relative flex-1 min-h-0 overflow-hidden pb-[env(safe-area-inset-bottom,0px)]"
              style={{ touchAction: 'auto' }}
            >
              <AppRegistry appId={activeApp} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
