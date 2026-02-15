import { User } from "@/common/interfaces/user.interface";
import { fetcher } from "@/lib/fetcher"



export const getCurrentUser = async (): Promise<User> => {

    const data = await fetcher<User>(`users/me`);

    return data;
}

export const getUsers = async () => {
    return await fetcher<any>(`users`);
}