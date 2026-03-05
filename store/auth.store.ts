import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
    accessToken: string | null
    expiresIn: number | null
    loading: boolean
    setAuth: (data: { accessToken: string; expiresIn: number }) => void
    clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            expiresIn: null,
            loading: true,
            setAuth: (data) => set({ ...data }),
            clearAuth: () => set({ accessToken: null, expiresIn: null, loading: true }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                accessToken: state.accessToken,
                expiresIn: state.expiresIn,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.loading = false
                }
            },
        }
    )
)