import { Base } from "@/common/interfaces/base.interface"
import { SummaryTask } from "@/features/task/interfaces/summary-task.interface"
import { Task } from "@/features/task/interfaces/task.interface"


export interface DailyPlan extends Base {
  id: string
  title: string
  description: string
  summary: SummaryTask;
  timeBlock: {
    startTime: string
    endTime: string
  }
  tasks: Task[]
  date: Date
}