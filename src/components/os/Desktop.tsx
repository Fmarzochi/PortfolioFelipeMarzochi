'use client';

import { useWindowManager } from '../../store/useWindowManager';
import { AppWindow } from './AppWindow';

export const Desktop = () => {
  const { windows } = useWindowManager();

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pt-7 pb-[80px]">
      {/* pt-7 compensa a TopBar, pb-[80px] compensa o Dock para as janelas não nascerem embaixo deles */}
      {windows.map((windowState) => {
        // Se a janela estiver fechada, não renderiza nada
        if (!windowState.isOpen) return null;

        return (
          <AppWindow key={windowState.id} windowState={windowState}>
            {/* Por enquanto, um placeholder. Logo criaremos o sistema que injeta o App real aqui dentro! */}
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
              <h2 className="text-2xl font-bold text-white/80">{windowState.title}</h2>
              <p className="mt-2 text-sm text-white/40">O conteúdo deste aplicativo será renderizado aqui.</p>
            </div>
          </AppWindow>
        );
      })}
    </div>
  );
};