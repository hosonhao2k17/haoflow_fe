import { api } from "@/config/axios"
import { QueryDailyPlan } from "./interfaces/query-daily-plan.interface"
import { CreateDailyPlan } from "./interfaces/create-daily-plan.interface";
import { EditDailyPlan } from "./interfaces/edit-daily-plan.interface";



export const getDailyPlans = async (query: QueryDailyPlan) => {

    const res = await api.get('daily-plans',{
        params: query
    })
    return res.data;
}

export const createDailyPlan = async (dto: CreateDailyPlan) => {
    const res = await api.post('daily-plans',dto);
    return res.data;
}

export const editDailyPlan = async (id: string, dto: EditDailyPlan) => {
    const res = await api.patch(`daily-plans/${id}`,dto);
    return res.data;
}

export const removeDailyPlan = async (id: string) => {
    const res = await api.delete(`daily-plans/${id}`);
    return res.data;
}