'use client';

import dynamic from 'next/dynamic';
import { AppErrorBoundary } from '../common/AppErrorBoundary';

const Loader = () => (
  <div className="flex h-full w-full items-center justify-center text-white/40" style={{ background: 'rgba(20,20,20,0.4)', backdropFilter: 'blur(10px)' }}>
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
  </div>
);

const TerminalApp = dynamic(() => import('./TerminalApp').then(mod => mod.TerminalApp), { loading: Loader });
const BrowserApp = dynamic(() => import('./BrowserApp').then(mod => mod.BrowserApp), { loading: Loader });
const FinderApp = dynamic(() => import('./FinderApp').then(mod => mod.FinderApp), { loading: Loader });
const ContactsApp = dynamic(() => import('./ContactsApp').then(mod => mod.ContactsApp), { loading: Loader });
const GalleryApp = dynamic(() => import('./GalleryApp').then(mod => mod.GalleryApp), { loading: Loader });
const MapsApp = dynamic(() => import('./MapsApp').then(mod => mod.MapsApp), { loading: Loader });
const MessagesApp = dynamic(() => import('./MessagesApp').then(mod => mod.MessagesApp), { loading: Loader });
const SkillsApp = dynamic(() => import('./SkillsApp').then(mod => mod.SkillsApp), { loading: Loader });

interface AppRegistryProps {
  appId: string;
}

export const AppRegistry = ({ appId }: AppRegistryProps) => {
  const renderApp = () => {
    switch (appId) {
      case 'skills': return <SkillsApp />;
      case 'terminal': return <TerminalApp />;
      case 'safari': return <BrowserApp />;
      case 'finder': return <FinderApp />;
      case 'contacts': return <ContactsApp />;
      case 'photos':
      case 'gallery': return <GalleryApp />;
      case 'maps': return <MapsApp />;
      case 'messages': return <MessagesApp />;
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
