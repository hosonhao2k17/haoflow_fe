import { TransactionCategoryType } from "@/common/constants/finance.constant";


export interface TransactionCategory {

    id: string;
    title: string;
    type: TransactionCategoryType;
    icon?: string;
    color?: string;
    childrens: TransactionCategory[]
}