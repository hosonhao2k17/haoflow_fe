import { Account } from "@/features/account/interfaces/account.interface"
import { cn } from "@/lib/utils"


interface Props {
  account: Account
  selected: boolean
  onClick: () => void
}

const TransactionAccountOption = ({ account, selected, onClick }: Props) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all text-left",
            selected ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted text-foreground"
        )}
    >
        <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: account.color ?? "#03002e" }}
        >
            {account.title?.charAt(0).toUpperCase()}
        </span>
        <span className="truncate">{account.title}</span>
        {selected 
            && 
            <span className="ml-auto text-primary text-xs">
            ✓
            </span>
        }
    </button>
)

export default TransactionAccountOption