'use client';

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

    // Script é injetado APÓS os elementos existirem no DOM,
    // eliminando a race condition que ocorre em produção.
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(container)) document.body.removeChild(container);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return null;
};
