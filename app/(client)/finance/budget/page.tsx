"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  PiggyBank,
  Plus,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import BudgetStatCard from "@/features/budget/components/BudgetStatCard";
import BudgetCard from "@/features/budget/components/BudgetCard";
import { Budget } from "@/features/budget/interfaces/budget.interface";
import { BudgetPeriod } from "@/common/constants/finance.constant";
import { useBudgets, useDeleteBudget } from "@/features/budget/budget.hook";
import { useMemo, useState } from "react";
import BudgetCreate from "@/features/budget/components/BudgetCreate";
import BudgetUpdate from "@/features/budget/components/BudgetUpdate";
import AlertRemoveDialog from "@/components/common/AlertRemoveDialog";
import { toast } from "sonner";
import { QueryBudget } from "@/features/budget/interfaces/query-budget.interface";
import { fmtShort } from "@/lib/format";

const PERIOD_TABS = [
  { label: "Tất cả", value: "ALL" },
  { label: "Hàng tháng", value: BudgetPeriod.MONTHLY },
  { label: "Hàng tuần", value: BudgetPeriod.WEEKLY },
  { label: "Hàng năm", value: BudgetPeriod.YEARLY },
];

const MONTH_OPTIONS = [
  { label: "Tháng hiện tại", value: "current" },
  { label: "Tháng trước", value: "prev1" },
  { label: "2 tháng trước", value: "prev2" },
];

const STATUS_OPTIONS = [
  { label: "Tất cả trạng thái", value: "ALL" },
  { label: "Trong ngân sách", value: "ok" },
  { label: "Sắp vượt", value: "alert" },
  { label: "Vượt ngân sách", value: "over" },
];

const LIMIT = 9;

