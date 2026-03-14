import { Skeleton } from "@/components/ui/skeleton";

const TransactionCategoryCardSkeleton = () => {
    return (
        <div className="relative self-start rounded-2xl overflow-hidden bg-card border border-border">

            <Skeleton className="absolute top-0 left-0 right-0 h-[3px]" />
            <div className="flex items-center gap-4 px-5 pt-6 pb-4 border-b border-border">

                <div className="flex-1 min-w-0 space-y-2">
                    <Skeleton className="h-4 w-2/3 rounded-md" />
                    <Skeleton className="h-5 w-16 rounded-md" />
                </div>
                <div className="flex gap-1.5">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <Skeleton className="w-8 h-8 rounded-lg" />
                </div>
            </div>
            <div className="px-4 pt-3.5 pb-2 flex flex-col gap-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-border bg-muted/60 mb-1.5">
                    <Skeleton className="w-8 h-8 rounded-lg ml-1 shrink-0" />
                    <Skeleton className="flex-1 h-3.5 rounded-md" />
                    <Skeleton className="w-2 h-2 rounded-full shrink-0" />
                </div>
                ))}

                <Skeleton className="w-full h-9 rounded-xl" />
            </div>

            <div className="flex items-center gap-2 px-5 pb-4 pt-1">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="h-3 w-24 rounded-md" />
            </div>
        </div>
    );
};

export default TransactionCategoryCardSkeleton;