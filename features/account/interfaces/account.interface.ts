import { AccountStatus, AccountType } from "@/common/constants/finance.constant";
import { Base } from "@/common/interfaces/base.interface";


export interface Account extends Base{
    id: string;
    title: string;
    type: AccountType
    balance: number;
    color?: string;
    icon?: string;
    status: AccountStatus
}