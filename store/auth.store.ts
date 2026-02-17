import {LoginRdo } from "@/features/auth/auth.api";
import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    expiresIn: number;
    setAuth: (loginRdo: LoginRdo) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    isAuthenticated: false,
    expiresIn: 0,
    setAuth: (lgRdo: LoginRdo) => {
        set({
            isAuthenticated: true,
            accessToken: lgRdo.accessToken,
            expiresIn: lgRdo.expiresIn
        })
        localStorage.setItem('accessToken',lgRdo.accessToken)
    }
}))