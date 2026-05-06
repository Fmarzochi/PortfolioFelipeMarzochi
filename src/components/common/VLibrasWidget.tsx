'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => void;
    };
  }
}

export const VLibrasWidget = () => {
  useEffect(() => {
    const container = document.createElement('div');
    container.setAttribute('vw', '');
    container.className = 'enabled';

    const accessButton = document.createElement('div');
    accessButton.setAttribute('vw-access-button', '');
    accessButton.className = 'active';

    const pluginWrapper = document.createElement('div');
    pluginWrapper.setAttribute('vw-plugin-wrapper', '');

    const topWrapper = document.createElement('div');
    topWrapper.className = 'vw-plugin-top-wrapper';

    pluginWrapper.appendChild(topWrapper);
    container.appendChild(accessButton);
    container.appendChild(pluginWrapper);
    document.body.appendChild(container);

    return () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  return (
    <Script
      src="https://vlibras.gov.br/app/vlibras-plugin.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && window.VLibras) {
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
      }}
    />
  );
};
