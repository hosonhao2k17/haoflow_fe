import { ApiError } from "@/common/interfaces/api-error.interface";
import { login, LoginDto } from "@/services/auth.service";
import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    accessToken: string | null;
    expiresIn: number;
    error: ApiError | null;
    login: (dto: LoginDto) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoading: false,
    error: null,
    accessToken: null,
    isAuthenticated: false,
    expiresIn: 0,
    login: async (dto: LoginDto) => {
        set({isLoading: true, error: null})

        try {
            const data = await login(dto)
            set({
                accessToken: data.accessToken,
                expiresIn: data.expiresIn,
                isAuthenticated: true,
                isLoading: false
            })
            localStorage.setItem('accessToken',data.accessToken);
        } catch (err) {
            set({
                isAuthenticated: false,
                isLoading: false,
                accessToken: null,
                error: err as ApiError
            }) 
        }
    }
}))