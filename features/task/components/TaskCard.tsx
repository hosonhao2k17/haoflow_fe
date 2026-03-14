"use client"

import { Pencil, Trash2, Clock, Tag, Flame } from "lucide-react"
import { Task } from "../interfaces/task.interface"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getColorPriority } from "@/lib/color"
import { TaskStatus } from "@/common/constants/app.constant"
import { useUpdateTask } from "../task.hook"
import { toast } from "sonner"
import TaskStatusTab from "./TaskStatusTab"

interface Props {
  task: Task
  index: number
  setOpenTaskEdit: (open: string) => void
  setOpenTaskRemove: (open: boolean) => void
  setTask: (task: Task) => void
  setOpenTaskDetail: (open: boolean) => void
}

const TaskCard = ({
  task,
  index,
  setOpenTaskEdit,
  setOpenTaskRemove,
  setTask,
  setOpenTaskDetail,
}: Props) => {
  const updateTaskMutation = useUpdateTask()

  const handleChangeStatus = (status: TaskStatus) => {
    updateTaskMutation.mutate(
      { id: task.id as string, dto: { status } },
      {
        onSuccess: () => toast.success("Cập nhật trạng thái thành công"),
        onError: (err: any) => {
          toast.error("Cập nhật trạng thái thất bại")
          console.log(err.response.data)
        },
      }
    )
  }

  const isSkipped = task.status === TaskStatus.SKIPPED

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Status */}
          <div className="shrink-0 pt-0.5">
            <TaskStatusTab
              isPending={updateTaskMutation.isPending}
              handleChangeValue={(val) => handleChangeStatus(val as TaskStatus)}
              defaultStatus={task.status}
            />
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setTask(task); setOpenTaskDetail(true) }}
                className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                {index + 1}
              </button>
              <h3
                className={cn(
                  "font-semibold text-sm leading-snug truncate",
                  isSkipped && "line-through text-muted-foreground"
                )}
              >
                {task.todo}
              </h3>
            </div>

            
              <p
                className={cn(
                  "text-xs text-muted-foreground line-clamp-3 leading-relaxed",
                  isSkipped && "line-through"
                )}
              >
                {task.description ? task.description : "Không có mô tả...."}
              </p>
            
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 shrink-0">
          <Button
            size="icon"
            variant="ghost"
            className="w-7 h-7 rounded-lg hover:bg-muted"
            onClick={() => setOpenTaskEdit(task.id)}
          >
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="w-7 h-7 rounded-lg hover:bg-destructive/10"
            onClick={() => { setOpenTaskRemove(true); setTask(task) }}
          >
            <Trash2 className="w-3.5 h-3.5 text-destructive" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap pl-0.5">
        {/* Time */}
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
          <Clock className="w-3 h-3" />
          <span>{task.startTime.slice(0, 5)} – {task.endTime.slice(0, 5)}</span>
        </div>

        {/* Category */}
        <div className="flex max-w-30  items-center gap-1 text-[11px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
          <Tag className="w-3 h-3" />
          <span className={cn(task.category ? "text-primary font-medium" : "")}>
            {task.category ? task.category.title : "Chưa có"}
          </span>
        </div>

        {/* Priority */}
        <div className="flex items-center gap-1">
          <Flame className="w-3 h-3 text-muted-foreground" />
          <Badge className={cn("text-[10px] px-1.5 py-0 h-4", getColorPriority(task.priority))}>
            {task.priority}
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default TaskCard