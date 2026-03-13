"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BudgetPeriod } from "@/common/constants/finance.constant";

// Format local date — tránh toISOString() bị lệch UTC
const fmtYearMonth = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

const fmtYearMonthDay = (d: Date) =>
  `${fmtYearMonth(d)}-${String(d.getDate()).padStart(2, "0")}`;

const buildMonthOptions = () => {
  const opts: { label: string; value: string }[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  for (let m = currentMonth; m <= 11; m++) {
    const d = new Date(currentYear, m, 1);
    opts.push({
      label: d.toLocaleDateString("vi-VN", { month: "long", year: "numeric" }),
      value: fmtYearMonth(d),
    });
  }
  return opts;
};

const buildWeekOptions = () => {
  const opts: { label: string; value: string }[] = [];
  const now = new Date();

  for (let offset = 0; offset <= 2; offset++) {
    const year = now.getFullYear();
    const month = now.getMonth() + offset;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let cursor = new Date(firstDay);
    const dow = cursor.getDay();
    const diffToMonday = dow === 0 ? -6 : 1 - dow;
    cursor.setDate(cursor.getDate() + diffToMonday);

    let weekIndex = 1;
    while (cursor <= lastDay) {
      const weekStart = new Date(cursor);
      const weekEnd = new Date(cursor);
      weekEnd.setDate(weekEnd.getDate() + 6);

      if (weekEnd >= firstDay && weekStart <= lastDay) {
        const fmt = (d: Date) =>
          d.toLocaleDateString("vi-VN", { day: "numeric", month: "numeric" });
        const monthLabel = firstDay.toLocaleDateString("vi-VN", {
          month: "long",
          year: "numeric",
        });

        opts.push({
          label: `Tuần ${weekIndex} (${fmt(weekStart)} – ${fmt(weekEnd)}) · ${monthLabel}`,
          value: fmtYearMonthDay(weekStart),
        });
        weekIndex++;
      }

      cursor.setDate(cursor.getDate() + 7);
    }
  }

  return opts;
};

const buildYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return [
    { label: `Năm ${currentYear}`, value: `${currentYear}` },
    { label: `Năm ${currentYear + 1}`, value: `${currentYear + 1}` },
  ];
};

export const getDefaultDateValue = (period: BudgetPeriod): string => {
  const now = new Date();
  if (period === BudgetPeriod.WEEKLY) {
    return buildWeekOptions()[0]?.value ?? "";
  }
  if (period === BudgetPeriod.YEARLY) {
    return String(now.getFullYear());
  }
  return fmtYearMonth(now);
};

interface Props {
  period: BudgetPeriod;
  value: string;
  onChange: (value: string) => void;
}

const TransactionPeriodDateSelect = ({ period, value, onChange }: Props) => {
  if (period === BudgetPeriod.MONTHLY) {
    const options = buildMonthOptions();
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 rounded-xl border-border/60 bg-white text-sm shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl max-h-52">
          {options.map((m) => (
            <SelectItem key={m.value} value={m.value} className="text-sm rounded-lg capitalize">
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (period === BudgetPeriod.WEEKLY) {
    const options = buildWeekOptions();
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 rounded-xl border-border/60 bg-white text-sm shadow-none">
          <SelectValue placeholder="Chọn tuần" />
        </SelectTrigger>
        <SelectContent className="rounded-xl max-h-64">
          {options.map((w) => (
            <SelectItem key={w.value} value={w.value} className="text-sm rounded-lg">
              {w.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  const options = buildYearOptions();
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 rounded-xl border-border/60 bg-white text-sm shadow-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {options.map((y) => (
          <SelectItem key={y.value} value={y.value} className="text-sm rounded-lg">
            {y.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TransactionPeriodDateSelect;