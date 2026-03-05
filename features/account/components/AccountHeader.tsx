import { Bitcoin, Plus, Sparkles } from "lucide-react"


interface Props {
  setOpenCreate: (open: boolean) => void;
}


const AccountHeader = ({setOpenCreate}: Props) => {

    return (
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={12} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Quản lý tài chính</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Tài khoản</h1>
          </div>
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-0 bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
            style={{ boxShadow: "0 4px 20px hsl(var(--primary)/0.3)" }}>
            <Plus size={15} /> Thêm tài khoản
          </button>
        </div>
    )
}

export default AccountHeader 