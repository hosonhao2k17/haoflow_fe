import { useQuery } from "@tanstack/react-query"
import { QueryDailyPlan } from "./interfaces/query-daily-plan.interface"
import { getDailyPlans } from "./daily-plan.api"



export const useDailyPlans = (query: QueryDailyPlan) => {

    return useQuery({
        queryKey: ['daily-plan', query],
        queryFn: () => getDailyPlans(query)
    })
}