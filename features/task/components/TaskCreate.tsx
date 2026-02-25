import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TaskCategory } from "@/features/category/interfaces/task-catgegory.interface";
import { useTaskCategories } from "@/features/category/task-category.hook";
import TaskSelectPriority from "./TaskSelectPriority";
import { TaskPriority } from "@/common/constants/app.constant";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Createtask } from "../interfaces/create-task.interface";
import { useCreateDailyPlan } from "@/features/daily-plan/daly-plan.hook";
import { useCreateTask } from "../task.hook";
import { toast } from "sonner";



interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    nearestEndDate?: string;
    dailyPlanId: string;
}

const TaskCreate = ({
    open,
    setOpen,
    nearestEndDate = '00:00:00',
    dailyPlanId
}: Props) => {
    const useCreateTaskMutation = useCreateTask()
    const dfState = {
        todo: "",
        priority: TaskPriority.MEDIUM,
        startTime: nearestEndDate,
        endTime: nearestEndDate,
        categoryId: "",
        dailyPlanId
    }
    const [form, setForm] = useState<Createtask>(dfState);
    useEffect(() => {
    if (nearestEndDate) {
        setForm(prev => ({
        ...prev,
        startTime: nearestEndDate.slice(0, 5),
        endTime: nearestEndDate.slice(0, 5),
        }))
    }
    }, [nearestEndDate])
    const handleCreate = () => {
        useCreateTaskMutation.mutate(form, {
            onSuccess: (val) => {
                toast.success("Tạo kế hoạch thành công")
                setForm(dfState)
                setOpen(false)
            },
            onError: (err: any) => {
                console.log(err.response.data)
                toast.error("Tạo kế hoạch thất bại")
            }
        } )
    }
    const {data} = useTaskCategories({})
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent>
                <DialogTitle>Tạo nhiệm vụ</DialogTitle>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Tiêu đề</FieldLabel>
                        <Input
                            disabled={useCreateTaskMutation.isPending} 
                            placeholder="Nhập tiêu đề"
                            onChange={(e) => setForm({...form, todo: e.target.value})}
                        />
                    </Field>
                    <Field>
                        <FieldLabel>Mô tả: </FieldLabel>
                        <Textarea 
                            disabled={useCreateTaskMutation.isPending} 
                            placeholder="Nhập mô tả"
                            onChange={(e) => setForm({...form, description: e.target.value})}
                        />
                    </Field>
                    <div className="flex gap-5">
                        <Field>
                            <FieldLabel>Giờ bắt đầu</FieldLabel>
                            <Input
                                disabled={useCreateTaskMutation.isPending} 
                                type="time" 
                                value={form.startTime}
                                onChange={(e) => setForm({...form, startTime: e.target.value.slice(0,5)})}
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Giờ kết thúc</FieldLabel>
                            <Input
                                disabled={useCreateTaskMutation.isPending} 
                                type="time"
                                value={form.endTime} 
                                onChange={(e) => setForm({...form, endTime: e.target.value.slice(0,5)})}
                                
                            />
                        </Field>
                    </div>
                    <div className="flex gap-5">
                        
                        <Field>
                            <FieldLabel>Danh mục: </FieldLabel>
                            <Select disabled={useCreateTaskMutation.isPending}  onValueChange={(val) => setForm({...form, categoryId: val})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn danh mục" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Chọn danh mục</SelectLabel>
                                        {
                                            data?.items.map((item: TaskCategory) => (
                                                <SelectItem value={item.id}>{item.title}</SelectItem>
                                            ))
                                        }
                                        </SelectGroup>
                                    </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel>Độ ưu tiên: </FieldLabel>
                            <TaskSelectPriority 
                            handleValueChange={(val) => setForm({...form, priority: val})}
                            defaultValue={TaskPriority.MEDIUM}
                        />
                        </Field>
                    </div>
                </FieldGroup>
                <Button 
                    disabled={useCreateTaskMutation.isPending}  
                    onClick={handleCreate} 
                    className="uppercase"
                >
                    Tạo nhiệm vụ
                    <CalendarPlus />
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default TaskCreate 