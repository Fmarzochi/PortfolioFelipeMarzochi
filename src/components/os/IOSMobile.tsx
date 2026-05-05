'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { X, Map as MapIcon, Image as ImageIcon } from 'lucide-react';

/* Portfolio universal icon — briefcase + </> */
const PortfolioIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M9 13.5l-2 1.5 2 1.5" />
    <path d="M15 13.5l2 1.5-2 1.5" />
    <line x1="13" y1="12" x2="11" y2="17" />
  </svg>
);
import { AppRegistry } from '../apps/AppRegistry';
import { playSound } from '../../utils/audioEngine';
import { useOSContext } from '../../contexts/OSContext';

/* ── SVG Icons ────────────────────────────────────────────────────────────── */
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
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.338.627 4.532 1.723 6.426L2.667 29.333l7.14-1.689A13.267 13.267 0 0016 29.333c7.364 0 13.333-5.97 13.333-13.333S23.364 2.667 16 2.667z" fill="white" />
    <path d="M21.92 18.613c-.32-.16-1.893-.933-2.187-.96-.293-.027-.506-.16-.72.16-.213.32-.826 1.04-.986 1.253-.16.213-.346.24-.666.08-.32-.16-1.36-.5-2.587-1.6-.96-.853-1.6-1.907-1.787-2.227-.186-.32-.02-.493.14-.653.143-.143.32-.373.48-.56.16-.186.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.627-.52-.533-.72-.547-.187-.013-.4-.013-.614-.013-.213 0-.56.08-.853.373-.293.293-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.826.76.333 1.36.534 1.826.694.76.24 1.453.2 2 .12.613-.093 1.893-.773 2.16-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z" fill="white" />
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
  { id: 'maps',   title: 'Experiência Profissional', icon: MapIcon,      gradient: 'from-emerald-500 via-green-400 to-teal-400'  },
  { id: 'skills', title: 'Skills',                   icon: SkillsIcon,   gradient: 'from-slate-500 via-slate-600 to-slate-700'   },
  { id: 'safari', title: 'Portfólio',               icon: PortfolioIcon, gradient: 'from-blue-500 via-blue-400 to-cyan-400'      },
  { id: 'photos', title: 'Galeria de Projetos',      icon: ImageIcon,    gradient: 'from-pink-500 via-purple-500 to-violet-600'  },
  { id: 'finder', title: 'Diplomas',                 icon: DiplomasIcon, gradient: 'from-amber-400 via-orange-400 to-orange-500' },
];

const DOCK_APPS: AppEntry[] = [
  { id: 'messages', title: 'Contato',  icon: WhatsAppIcon, gradient: 'from-[#25D366] via-[#1ebe5d] to-[#128C7E]'                                        },
  { id: 'linkedin', title: 'LinkedIn', icon: LinkedInIcon, gradient: 'from-[#0A66C2] to-[#0077B5]', href: 'https://www.linkedin.com/in/felipemarzochi/' },
  { id: 'github',   title: 'GitHub',   icon: GitHubIcon,   gradient: 'from-[#24292e] to-[#040d21]',  href: 'https://github.com/Fmarzochi'                },
];

const ALL_APPS = [...DEFAULT_HOME_APPS, ...DOCK_APPS];

/* ── App Switcher Card ────────────────────────────────────────────────────── */
const SwitcherCard = ({
  app,
  isActive,
  onTap,
  onClose,
}: {
  app: AppEntry;
  isActive: boolean;
  onTap: () => void;
  onClose: () => void;
}) => (
  <motion.div
    className={`relative flex-shrink-0 w-[148px] h-[240px] rounded-2xl overflow-hidden cursor-pointer ${isActive ? 'ring-2 ring-blue-500/70' : 'ring-1 ring-white/15'}`}
    drag="y"
    dragConstraints={{ top: -220, bottom: 20 }}
    dragMomentum={false}
    onDragEnd={(_: unknown, info: PanInfo) => {
      if (info.offset.y < -70 || info.velocity.y < -450) onClose();
    }}
    whileTap={{ scale: 0.96 }}
    onClick={onTap}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-20`} />
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/90 to-[#090912]/95 flex flex-col items-center justify-center gap-3">
      <div className={`h-16 w-16 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
        <app.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
      </div>
      <span className="text-sm font-semibold text-white/90 text-center px-2 leading-tight">{app.title}</span>
    </div>
    <button
      onClick={e => { e.stopPropagation(); onClose(); }}
      className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/60 ring-1 ring-white/20 flex items-center justify-center z-10"
    >
      <X size={11} className="text-white" />
    </button>
    <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
      <span className="text-[10px] text-white/25">↑ fechar</span>
    </div>
  </motion.div>
);

