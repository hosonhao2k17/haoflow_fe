import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface"
import { cn } from "@/lib/utils"

interface Props {
  category: TransactionCategory
  selected: boolean
  onClick: () => void
}

const TransactionCategoryOption = ({ category, selected, onClick }: Props) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all text-left",
      selected ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted text-foreground"
    )}
  >
    <span
      className="w-7 h-7 rounded-lg flex items-center justify-center text-base shrink-0"
      style={{ backgroundColor: category.color ? `${category.color}20` : "#f3f4f6" }}
    >
      {category.icon}
    </span>
    <span className="truncate">{category.title}</span>
    {selected && <span className="ml-auto text-primary text-xs">✓</span>}
  </button>
)

export default TransactionCategoryOption