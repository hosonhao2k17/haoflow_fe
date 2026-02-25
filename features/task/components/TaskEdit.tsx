"use client"

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Task } from "../interfaces/task.interface"
import { Button } from "@/components/ui/button";
import { useTaskCategories } from "@/features/category/task-category.hook";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskCategory } from "@/features/category/interfaces/task-catgegory.interface";
import { TaskPriority } from "@/common/constants/app.constant";
import TaskSelectPriority from "./TaskSelectPriority";


interface Props {
    task: Task;
    setOpenTaskEdit: (open: string | undefined) => void;
}

const TaskEdit = ({
    task,
    setOpenTaskEdit
}: Props) => {

    const {data, isPending} = useTaskCategories({})

    return (
        <div className="space-y-4">
                <input
                  defaultValue={task.todo}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />

                <textarea
                  defaultValue={task.description}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />

                <div className="flex gap-2 justify-between">
                  <input
                    type="time"
                    defaultValue={task.startTime}
                    className="border rounded-md  px-3 py-2 text-sm"
                  />
                  <input
                    type="time"
                    defaultValue={task.endTime}
                    className="border rounded-md px-3 py-2 text-sm"
                  />
                  {/* select category  */}
                  <Select defaultValue={task.category ? task.category.id : ""}>
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn task"  />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Chọn danh mục</SelectLabel>
                            {
                                data?.items.map((item: TaskCategory) => (
                                    <SelectItem value={item.id}>{item.title}</SelectItem>
                                )) 
                            }
                        </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* select priority  */}
                  <TaskSelectPriority 
                    defaultValue={task.priority}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setOpenTaskEdit(undefined)}
                  >
                    Huỷ
                  </Button>

                  <Button size="sm">
                    Lưu
                  </Button>
                </div>
              </div>
    )
}

export default TaskEdit 