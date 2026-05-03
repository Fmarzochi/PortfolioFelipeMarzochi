'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useWindowManager, WindowState } from '../../store/useWindowManager';
import { useIsMobile } from '../../hooks/useIsMobile';

interface AppWindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

type ResizeEdge = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

const MIN_W = 400;
const MIN_H = 300;

const CURSORS: Record<ResizeEdge, string> = {
  n: 'ns-resize', ne: 'nesw-resize', e: 'ew-resize', se: 'nwse-resize',
  s: 'ns-resize', sw: 'nesw-resize', w: 'ew-resize', nw: 'nwse-resize',
};

export const AppWindow = ({ windowState, children }: AppWindowProps) => {
  const { closeApp, minimizeApp, toggleFullScreen, focusApp, updatePosition, updatePositionAndSize } = useWindowManager();
  const { id, title, isMinimized, isFullScreen, x, y, width, height, zIndex } = windowState;
  const isMobile = useIsMobile();
  const isDraggingTitle = useRef(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });

  /* ── Title bar drag ─────────────────────────────────────────────────── */
  const onTitleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isFullScreen || isMobile || e.button !== 0) return;
    e.preventDefault();
    focusApp(id);
    isDraggingTitle.current = true;
    dragStart.current = { mouseX: e.clientX, mouseY: e.clientY, winX: x, winY: y };

    const onMove = (ev: MouseEvent) => {
      if (!isDraggingTitle.current) return;
      updatePosition(id,
        dragStart.current.winX + ev.clientX - dragStart.current.mouseX,
        dragStart.current.winY + ev.clientY - dragStart.current.mouseY,
      );
    };
    const onUp = () => {
      isDraggingTitle.current = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [id, isFullScreen, isMobile, x, y, focusApp, updatePosition]);

  /* ── Resize ─────────────────────────────────────────────────────────── */
  const startResize = useCallback((e: React.MouseEvent, edge: ResizeEdge) => {
    if (isFullScreen || isMobile || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    focusApp(id);

    const snap = { startX: e.clientX, startY: e.clientY, startW: width ?? 860, startH: height ?? 560, startLeft: x, startTop: y };

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - snap.startX;
      const dy = ev.clientY - snap.startY;
      let newW = snap.startW, newH = snap.startH, newX = snap.startLeft, newY = snap.startTop;

      if (edge.includes('e')) newW = Math.max(MIN_W, snap.startW + dx);
      if (edge.includes('s')) newH = Math.max(MIN_H, snap.startH + dy);
      if (edge.includes('w')) { newW = Math.max(MIN_W, snap.startW - dx); newX = snap.startLeft + (snap.startW - newW); }
      if (edge.includes('n')) { newH = Math.max(MIN_H, snap.startH - dy); newY = snap.startTop + (snap.startH - newH); }

      updatePositionAndSize(id, newX, newY, newW, newH);
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = CURSORS[edge];
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [id, isFullScreen, isMobile, x, y, width, height, focusApp, updatePositionAndSize]);

  if (isMinimized) return null;

  const w = width ?? 860;
  const h = height ?? 560;

  return (
    <div
      onPointerDown={() => focusApp(id)}
      style={{
        position: 'absolute',
        zIndex,
        left: isFullScreen ? 0 : x,
        top: isFullScreen ? 0 : y,
        width: isFullScreen ? '100vw' : w,
        height: isFullScreen ? '100vh' : h,
      }}
      className={`flex flex-col overflow-hidden liquid-glass-window
        max-md:!fixed max-md:!inset-0 max-md:!w-screen max-md:!h-[100dvh] max-md:!rounded-none max-md:!top-0 max-md:!left-0
        ${isFullScreen ? '!rounded-none' : 'rounded-[14px]'}
      `}
    >
      {/* Specular highlight */}
      {!isFullScreen && (
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/32 to-transparent pointer-events-none z-10" />
      )}

      {/* ── Resize handles ────────────────────────────────────────────────── */}
      {!isFullScreen && !isMobile && (
        <>
          <div className="absolute inset-x-3 top-0 h-[5px] cursor-ns-resize z-30"    onMouseDown={(e) => startResize(e, 'n')} />
          <div className="absolute inset-x-3 bottom-0 h-[5px] cursor-ns-resize z-30"  onMouseDown={(e) => startResize(e, 's')} />
          <div className="absolute inset-y-3 left-0 w-[5px] cursor-ew-resize z-30"   onMouseDown={(e) => startResize(e, 'w')} />
          <div className="absolute inset-y-3 right-0 w-[5px] cursor-ew-resize z-30"  onMouseDown={(e) => startResize(e, 'e')} />
          <div className="absolute top-0 left-0 h-4 w-4 cursor-nwse-resize z-30"   onMouseDown={(e) => startResize(e, 'nw')} />
          <div className="absolute top-0 right-0 h-4 w-4 cursor-nesw-resize z-30"  onMouseDown={(e) => startResize(e, 'ne')} />
          <div className="absolute bottom-0 left-0 h-4 w-4 cursor-nesw-resize z-30" onMouseDown={(e) => startResize(e, 'sw')} />
          <div className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize z-30" onMouseDown={(e) => startResize(e, 'se')} />
        </>
      )}

      {/* ── Title Bar ─────────────────────────────────────────────────────── */}
      <div
        className={`relative flex h-11 w-full flex-shrink-0 items-center justify-between px-4 bg-white/[0.04] border-b border-white/[0.07] select-none
          ${!isFullScreen && !isMobile ? 'cursor-move' : ''}
        `}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={() => toggleFullScreen(id)}
      >
        <div className="flex items-center gap-[7px]">
          <button
            onClick={(e) => { e.stopPropagation(); closeApp(id); }}
            onMouseDown={(e) => e.stopPropagation()}
            className="group flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#FF5F57] ring-1 ring-black/20 hover:bg-[#e04e47] shadow-[0_1px_3px_rgba(255,95,87,0.5)]"
          >
            <X size={8} className="opacity-0 group-hover:opacity-100 text-[#4d0000]" strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
            onMouseDown={(e) => e.stopPropagation()}
            className="group flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#FEBC2E] ring-1 ring-black/20 hover:bg-[#e0a426] shadow-[0_1px_3px_rgba(254,188,46,0.5)]"
          >
            <Minus size={8} className="opacity-0 group-hover:opacity-100 text-[#4d3500]" strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleFullScreen(id); }}
            onMouseDown={(e) => e.stopPropagation()}
            className="group flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#28C840] ring-1 ring-black/20 hover:bg-[#22a835] shadow-[0_1px_3px_rgba(40,200,64,0.5)]"
          >
            <Maximize2 size={7} className="opacity-0 group-hover:opacity-100 text-[#004d00]" strokeWidth={2.5} />
          </button>
        </div>

        <div className="pointer-events-none text-[13px] font-semibold tracking-wide text-white/70">
          {title}
        </div>

        <div className="w-[58px]" />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div
        className="relative flex-1 overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
