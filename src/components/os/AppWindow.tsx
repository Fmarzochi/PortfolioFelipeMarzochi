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
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: isFullScreen ? 0 : x,
        y: isFullScreen ? 0 : y,
        width: isFullScreen ? '100vw' : 850,
        height: isFullScreen ? 'calc(100vh - 28px - 72px)' : 550,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onPointerDown={() => focusApp(id)}
      style={{ zIndex }}
      className={`absolute flex flex-col overflow-hidden bg-black/60 shadow-2xl backdrop-blur-2xl ring-1 ring-white/20
        max-md:!fixed max-md:!inset-0 max-md:!w-screen max-md:!h-[100dvh] max-md:![transform:none] max-md:!rounded-none max-md:!top-0 max-md:!left-0
        ${isFullScreen ? 'top-7 left-0 rounded-none' : 'rounded-xl'}
      `}
    >
      {/* Barra de Título (Header) */}
      <div
        className="flex h-12 w-full items-center justify-between px-4"
        onDoubleClick={() => toggleFullScreen(id)}
      >
        {/* Traffic Lights */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeApp(id);
            }}
            className="group flex h-[14px] w-[14px] items-center justify-center rounded-full bg-red-500 ring-1 ring-black/10 transition-colors hover:bg-red-600"
          >
            <X size={10} className="opacity-0 transition-opacity group-hover:opacity-100 text-black/70" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeApp(id);
            }}
            className="group flex h-[14px] w-[14px] items-center justify-center rounded-full bg-yellow-500 ring-1 ring-black/10 transition-colors hover:bg-yellow-600"
          >
            <Minus size={10} className="opacity-0 transition-opacity group-hover:opacity-100 text-black/70" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFullScreen(id);
            }}
            className="group flex h-[14px] w-[14px] items-center justify-center rounded-full bg-green-500 ring-1 ring-black/10 transition-colors hover:bg-green-600"
          >
            <Maximize2 size={10} className="opacity-0 transition-opacity group-hover:opacity-100 text-black/70" />
          </button>
        </div>

        {/* Título do App */}
        <div className="pointer-events-none select-none text-[13px] font-semibold tracking-wide text-white/80">
          {title}
        </div>

        {/* Espaçamento vazio para centralizar o título (mesma largura dos semáforos) */}
        <div className="w-[58px]" />
      </div>

      {/* Área de Conteúdo */}
      <div
        className="relative flex-1 bg-white/5"
        // Impede que arrastar o conteúdo interno arraste a janela inteira acidentalmente
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
};