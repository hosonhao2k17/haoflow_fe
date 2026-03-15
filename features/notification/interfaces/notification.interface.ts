import { Base } from "@/common/interfaces/base.interface";

export enum NotificationType {
  SYSTEM = 'system',
  TASK_ASSIGN = 'task_assign',
  BUDGET_THRESHOLD = 'budget_threshold',
  TASK_ALARM = 'task_alarm',
  REMIND_TASK = 'remind_task'
}
export interface Notification extends  Base {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  isRead: boolean;
  readAt: string;
  metadata?: Record<string, any>;
}
