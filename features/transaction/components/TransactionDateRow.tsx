// TransactionDateRow.tsx
import { TableCell, TableRow } from "@/components/ui/table"
import { isToday, isYesterday, format } from "date-fns"
import { vi } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface Props {
  date: Date
  count?: number
}

const TransactionDateRow = ({ date, count }: Props) => {
  const isDateToday = isToday(date)
  const isDateYesterday = isYesterday(date)

  // "thứ hai, 10 tháng 3" → capitalize
  const weekday = format(date, "EEEE", { locale: vi })
  const dayMonth = format(date, "d MMMM", { locale: vi })
  const weekdayCapitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1)

  return (
    <TableRow className="border-none hover:bg-transparent cursor-default select-none">
      <TableCell colSpan={6} className="pl-5 pt-5 pb-1">
        <div className="flex items-baseline gap-2">
          {/* Relative label: Hôm nay / Hôm qua */}
          {(isDateToday || isDateYesterday) && (
            <span className="text-[13px] font-bold text-foreground">
              {isDateToday ? "Hôm nay" : "Hôm qua"}
            </span>
          )}

          {/* Weekday + day month */}
          <span className={cn(
            "text-xs text-muted-foreground",
            !isDateToday && !isDateYesterday && "text-[13px] font-bold text-foreground"
          )}>
            {weekdayCapitalized}, {dayMonth}
          </span>

          {/* Count */}
          {count !== undefined && (
            <span className="text-[10px] text-muted-foreground/50 font-medium">
              · {count} giao dịch
            </span>
          )}
        </div>
        <div className="mt-1.5 h-px bg-border/40" />
      </TableCell>
    </TableRow>
  )
}

export default TransactionDateRow