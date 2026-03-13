import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import TransactionForm from "./TransactionForm"
import { useEffect, useState } from "react";
import { TransactionFormValue } from "../interfaces/transaction-form";
import { Transaction } from "../interfaces/transaction.interface";
import { useUpdateTransaction } from "../transaction.hook";
import { toast } from "sonner";

interface Props {
    open: boolean;
    setOpen: (o: boolean) => void;
    transaction?: Transaction;
}

const TransactionUpdate = ({ open, setOpen, transaction }: Props) => {
    if(!transaction) return;

    const DEFAULT_STATE: TransactionFormValue = {
        categoryId: transaction.category.id,
        accountId: transaction.account.id,
        type: transaction?.type,
        amount: transaction?.amount,
        merchant: transaction?.merchant,
        transactionDate: transaction?.transactionDate,
        isRecurring: transaction?.isRecurring,
        description: transaction?.description,
    }

    const [form, setForm] = useState<TransactionFormValue>(DEFAULT_STATE);
    const {mutate} = useUpdateTransaction()
    const handleUpdate = () => {
        mutate({
            id: transaction.id,
            dto: form
        }, {
            onSuccess: () => {
                toast.success("Cập nhật thành công")
                setOpen(false)
            }
        })
    }

    useEffect(() => {
        if(transaction) {
            setForm(DEFAULT_STATE)
        }
    },[transaction])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md border-primary rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/50">
                    <DialogTitle className="flex items-center gap-2 text-base font-semibold uppercase">
                        <Pencil size={16} className="text-primary" />
                        Chỉnh sửa giao dịch
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6 py-5 overflow-y-auto max-h-[80vh]">
                    <TransactionForm
                        form={form}
                        setForm={setForm}
                    />
                </div>

                <div className="px-6 pb-5">
                    <Button
                        className="w-full h-10 rounded-xl font-medium"
                        onClick={handleUpdate}
                    >
                        <Pencil size={15} />
                        Lưu thay đổi
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TransactionUpdate;