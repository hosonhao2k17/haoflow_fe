import { api } from "@/config/axios";
import { CreateBudget } from "./interfaces/create-budget.interface";
import { QueryBudget } from "./interfaces/query-budget.interface";
import { UpdateBudget } from "./interfaces/update-budget.interface";

export const getBudgets = async (query: QueryBudget) => {
    const res = await api.get('budgets', { params: query });
    return res.data;
}

export const getBudgetById = async (id: string) => {
    const res = await api.get(`budgets/${id}`);
    return res.data;
}

export const createBudget = async (dto: CreateBudget) => {
    const res = await api.post('budgets', dto);
    return res.data;
}

export const updateBudget = async (id: string, dto: UpdateBudget) => {
    const res = await api.patch(`budgets/${id}`, dto);
    return res.data;
}

export const deleteBudget = async (id: string) => {
    const res = await api.delete(`budgets/${id}`);
    return res.data;
}