import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PiggyBank } from "lucide-react";
import BudgetForm from "./BudgetForm";
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface";
import { useState } from "react";
import { BudgetFormValue } from "../interfaces/budget-form.interface";
import { BudgetPeriod } from "@/common/constants/finance.constant";
import { Button } from "@/components/ui/button";
import { useCreateBudget } from "../budget.hook";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BudgetCreate = ({ open, setOpen }: Props) => {

    const DEFAULT_STATE = {
        amount: 0,
        categoryId: "",
        period: BudgetPeriod.YEARLY,
        startDate: "",
        alertThreshold: 80
    }
    
    const [budget, setBudget] = useState<BudgetFormValue>(DEFAULT_STATE);
    const {mutate} = useCreateBudget()
    const handleCreateBudget = () => {
        mutate(budget, {
            onSuccess: () => {
                toast.success("Tạo thành công")
                setOpen(false)
                setBudget(DEFAULT_STATE)
            }
        })
    }
    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-2xl max-w-md p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
                            <PiggyBank size={16} className="text-primary-foreground" />
                        </div>
                        <div>
                            <DialogTitle className="text-sm font-bold leading-tight">
                                Tạo ngân sách mới
                            </DialogTitle>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                Đặt hạn mức chi tiêu cho danh mục
                            </p>
                        </div>
                    </div>
                </DialogHeader>
                <div className="px-6 py-5">
                    <BudgetForm 
                        budget={budget}
                        setBudget={setBudget} 
                    />
                    <div className="flex gap-2 pt-1">
                        <Button
                            variant="outline"
                            className="flex-1 h-10 rounded-xl text-sm"
                            onClick={() => { setOpen(false); setBudget(DEFAULT_STATE); }}
                        >
                            Huỷ
                        </Button>
                        <Button 
                            className="flex-1 h-10 rounded-xl text-sm gap-1.5"
                            onClick={handleCreateBudget}
                        >
                            <PiggyBank size={14} />
                            Tạo ngân sách
                        </Button>
                    </div>
                </div>
                

            </DialogContent>
        </Dialog>
    );
};

export default BudgetCreate;