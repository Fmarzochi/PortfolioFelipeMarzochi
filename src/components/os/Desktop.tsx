'use client';

import { useWindowManager } from '../../store/useWindowManager';
import { AppWindow } from './AppWindow';
import { AppRegistry } from '../apps/AppRegistry';
import { useOSContext } from '../../contexts/OSContext';

export const Desktop = () => {
  const { windows } = useWindowManager();
  const { wallpaperStyle } = useOSContext();

  return (
    <div
      className="absolute inset-0 z-10 overflow-hidden transition-all duration-700"
      style={{ backgroundImage: wallpaperStyle }}
    >
      {/* Aurora depth overlays — layered on top of the wallpaper gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_55%_at_50%_0%,rgba(80,40,190,0.32),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_38%_at_0%_85%,rgba(20,75,170,0.22),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_100%_80%,rgba(0,110,90,0.18),transparent)] pointer-events-none" />

      {windows.map((windowState) => {
        if (!windowState.isOpen) return null;
        return (
          <AppWindow key={windowState.id} windowState={windowState}>
            <AppRegistry appId={windowState.id} />
          </AppWindow>
        );
      })}
    </div>
  );
};
