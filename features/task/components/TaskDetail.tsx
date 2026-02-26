"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Task } from "../interfaces/task.interface"
import { getColorPriority } from "@/lib/color"
import { TaskStatus } from "@/common/constants/app.constant"
import { Clock, Tag, Flame, AlignLeft, CheckCircle2, Circle, XCircle, MinusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  task?: Task
}

const statusConfig: Record<TaskStatus, { label: string; icon: React.ReactNode; className: string }> = {
  [TaskStatus.COMPLETED]: {
    label: "Hoàn thành",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  [TaskStatus.IN_PROGRESS]: {
    label: "Đang làm",
    icon: <Circle className="w-3.5 h-3.5" />,
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  [TaskStatus.SKIPPED]: {
    label: "Bỏ qua",
    icon: <XCircle className="w-3.5 h-3.5" />,
    className: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
  [TaskStatus.PENDING]: {
    label: "Chờ xử lý",
    icon: <MinusCircle className="w-3.5 h-3.5" />,
    className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  },
}

const Row = ({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
      {icon}
      {label}
    </p>
    <div className="text-sm text-card-foreground">{children}</div>
  </div>
)

const TaskDetail = ({ open, setOpen, task }: Props) => {
  if (!task) return null

  const status = statusConfig[task.status] ?? {
    label: task.status,
    icon: null,
    className: "bg-muted text-muted-foreground border-border",
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Chi tiết nhiệm vụ</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-1">
          {/* Title */}
          <div className="space-y-1">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Tiêu đề</p>
            <p className="text-base font-semibold text-card-foreground leading-snug">{task.todo}</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Description */}
          <Row label="Mô tả" icon={<AlignLeft className="w-3.5 h-3.5" />}>
            {task.description
              ? <p className="text-sm text-muted-foreground leading-relaxed">{task.description}</p>
              : <p className="text-sm text-muted-foreground italic">Không có mô tả</p>
            }
          </Row>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <Row label="Trạng thái" icon={<Circle className="w-3.5 h-3.5" />}>
              <Badge
                variant="outline"
                className={cn("flex w-fit items-center gap-1.5 text-xs px-2 py-0.5", status.className)}
              >
                {status.icon}
                {status.label}
              </Badge>
            </Row>

            <Row label="Độ ưu tiên" icon={<Flame className="w-3.5 h-3.5" />}>
              <Badge className={cn("text-xs px-2 py-0.5", getColorPriority(task.priority))}>
                {task.priority}
              </Badge>
            </Row>
          </div>

          {/* Time */}
          <Row label="Thời gian" icon={<Clock className="w-3.5 h-3.5" />}>
            <div className="flex items-center gap-2">
              <span className="bg-muted px-2.5 py-1 rounded-lg text-sm font-medium">
                {task.startTime.slice(0, 5)}
              </span>
              <span className="text-muted-foreground text-xs">→</span>
              <span className="bg-muted px-2.5 py-1 rounded-lg text-sm font-medium">
                {task.endTime.slice(0, 5)}
              </span>
            </div>
          </Row>

          {/* Category */}
          <Row label="Danh mục" icon={<Tag className="w-3.5 h-3.5" />}>
            {task.category?.title
              ? <span className="text-primary font-medium">{task.category.title}</span>
              : <span className="text-muted-foreground italic text-sm">Chưa có danh mục</span>
            }
          </Row>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TaskDetail