import { api } from "@/config/axios"
import { QueryDailyPlan } from "./interfaces/query-daily-plan.interface"



export const getDailyPlans = async (query: QueryDailyPlan) => {

    const res = await api.get('daily-plans',{
        params: query
    })
    return res.data;
}