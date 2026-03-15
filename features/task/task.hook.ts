import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Createtask } from "./interfaces/create-task.interface"
import { aiSuggest, createMultiTask, createTask, getTasks, removeTask, updateTask } from "./task.api"
import { UpdateTask } from "./interfaces/update-task.interface"
import { IdPayload } from "@/common/interfaces/id-payload.interface"
import { Task } from "./interfaces/task.interface"
import { QueryTask } from "./interfaces/query-task.interface"
import { CreateMultiTask } from "./interfaces/create-multi-task.interface"
import { taskStats } from "./task.api";
import { StatsType } from "./constants/stats-type.constant";

export const useCreateTask = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: Createtask) => createTask(dto),
        onSuccess: (data: Task) => {
            queryClient.invalidateQueries({queryKey:  ["tasks"]})
        }
    })
}

export const useTaskStats = (type: StatsType) => {
  return useQuery({
    queryKey: ["tasks", "stats", type],
    queryFn: () => taskStats(type),
  });
};

export const useCreateMultiTask = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: CreateMultiTask) => createMultiTask(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:  ["tasks"]})
        }
        
    })
}

export const useAiSuggest = () => {

    return useMutation({
        mutationFn: (prompt: string) => aiSuggest(prompt)
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