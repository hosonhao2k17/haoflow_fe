import { AccountType } from "@/common/constants/finance.constant";
import { Pencil, Trash2, TrendingUp } from "lucide-react";
import { Account } from "../interfaces/account.interface";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatVnd } from "@/lib/format";
import { AccountFormValue } from "../interfaces/account-form-value.interface";


interface Props {
    account: Account
    setAccount: (account: Account) => void;
    setOpenUpdate: (open: boolean) => void;
}


const AccountCard = ({ account, setAccount, setOpenUpdate }: Props) => {
  return (
    <div className="group relative bg-card border border-border/50 rounded-[20px] p-5 overflow-hidden transition-all duration-200 hover:-translate-y-0.5">

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]"
        style={{ backgroundColor: account.color ?? "var(--primary)" }}
      />

      {/* Actions */}
      <div className="absolute top-3.5 right-3.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => { setAccount(account); setOpenUpdate(true) }}
          className="w-7 h-7 rounded-lg bg-muted border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Pencil size={12} />
        </button>
        <button
          type="button"
          className="w-7 h-7 rounded-lg bg-muted border border-border/50 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Logo + name */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-[14px] overflow-hidden border border-border/50 bg-muted flex items-center justify-center shrink-0">
          <img
            src={account.logo ?? "https://img.freepik.com/free-vector/wallet-glyph-style-blue-colour_78370-7159.jpg"}
            alt={account.title}
            className="w-9 h-9 object-contain"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground leading-tight">{account.title}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{account.type}</p>
        </div>
      </div>

      {/* Balance */}
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-1">Số dư</p>
      <p
        className="text-[22px] font-semibold tracking-tight mb-4"
        style={{ color: account.color ?? "var(--primary)" }}
      >
        {formatVnd(account.balance)}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-end pt-3.5 border-t border-border/50">
        <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border/50">
          {account.status}
        </span>
      </div>

    </div>
  )
}

export default AccountCard 