'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { AppRegistry } from '../apps/AppRegistry';
import { playSound } from '../../utils/audioEngine';
import { useOSContext } from '../../contexts/OSContext';
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

type AppEntry = {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  gradient: string;
  href?: string;
};

const DEFAULT_HOME_APPS: AppEntry[] = [
  { id: 'maps',   title: 'Experiência', icon: BuildingOfficeIcon, gradient: 'from-emerald-500 via-green-400 to-teal-400'  },
  { id: 'skills', title: 'Skills',      icon: CommandLineIcon,    gradient: 'from-slate-500 via-slate-600 to-slate-700'   },
  { id: 'safari', title: 'Portfólio',   icon: GlobeAltIcon,       gradient: 'from-blue-500 via-blue-400 to-cyan-400'      },
  { id: 'photos', title: 'Galeria de Projetos', icon: PhotoIcon,  gradient: 'from-pink-500 via-purple-500 to-violet-600'  },
  { id: 'finder', title: 'Diplomas',    icon: AcademicCapIcon,    gradient: 'from-amber-400 via-orange-400 to-orange-500' },
];

const DOCK_APPS: AppEntry[] = [
  { id: 'messages', title: 'Contato',  icon: WhatsAppIcon, gradient: 'from-[#25D366] via-[#1ebe5d] to-[#128C7E]'                                        },
  { id: 'linkedin', title: 'LinkedIn', icon: LinkedInIcon, gradient: 'from-[#0A66C2] to-[#0077B5]', href: 'https://www.linkedin.com/in/felipemarzochi/' },
  { id: 'github',   title: 'GitHub',   icon: GitHubIcon,   gradient: 'from-[#24292e] to-[#040d21]',  href: 'https://github.com/Fmarzochi'                },
];

const ALL_APPS = [...DEFAULT_HOME_APPS, ...DOCK_APPS];

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
    role="option"
    aria-selected={isActive}
    aria-label={`Aplicativo ${app.title} aberto`}
    drag="y"
    dragConstraints={{ top: -220, bottom: 20 }}
    dragMomentum={false}
    onDragEnd={(_: unknown, info: PanInfo) => {
      if (info.offset.y < -70 || info.velocity.y < -450) onClose();
    }}
    whileTap={{ scale: 0.96 }}
    onClick={onTap}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-20`} aria-hidden="true" />
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/90 to-[#090912]/95 flex flex-col items-center justify-center gap-3">
      <div className={`h-16 w-16 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
        <app.icon className="h-8 w-8 text-white" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <span className="text-sm font-semibold text-white/90 text-center px-2 leading-tight">{app.title}</span>
    </div>
    <button
      onClick={e => { e.stopPropagation(); onClose(); }}
      className="absolute top-0 right-0 h-11 w-11 flex items-center justify-center z-10"
      aria-label={`Fechar ${app.title}`}
    >
      <div className="h-6 w-6 rounded-full bg-black/60 ring-1 ring-white/20 flex items-center justify-center">
        <X size={11} className="text-white" aria-hidden="true" />
      </div>
    </button>
    <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
      <span className="text-[10px] text-white/25" aria-hidden="true">↑ fechar</span>
    </div>
  </motion.div>
);

