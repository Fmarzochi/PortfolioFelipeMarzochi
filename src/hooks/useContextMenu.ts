'use client';

import { useState, useEffect, useCallback } from 'react';

export const useContextMenu = () => {
  const [state, setState] = useState({ isOpen: false, x: 0, y: 0 });

  const closeMenu = useCallback(() => {
    setState((prev) => (prev.isOpen ? { ...prev, isOpen: false } : prev));
  }, []);

  useEffect(() => {
    // 1. Lógica para Desktop (Botão Direito)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setState({ isOpen: true, x: e.clientX, y: e.clientY });
    };

    // 2. Fechar ao clicar fora — ignora o click sintético que vem logo após o long-press
    let justOpened = false;
    const handleClick = () => {
      if (justOpened) { justOpened = false; return; }
      closeMenu();
    };

    // 3. Mobile: long-press 500ms
    let timer: NodeJS.Timeout;
    let touchStartX = 0;
    let touchStartY = 0;
    const MOVE_THRESHOLD = 12; // px — cancel only if moved more than this

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        timer = setTimeout(() => {
          justOpened = true;
          setState({ isOpen: true, x: touch.clientX, y: touch.clientY });
        }, 500);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const dx = Math.abs(e.touches[0].clientX - touchStartX);
        const dy = Math.abs(e.touches[0].clientY - touchStartY);
        if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) clearTimeout(timer);
      }
    };

    const handleTouchCancel = () => clearTimeout(timer);

    // Registrando os ouvintes no documento inteiro
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchCancel);
    document.addEventListener('touchcancel', handleTouchCancel);

    // Limpeza da memória ao desmontar
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchCancel);
      document.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [closeMenu]);

  return state;
};