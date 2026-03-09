import { TransactionCategoryType } from "@/common/constants/finance.constant";
import { Base } from "@/common/interfaces/base.interface";


export interface TransactionCategory extends Base {

    id: string;
    title: string;
    type: TransactionCategoryType;
    icon?: string;
    color?: string;
    childrens: TransactionCategory[]
}