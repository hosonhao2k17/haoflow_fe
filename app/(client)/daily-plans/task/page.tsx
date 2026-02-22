import DailyPlanSchedule from "@/features/daily-plan/daily-plan-schedule"
import DailyPlanTool from "@/features/daily-plan/daily-plan-tool"



const task = () => {


    return (
        <div className="flex flex-col">

            <DailyPlanTool />
            <DailyPlanSchedule />
        </div>
    )
}

export default task