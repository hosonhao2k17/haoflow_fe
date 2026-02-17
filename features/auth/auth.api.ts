import {api} from "@/config/axios";
import { LoginDto } from "./interfaces/login-dto.interface";
import { LoginRdo } from "./interfaces/login-rdo.interface";


export const login = async (dto: LoginDto): Promise<LoginRdo> => {
    const res = await api.post('auth/login',dto)
    return res.data;
}