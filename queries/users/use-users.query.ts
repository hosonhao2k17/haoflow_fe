import { getUsers, QueryUserDto } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";


export const useUsersQuery = (query: QueryUserDto) => {

    return useQuery({
        queryKey: ["users", query],
        queryFn: () => getUsers(query),
        placeholderData: (prev) => prev
    })
}