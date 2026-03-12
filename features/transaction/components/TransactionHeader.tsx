import { Button } from "@/components/ui/button";
import { Plus, ReceiptText } from "lucide-react";


interface Props {
  setOpen: (open: boolean) => void;
}
const TransactionHeader = ({setOpen}: Props) => {


    return (
        <div className="sticky top-0 z-30 border-b border-border/50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <ReceiptText size={15} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">Giao dịch</h1>
              <p className="text-[10px] text-muted-foreground">Finance › Transactions</p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="rounded-xl gap-1.5 h-8 text-xs px-3"
            onClick={() => setOpen(true)}
          >
            <Plus size={13} /> Thêm giao dịch
          </Button>
        </div>
      </div>
    )
}

export default TransactionHeader;