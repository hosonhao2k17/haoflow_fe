import { TaskCategory } from "./task-catgegory.interface";


export interface TaskCategoryFormValue extends Omit<TaskCategory,"id" | "createdAt" | "updatedAt" | "totalTask" > {

}