import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react"
import { Task } from "../interfaces/task.interface"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import {getColorPriority} from "@/lib/color";
import { TaskStatus } from "@/common/constants/app.constant";
import { useUpdateTask } from "../task.hook";
import { toast } from "sonner";
import TaskStatusTab from "./TaskStatusTab";


interface Props {
    task: Task,
    index: number,
    setOpenTaskEdit: (open: string) => void;
}

const TaskCard = ({
    task,
    index,
    setOpenTaskEdit
}: Props) => {

  const updateTaskMutation = useUpdateTask()
  const handleChangeStatus = (status: TaskStatus) => {

    updateTaskMutation.mutate({
        id: task.id as string,
        dto: {status}
      },{
        onSuccess: () => {
          toast.success("Cập nhật trạng thái thành công")
        },
        onError: (err: any) => {
          toast.error("Cập nhật trạng thái thất bại");
          console.log(err.response.data)
        }
      }
    )
  }
  
  return (
      <div className="flex justify-between max-h-30 relative items-start">
              <div className="flex gap-4">
                <TaskStatusTab
                  isPending={updateTaskMutation.isPending}
                  handleChangeValue={handleChangeStatus}
                  defaultStatus={task.status}
                />

                <div>
                  <h3
                    className={cn(
                      "font-medium",
                      task.status === TaskStatus.SKIPPED &&
                        "line-through text-muted-foreground"
                    )}
                  >
                    {task.todo}
                  </h3>

                  <p className={cn(
                    "text-sm text-muted-foreground mt-1",
                    task.status === TaskStatus.SKIPPED &&
                        "line-through text-muted-foreground"
                  )}
                  >
                    {task.description}
                  </p>

                  <div className="text-xs items-center text-muted-foreground mt-2 flex gap-5">
                    <p>
                      {task.startTime.slice(0,5)} - {task.endTime.slice(0,5)}
                    </p>
                    <p>
                      Danh mục: <span className="text-primary font-bold">
                        {task.category
                          ? task.category.title
                          : "Chưa có"}
                      </span>
                    </p>
                    <p>
                      Mức độ ưu tiên: <Badge className={getColorPriority(task.priority)}>{task.priority}</Badge>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex absolute gap-1 right-0">
                <Button size="sm" className="rounded-full" variant="outline">
                  {index + 1}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpenTaskEdit(task.id)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button size="icon" variant="ghost">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
  )
}

export default TaskCard 