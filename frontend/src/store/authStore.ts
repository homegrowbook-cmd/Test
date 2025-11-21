import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '@/lib/api';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  avatar?: string;
  bio?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
  isDemoMode: boolean;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setHydrated: () => void;
  loginDemo: (username: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isHydrated: false,
      isDemoMode: false,

      login: async (emailOrUsername: string, password: string) => {
        const response = await api.post('/auth/login', {
          emailOrUsername,
          password,
        });

        const { user, accessToken, refreshToken } = response.data;

        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        }

        set({ user, accessToken, refreshToken, isDemoMode: false });
      },

      loginDemo: (username: string) => {
        const demoUsers: Record<string, User> = {
          alice_grower: {
            id: 'demo-alice',
            email: 'alice@homegrowbook.com',
            username: 'alice_grower',
            role: 'USER',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
          },
          bob_cultivator: {
            id: 'demo-bob',
            email: 'bob@homegrowbook.com',
            username: 'bob_cultivator',
            role: 'USER',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
          },
          charlie_green: {
            id: 'demo-charlie',
            email: 'charlie@homegrowbook.com',
            username: 'charlie_green',
            role: 'USER',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
          },
        };

        const user = demoUsers[username] || demoUsers.alice_grower;

        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', 'demo-token');
          localStorage.setItem('refreshToken', 'demo-refresh-token');
        }

        set({ 
          user, 
          accessToken: 'demo-token', 
          refreshToken: 'demo-refresh-token',
          isDemoMode: true 
        });
      },

      register: async (email: string, username: string, password: string) => {
        await api.post('/auth/register', {
          email,
          username,
          password,
        });
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
        set({ user: null, accessToken: null, refreshToken: null, isDemoMode: false });
      },

      setUser: (user: User) => {
        set({ user });
      },

      setHydrated: () => {
        set({ isHydrated: true });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : undefined as any)),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isDemoMode: state.isDemoMode,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
