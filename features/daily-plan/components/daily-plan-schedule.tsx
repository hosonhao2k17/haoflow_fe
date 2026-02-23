"use client"

import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle2, Calendar, Ban, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDailyPlans } from "../daly-plan.hook"
import { formatDate, formatHour, getWeekdayVN, isToday } from "@/lib/date"
import { DailyPlan } from "../interfaces/daily-plan.interface"
import { TaskStatus } from "@/common/constants/app.constant"


const DailyPlanSchedule = () => {

  const { data, isLoading } = useDailyPlans({})

  if (isLoading) return <div className="p-6">Loading...</div>
  if (!data) return null

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl flex gap-2 items-center font-semibold uppercase">
        Kế hoạch hằng tuần
        <Calendar />
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.items.map((plan: DailyPlan) => {
          console.log(plan)
          const total = plan.summary.totalTask
          const done = plan.summary.completedTasks

          const progress = Math.round((done / total) * 100)

          return (
            <div
              key={plan.id}
              className={cn(
                "bg-white rounded-2xl hover:shadow-2xl hover:shadow-primary border shadow-lg  transition-all p-5 flex flex-col",
                isToday(plan.date.toString()) && "shadow-2xl shadow-primary border-primary"
              )}
            >
              {/* DAY LABEL */}
              <p className="text-xs font-semibold text-primary">
                {getWeekdayVN(plan.date.toString())}
              </p>

              {/* TITLE */}
              <h2 className="font-semibold text-lg mt-1">
                {plan.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-xs text-muted-foreground mt-1">
                {plan.description}
              </p>

              {/* CREATED AT */}
              <p className="text-[11px] text-muted-foreground mt-2">
                Ngày thực hiện: {formatDate(plan.date)}
              </p>

              {/* TIME BLOCK */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                <Clock className="w-4 h-4" />
                  {formatHour(plan.timeBlock.startTime)} - {formatHour(plan.timeBlock.endTime)}
              </div>

              {/* PROGRESS */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>
                    {done}/{total} tasks hoàn thành
                  </span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>

              {/* TASKK */}
              <div className="mt-4">
                <div
                  className={cn(
                    "space-y-2 overflow-hidden",
                    total > 3 &&
                      "max-h-36 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
                  )}
                >
                  {plan.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex justify-between items-center text-sm bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">
                            {task.todo}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatHour(task.startTime)} - {formatHour(task.endTime)}
                          </p>
                        </div>

                        {task.status === TaskStatus.SKIPPED 
                          ? 
                          <Ban className="w-4 h-4 text-red-500 shrink-0" />
                          :
                          <Circle className="w-4 h-4 text-primary shrink-0"/>
                        }
                      </div>
                    ))}
                </div>

                {total > 3 && (
                  <p className="text-xs text-center text-muted-foreground mt-2 cursor-pointer">
                    Xem chi tiết →
                  </p>
                )}
              </div>
            </div>
            
          )
        })}
      </div>
    </div>
  )
}

export default DailyPlanSchedule