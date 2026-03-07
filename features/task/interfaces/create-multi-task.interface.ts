import { TaskStatus } from "@/common/constants/app.constant";
import { Createtask } from "./create-task.interface";


export interface MultiTask extends Omit<Createtask,'dailyPlanId' > {
}

export interface CreateMultiTask {
    dailyPlanId: string;
    tasks: MultiTask[];
}