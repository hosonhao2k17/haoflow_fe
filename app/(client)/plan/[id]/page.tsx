"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useDailyPlan } from "@/features/daily-plan/daly-plan.hook"
import { Task } from "@/features/task/interfaces/task.interface"
import { formatDate } from "@/lib/date"
import TaskEdit from "@/features/task/components/TaskEdit"
import TaskCard from "@/features/task/components/TaskCard"
import TaskHeader from "@/features/task/components/TaskHeader"
import TaskCreate from "@/features/task/components/TaskCreate"
import TaskHeaderSkeleton from "@/features/task/components/Skeletons/TaskHeaderSkeleton"
import TaskListSkeleton from "@/features/task/components/Skeletons/TaskListSkeleton"
import TaskEmpty from "@/features/task/components/TaskEmpty"




const DailyPlanDetail = () => {

  const [openTaskEdit, setOpenTaskEdit] = useState<string>();
  const [openTaskCreate, setOpenTaskCreate] = useState<boolean>(false)
  const { id } = useParams()
  if(!id) return;
  const {data, isPending} = useDailyPlan(id as string);
  const currentTask: Task = data.currentTask;
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">

      <TaskCreate 
        open={openTaskCreate}
        setOpen={setOpenTaskCreate}
        nearestEndDate={data?.tasks[data.tasks.length - 1]?.endTime}
        dailyPlanId={id as string}
      />
      
      {/* HEADER */}
      {
        isPending
        ?
        <TaskHeaderSkeleton />
        :
        <TaskHeader 
        data={data}
        setOpenTaskCreate={setOpenTaskCreate}
      />
      }

      {/* TASK LIST */}
      {
        isPending
        ?
        <TaskListSkeleton />
        :data?.tasks.length === 0
        ?
        <TaskEmpty />
        :
        <div className="grid grid-cols-2 gap-5 items-start">
          
          {
          
          data?.tasks.map((task: Task, index: number) => (
            <div
              key={task.id}
              className={
                cn(
                  "bg-white w-full rounded-xl p-4 hover:shadow-md transition",
                  currentTask.id === task.id ? "shadow-primary shadow-2xl border border-primary" : " border"
                )
              }
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
      }
      
    </div>
  )
}

export default DailyPlanDetail