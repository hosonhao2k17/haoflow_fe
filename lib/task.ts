import { Task } from "@/features/task/interfaces/task.interface"


export const getCurrentTask = (tasks: Task[]) => {
  const now = new Date()
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  
  return tasks?.find(task => 
    task.startTime <= currentTime && currentTime <= task.endTime
  )
}