"use client"

import { useBanks } from "@/features/bank/bank.hook"
import { useState } from "react"
import { Input } from "../ui/input"
import { Loader2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

interface Props {
  value?: string
  onChange: (logo: string) => void
}

const WALLET_DATA = [
  { name: "MoMo",         logo: "https://cdn.vietqr.io/img/momo.png" },
  { name: "ViettelMoney", logo: "https://cdn.vietqr.io/img/VIETTELMONEY.png" },
  { name: "VNPTMoney",    logo: "https://cdn.vietqr.io/img/VNPTMONEY.png" },
  { name: "CAKE",         logo: "https://cdn.vietqr.io/img/CAKE.png" },
  { name: "Ubank",        logo: "https://cdn.vietqr.io/img/UBANK.png" },
]

interface LogoItem { name: string; logo: string }
interface Bank { logo: string; name: string; shortName: string }

const LogoPicker = ({ value, onChange }: Props) => {
  const [tab, setTab] = useState<"bank" | "wallet">("bank")
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const { data: banks = [], isLoading } = useBanks()

  const items: LogoItem[] = tab === "bank"
    ? banks
        .map((b: Bank) => ({ name: b.shortName, logo: b.logo }))
        .filter((b: LogoItem) => b.name.toLowerCase().includes(search.toLowerCase()))
    : WALLET_DATA
        .filter(w => w.name.toLowerCase().includes(search.toLowerCase()))

  const selected = [...banks.map((b: Bank) => ({ name: b.shortName, logo: b.logo })), ...WALLET_DATA]
    .find(i => i.logo === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 h-11 px-3 w-full rounded-xl border border-border/60 bg-background",
            "hover:bg-muted transition-colors text-sm"
          )}
        >
          {selected ? (
            <>
              <img src={selected.logo} alt={selected.name} className="w-6 h-6 object-contain rounded-md" />
              <span className="text-foreground">{selected.name}</span>
            </>
          ) : (
            <span className="text-muted-foreground">Chọn ngân hàng / ví...</span>
          )}
          <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-3" align="start">
        <div className="flex border-b border-border/50 mb-3">
          {(["bank", "wallet"] as const).map(t => (
            <button key={t} type="button"
              onClick={() => { setTab(t); setSearch("") }}
              className={cn("px-4 py-2 text-sm border-b-2 -mb-px transition-colors",
                tab === t
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent text-muted-foreground"
              )}>
              {t === "bank" ? "Ngân hàng" : "Ví điện tử"}
            </button>
          ))}
        </div>

        <Input
          placeholder="Tìm..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-3 h-9"
        />

        {isLoading && tab === "bank" ? (
          <div className="flex justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {items.length === 0 && (
              <p className="col-span-4 text-center text-sm text-muted-foreground py-6">
                Không tìm thấy
              </p>
            )}
            {items.map(item => (
              <button key={item.logo} type="button"
                onClick={() => { onChange(item.logo); setOpen(false) }} // 👈 tự đóng khi chọn
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl border transition-colors",
                  value === item.logo
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:bg-muted"
                )}>
                <img src={item.logo} alt={item.name} className="w-9 h-9 object-contain rounded-lg" />
                <span className="text-[10px] text-muted-foreground text-center leading-tight line-clamp-1">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default LogoPicker