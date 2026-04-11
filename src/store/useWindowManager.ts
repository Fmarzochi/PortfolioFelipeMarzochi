import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isFullScreen: boolean;
  x: number;
  y: number;
  zIndex: number;
}

interface WindowManagerStore {
  windows: WindowState[];
  openApp: (id: string, title: string) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  toggleFullScreen: (id: string) => void;
  focusApp: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
}

export const useWindowManager = create<WindowManagerStore>()(
  persist(
    (set) => ({
      windows: [],
      openApp: (id, title) =>
        set((state) => {
          const existing = state.windows.find((w) => w.id === id);
          const highestZIndex = Math.max(0, ...state.windows.map((w) => w.zIndex));

          if (existing) {
            return {
              windows: state.windows.map((w) =>
                w.id === id
                  ? { ...w, isOpen: true, isMinimized: false, zIndex: highestZIndex + 1 }
                  : w
              ),
            };
          }

          return {
            windows: [
              ...state.windows,
              {
                id,
                title,
                isOpen: true,
                isMinimized: false,
                isFullScreen: false,
                x: 100,
                y: 100,
                zIndex: highestZIndex + 1,
              },
            ],
          };
        }),
      closeApp: (id) =>
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isOpen: false } : w
          ),
        })),
      minimizeApp: (id) =>
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isMinimized: true } : w
          ),
        })),
      toggleFullScreen: (id) =>
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isFullScreen: !w.isFullScreen } : w
          ),
        })),
      focusApp: (id) =>
        set((state) => {
          const highestZIndex = Math.max(0, ...state.windows.map((w) => w.zIndex));
          return {
            windows: state.windows.map((w) =>
              w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w
            ),
          };
        }),
      updatePosition: (id, x, y) =>
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, x, y } : w
          ),
        })),
    }),
    {
      name: 'window-manager-storage',
    }
  )
);