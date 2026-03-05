"use client"

import { CruMode } from "@/common/constants/app.constant"
import { AlertDialogDestructive } from "@/components/ui/aler-dialog"
import { DailyPlanEmpty } from "@/features/daily-plan/components/DailyPlanEmpty"
import DailyPlanForm from "@/features/daily-plan/components/DailyPlanForm"
import DailyPlanSchedule from "@/features/daily-plan/components/DailyPlanSchedule"
import DailyPlanTool from "@/features/daily-plan/components/DailyPlanTool"
import { useDailyPlans, useRemoveDailyPlan } from "@/features/daily-plan/daly-plan.hook"
import { DailyPlan } from "@/features/daily-plan/interfaces/daily-plan.interface"
import { getRangeWeek } from "@/lib/date"
import { Calendar } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"



const DailyPlanPage = () => {

    const [startDate, setStartDate] = useState<string>(getRangeWeek().startDate);
    const [endDate, setEndDate] = useState<string>(getRangeWeek().endDate);
    
    const [open, setOpen] = useState<boolean>(false);
    const [openRemove, setOpenRemove] = useState<boolean>(false);
    const [cruMode, setCruMode] = useState<CruMode>(CruMode.CREATE);
    const [dailyPlan, setDailyPlan] = useState<DailyPlan>();
    const {data, isLoading, error} = useDailyPlans({
        startDate,
        endDate
    })
    
    const removeDailyPlanMutation = useRemoveDailyPlan();

    const handleRemove = () => {
        removeDailyPlanMutation.mutate(dailyPlan?.id as string, {
            onSuccess: () => {
                toast.success("Loại bỏ kế hoạch thành công")
                setOpenRemove(false)
            },
            onError: () => {
                toast.error("Loại bỏ kế hoạch không thành công"),
                setOpenRemove(false)
            }
        })
    }
    return (
        <>
            <div className="flex flex-col">
            
                <DailyPlanTool 
                    setOpen={setOpen} 
                    setMode={setCruMode}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    startDate={startDate}
                    endDate={endDate}
                />
                <div className="p-6 space-y-6">
                    <h1 className="text-2xl flex gap-2 items-center font-semibold uppercase">
                        Kế hoạch hằng tuần
                        <Calendar />
                    </h1>
                    {
                        data?.items.length === 0
                        ?
                        <DailyPlanEmpty 
                            setOpenCreate={setOpen}
                        />
                        :
                        <DailyPlanSchedule 
                            dailyPlans={data?.items}
                            isLoading={isLoading}
                            setOpenRemove={setOpenRemove}
                            setOpen={setOpen}
                            setMode={setCruMode}
                            setDailyPlan={setDailyPlan}
                        />
                    }
                </div>
                
            </div>
            <DailyPlanForm 
                dailyPlan={dailyPlan}
                mode={cruMode}
                open={open}
                setOpen={setOpen}
            />
            <AlertDialogDestructive 
                open={openRemove}
                setOpen={setOpenRemove}
                title="Xác nhận muốn xóa"
                content="Bạn muốn xóa kế hoạch này chứ"
                onConfirm={handleRemove}
            />
        </>
    )
}

export default DailyPlanPage