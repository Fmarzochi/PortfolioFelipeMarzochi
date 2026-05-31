'use client';

import { useEffect, useRef } from 'react';
import { useAccessibility, ColorMode } from '../../contexts/AccessibilityContext';

const COLOR_OPTIONS: { mode: ColorMode; label: string; desc: string; color: string }[] = [
  { mode: 'normal',        label: 'Normal',       desc: 'Cores originais',        color: '#6366f1' },
  { mode: 'high-contrast', label: 'Alto contraste', desc: 'Máxima legibilidade',  color: '#facc15' },
  { mode: 'deuteranopia',  label: 'Deuteranopia', desc: 'Daltonismo verde',        color: '#f97316' },
  { mode: 'protanopia',    label: 'Protanopia',   desc: 'Daltonismo vermelho',     color: '#ef4444' },
  { mode: 'tritanopia',    label: 'Tritanopia',   desc: 'Daltonismo azul',         color: '#22d3ee' },
  { mode: 'grayscale',     label: 'Escala cinza', desc: 'Sem cor',                 color: '#94a3b8' },
];

export const AccessibilityPanel = () => {
  const { colorMode, setColorMode, fontSize, increaseFontSize, decreaseFontSize, resetFontSize, panelOpen, closePanel } = useAccessibility();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!panelOpen) return;
    firstBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closePanel(); };
    const onClickOut = (e: MouseEvent) => {
      const trigger = document.querySelector('[data-a11y-trigger]');
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        !trigger?.contains(e.target as Node)
      ) closePanel();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOut);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOut);
    };
  }, [panelOpen, closePanel]);

  const triggerVLibras = () => {
    closePanel();
    setTimeout(() => {
      const btn = document.querySelector<HTMLElement>('[vw-access-button]');
      btn?.click();
    }, 120);
  };

  const fontSteps = [100, 115, 130];
  const fontLabels = ['A−', 'A', 'A+'];
  const fontAriaLabels = ['Diminuir fonte', 'Tamanho normal', 'Aumentar fonte'];
  const fontActions = [decreaseFontSize, resetFontSize, increaseFontSize];

  if (!panelOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Painel de acessibilidade visual"
      tabIndex={-1}
      className="focus:outline-none"
      style={{
        position: 'fixed',
        bottom: '84px',
        left: '24px',
        zIndex: 2147483646,
        width: '240px',
        background: 'rgba(6, 6, 16, 0.97)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: '18px',
        padding: '16px',
        color: 'white',
        boxShadow: '0 24px 64px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.07)',
      }}
    >
      <p style={{ fontSize: '10px', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.1em', opacity: 0.45, textTransform: 'uppercase' }}>
        Visão e cores
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
        {COLOR_OPTIONS.map((opt, i) => {
          const active = colorMode === opt.mode;
          return (
            <button
              key={opt.mode}
              ref={i === 0 ? firstBtnRef : undefined}
              onClick={() => setColorMode(opt.mode)}
              aria-pressed={active}
              aria-label={`${opt.label}: ${opt.desc}`}
              className="focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '4px',
                background: active ? `${opt.color}22` : 'rgba(255,255,255,0.05)',
                border: active ? `1.5px solid ${opt.color}99` : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '8px 10px',
                color: 'white',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: opt.color,
                  display: 'block',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span style={{ fontSize: '11px', fontWeight: 700, lineHeight: 1.2 }}>{opt.label}</span>
              <span style={{ fontSize: '9px', opacity: 0.5, lineHeight: 1.2 }}>{opt.desc}</span>
            </button>
          );
        })}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <p style={{ fontSize: '10px', opacity: 0.45, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>Tamanho do texto</p>
        <div style={{ display: 'flex', gap: '5px' }}>
          {fontSteps.map((step, i) => {
            const active = fontSize === step;
            return (
              <button
                key={step}
                onClick={fontActions[i]}
                aria-pressed={active}
                aria-label={fontAriaLabels[i]}
                className="focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  background: active ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)',
                  border: active ? '1.5px solid rgba(99,102,241,0.6)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: i === 0 ? '11px' : i === 1 ? '14px' : '18px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {fontLabels[i]}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
        <button
          onClick={triggerVLibras}
          aria-label="Abrir VLibras — Língua Brasileira de Sinais"
          className="focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '9px 12px',
            color: 'white',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Libras (VLibras)</span>
        </button>
      </div>
    </div>
  );
};