export const IOSMobile = () => {
  const { wallpaperStyle, wallpaperIndex, prevWallpaperStyle } = useOSContext();

  const [homeApps, setHomeApps] = useState([...DEFAULT_HOME_APPS]);
  const [openApps, setOpenApps]   = useState<AppEntry[]>([]);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [showSwitcher, setShowSwitcher] = useState(false);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [previewTargetIdx, setPreviewTargetIdx] = useState<number | null>(null);
  const [showDragHint, setShowDragHint] = useState(false);

  const [dockMenu, setDockMenu] = useState<{ app: AppEntry; x: number; y: number } | null>(null);
  const dockPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const appDragControls = useDragControls();
  const iconRefs  = useRef<Record<string, HTMLButtonElement | null>>({});
  const capturedRects = useRef<Record<string, DOMRect>>({});
  const gridRef   = useRef<HTMLElement | null>(null);
  const iconDragged = useRef(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const { appId } = (e as CustomEvent<{ appId: string }>).detail;
      const app = ALL_APPS.find(a => a.id === appId);
      if (app) openApp(app);
    };
    document.addEventListener('ios-open-app', handler);
    return () => document.removeEventListener('ios-open-app', handler);
  }, []);

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

  const displayApps = useMemo(() => {
    if (!draggingId || previewTargetIdx === null) return homeApps;
    const fromIdx = homeApps.findIndex(a => a.id === draggingId);
    if (fromIdx === -1 || fromIdx === previewTargetIdx) return homeApps;
    const next = [...homeApps];
    const [item] = next.splice(fromIdx, 1);
    next.splice(previewTargetIdx, 0, item);
    return next;
  }, [homeApps, draggingId, previewTargetIdx]);

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

      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: prevWallpaperStyle }} />
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

      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 pt-6 pb-2">
        <nav 
          ref={gridRef} 
          className="grid grid-cols-3 gap-x-5 gap-y-9 px-4"
          aria-label="Grade de aplicativos"
          data-no-contextmenu="true"
        >
          {displayApps.map((app) => (
            <motion.button
              key={app.id}
              ref={el => { iconRefs.current[app.id] = el; }}
              layout={draggingId !== app.id}
              layoutId={`icon-${app.id}`}
              drag={isHomeVisible}
              dragMomentum={false}
              dragElastic={0.10}
              dragSnapToOrigin={true}
              style={{ zIndex: draggingId === app.id ? 50 : 1, position: 'relative', touchAction: 'none' }}
              animate={{ scale: draggingId === app.id ? 1.13 : 1 }}
              transition={{ layout: { type: 'spring', stiffness: 380, damping: 28 } }}
              className="flex flex-col items-center gap-[10px]"
              aria-label={`Abrir aplicativo ${app.title}`}
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
                <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/10 pointer-events-none" aria-hidden="true" />
                <app.icon className="h-[34px] w-[34px] text-white drop-shadow-md relative z-10" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <span className="text-[11px] font-medium text-white/90 tracking-[0.01em] drop-shadow-md select-none text-center leading-tight max-w-[80px]">
                {app.title}
              </span>
            </motion.button>
          ))}
        </nav>
      </div>

      {isHomeVisible && (
        <div className="relative z-10 flex items-center justify-center gap-[6px] pb-2">
          <div className="h-[7px] w-[18px] rounded-full bg-white/85" aria-hidden="true" />
        </div>
      )}

      {isHomeVisible && openApps.length > 0 && (
        <div className="relative z-10 flex justify-center pb-2">
          <button
            onClick={() => setShowSwitcher(true)}
            aria-label={`Mostrar alternador de aplicativos. ${openApps.length} aberto${openApps.length > 1 ? 's' : ''}`}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-white/70 transition-colors"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            <span>{openApps.length} app{openApps.length > 1 ? 's' : ''} aberto{openApps.length > 1 ? 's' : ''}</span>
          </button>
        </div>
      )}

      {isHomeVisible && (
        <div className="relative z-50 flex-shrink-0 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+18px)]">
          <nav 
            className="liquid-glass-ios-dock relative flex h-[84px] items-center justify-around rounded-[30px] px-4" 
            aria-label="Aplicativos fixos do dock"
            data-no-contextmenu="true"
          >
            {DOCK_APPS.map(app => (
              <motion.button
                key={app.id}
                whileTap={{ scale: 0.86 }}
                transition={{ type: 'spring', stiffness: 520, damping: 28 }}
                onClick={() => { cancelDockPress(); openApp(app); }}
                aria-label={`Abrir aplicativo ${app.title}`}
                onContextMenu={e => {
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                  setDockMenu({ app, x: e.clientX, y: e.clientY });
                }}
                onTouchStart={e => {
                  e.nativeEvent.stopImmediatePropagation();
                  startDockPress(app, e.touches[0].clientX, e.touches[0].clientY);
                }}
                onTouchEnd={cancelDockPress}
                onTouchMove={cancelDockPress}
                className={`app-icon relative h-[60px] w-[60px] bg-gradient-to-br ${app.gradient} flex items-center justify-center overflow-hidden cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/10 pointer-events-none" aria-hidden="true" />
                <app.icon className="h-7 w-7 text-white drop-shadow-md relative z-10" strokeWidth={1.5} aria-hidden="true" />
              </motion.button>
            ))}
          </nav>
        </div>
      )}

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
            role="dialog"
            aria-label={`Aplicativo ${ALL_APPS.find(a => a.id === activeAppId)?.title} em execução`}
            aria-modal="true"
            className="absolute inset-0 z-40 flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-[#110e2a] to-[#090912]" aria-hidden="true" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(80,40,180,0.4),transparent)] pointer-events-none" aria-hidden="true" />

            <div
              className="relative z-10 flex flex-col items-center shrink-0 cursor-grab pt-[env(safe-area-inset-top,12px)] pb-3"
              onPointerDown={e => appDragControls.start(e)}
              style={{ touchAction: 'none' }}
              aria-hidden="true"
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

            <div className="relative flex-1 min-h-0 overflow-hidden">
              <AppRegistry appId={activeAppId} />
            </div>

            <button
              onClick={goHome}
              aria-label="Voltar para a tela de início"
              className="relative z-10 flex items-center justify-center h-8 shrink-0 cursor-pointer pb-[env(safe-area-inset-bottom,0px)]"
            >
              <div className="h-[5px] w-32 rounded-full bg-white/25" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSwitcher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 flex flex-col"
            style={{ backdropFilter: 'blur(40px) saturate(160%)', WebkitBackdropFilter: 'blur(40px) saturate(160%)', background: 'rgba(10,10,16,0.6)' }}
            role="listbox"
            aria-label="Alternador de aplicativos abertos"
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

            <button
              onClick={() => setShowSwitcher(false)}
              aria-label="Fechar alternador de aplicativos"
              className="pb-[calc(env(safe-area-inset-bottom,0px)+20px)] flex justify-center cursor-pointer"
            >
              <div className="h-[5px] w-32 rounded-full bg-white/25" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
            className="fixed z-[9999] w-40 overflow-hidden rounded-xl liquid-glass-context-menu"
            onClick={e => e.stopPropagation()}
            role="menu"
            aria-label={`Menu de contexto do aplicativo ${dockMenu.app.title}`}
          >
            <div className="py-1">
              <div className="px-3 py-2 text-[11px] font-bold text-white/40 uppercase tracking-wider truncate" aria-hidden="true">
                {dockMenu.app.title}
              </div>
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.1)' }} aria-hidden="true" />
              <button
                onClick={() => openApp(dockMenu.app)}
                className="flex w-full items-center px-3 py-2.5 text-left text-[13px] text-white/85 transition-colors"
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = ''; }}
                role="menuitem"
              >
                Abrir
              </button>
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.1)' }} aria-hidden="true" />
              <button
                onClick={() => window.location.reload()}
                className="flex w-full items-center px-3 py-2.5 text-left text-[13px] text-white/85 transition-colors"
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = ''; }}
                role="menuitem"
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
