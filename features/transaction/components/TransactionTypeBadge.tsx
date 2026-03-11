import { TransactionType } from "@/common/constants/app.constant";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TransactionTypeBadge = ({ type }: { type: TransactionType }) => {
  const cfg = {
    [TransactionType.INCOME]:   { label: "Thu nhập",     cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    [TransactionType.EXPENSE]:  { label: "Chi tiêu",     cls: "bg-rose-50 text-rose-700 border-rose-200"          },
    [TransactionType.TRANSFER]: { label: "Chuyển khoản", cls: "bg-sky-50 text-sky-700 border-sky-200"             },
  }[type];
  return (
    <Badge variant="outline" className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border", cfg.cls)}>
      {cfg.label}
    </Badge>
  );
};

export default TransactionTypeBadge 