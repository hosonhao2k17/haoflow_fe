"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { WEEKDAY_STATS } from "../constants/overview-data";

export default function WeekdayPerformance() {
  const minRate = Math.min(...WEEKDAY_STATS.map((d) => d.rate));
  const maxRate = Math.max(...WEEKDAY_STATS.map((d) => d.rate));

  return (
    <Card className="shadow-none border-border/60 rounded-2xl">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar size={13} className="text-primary" />
          </span>
          Hiệu suất theo thứ (Chức năng này chưa làm kịp)
        </CardTitle>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Thứ nào hoàn thành ít task nhất trong daily plan
        </p>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-2.5">
        {WEEKDAY_STATS.map((d) => {
          const isMin = d.rate === minRate;
          const isMax = d.rate === maxRate;
          return (
            <div key={d.label} className="flex items-center gap-3">
              <span
                className={cn(
                  "w-7 text-[11px] font-bold shrink-0 text-right",
                  isMin ? "text-destructive" : isMax ? "text-primary" : "text-muted-foreground"
                )}
              >
                {d.label}
              </span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    isMin ? "bg-destructive/70" : "bg-primary"
                  )}
                  style={{ width: `${d.rate}%` }}
                />
              </div>
              <div className="flex items-center gap-1.5 shrink-0 w-20 justify-end">
                <span
                  className={cn(
                    "text-[11px] font-bold",
                    isMin ? "text-destructive" : isMax ? "text-primary" : "text-foreground"
                  )}
                >
                  {d.rate}%
                </span>
                {isMin && (
                  <Badge
                    variant="destructive"
                    className="text-[9px] px-1.5 py-0 rounded-md h-4"
                  >
                    Thấp nhất
                  </Badge>
                )}
                {isMax && (
                  <Badge className="text-[9px] px-1.5 py-0 rounded-md h-4 bg-primary">
                    Cao nhất
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
