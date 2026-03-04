import { api } from "@/config/axios";
import { QueryAccount } from "./interfaces/query-account.interface";
import { CreateAccount } from "./interfaces/create-account.interface";
import { UpdateAccount } from "./interfaces/update-account.interface";
import { Account } from "./interfaces/account.interface";

export const getAccounts = async (query: QueryAccount): Promise<{items: Account[], pagination: any}> => {
    const res = await api.get('accounts', { params: query });
    return res.data;
};

export const createAccount = async (create: CreateAccount) => {
    const res = await api.post('accounts', create);
    return res.data;
};

export const updateAccount = async (id: string, update: UpdateAccount) => {
    const res = await api.patch(`accounts/${id}`, update);
    return res.data;
};

export const removeAccount = async (id: string) => {
    const res = await api.delete(`accounts/${id}`);
    return res.data;
};