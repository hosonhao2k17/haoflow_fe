import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Createtask } from "./interfaces/create-task.interface"
import { createTask, getTasks, removeTask, updateTask } from "./task.api"
import { UpdateTask } from "./interfaces/update-task.interface"
import { IdPayload } from "@/common/interfaces/id-payload.interface"
import { Task } from "./interfaces/task.interface"
import { QueryTask } from "./interfaces/query-task.interface"


export const useCreateTask = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: Createtask) => createTask(dto),
        onSuccess: (data: Task) => {
            queryClient.invalidateQueries({queryKey:  ["tasks",data.dailyPlanId]})
        }
    })
}

export const useUpdateTask = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, dto}:IdPayload<string,UpdateTask>) => updateTask(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:  ["tasks"]})
        }
    })
}

export const useRemoveTask = () => {
    
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => removeTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"]})
        }
    })
}

export const useTasks = (queryTask: QueryTask) => {
    return useQuery({
        queryKey: ["tasks",queryTask],
        queryFn: () => getTasks(queryTask)
    })
}