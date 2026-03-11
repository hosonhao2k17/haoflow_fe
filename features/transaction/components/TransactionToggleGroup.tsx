import { cn } from "@/lib/utils"

interface Props<T extends string> {
  value: T | undefined
  options: T[]
  labels: Record<T, string>
  onChange: (val: T | undefined) => void
}


const TransactionToggleGroup = <T extends string>({
  value,
  options,
  labels,
  onChange,
}: Props<T>) => {


    return (
      <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/40 shrink-0">
        <button
          onClick={() => onChange(undefined)}
          className={cn(
            "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
            value === undefined
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-white/80"
          )}
        >
          Tất cả
        </button>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
              value === opt
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-white/80"
            )}
          >
            {labels[opt]}
          </button>
        ))}
      </div>
    )
}

export default TransactionToggleGroup 