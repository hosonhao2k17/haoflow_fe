import { api } from "@/config/axios";
import { OffsetPaginationRdo } from "@/common/interfaces/offset-pagination.interface";
import { Budget } from "./interfaces/budget.interface";
import { CreateBudget } from "./interfaces/create-budget.interface";
import { QueryBudget } from "./interfaces/query-budget.interface";
import { UpdateBudget } from "./interfaces/update-budget.interface";

const BASE = "budgets";

/** Response list budgets (chuẩn BE: items + pagination) */
export interface BudgetListResponse {
    items: Budget[];
    pagination: OffsetPaginationRdo;
}

export const getBudgets = async (query: QueryBudget): Promise<BudgetListResponse> => {
    const res = await api.get(BASE, { params: query }) as BudgetListResponse | { data: BudgetListResponse };
    return "data" in res && res.data ? res.data : (res as BudgetListResponse);
};

export const getBudgetById = async (id: string): Promise<Budget> => {
    const res = await api.get(`${BASE}/${id}`) as Budget | { data: Budget };
    return "data" in res && res.data ? res.data : (res as Budget);
};

export const createBudget = async (dto: CreateBudget): Promise<Budget> => {
    const res = await api.post(BASE, dto) as Budget | { data: Budget };
    return "data" in res && res.data ? res.data : (res as Budget);
};

export const updateBudget = async (id: string, dto: UpdateBudget): Promise<Budget> => {
    const res = await api.patch(`${BASE}/${id}`, dto) as Budget | { data: Budget };
    return "data" in res && res.data ? res.data : (res as Budget);
};

export const deleteBudget = async (id: string): Promise<void> => {
    await api.delete(`${BASE}/${id}`);
};