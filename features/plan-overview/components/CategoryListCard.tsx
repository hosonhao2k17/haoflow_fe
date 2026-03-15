"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTaskCategories } from "@/features/task-category/task-category.hook";
import { TaskCategory } from "@/features/task-category/interfaces/task-catgegory.interface";

export default function CategoryListCard() {
  const { data, isPending } = useTaskCategories({ limit: 100 });
  const items = data?.items ?? [];
  const sorted = useMemo(
    () => [...items].sort((a, b) => (b.totalTask ?? 0) - (a.totalTask ?? 0)),
    [items]
  );
  const maxTaskCount = useMemo(
    () => (sorted.length ? Math.max(...sorted.map((c) => c.totalTask ?? 0)) : 0),
    [sorted]
  );

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
        {isPending ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-muted" />
                <div className="flex-1 min-w-0">
                  <div className="h-3 bg-muted rounded w-2/3 mb-2" />
                  <div className="h-1.5 bg-muted rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">
            Chưa có danh mục
          </p>
        ) : (
          sorted.map((cat: TaskCategory) => {
            const pct = maxTaskCount ? Math.round(((cat.totalTask ?? 0) / maxTaskCount) * 100) : 0;
            return (
              <div key={cat.id} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm shrink-0 overflow-hidden bg-primary/10 border-primary/20"
                  style={cat.color ? { borderColor: cat.color, backgroundColor: `${cat.color}20` } : undefined}
                >
                  {cat.icon ? (
                    /^https?:\/\//i.test(cat.icon) || cat.icon.startsWith("/") || cat.icon.startsWith("data:") ? (
                      <img src={cat.icon} alt="" className="w-5 h-5 object-contain" />
                    ) : (
                      <span className="text-base leading-none">{cat.icon}</span>
                    )
                  ) : (
                    <span>📁</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[12px] font-semibold text-foreground truncate">
                      {cat.title}
                    </span>
                    <span className="text-[11px] font-bold text-primary ml-2 shrink-0">
                      {cat.totalTask ?? 0}
                    </span>
                  </div>
                  <Progress value={pct} className="h-1.5 rounded-full" />
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
