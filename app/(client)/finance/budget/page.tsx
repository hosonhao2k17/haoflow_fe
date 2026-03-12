"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  PiggyBank,
  Plus,
  TrendingDown,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import BudgetStatCard from "@/features/budget/components/BudgetStatCard";



const BudgetPage = () => {



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
                <Button size="sm" className="rounded-xl gap-1.5 h-8 text-xs px-3">
                    <Plus size={13} /> Thêm ngân sách
                </Button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">

                {/* ── Stat cards ── */}
                <div className="flex gap-3 flex-wrap">
                    <BudgetStatCard label="Tổng ngân sách" value="0 ₫"  sub="tháng này"      icon={PiggyBank} />
                    <BudgetStatCard label="Đã chi"         value="0 ₫"  sub="trên tất cả"    icon={TrendingDown} accent="text-rose-500" />
                    <BudgetStatCard label="Còn lại"        value="0 ₫"  sub="khả dụng"       icon={TrendingUp}   accent="text-emerald-500" />
                    <BudgetStatCard label="Vượt ngân sách" value="0"    sub="danh mục"       icon={AlertTriangle} accent="text-amber-500" />
                </div>

                {/* ── Filters ── */}
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/40">
                        {(["Tất cả", "Hàng tháng", "Hàng tuần", "Hàng năm"]).map((label, i) => (
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
                        <SelectTrigger className="w-[160px] h-9 rounded-xl border-border/60 bg-white text-sm shadow-none">
                            <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="ALL">Tất cả</SelectItem>
                            <SelectItem value="ok">Trong ngân sách</SelectItem>
                            <SelectItem value="alert">Sắp vượt</SelectItem>
                            <SelectItem value="over">Vượt ngân sách</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* ── Budget grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                {/* Empty state */}
                <div className="col-span-full py-20 flex flex-col items-center gap-2 text-muted-foreground">
                    <PiggyBank size={32} className="opacity-20" />
                    <p className="text-sm">Chưa có ngân sách nào</p>
                </div>

                {/* BudgetCard template — dùng khi map data
                <BudgetCard
                    key={budget.id}
                    budget={budget}
                    spent={spent}         // tính từ transactions
                    onClick={() => {}}    // mở detail sheet
                />
                */}

                {/* Add placeholder */}
                <button className="rounded-2xl border-2 border-dashed border-border bg-transparent cursor-pointer min-h-[168px] flex flex-col items-center justify-center gap-2.5 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all group">
                    <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={18} />
                    </div>
                    <span className="text-xs font-semibold">Thêm ngân sách</span>
                </button>
                </div>
            </div>

        </div>
    );
};

export default BudgetPage;