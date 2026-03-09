import { TaskCategory } from "./task-catgegory.interface";



export interface CreateTaskCategoryDto extends Omit<TaskCategory,"id" | "createdAt" | "updatedAt" | "totalTask" >{

}