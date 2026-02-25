import { Task } from "./task.interface";



export interface Createtask extends Pick<Task,'todo' | 'description' | 'priority' | 'startTime' | 'endTime'> {

    categoryId: string;
    dailyPlanId: string;
}