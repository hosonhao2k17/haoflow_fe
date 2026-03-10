import { TransactionType } from "@/common/constants/app.constant";
import { Base } from "@/common/interfaces/base.interface";
import { Account } from "@/features/account/interfaces/account.interface";
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface";


export interface Transaction extends Base {
    id: string;
    category: TransactionCategory;
    account: Account;
    type: TransactionType;
    amount: number;
    description?: string;
    merchant: string;
    transactionDate: string;
    isRecurring: boolean;
}