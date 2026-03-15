"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartColors } from "@/common/constants/theme.constant";
import ChartTooltip from "./ChartTooltip";

/** Mỗi cột: nhãn theo filter (T2..CN / Tuần 1..4 / T1..T12), value = % tiến độ (0–100) */
export interface DailyProgressChartItem {
  label: string;
  value: number;
}

interface TaskProgressChartProps {
  data: DailyProgressChartItem[];
  periodLabel: string;
}

const Y_PERCENT_TICKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export default function TaskProgressChart({ data, periodLabel }: TaskProgressChartProps) {
  return (
    <Card className="shadow-none border-border/60 rounded-2xl">
      <CardHeader className="pb-0 pt-5 px-5">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
            <LayoutGrid size={13} className="text-primary" />
          </span>
          Tiến trình nhiệm vụ hằng ngày
          <span className="text-[11px] text-muted-foreground font-normal ml-auto">
            {periodLabel}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <p className="text-[11px] text-muted-foreground mb-3 mt-1">
          Trục dưới: ngày / tuần / tháng theo kỳ — Cột: % hoàn thành (0–100)
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barGap={2} barCategoryGap="15%">
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: chartColors.mutedForeground }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              ticks={Y_PERCENT_TICKS}
              tick={{ fontSize: 11, fill: chartColors.mutedForeground }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: chartColors.mutedAlpha, radius: 6 }}
            />
            <Bar
              dataKey="value"
              name="Tiến độ %"
              fill={chartColors.primary}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
