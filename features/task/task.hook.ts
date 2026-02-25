import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Createtask } from "./interfaces/create-task.interface"
import { createTask, updateTask } from "./task.api"
import { UpdateTask } from "./interfaces/update-task.interface"
import { IdPayload } from "@/common/interfaces/id-payload.interface"
import { Task } from "./interfaces/task.interface"


export const useCreateTask = () => {

    return useMutation({
        mutationFn: (dto: Createtask) => createTask(dto)
    })
}

export const useUpdateTask = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, dto}:IdPayload<string,UpdateTask>) => updateTask(id, dto),
        onSuccess: (data: Task) => {
            queryClient.invalidateQueries({queryKey:  ["dailyPlan",data.dailyPlanId]})
        }
    })
}