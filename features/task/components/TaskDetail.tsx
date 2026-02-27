"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Task } from "../interfaces/task.interface"
import { Clock, Tag, AlignLeft } from "lucide-react"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  task?: Task
}

const TaskDetail = ({ open, setOpen, task }: Props) => {
  if (!task) return null

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

          <div className="h-px bg-border" />

          {/* Description */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
              <AlignLeft className="w-3.5 h-3.5" /> Mô tả
            </p>
            {task.description
              ? <p className="text-sm text-muted-foreground leading-relaxed">{task.description}</p>
              : <p className="text-sm text-muted-foreground italic">Không có mô tả</p>
            }
          </div>

          {/* Time */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
              <Clock className="w-3.5 h-3.5" /> Thời gian
            </p>
            <div className="flex items-center gap-2">
              <span className="bg-muted px-2.5 py-1 rounded-lg text-sm font-medium">
                {task.startTime.slice(0, 5)}
              </span>
              <span className="text-muted-foreground text-xs">→</span>
              <span className="bg-muted px-2.5 py-1 rounded-lg text-sm font-medium">
                {task.endTime.slice(0, 5)}
              </span>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
              <Tag className="w-3.5 h-3.5" /> Danh mục
            </p>
            {task.category?.title
              ? <span className="text-primary font-medium text-sm">{task.category.title}</span>
              : <span className="text-muted-foreground italic text-sm">Chưa có danh mục</span>
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TaskDetail
