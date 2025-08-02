import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setEmailVerified: (emailVerified) =>
        set((state) => ({
          user: { ...state.user, emailVerified },
        })),
      setRole: (role) =>
        set((state) => ({
          user: { ...state.user, role },
        })),
      setProfileCompleted: (profileCompleted) =>
        set((state) => ({
          user: { ...state.user, profileCompleted },
        })),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
