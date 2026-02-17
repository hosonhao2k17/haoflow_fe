import { Gender, UserStatus } from "../../../common/constants/app.constant";
import { Base } from "../../../common/interfaces/base.interface";
import { Role } from "../../role/interfaces/role.interface";

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