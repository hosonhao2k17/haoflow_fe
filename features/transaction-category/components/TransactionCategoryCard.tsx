import { TransactionCategoryType } from "@/common/constants/finance.constant";
import { TransactionCategory } from "../interfaces/transaction-category.interface";



interface Props {
  cat: TransactionCategory;
  setOpenUpdate: (open: boolean) => void;
  setCategory: (category: TransactionCategory) => void;
  setOpenCreate: (open: boolean) => void;
  setParentId: (id: string) => void;
}

const TransactionCategoryCard = ({ cat, setOpenUpdate, setCategory, setOpenCreate, setParentId }: Props) => {



  return (
    <div className="group rounded-2xl overflow-hidden bg-card text-card-foreground border border-border hover:-translate-y-1 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 cursor-pointer">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-5 border-b border-border">
        <div className="relative w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center rounded-2xl text-2xl">
          <span className="absolute inset-0 rounded-2xl opacity-15" style={{ background: cat.color }} />
          {cat.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-foreground truncate mb-1">{cat.title}</p>
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-md tracking-wider uppercase border ${
            cat.type === TransactionCategoryType.INCOME
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : "bg-red-500/10 text-red-500 border-red-500/20"
            }`}>
          {cat.type === TransactionCategoryType.INCOME ? "↑" : "↓"} {cat.type}
    </span>
        </div>
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          
            <button 
              onClick={() => {
                setOpenUpdate(true)
                setCategory(cat)
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted border border-border hover:bg-accent text-sm transition-colors"
            >
              ✏️
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted border border-border hover:bg-accent text-sm transition-colors">
             🗑
            </button>
       
        </div>
      </div>

      {/* Children */}
      <div className="px-5 pt-3.5 pb-2 flex flex-col gap-2">
        {cat.childrens.map((child) => (
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-muted border border-border hover:bg-accent transition-all">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-background text-lg">
                {child.icon}
            </span>
            <span className="flex-1 text-[13px] font-medium text-muted-foreground">{child.title}</span>
            <span className="w-1.5 h-1.5 rounded-full opacity-70" style={{ background: child.color }} />
        </div>
        ))}
        <button 
          className="mt-1 w-full rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
          onClick={() => {
            setOpenCreate(true)
            setParentId(cat.id)
          }}
        >
          + Thêm danh mục con
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-5 pb-4 pt-1">
        <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
        <span className="text-xs text-muted-foreground">{cat.childrens.length} Danh mục con</span>
      </div>
    </div>
  );
}


export default TransactionCategoryCard 