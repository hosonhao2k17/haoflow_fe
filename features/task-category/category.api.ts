import { api } from "@/config/axios"
import { CreateTaskCategoryDto } from "./interfaces/create-task-category.interface";
import { QueryTaskCategory } from "./interfaces/query-task-category.interface";
import { UpdateTaskCategory } from "./interfaces/update-task-category.interface";



export const getTaskCategories = async (query: QueryTaskCategory) => {
    const res = await api.get('task-categories', {
        params: query
    });
    return res.data;
}

export const getTaskCategory = async (id: string) => {
    const res = await api.get(`task-categories/${id}`);
    return res.data;
}

export const createTaskCategory = async (dto: CreateTaskCategoryDto) => {
    const res = await api.post('task-categories', dto);
    return res.data;
}

export const updateTaskCategory = async (id: string, dto: UpdateTaskCategory) => {
    const res = await api.patch(`task-categories/${id}`,dto);
    return res.data
}

export const removeTaskCategory = async (id: string) => {
    await api.delete(`task-categories/${id}`)
}