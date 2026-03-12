import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { TransactionReceipt } from "../interfaces/transaction-receipt.interface"
import { ReceiptStatus } from "@/common/constants/app.constant";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Props {
    receipt: TransactionReceipt;
}

const STATUS_CONFIG: Record<ReceiptStatus, { label: string; icon: React.ReactNode; cls: string }> = {
  [ReceiptStatus.PENDING]: { label: "Đang xử lý", icon: <Clock size={11} />,         cls: "bg-amber-50  text-amber-600  border-amber-200"  },
  [ReceiptStatus.DONE]:    { label: "Hoàn thành",  icon: <CheckCircle2 size={11} />,  cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  [ReceiptStatus.FAILED]:  { label: "Thất bại",    icon: <XCircle size={11} />,       cls: "bg-rose-50   text-rose-600   border-rose-200"   },
}

const TransactionReceiptHover = ({receipt}: Props) => {
    

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <img
                src={receipt.imageUrl}
                className="w-10 h-10 rounded-lg object-cover cursor-pointer"
                />
            </HoverCardTrigger>
            <HoverCardContent className="w-72 p-3 rounded-xl" side="right">
                <div className="flex flex-col gap-2">
                <img src={receipt.imageUrl} className="w-full rounded-lg object-cover max-h-40" />
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{receipt.parsedMerchant}</p>
                    <span className={cn("text-[11px] px-2 py-0.5 rounded-full border", STATUS_CONFIG[receipt.status].cls)}>
                    {STATUS_CONFIG[receipt.status].label}
                    </span>
                </div>
                {receipt.parsedAmount > 0 && (
                    <p className="text-xs text-muted-foreground">{receipt.parsedAmount.toLocaleString("vi-VN")}₫</p>
                )}
                {receipt.parsedDate && (
                    <p className="text-xs text-muted-foreground">{fmtDate(receipt.parsedDate)}</p>
                )}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default TransactionReceiptHover 