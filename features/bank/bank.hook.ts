import { useQuery } from "@tanstack/react-query"
import { getBanks } from "./bank.api"



export const useBanks = () => {

    return useQuery({
        queryKey: ["banks"],
        queryFn: getBanks
    })
}