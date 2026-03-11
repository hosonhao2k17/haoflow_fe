import { TransactionSource, TransactionType } from "@/common/constants/app.constant"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Search, SlidersHorizontal, CalendarIcon, ChevronLeft, ChevronRight, ChevronDown, Tag } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

const TRANSACTION_SOURCE_LABELS: Record<TransactionSource, string> = {
  [TransactionSource.MANUAL]: "Thủ công",
  [TransactionSource.OCR]: "Quét ảnh",
  [TransactionSource.IMPORT]: "Nhập file",
}

const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TransactionType.INCOME]: "Thu",
  [TransactionType.EXPENSE]: "Chi",
  [TransactionType.TRANSFER]: "Chuyển khoản",
}

const TransactionFilter = () => {
  const [expanded, setExpanded] = useState(false)
  const [activeSource, setActiveSource] = useState<TransactionSource | null>(null)
  const [activeType, setActiveType] = useState<TransactionType | null>(null)
  const [dateFrom, setDateFrom] = useState<Date | null>(null)
  const [dateTo, setDateTo] = useState<Date | null>(null)

  return (
    <div className="flex flex-col gap-2">
      {/* Row 1: luôn hiện */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative w-[220px] shrink-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm giao dịch, merchant..."
            className="pl-8 h-9 rounded-xl border-border/60 bg-white text-sm shadow-none"
          />
        </div>

        {/* Account select */}
        <Select defaultValue="ALL">
          <SelectTrigger className="w-[185px] h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-1.5 shrink-0">
            <SlidersHorizontal size={13} className="text-muted-foreground shrink-0" />
            <SelectValue placeholder="Tài khoản" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="ALL">Tất cả tài khoản</SelectItem>
          </SelectContent>
        </Select>

        {/* Date range */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-1.5 font-normal shrink-0",
                (dateFrom || dateTo) ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <CalendarIcon size={13} className="shrink-0" />
              {dateFrom && dateTo
                ? `${format(dateFrom, "dd/MM/yyyy")} – ${format(dateTo, "dd/MM/yyyy")}`
                : dateFrom
                ? `Từ ${format(dateFrom, "dd/MM/yyyy")}`
                : "Khoảng thời gian"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3 rounded-xl" align="start">
            <div className="flex gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Từ ngày</p>
                <Calendar
                  mode="single"
                  selected={dateFrom ?? undefined}
                  onSelect={(d) => setDateFrom(d ?? null)}
                  locale={vi}
                  className="rounded-lg border border-border/40"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Đến ngày</p>
                <Calendar
                  mode="single"
                  selected={dateTo ?? undefined}
                  onSelect={(d) => setDateTo(d ?? null)}
                  disabled={(d) => !!dateFrom && d < dateFrom}
                  locale={vi}
                  className="rounded-lg border border-border/40"
                />
              </div>
            </div>
            {(dateFrom || dateTo) && (
              <button
                onClick={() => { setDateFrom(null); setDateTo(null) }}
                className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Xóa bộ lọc ngày
              </button>
            )}
          </PopoverContent>
        </Popover>

        <div className="flex-1" />

        {/* Toggle mở rộng */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-1.5 font-normal shrink-0 transition-colors",
            expanded && "bg-muted text-foreground"
          )}
        >
          <SlidersHorizontal size={13} />
          Mở rộng
          <ChevronDown size={13} className={cn("transition-transform duration-200", expanded && "rotate-180")} />
        </Button>

        {/* Pagination */}
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-border/60 bg-white shadow-none">
            <ChevronLeft size={14} />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-border/60 bg-white shadow-none">
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>

      {/* Row 2: chỉ hiện khi expanded */}
      {expanded && (
        <div className="flex items-center gap-2 flex-wrap">
          {/* Source filter */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/40 shrink-0">
            <button
              onClick={() => setActiveSource(null)}
              className={cn(
                "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
                activeSource === null
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/80"
              )}
            >
              Tất cả
            </button>
            {Object.values(TransactionSource).map((source) => (
              <button
                key={source}
                onClick={() => setActiveSource(activeSource === source ? null : source)}
                className={cn(
                  "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
                  activeSource === source
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/80"
                )}
              >
                {TRANSACTION_SOURCE_LABELS[source]}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/40 shrink-0">
            <button
              onClick={() => setActiveType(null)}
              className={cn(
                "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
                activeType === null
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/80"
              )}
            >
              Tất cả
            </button>
            {Object.values(TransactionType).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(activeType === type ? null : type)}
                className={cn(
                  "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
                  activeType === type
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/80"
                )}
              >
                {TRANSACTION_TYPE_LABELS[type]}
              </button>
            ))}
          </div>

          {/* Category */}
          <Select defaultValue="ALL">
            <SelectTrigger className="w-[175px] h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-1.5 shrink-0">
              <Tag size={13} className="text-muted-foreground shrink-0" />
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL">Tất cả danh mục</SelectItem>
              <SelectItem value="food">Ăn uống</SelectItem>
              <SelectItem value="transport">Di chuyển</SelectItem>
              <SelectItem value="shopping">Mua sắm</SelectItem>
              <SelectItem value="entertainment">Giải trí</SelectItem>
              <SelectItem value="health">Sức khỏe</SelectItem>
              <SelectItem value="education">Giáo dục</SelectItem>
              <SelectItem value="other">Khác</SelectItem>
            </SelectContent>
          </Select>

          {/* Amount range */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-1.5 font-normal text-muted-foreground shrink-0"
              >
                <SlidersHorizontal size={13} className="shrink-0" />
                Khoảng tiền
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3 rounded-xl" align="start">
              <p className="text-xs font-medium text-muted-foreground mb-2">Khoảng số tiền (VND)</p>
              <div className="flex flex-col gap-2">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Tối thiểu</label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="h-8 rounded-lg text-sm shadow-none border-border/60"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Tối đa</label>
                  <Input
                    type="number"
                    placeholder="Không giới hạn"
                    className="h-8 rounded-lg text-sm shadow-none border-border/60"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  )
}

export default TransactionFilter