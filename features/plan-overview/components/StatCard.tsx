"use client";

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  sub?: string;
}

export default function StatCard({ label, value, icon, sub }: StatCardProps) {
  return (
    <Card className="flex-1 shadow-none border-border/60 rounded-2xl">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            {label}
          </span>
          <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-sm">
            {icon}
          </span>
        </div>
        <div className="text-3xl font-black text-foreground tracking-tight leading-none">
          {value}
        </div>
        {sub && <p className="text-[11px] text-muted-foreground mt-1.5">{sub}</p>}
      </CardContent>
    </Card>
  );
}
