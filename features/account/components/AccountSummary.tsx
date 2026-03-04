import { Eye } from "lucide-react"


const AccountSummary = () => {
    

    return (
        <div className="grid grid-cols-3 gap-4 mb-8">

          {/* Net worth card */}
          <div className="col-span-2 bg-primary/10 border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/5 pointer-events-none" />
            <div className="absolute -bottom-16 right-20 w-36 h-36 rounded-full bg-primary/5 pointer-events-none" />

            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold text-primary/70 uppercase tracking-widest">Tổng tài sản ròng</span>
              <button 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background/60 border border-border text-muted-foreground hover:text-foreground transition-colors text-xs font-medium cursor-pointer">
                <Eye size={11} />
              </button>
            </div>

            <p className="text-4xl font-bold text-foreground tracking-tight mb-4 transition-all">
                10.000.000 VND
            </p>

            <div className="flex items-center gap-5">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Tài sản</p>
                <p className="text-sm font-bold text-primary" >3.000.000 VND</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Nợ</p>
                <p className="text-sm font-bold text-destructive" >0</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 bg-card border border-border rounded-2xl px-5 py-4 flex flex-col justify-between">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Tài khoản</p>
              <p className="text-3xl font-bold text-foreground">{10}</p>
            </div>
            <div className="flex-1 bg-card border border-border rounded-2xl px-5 py-4 flex flex-col justify-between">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Hoạt động</p>
              <p className="text-3xl font-bold text-primary">{20}</p>
            </div>
          </div>
        </div>
    )
}

export default AccountSummary