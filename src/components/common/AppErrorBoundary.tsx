'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  appName: string;
}

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Uncaught error in ${this.props.appName}:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-black/40 p-6 text-center backdrop-blur-md">
          <div className="mb-4 rounded-full bg-amber-500/20 p-4 ring-1 ring-amber-500/40">
            <AlertTriangle size={32} className="text-amber-500" />
          </div>
          <h2 className="text-lg font-bold text-white/90">Kernel Panic · {this.props.appName}</h2>
          <p className="mt-2 max-w-[240px] text-xs text-white/50 leading-relaxed">
            Ocorreu uma falha inesperada na execução deste módulo. A integridade do Marzochi OS permanece preservada.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-6 flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-white/15 ring-1 ring-white/10"
          >
            <RefreshCcw size={12} />
            Reiniciar Módulo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
