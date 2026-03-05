import { User } from "@/features/user/interfaces/user.interface";
import { create } from "zustand";



interface UserState {
    user: User | null;
    setUser: (user: User)=> void;
    pending: boolean;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    pending: true,
    setUser: (user: User) => {
        set({user})
        set({pending: false})
    }
}))