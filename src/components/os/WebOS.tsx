'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { MacDock } from './MacDock';
import { TopBar } from './TopBar';
import { Desktop } from './Desktop';
import { IOSMobile } from './IOSMobile';
import { LockScreen } from './LockScreen';
import { ContextMenu } from './ContextMenu';
import { WelcomeOverlay } from './WelcomeOverlay';
import { OSProvider } from '../../contexts/OSContext';

export const WebOS = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (new URLSearchParams(window.location.search).has('unlock')) {
      setIsLocked(false);
    }
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
    const seen = sessionStorage.getItem('welcome-seen');
    if (!seen) {
      sessionStorage.setItem('welcome-seen', '1');
      setTimeout(() => setShowWelcome(true), 900);
    }
  };

  if (!mounted) {
    return <div className="fixed inset-0 h-[100dvh] w-screen bg-black" />;
  }

  return (
    <OSProvider>
      <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden overscroll-none bg-black text-white selection:bg-blue-500/30">
        {isLocked ? (
          <div className="absolute inset-0 z-[100] bg-black">
            <LockScreen onUnlock={handleUnlock} />
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

            <ContextMenu />

            <AnimatePresence>
              {showWelcome && (
                <WelcomeOverlay
                  isMobile={!!isMobile}
                  onDismiss={() => setShowWelcome(false)}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </OSProvider>
  );
};