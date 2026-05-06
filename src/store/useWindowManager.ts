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
  width: number;
  height: number;
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
  updateSize: (id: string, width: number, height: number) => void;
  updatePositionAndSize: (id: string, x: number, y: number, width: number, height: number) => void;
}

const normalizeZIndex = (windows: WindowState[]) => {
  const sorted = [...windows].sort((a, b) => a.zIndex - b.zIndex);
  return sorted.map((w, i) => ({ ...w, zIndex: i + 1 }));
};

export const useWindowManager = create<WindowManagerStore>()(
  persist(
    (set) => ({
      windows: [],
      openApp: (id, title) =>
        set((state) => {
          const existing = state.windows.find((w) => w.id === id);
          const highestZ = Math.max(0, ...state.windows.map((w) => w.zIndex));

          if (existing) {
            if (existing.zIndex === highestZ && existing.isOpen && !existing.isMinimized) return state;
            return {
              windows: normalizeZIndex(state.windows.map((w) =>
                w.id === id ? { ...w, title, isOpen: true, isMinimized: false, zIndex: highestZ + 1 } : w
              )),
            };
          }

          const openVisible = state.windows.filter(w => w.isOpen && !w.isMinimized).length;
          const step = openVisible % 8;
          return {
            windows: normalizeZIndex([
              ...state.windows,
              {
                id, title, isOpen: true, isMinimized: false, isFullScreen: false,
                x: 80 + step * 30, y: 60 + step * 25, width: 860, height: 560,
                zIndex: highestZ + 1,
              },
            ]),
          };
        }),
      closeApp: (id) =>
        set((state) => ({
          windows: state.windows.map((w) => w.id === id ? { ...w, isOpen: false } : w),
        })),
      minimizeApp: (id) =>
        set((state) => ({
          windows: state.windows.map((w) => w.id === id ? { ...w, isMinimized: true } : w),
        })),
      toggleFullScreen: (id) =>
        set((state) => ({
          windows: state.windows.map((w) => w.id === id ? { ...w, isFullScreen: !w.isFullScreen } : w),
        })),
      focusApp: (id) =>
        set((state) => {
          const win = state.windows.find(w => w.id === id);
          const highestZ = Math.max(0, ...state.windows.map((w) => w.zIndex));
          if (win?.zIndex === highestZ) return state;
          return {
            windows: normalizeZIndex(state.windows.map((w) =>
              w.id === id ? { ...w, zIndex: highestZ + 1 } : w
            )),
          };
        }),
      updatePosition: (id, x, y) =>
        set((state) => ({
          windows: state.windows.map((w) => w.id === id ? { ...w, x, y } : w),
        })),
      updateSize: (id, width, height) =>
        set((state) => ({
          windows: state.windows.map((w) => w.id === id ? { ...w, width, height } : w),
        })),
      updatePositionAndSize: (id, x, y, width, height) =>
        set((state) => ({
          windows: state.windows.map((w) => w.id === id ? { ...w, x, y, width, height } : w),
        })),
    }),
    {
      name: 'window-manager-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.windows = normalizeZIndex(state.windows);
      }
    }
  )
);
