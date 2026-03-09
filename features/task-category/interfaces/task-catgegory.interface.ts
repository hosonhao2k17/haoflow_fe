import { Base } from "@/common/interfaces/base.interface";



export interface TaskCategory extends Base {
    id: string;
    title: string;
    description?: string;
    color?: string;
    icon?: string;
    totalTask: number
}