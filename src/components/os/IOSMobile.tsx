'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';

/* ── Heroicons Solid — busca de SVG oficial heroicons.com ─────────────────── */
const ClockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" />
  </svg>
);

const CommandLineIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M2.25 6A3.75 3.75 0 0 1 6 2.25h12A3.75 3.75 0 0 1 21.75 6v12A3.75 3.75 0 0 1 18 21.75H6A3.75 3.75 0 0 1 2.25 18V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
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

import { AppRegistry } from '../apps/AppRegistry';
import { playSound } from '../../utils/audioEngine';
import { useOSContext } from '../../contexts/OSContext';


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
  { id: 'maps',   title: 'Experiência', icon: ClockIcon,       gradient: 'from-emerald-500 via-green-400 to-teal-400'  },
  { id: 'skills', title: 'Skills',      icon: CommandLineIcon, gradient: 'from-slate-500 via-slate-600 to-slate-700'   },
  { id: 'safari', title: 'Portfólio',   icon: UserIcon,        gradient: 'from-blue-500 via-blue-400 to-cyan-400'      },
  { id: 'photos', title: 'Galeria',     icon: PhotoIcon,       gradient: 'from-pink-500 via-purple-500 to-violet-600'  },
  { id: 'finder', title: 'Diplomas',    icon: AcademicCapIcon, gradient: 'from-amber-400 via-orange-400 to-orange-500' },
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
  const iconDragged = useRef(false);

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
              onClick={() => {
                if (!isHomeVisible || iconDragged.current) return;
                openApp(app);
              }}
              onDragStart={() => {
                if (!isHomeVisible) return;
                iconDragged.current = true;
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
                const moved = Math.abs(info.offset.x) + Math.abs(info.offset.y) > 8;
                if (moved) setHomeApps([...displayApps]);
                setDraggingId(null);
                setPreviewTargetIdx(null);
                setTimeout(() => { iconDragged.current = false; }, 50);
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
