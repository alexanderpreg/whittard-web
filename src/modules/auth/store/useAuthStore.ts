import { User } from '@/modules/auth/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  picture: string | null;
  isAuthenticated: boolean;
  setUser: (user: User, picture?: string | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      picture: null,
      isAuthenticated: false,
      setUser: (user, picture = null) => set({ user, picture, isAuthenticated: true }),
      clearUser: () => set({ user: null, picture: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
