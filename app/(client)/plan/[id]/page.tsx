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
import TaskEdit from "@/features/task/components/TaskEdit"
import TaskCard from "@/features/task/components/TaskCard"
import TaskHeader from "@/features/task/components/TaskHeader"
import TaskCreate from "@/features/task/components/TaskCreate"




const DailyPlanDetail = () => {

  const [openTaskEdit, setOpenTaskEdit] = useState<string>();
  const [openTaskCreate, setOpenTaskCreate] = useState<boolean>(false)
  const { id } = useParams()
  if(!id) return;
  const {data} = useDailyPlan(id as string);
  if(!data) return;
  console.log("NEAREST ===>")
  console.log(data?.tasks[data.tasks.length - 1].endTime)
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">

      <TaskCreate 
        open={openTaskCreate}
        setOpen={setOpenTaskCreate}
        nearestEndDate={data?.tasks[data.tasks.length - 1].endTime}
        dailyPlanId={id as string}
      />
      {/* HEADER */}
      <TaskHeader 
        data={data}
        setOpenTaskCreate={setOpenTaskCreate}
      />

      {/* TASK LIST */}
      <div className="grid grid-cols-2 gap-5 items-start">
        {data?.tasks.map((task: Task, index: number) => (
          <div
            key={task.id}
            className="bg-white w-full shadow-xl border rounded-xl p-4 hover:shadow-md transition"
          >
            {
            openTaskEdit === task.id 
            ? 
            (
              
              <TaskEdit 
                setOpenTaskEdit={setOpenTaskEdit}
                task={task}
                dailyPlanId={id as string}
              />
            ) 
            : 
            (
              
              <TaskCard 
                task={task}
                index={index}
                setOpenTaskEdit={setOpenTaskEdit}
              />

            )}
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default DailyPlanDetail