
import { User } from "@/features/user/interfaces/user.interface";
import {api} from "@/config/axios";
import { QueryUserDto } from "./interfaces/query-user-dto.interface";
import { CreateUserDto } from "./interfaces/create-user-dto.interface";
import { UpdateUserDto } from "./interfaces/update-user-dto.interface";



export const getCurrentUser = async (): Promise<User> => {

    const res = await api.get<User>('users/me')
    return res.data;
}


export const getUsers = async (query: QueryUserDto = {}) => {
    const res = await api.get('users',{
        params: query
    })
    return res.data
}

export const createUser = async (createDto: CreateUserDto) => {
    const res = await api.post('users',createDto);
    return res.data
}

export const updateUser = async (id: string, updateDto: UpdateUserDto): Promise<User> => {
    const res = await api.patch(`users/${id}`, updateDto);
    return res.data;
}