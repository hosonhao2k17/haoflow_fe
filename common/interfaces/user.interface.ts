import { Gender, UserStatus } from "../constants/app.constant";
import { Base } from "./base.interface";
import { Role } from "./role.interface";

export interface User extends Base{
    id: string;
    fullName: string;
    email: string;
    avatar: string | null;
    gender: Gender;
    birthDate: string | null; 
    verified: boolean;
    status: UserStatus;

    role: Role;
}