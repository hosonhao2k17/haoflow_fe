import { TransactionCategoryType } from "@/common/constants/finance.constant";
import { TransactionCategory } from "../interfaces/transaction-category.interface";
import { Pencil, Trash2, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  cat: TransactionCategory;
  setOpenUpdate: (open: boolean) => void;
  setCategory: (category: TransactionCategory) => void;
  setOpenCreate: (open: boolean) => void;
  setParentId: (id: string) => void;
}

const CHILD_LIMIT = 3;

const TransactionCategoryCard = ({
  cat,
  setOpenUpdate,
  setCategory,
  setOpenCreate,
  setParentId,
}: Props) => {
  const hasMore = cat.childrens.length > CHILD_LIMIT;
  const visibleChildren = cat.childrens.slice(0, CHILD_LIMIT);
  const hiddenCount = cat.childrens.length - CHILD_LIMIT;

  const isIncome = cat.type === TransactionCategoryType.INCOME;

  return (
    <div className="group relative self-start rounded-2xl overflow-hidden bg-card text-card-foreground border border-border hover:-translate-y-1 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 cursor-pointer">

      {/* Color accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: cat.color }} />

      {/* ── Header ── */}
      <div className="flex items-center gap-4 px-5 pt-6 pb-4 border-b border-border">
        {/* Icon */}
        <div className="relative w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center rounded-2xl text-2xl">
          <span className="absolute inset-0 rounded-2xl opacity-15" style={{ background: cat.color }} />
          <span className="relative z-10">{cat.icon}</span>
        </div>

        {/* Title + badge */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-foreground truncate mb-1.5">{cat.title}</p>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-md tracking-wider uppercase border",
              isIncome
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : "bg-red-500/10 text-red-500 border-red-500/20"
            )}
          >
            {isIncome ? "↑" : "↓"} {cat.type}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => { setOpenUpdate(true); setCategory(cat); }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted border border-border hover:bg-accent hover:border-primary/30 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted border border-border hover:bg-destructive/10 hover:border-destructive/30 transition-colors">
            <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      </div>

      {/* ── Children ── */}
      <div className="px-4 pt-3.5 pb-2 flex flex-col gap-1.5">
        <div className="relative">
          {visibleChildren.map((child, index) => {
            const isLastVisible = index === CHILD_LIMIT - 1 && hasMore;
            return (
              <div
                key={child.id}
                className={cn(
                  "group/child relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all mb-1.5",
                  "bg-muted/60 border-border hover:bg-accent hover:border-border/80",
                  isLastVisible && "opacity-40"
                )}
              >
                {/* Color strip */}
                <span
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                  style={{ background: child.color }}
                />

                {/* Icon */}
                <span
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-base ml-1"
                  style={{ background: (child.color ?? "#888") + "18" }}
                >
                  {child.icon}
                </span>

                {/* Title */}
                <span className="flex-1 text-[13px] font-medium text-muted-foreground truncate">
                  {child.title}
                </span>

                {/* Color dot */}
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: child.color }}
                />

                {/* Edit on hover */}
                <button
                  onClick={() => { setOpenUpdate(true); setCategory(child); }}
                  className="opacity-0 group-hover/child:opacity-100 w-6 h-6 flex items-center justify-center rounded-md bg-background border border-border hover:border-primary/40 transition-all shrink-0"
                >
                  <Pencil className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            );
          })}

          {/* Fade + show more overlay */}
          {hasMore && (
            <div className="relative -mt-10 pt-8 pb-1">
              {/* Gradient fade */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-card pointer-events-none" />
            </div>
          )}
        </div>

        {/* Add child */}
        <button
          className="w-full rounded-xl border border-dashed border-border py-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors mt-0.5"
          onClick={() => { setOpenCreate(true); setParentId(cat.id); }}
        >
          <Plus className="w-3.5 h-3.5" />
          Thêm danh mục con
        </button>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center gap-2 px-5 pb-4 pt-1">
        <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
        <span className="text-xs text-muted-foreground">
          {cat.childrens.length} danh mục con
        </span>
      </div>
    </div>
  );
};

export default TransactionCategoryCard;