"use client"

import { Task } from "../interfaces/task.interface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTaskCategories } from "@/features/category/task-category.hook"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TaskCategory } from "@/features/category/interfaces/task-catgegory.interface"
import { TaskPriority } from "@/common/constants/app.constant"
import TaskSelectPriority from "./TaskSelectPriority"
import { useState } from "react"
import { useUpdateTask } from "../task.hook"
import { UpdateTask } from "../interfaces/update-task.interface"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { Save, X, Clock, Tag } from "lucide-react"

interface Props {
  task: Task
  setOpenTaskEdit: (open: string | undefined) => void
  dailyPlanId: string
}

const TaskEdit = ({ task, setOpenTaskEdit, dailyPlanId }: Props) => {
  const { data } = useTaskCategories({})
  const updateTaskMutation = useUpdateTask()

  const [form, setForm] = useState<UpdateTask>({
    todo: task.todo,
    description: task.description,
    priority: task.priority,
    startTime: task.startTime.slice(0, 5),
    endTime: task.endTime.slice(0, 5),
    categoryId: task.category ? task.category.id : undefined,
    dailyPlanId,
  })

  const patch = (key: keyof UpdateTask, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleUpdate = () => {
    updateTaskMutation.mutate(
      { id: task.id, dto: form },
      {
        onSuccess: () => {
          toast.success("Cập nhật thành công")
          setOpenTaskEdit(undefined)
        },
        onError: (error: any) => {
          toast.error("Cập nhật không thành công")
          console.log(error.response.data)
        },
      }
    )
  }

  const disabled = updateTaskMutation.isPending

  return (
    <div className="space-y-3">
      {/* Todo */}
      <Input
        disabled={disabled}
        value={form.todo}
        placeholder="Tên task..."
        className="text-sm font-medium"
        onChange={(e) => patch("todo", e.target.value)}
      />

      {/* Description */}
      <Textarea
        disabled={disabled}
        value={form.description}
        placeholder="Mô tả..."
        rows={2}
        className="text-sm resize-none"
        onChange={(e) => patch("description", e.target.value)}
      />

      {/* Time + Category + Priority */}
      <div className="grid grid-cols-2 gap-2">
        {/* Start time */}
        <div className="relative">
          <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            disabled={disabled}
            type="time"
            value={form.startTime}
            className="pl-8 text-sm"
            onChange={(e) => patch("startTime", e.target.value)}
          />
        </div>

        {/* End time */}
        <div className="relative">
          <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            disabled={disabled}
            type="time"
            value={form.endTime}
            className="pl-8 text-sm"
            onChange={(e) => patch("endTime", e.target.value)}
          />
        </div>

        {/* Category */}
        <Select
          disabled={disabled}
          defaultValue={form.categoryId}
          onValueChange={(val) => patch("categoryId", val)}
        >
          <SelectTrigger className="text-sm">
            <Tag className="w-3.5 h-3.5 text-muted-foreground mr-1" />
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Chọn danh mục</SelectLabel>
              {data?.items.map((item: TaskCategory) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Priority */}
        <TaskSelectPriority
          handleValueChange={(val) => patch("priority", val)}
          defaultValue={form.priority as TaskPriority}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-1">
        <Button
          size="sm"
          variant="ghost"
          className="h-8 text-xs"
          onClick={() => setOpenTaskEdit(undefined)}
        >
          <X className="w-3.5 h-3.5 mr-1" />
          Huỷ
        </Button>

        <Button
          size="sm"
          disabled={disabled}
          className="h-8 text-xs"
          onClick={handleUpdate}
        >
          {disabled ? (
            <Spinner className="w-3.5 h-3.5 mr-1" />
          ) : (
            <Save className="w-3.5 h-3.5 mr-1" />
          )}
          Lưu
        </Button>
      </div>
    </div>
  )
}

export default TaskEdit