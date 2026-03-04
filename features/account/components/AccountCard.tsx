import { AccountType } from "@/common/constants/finance.constant";
import { Pencil, Trash2 } from "lucide-react";



const AccountCard = () => {


    return (
        <div
      className="group relative bg-card border border-border rounded-2xl p-5 overflow-hidden transition-all duration-200 hover:-translate-y-1">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"/>

      {/* Soft glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none" />

      {/* Actions — visible on hover */}
      <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          className="w-7 h-7 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <Pencil size={11} />
        </button>
        <button 
          className="w-7 h-7 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
          <Trash2 size={11} />
        </button>
      </div>

      {/* Icon + name */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-[13px] flex items-center justify-center shrink-0">
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm leading-tight">Tai khoan momo</p>
          <p className="text-xs text-muted-foreground mt-0.5">{AccountType.WALLET}</p>
        </div>
      </div>

      {/* Balance */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Số dư</p>
        <p className="text-2xl font-bold tracking-tight transition-all duration-200">
            10.000.000
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px] font-semibold">
                 tháng này
          </span>
       

        <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-md border border-border">INACTIVE</span>
        </div>
      </div>
    </div>
    )
}

export default AccountCard 