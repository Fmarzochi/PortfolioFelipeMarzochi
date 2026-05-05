'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export const useContextMenu = () => {
  const [state, setState] = useState({ isOpen: false, x: 0, y: 0 });
  const isOpenRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => { isOpenRef.current = state.isOpen; }, [state.isOpen]);

  const closeMenu = useCallback(() => {
    setState((prev) => (prev.isOpen ? { ...prev, isOpen: false } : prev));
  }, []);

  useEffect(() => {
    // Helper: retorna true se o target for elemento interativo
    const isInteractive = (target: EventTarget | null): boolean => {
      let el = target as HTMLElement | null;
      while (el) {
        if (
          el.dataset.noContextmenu === 'true' ||
          el.tagName === 'BUTTON' ||
          el.tagName === 'A'
        ) return true;
        el = el.parentElement;
      }
      return false;
    };

    // 1. Desktop: right-click (e mobile: contextmenu simulado pelo long-press)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      // Não abre em elemento interativo (dock, ícones)
      if (isInteractive(e.target)) return;
      setState({ isOpen: true, x: e.clientX, y: e.clientY });
    };

    // 2. Close on click outside
    let justOpened = false;
    const handleClick = () => {
      if (justOpened) { justOpened = false; return; }
      closeMenu();
    };

    // 3. Mobile: long-press 500ms — only on empty background
    let timer: NodeJS.Timeout;
    let touchStartX = 0;
    let touchStartY = 0;
    const MOVE_THRESHOLD = 12;

    const handleTouchStart = (e: TouchEvent) => {
      // Close menu if already open
      if (isOpenRef.current) {
        setState(prev => ({ ...prev, isOpen: false }));
        clearTimeout(timer);
        return;
      }

      // Skip if touch target is a button, link, or any interactive element
      if (isInteractive(e.target)) return;

      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      timer = setTimeout(() => {
        justOpened = true;
        setState({ isOpen: true, x: touch.clientX, y: touch.clientY });
      }, 500);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const dx = Math.abs(e.touches[0].clientX - touchStartX);
        const dy = Math.abs(e.touches[0].clientY - touchStartY);
        if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) clearTimeout(timer);
      }
    };

    const handleTouchEnd = () => clearTimeout(timer);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [closeMenu]);

  return state;
};
