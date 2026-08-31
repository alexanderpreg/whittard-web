'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { GOOGLE_CLIENT_ID } from '@/config/env';

const GSI_SCRIPT_URL = 'https://accounts.google.com/gsi/client';

type GoogleCredentialHandler = (token: string, picture?: string | null) => void;

interface GoogleOAuthContextValue {
  /** `true` cuando `initialize()` ya se ejecutó (y el botón puede renderizarse). */
  isInitialized: boolean;
  /** Registra el handler que recibe el credential de Google. */
  setHandler: (handler: GoogleCredentialHandler) => void;
  /** Renderiza el botón de Google en el elemento indicado (requiere isInitialized). */
  renderButton: (element: HTMLElement) => void;
}

const GoogleOAuthContext = createContext<GoogleOAuthContextValue | null>(null);

export function GoogleOAuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const handlerRef = useRef<GoogleCredentialHandler>(() => {});
  const initializedRef = useRef(false);

  const setHandler = useCallback((handler: GoogleCredentialHandler) => {
    handlerRef.current = handler;
  }, []);

  // Carga el script de Google una sola vez e inicializa cuando esté disponible.
  useEffect(() => {
    const init = () => {
      if (initializedRef.current || !window.google?.accounts?.id) return;
      initializedRef.current = true;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: { credential: string }) => {
          if (!response.credential) return;

          try {
            const base64 = response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            window.google.accounts.id.cancel();
            handlerRef.current(response.credential, payload.picture ?? null);
          } catch {
            // Token malformado: no llamamos al handler para no romper el flujo.
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      setIsInitialized(true);
    };

    if (window.google?.accounts?.id) {
      // Ya cargado: inicializa en el próximo tick.
      const id = window.setTimeout(init, 0);
      return () => window.clearTimeout(id);
    }

    // Si el <script> ya existe en el DOM, solo esperamos su carga.
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SCRIPT_URL}"]`);
    if (existing) {
      const handleLoad = () => init();
      existing.addEventListener('load', handleLoad, { once: true });

      // Si el script cargó antes de poder escuchar el evento, reintentamos.
      const retry = window.setTimeout(() => {
        if (window.google?.accounts?.id) init();
      }, 1000);

      return () => {
        window.clearTimeout(retry);
        existing.removeEventListener('load', handleLoad);
      };
    }

    const script = document.createElement('script');
    script.src = GSI_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = init;
    document.body.appendChild(script);
  }, []);

  const renderButton = useCallback((element: HTMLElement) => {
    if (!initializedRef.current || !window.google?.accounts?.id) return;

    window.google.accounts.id.renderButton(element, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      width: element.offsetWidth || 400,
      logo_alignment: 'center',
    });
  }, []);

  return (
    <GoogleOAuthContext.Provider value={{ isInitialized, setHandler, renderButton }}>
      {children}
    </GoogleOAuthContext.Provider>
  );
}

export function useGoogleOAuth(): GoogleOAuthContextValue {
  const context = useContext(GoogleOAuthContext);
  if (!context) {
    throw new Error('useGoogleOAuth debe usarse dentro de GoogleOAuthProvider');
  }
  return context;
}
