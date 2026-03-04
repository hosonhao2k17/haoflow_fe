import { AccountStatus, AccountType } from "@/common/constants/finance.constant";


export interface Account {
    id: string;
    title: string;
    type: AccountType
    balance: number;
    color?: string;
    icon?: string;
    status: AccountStatus
}