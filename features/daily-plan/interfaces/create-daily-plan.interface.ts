import { DailyPlan } from "./daily-plan.interface";



export interface CreateDailyPlan extends Pick<DailyPlan, 'title' | 'description' | 'timeBlock' | 'date'> {

}