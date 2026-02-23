"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Clock,
  CheckCircle2,
  Circle,
  Trash2,
  Pencil,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ================= TYPES ================= */

interface Task {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  orderIndex: number
  status: "todo" | "done" | "skipped"
}

interface DailyPlan {
  id: string
  title: string
  description: string
  date: Date
  createdAt: Date
  timeBlock: {
    startTime: Date
    endTime: Date
  }
  tasks: Task[]
}

/* ================= MOCK DATA ================= */

const mockData: DailyPlan = {
  id: "1",
  title: "Deep Work Monday",
  description: "API + English + Workout",
  date: new Date(),
  createdAt: new Date(),
  timeBlock: {
    startTime: new Date(new Date().setHours(5, 0)),
    endTime: new Date(new Date().setHours(22, 0)),
  },
  tasks: [
    {
      id: "1",
      title: "Implement Daily Plan API",
      description: "Build create + update endpoint",
      startTime: "05:00",
      endTime: "08:00",
      orderIndex: 1,
      status: "done",
    },
    {
      id: "2",
      title: "Study English",
      description: "Speaking practice 30 mins",
      startTime: "09:00",
      endTime: "11:00",
      orderIndex: 2,
      status: "todo",
    },
    {
      id: "3",
      title: "Workout",
      description: "Push day training",
      startTime: "17:00",
      endTime: "18:30",
      orderIndex: 3,
      status: "todo",
    },
  ],
}

/* ================= HELPERS ================= */

const formatDate = (date: Date) =>
  date.toLocaleDateString("vi-VN")

const formatTime = (date: Date) =>
  date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  })

/* ================= PAGE ================= */

const DailyPlanDetail = () => {
  const { id } = useParams()
  const [plan, setPlan] = useState<DailyPlan>(mockData)

  const sortedTasks = [...plan.tasks].sort(
    (a, b) => a.orderIndex - b.orderIndex
  )

  const total = plan.tasks.length
  const done = plan.tasks.filter(
    (t) => t.status === "done"
  ).length
  const progress =
    total === 0 ? 0 : Math.round((done / total) * 100)

  /* ===== ACTIONS ===== */

  const toggleStatus = (taskId: string) => {
    setPlan((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "done"
                  ? "todo"
                  : "done",
            }
          : task
      ),
    }))
  }

  const moveTask = (taskId: string, direction: "up" | "down") => {
    const index = sortedTasks.findIndex(
      (t) => t.id === taskId
    )

    if (
      (direction === "up" && index === 0) ||
      (direction === "down" &&
        index === sortedTasks.length - 1)
    )
      return

    const newTasks = [...sortedTasks]
    const swapIndex =
      direction === "up" ? index - 1 : index + 1

    ;[newTasks[index], newTasks[swapIndex]] = [
      newTasks[swapIndex],
      newTasks[index],
    ]

    setPlan({
      ...plan,
      tasks: newTasks.map((t, i) => ({
        ...t,
        orderIndex: i + 1,
      })),
    })
  }

  const deleteTask = (taskId: string) => {
    setPlan({
      ...plan,
      tasks: plan.tasks.filter(
        (t) => t.id !== taskId
      ),
    })
  }

  /* ================= UI ================= */

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="bg-white rounded-2xl border shadow p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">
              {plan.title}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {plan.description}
            </p>
          </div>

          <Button variant="outline" size="sm">
            <Pencil className="w-4 h-4 mr-2" />
            Edit Plan
          </Button>
        </div>

        <div className="text-xs text-muted-foreground flex gap-6">
          <span>Date: {formatDate(plan.date)}</span>
          <span>
            Created: {formatDate(plan.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatTime(plan.timeBlock.startTime)} -{" "}
            {formatTime(plan.timeBlock.endTime)}
          </span>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>
              {done}/{total} tasks completed
            </span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      </div>

      {/* TASK LIST */}
      <div className="space-y-4">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-primary shadow-xl border rounded-xl p-4 flex justify-between items-start hover:shadow-md transition"
          >
            <div className="flex gap-4">
              <button
                onClick={() =>
                  toggleStatus(task.id)
                }
                className="mt-1"
              >
                {task.status === "done" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              <div>
                <h3
                  className={cn(
                    "font-medium",
                    task.status === "done" &&
                      "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {task.description}
                </p>

                <p className="text-xs text-muted-foreground mt-2">
                  {task.startTime} - {task.endTime}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  moveTask(task.id, "up")
                }
              >
                <ArrowUp className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  moveTask(task.id, "down")
                }
              >
                <ArrowDown className="w-4 h-4" />
              </Button>

              <Button size="icon" variant="ghost">
                <Pencil className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  deleteTask(task.id)
                }
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyPlanDetail