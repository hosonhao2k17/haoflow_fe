"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CalendarDays, Clock, Save } from "lucide-react"
import { CruMode } from "@/common/constants/app.constant"
import { DailyPlan } from "../interfaces/daily-plan.interface"
import { useEffect, useState } from "react"
import { CreateDailyPlan } from "../interfaces/create-daily-plan.interface"
import { useCreateDailyPlan, useEditDailyPlan } from "../daly-plan.hook"
import { toast } from "sonner"
import { formatDate, formatDateForInput } from "@/lib/date"
import { EditDailyPlan } from "../interfaces/edit-daily-plan.interface"
import { Spinner } from "@/components/ui/spinner"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void;
  mode: CruMode;
  dailyPlan?: DailyPlan;

}

const DailyPlanForm = ({ 
    open, 
    setOpen, 
    mode, 
    dailyPlan, 
}: Props) => {

    const dfState = {
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        date: new Date().toISOString().split("T")[0]
    }
    const [form, setForm] = useState<CreateDailyPlan | EditDailyPlan>(dfState);

    useEffect(() => {
        if (dailyPlan && mode === CruMode.UPDATE) {
            setForm({
                title: dailyPlan.title,
                description: dailyPlan.description,
                startTime: dailyPlan.startTime?.slice(0, 5),
                endTime: dailyPlan.endTime?.slice(0, 5),
                date: dailyPlan.date.split("T")[0],
            })
        } else {
            setForm(dfState)
        }
    }, [dailyPlan, mode])
    const editDailyPlanMutation = useEditDailyPlan();
    const createDailyPlanMutation = useCreateDailyPlan();

    const isPending = mode === CruMode.CREATE
        ? createDailyPlanMutation.isPending
        : editDailyPlanMutation.isPending;
    const handleCreate = () => {
        createDailyPlanMutation.mutate(form as CreateDailyPlan,{
            onSuccess: () => {
                toast.success("Tạo thành công")
                setForm(dfState);
                setOpen(false)
            },
            onError: (error: any) => {
                toast.error("Tạo thất bại")
                setForm(dfState)
                
            }
        })
    }


    const handleEdit = () => {
        editDailyPlanMutation.mutate({id: dailyPlan?.id as string, dto: form},{
            onSuccess: () => {
                toast.success("Cập nhật thành công")
                setOpen(false)
            },
            onError: (error: any) => {
                toast.error("Cập nhật thất bại")
                console.log(error.response.data)
            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg rounded-2xl p-0 overflow-hidden">

                {/* Header */}
                <div className="bg-[#1E3A8A] text-white px-6 py-5">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold tracking-wide flex items-center gap-2">
                            <CalendarDays className="w-5 h-5" />
                            {mode === CruMode.CREATE ? "Thêm hoạch hằng ngày" : "Sửa kế hoạch hằng ngày"}
                        </DialogTitle>
                    </DialogHeader>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 bg-white">

                {/* Date */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                            Ngày thực hiện
                        </Label>
                        <Input
                            disabled={isPending}
                            type="date"
                            onChange={(e) => setForm({...form, date: e.target.value})}
                            className="rounded-xl focus-visible:ring-[#1E3A8A]"
                            value={form.date}
                        />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                            Tiêu đề
                        </Label>
                        <Input
                            disabled={isPending}
                            placeholder="Ví dụ: Học Next.js 30 phút"
                            className="rounded-xl focus-visible:ring-[#1E3A8A]"
                            value={form.title}
                            onChange={(e) => setForm({...form, title: e.target.value})}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                             Mô tả
                        </Label>
                        <Textarea
                            disabled={isPending}
                            rows={3}
                            placeholder="Ghi chú thêm nếu cần..."
                            className="rounded-xl resize-none focus-visible:ring-[#1E3A8A]"
                            value={form.description}
                            onChange={(e) => setForm({...form, description: e.target.value})}
                        />
                    </div>

                    {/* Time Block */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#1E3A8A]" />
                            Khung giờ
                        </Label>

                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border">
                            <div className="space-y-2">
                                <Label className="text-xs text-gray-500">
                                Bắt đầu
                                </Label>
                                <Input
                                    disabled={isPending}
                                    type="time"
                                    onChange={(e) => setForm({...form, startTime: e.target.value})}
                                    className="rounded-xl focus-visible:ring-[#1E3A8A]"
                                    value={form.startTime}
                                    
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs text-gray-500">
                                    Kết thúc
                                </Label>
                                <Input
                                    disabled={isPending}
                                    type="time"
                                    className="rounded-xl focus-visible:ring-[#1E3A8A]"
                                    onChange={(e) => setForm({...form, endTime: e.target.value})}
                                    value={form.endTime}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <DialogFooter className="px-6 py-4 bg-gray-50 border-t flex justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => setOpen(false)}
                    >
                        Huỷ
                    </Button>
                    <Button disabled={isPending} onClick={() => mode === CruMode.CREATE ? handleCreate() : handleEdit()} className="bg-[#1E3A8A] hover:bg-[#162c6b] text-white rounded-xl">
                        Lưu nhiệm vụ
                        {
                            isPending
                            ?
                            <Spinner />
                            :
                            <Save />
                        }
                    </Button>
                    </DialogFooter>

                </DialogContent>
        </Dialog>
    )
}

export default DailyPlanForm