import { api } from "@/config/axios";
import { Createtask } from "./interfaces/create-task.interface";
import { UpdateTask } from "./interfaces/update-task.interface";
import { QueryTask } from "./interfaces/query-task.interface";
import { CreateMultiTask } from "./interfaces/create-multi-task.interface";
import { TaskStats } from "./interfaces/task-stats.interface";
import { StatsType } from "./constants/stats-type.constant";

export const taskStats = async (type: StatsType): Promise<TaskStats> => {
  const res = await api.get<TaskStats>("tasks/stats", { params: { type } });
  return res.data;
};


export const createMultiTask = async (req: CreateMultiTask) => {

    const res = await api.post(`tasks/multi`,req);
    return res.data
}

export const getTasks = async (queryDto: QueryTask) => {
    const res = await api.get('tasks',{
        params: queryDto
    });
    return res.data;
}

export const aiSuggest = async (prompt: string) => {
    const res = await api.post(`tasks/ai/suggest`,{
        prompt
    });
    return res.data;
}

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