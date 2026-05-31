'use client';

import { useAccessibility } from '../../contexts/AccessibilityContext';

export const AccessibilityIcon = () => {
  const { togglePanel, panelOpen } = useAccessibility();

  return (
    <button
      data-a11y-trigger
      onClick={togglePanel}
      aria-expanded={panelOpen}
      aria-haspopup="dialog"
      aria-label="Abrir painel de acessibilidade visual e Libras"
      title="Acessibilidade"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePanel(); } }}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 2147483646,
        opacity: panelOpen ? 1 : 0.88,
        transition: 'opacity 0.2s, transform 0.2s',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        transform: panelOpen ? 'scale(1.1)' : 'scale(1)',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = panelOpen ? '1' : '0.88'; (e.currentTarget as HTMLElement).style.transform = panelOpen ? 'scale(1.1)' : 'scale(1)'; }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="isa-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="24" fill="url(#isa-bg)" />
        <circle cx="19" cy="10" r="3" fill="white" />
        <path d="M 19 13 L 22 21" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 15 16 L 22 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M 22 21 L 33 21" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 33 15 L 33 21" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M 22 21 L 22 28" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M 16 28 L 22 28" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="33" cy="36" r="9" stroke="white" strokeWidth="2.5" fill="none" />
        <circle cx="14" cy="34" r="3.5" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    </button>
  );
};
