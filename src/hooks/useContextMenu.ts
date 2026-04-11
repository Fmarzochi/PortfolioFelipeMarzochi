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
      e.preventDefault(); // Impede o menu feio do Chrome de abrir
      setState({ isOpen: true, x: e.clientX, y: e.clientY });
    };

    // 2. Lógica para Fechar ao clicar fora
    const handleClick = () => closeMenu();

    // 3. Lógica para Mobile (Pressionar e Segurar por 500ms)
    let timer: NodeJS.Timeout;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        timer = setTimeout(() => {
          setState({ isOpen: true, x: touch.clientX, y: touch.clientY });
        }, 500);
      }
    };

    // Se o usuário arrastar o dedo ou soltar antes de 500ms, cancela a abertura
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