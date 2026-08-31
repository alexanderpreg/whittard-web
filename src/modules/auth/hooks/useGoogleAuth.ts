'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/useAuthStore';

/**
 * Handler compartido del login con Google (login y registro).
 * Centraliza: loginWithGoogle → guardar sesión → redirección.
 */
export function useGoogleAuth(redirect = '/') {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogle = useCallback(
    async (token: string, picture?: string | null) => {
      setLoading(true);
      setError(null);

      const result = await authService.loginWithGoogle({ token });

      if (!result.success) {
        setError(result.message);
        setLoading(false);
        return;
      }

      setUser(result.data!.user, picture ?? null);
      router.replace(redirect);
    },
    [router, setUser, redirect],
  );

  return { handleGoogle, loading, error };
}
