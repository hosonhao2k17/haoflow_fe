"use client"

import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle2, Calendar, Ban, Circle, Pencil, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDailyPlans } from "../daly-plan.hook"
import { formatDate, formatHour, getWeekdayVN, isToday } from "@/lib/date"
import { DailyPlan } from "../interfaces/daily-plan.interface"
import { CruMode, TaskStatus } from "@/common/constants/app.constant"
import DailyPlanScheduleSkeleton from "./skeletons/daily-plan-schedule.skeleton"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"


interface Props {
  dailyPlans: DailyPlan[];
  isLoading: boolean;
  setOpen: (open: boolean) => void;
  setMode: (mode: CruMode) => void;
  setDailyPlan: (dailyPlan: DailyPlan) => void;
  setOpenRemove: (open: boolean) => void;
}

const DailyPlanSchedule = ({
  dailyPlans,
  isLoading,
  setOpen,
  setMode,
  setDailyPlan,
  setOpenRemove
}: Props) => {


  return isLoading
        ? 
        <DailyPlanScheduleSkeleton />
        :
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dailyPlans.map((plan: DailyPlan) => {
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
              <div className="flex justify-between">
                <p className="text-lg font-semibold uppercase text-primary">
                  {getWeekdayVN(plan.date.toString())}
                </p>
                <div>
                  <Button 
                    onClick={() => {
                      
                      setDailyPlan(plan)
                      setMode(CruMode.UPDATE)
                      setOpen(true)
                    }} 
                    size="sm" 
                    className="text-primary"  
                    variant="ghost"
                  >
                    <Pencil />
                  </Button>
                  <Button
                    size="sm" 
                    className="text-red-500"  
                    variant="ghost"
                    onClick={() => {
                      setDailyPlan(plan)
                      setOpenRemove(true)
                      
                    }}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
              <Separator className="h-3 bg-primary"/>
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
                  {plan.startTime.slice(0,5)} - {plan.endTime.slice(0,5 )}
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

                
                  <Link href={`/plan/${plan.id}`} className="text-xs text-center text-muted-foreground mt-2 cursor-pointer">
                    Xem chi tiết →
                  </Link>
                
              </div>
            </div>
            
          )
        })}
      </div>
     
}

export default DailyPlanSchedule