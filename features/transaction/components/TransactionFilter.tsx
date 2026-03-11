import { TransactionSource, TransactionType } from "@/common/constants/app.constant"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Search, SlidersHorizontal, CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { useAccounts } from "@/features/account/account.hook"
import { useTransactionCategories } from "@/features/transaction-category/transaction-category.hook"
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface"
import { Account } from "@/features/account/interfaces/account.interface"
import TransactionAccountOption from "./TransactionAccountOption"
import TransactionCategoryOption from "./TransactionCategoryOption"
import TransactionToggleGroup from "./TransactionToggleGroup"


const TRANSACTION_SOURCE_LABELS: Record<TransactionSource, string> = {
  [TransactionSource.MANUAL]: "Thủ công",
  [TransactionSource.OCR]:    "Quét ảnh",
  [TransactionSource.IMPORT]: "Nhập file",
}

const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TransactionType.INCOME]:   "Thu",
  [TransactionType.EXPENSE]:  "Chi",
  [TransactionType.TRANSFER]: "Chuyển khoản",
}


interface AmountRange {
  minAmount?: number
  maxAmount?: number
}

interface Props {
  setMerchant:    (val: string | undefined) => void
  setAccountId:   (val: string | undefined) => void
  setType:        (val: TransactionType | undefined) => void
  setSource:      (val: TransactionSource | undefined) => void
  setCategoryId:  (val: string | undefined) => void
  source:         TransactionSource | undefined
  type:           TransactionType | undefined
  setRangeAmount: (range: AmountRange) => void
  rangeAmount:    AmountRange
}


