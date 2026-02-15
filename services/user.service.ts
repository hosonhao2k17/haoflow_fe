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
    status?: string;
    roleId?: string;
    createdBy?: string;
    updatedBy?: string;
}
export const getUsers = async (query: QueryUserDto = {}) => {
    const res = await api.get('users',{
        params: query
    })
    return res.data
}