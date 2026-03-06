"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DailyPlan } from "@/features/daily-plan/interfaces/daily-plan.interface"
import { formatDate, getWeekdayVN } from "@/lib/date"
import { Bot, Calendar, Clock, Plus, Smile, Frown } from "lucide-react"
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
    <div className="rounded-2xl border bg-card overflow-hidden">
      {/* Progress bar at very top */}
      <div className="h-1 w-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="p-6 space-y-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1 min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-card-foreground truncate">
              {data.title}
            </h1>
            {data.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {data.description}
              </p>
            )}
          </div>

          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5"
              onClick={() => setOpenTaskCreate(true)}
            >
              <Plus className="w-3.5 h-3.5" />
              Thêm task
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs gap-1.5"
              onClick={() => setOpenTaskAi(true)}
            >
              <Bot className="w-3.5 h-3.5" />
              AI
            </Button>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5" />
            <span>{getWeekdayVN(data.date)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(data.date)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5" />
            <span>{data.startTime.slice(0, 5)} – {data.endTime.slice(0, 5)}</span>
          </div>
        </div>

        {/* Progress row */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              <span className="font-semibold text-card-foreground">{completedTasks}</span>
              /{totalTask} công việc hoàn thành
            </span>
            <div className={cn(
              "flex items-center gap-1.5 text-xs font-bold",
              isHappy ? "text-emerald-500" : "text-rose-500"
            )}>
              <span>{progressPercent}%</span>
              {isHappy
                ? <Smile className="w-4 h-4" />
                : <Frown className="w-4 h-4" />
              }
            </div>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>
    </div>
  )
}

export default TaskHeader