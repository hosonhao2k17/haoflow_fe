"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useDailyPlan } from "@/features/daily-plan/daly-plan.hook"
import { Task } from "@/features/task/interfaces/task.interface"
import TaskEdit from "@/features/task/components/TaskEdit"
import TaskCard from "@/features/task/components/TaskCard"
import TaskHeader from "@/features/task/components/TaskHeader"
import TaskCreate from "@/features/task/components/TaskCreate"
import TaskHeaderSkeleton from "@/features/task/components/Skeletons/TaskHeaderSkeleton"
import TaskListSkeleton from "@/features/task/components/Skeletons/TaskListSkeleton"
import TaskEmpty from "@/features/task/components/TaskEmpty"
import { AlertDialogDestructive } from "@/components/ui/aler-dialog"
import { useRemoveTask, useTasks } from "@/features/task/task.hook"
import { toast } from "sonner"
import { getCurrentTask } from "@/lib/task"
import TaskDetail from "@/features/task/components/TaskDetail"
import TaskAi from "@/features/task/components/TaskAi"

const DailyPlanDetail = () => {
  const { id } = useParams() as { id: string }
  if (!id) return null

  const [openTaskAi, setOpenTaskAi] = useState(false)
  const [task, setTask] = useState<Task>()
  const [openTaskRemove, setOpenTaskRemove] = useState(false)
  const [openTaskEdit, setOpenTaskEdit] = useState<string>()
  const [openTaskCreate, setOpenTaskCreate] = useState(false)
  const [openTaskDetail, setOpenTaskDetail] = useState<boolean>(false)

  const { data, isPending } = useDailyPlan(id)
  const { data: tasks, isPending: pendingTask } = useTasks({ dailyPlanId: id })
  const removeTaskMutation = useRemoveTask()

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(interval)
  }, [])

  const currentTask = getCurrentTask(tasks?.items ?? [])

  const handleRemove = () => {
    if (!task) return toast.error("Không thể tìm thấy task")
    removeTaskMutation.mutate(task.id, {
      onSuccess: () => toast.success("Xóa task thành công"),
    })
  }

  const renderTaskList = () => {
    if (pendingTask) return <TaskListSkeleton />
    if (!tasks?.items.length) return <TaskEmpty />

    return (
      <div className="grid grid-cols-3 gap-5 items-start">
        {tasks.items.map((task: Task, index: number) => (
          <div
            key={task.id}
            className={cn(
              "bg-white w-full rounded-xl p-4 hover:shadow-md transition border",
              currentTask?.id === task.id && "shadow-primary shadow-2xl border-primary"
            )}
          >
            {openTaskEdit === task.id ? (
              <TaskEdit setOpenTaskEdit={setOpenTaskEdit} task={task} dailyPlanId={id} />
            ) : (
              <TaskCard
                setOpenTaskRemove={setOpenTaskRemove}
                setTask={setTask}
                task={task}
                index={index}
                setOpenTaskEdit={setOpenTaskEdit}
                setOpenTaskDetail={setOpenTaskDetail}
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <AlertDialogDestructive
        open={openTaskRemove}
        setOpen={setOpenTaskRemove}
        onConfirm={handleRemove}
        title="Xóa task"
        content="Bạn có muốn xóa task này không"
      />

      <TaskCreate
        open={openTaskCreate}
        setOpen={setOpenTaskCreate}
        nearestEndDate={tasks?.items[tasks?.items.length - 1]?.endTime}
        dailyPlanId={id}
      />

      <TaskDetail 
        open={openTaskDetail}
        setOpen={setOpenTaskDetail}
        task={task}
      />

      {
        isPending 
        ? 
        <TaskHeaderSkeleton /> 
        : 
        <TaskHeader 
          data={data} 
          setOpenTaskCreate={setOpenTaskCreate} 
          setOpenTaskAi={setOpenTaskAi}
          />
      }
      <TaskAi 
        open={openTaskAi}
        setOpen={setOpenTaskAi}
      />
      {renderTaskList()}
    </div>
  )
}

export default DailyPlanDetail