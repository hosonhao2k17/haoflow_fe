import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DailyPlan } from "@/features/daily-plan/interfaces/daily-plan.interface"
import { formatDate } from "@/lib/date"
import { Clock, Pencil, Plus } from "lucide-react"

interface Props {
    data: DailyPlan
}

const TaskHeader = ({
    data 
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
    )
}

export default TaskHeader 