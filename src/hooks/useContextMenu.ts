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
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        timer = setTimeout(() => {
          justOpened = true;
          setState({ isOpen: true, x: touch.clientX, y: touch.clientY });
        }, 500);
      }
    };

    const handleTouchCancel = () => clearTimeout(timer);

    // Registrando os ouvintes no documento inteiro
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchCancel);
    document.addEventListener('touchend', handleTouchCancel);

    // Limpeza da memória ao desmontar
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchCancel);
      document.removeEventListener('touchend', handleTouchCancel);
    };
  }, [closeMenu]);

  return state;
};