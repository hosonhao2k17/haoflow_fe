import { BudgetPeriod } from "@/common/constants/finance.constant";
import { Base } from "@/common/interfaces/base.interface";
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface";



export interface Budget extends Base {
    id: string;
    amount: number;
    category: TransactionCategory;
    period: BudgetPeriod;
    startDate: string;
    alertThreshold: number;
    spentAmount: number;
}