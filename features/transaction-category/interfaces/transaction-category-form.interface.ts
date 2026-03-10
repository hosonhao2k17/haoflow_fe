import { TransactionCategory } from "./transaction-category.interface";



export interface TransactionCategoryFormValue extends Omit<TransactionCategory, 'id' | 'createdAt' | 'updatedAt' | 'childrens'> {
    parentId?: string
}