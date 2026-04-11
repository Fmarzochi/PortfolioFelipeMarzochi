'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, FastForward, Rewind, Music } from 'lucide-react';
import { playSound } from '../../utils/audioEngine';

export const DynamicIsland = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleIsland = () => {
    playSound(isExpanded ? 'click' : 'notification');
    setIsExpanded(!isExpanded);
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique feche a ilha
    playSound('click');
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
  };

  return (
    /*
     * FIX: Outer wrapper changed from `left-1/2 -translate-x-1/2` to
     * `left-0 right-0 flex justify-center pointer-events-none`.
     *
     * The old approach applied a CSS transform (translateX) on the wrapper
     * while Framer Motion's layout engine also applies its own transforms on
     * the child motion.div. The two transform systems conflict, shifting the
     * hit-testing bounding box away from the visual element.
     *
     * Full-width + justify-center avoids any parent transform, and
     * pointer-events-none ensures the transparent sides don't block other UI.
     */
    <div className="absolute left-0 right-0 top-2 z-[999] flex justify-center pointer-events-none">
      <motion.div
        /*
         * FIX: `layout` prop removed.
         *
         * Using `layout` simultaneously with explicit `animate={{ width, height }}`
         * is a Framer Motion anti-pattern: the layout-projection system and the
         * animate system both try to own the element's size, producing a
         * compensating transform that detaches the rendered hit area from the
         * visual position and makes the element impossible to click.
         *
         * `animate` alone (with spring transitions) fully handles the expansion
         * and collapse — no `layout` needed.
         */
        onClick={toggleIsland}
        initial={{ borderRadius: 32 }}
        animate={{
          width: isExpanded ? 340 : 120,
          height: isExpanded ? 160 : 28,
          borderRadius: isExpanded ? 40 : 32,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
          mass: 1.2,
        }}
        /* pointer-events-auto overrides the parent's pointer-events-none */
        className="relative cursor-pointer overflow-hidden bg-black text-white shadow-[0_10px_40px_rgba(0,0,0,0.8)] ring-1 ring-white/10 pointer-events-auto"
      >
        <AnimatePresence mode="popLayout">
          {!isExpanded ? (
            /* ESTADO FECHADO (Pílula) */
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex h-full w-full items-center justify-between px-3"
            >
              {/* O "furo" da câmera simulado */}
              <div className="h-3 w-3 rounded-full bg-white/10 shadow-inner" />

              {/* Indicador visual se estiver tocando música */}
              {isPlaying && (
                <div className="flex items-center gap-0.5">
                  <motion.div animate={{ height: [6, 12, 6] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 rounded-full bg-blue-500" />
                  <motion.div animate={{ height: [10, 6, 10] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 rounded-full bg-blue-500" />
                  <motion.div animate={{ height: [8, 14, 8] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1 rounded-full bg-blue-500" />
                </div>
              )}
            </motion.div>
          ) : (
            /* ESTADO EXPANDIDO (Mini Player) */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, filter: 'blur(5px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(5px)' }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex h-full w-full flex-col justify-between p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Capa do Álbum */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg ring-1 ring-white/20">
                    <Music size={24} className="text-white/80" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide text-white">Engenharia de Software</span>
                    <span className="text-xs font-medium text-white/50">CatchUp Podcast</span>
                  </div>
                </div>

                {isPlaying && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <div className="flex items-center gap-0.5">
                      <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 rounded-full bg-blue-500" />
                      <motion.div animate={{ height: [12, 8, 12] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 rounded-full bg-blue-500" />
                    </div>
                  </div>
                )}
              </div>

              {/* Controles de Mídia */}
              <div className="flex items-center justify-center gap-8 pb-1">
                <Rewind size={24} className="cursor-pointer fill-white/80 text-white/80 transition-colors hover:fill-white hover:text-white active:scale-90" onClick={handleSkip} />
                <button onClick={handlePlayPause} className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform active:scale-90">
                  {isPlaying ? <Pause size={24} className="fill-black" /> : <Play size={24} className="ml-1 fill-black" />}
                </button>
                <FastForward size={24} className="cursor-pointer fill-white/80 text-white/80 transition-colors hover:fill-white hover:text-white active:scale-90" onClick={handleSkip} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
