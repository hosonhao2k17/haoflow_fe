"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function TaskCategoryCardSkeleton() {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl overflow-hidden",
        "bg-card border border-border"
      )}
    >
      <Skeleton className="absolute top-0 left-0 right-0 h-[2px] rounded-none" />

      <div className="flex flex-col flex-1 p-5 pt-6 gap-4">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
          <Skeleton className="w-7 h-7 rounded-lg flex-shrink-0" />
        </div>

        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-2/3 rounded-md" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border gap-2">
          <Skeleton className="h-6 rounded-full w-20" />
          <Skeleton className="w-7 h-7 rounded-lg flex-shrink-0" />
        </div>
      </div>
    </article>
  );
}

interface TaskCategorySkeletonProps {
  count?: number;
}

export default function TaskCategorySkeleton({ count = 8 }: TaskCategorySkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <TaskCategoryCardSkeleton key={i} />
      ))}
    </div>
  );
}
