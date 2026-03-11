import { AccountType } from "@/common/constants/finance.constant";
import { Account } from "@/features/account/interfaces/account.interface";
import { Building2, CreditCard, Wallet } from "lucide-react";



const TransactionAccountChip = ({ account }: { account: Account }) => (
  <div className="flex items-center gap-1.5">
    {account.type === AccountType.BANK
      ? <Building2  size={11} className="text-primary shrink-0" />
      : account.type === AccountType.WALLET
      ? <Wallet     size={11} className="text-primary shrink-0" />
      : <CreditCard size={11} className="text-primary shrink-0" />}
    <span className="text-xs font-semibold text-foreground/80">{account.title}</span>
  </div>
);

export default TransactionAccountChip