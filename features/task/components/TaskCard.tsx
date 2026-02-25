import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react"
import { Task } from "../interfaces/task.interface"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import getColorPriority from "@/lib/priority";


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


    return (
        <div className="flex justify-between max-h-30 items-start">
                <div className="flex gap-4">
                  <button className="mt-1">
                    {task.status === "done" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="text-primary">
                      {index + 1}
                    </span>
                  </button>

                  <div>
                    <h3
                      className={cn(
                        "font-medium",
                        task.status === "done" &&
                          "line-through text-muted-foreground"
                      )}
                    >
                      {task.todo}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1">
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

                <div className="flex gap-2">
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