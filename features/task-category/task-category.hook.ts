import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryTaskCategory } from "./interfaces/query-task-category.interface";
import { getTaskCategories, createTaskCategory, updateTaskCategory, removeTaskCategory } from "./category.api";
import { CreateTaskCategoryDto } from "./interfaces/create-task-category.interface";
import { UpdateTaskCategory } from "./interfaces/update-task-category.interface";


export const useTaskCategories = (query: QueryTaskCategory) => {
    return useQuery({
        queryKey: ["taskCategories", query],
        queryFn: () => getTaskCategories(query)
    });
};


export const useCreateTaskCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateTaskCategoryDto) => createTaskCategory(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["taskCategories"] });
        }
    });
};


export const useUpdateTaskCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskCategory }) =>
            updateTaskCategory(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["taskCategories"] });
        }
    });
};


export const useRemoveTaskCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => removeTaskCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["taskCategories"] });
        }
    });
};