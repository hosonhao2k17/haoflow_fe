"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookCheck,
  Wallet,
  User,
  ChevronRight,
  ListTodo,
  TrendingUp,
  TrendingDown,
  Bell,
  Calendar,
  Target,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { themeVar } from "@/common/constants/theme.constant";
import { useTaskStats } from "@/features/task/task.hook";
import { StatsType } from "@/features/task/constants/stats-type.constant";
import { useDailyPlans } from "@/features/daily-plan/daly-plan.hook";
import { getDateRangeForFilter, toYYYYMMDD } from "@/features/plan-overview/utils/calendar";
import { useTransactionStats, useTransactions } from "@/features/transaction/transaction.hook";
import { useAccounts } from "@/features/account/account.hook";
import { TransactionType } from "@/common/constants/app.constant";
import type { DailyPlan } from "@/features/daily-plan/interfaces/daily-plan.interface";
import type { Transaction } from "@/features/transaction/interfaces/transaction.interface";
import { format } from "date-fns";

function formatVnd(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

const DAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const PIE_COLORS = [themeVar.chart1, themeVar.chart2, themeVar.chart3];

export default function Home() {
  const weekRange = useMemo(() => getDateRangeForFilter("week"), []);
  const weekStartStr = useMemo(() => toYYYYMMDD(weekRange.startDate), [weekRange.startDate]);
  const weekEndStr = useMemo(() => toYYYYMMDD(weekRange.endDate), [weekRange.endDate]);

  const { data: taskStats } = useTaskStats(StatsType.WEEK);
  const { data: dailyPlansData } = useDailyPlans({
    startDate: weekStartStr,
    endDate: weekEndStr,
  });
  const { data: transactionStats } = useTransactionStats();
  const { data: accountsData } = useAccounts({ limit: 50 });
  const { data: weekTransactionsData } = useTransactions({
    dateFrom: weekRange.startDate,
    dateTo: weekRange.endDate,
  });

  const totalBalance = useMemo(() => {
    const net = transactionStats?.netBalance;
    if (net != null) return net;
    const items = accountsData?.items ?? [];
    return items.reduce((sum, a) => sum + (a.balance ?? 0), 0);
  }, [transactionStats?.netBalance, accountsData?.items]);

  const planWeekBars = useMemo(() => {
    const items = (dailyPlansData?.items ?? []) as DailyPlan[];
    const byDate: Record<string, number> = {};
    items.forEach((p) => {
      const key = p.date?.split("T")[0] ?? p.date;
      if (key) byDate[key] = p.summary?.progressPercent ?? 0;
    });
    const bars: number[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekRange.startDate);
      d.setDate(weekRange.startDate.getDate() + i);
      const key = format(d, "yyyy-MM-dd");
      bars.push(byDate[key] ?? 0);
    }
    return bars;
  }, [dailyPlansData?.items, weekRange.startDate]);

  const financeWeekChart = useMemo(() => {
    const items = (weekTransactionsData?.items ?? []) as Transaction[];
    const income: number[] = [0, 0, 0, 0, 0, 0, 0];
    const expense: number[] = [0, 0, 0, 0, 0, 0, 0];
    const weekStart = weekRange.startDate.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    items.forEach((tx) => {
      const t = new Date(tx.transactionDate).getTime();
      const dayIndex = Math.floor((t - weekStart) / oneDay);
      if (dayIndex >= 0 && dayIndex < 7) {
        if (tx.type === TransactionType.INCOME) income[dayIndex] += tx.amount ?? 0;
        else expense[dayIndex] += Math.abs(tx.amount ?? 0);
      }
    });
    return { income, expense };
  }, [weekTransactionsData?.items, weekRange.startDate]);

  const todayStr = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);
  const todayPlansCount = useMemo(() => {
    const items = (dailyPlansData?.items ?? []) as DailyPlan[];
    return items.filter((p) => (p.date?.split("T")[0] ?? p.date) === todayStr).length;
  }, [dailyPlansData?.items, todayStr]);

  const planPieData = useMemo(
    () => [
      { name: "Hoàn thành", value: taskStats?.done ?? 0 },
      { name: "Chưa làm", value: taskStats?.todo ?? 0 },
      { name: "Bỏ qua", value: taskStats?.skipped ?? 0 },
    ],
    [taskStats?.done, taskStats?.todo, taskStats?.skipped]
  );

  const totalTasks = taskStats?.total ?? 0;
  const planDone = taskStats?.done ?? 0;
  const planTodo = taskStats?.todo ?? 0;
  const planSkipped = taskStats?.skipped ?? 0;
  const streak = taskStats?.streak ?? 0;
  const incomeMonth = transactionStats?.totalIncome ?? 0;
  const expenseMonth = transactionStats?.totalExpense ?? 0;
  const unreadNotifications = 0;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 space-y-8">
      <div>
        <h1 className="text-xl font-bold text-foreground">Tổng quan</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Thống kê nhanh Kế hoạch, Tài chính và Cá nhân
        </p>
      </div>

      {/* Block 1: Kế hoạch */}
      <Card className="shadow-none border-border/60">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookCheck className="w-4 h-4 text-primary" />
              </span>
              Kế hoạch
            </CardTitle>
            <Link
              href="/plan/overview"
              className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5"
            >
              Xem chi tiết
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                {totalTasks}
              </span>
              <span className="text-xs text-muted-foreground">tổng task</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {planDone}
              </span>
              <span className="text-xs text-muted-foreground">hoàn thành</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-amber-600">
                {streak} ngày
              </span>
              <span className="text-xs text-muted-foreground">streak</span>
            </div>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground mb-2">
              Tiến độ tuần (T2 → CN)
            </p>
            <div className="flex gap-1.5 items-end h-24">
              {planWeekBars.map((val, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-primary/70 min-w-0 transition-all"
                  style={{ height: `${Math.max(8, (val / 100) * 96)}px` }}
                  title={`${DAY_LABELS[i]}: ${val}%`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
              {DAY_LABELS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
          {/* Biểu đồ tròn: phân bổ nhiệm vụ */}
          <div className="pt-4 mt-4 border-t border-border/50">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Phân bổ nhiệm vụ
            </p>
            <div className="flex items-center gap-6">
              <div className="w-[140px] h-[140px] shrink-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={planPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="58%"
                      outerRadius="85%"
                      paddingAngle={2}
                      cornerRadius={6}
                      stroke="var(--card)"
                      strokeWidth={2}
                    >
                      {planPieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value} task`,
                        name,
                      ]}
                      contentStyle={{
                        fontSize: "12px",
                        borderRadius: "10px",
                        border: "1px solid var(--border)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      }}
                      cursor={false}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-lg font-bold text-foreground">
                    {totalTasks}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 min-w-0">
                {[
                  { label: "Hoàn thành", value: planDone, color: PIE_COLORS[0] },
                  { label: "Chưa làm", value: planTodo, color: PIE_COLORS[1] },
                  { label: "Bỏ qua", value: planSkipped, color: PIE_COLORS[2] },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {label}
                      <span className="font-semibold text-foreground ml-1">
                        {value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-2" />

      {/* Block 2: Tài chính */}
      <Card className="shadow-none border-border/60">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-emerald-600" />
              </span>
              Tài chính
            </CardTitle>
            <Link
              href="/finance/overview"
              className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5"
            >
              Xem chi tiết
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-[11px] text-muted-foreground">Tổng số dư</p>
              <p className="text-lg font-bold text-foreground">
                {formatVnd(totalBalance)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-600">
                  {formatVnd(incomeMonth)}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  thu tháng
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-rose-600" />
                <span className="text-sm font-semibold text-rose-600">
                  {formatVnd(expenseMonth)}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  chi tháng
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground mb-2">
              Thu / Chi tuần
            </p>
            <div className="flex gap-1 items-end h-24">
              {financeWeekChart.income.map((_, i) => {
                const max = Math.max(
                  ...financeWeekChart.income,
                  ...financeWeekChart.expense
                );
                const inH = max ? (financeWeekChart.income[i] / max) * 96 : 4;
                const exH = max ? (financeWeekChart.expense[i] / max) * 96 : 4;
                return (
                  <div key={i} className="flex-1 flex gap-0.5 items-end min-w-0 justify-center">
                    <div
                      className="w-full max-w-3 rounded-t bg-emerald-500/70"
                      style={{ height: `${Math.max(4, inH)}px` }}
                      title={`Thu: ${formatVnd(financeWeekChart.income[i])}`}
                    />
                    <div
                      className="w-full max-w-3 rounded-t bg-rose-500/70"
                      style={{ height: `${Math.max(4, exH)}px` }}
                      title={`Chi: ${formatVnd(financeWeekChart.expense[i])}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
              {DAY_LABELS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-2" />

      {/* Block 3: Cá nhân */}
      <Card className="shadow-none border-border/60">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <User className="w-4 h-4 text-violet-600" />
              </span>
              Cá nhân
            </CardTitle>
            <Link
              href="/profiles"
              className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5"
            >
              Hồ sơ
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-6">
            <Link
              href="/notifications"
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 hover:bg-muted/50 transition-colors"
            >
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Thông báo</span>
              {unreadNotifications > 0 && (
                <span className="text-xs font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-semibold text-foreground">
                  {todayPlansCount}
                </span>
                <span className="text-muted-foreground"> kế hoạch hôm nay</span>
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40">
              <ListTodo className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-semibold text-foreground">
                  {planTodo}
                </span>
                <span className="text-muted-foreground"> task còn lại</span>
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10">
              <Target className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">
                Streak {streak} ngày
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
