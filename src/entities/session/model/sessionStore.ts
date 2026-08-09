import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AUTH_STORAGE_KEY } from '@/shared/config/constants'
import type { User } from '@/entities/user'

interface SessionState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setSession: (user: User, accessToken: string, refreshToken: string) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  updateUser: (patch: Partial<User>) => void
  clear: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setSession: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      updateUser: (patch) =>
        set((state) => ({ user: state.user ? { ...state.user, ...patch } : state.user })),
      clear: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    { name: AUTH_STORAGE_KEY },
  ),
)
