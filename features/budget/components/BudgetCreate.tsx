import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PiggyBank } from "lucide-react";
import BudgetForm from "./BudgetForm";
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BudgetCreate = ({ open, setOpen }: Props) => {


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
          <BudgetForm  />
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default BudgetCreate;