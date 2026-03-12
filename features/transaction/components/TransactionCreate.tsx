import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, PlusCircle } from "lucide-react"
import TransactionForm from "./TransactionForm"

interface Props {
    open: boolean;
    setOpen: (o: boolean) => void;
}

const TransactionCreate = ({open, setOpen}: Props) => {


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
                    <TransactionForm />
                </div>

                <div className="px-6 pb-5">
                    <Button className="w-full h-10 rounded-xl font-medium">
                        Thêm giao dịch
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TransactionCreate;