import { CreateUserDto } from "./create-user-dto.interface";
import { User } from "./user.interface";



export interface UserFormValue extends Partial<Omit<User,'role'>> {
    roleId?: string;
}