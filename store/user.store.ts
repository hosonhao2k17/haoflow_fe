
import { User } from "@/common/interfaces/user.interface";
import { getCurrentUser } from "@/services/user.service";
import { ApiError } from "next/dist/server/api-utils";
import { create } from "zustand";



interface UserState {
    user: User | null;
    isLoading: boolean;
    error: ApiError | null;
    getCurrentUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
    isLoading: false,
    error: null,
    user: null,
    getCurrentUser: async () => {
        set({isLoading: true, error: null})
        const data = await getCurrentUser();
        localStorage.setItem('user',JSON.stringify(data))

        set({
            user: data,
            isLoading:  true,
            error: null
        })
        
    }
}))