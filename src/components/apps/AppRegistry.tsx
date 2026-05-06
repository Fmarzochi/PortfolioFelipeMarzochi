'use client';

import { TerminalApp } from './TerminalApp';
import { BrowserApp } from './BrowserApp';
import { FinderApp } from './FinderApp';
import { ContactsApp } from './ContactsApp';
import { GalleryApp } from './GalleryApp';
import { MessagesApp } from './MessagesApp';
import { SkillsApp } from './SkillsApp';
import { AppErrorBoundary } from '../common/AppErrorBoundary';

interface AppRegistryProps {
  appId: string;
}

export const AppRegistry = ({ appId }: AppRegistryProps) => {
  const renderApp = () => {
    switch (appId) {
      case 'skills':
        return <SkillsApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'safari':
        return <BrowserApp />;
      case 'finder':
        return <FinderApp />;
      case 'contacts':
        return <ContactsApp />;
      case 'photos':
      case 'gallery':
        return <GalleryApp />;
      case 'maps':
        return <BrowserApp />;
      case 'messages':
        return <MessagesApp />;
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

  return (
    <AppErrorBoundary appName={appId.toUpperCase()}>
      {renderApp()}
    </AppErrorBoundary>
  );
};