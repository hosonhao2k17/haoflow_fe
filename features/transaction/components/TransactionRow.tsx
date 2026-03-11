import { TableCell, TableRow } from "@/components/ui/table"
import TransactionAccountChip from "./TransactionAccountChip"
import { Transaction } from "../interfaces/transaction.interface"
import { TransactionType } from "@/common/constants/app.constant"
import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, ChevronRight, RefreshCw } from "lucide-react"
import TransactionTypeBadge from "./TransactionTypeBadge"
import { fmtDateShort, fmtShort } from "@/lib/format"
import { cn } from "@/lib/utils"


interface Props {
    transaction: Transaction
}


const TransactionRow = ({transaction}: Props) => {


    return (
        <TableRow className="cursor-pointer border-border/30 hover:bg-primary/[0.025] transition-colors group">
            <TableCell className="pl-5 py-3">
                <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-lg shrink-0">
                    {transaction.category?.icon}
                </div>
                <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-foreground truncate leading-snug">{transaction.merchant}</p>
                    <p className="text-xs text-muted-foreground truncate">{transaction.description || transaction.category?.title}</p>
                </div>
                </div>
            </TableCell>
            <TableCell className="py-3">
                <TransactionAccountChip  account={transaction.account} />
                <p className="text-[10px] text-muted-foreground/60 mt-0.5 truncate">{transaction.account?.title}</p>
            </TableCell>
            <TableCell className="py-3">
                <div className="flex items-center gap-1.5">
                    {transaction.type === TransactionType.INCOME   && <ArrowDownLeft  size={13} className="text-emerald-600 shrink-0" />}
                    {transaction.type === TransactionType.EXPENSE  && <ArrowUpRight   size={13} className="text-rose-500 shrink-0"    />}
                    {transaction.type === TransactionType.TRANSFER && <ArrowLeftRight size={13} className="text-sky-500 shrink-0"     />}
                    <TransactionTypeBadge type={transaction.type} />
                </div>
                {transaction.isRecurring && (
                    <div className="flex items-center gap-1 mt-1">
                        <RefreshCw size={9} className="text-amber-500" />
                        <span className="text-[10px] text-amber-600 font-semibold">Định kỳ</span>
                    </div>
                )}
            </TableCell>
            <TableCell className="py-3 text-xs text-muted-foreground">
                {fmtDateShort(transaction.transactionDate)}
            </TableCell>
            <TableCell className="py-3 text-right pr-5">
                <span className={cn(
                    "font-bold font-mono text-[13px] tabular-nums",
                    transaction.type === TransactionType.INCOME   && "text-emerald-600",
                    transaction.type === TransactionType.EXPENSE  && "text-rose-600",
                    transaction.type === TransactionType.TRANSFER && "text-sky-600",
                )}>
                    {transaction.type === TransactionType.INCOME ? "+" : transaction.type === TransactionType.EXPENSE ? "−" : "⇄"}
                    {fmtShort(transaction.amount)}
                </span>
            </TableCell>
            <TableCell className="py-3 pr-3">
                <ChevronRight size={14} className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
            </TableCell>
        </TableRow>
    )
}

export default TransactionRow