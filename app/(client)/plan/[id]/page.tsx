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
  Move,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDailyPlan } from "@/features/daily-plan/daly-plan.hook"
import { Task } from "@/features/task/interfaces/task.interface"
import { formatDate } from "@/lib/date"




const DailyPlanDetail = () => {
  const { id } = useParams()
  if(!id) return;
  const {data} = useDailyPlan(id as string);
  console.log(data)
  if(!data) return;
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="bg-white rounded-2xl border shadow p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">
              {data.title}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {data.description}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4" />
              Thêm
            </Button>
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4" />
              Sửa
            </Button>
          </div>
          
        </div>

        <div className="text-xs text-muted-foreground flex gap-6">
          <span>Ngày: {formatDate(data.date)}</span>
          <span>
            Tạo vào: {formatDate(data.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {data.startTime.slice(0,5)} -{" "}
            {data.endTime.slice(0,5)}
          </span>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>
              {30}/{40} Công việc đã hoàn thành
            </span>
            <span>{30}%</span>
          </div>
          <Progress value={40} />
        </div>
      </div>

      {/* TASK LIST */}
      <div className="space-y-4 gap-5 grid grid-cols-2">
        {data?.tasks.map((task: Task, index: number) => (
          <div
            key={task.id}
            className="bg-white  shadow-xl border rounded-xl p-4 flex justify-between items-start hover:shadow-md transition"
          >
            <div className="flex gap-4">
              <button
                onClick={() => {}}
                className="mt-1"
              >
                {task.status === "done" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
                <span className="text-primary">
                  {index + 1}
                </span>
              </button>

              <div>
                <h3
                  className={cn(
                    "font-medium",
                    task.status === "done" &&
                      "line-through text-muted-foreground"
                  )}
                >
                  {task.todo}
                </h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {task.description}
                </p>

                <div className="text-xs items-center text-muted-foreground mt-2 flex gap-5">
                  <p >
                    {task.startTime.slice(0,5)} - {task.endTime.slice(0,5)}
                  </p>
                  {
                    <span className="flex gap-1">
                      Danh mục: <p className="text-primary font-bold">{task.category ? task.category.title : "Chưa có"}</p>
                    </span>
                    
                  }
                </div>
              </div>
            </div>

            <div className="flex gap-2">

              <Button size="icon" variant="ghost">
                <Pencil className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => {}}
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