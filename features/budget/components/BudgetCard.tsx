import { Card, CardContent } from "@/components/ui/card";
import { Budget } from "../interfaces/budget.interface";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { fmtShort } from "@/lib/format";
import { BudgetPeriod } from "@/common/constants/finance.constant";
import { fmtMonth } from "@/lib/date";
import { Progress } from "@/components/ui/progress";


const periodLabel = (p: BudgetPeriod) => ({
  [BudgetPeriod.MONTHLY]: "Hàng tháng",
  [BudgetPeriod.WEEKLY]:  "Hàng tuần",
  [BudgetPeriod.YEARLY]:  "Hàng năm",
}[p] ?? p);


const getStatus = (pct: number, threshold: number) => {
  if (pct >= 100)       return { label: "Vượt ngân sách", icon: XCircle,       cls: "text-rose-600",   bg: "bg-rose-50",   bar: "bg-rose-500"   };
  if (pct >= threshold) return { label: "Sắp vượt",       icon: AlertTriangle, cls: "text-amber-600",  bg: "bg-amber-50",  bar: "bg-amber-500"  };
  return                       { label: "Trong ngân sách", icon: CheckCircle2,  cls: "text-emerald-600",bg: "bg-emerald-50",bar: "bg-emerald-500" };
};


const BudgetCard = ({
  budget, spent, onClick,
}: {
  budget: Budget;
  spent: number;          
  onClick: () => void;
}) => {
  const pct    = Math.min(Math.round((spent / budget.amount) * 100), 100);
  const status = getStatus(pct, budget.alertThreshold);
  const StatusIcon = status.icon;

  return (
    <Card
      onClick={onClick}
      className="shadow-none border border-border/60 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <CardContent className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl shrink-0">
              {budget.category?.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight truncate">
                {budget.category?.title}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {periodLabel(budget.period)} · {fmtMonth(budget.month)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Badge
              variant="outline"
              className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border gap-1", status.bg, status.cls, "border-current/20")}
            >
              <StatusIcon size={10} />
              {status.label}
            </Badge>
            <ChevronRight size={14} className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Đã chi: <span className="font-semibold text-foreground">{fmtShort(spent)}</span>
            </span>
            <span className="font-bold text-foreground">{pct}%</span>
          </div>
          <Progress
            value={pct}
            className="h-2 rounded-full bg-muted"
            // bạn override indicator color qua CSS variable nếu cần
          />
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Ngân sách: <span className="font-semibold">{fmtShort(budget.amount)}</span></span>
            <span>Còn lại: <span className={cn("font-semibold", spent > budget.amount ? "text-rose-600" : "text-emerald-600")}>
              {fmtShort(Math.max(budget.amount - spent, 0))}
            </span></span>
          </div>
        </div>

        {/* Alert threshold */}
        {pct >= budget.alertThreshold && pct < 100 && (
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
            <AlertTriangle size={11} />
            <span>Đã đạt <strong>{budget.alertThreshold}%</strong> ngưỡng cảnh báo</span>
          </div>
        )}
        {pct >= 100 && (
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-rose-600 bg-rose-50 rounded-lg px-3 py-2">
            <XCircle size={11} />
            <span>Vượt ngân sách <strong>{fmtShort(spent - budget.amount)}</strong></span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetCard 