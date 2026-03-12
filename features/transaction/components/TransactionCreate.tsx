import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, PlusCircle } from "lucide-react"
import TransactionForm from "./TransactionForm"
import { useState } from "react";
import { TransactionFormValue } from "../interfaces/transaction-form";
import { TransactionType } from "@/common/constants/app.constant";
import { useCreateTransaction } from "../transaction.hook";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface Props {
    open: boolean;
    setOpen: (o: boolean) => void;
}

const TransactionCreate = ({open, setOpen}: Props) => {

    const DEFAULT_STATE: TransactionFormValue = {
        categoryId: "",
        accountId: "",
        type: TransactionType.EXPENSE,
        amount: 0,
        merchant: "",
        transactionDate: new Date().toString(),
        isRecurring: false
    }
    const [form, setForm] = useState<TransactionFormValue>(DEFAULT_STATE);
    const {mutate, isPending} = useCreateTransaction()

    const handleCreate = () => {
        mutate(form, {
            onSuccess: () => {
                toast.success("Tạo thành công")
                setOpen(false)
                setForm(DEFAULT_STATE)
            }
        })
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="sm:max-w-md border-primary rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/50">
                    <DialogTitle className="flex items-center gap-2 text-base font-semibold uppercase">
                        <ArrowLeftRight size={16} className="text-primary" />
                        Thêm giao dịch
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
                        disabled={isPending}
                        className="w-full h-10 rounded-xl font-medium"
                        onClick={handleCreate}
                    >
                        {
                            isPending
                            ?
                            <Spinner />
                            :
                            <ArrowLeftRight />
                        }
                        Thêm giao dịch
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TransactionCreate;