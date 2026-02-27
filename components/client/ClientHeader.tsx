"use client"

import { CheckCircle2, TrendingUp, TrendingDown, Bell, Target, Wallet } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Stat Chip ────────────────────────────────────────────────────────────────

const Chip = ({
  icon,
  label,
  value,
  valueClass,
}: {
  icon: React.ReactNode
  label: string
  value: string
  valueClass?: string
}) => (
  <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/8 border border-white/10 backdrop-blur-sm hover:bg-white/12 transition-colors">
    <div className="shrink-0 opacity-80">{icon}</div>
    <div>
      <p className="text-[10px] font-medium uppercase tracking-widest text-primary-foreground/50 leading-none mb-1">
        {label}
      </p>
      <p className={cn("text-sm font-semibold text-primary-foreground leading-none", valueClass)}>
        {value}
      </p>
    </div>
  </div>
)

// ─── Main ─────────────────────────────────────────────────────────────────────

const ClientHeader = () => {
  const profitUp = true

  return (
    <header className="w-full bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg shadow-primary/20">
      <div className="px-6 py-3 flex items-center justify-between gap-4">

        {/* ── LEFT: Stats ── */}
        <div className="flex items-center gap-2">
          <Chip
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            label="Task hôm nay"
            value="7 / 10 hoàn thành"
          />
          <Chip
            icon={<Wallet className="w-4 h-4 text-amber-400" />}
            label="Số dư"
            value="12.500.000 đ"
          />
          <Chip
            icon={
              profitUp
                ? <TrendingUp className="w-4 h-4 text-emerald-400" />
                : <TrendingDown className="w-4 h-4 text-rose-400" />
            }
            label="Lợi nhuận"
            value={profitUp ? "+20% so với tháng trước" : "-20% so với tháng trước"}
            valueClass={profitUp ? "text-emerald-300" : "text-rose-300"}
          />
        </div>

        {/* ── RIGHT: Goal + Bell + User ── */}
        <div className="flex items-center gap-4 shrink-0">

          {/* Nearest Goal */}
          <div className="w-44">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-primary-foreground/50">
                <Target className="w-3 h-3" />
                Mục tiêu gần nhất
              </div>
              <span className="text-[10px] font-bold text-primary-foreground/70">68%</span>
            </div>
            <Progress
              value={68}
              className="h-1.5 bg-white/15 [&>div]:bg-emerald-400"
            />
            <p className="text-[10px] text-primary-foreground/40 mt-1 truncate">
              Tiết kiệm 50tr Q1/2025
            </p>
          </div>

          <Separator orientation="vertical" className="h-8 bg-white/15" />

          {/* Bell */}
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <Bell className="w-4 h-4 text-primary-foreground/70" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-400" />
          </button>

          <Separator orientation="vertical" className="h-8 bg-white/15" />

          {/* User */}
          <div className="flex items-center gap-2.5">
            <Avatar className="w-8 h-8 ring-2 ring-emerald-400/60">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-xs bg-white/20">HN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-primary-foreground leading-none">Hào Nguyễn</p>
              <p className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ClientHeader