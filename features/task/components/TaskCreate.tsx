"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TaskCategory } from "@/features/task-category/interfaces/task-catgegory.interface"
import { useTaskCategories } from "@/features/task-category/task-category.hook"
import TaskSelectPriority from "./TaskSelectPriority"
import { TaskPriority } from "@/common/constants/app.constant"
import { Button } from "@/components/ui/button"
import { CalendarPlus, Clock, Tag, Flame } from "lucide-react"
import { useEffect, useState } from "react"
import { Createtask } from "../interfaces/create-task.interface"
import { useCreateTask } from "../task.hook"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  nearestEndDate?: string
  dailyPlanId: string
}

const TaskCreate = ({
  open,
  setOpen,
  nearestEndDate = "00:00:00",
  dailyPlanId,
}: Props) => {
  const createTaskMutation = useCreateTask()
  const { data } = useTaskCategories({})

  const dfState: Createtask = {
    todo: "",
    priority: TaskPriority.MEDIUM,
    startTime: nearestEndDate.slice(0, 5),
    endTime: nearestEndDate.slice(0, 5),
    categoryId: "",
    isAlarm: false,
    dailyPlanId,
  }

  const [form, setForm] = useState<Createtask>(dfState)

  useEffect(() => {
    if (nearestEndDate) {
      setForm((prev) => ({
        ...prev,
        startTime: nearestEndDate.slice(0, 5),
        endTime: nearestEndDate.slice(0, 5),
      }))
    }
  }, [nearestEndDate])

  const patch = (key: keyof Createtask, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleCreate = () => {
    createTaskMutation.mutate(form, {
      onSuccess: () => {
        toast.success("Tạo nhiệm vụ thành công")
        setForm(dfState)
        setOpen(false)
      },
      onError: (err: any) => {
        console.log(err.response)
        toast.error("Tạo nhiệm vụ thất bại")
      },
    })
  }

  const disabled = createTaskMutation.isPending

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Tạo nhiệm vụ mới</DialogTitle>
          <DialogDescription className="text-xs">
            Điền thông tin để thêm nhiệm vụ vào kế hoạch hôm nay
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Todo */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Tiêu đề</Label>
            <Input
              disabled={disabled}
              placeholder="Nhập tiêu đề nhiệm vụ..."
              className="text-sm"
              onChange={(e) => patch("todo", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Mô tả</Label>
            <Textarea
              disabled={disabled}
              placeholder="Nhập mô tả (tuỳ chọn)..."
              className="text-sm resize-none"
              rows={2}
              onChange={(e) => patch("description", e.target.value)}
            />
          </div>
          {/* alarm */}
          <div className="space-y-1.5">
            <Label>Báo thức</Label>
            <Switch 
              checked={form.isAlarm}
              onCheckedChange={(checked) => patch("isAlarm", checked)}
            />
          </div>
          {/* Time */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Thời gian
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground">Bắt đầu</span>
                <Input
                  disabled={disabled}
                  type="time"
                  value={form.startTime}
                  className="text-sm"
                  onChange={(e) => patch("startTime", e.target.value.slice(0, 5))}
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground">Kết thúc</span>
                <Input
                  disabled={disabled}
                  type="time"
                  value={form.endTime}
                  className="text-sm"
                  onChange={(e) => patch("endTime", e.target.value.slice(0, 5))}
                />
              </div>
            </div>
          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Danh mục
              </Label>
              <Select disabled={disabled} onValueChange={(val) => patch("categoryId", val)}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Danh mục</SelectLabel>
                    {data?.items.map((item: TaskCategory) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> Độ ưu tiên
              </Label>
              <TaskSelectPriority
                handleValueChange={(val) => patch("priority", val)}
                defaultValue={TaskPriority.MEDIUM}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          disabled={disabled}
          onClick={handleCreate}
          className="w-full mt-1 gap-2"
        >
          {disabled ? (
            <Spinner className="w-4 h-4" />
          ) : (
            <CalendarPlus className="w-4 h-4" />
          )}
          Tạo nhiệm vụ
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default TaskCreate