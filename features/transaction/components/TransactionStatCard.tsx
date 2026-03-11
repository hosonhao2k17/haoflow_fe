import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";


interface Props {
  label: string; 
  value: string; 
  sub: string;
  icon: React.ElementType; 
  trend?: string; 
  trendUp?: boolean;
}

const TransactionStatCard = ({label, value, sub, icon: Icon, trend, trendUp}: Props) => {


    return (
        <Card className="flex-1 min-w-[150px] shadow-none border border-border/70 hover:border-primary/30 hover:shadow-md transition-all duration-200 rounded-2xl">
            <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon size={15} className="text-primary" />
                    </div>
                </div>
                <p className="text-[22px] font-bold text-foreground tracking-tight font-mono leading-none">{value}</p>
                <div className="flex items-center gap-1.5 mt-2">
                    {trend && (
                    <span className={cn("text-xs font-bold flex items-center gap-0.5",
                        trendUp ? "text-emerald-600" : "text-rose-500")}>
                        {trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {trend}
                    </span>
                    )}
                    <span className="text-xs text-muted-foreground">{sub}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default TransactionStatCard 