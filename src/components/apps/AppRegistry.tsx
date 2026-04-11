'use client';

import { TerminalApp } from './TerminalApp';
import { BrowserApp } from './BrowserApp';
import { FinderApp } from './FinderApp';
import { ContactsApp } from './ContactsApp';

interface AppRegistryProps {
  appId: string;
}

export const AppRegistry = ({ appId }: AppRegistryProps) => {
  switch (appId) {
    case 'terminal':
      return <TerminalApp />;
    case 'safari':
      return <BrowserApp />;
    case 'finder':
      return <FinderApp />;
    case 'contacts':
      return <ContactsApp />;
    default:
      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-white/5 p-8 text-center backdrop-blur-sm">
          <h2 className="text-xl font-medium text-white/80">Em Desenvolvimento</h2>
          <p className="mt-2 text-sm text-white/40">
            Este aplicativo será implementado nas próximas fases da arquitetura.
          </p>
        </div>
      );
  }
};