import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBudget, deleteBudget, getBudgetById, getBudgets, updateBudget} from "./budget.api";
import { QueryBudget } from "./interfaces/query-budget.interface";
import { CreateBudget } from "./interfaces/create-budget.interface";
import { UpdateBudget } from "./interfaces/update-budget.interface";

const QUERY_KEY = "budgets";

export const useBudgets = (query: QueryBudget) => {
    return useQuery({
        queryKey: [QUERY_KEY, query],
        queryFn: () => getBudgets(query),
        staleTime: 1000 * 60 * 5,
    });
};

export const useBudgetById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: () => getBudgetById(id),
        enabled: !!id,
    });
};

export const useCreateBudget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateBudget) => createBudget(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });
};

export const useUpdateBudget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dto }: { id: string; dto: UpdateBudget }) =>
            updateBudget(id, dto),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
        },
    });
};

export const useDeleteBudget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteBudget(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });
};