const TransactionFilter = ({
  setMerchant,
  setAccountId,
  setSource,
  setType,
  setCategoryId,
  source,
  type,
  setRangeAmount,
  rangeAmount,
}: Props) => {
  const { data: accountData }  = useAccounts({})
  const { data: categoryData } = useTransactionCategories()

  const [expanded,    setExpanded]    = useState(false)
  const [dateFrom,    setDateFrom]    = useState<Date | null>(null)
  const [dateTo,      setDateTo]      = useState<Date | null>(null)
  const [accountId,   setLocalAccount]  = useState<string | undefined>()
  const [categoryId,  setLocalCategory] = useState<string | undefined>()

  const handleAccountSelect = (id: string | undefined) => {
    setLocalAccount(id)
    setAccountId(id)
  }

  const handleCategorySelect = (id: string | undefined) => {
    setLocalCategory(id)
    setCategoryId(id)
  }

  return (
    <div className="flex flex-col gap-2">
      {/* ── Row 1: always visible ── */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative w-[220px] shrink-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            onChange={(e) => setMerchant(e.target.value || undefined)}
            placeholder="Tìm giao dịch, merchant..."
            className="pl-8 h-9 rounded-xl border-border/60 bg-white text-sm shadow-none"
          />
        </div>

        {/* Account picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-2 font-normal shrink-0",
                accountId ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {accountId ? (
                <>
                  <span
                    className="w-4 h-4 rounded flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                    style={{ backgroundColor: accountData?.items.find(a => a.id === accountId)?.color ?? "#03002e" }}
                  >
                    {accountData?.items.find(a => a.id === accountId)?.title?.charAt(0).toUpperCase()}
                  </span>
                  <span>{accountData?.items.find(a => a.id === accountId)?.title}</span>
                </>
              ) : (
                <>
                  <SlidersHorizontal size={13} className="shrink-0" />
                  Tài khoản
                </>
              )}
              <ChevronDown size={11} className="text-muted-foreground/60 ml-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2 rounded-xl" align="start">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-1.5">Tài khoản</p>
            <button
              onClick={() => handleAccountSelect(undefined)}
              className={cn(
                "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all text-left",
                !accountId ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted text-muted-foreground"
              )}
            >
              <span className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-xs shrink-0">
                <SlidersHorizontal size={12} />
              </span>
              Tất cả tài khoản
              {!accountId && <span className="ml-auto text-primary text-xs">✓</span>}
            </button>
            {accountData?.items.map((item) => (
              <TransactionAccountOption
                key={item.id}
                account={item}
                selected={accountId === item.id}
                onClick={() => handleAccountSelect(accountId === item.id ? undefined : item.id)}
              />
            ))}
          </PopoverContent>
        </Popover>

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

        {/* Expand toggle */}
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

      {/* ── Row 2: expanded only ── */}
      {expanded && (
        <div className="flex items-center gap-2 flex-wrap">
          {/* Source */}
          <TransactionToggleGroup
            value={source}
            options={Object.values(TransactionSource)}
            labels={TRANSACTION_SOURCE_LABELS}
            onChange={setSource}
          />

          {/* Type */}
          <TransactionToggleGroup
            value={type}
            options={Object.values(TransactionType)}
            labels={TRANSACTION_TYPE_LABELS}
            onChange={setType}
          />

          {/* Category picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-2 font-normal shrink-0",
                  categoryId ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {categoryId ? (
                  <>
                    <span
                      className="w-4 h-4 rounded flex items-center justify-center text-xs shrink-0"
                      style={{ backgroundColor: `${categoryData?.items.find((c: TransactionCategory) => c.id === categoryId)?.color ?? "#e5e7eb"}20` }}
                    >
                      {categoryData?.items.find((c: TransactionCategory) => c.id === categoryId)?.icon}
                    </span>
                    <span>{categoryData?.items.find((c: TransactionCategory) => c.id === categoryId)?.title}</span>
                  </>
                ) : (
                  <>
                    <span className="text-base leading-none">🏷️</span>
                    Danh mục
                  </>
                )}
                <ChevronDown size={11} className="text-muted-foreground/60 ml-0.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 rounded-xl max-h-72 overflow-y-auto" align="start">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-1.5">Danh mục</p>
              <button
                onClick={() => handleCategorySelect(undefined)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all text-left",
                  !categoryId ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted text-muted-foreground"
                )}
              >
                <span className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-xs shrink-0">🏷️</span>
                Tất cả danh mục
                {!categoryId && <span className="ml-auto text-primary text-xs">✓</span>}
              </button>
              {categoryData?.items.map((item: TransactionCategory) => (
                <TransactionCategoryOption
                  key={item.id}
                  category={item}
                  selected={categoryId === item.id}
                  onClick={() => handleCategorySelect(categoryId === item.id ? undefined : item.id)}
                />
              ))}
            </PopoverContent>
          </Popover>

          {/* Amount range */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-1.5 font-normal shrink-0",
                  (rangeAmount.minAmount || rangeAmount.maxAmount) ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <SlidersHorizontal size={13} className="shrink-0" />
                {(rangeAmount.minAmount || rangeAmount.maxAmount)
                  ? `${rangeAmount.minAmount ?? 0}₫ – ${rangeAmount.maxAmount ? `${rangeAmount.maxAmount}₫` : "∞"}`
                  : "Khoảng tiền"
                }
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3 rounded-xl" align="start">
              <p className="text-xs font-medium text-muted-foreground mb-2">Khoảng số tiền (VND)</p>
              <div className="flex flex-col gap-2">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Tối thiểu</label>
                  <Input
                    value={rangeAmount.minAmount ?? ""}
                    onChange={(e) => setRangeAmount({ ...rangeAmount, minAmount: e.target.value ? Number(e.target.value) : undefined })}
                    type="number"
                    placeholder="0"
                    className="h-8 rounded-lg text-sm shadow-none border-border/60"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Tối đa</label>
                  <Input
                    value={rangeAmount.maxAmount ?? ""}
                    onChange={(e) => setRangeAmount({ ...rangeAmount, maxAmount: e.target.value ? Number(e.target.value) : undefined })}
                    type="number"
                    placeholder="Không giới hạn"
                    className="h-8 rounded-lg text-sm shadow-none border-border/60"
                  />
                </div>
                {(rangeAmount.minAmount || rangeAmount.maxAmount) && (
                  <button
                    onClick={() => setRangeAmount({})}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Xóa bộ lọc tiền
                  </button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  )
}

export default TransactionFilter