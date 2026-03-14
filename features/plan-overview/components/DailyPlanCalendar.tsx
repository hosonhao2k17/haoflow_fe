"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { generateCalendarDays } from "../utils/calendar";
import { DAY_NAMES, MONTH_NAMES } from "../constants/overview-data";
import { cn } from "@/lib/utils";
import DayCell from "./DayCell";

interface DailyPlanCalendarProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const LEGEND = [
  ["bg-primary/80", "100%"],
  ["bg-primary/40", "Tiến độ"],
  ["bg-amber-500", "Một phần"],
  ["bg-destructive/60", "Hủy"],
] as const;

export default function DailyPlanCalendar({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: DailyPlanCalendarProps) {
  const calDays = useMemo(() => generateCalendarDays(year, month), [year, month]);

  return (
    <Card className="shadow-none border-border/60 rounded-2xl">
      <CardHeader className="pb-0 pt-5 px-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar size={13} className="text-primary" />
            </span>
            Daily Plan Calendar
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {LEGEND.map(([c, l]) => (
                <div key={l} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span className={cn("w-2 h-2 rounded-sm inline-block", c)} />
                  {l}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 border border-border/60 rounded-xl px-2 py-1">
              <button
                type="button"
                onClick={onPrevMonth}
                className="text-muted-foreground hover:text-foreground p-0.5"
              >
                <ChevronLeft size={13} />
              </button>
              <span className="text-[11px] font-bold text-foreground min-w-[80px] text-center">
                {MONTH_NAMES[month]} {year}
              </span>
              <button
                type="button"
                onClick={onNextMonth}
                className="text-muted-foreground hover:text-foreground p-0.5"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5 mt-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-bold text-muted-foreground py-1 tracking-wider"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calDays.map((day, i) => (
            <DayCell key={i} day={day} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