/* ── Main Component ───────────────────────────────────────────────────────── */
export const IOSMobile = () => {
  const { wallpaperStyle, wallpaperIndex, prevWallpaperStyle } = useOSContext();

  const [homeApps, setHomeApps] = useState([...DEFAULT_HOME_APPS]);
  const [openApps, setOpenApps]   = useState<AppEntry[]>([]);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [showSwitcher, setShowSwitcher] = useState(false);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [previewTargetIdx, setPreviewTargetIdx] = useState<number | null>(null);
  const [showDragHint, setShowDragHint] = useState(false);

  // dock mini-menu
  const [dockMenu, setDockMenu] = useState<{ app: AppEntry; x: number; y: number } | null>(null);
  // long-press timer for dock
  const dockPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const appDragControls = useDragControls();
  const iconRefs  = useRef<Record<string, HTMLDivElement | null>>({});
  const capturedRects = useRef<Record<string, DOMRect>>({});
  const gridRef   = useRef<HTMLDivElement | null>(null);

  /* ios-open-app event (ContextMenu → mobile) */
  useEffect(() => {
    const handler = (e: Event) => {
      const { appId } = (e as CustomEvent<{ appId: string }>).detail;
      const app = ALL_APPS.find(a => a.id === appId);
      if (app) openApp(app);
    };
    document.addEventListener('ios-open-app', handler);
    return () => document.removeEventListener('ios-open-app', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Show swipe-down hint once per session on first app open */
  useEffect(() => {
    if (!activeAppId) return;
    const hintShown = sessionStorage.getItem('app-drag-hint-shown');
    if (!hintShown) {
      setShowDragHint(true);
      sessionStorage.setItem('app-drag-hint-shown', '1');
      const t = setTimeout(() => setShowDragHint(false), 2800);
      return () => clearTimeout(t);
    }
  }, [activeAppId]);

  /* ── App management ─────────────────────────────────────────────────────── */
  const openApp = useCallback((app: AppEntry) => {
    if (app.href) { window.open(app.href, '_blank', 'noopener,noreferrer'); return; }
    playSound('click');
    setOpenApps(prev =>
      prev.find(a => a.id === app.id)
        ? [app, ...prev.filter(a => a.id !== app.id)]
        : [app, ...prev]
    );
    setActiveAppId(app.id);
    setShowSwitcher(false);
    setDockMenu(null);
  }, []);

  const goHome = useCallback(() => {
    playSound('click');
    setActiveAppId(null);
    setShowSwitcher(false);
  }, []);

  const closeApp = useCallback((appId: string) => {
    playSound('click');
    setOpenApps(prev => {
      const next = prev.filter(a => a.id !== appId);
      if (next.length === 0) setShowSwitcher(false);
      return next;
    });
    setActiveAppId(prev => prev === appId ? null : prev);
  }, []);

  /* ── Drag-to-reorder ────────────────────────────────────────────────────── */
  const captureRects = useCallback(() => {
    for (const [id, el] of Object.entries(iconRefs.current)) {
      if (el) capturedRects.current[id] = el.getBoundingClientRect();
    }
  }, []);

  const getTargetIdx = useCallback((draggedId: string, info: PanInfo): number => {
    const rect = capturedRects.current[draggedId];
    if (!rect || !gridRef.current) return -1;
    const cx = rect.left + rect.width / 2 + info.offset.x;
    const cy = rect.top  + rect.height / 2 + info.offset.y;
    const grid = gridRef.current.getBoundingClientRect();
    const cols = 3;
    const numRows = Math.ceil(homeApps.length / cols);
    const col = Math.max(0, Math.min(cols - 1, Math.floor((cx - grid.left) / (grid.width / cols))));
    const row = Math.max(0, Math.min(numRows - 1, Math.floor((cy - grid.top) / (grid.height / numRows))));
    return row * cols + col;
  }, [homeApps.length]);

  /* Live reorder preview during drag */
  const displayApps = useMemo(() => {
    if (!draggingId || previewTargetIdx === null) return homeApps;
    const fromIdx = homeApps.findIndex(a => a.id === draggingId);
    if (fromIdx === -1 || fromIdx === previewTargetIdx) return homeApps;
    const next = [...homeApps];
    const [item] = next.splice(fromIdx, 1);
    next.splice(previewTargetIdx, 0, item);
    return next;
  }, [homeApps, draggingId, previewTargetIdx]);

  /* ── Dock long-press helpers ─────────────────────────────────────────────── */
  const startDockPress = (app: AppEntry, x: number, y: number) => {
    dockPressTimer.current = setTimeout(() => {
      setDockMenu({ app, x, y });
    }, 500);
  };
  const cancelDockPress = () => {
    if (dockPressTimer.current) clearTimeout(dockPressTimer.current);
  };

  const isHomeVisible = !activeAppId && !showSwitcher;

  return (
    <div
      className="relative flex flex-col h-full w-full overflow-hidden overscroll-none bg-black text-white"
      onClick={() => setDockMenu(null)}
    >

      {/* ── Wallpaper (uses OSContext so cycleWallpaper works) ────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Previous wallpaper — base layer for crossfade */}
        <div className="absolute inset-0" style={{ background: prevWallpaperStyle }} />
        {/* Current wallpaper — fades in on change */}
        <motion.div
          key={wallpaperIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ background: wallpaperStyle }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_55%_at_50%_-8%,rgba(99,55,215,0.55),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_10%_70%,rgba(30,80,200,0.30),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_90%_85%,rgba(15,100,90,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_75%_25%,rgba(160,50,200,0.18),transparent)]" />
      </div>

      {/* ── Springboard App Grid ─────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 pt-6 pb-2">
        <div ref={gridRef} className="grid grid-cols-3 gap-x-5 gap-y-9 px-4">
          {displayApps.map((app) => (
            <motion.div
              key={app.id}
              ref={el => { iconRefs.current[app.id] = el; }}
              layout={draggingId !== app.id}
              layoutId={`icon-${app.id}`}
              drag={true}
              dragMomentum={false}
              dragElastic={0.08}
              style={{ zIndex: draggingId === app.id ? 50 : 1, position: 'relative', touchAction: 'none' }}
              animate={{ scale: draggingId === app.id ? 1.13 : 1 }}
              transition={{ layout: { type: 'spring', stiffness: 380, damping: 28 } }}
              className="flex flex-col items-center gap-[10px]"
              onDragStart={() => {
                if (!isHomeVisible) return;
                captureRects();
                setDraggingId(app.id);
              }}
              onDrag={(_: unknown, info: PanInfo) => {
                if (!isHomeVisible) return;
                const t = getTargetIdx(app.id, info);
                setPreviewTargetIdx(t >= 0 ? t : null);
              }}
              onDragEnd={(_: unknown, info: PanInfo) => {
                if (!isHomeVisible) return;
                const moved = Math.abs(info.offset.x) + Math.abs(info.offset.y) > 12;
                if (moved) {
                  setHomeApps([...displayApps]);
                } else {
                  openApp(app);
                }
                setDraggingId(null);
                setPreviewTargetIdx(null);
              }}
              onContextMenu={e => {
                e.preventDefault();
                (e.nativeEvent as Event).stopImmediatePropagation();
              }}
            >
              <div className={`app-icon relative h-[72px] w-[72px] bg-gradient-to-br ${app.gradient} flex items-center justify-center overflow-hidden cursor-pointer`}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/10 pointer-events-none" />
                <app.icon className="h-[34px] w-[34px] text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-medium text-white/90 tracking-[0.01em] drop-shadow-md select-none text-center leading-tight max-w-[80px]">
                {app.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Page Indicator Dots ───────────────────────────────────────────── */}
      {isHomeVisible && (
        <div className="relative z-10 flex items-center justify-center gap-[6px] pb-2">
          <div className="h-[7px] w-[18px] rounded-full bg-white/85" />
        </div>
      )}

      {/* ── Open Apps Button (shows switcher) ────────────────────────────── */}
      {isHomeVisible && openApps.length > 0 && (
        <div className="relative z-10 flex justify-center pb-2">
          <button
            onClick={() => setShowSwitcher(true)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-xs text-white/70 hover:bg-white/15 transition-colors"
          >
            <span>{openApps.length} app{openApps.length > 1 ? 's' : ''} aberto{openApps.length > 1 ? 's' : ''}</span>
          </button>
        </div>
      )}

      {/* ── Dock ─────────────────────────────────────────────────────────── */}
      {isHomeVisible && (
        <div className="relative z-50 flex-shrink-0 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+18px)]">
          <div className="liquid-glass-dock relative flex h-[84px] items-center justify-around rounded-[30px] px-4">
            {DOCK_APPS.map(app => (
              <motion.button
                key={app.id}
                whileTap={{ scale: 0.86 }}
                transition={{ type: 'spring', stiffness: 520, damping: 28 }}
                onClick={() => { cancelDockPress(); openApp(app); }}
                onContextMenu={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDockMenu({ app, x: e.clientX, y: e.clientY });
                }}
                onTouchStart={e => {
                  e.stopPropagation();
                  startDockPress(app, e.touches[0].clientX, e.touches[0].clientY);
                }}
                onTouchEnd={cancelDockPress}
                onTouchMove={cancelDockPress}
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
        {activeAppId && (
          <motion.div
            key={activeAppId}
            drag="y"
            dragControls={appDragControls}
            dragListener={false}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.28 }}
            dragMomentum={false}
            onDragEnd={(_: unknown, info: PanInfo) => {
              if (info.offset.y > 60 || info.velocity.y > 380) goHome();
            }}
            initial={{ y: '100%', scale: 0.97, opacity: 0.6 }}
            animate={{ y: 0, scale: 1, opacity: 1, transition: { type: 'spring', damping: 27, stiffness: 310, mass: 0.85 } }}
            exit={{ y: '100%', opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } }}
            style={{ pointerEvents: activeAppId ? 'auto' : 'none' }}
            className="absolute inset-0 z-40 flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-[#110e2a] to-[#090912]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(80,40,180,0.4),transparent)] pointer-events-none" />

            {/* Drag handle */}
            <div
              className="relative z-10 flex flex-col items-center shrink-0 cursor-grab pt-[env(safe-area-inset-top,12px)] pb-3"
              onPointerDown={e => appDragControls.start(e)}
              style={{ touchAction: 'none' }}
            >
              <div className="h-[5px] w-[48px] rounded-full bg-white/30 mt-2" />
              <AnimatePresence>
                {showDragHint && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1.5 text-[10px] text-white/35 pointer-events-none"
                  >
                    ↓ arraste para fechar
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* App content */}
            <div className="relative flex-1 min-h-0 overflow-hidden">
              <AppRegistry appId={activeAppId} />
            </div>

            {/* Home indicator */}
            <div
              onClick={goHome}
              className="relative z-10 flex items-center justify-center h-8 shrink-0 cursor-pointer pb-[env(safe-area-inset-bottom,0px)]"
            >
              <div className="h-[5px] w-32 rounded-full bg-white/25" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── App Switcher ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSwitcher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 flex flex-col backdrop-blur-2xl bg-black/55"
          >
            <div className="pt-[env(safe-area-inset-top,24px)] pb-3 flex justify-center">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">Apps Recentes</p>
            </div>

            <div className="flex-1 flex items-center px-6 gap-4 overflow-x-auto pb-4">
              {openApps.map(app => (
                <SwitcherCard
                  key={app.id}
                  app={app}
                  isActive={app.id === activeAppId}
                  onTap={() => { setActiveAppId(app.id); setShowSwitcher(false); }}
                  onClose={() => closeApp(app.id)}
                />
              ))}
            </div>

            <div
              onClick={() => setShowSwitcher(false)}
              className="pb-[calc(env(safe-area-inset-bottom,0px)+20px)] flex justify-center cursor-pointer"
            >
              <div className="h-[5px] w-32 rounded-full bg-white/25" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Dock Mini Menu ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {dockMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            transition={{ duration: 0.12 }}
            style={{
              top: Math.min(dockMenu.y - 110, (typeof window !== 'undefined' ? window.innerHeight : 800) - 130),
              left: Math.min(Math.max(dockMenu.x - 80, 8), (typeof window !== 'undefined' ? window.innerWidth : 400) - 168),
            }}
            className="fixed z-[9999] w-40 overflow-hidden rounded-xl border border-white/10 bg-black/75 shadow-2xl backdrop-blur-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="py-1">
              <div className="px-3 py-2 text-[11px] font-bold text-white/40 uppercase tracking-wider truncate">
                {dockMenu.app.title}
              </div>
              <div className="h-px bg-white/10" />
              <button
                onClick={() => openApp(dockMenu.app)}
                className="flex w-full items-center px-3 py-2.5 text-left text-sm text-white/85 hover:bg-white/10 transition-colors"
              >
                Abrir
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

    </div>
  );
};
