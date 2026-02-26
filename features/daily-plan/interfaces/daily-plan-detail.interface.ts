import { Task } from "@/features/task/interfaces/task.interface";
import { DailyPlan } from "./daily-plan.interface";



export interface DailyPlanDetail extends DailyPlan {
    currentTask: Task
}