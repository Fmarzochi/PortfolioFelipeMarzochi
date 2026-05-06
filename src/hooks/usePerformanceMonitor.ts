'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Hook para monitoramento de FPS e degradação controlada de efeitos visuais.
 * Útil para o ecossistema "Liquid Glass" que utiliza muitos filtros de blur.
 */
export const usePerformanceMonitor = (threshold = 40) => {
  const [lowPerformance, setLowPerformance] = useState(false);
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const lowPerformanceCount = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const checkPerformance = () => {
      const now = performance.now();
      frameCount.current++;

      if (now >= lastTime.current + 1000) {
        const currentFps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
        setFps(currentFps);

        // Se o FPS cair abaixo do limite por 3 ciclos consecutivos (3 segundos)
        if (currentFps < threshold) {
          lowPerformanceCount.current++;
          if (lowPerformanceCount.current >= 3) {
            setLowPerformance(true);
          }
        } else {
          // Reset se o desempenho voltar ao normal
          lowPerformanceCount.current = 0;
          if (currentFps >= 55) {
            setLowPerformance(false);
          }
        }

        frameCount.current = 0;
        lastTime.current = now;
      }

      animationFrameId = requestAnimationFrame(checkPerformance);
    };

    animationFrameId = requestAnimationFrame(checkPerformance);

    return () => cancelAnimationFrame(animationFrameId);
  }, [threshold]);

  return { fps, lowPerformance };
};
