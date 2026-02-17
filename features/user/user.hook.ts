import { getCurrentUser, getUsers, QueryUserDto } from "@/features/user/user.api";
import { useQuery } from "@tanstack/react-query";


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