'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => void };
    _vlibrasReady?: boolean;
  }
}

export const VLibrasWidget = () => {
  useEffect(() => {
    // Guard: só inicializa uma vez por sessão de página
    if (window._vlibrasReady) return;
    window._vlibrasReady = true;

    // Cria os elementos DOM apenas se ainda não existirem
    if (!document.querySelector('[vw]')) {
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
    }

    // Carrega o script apenas se ainda não estiver na página
    if (!document.querySelector('script[src*="vlibras"]')) {
      const script = document.createElement('script');
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.onload = () => {
        if (window.VLibras) {
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
      };
      document.body.appendChild(script);
    } else if (window.VLibras) {
      // Script já carregado (cache) — reinicializa o widget se necessário
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    }

    // Sem cleanup: VLibras é um singleton global de acessibilidade
    // e não deve ser removido durante a navegação na SPA
  }, []);

  return null;
};
