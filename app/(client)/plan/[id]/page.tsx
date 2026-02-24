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



const DailyPlanDetail = () => {
  const { id } = useParams()


  
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="bg-white rounded-2xl border shadow p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">
              Thứ 2 như buoi
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Thứ 3 như buon
            </p>
          </div>

          <Button variant="outline" size="sm">
            <Pencil className="w-4 h-4 mr-2" />
            Edit Plan
          </Button>
        </div>

        <div className="text-xs text-muted-foreground flex gap-6">
          <span>Date: {22/11/2025}</span>
          <span>
            Created: 23/11/2027
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {`10:00`} -{" "}
            {`20:00`}
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
        {[].map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-primary shadow-xl border rounded-xl p-4 flex justify-between items-start hover:shadow-md transition"
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
                onClick={() =>{}}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() =>{} }
              >
                <ArrowDown className="w-4 h-4" />
              </Button>

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