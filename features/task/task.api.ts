import { api } from "@/config/axios";
import { Createtask } from "./interfaces/create-task.interface";
import { UpdateTask } from "./interfaces/update-task.interface";




export const createTask = async (createDto: Createtask) => {
    const res = await api.post('tasks',createDto);
    return res.data;
}

export const updateTask = async (id: string, updateDto: UpdateTask) => {
    const res = await api.patch(`tasks/${id}`,updateDto);
    return res.data;
}

export const removeTask = async (id: string) => {
    const res = await api.delete(`tasks/${id}`);
    return res.data;
}