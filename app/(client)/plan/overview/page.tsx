"use client";

import { useState, useMemo } from "react";
import type { FilterMode } from "@/features/plan-overview/components/OverviewHeader";
import OverviewHeader from "@/features/plan-overview/components/OverviewHeader";
import OverviewStatCards from "@/features/plan-overview/components/OverviewStatCards";
import TaskProgressChart from "@/features/plan-overview/components/TaskProgressChart";
import CategoryListCard from "@/features/plan-overview/components/CategoryListCard";
import DailyPlanCalendar from "@/features/plan-overview/components/DailyPlanCalendar";
import WeekdayPerformance from "@/features/plan-overview/components/WeekdayPerformance";
import CategoryStatusChart from "@/features/plan-overview/components/CategoryStatusChart";
import AIAnalysis from "@/features/plan-overview/components/AIAnalysis";
import {
  WEEK_DATA,
  MONTH_DATA,
  YEAR_DATA,
} from "@/features/plan-overview/constants/overview-data";

const totalDone = 247;
const totalTodo = 38;
const totalSkipped = 19;
const streak = 12;
const totalTasks = totalDone + totalTodo + totalSkipped;

const PERIOD_LABELS: Record<FilterMode, string> = {
  week: "T2 → CN",
  month: "Tuần 1 → 4",
  year: "T1 → T12",
};

export default function TaskOverviewPage() {
  const [filterMode, setFilterMode] = useState<FilterMode>("week");
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());

  const chartData = useMemo(() => {
    if (filterMode === "week") return WEEK_DATA;
    if (filterMode === "month") return MONTH_DATA;
    return YEAR_DATA;
  }, [filterMode]);

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
          totalTasks={totalTasks}
          totalDone={totalDone}
          totalTodo={totalTodo}
          totalSkipped={totalSkipped}
          streak={streak}
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
          <CategoryStatusChart />
        </div>

        <AIAnalysis />
      </div>
    </div>
  );
}
