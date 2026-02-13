import config from "@/config/config";
import { fetcher } from "@/lib/fetcher";

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginRdo {
    accessToken: string;
    expiresIn: number;
}

export const login = async (dto: LoginDto) => {
    const data = await fetcher<LoginRdo>(`auth/login`,{
        method: 'POST',
        body: JSON.stringify(dto)
    })
    return data;
}