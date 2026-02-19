import { createUser, getCurrentUser, getUser, getUsers, updateUser } from "@/features/user/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryUserDto } from "./interfaces/query-user-dto.interface";
import { CreateUserDto } from "./interfaces/create-user-dto.interface";
import { UpdateUserDto } from "./interfaces/update-user-dto.interface";
import { IdPayload } from "@/common/interfaces/id-payload.interface";


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