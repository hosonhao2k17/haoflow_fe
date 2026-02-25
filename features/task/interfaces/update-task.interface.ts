import { TaskStatus } from "@/common/constants/app.constant";
import { Createtask } from "./create-task.interface";



export interface UpdateTask extends Partial<Createtask> {
    status?: TaskStatus;
}