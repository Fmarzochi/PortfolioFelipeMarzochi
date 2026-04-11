'use client';

import { useWindowManager } from '../../store/useWindowManager';
import { AppWindow } from './AppWindow';
import { AppRegistry } from '../apps/AppRegistry';
import { useOSContext } from '../../contexts/OSContext';

export const Desktop = () => {
  const { windows } = useWindowManager();
  const { wallpaperStyle } = useOSContext();

  return (
    // backgroundImage drives the wallpaper; transition gives a smooth crossfade
    <div
      className="absolute inset-0 z-10 overflow-hidden pt-7 pb-[80px] transition-all duration-700"
      style={{ backgroundImage: wallpaperStyle }}
    >
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
