import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryAccount } from "./interfaces/query-account.interface";
import { CreateAccount } from "./interfaces/create-account.interface";
import { UpdateAccount } from "./interfaces/update-account.interface";
import { createAccount, getAccounts, removeAccount, updateAccount } from "./account.api";

const QUERY_KEY = "accounts";

export const useAccounts = (query: QueryAccount) => {
    return useQuery({
        queryKey: [QUERY_KEY, query],
        queryFn: () => getAccounts(query),
    });
};

export const useCreateAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (create: CreateAccount) => createAccount(create),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
    });
};

export const useUpdateAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, update }: { id: string; update: UpdateAccount }) => updateAccount(id, update),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
    });
};

export const useRemoveAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => removeAccount(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
    });
};