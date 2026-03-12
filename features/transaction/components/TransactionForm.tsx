import { TransactionSource, TransactionType } from "@/common/constants/app.constant"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { CalendarIcon, ArrowDownCircle, ArrowUpCircle, ArrowLeftRight, X } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { useAccounts } from "@/features/account/account.hook"
import { useTransactionCategories } from "@/features/transaction-category/transaction-category.hook"
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface"

const TYPE_OPTIONS = [
  { value: TransactionType.INCOME,   label: "Thu nhập",     icon: <ArrowDownCircle size={14} />, cls: "text-emerald-600 border-emerald-200 bg-emerald-50", active: "bg-emerald-500 text-white border-emerald-500" },
  { value: TransactionType.EXPENSE,  label: "Chi tiêu",     icon: <ArrowUpCircle size={14} />,   cls: "text-rose-600 border-rose-200 bg-rose-50",         active: "bg-rose-500 text-white border-rose-500" },
  { value: TransactionType.TRANSFER, label: "Chuyển khoản", icon: <ArrowLeftRight size={14} />,  cls: "text-blue-600 border-blue-200 bg-blue-50",         active: "bg-blue-500 text-white border-blue-500" },
]

const TransactionForm = () => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { data: account }  = useAccounts({})
  const { data: category } = useTransactionCategories()

  return (
    <div className="flex flex-col gap-2">

      <div className="grid grid-cols-3 gap-2">
        {TYPE_OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setType(opt.value)}
            className={cn(
              "flex items-center justify-center gap-1.5 h-9 rounded-xl border text-sm font-medium transition-all",
              type === opt.value ? opt.active : `${opt.cls} hover:opacity-75`
            )}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Số tiền</Label>
        <div className="relative">
          <Input
            type="number"
            placeholder="0"
            className="h-11 rounded-xl border-border/60 text-base font-medium pr-10 shadow-none"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₫</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Merchant / Người nhận</Label>
        <Input placeholder="VD: Grab, Circle K..." className="h-9 rounded-xl border-border/60 shadow-none" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Account */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Tài khoản</Label>
          <Select>
            <SelectTrigger className="h-9 rounded-xl border-border/60 shadow-none text-sm">
              <SelectValue placeholder="Chọn tài khoản" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
                <SelectItem value="ALL">
                    <X />
                    Không chọn
                </SelectItem>
                {account?.items.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        <div className="flex items-center gap-2">
                            <span
                                className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                                style={{ backgroundColor: item.color ?? "#03002e" }}
                            >
                                {item.icon ?? item.title?.charAt(0).toUpperCase()}
                            </span>
                            {item.title}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Danh mục</Label>
          <Select>
            <SelectTrigger className="h-9 rounded-xl border-border/60 shadow-none text-sm">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
                <SelectItem value="ALL">
                    <X />
                    Không chọn
                </SelectItem>
                {category?.items.map((item: TransactionCategory) => (
                    <SelectItem key={item.id} value={item.id}>
                        <div className="flex items-center gap-2">
                            <span
                                className="w-5 h-5 rounded-md flex items-center justify-center text-sm shrink-0"
                                style={{ backgroundColor: `${item.color ?? "#e5e7eb"}25` }}
                            >
                                {item.icon}
                            </span>
                            {item.title}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Ngày giao dịch</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-9 rounded-xl border-border/60 shadow-none text-sm font-normal justify-start gap-2 text-muted-foreground">
                <CalendarIcon size={13} />
                {date ? format(date, "dd/MM/yyyy") : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 rounded-xl" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} locale={vi} className="rounded-lg" />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Nguồn</Label>
          <Select defaultValue={TransactionSource.MANUAL}>
            <SelectTrigger className="h-9 rounded-xl border-border/60 shadow-none text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value={TransactionSource.MANUAL} className="text-sm">✍️ Thủ công</SelectItem>
              <SelectItem value={TransactionSource.OCR}    className="text-sm">📷 Quét ảnh</SelectItem>
              <SelectItem value={TransactionSource.IMPORT} className="text-sm">📂 Nhập file</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">
          Ghi chú <span className="opacity-40">(tuỳ chọn)</span>
        </Label>
        <Textarea
          placeholder="Thêm ghi chú..."
          rows={2}
          className="rounded-xl border-border/60 shadow-none text-sm resize-none"
        />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3 py-2.5">
        <div>
          <p className="text-sm font-medium">Giao dịch định kỳ</p>
          <p className="text-xs text-muted-foreground">Tự động lặp lại hàng tháng</p>
        </div>
        <Switch />
      </div>

    </div>
  )
}

export default TransactionForm