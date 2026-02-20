import { createUser, getCurrentUser, getUser, getUsers, removeUser, updateUser } from "@/features/user/user.api";
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { QueryUserDto } from "./interfaces/query-user-dto.interface";
import { CreateUserDto } from "./interfaces/create-user-dto.interface";
import { UpdateUserDto } from "./interfaces/update-user-dto.interface";
import { IdPayload } from "@/common/interfaces/id-payload.interface";
import { User } from "./interfaces/user.interface";


export const useUsersQuery = (query: QueryUserDto) => {

    return useQuery({
        queryKey: ["users", query],
        queryFn: () => getUsers(query),
        placeholderData: (prev) => prev
    })
}

export const useCurrentUser = (options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">) => {

    return useQuery({
        queryKey: ["user"],
        queryFn: () => getCurrentUser(),
        ...options
    })
}

export const useGetUser = (id: string) => {
    return useQuery({
        queryKey: ["user",id],
        queryFn: () => getUser(id)
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

export const useUpdateUser = () => {

    const queryClient = useQueryClient()    
    return useMutation({
        mutationFn: (payload: IdPayload<string, UpdateUserDto>) => updateUser(payload.id, payload.dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        }
    })
}

export const useRemoveUser = () => {

    const queryClient = useQueryClient()    
    return useMutation({
        mutationFn: (id: string) => removeUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        }
    })
}