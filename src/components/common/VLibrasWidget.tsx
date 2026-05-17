'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export const VLibrasWidget = () => {
  const vwProps = { vw: 'true' } as Record<string, string>;
  const accessButtonProps = { 'vw-access-button': 'true' } as Record<string, string>;
  const wrapperProps = { 'vw-plugin-wrapper': 'true' } as Record<string, string>;

  return (
    <>
      <div {...vwProps} className="enabled">
        <div {...accessButtonProps} className="active"></div>
        <div {...wrapperProps}>
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
      <Script
        id="vlibras-plugin"
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ((window as any).VLibras) {
            new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
          }
        }}
      />
    </>
  );
};
