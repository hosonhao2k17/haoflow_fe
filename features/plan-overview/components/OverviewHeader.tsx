"use client";

import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { themeShadow } from "@/common/constants/theme.constant";

export type FilterMode = "week" | "month" | "year";

const FILTER_OPTIONS: { key: FilterMode; label: string }[] = [
  { key: "week", label: "Tuần" },
  { key: "month", label: "Tháng" },
  { key: "year", label: "Năm" },
];

interface OverviewHeaderProps {
  filterMode: FilterMode;
  onFilterChange: (mode: FilterMode) => void;
}

export default function OverviewHeader({ filterMode, onFilterChange }: OverviewHeaderProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
          style={{ boxShadow: themeShadow.primaryGlow }}
        >
          <TrendingUp size={18} className="text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-black text-foreground tracking-tight leading-tight">
            Task Overview
          </h1>
          <p className="text-[11px] text-muted-foreground">Phân tích hiệu suất cá nhân</p>
        </div>
      </div>

      <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/50">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onFilterChange(opt.key)}
            className={cn(
              "px-4 h-8 rounded-lg text-xs font-semibold transition-all",
              filterMode === opt.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
