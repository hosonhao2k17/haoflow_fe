import { UserStatus } from "@/common/constants/app.constant";
import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";
import { User } from "@/common/interfaces/user.interface";
import {api} from "@/config/axios";



export const getCurrentUser = async (): Promise<User> => {

    const res = await api.get<User>('users/me')
    return res.data;
}

export interface QueryUserDto extends OffsetPaginationDto {
    keyword?: string;
    gender?: string;
    status?: UserStatus;
    roleId?: string;
    verified?: boolean;
    createdBy?: string;
    updatedBy?: string;
}
export const getUsers = async (query: QueryUserDto = {}) => {
    const res = await api.get('users',{
        params: query
    })
    return res.data
}

export interface CreateUserDto extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy' | 'role'> {
    password: string;
}

export const createUser = async (createDto: CreateUserDto) => {
    const res = await api.post('users',createDto);
    return res.data
}