import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
    setOpenCreate: (open: boolean) => void;
}

const DailyPlanPlus = ({ setOpenCreate }: Props) => {
  return (
    <div
      onClick={() => setOpenCreate(true)}
      className={cn(
        "group relative flex flex-col rounded-2xl border-2 border-dashed border-muted bg-card overflow-hidden cursor-pointer",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300"
      )}
    >
      {/* Top accent bar placeholder */}
      <div className="h-1 w-full bg-transparent" />

      <div className="flex flex-col flex-1 items-center justify-center p-5 gap-3 min-h-[220px]">
        <div className={cn(
          "w-12 h-12 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center",
          "group-hover:border-primary/60 group-hover:bg-primary/5 transition-all duration-300"
        )}>
          <Plus className="w-6 h-6 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300" />
        </div>
        <p className="text-sm text-muted-foreground/50 group-hover:text-primary/70 transition-colors duration-300 font-medium">
          Tạo kế hoạch mới
        </p>
      </div>
    </div>
  )
}

export default DailyPlanPlus