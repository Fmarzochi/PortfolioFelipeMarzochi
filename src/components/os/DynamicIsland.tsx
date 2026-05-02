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
    e.stopPropagation();
    playSound('click');
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
  };

  return (
    /*
     * Full-width + justify-center avoids parent transform conflicts with
     * Framer Motion's own transform system on the child motion.div.
     * pointer-events-none ensures transparent sides never block other UI.
     */
    <div className="absolute left-0 right-0 top-2 z-[999] flex justify-center pointer-events-none">
      <motion.div
        /*
         * `animate` alone (with spring transitions) handles expansion/collapse.
         * `layout` prop is intentionally omitted — combining it with explicit
         * `animate={{ width, height }}` is a Framer Motion anti-pattern.
         */
        onClick={toggleIsland}
        initial={{ borderRadius: 40 }}
        animate={{
          width: isExpanded ? 340 : 118,
          height: isExpanded ? 164 : 30,
          borderRadius: isExpanded ? 44 : 40,
        }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 28,
          mass: 1.1,
        }}
        className="relative cursor-pointer overflow-hidden bg-black text-white pointer-events-auto"
        style={{
          boxShadow: '0 12px 48px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <AnimatePresence mode="popLayout">
          {!isExpanded ? (
            /* ── Collapsed (pill) ── */
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.14 }}
              className="flex h-full w-full items-center justify-between px-4"
            >
              {/* Simulated front-camera cutout */}
              <div className="h-[11px] w-[11px] rounded-full bg-[#0a0a0a] ring-[1.5px] ring-white/[0.06] shadow-inner" />

              {/* Music equalizer bars — shown while playing */}
              {isPlaying && (
                <div className="flex items-center gap-[3px]">
                  <motion.div
                    animate={{ height: [5, 12, 5] }}
                    transition={{ repeat: Infinity, duration: 0.75, ease: 'easeInOut' }}
                    className="w-[3px] rounded-full bg-blue-400"
                  />
                  <motion.div
                    animate={{ height: [10, 5, 10] }}
                    transition={{ repeat: Infinity, duration: 0.75, ease: 'easeInOut', delay: 0.18 }}
                    className="w-[3px] rounded-full bg-blue-400"
                  />
                  <motion.div
                    animate={{ height: [7, 14, 7] }}
                    transition={{ repeat: Infinity, duration: 0.75, ease: 'easeInOut', delay: 0.36 }}
                    className="w-[3px] rounded-full bg-blue-400"
                  />
                </div>
              )}
            </motion.div>
          ) : (
            /* ── Expanded (mini player) ── */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.28, delay: 0.08 }}
              className="flex h-full w-full flex-col justify-between p-5"
            >
              {/* Track info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg ring-1 ring-white/20">
                    <Music size={22} className="text-white/85" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-semibold leading-tight tracking-tight text-white">
                      Engenharia de Software
                    </span>
                    <span className="text-[11px] font-medium text-white/45">
                      Felipe Marzochi Radio
                    </span>
                  </div>
                </div>

                {isPlaying && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                    <div className="flex items-center gap-[2.5px]">
                      <motion.div
                        animate={{ height: [6, 14, 6] }}
                        transition={{ repeat: Infinity, duration: 0.58, ease: 'easeInOut' }}
                        className="w-[3px] rounded-full bg-blue-400"
                      />
                      <motion.div
                        animate={{ height: [11, 6, 11] }}
                        transition={{ repeat: Infinity, duration: 0.58, ease: 'easeInOut', delay: 0.19 }}
                        className="w-[3px] rounded-full bg-blue-400"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Media controls */}
              <div className="flex items-center justify-center gap-7 pb-0.5">
                <Rewind
                  size={22}
                  className="cursor-pointer fill-white/75 text-white/75 transition-all hover:fill-white hover:text-white active:scale-90"
                  onClick={handleSkip}
                />
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handlePlayPause}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform"
                >
                  {isPlaying
                    ? <Pause size={20} className="fill-black" />
                    : <Play size={20} className="ml-0.5 fill-black" />
                  }
                </motion.button>
                <FastForward
                  size={22}
                  className="cursor-pointer fill-white/75 text-white/75 transition-all hover:fill-white hover:text-white active:scale-90"
                  onClick={handleSkip}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
