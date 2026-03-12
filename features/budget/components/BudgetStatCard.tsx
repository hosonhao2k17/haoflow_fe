import { Card, CardContent } from "@/components/ui/card";



interface Props {
  label: string; value: string; sub: string;
  icon: React.ElementType; accent?: string;
}

const BudgetStatCard = ({label, value, sub, icon: Icon, accent,
}: Props) => (
  <Card className="flex-1 min-w-[150px] shadow-none border border-border/70 hover:border-primary/30 hover:shadow-md transition-all duration-200 rounded-2xl">
    <CardContent className="p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon size={15} className={accent ?? "text-primary"} />
        </div>
      </div>
      <p className="text-[22px] font-bold text-foreground tracking-tight font-mono leading-none">{value}</p>
      <p className="text-xs text-muted-foreground mt-2">{sub}</p>
    </CardContent>
  </Card>
);

export default BudgetStatCard 