import {api} from "@/config/axios";

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginRdo {
    accessToken: string;
    expiresIn: number;
}

export const login = async (dto: LoginDto) => {
    const res = await api.post('auth/login',dto)
    return res.data;
}