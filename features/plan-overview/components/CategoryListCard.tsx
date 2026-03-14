"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CATEGORIES } from "../constants/overview-data";

const maxTaskCount = Math.max(...CATEGORIES.map((c) => c.taskCount));

export default function CategoryListCard() {
  const sorted = [...CATEGORIES].sort((a, b) => b.taskCount - a.taskCount);

  return (
    <Card className="shadow-none border-border/60 rounded-2xl">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <span>🗂️</span> Danh mục
          <Badge variant="outline" className="ml-auto text-[10px] font-normal rounded-lg">
            task count
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-3">
        {sorted.map((cat) => {
          const pct = maxTaskCount ? Math.round((cat.taskCount / maxTaskCount) * 100) : 0;
          return (
            <div key={cat.id} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm shrink-0">
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[12px] font-semibold text-foreground truncate">
                    {cat.title}
                  </span>
                  <span className="text-[11px] font-bold text-primary ml-2 shrink-0">
                    {cat.taskCount}
                  </span>
                </div>
                <Progress value={pct} className="h-1.5 rounded-full" />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
