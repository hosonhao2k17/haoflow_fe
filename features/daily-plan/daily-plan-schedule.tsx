"use client"

import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle2, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"


interface Task {
  id: string
  todo: string
  startTime: string
  endTime: string
  orderIndex: number
  status: "todo" | "done" | "skipped"
}

interface DailyPlan {
  id: string
  title: string
  description: string
  timeBlock: {
    startTime: Date
    endTime: Date
  }
  tasks: Task[]
  date: Date
  createdAt: Date
}

/* ================= HELPERS ================= */

const getVietnameseDayLabel = (date: Date) => {
  const map: Record<number, string> = {
    0: "Chủ nhật",
    1: "Thứ 2",
    2: "Thứ 3",
    3: "Thứ 4",
    4: "Thứ 5",
    5: "Thứ 6",
    6: "Thứ 7",
  }
  return map[date.getDay()]
}

const isSameDate = (d1: Date, d2: Date) =>
  d1.toDateString() === d2.toDateString()

const formatTime = (date: Date) =>
  date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  })

const formatDate = (date: Date) =>
  date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })


const baseDate = new Date()

const dailyPlans: DailyPlan[] = Array.from({ length: 7 }).map(
  (_, index) => {
    const date = new Date()
    date.setDate(baseDate.getDate() - baseDate.getDay() + index)

    return {
      id: `plan-${index}`,
      title: `Daily Focus ${index + 1}`,
      description: "Deep work + Learning + Training",
      timeBlock: {
        startTime: new Date(date.setHours(5, 0)),
        endTime: new Date(date.setHours(22, 0)),
      },
      date: new Date(date),
      createdAt: new Date(),
      tasks: [
        {
          id: `task-${index}-1`,
          todo: "Implement feature",
          startTime: "05:00",
          endTime: "08:00",
          orderIndex: 1,
          status: index % 2 === 0 ? "done" : "todo",
        },
        {
          id: `task-${index}-2`,
          todo: "Study English",
          startTime: "09:00",
          endTime: "11:00",
          orderIndex: 2,
          status: "todo",
        },
        {
          id: `task-${index}-3`,
          todo: "Workout",
          startTime: "17:00",
          endTime: "18:00",
          orderIndex: 3,
          status: "todo",
        },
        {
          id: `task-${index}-4`,
          todo: "Read book",
          startTime: "19:00",
          endTime: "21:00",
          orderIndex: 4,
          status: "todo",
        },
      ],
    }
  }
)

/* ================= COMPONENT ================= */

const DailyPlanSchedule = () => {
  const today = new Date()

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl flex gap-2 items-center font-semibold uppercase">
        Kế hoạch hằng tuần 
        <Calendar />
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dailyPlans.map((plan) => {
          const total = plan.tasks.length
          const done = plan.tasks.filter(
            (task) => task.status === "done"
          ).length

          const progress =
            total === 0 ? 0 : Math.round((done / total) * 100)

          return (
            <div
              key={plan.id}
              className={cn(
                "bg-white rounded-2xl border shadow-lg hover:shadow-xl transition-all p-5 flex flex-col",
                isSameDate(plan.date, today) &&
                  "ring-2 ring-primary"
              )}
            >
              {/* DAY LABEL */}
              <p className="text-xs font-semibold text-primary">
                {getVietnameseDayLabel(plan.date)}
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
                Created: {formatDate(plan.createdAt)}
              </p>

              {/* TIME BLOCK */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                <Clock className="w-4 h-4" />
                {formatTime(plan.timeBlock.startTime)} -{" "}
                {formatTime(plan.timeBlock.endTime)}
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

              {/* TASK PREVIEW */}
              <div className="mt-4">
                <div
                  className={cn(
                    "space-y-2 overflow-hidden",
                    total > 3 &&
                      "max-h-36 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
                  )}
                >
                  {plan.tasks
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex justify-between items-center text-sm bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">
                            {task.todo}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {task.startTime} - {task.endTime}
                          </p>
                        </div>

                        {task.status === "done" && (
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        )}
                      </div>
                    ))}
                </div>

                {total > 3 && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
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