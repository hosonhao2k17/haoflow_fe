import { useMutation, useQuery } from "@tanstack/react-query"
import { QueryDailyPlan } from "./interfaces/query-daily-plan.interface"
import { createDailyPlan, editDailyPlan, getDailyPlans } from "./daily-plan.api"
import { CreateDailyPlan } from "./interfaces/create-daily-plan.interface"
import { EditDailyPlan } from "./interfaces/edit-daily-plan.interface"



export const useDailyPlans = (query: QueryDailyPlan) => {

    return useQuery({
        queryKey: ['daily-plan', query],
        queryFn: () => getDailyPlans(query)
    })
}

export const useCreateDailyPlan = () => {

    return useMutation({
        mutationFn: (dto: CreateDailyPlan) => createDailyPlan(dto)
    })
}

export const useEditDailyPlan = (id: string) => {

    return useMutation({
        mutationFn: (dto: EditDailyPlan) => editDailyPlan(id, dto)
    })
}