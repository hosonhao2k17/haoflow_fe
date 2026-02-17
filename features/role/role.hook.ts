import { getRoles } from "@/features/role/role.api"
import { useQuery } from "@tanstack/react-query"



export const useRolesQuery = () => {


    return useQuery({
        queryKey: ["role"],
        queryFn: getRoles
    })
}