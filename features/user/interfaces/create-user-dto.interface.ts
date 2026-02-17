import { User } from "@/features/user/interfaces/user.interface";

export interface CreateUserDto extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy' | 'role'> {
    password: string;
}