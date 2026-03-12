import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BudgetPeriod } from "@/common/constants/finance.constant";
import { CalendarDays, PiggyBank, Tag, TrendingDown, Wallet } from "lucide-react";
import { useTransactionCategories } from "@/features/transaction-category/transaction-category.hook";
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface";
import { BudgetFormValue } from "../interfaces/budget-form.interface";

const PERIOD_OPTIONS = [
  { label: "Hàng tháng", value: BudgetPeriod.MONTHLY },
  { label: "Hàng tuần",  value: BudgetPeriod.WEEKLY  },
  { label: "Hàng năm",   value: BudgetPeriod.YEARLY  },
];

const buildMonthOptions = () => {
  const opts: { label: string; value: string }[] = [];
  const now = new Date();
  for (let i = -2; i <= 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    opts.push({
      label: d.toLocaleDateString("vi-VN", { month: "long", year: "numeric" }),
      value: d.toISOString().slice(0, 7),
    });
  }
  return opts;
};

interface Props {
    setBudget: (budget: BudgetFormValue) => void;
    budget: BudgetFormValue;
}

const BudgetForm = ({ setBudget, budget }: Props) => {
    const monthOptions = buildMonthOptions();
    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data } = useTransactionCategories();
    const categories: TransactionCategory[] = data?.items ?? [];

    const update = (patch: Partial<BudgetFormValue>) =>
        setBudget({ ...budget, ...patch });

    return (
        <div className="space-y-5">

            {/* ── Category ── */}
            <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Tag size={12} className="text-muted-foreground" />
                    Danh mục
                </Label>
                <Select
                    value={budget.categoryId}
                    onValueChange={(value) => update({ categoryId: value })}
                >
                    <SelectTrigger className="h-10 rounded-xl border-border/60 bg-white text-sm shadow-none">
                        <SelectValue placeholder="Chọn danh mục chi tiêu" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id} className="rounded-lg">
                                <div className="flex items-center gap-2.5 py-0.5">
                                    <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                                        style={{ backgroundColor: cat.color ? `${cat.color}18` : undefined }}
                                    >
                                        {cat.icon ?? <Tag size={14} />}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{cat.title}</span>
                                        {cat.color && (
                                            <span
                                                className="w-2 h-2 rounded-full shrink-0"
                                                style={{ backgroundColor: cat.color }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* ── Amount ── */}
            <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Wallet size={12} className="text-muted-foreground" />
                    Hạn mức ngân sách
                </Label>
                <div className="relative">
                    <Input
                        type="number"
                        placeholder="0"
                        value={budget.amount ?? ""}
                        onChange={(e) => update({ amount: Number(e.target.value) })}
                        className="h-10 rounded-xl border-border/60 pr-8 text-sm shadow-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">₫</span>
                </div>
            </div>

            {/* ── Period + StartDate ── */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <TrendingDown size={12} className="text-muted-foreground" />
                        Chu kỳ
                    </Label>
                    <Select
                        value={budget.period ?? BudgetPeriod.MONTHLY}
                        onValueChange={(value) => update({ period: value as BudgetPeriod })}
                    >
                        <SelectTrigger className="h-10 rounded-xl border-border/60 bg-white text-sm shadow-none">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            {PERIOD_OPTIONS.map((p) => (
                                <SelectItem key={p.value} value={p.value} className="text-sm rounded-lg">
                                    {p.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <CalendarDays size={12} className="text-muted-foreground" />
                        Tháng áp dụng
                    </Label>
                    <Select
                        value={budget.startDate ?? currentMonth}
                        onValueChange={(value) => update({ startDate: value })}
                    >
                        <SelectTrigger className="h-10 rounded-xl border-border/60 bg-white text-sm shadow-none">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl max-h-52">
                            {monthOptions.map((m) => (
                                <SelectItem key={m.value} value={m.value} className="text-sm rounded-lg capitalize">
                                    {m.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* ── Alert threshold ── */}
            <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <PiggyBank size={12} className="text-muted-foreground" />
                    Ngưỡng cảnh báo
                </Label>
                <div className="relative">
                    <Input
                        type="number"
                        placeholder="80"
                        min={0}
                        max={100}
                        value={budget.alertThreshold ?? 80}
                        onChange={(e) => update({ alertThreshold: Number(e.target.value) })}
                        className="h-10 rounded-xl border-border/60 pr-8 text-sm shadow-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">%</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                    Cảnh báo khi chi tiêu đạt ngưỡng này so với hạn mức
                </p>
            </div>

        </div>
    );
};

export default BudgetForm;