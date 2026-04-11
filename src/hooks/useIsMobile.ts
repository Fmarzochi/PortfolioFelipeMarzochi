'use client';

import { useState, useEffect } from 'react';

// 768px é o breakpoint padrão para tablets/mobiles
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Função que verifica a largura atual da tela
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Executa a verificação assim que o componente é montado no cliente
    checkScreenSize();

    // Adiciona um "ouvinte" para que o React atualize o estado toda vez que você redimensionar a janela
    window.addEventListener('resize', checkScreenSize);

    // Limpa o evento quando o componente for desmontado para economizar memória
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};