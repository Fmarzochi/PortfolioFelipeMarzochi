'use client';

import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint = 768) => {
  // Inicializa com null para evitar mismatch no SSR (flash do desktop no mobile)
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  // Fallback seguro durante a hidratação: assume false até o useEffect rodar
  return isMobile ?? false;
};