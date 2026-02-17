import { createUser, getCurrentUser, getUsers } from "@/features/user/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryUserDto } from "./interfaces/query-user-dto.interface";
import { CreateUserDto } from "./interfaces/create-user-dto.interface";


export const useUsersQuery = (query: QueryUserDto) => {

    return useQuery({
        queryKey: ["users", query],
        queryFn: () => getUsers(query),
        placeholderData: (prev) => prev
    })
}

export const useCurrentUser = () => {

    return useQuery({
        queryKey: ["user"],
        queryFn: () => getCurrentUser()
    })
}

export const useCreateUser = () => {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (createDto: CreateUserDto) => createUser(createDto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        }
    })
}