
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import TransactionCategoryForm from "./TransactionCategoryForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { TransactionCategoryFormValue } from "../interfaces/transaction-category-form.interface";
import { TransactionCategoryType } from "@/common/constants/finance.constant";
import { useCreateTransactionCategory, useUpdateTransactionCategory } from "../transaction-category.hook";
import { toast } from "sonner";
import { TransactionCategory } from "../interfaces/transaction-category.interface";
import { SaveIcon } from "lucide-react";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    transactionCategory?: TransactionCategory
}

const TransactionCategoryUpdate = ({open, setOpen, transactionCategory}: Props) => {
    if(!transactionCategory) return;
    const defaultState = {
        title: transactionCategory.title,
        type: transactionCategory.type,
        icon: transactionCategory.icon,
        color: transactionCategory.color
    }
    const [category, setCategory] = useState<TransactionCategoryFormValue>(defaultState);

    const updateTransactionCategory = useUpdateTransactionCategory();
    const handleUpdate = () => {
        updateTransactionCategory.mutate({id: transactionCategory.id, updateDto: category},{
            onSuccess: () => {
                toast.success("Cập nhật thành công")
            }
        })
        
    }

    useEffect(() => {
        if(transactionCategory) {
            setCategory(defaultState)
        }
    },[transactionCategory])

    return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
            <DialogHeader className="px-6 pt-6 pb-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                        Tài chính
                    </span>
                </div>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                    Cập nhật danh mục
                </DialogTitle>
            </DialogHeader>

            <TransactionCategoryForm 
                onChange={setCategory}
                category={category}
                isPending={updateTransactionCategory.isPending}
            />
            <Separator className="opacity-50" />
            <DialogFooter >
            <div className="flex gap-3 m-3">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-xl h-10 border-border/60 text-muted-foreground hover:text-foreground"
                >
                    Hủy
                </Button>
                <Button
                    onClick={handleUpdate}
                    type="submit"
                    className="flex-[2] rounded-xl h-10 bg-primary text-white font-semibold shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40"
                >
                    Lưu
                    <SaveIcon />
                </Button>
            </div>
            </DialogFooter>
        </DialogContent>
        
    </Dialog>
    )
}

export default TransactionCategoryUpdate