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
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import BudgetStatCard from "@/features/budget/components/BudgetStatCard";
import BudgetCard from "@/features/budget/components/BudgetCard";
import { Budget } from "@/features/budget/interfaces/budget.interface";
import { BudgetPeriod } from "@/common/constants/finance.constant";
import { useBudgets } from "@/features/budget/budget.hook";
import { useState } from "react";
import BudgetCreate from "@/features/budget/components/BudgetCreate";
import BudgetUpdate from "@/features/budget/components/BudgetUpdate";

const PERIOD_TABS = [
  { label: "Tất cả",     value: "ALL"                },
  { label: "Hàng tháng", value: BudgetPeriod.MONTHLY },
  { label: "Hàng tuần",  value: BudgetPeriod.WEEKLY  },
  { label: "Hàng năm",   value: BudgetPeriod.YEARLY  },
];

const BudgetPage = () => {

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [budget, setBudget] = useState<Budget>();
  const {data} = useBudgets({})


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
          <BudgetStatCard label="Tổng ngân sách" value="0 ₫" sub="tháng này"   icon={PiggyBank} />
          <BudgetStatCard label="Đã chi"          value="0 ₫" sub="trên tất cả" icon={TrendingDown}  accent="text-rose-500" />
          <BudgetStatCard label="Còn lại"         value="0 ₫" sub="khả dụng"    icon={TrendingUp}    accent="text-emerald-500" />
          <BudgetStatCard label="Vượt ngân sách"  value="0"   sub="danh mục"    icon={AlertTriangle} accent="text-amber-500" />
        </div>

        {/* ── Filters ── */}
        <div className="space-y-3">

          {/* Row 1: tabs + selects + amount toggle */}
          <div className="flex flex-wrap gap-2 items-center">

            {/* Period tabs */}
            <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/40">
              {PERIOD_TABS.map((tab, i) => (
                <button
                  key={tab.value}
                  className={cn(
                    "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
                    i === 0
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/80"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Month picker */}
            <Select defaultValue="current">
              <SelectTrigger className="w-[180px] h-9 rounded-xl border-border/60 bg-white text-xs shadow-none">
                <SelectValue placeholder="Chọn tháng" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="current" className="text-xs">Tháng hiện tại</SelectItem>
                <SelectItem value="prev1"   className="text-xs">Tháng trước</SelectItem>
                <SelectItem value="prev2"   className="text-xs">2 tháng trước</SelectItem>
              </SelectContent>
            </Select>

            {/* Status */}
            <Select defaultValue="ALL">
              <SelectTrigger className="w-[175px] h-9 rounded-xl border-border/60 bg-white text-xs shadow-none">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="ALL"   className="text-xs">Tất cả trạng thái</SelectItem>
                <SelectItem value="ok"    className="text-xs">Trong ngân sách</SelectItem>
                <SelectItem value="alert" className="text-xs">Sắp vượt</SelectItem>
                <SelectItem value="over"  className="text-xs">Vượt ngân sách</SelectItem>
              </SelectContent>
            </Select>

            {/* Amount filter toggle */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-xl gap-1.5 text-xs border-border/60"
            >
              <SlidersHorizontal size={13} />
              Số tiền
            </Button>
          </div>

          {/* Row 2: Amount range inputs */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium">Khoảng tiền:</span>
            <div className="relative">
              <Input
                type="number"
                placeholder="Tối thiểu"
                className="h-8 w-36 rounded-xl text-xs border-border/60 pr-6"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">₫</span>
            </div>
            <span className="text-xs text-muted-foreground">—</span>
            <div className="relative">
              <Input
                type="number"
                placeholder="Tối đa"
                className="h-8 w-36 rounded-xl text-xs border-border/60 pr-6"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">₫</span>
            </div>
            <Button size="sm" className="h-8 rounded-xl text-xs px-3">
              Áp dụng
            </Button>
          </div>
        </div>

        {/* ── Budget grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {/* Empty state — hiển thị khi không có data */}
          {/* 
          <div className="col-span-full py-20 flex flex-col items-center gap-2 text-muted-foreground">
            <PiggyBank size={32} className="opacity-20" />
            <p className="text-sm">Chưa có ngân sách nào</p>
          </div>
          */}

          {
            data?.items.map((budget: Budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              spent={budget.spentAmount}
              onClick={() => {}}
              setBudget={setBudget}
              setOpenUpdate={setOpenUpdate}
            />
          ))
          }

          {/* Add placeholder */}
          <button className="rounded-2xl border-2 border-dashed border-border bg-transparent cursor-pointer min-h-[168px] flex flex-col items-center justify-center gap-2.5 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all group">
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={18} />
            </div>
            <span className="text-xs font-semibold">Thêm ngân sách</span>
          </button>
        </div>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button variant="outline" size="sm" className="h-8 rounded-xl text-xs">Trước</Button>
          <span className="text-xs text-muted-foreground">Trang 1 / 1</span>
          <Button variant="outline" size="sm" className="h-8 rounded-xl text-xs">Sau</Button>
        </div>

        {/* dialog  */}
        <BudgetCreate 
          open={openCreate}
          setOpen={setOpenCreate}
        />
        <BudgetUpdate 
          open={openUpdate}
          setOpen={setOpenUpdate}
          budget={budget}
        />

      </div>
    </div>
  );
};

export default BudgetPage;