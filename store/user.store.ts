import { User } from "@/common/interfaces/user.interface";
import { create } from "zustand";



interface UserState {
    user: User | null;
    setUser: (user: User)=> void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user: User) => {
        set({user})
    }
}))