'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useWindowManager, WindowState } from '../../store/useWindowManager';
import { useIsMobile } from '../../hooks/useIsMobile';
import { FocusTrap } from '../common/FocusTrap';

interface AppWindowProps {
  windowState: WindowState;
  children: React.ReactNode;
  isActive: boolean;
}

type ResizeEdge = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

const MIN_W = 400;
const MIN_H = 300;
const TOPBAR_H = 28;

const CURSORS: Record<ResizeEdge, string> = {
  n: 'ns-resize', ne: 'nesw-resize', e: 'ew-resize', se: 'nwse-resize',
  s: 'ns-resize', sw: 'nesw-resize', w: 'ew-resize', nw: 'nwse-resize',
};

export const AppWindow = ({ windowState, children, isActive }: AppWindowProps) => {
  const { closeApp, minimizeApp, toggleFullScreen, focusApp, updatePosition, updatePositionAndSize } = useWindowManager();
  const { id, title, isMinimized, isFullScreen, x, y, width, height, zIndex } = windowState;
  const isMobile = useIsMobile();
  const isDraggingTitle = useRef(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });

  const w = width ?? 860;
  const h = height ?? 560;
  const titleId = `window-title-${id}`;

  const onTitleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isFullScreen || isMobile || e.button !== 0) return;
    e.preventDefault();
    focusApp(id);
    isDraggingTitle.current = true;
    dragStart.current = { mouseX: e.clientX, mouseY: e.clientY, winX: x, winY: y };

    const onMove = (ev: MouseEvent) => {
      if (!isDraggingTitle.current) return;
      const nx = dragStart.current.winX + ev.clientX - dragStart.current.mouseX;
      const ny = dragStart.current.winY + ev.clientY - dragStart.current.mouseY;
      
      const clampedX = Math.max(-(w / 2), Math.min(nx, window.innerWidth - 100));
      const clampedY = Math.max(TOPBAR_H, Math.min(ny, window.innerHeight - 100));
      
      updatePosition(id, clampedX, clampedY);
    };

    const onUp = () => {
      isDraggingTitle.current = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onUp);
  }, [id, isFullScreen, isMobile, x, y, w, focusApp, updatePosition]);

  const startResize = useCallback((e: React.MouseEvent, edge: ResizeEdge) => {
    if (isFullScreen || isMobile || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    focusApp(id);

    const snap = { startX: e.clientX, startY: e.clientY, startW: w, startH: h, startLeft: x, startTop: y };

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - snap.startX;
      const dy = ev.clientY - snap.startY;
      let newW = snap.startW, newH = snap.startH, newX = snap.startLeft, newY = snap.startTop;

      if (edge.includes('e')) newW = Math.max(MIN_W, snap.startW + dx);
      if (edge.includes('s')) newH = Math.max(MIN_H, snap.startH + dy);
      if (edge.includes('w')) { newW = Math.max(MIN_W, snap.startW - dx); newX = snap.startLeft + (snap.startW - newW); }
      if (edge.includes('n')) { newH = Math.max(MIN_H, snap.startH - dy); newY = Math.max(TOPBAR_H, snap.startTop + (snap.startH - newH)); }

      updatePositionAndSize(id, newX, newY, newW, newH);
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = CURSORS[edge];
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onUp);
  }, [id, isFullScreen, isMobile, x, y, w, h, focusApp, updatePositionAndSize]);

  if (isMinimized) return null;

  return (
    <div
      onPointerDown={(e) => {
        e.stopPropagation();
        focusApp(id);
      }}
      role="region"
      aria-labelledby={titleId}
      aria-roledescription="janela"
      style={{
        position: 'absolute',
        zIndex,
        left: isFullScreen ? 0 : x,
        top: isFullScreen ? 0 : y,
        width: isFullScreen ? '100vw' : w,
        height: isFullScreen ? '100dvh' : h,
      }}
      className={`flex flex-col overflow-hidden liquid-glass-window
        max-md:!fixed max-md:!inset-0 max-md:!w-screen max-md:!h-[100dvh] max-md:!rounded-none max-md:!top-0 max-md:!left-0
        ${isFullScreen ? '!rounded-none' : 'rounded-[14px]'}
        ${isActive ? 'shadow-2xl ring-1 ring-white/20' : 'shadow-lg ring-1 ring-white/10'}
      `}
    >
      {!isFullScreen && (
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/32 to-transparent pointer-events-none z-10" aria-hidden="true" />
      )}

      {!isFullScreen && !isMobile && (
        <>
          <div className="absolute inset-x-4 top-0 h-[10px] cursor-ns-resize z-30"    onMouseDown={(e) => startResize(e, 'n')} aria-hidden="true" />
          <div className="absolute inset-x-4 bottom-0 h-[10px] cursor-ns-resize z-30"  onMouseDown={(e) => startResize(e, 's')} aria-hidden="true" />
          <div className="absolute inset-y-4 left-0 w-[10px] cursor-ew-resize z-30"   onMouseDown={(e) => startResize(e, 'w')} aria-hidden="true" />
          <div className="absolute inset-y-4 right-0 w-[10px] cursor-ew-resize z-30"  onMouseDown={(e) => startResize(e, 'e')} aria-hidden="true" />
          <div className="absolute top-0 left-0 h-6 w-6 cursor-nwse-resize z-30"   onMouseDown={(e) => startResize(e, 'nw')} aria-hidden="true" />
          <div className="absolute top-0 right-0 h-6 w-6 cursor-nesw-resize z-30"  onMouseDown={(e) => startResize(e, 'ne')} aria-hidden="true" />
          <div className="absolute bottom-0 left-0 h-6 w-6 cursor-nesw-resize z-30" onMouseDown={(e) => startResize(e, 'sw')} aria-hidden="true" />
          <div className="absolute bottom-0 right-0 h-6 w-6 cursor-nwse-resize z-30" onMouseDown={(e) => startResize(e, 'se')} aria-hidden="true" />
        </>
      )}

      <div
        className={`relative flex h-11 w-full flex-shrink-0 items-center justify-between px-4 select-none
          ${!isFullScreen && !isMobile ? 'cursor-move' : ''}
        `}
        style={{
          background: 'rgba(40,40,42,0.85)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.2)',
        }}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={() => toggleFullScreen(id)}
      >
        <div className="flex items-center gap-[7px]">
          <button
            onClick={(e) => { e.stopPropagation(); closeApp(id); }}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label={`Fechar ${title}`}
            className={`group flex h-[13px] w-[13px] items-center justify-center rounded-full ring-1 ring-black/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${isActive ? 'bg-[#FF5F57] hover:bg-[#e04e47] shadow-[0_1px_3px_rgba(255,95,87,0.5)]' : 'bg-[#6B6B6B]'}`}
          >
            <X size={8} className="opacity-0 group-hover:opacity-100 text-[#4d0000]" strokeWidth={2.5} aria-hidden="true" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label={`Minimizar ${title}`}
            className={`group flex h-[13px] w-[13px] items-center justify-center rounded-full ring-1 ring-black/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${isActive ? 'bg-[#FEBC2E] hover:bg-[#e0a426] shadow-[0_1px_3px_rgba(254,188,46,0.5)]' : 'bg-[#6B6B6B]'}`}
          >
            <Minus size={8} className="opacity-0 group-hover:opacity-100 text-[#4d3500]" strokeWidth={2.5} aria-hidden="true" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleFullScreen(id); }}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label={isFullScreen ? `Sair da tela cheia de ${title}` : `Maximizar ${title}`}
            className={`group flex h-[13px] w-[13px] items-center justify-center rounded-full ring-1 ring-black/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${isActive ? 'bg-[#28C840] hover:bg-[#22a835] shadow-[0_1px_3px_rgba(40,200,64,0.5)]' : 'bg-[#6B6B6B]'}`}
          >
            <Maximize2 size={7} className="opacity-0 group-hover:opacity-100 text-[#004d00]" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        <div className="pointer-events-none text-[13px] font-semibold tracking-wide text-white/70" id={titleId}>
          {title}
        </div>

        <div className="w-[58px]" aria-hidden="true" />
      </div>

      <div
        className="relative flex-1 overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <FocusTrap isActive={isActive} onEscape={() => closeApp(id)}>
          {children}
        </FocusTrap>
      </div>
    </div>
  );
};
