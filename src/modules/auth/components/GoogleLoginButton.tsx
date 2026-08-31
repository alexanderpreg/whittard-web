'use client';

import { useEffect, useRef } from 'react';

import { useGoogleOAuth } from '@/providers/GoogleOAuthProvider';

import { cn } from '@/lib/utils';

interface GoogleLoginButtonProps {
  onSuccess: (token: string, picture?: string | null) => void;
  className?: string;
}

export function GoogleLoginButton({ onSuccess, className }: GoogleLoginButtonProps) {
  const { isInitialized, setHandler, renderButton } = useGoogleOAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  // El handler se registra en el provider (que ejecuta el callback de GSI).
  useEffect(() => {
    setHandler(onSuccess);
  }, [onSuccess, setHandler]);

  // Renderiza el botón solo después de initialize() y una sola vez.
  useEffect(() => {
    if (!isInitialized || renderedRef.current || !containerRef.current) return;
    renderedRef.current = true;
    renderButton(containerRef.current);
  }, [isInitialized, renderButton]);

  return <div ref={containerRef} className={cn('flex w-full justify-center', className)} />;
}
