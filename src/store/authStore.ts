import { create } from 'zustand';
import { User } from '../types';

const PREDEFINED_HOST: User = {
  id: '1',
  name: 'Gustavo Oliveira',
  email: 'gustavosantos11246@gmail.com',
  role: 'host',
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    // Check if it's the predefined host
    if (email === PREDEFINED_HOST.email && password === 'host1234') {
      set({ user: PREDEFINED_HOST, isAuthenticated: true });
      return true;
    }

    // For regular users, simulate login
    if (password.length >= 6) {
      set({
        user: {
          id: Math.random().toString(),
          email,
          name: email.split('@')[0],
          role: 'user',
        },
        isAuthenticated: true,
      });
      return true;
    }

    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));