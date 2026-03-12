import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PiggyBank, Pencil } from "lucide-react";
import { Budget } from "../interfaces/budget.interface";
import BudgetForm from "./BudgetForm";
import { BudgetFormValue } from "../interfaces/budget-form.interface";
import { useEffect, useState } from "react";
import { useUpdateBudget } from "../budget.hook";
import { toast } from "sonner";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    budget?: Budget;
}

const BudgetUpdate = ({ open, setOpen, budget }: Props) => {
    if(!budget) return;
    const [form, setForm] = useState<BudgetFormValue>({
        categoryId: budget.category.id,
        amount: budget.amount,
        period: budget.period,
        startDate: budget.startDate,
        alertThreshold: budget.alertThreshold,
    });

    useEffect(() => {
        if(budget) {
            setForm({
                categoryId: budget.category.id,
                amount: budget.amount,
                period: budget.period,
                startDate: budget.startDate,
                alertThreshold: budget.alertThreshold,
            })
        }
    },[budget])

    const {mutate} = useUpdateBudget()
    const handleUpdate = () => {
        mutate({
            id: budget.id,
            dto: form 
        }, {
            onSuccess: () => {
                toast.success("Cập nhật tài chính")
                setOpen(false)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-2xl max-w-md p-0 gap-0 overflow-hidden">

                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
                            <Pencil size={15} className="text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-sm font-bold leading-tight">
                                Chỉnh sửa ngân sách
                            </DialogTitle>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                {budget.category.icon} {budget.category.title}
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                {/* Form */}
                <div className="px-6 py-5 space-y-5">
                    <BudgetForm budget={form} setBudget={setForm} />

                    <div className="flex gap-2 pt-1">
                        <Button
                            variant="outline"
                            className="flex-1 h-10 rounded-xl text-sm"
                            onClick={() => setOpen(false)}
                        >
                            Huỷ
                        </Button>
                        <Button 
                            onClick={handleUpdate}
                            className="flex-1 h-10 rounded-xl text-sm gap-1.5 bg-primary"
                        >
                            <Pencil size={14} />
                            Lưu thay đổi
                        </Button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default BudgetUpdate;