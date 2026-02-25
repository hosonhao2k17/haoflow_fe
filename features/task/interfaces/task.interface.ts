import { TaskPriority, TaskStatus } from "@/common/constants/app.constant";
import { TaskCategory } from "@/features/category/interfaces/task-catgegory.interface";

export interface Task {
  id: string
  todo: string
  description?: string;
  priority: TaskPriority;
  startTime: string
  endTime: string
  orderIndex: number
  status: TaskStatus
  category?: TaskCategory
}
