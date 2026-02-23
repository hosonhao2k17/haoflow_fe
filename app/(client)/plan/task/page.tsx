"use client"

import DailyPlanSchedule from "@/features/daily-plan/components/daily-plan-schedule"
import DailyPlanTool from "@/features/daily-plan/components/daily-plan-tool"
import { useDailyPlans } from "@/features/daily-plan/daly-plan.hook"
import { Calendar } from "lucide-react"



const task = () => {

    const {data, isLoading} = useDailyPlans({})
    return (
        <div className="flex flex-col">

            <DailyPlanTool />
            <div className="p-6 space-y-6">
                <h1 className="text-2xl flex gap-2 items-center font-semibold uppercase">
                    Kế hoạch hằng tuần
                    <Calendar />
                </h1>
                <DailyPlanSchedule 
                    dailyPlans={data?.items}
                    isLoading={isLoading}
                />
            </div>
            
        </div>
    )
}

export default task