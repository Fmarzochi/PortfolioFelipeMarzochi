'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, MousePointer2, Move, ChevronDown, Fingerprint, Layers, GripHorizontal, ArrowRight } from 'lucide-react';
import { FocusTrap } from '../common/FocusTrap';

interface WelcomeOverlayProps {
  isMobile: boolean;
  onDismiss: () => void;
}

const DESKTOP_TIPS = [
  { icon: MousePointer2, label: 'Clique nos ícones do dock para abrir os apps' },
  { icon: Search,        label: 'Ctrl + K (Win/Linux) ou Cmd + Espaço (Mac) abre o Spotlight' },
  { icon: Move,          label: 'Arraste as janelas pelo título' },
  { icon: MousePointer2, label: 'Botão direito abre menu de contexto' },
];

const MOBILE_TIPS = [
  { icon: Fingerprint,   label: 'Toque nos ícones para abrir apps' },
  { icon: ChevronDown,   label: 'Arraste para baixo para fechar um app' },
  { icon: GripHorizontal,label: 'Segure e arraste para reordenar ícones' },
  { icon: Layers,        label: 'Dock inferior: Contato, LinkedIn e GitHub' },
];

export const WelcomeOverlay = ({ isMobile, onDismiss }: WelcomeOverlayProps) => {
  const tips = isMobile ? MOBILE_TIPS : DESKTOP_TIPS;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)' }}
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <FocusTrap isActive={true} onEscape={onDismiss}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ type: 'spring', damping: 24, stiffness: 280, delay: 0.1 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-sm rounded-3xl p-7 liquid-glass"
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold tracking-tight text-white" id="welcome-title">
              Boas vindas ao Portfolio OS
            </h2>
            <p className="mt-1 text-sm text-white/60">
              {isMobile ? 'Gestos e navegação mobile' : 'Como navegar pelo sistema'}
            </p>
          </div>

          {/* Tips */}
          <div className="flex flex-col gap-3 mb-7">
            {tips.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Icon size={16} className="text-white/70" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-white/75 leading-snug">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            onClick={onDismiss}
            className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold text-white transition-colors active:scale-[0.98]"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
          >
            Explorar
            <ArrowRight size={15} strokeWidth={2} />
          </motion.button>
        </motion.div>
      </FocusTrap>
    </motion.div>
  );
};
