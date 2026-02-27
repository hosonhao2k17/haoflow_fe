"use client"

import { Progress } from "@/components/ui/progress"
import { Clock, Calendar, Pencil, Trash, ArrowRight, CheckCircle2, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDate, getWeekdayVN, isToday } from "@/lib/date"
import { DailyPlan } from "../interfaces/daily-plan.interface"
import { CruMode } from "@/common/constants/app.constant"
import DailyPlanScheduleSkeleton from "./skeletons/daily-plan-schedule.skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  dailyPlans: DailyPlan[]
  isLoading: boolean
  setOpen: (open: boolean) => void
  setMode: (mode: CruMode) => void
  setDailyPlan: (dailyPlan: DailyPlan) => void
  setOpenRemove: (open: boolean) => void
}

const DailyPlanSchedule = ({
  dailyPlans,
  isLoading,
  setOpen,
  setMode,
  setDailyPlan,
  setOpenRemove,
}: Props) => {
  if (isLoading) return <DailyPlanScheduleSkeleton />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {dailyPlans.map((plan: DailyPlan) => {
        const { totalTask, completedTasks, progressPercent } = plan.summary
        const today = isToday(plan.date.toString())

        return (
          <div
            key={plan.id}
            className={cn(
              "group relative flex flex-col rounded-2xl border bg-card overflow-hidden",
              "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300",
              today && "border-primary shadow-lg shadow-primary/15"
            )}
          >
            {/* Top accent bar */}
            <div className={cn(
              "h-1 w-full",
              today ? "bg-primary" : "bg-muted"
            )}>
              <div
                className="h-full bg-primary transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex flex-col flex-1 p-5 gap-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      {getWeekdayVN(plan.date.toString())}
                    </span>
                    {today && (
                      <span className="text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                        Hôm nay
                      </span>
                    )}
                  </div>
                  <h2 className="font-bold text-base text-card-foreground leading-snug line-clamp-1">
                    {plan.title}
                  </h2>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-7 h-7 rounded-lg"
                    onClick={() => {
                      setDailyPlan(plan)
                      setMode(CruMode.UPDATE)
                      setOpen(true)
                    }}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-7 h-7 rounded-lg hover:bg-destructive/10"
                    onClick={() => {
                      setDailyPlan(plan)
                      setOpenRemove(true)
                    }}
                  >
                    <Trash className="w-3.5 h-3.5 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              {plan.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed -mt-1">
                  {plan.description}
                </p>
              )}

              {/* Meta */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/50 px-2 py-1 rounded-lg">
                  <Calendar className="w-3 h-3" />
                  {formatDate(plan.date)}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/50 px-2 py-1 rounded-lg">
                  <Clock className="w-3 h-3" />
                  {plan.startTime.slice(0, 5)} – {plan.endTime.slice(0, 5)}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/50 px-2 py-1 rounded-lg">
                  <Layers className="w-3 h-3" />
                  {totalTask} tasks
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1.5 mt-auto">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    <span className="font-semibold text-card-foreground">{completedTasks}</span>/{totalTask} hoàn thành
                  </span>
                  <span className={cn(
                    "text-[11px] font-bold flex items-center gap-1",
                    progressPercent === 100 ? "text-emerald-500" : "text-primary"
                  )}>
                    {progressPercent === 100 && <CheckCircle2 className="w-3 h-3" />}
                    {progressPercent}%
                  </span>
                </div>
                <Progress value={progressPercent} className="h-1.5" />
              </div>

              {/* Footer link */}
              <Link
                href={`/plan/${plan.id}`}
                className="flex items-center justify-between w-full pt-3 border-t border-border text-xs font-medium text-muted-foreground hover:text-primary transition-colors group/link"
              >
                <span>Xem chi tiết</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DailyPlanSchedule