/** Trả về startDate (YYYY-MM) theo lựa chọn tháng */
function getStartDateFromMonthOption(option: string): string | undefined {
  if (option === "current") {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
  if (option === "prev1") {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
  if (option === "prev2") {
    const d = new Date();
    d.setMonth(d.getMonth() - 2);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
  return undefined;
}

const BudgetPage = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>();
  const [periodFilter, setPeriodFilter] = useState<string>("ALL");
  const [monthOption, setMonthOption] = useState("current");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [page, setPage] = useState(1);

  const query: QueryBudget = useMemo(() => {
    const q: QueryBudget = { page, limit: LIMIT };
    if (periodFilter !== "ALL") q.period = periodFilter as BudgetPeriod;
    const startDate = getStartDateFromMonthOption(monthOption);
    if (startDate) q.startDate = startDate;
    if (statusFilter !== "ALL") q.status = statusFilter as QueryBudget["status"];
    const min = minAmount ? Number(minAmount) : undefined;
    const max = maxAmount ? Number(maxAmount) : undefined;
    if (min != null && !Number.isNaN(min)) q.minAmount = min;
    if (max != null && !Number.isNaN(max)) q.maxAmount = max;
    return q;
  }, [periodFilter, monthOption, statusFilter, minAmount, maxAmount, page]);

  const { data, isLoading } = useBudgets(query);
  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  const { mutate: deleteBudget } = useDeleteBudget();
  const handleRemove = () => {
    if (!selectedBudget) return;
    deleteBudget(selectedBudget.id, {
      onSuccess: () => {
        toast.success("Xóa thành công");
        setOpenRemove(false);
        setSelectedBudget(undefined);
      },
    });
  };

  const stats = useMemo(() => {
    let totalAmount = 0;
    let totalSpent = 0;
    let overCount = 0;
    items.forEach((b) => {
      const amount = Number(b.amount) || 0;
      const spent = Number(b.spentAmount) || 0;
      totalAmount += amount;
      totalSpent += spent;
      if (amount > 0 && spent >= amount) overCount += 1;
    });
    const remaining = totalAmount - totalSpent;
    return {
      totalAmount: fmtShort(totalAmount),
      totalSpent: fmtShort(totalSpent),
      remaining: fmtShort(remaining >= 0 ? remaining : 0),
      overCount: String(overCount),
    };
  }, [items]);


  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="sticky top-0 z-30 border-b border-border/50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <PiggyBank size={15} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">Ngân sách</h1>
              <p className="text-[10px] text-muted-foreground">Finance › Budget</p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="rounded-xl gap-1.5 h-8 text-xs px-3"
            onClick={() => setOpenCreate(true)}
          >
            <Plus size={13} /> Thêm ngân sách
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">

        {/* ── Stat cards ── */}
        <div className="flex gap-3 flex-wrap">
          <BudgetStatCard label="Tổng ngân sách" value={stats.totalAmount} sub="theo bộ lọc" icon={PiggyBank} />
          <BudgetStatCard label="Đã chi" value={stats.totalSpent} sub="trên tất cả" icon={TrendingDown} accent="text-rose-500" />
          <BudgetStatCard label="Còn lại" value={stats.remaining} sub="khả dụng" icon={TrendingUp} accent="text-emerald-500" />
          <BudgetStatCard label="Vượt ngân sách" value={stats.overCount} sub="danh mục" icon={AlertTriangle} accent="text-amber-500" />
        </div>

        {/* ── Filters ── */}
        <div className="space-y-3">

          <div className="flex flex-wrap gap-2 items-center">

            {/* Period tabs */}
            <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/40">
              {PERIOD_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setPeriodFilter(tab.value)}
                  className={cn(
                    "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
                    periodFilter === tab.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/80"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <Select value={monthOption} onValueChange={setMonthOption}>
              <SelectTrigger className="w-[180px] h-9 rounded-xl border-border/60 bg-white text-xs shadow-none">
                <SelectValue placeholder="Chọn tháng" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {MONTH_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[175px] h-9 rounded-xl border-border/60 bg-white text-xs shadow-none">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium">Khoảng tiền:</span>
            <div className="relative">
              <Input
                type="number"
                placeholder="Tối thiểu"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="h-8 w-36 rounded-xl text-xs border-border/60 pr-6"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">₫</span>
            </div>
            <span className="text-xs text-muted-foreground">—</span>
            <div className="relative">
              <Input
                type="number"
                placeholder="Tối đa"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="h-8 w-36 rounded-xl text-xs border-border/60 pr-6"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">₫</span>
            </div>
          </div>
        </div>

        {/* ── Budget grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
              Đang tải...
            </div>
          ) : items.length === 0 ? (
            <div className="col-span-full py-20 flex flex-col items-center gap-2 text-muted-foreground">
              <PiggyBank size={32} className="opacity-20" />
              <p className="text-sm">Chưa có ngân sách nào</p>
            </div>
          ) : (
            items.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                spent={budget.spentAmount ?? 0}
                onClick={() => {
                  setSelectedBudget(budget);
                  setOpenUpdate(true);
                }}
                setBudget={setSelectedBudget}
                setOpenUpdate={setOpenUpdate}
                setOpenRemove={setOpenRemove}
              />
            ))
          )}
          <button
            type="button"
            onClick={() => setOpenCreate(true)}
            className="rounded-2xl border-2 border-dashed border-border bg-transparent cursor-pointer min-h-[168px] flex flex-col items-center justify-center gap-2.5 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={18} />
            </div>
            <span className="text-xs font-semibold">Thêm ngân sách</span>
          </button>
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-xl text-xs"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Trước
            </Button>
            <span className="text-xs text-muted-foreground">
              Trang {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-xl text-xs"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Sau
            </Button>
          </div>
        )}

        <BudgetCreate open={openCreate} setOpen={setOpenCreate} />
        <BudgetUpdate open={openUpdate} setOpen={setOpenUpdate} budget={selectedBudget} />
        <AlertRemoveDialog
          title="Xóa ngân sách"
          openConfirm={openRemove}
          setOpenConfirm={setOpenRemove}
          handleRemove={handleRemove}
        />

      </div>
    </div>
  );
};

export default BudgetPage;