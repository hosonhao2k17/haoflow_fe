"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartColors } from "@/common/constants/theme.constant";
import ChartTooltip from "./ChartTooltip";
import { CATEGORY_STATUS_DATA } from "../constants/overview-data";

const LEGEND: [string, string][] = [
  [chartColors.primary, "Hoàn thành"],
  [chartColors.primaryLighter, "Bỏ qua"],
];

export default function CategoryStatusChart() {
  return (
    <Card className="shadow-none border-border/60 rounded-2xl">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <span>📊</span> Hoàn thành & Bỏ qua theo danh mục
        </CardTitle>
        <p className="text-[11px] text-muted-foreground">
          Danh mục nào được hoàn thành nhiều nhất và bị skip
        </p>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="flex gap-4 mb-3">
          {LEGEND.map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="w-2 h-2 rounded-sm" style={{ background: c }} />
              {l}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={CATEGORY_STATUS_DATA}
            layout="vertical"
            barGap={3}
            barCategoryGap="25%"
          >
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: chartColors.mutedForeground }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={75}
              tick={{ fontSize: 11, fill: chartColors.mutedForeground }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: chartColors.mutedAlpha }}
            />
            <Bar
              dataKey="done"
              name="Hoàn thành"
              fill={chartColors.primary}
              radius={[0, 5, 5, 0]}
            />
            <Bar
              dataKey="skipped"
              name="Bỏ qua"
              fill={chartColors.primaryLighter}
              radius={[0, 5, 5, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
