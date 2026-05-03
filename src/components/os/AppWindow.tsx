'use client';

import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useWindowManager, WindowState } from '../../store/useWindowManager';
import { useIsMobile } from '../../hooks/useIsMobile';

interface AppWindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const AppWindow = ({ windowState, children }: AppWindowProps) => {
  const { closeApp, minimizeApp, toggleFullScreen, focusApp, updatePosition } = useWindowManager();
  const { id, title, isMinimized, isFullScreen, x, y, zIndex } = windowState;
  const isMobile = useIsMobile();

  if (isMinimized) return null;

  return (
    <motion.div
      drag={!isFullScreen && !isMobile}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        updatePosition(id, x + info.offset.x, y + info.offset.y);
      }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: isFullScreen ? 0 : x,
        y: isFullScreen ? 0 : y,
        width: isFullScreen ? '100vw' : 850,
        height: isFullScreen ? '100vh' : 550,
      }}
      transition={{ type: 'spring', damping: 26, stiffness: 290 }}
      onPointerDown={() => focusApp(id)}
      style={{ zIndex }}
      className={`absolute flex flex-col overflow-hidden liquid-glass-window
        max-md:!fixed max-md:!inset-0 max-md:!w-screen max-md:!h-[100dvh] max-md:![transform:none] max-md:!rounded-none max-md:!top-0 max-md:!left-0
        ${isFullScreen ? 'top-0 left-0 !rounded-none' : 'rounded-[14px]'}
      `}
    >
      {/* Specular highlight at the top edge of the window */}
      {!isFullScreen && (
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/32 to-transparent pointer-events-none z-10" />
      )}

      {/* ── Title Bar ─────────────────────────────────────────────────────── */}
      <div
        className="relative flex h-11 w-full flex-shrink-0 items-center justify-between px-4 bg-white/[0.04] border-b border-white/[0.07]"
        onDoubleClick={() => toggleFullScreen(id)}
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-[7px]">
          <button
            onClick={(e) => { e.stopPropagation(); closeApp(id); }}
            className="group flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#FF5F57] ring-1 ring-black/20 transition-colors hover:bg-[#e04e47] shadow-[0_1px_3px_rgba(255,95,87,0.5)]"
          >
            <X size={8} className="opacity-0 transition-opacity group-hover:opacity-100 text-[#4d0000]" strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
            className="group flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#FEBC2E] ring-1 ring-black/20 transition-colors hover:bg-[#e0a426] shadow-[0_1px_3px_rgba(254,188,46,0.5)]"
          >
            <Minus size={8} className="opacity-0 transition-opacity group-hover:opacity-100 text-[#4d3500]" strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleFullScreen(id); }}
            className="group flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#28C840] ring-1 ring-black/20 transition-colors hover:bg-[#22a835] shadow-[0_1px_3px_rgba(40,200,64,0.5)]"
          >
            <Maximize2 size={7} className="opacity-0 transition-opacity group-hover:opacity-100 text-[#004d00]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Window Title */}
        <div className="pointer-events-none select-none text-[13px] font-semibold tracking-wide text-white/70">
          {title}
        </div>

        {/* Spacer — mirrors traffic light width to keep title centered */}
        <div className="w-[58px]" />
      </div>

      {/* ── Content Area ──────────────────────────────────────────────────── */}
      <div
        className="relative flex-1 bg-black/8 overflow-hidden"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
};
