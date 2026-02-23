"use client"

import { CruMode } from "@/common/constants/app.constant"
import DailyPlanForm from "@/features/daily-plan/components/daily-plan-form"
import DailyPlanSchedule from "@/features/daily-plan/components/daily-plan-schedule"
import DailyPlanTool from "@/features/daily-plan/components/daily-plan-tool"
import { useDailyPlans } from "@/features/daily-plan/daly-plan.hook"
import { DailyPlan } from "@/features/daily-plan/interfaces/daily-plan.interface"
import { Calendar } from "lucide-react"
import { useState } from "react"



const task = () => {
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [cruMode, setCruMode] = useState<CruMode>(CruMode.CREATE);
    const [dailyPlan, setDailyPlan] = useState<DailyPlan>();
    const {data, isLoading} = useDailyPlans({})
    
    return (
        <>
            <div className="flex flex-col">
            
                <DailyPlanTool 
                    setOpen={setOpenCreate} 
                    setMode={setCruMode}
                />
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
            <DailyPlanForm 
                dailyPlan={dailyPlan}
                mode={cruMode}
                open={openCreate}
                setOpen={setOpenCreate}
            />
        </>
    )
}

export default task