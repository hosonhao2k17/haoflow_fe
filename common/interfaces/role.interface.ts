import { Action } from "../constants/app.constant";


export interface Role {
    id: string;
    name: string;
    title: string;
    permissions: Permission[];
}

export interface Permission {
    action: Action;
    subject: string;
}