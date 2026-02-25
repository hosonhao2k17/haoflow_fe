"use client"

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Task } from "../interfaces/task.interface"
import { Button } from "@/components/ui/button";
import { useTaskCategories } from "@/features/category/task-category.hook";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskCategory } from "@/features/category/interfaces/task-catgegory.interface";
import { TaskPriority } from "@/common/constants/app.constant";
import TaskSelectPriority from "./TaskSelectPriority";
import { useEffect, useState } from "react";
import { EditDailyPlan } from "@/features/daily-plan/interfaces/edit-daily-plan.interface";
import { useUpdateTask } from "../task.hook";
import { UpdateTask } from "../interfaces/update-task.interface";
import { toast } from "sonner";


interface Props {
    task: Task;
    setOpenTaskEdit: (open: string | undefined) => void;
    dailyPlanId: string;
}

const TaskEdit = ({
    task,
    setOpenTaskEdit,
    dailyPlanId
}: Props) => {

    const {data, isPending} = useTaskCategories({})

    const updateTaskMutation = useUpdateTask();
    
    const [form, setForm] = useState<UpdateTask>({
      todo: task.todo,
      description: task.description,
      priority: task.priority,
      startTime: task.startTime.slice(0,5),
      endTime: task.endTime.slice(0,5),
      categoryId: task.category ? task.category.id : undefined,
      dailyPlanId
    });
    

    const handleUpdate = () => {
      updateTaskMutation.mutate({
        id: task.id,
        dto: form 
      },{
        onSuccess: () => {
          toast.success("Cập nhật thành công")
          setOpenTaskEdit(undefined)
        },
        onError: (error: any) => {
          toast.error("Cập nhật không thành công")
          console.log(error.response.data)
        }
      })
         
    }
    return (
        <div className="space-y-4">
                <input
                  disabled={updateTaskMutation.isPending}
                  value={form.todo}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  onChange={(e) => setForm({
                    ...form,
                    todo: e.target.value
                  })}
                />

                <textarea
                  disabled={updateTaskMutation.isPending}
                  value={form.description}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  onChange={(e) => setForm({
                    ...form,
                    description: e.target.value
                  })}
                />

                <div className="flex gap-2 justify-between">
                  <input
                    disabled={updateTaskMutation.isPending}
                    type="time"
                    value={form.startTime}
                    className="border rounded-md  px-3 py-2 text-sm"
                    onChange={(e) => setForm({
                      ...form,
                      startTime: e.target.value
                    })}
                  />
                  <input
                    disabled={updateTaskMutation.isPending}
                    type="time"
                    value={form.endTime}
                    className="border rounded-md px-3 py-2 text-sm"
                    onChange={(e) => setForm({
                      ...form,
                      endTime: e.target.value
                    })}
                  />
                  {/* select category  */}
                  <Select 
                    disabled={updateTaskMutation.isPending}
                    defaultValue={form.categoryId}
                    onValueChange={(val) => setForm({
                      ...form,
                      categoryId: val
                    })}
                  >
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
                    handleValueChange={(val) => {
                      setForm({
                        ...form,
                        priority: val
                      })
                    }}
                    defaultValue={form.priority as TaskPriority}
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

                  <Button 
                    disabled={updateTaskMutation.isPending}
                    size="sm"
                    onClick={handleUpdate}
                  >
                    Lưu
                  </Button>
                </div>
              </div>
    )
}

export default TaskEdit 