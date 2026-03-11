import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Search, SlidersHorizontal } from "lucide-react"


const TransactionFilter = () => {


    return (
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm giao dịch, merchant..."
              className="pl-8 h-9 rounded-xl border-border/60 bg-white text-sm shadow-none"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/40">
            {(["Tất cả", "Thu", "Chi", "Chuyển"]).map((label, i) => (
              <button
                key={label}
                className={cn(
                  "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
                  i === 0
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/80"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <Select defaultValue="ALL">
            <SelectTrigger className="w-[185px] h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-1.5">
              <SlidersHorizontal size={13} className="text-muted-foreground shrink-0" />
              <SelectValue placeholder="Tài khoản" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL">Tất cả tài khoản</SelectItem>
            </SelectContent>
          </Select>
        </div>
    )
}

export default TransactionFilter 