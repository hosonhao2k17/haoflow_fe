
import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";
import { User } from "@/common/interfaces/user.interface";
import { getCurrentUser, getUsers, QueryUserDto } from "@/services/user.service";
import { ApiError } from "next/dist/server/api-utils";
import { create } from "zustand";



interface UserState {
    user: User | null;
    offsetPagination: OffsetPaginationDto | null,
    users: User[];
    isLoading: boolean;
    error: ApiError | null;
    getCurrentUser: () => void;
    getUsers: (query: QueryUserDto) => any;
}

export const useUserStore = create<UserState>((set) => ({
    isLoading: false,
    error: null,
    user: null,
    offsetPagination: null,
    users: [],
    getCurrentUser: async () => {
        set({isLoading: true, error: null})
        const data = await getCurrentUser();
        localStorage.setItem('user',JSON.stringify(data))

        set({
            user: data,
            isLoading:  true,
            error: null
        })
        
    },
    getUsers: async (query: QueryUserDto) => {
        set({isLoading: true, error: null})
        const data = await getUsers(query);
        set({
            users: data.items,
            isLoading: false,
            error: null
        })
    }
}))