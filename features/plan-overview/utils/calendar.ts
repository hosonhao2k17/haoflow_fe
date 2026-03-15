export interface CalendarDay {
  day: number;
  status: "future" | "done" | "progress" | "partial" | "cancelled";
  progress: number;
  isToday: boolean;
  /** id daily plan (nếu có) để link /plan/[id] */
  dailyPlanId?: string;
}

/** Key YYYY-MM-DD cho ngày trong tháng (month 0-based) */
export function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export type FilterMode = "week" | "month" | "year";

/** Khoảng ngày theo kỳ (tuần hiện tại, tháng hiện tại, năm hiện tại) */
export function getDateRangeForFilter(mode: FilterMode): { startDate: Date; endDate: Date } {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  if (mode === "week") {
    const day = now.getDay();
    const monOffset = day === 0 ? -6 : 1 - day;
    const mon = new Date(now);
    mon.setDate(now.getDate() + monOffset);
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    return { startDate: mon, endDate: sun };
  }
  if (mode === "month") {
    return {
      startDate: new Date(y, m, 1),
      endDate: new Date(y, m + 1, 0),
    };
  }
  return {
    startDate: new Date(y, 0, 1),
    endDate: new Date(y, 11, 31),
  };
}

export function toYYYYMMDD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Label theo filter: Tuần = T2..CN, Tháng = Tuần 1..4, Năm = T1..T12 */
export const DAY_NAMES = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] as const;
export const MONTH_LABELS = [
  "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12",
] as const;

export interface DailyProgressByPeriodItem {
  label: string;
  value: number;
}

/** Plan với date (YYYY-MM-DD) và progressPercent */
export interface PlanProgressItem {
  date: string;
  progressPercent: number;
}

/**
 * Build data cho biểu đồ tiến trình: X = ngày/tháng theo filter, Y = % (0–100).
 * - week: 7 cột T2→CN, value = % của plan đúng ngày đó.
 * - month: 4 cột Tuần 1→4, value = trung bình % các plan trong tuần.
 * - year: 12 cột T1→T12, value = trung bình % các plan trong tháng.
 */
export function buildDailyProgressByPeriod(
  mode: FilterMode,
  range: { startDate: Date; endDate: Date },
  plans: PlanProgressItem[]
): DailyProgressByPeriodItem[] {
  const planByDate: Record<string, number> = {};
  plans.forEach((p) => {
    const key = p.date?.split("T")[0] ?? p.date;
    if (key) planByDate[key] = p.progressPercent ?? 0;
  });

  if (mode === "week") {
    const start = new Date(range.startDate);
    return DAY_NAMES.map((label, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = toYYYYMMDD(d);
      return { label, value: planByDate[key] ?? 0 };
    });
  }

  if (mode === "month") {
    const start = new Date(range.startDate);
    const end = new Date(range.endDate);
    const result: DailyProgressByPeriodItem[] = [];
    for (let w = 0; w < 4; w++) {
      const weekStart = new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      const percents: number[] = [];
      for (let i = 0; i <= 6; i++) {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        if (d > end) break;
        const key = toYYYYMMDD(d);
        if (planByDate[key] !== undefined) percents.push(planByDate[key]);
      }
      const value =
        percents.length > 0
          ? Math.round(percents.reduce((a, b) => a + b, 0) / percents.length)
          : 0;
      result.push({ label: `Tuần ${w + 1}`, value });
    }
    return result;
  }

  const y = range.startDate.getFullYear();
  return MONTH_LABELS.map((label, i) => {
    const monthStart = new Date(y, i, 1);
    const monthEnd = new Date(y, i + 1, 0);
    const percents: number[] = [];
    for (let t = monthStart.getTime(); t <= monthEnd.getTime(); t += 86400000) {
      const key = toYYYYMMDD(new Date(t));
      if (planByDate[key] !== undefined) percents.push(planByDate[key]);
    }
    const value =
      percents.length > 0
        ? Math.round(percents.reduce((a, b) => a + b, 0) / percents.length)
        : 0;
    return { label, value };
  });
}

export interface DailyPlanForDay {
  progressPercent: number;
  id: string;
}

/**
 * Sinh lịch tháng. Nếu có plansByDate (từ API daily-plans), mỗi ngày dùng progressPercent để status/progress.
 * Ngày không có plan hoặc tương lai = future.
 */
export function generateCalendarDays(
  year: number,
  month: number,
  plansByDate?: Record<string, DailyPlanForDay>
): (CalendarDay | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const days: (CalendarDay | null)[] = [];

  for (let i = 0; i < offset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const isToday = date.toDateString() === today.toDateString();
    const dateKey = toDateKey(year, month, d);
    const plan = plansByDate?.[dateKey];

    let status: CalendarDay["status"] = "future";
    let progress = 0;
    let dailyPlanId: string | undefined;

    if (plan) {
      dailyPlanId = plan.id;
      progress = plan.progressPercent ?? 0;
      if (progress >= 100) status = "done";
      else if (progress <= 0) status = "cancelled";
      else if (progress < 50) status = "partial";
      else status = "progress";
    }

    days.push({ day: d, status, progress, isToday, dailyPlanId });
  }
  return days;
}
