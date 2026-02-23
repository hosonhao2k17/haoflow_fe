import { Base } from "@/common/interfaces/base.interface"
import { SummaryTask } from "@/features/task/interfaces/summary-task.interface"
import { Task } from "@/features/task/interfaces/task.interface"


export interface DailyPlan extends Base {
  id: string
  title: string
  description: string
  summary: SummaryTask;
  timeBlock: {
    startTime: Date
    endTime: Date
  }
  tasks: Task[]
  date: Date
}