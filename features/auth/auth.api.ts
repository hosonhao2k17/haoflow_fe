import {api} from "@/config/axios";
import { LoginDto } from "./interfaces/login-dto.interface";
import { LoginRdo } from "./interfaces/login-rdo.interface";
import { Register } from "./interfaces/register.interface";


export const login = async (dto: LoginDto): Promise<LoginRdo> => {
    const res = await api.post('auth/login',dto)
    return res.data;
}

export const logout = async () => {
    const res = await api.post('auth/logout');
    return res.data;
}

export const register = async (register: Register) => {
    const res = await api.post('auth/register',register);
    return res.data;
}

export const verify = async (token: string) => {
    const res = await api.get(`auth/verify?token=${token}`);
    return res.data;
}