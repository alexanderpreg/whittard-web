'use client';

import { GOOGLE_CLIENT_ID } from '@/config/env';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  onSuccess: (token: string, picture?: string | null) => void;
  isAuthenticated?: boolean;
  disabled?: boolean;
};

export function useGoogleIdentity({ onSuccess, isAuthenticated = false, disabled = false }: Props) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const initializeGoogle = useCallback(() => {
    if (!window.google || disabled || isAuthenticated) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response: { credential: string }) => {
        if (response.credential) {
          const payload = JSON.parse(atob(response.credential.split('.')[1]));
          window.google.accounts.id.cancel();
          onSuccess(response.credential, payload.picture ?? null);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }, [onSuccess, isAuthenticated, disabled]);

  useEffect(() => {
    if (window.google?.accounts?.id) {
      initializeGoogle();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!scriptLoaded) return;
    initializeGoogle();
  }, [scriptLoaded, initializeGoogle]);

  const renderGoogleButton = useCallback(
    (elementId: string) => {
      if (!window.google || disabled) return;

      const element = document.getElementById(elementId);
      if (!element) return;

      window.google.accounts.id.renderButton(element, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: element.offsetWidth || 400,
        logo_alignment: 'center',
      });
    },
    [disabled],
  );

  return { scriptLoaded, renderGoogleButton };
}
