"use client";

import { useState, useMemo } from "react";
import type { FilterMode } from "@/features/plan-overview/components/OverviewHeader";
import OverviewHeader from "@/features/plan-overview/components/OverviewHeader";
import OverviewStatCards from "@/features/plan-overview/components/OverviewStatCards";
import TaskProgressChart from "@/features/plan-overview/components/TaskProgressChart";
import CategoryListCard from "@/features/plan-overview/components/CategoryListCard";
import DailyPlanCalendar from "@/features/plan-overview/components/DailyPlanCalendar";
import WeekdayPerformance from "@/features/plan-overview/components/WeekdayPerformance";
import CategoryStatusChart, {
  type CategoryStatusItem,
} from "@/features/plan-overview/components/CategoryStatusChart";
import AIAnalysis from "@/features/plan-overview/components/AIAnalysis";
import { useTaskStats, useTasks } from "@/features/task/task.hook";
import { StatsType } from "@/features/task/constants/stats-type.constant";
import { TaskStatus } from "@/common/constants/app.constant";
import { useDailyPlans } from "@/features/daily-plan/daly-plan.hook";
import { useTaskCategories } from "@/features/task-category/task-category.hook";
import {
  getDateRangeForFilter,
  toYYYYMMDD,
  buildDailyProgressByPeriod,
} from "@/features/plan-overview/utils/calendar";
import type { DailyPlan } from "@/features/daily-plan/interfaces/daily-plan.interface";
import type { Task } from "@/features/task/interfaces/task.interface";
import type { TaskCategory } from "@/features/task-category/interfaces/task-catgegory.interface";

const PERIOD_LABELS: Record<FilterMode, string> = {
  week: "Tuần này",
  month: "Tháng này",
  year: "Năm nay",
};

export default function TaskOverviewPage() {
  const [filterMode, setFilterMode] = useState<FilterMode>("week");
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const statsType: StatsType = filterMode === "week" ? StatsType.WEEK : filterMode === "month" ? StatsType.MONTH : StatsType.YEAR;
  const { data: taskStats } = useTaskStats(statsType);

  const dateRange = useMemo(() => getDateRangeForFilter(filterMode), [filterMode]);
  const startStr = useMemo(() => toYYYYMMDD(dateRange.startDate), [dateRange.startDate]);
  const endStr = useMemo(() => toYYYYMMDD(dateRange.endDate), [dateRange.endDate]);
  const { data: dailyPlansData } = useDailyPlans({ startDate: startStr, endDate: endStr });
  const { data: tasksData } = useTasks({ limit: 500 });
  const { data: categoriesData } = useTaskCategories({ limit: 100 });

  const chartData = useMemo(() => {
    const items = (dailyPlansData?.items ?? []) as DailyPlan[];
    const plans = items.map((p) => ({
      date: p.date?.split("T")[0] ?? p.date ?? "",
      progressPercent: p.summary?.progressPercent ?? 0,
    }));
    return buildDailyProgressByPeriod(filterMode, dateRange, plans);
  }, [dailyPlansData?.items, filterMode, dateRange]);

  const categoryStatusData = useMemo((): CategoryStatusItem[] => {
    const items = (tasksData?.items ?? []) as Task[];
    const categories = (categoriesData?.items ?? []) as TaskCategory[];
    const counts: Record<string, { done: number; skipped: number }> = {};
    categories.forEach((c) => {
      counts[c.id] = { done: 0, skipped: 0 };
    });
    items.forEach((t) => {
      const cid = t.category?.id;
      if (!cid || !counts[cid]) return;
      if (t.status === TaskStatus.DONE) counts[cid].done += 1;
      else if (t.status === TaskStatus.SKIPPED) counts[cid].skipped += 1;
    });
    return categories
      .map((c) => ({
        category: c.title ?? "",
        done: counts[c.id]?.done ?? 0,
        skipped: counts[c.id]?.skipped ?? 0,
      }))
      .filter((row) => row.done > 0 || row.skipped > 0)
      .sort((a, b) => b.done + b.skipped - (a.done + a.skipped));
  }, [tasksData?.items, categoriesData?.items]);

  const prevMonth = () => {
    let m = calMonth - 1;
    let y = calYear;
    if (m < 0) {
      m = 11;
      y--;
    }
    setCalMonth(m);
    setCalYear(y);
  };

  const nextMonth = () => {
    let m = calMonth + 1;
    let y = calYear;
    if (m > 11) {
      m = 0;
      y++;
    }
    setCalMonth(m);
    setCalYear(y);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <OverviewHeader filterMode={filterMode} onFilterChange={setFilterMode} />

        <OverviewStatCards
          totalTasks={taskStats?.total ?? 0}
          totalDone={taskStats?.done ?? 0}
          totalTodo={taskStats?.todo ?? 0}
          totalSkipped={taskStats?.skipped ?? 0}
          streak={taskStats?.streak ?? 0}
          doneProgress={taskStats?.doneProgress}
          skipProgress={taskStats?.skipProgress}
        />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
          <TaskProgressChart data={chartData} periodLabel={PERIOD_LABELS[filterMode]} />
          <CategoryListCard />
        </div>

        <DailyPlanCalendar
          year={calYear}
          month={calMonth}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <WeekdayPerformance />
          <CategoryStatusChart data={categoryStatusData} />
        </div>

        <AIAnalysis />
      </div>
    </div>
  );
}
