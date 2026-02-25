import { TaskPriority, TaskStatus } from "@/common/constants/app.constant";

export const getColorPriority = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.OPTIONAL:
      return "bg-slate-100 text-slate-600 border-slate-200";

    case TaskPriority.LOW:
      return "bg-blue-50 text-blue-600 border-blue-200";

    case TaskPriority.MEDIUM:
      return "bg-amber-50 text-amber-600 border-amber-200";

    case TaskPriority.HIGH:
      return "bg-rose-50 text-rose-600 border-rose-200";

    case TaskPriority.CRITICAL:
      return "bg-red-100 text-red-700 border-red-300";

    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};


export const getColorActiveTaskStatus = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.TODO:
      return "data-[state=active]:bg-blue-500 data-[state=active]:text-white"
    case TaskStatus.DONE:
      return "data-[state=active]:bg-green-500 data-[state=active]:text-white"
    case TaskStatus.SKIPPED:
      return "data-[state=active]:bg-red-500 data-[state=active]:text-white"
    default:
      return ""
  }
}

export const getColorTaskStatus = (status: TaskStatus) => {
  switch(status) {
    case TaskStatus.TODO:
      return "shadow-blue-500 "
    case TaskStatus.DONE:
      return "shadow-green-500"
    case TaskStatus.SKIPPED:
      return "shadow-red-500"
    default: 
      return ""
  }
}