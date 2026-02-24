import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QueryDailyPlan } from "./interfaces/query-daily-plan.interface"
import { createDailyPlan, editDailyPlan, getDailyPlans } from "./daily-plan.api"
import { CreateDailyPlan } from "./interfaces/create-daily-plan.interface"
import { EditDailyPlan } from "./interfaces/edit-daily-plan.interface"
import { IdPayload } from "@/common/interfaces/id-payload.interface"



export const useDailyPlans = (query: QueryDailyPlan) => {

    return useQuery({
        queryKey: ['daily-plans', query],
        queryFn: () => getDailyPlans(query)
    })
}

export const useCreateDailyPlan = () => {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (dto: CreateDailyPlan) => createDailyPlan(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['daily-plans']
            })
        }
    })
}


export const useEditDailyPlan = () => {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id, dto}: IdPayload<string,EditDailyPlan>) => editDailyPlan(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['daily-plans']
            })
        }
    })
}