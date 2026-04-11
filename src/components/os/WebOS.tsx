'use client';

import { useEffect, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

export const WebOS = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-black" />
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white selection:bg-blue-500/30">
      {isMobile ? (
        <div className="flex h-full w-full items-center justify-center">
          <p>Interface iOS (Ilha Dinâmica) em construção...</p>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p>Interface macOS (Dock e Janelas) em construção...</p>
        </div>
      )}
    </div>
  );
};