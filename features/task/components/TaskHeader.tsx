import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DailyPlan } from "@/features/daily-plan/interfaces/daily-plan.interface"
import { formatDate } from "@/lib/date"
import { Angry, Bot, Clock, Pencil, Plus, Smile } from "lucide-react"

interface Props {
    data: DailyPlan;
    setOpenTaskCreate: (open: boolean) => void;
}

const TaskHeader = ({
    data,
    setOpenTaskCreate
}: Props) => {


    return (
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
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setOpenTaskCreate(true)}
            >
              <Plus className="w-4 h-4" />
              Thêm
            </Button>
            <Button variant="outline" size="sm">
              <Bot className="w-4 h-4" />
              AI
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

        <div className="">
          <div className="flex justify-between text-xs mb-1">
            <span>
              {data.summary.completedTasks}/{data.summary.totalTask} Công việc đã hoàn thành
            </span>
            <span className="flex gap-2 items-center text-primary font-bold">
              {data.summary.progressPercent}%
              {
                data.summary.progressPercent < 50
                ?
                <Angry />
                :
                <Smile />
              }
            </span>
          </div>
          <Progress value={data.summary.progressPercent} />
        </div>
      </div>
    )
}

export default TaskHeader 