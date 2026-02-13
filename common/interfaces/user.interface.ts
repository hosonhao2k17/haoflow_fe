import { Gender, UserStatus } from "../constants/app.constant";
import { Role } from "./role.interface";

export interface User {
    id: string;
    fullName: string;
    email: string;
    avatar: string | null;
    gender: Gender;
    birthDate: string | null; // ISO string hoặc null

    status: UserStatus;

    role: Role;
}