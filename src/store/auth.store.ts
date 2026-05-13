import { create } from 'zustand';
import { UserProfile } from '../types/user.types';

interface AuthState {
  user: UserProfile | null;
  role: UserProfile['role'] | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, role: user?.role || null, isAuthenticated: !!user }),
  logout: () => set({ user: null, role: null, isAuthenticated: false }),
}));
