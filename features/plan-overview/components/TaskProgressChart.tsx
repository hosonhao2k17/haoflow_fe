"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartColors } from "@/common/constants/theme.constant";
import ChartTooltip from "./ChartTooltip";

export interface ChartDataItem {
  label: string;
  done: number;
  todo: number;
  skipped: number;
}

interface TaskProgressChartProps {
  data: ChartDataItem[];
  periodLabel: string;
}

const LEGEND: [string, string][] = [
  [chartColors.primary, "Hoàn thành"],
  [chartColors.primaryLightest, "Bỏ qua"],
];

export default function TaskProgressChart({ data, periodLabel }: TaskProgressChartProps) {
  return (
    <Card className="shadow-none border-border/60 rounded-2xl">
      <CardHeader className="pb-0 pt-5 px-5">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
            <LayoutGrid size={13} className="text-primary" />
          </span>
          Task Progress
          <span className="text-[11px] text-muted-foreground font-normal ml-auto">
            {periodLabel}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="flex gap-4 mb-4 mt-3">
          {LEGEND.map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: c }} />
              {l}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barGap={2} barCategoryGap="30%">
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: chartColors.mutedForeground }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: chartColors.mutedForeground }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: chartColors.mutedAlpha, radius: 6 }}
            />
            <Bar
              dataKey="done"
              name="Hoàn thành"
              fill={chartColors.primary}
              radius={[5, 5, 0, 0]}
            />
            <Bar
              dataKey="skipped"
              name="Bỏ qua"
              fill={chartColors.primaryLightest}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
