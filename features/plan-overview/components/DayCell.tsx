"use client";

import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import type { CalendarDay } from "../utils/calendar";

interface DayCellProps {
  day: CalendarDay | null;
}

const styles: Record<string, string> = {
  done: "bg-primary/10 border-primary/30 text-primary",
  progress: "bg-primary/5 border-primary/20 text-primary/70",
  partial: "bg-amber-500/10 border-amber-500/30 text-amber-600",
  cancelled: "bg-destructive/8 border-destructive/20 text-destructive",
  future: "bg-muted/40 border-border/30 text-muted-foreground/40",
};

const barColor: Record<string, string> = {
  done: "bg-primary",
  progress: "bg-primary/60",
  partial: "bg-amber-500",
  cancelled: "bg-destructive",
  future: "bg-muted",
};

export default function DayCell({ day }: DayCellProps) {
  if (!day) return <div />;

  const s = styles[day.status] ?? styles.future;
  const b = barColor[day.status] ?? barColor.future;

  return (
    <div
      className={cn(
        "relative border rounded-xl p-1.5 min-h-[60px] flex flex-col items-center justify-between transition-transform cursor-default",
        day.status !== "future" && "cursor-pointer hover:scale-[1.04]",
        s
      )}
    >
      {day.isToday && (
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]" />
      )}
      <span className={cn("text-[11px] font-bold", day.isToday && "text-primary")}>
        {day.day}
      </span>
      {day.status === "cancelled" ? (
        <XCircle size={12} className="text-destructive opacity-70" />
      ) : day.status === "future" ? (
        <span className="w-4 h-0.5 rounded bg-muted-foreground/10" />
      ) : (
        <div className="w-full px-1 mt-1">
          <div className="h-1 rounded-full bg-black/10 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", b)}
              style={{ width: `${day.progress}%` }}
            />
          </div>
          <span className="text-[9px] font-bold block text-center mt-0.5">{day.progress}%</span>
        </div>
      )}
    </div>
  );
}
