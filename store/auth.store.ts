import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
    accessToken: string | null
    expiresIn: number | null
    setAuth: (data: { accessToken: string; expiresIn: number }) => void
    clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            expiresIn: null,
            setAuth: (data) => set(data),
            clearAuth: () => set({ accessToken: null, expiresIn: null }),
        }),
        {
            name: "auth-storage",
        }
    )
)
