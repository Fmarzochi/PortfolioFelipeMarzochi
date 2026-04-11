'use client';

import { useWindowManager } from '../../store/useWindowManager';
import { AppWindow } from './AppWindow';
import { AppRegistry } from '../apps/AppRegistry';

export const Desktop = () => {
  const { windows } = useWindowManager();

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pt-7 pb-[80px]">
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