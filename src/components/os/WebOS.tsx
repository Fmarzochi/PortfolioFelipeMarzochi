'use client';

import { useEffect, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { MacDock } from './MacDock';
import { TopBar } from './TopBar';
import { Desktop } from './Desktop';
import { IOSMobile } from './IOSMobile';
import { LockScreen } from './LockScreen';
import { ContextMenu } from './ContextMenu';
import { OSProvider } from '../../contexts/OSContext';

export const WebOS = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-screen w-screen bg-black" />;
  }

  return (
    // OSProvider wraps the entire OS so every component can access global
    // state (volume, brightness, wallpaper, focusMode) via useOSContext().
    <OSProvider>
      <div className="h-screen w-screen overflow-hidden bg-black text-white selection:bg-blue-500/30 relative select-none">
        {isLocked ? (
          <div className="absolute inset-0 z-[100] bg-black">
            <LockScreen onUnlock={() => setIsLocked(false)} />
          </div>
        ) : (
          <div className="h-full w-full animate-in fade-in duration-700">
            {isMobile ? (
              <IOSMobile />
            ) : (
              <div className="relative h-full w-full">
                <TopBar />
                <Desktop />
                <MacDock />
              </div>
            )}

            {/* Context Menu works on both Mobile and Desktop */}
            <ContextMenu />
          </div>
        )}
      </div>
    </OSProvider>
  );
};
