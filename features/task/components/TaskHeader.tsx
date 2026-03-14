"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DailyPlan } from "@/features/daily-plan/interfaces/daily-plan.interface"
import { formatDate, getWeekdayVN } from "@/lib/date"
import { Bot, Plus, Smile, Frown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  data: DailyPlan
  setOpenTaskCreate: (open: boolean) => void;
  setOpenTaskAi: (open: boolean) => void;
}

const TaskHeader = ({ data, setOpenTaskCreate, setOpenTaskAi }: Props) => {
  const { progressPercent, completedTasks, totalTask } = data.summary
  const isHappy = progressPercent >= 50

  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
      <div className="h-1.5 w-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-700 ease-out rounded-r-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="px-4 sm:px-5 py-3 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-nowrap">
          {/* Title */}
          <h1 className="text-base sm:text-lg font-bold text-card-foreground truncate min-w-0 flex-1">
            {data.title}
          </h1>

          {/* Meta: Thứ · Ngày · Giờ */}
          <div className="flex items-center gap-2 shrink-0 text-xs text-muted-foreground">
            <span className="hidden sm:inline bg-muted/50 px-2 py-1 rounded-lg">
              {getWeekdayVN(data.date)}
            </span>
            <span className="hidden md:inline bg-muted/50 px-2 py-1 rounded-lg">
              {formatDate(data.date)}
            </span>
            <span className="bg-muted/50 px-2 py-1 rounded-lg whitespace-nowrap">
              {data.startTime.slice(0, 5)}–{data.endTime.slice(0, 5)}
            </span>
          </div>

          {/* Progress: X/Y + bar + % */}
          <div className="flex items-center gap-2 shrink-0 min-w-[100px] sm:min-w-[120px]">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              <span className="font-semibold text-foreground">{completedTasks}</span>/{totalTask}
            </span>
            <div className="flex-1 min-w-0 max-w-20">
              <Progress value={progressPercent} className="h-1.5 rounded-full" />
            </div>
            <span className={cn("text-xs font-bold w-8 text-right", isHappy ? "text-emerald-600" : "text-rose-600")}>
              {progressPercent}%
            </span>
            {isHappy ? <Smile className="w-3.5 h-3.5 text-emerald-600" /> : <Frown className="w-3.5 h-3.5 text-rose-600" />}
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5 rounded-lg"
              onClick={() => setOpenTaskCreate(true)}
            >
              <Plus className="w-3.5 h-3.5" />
              Thêm task
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5 rounded-lg"
              onClick={() => setOpenTaskAi(true)}
            >
              <Bot className="w-3.5 h-3.5" />
              AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskHeader