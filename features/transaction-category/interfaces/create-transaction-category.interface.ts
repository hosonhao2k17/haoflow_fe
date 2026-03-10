import { TransactionCategory } from "./transaction-category.interface";



export interface CreateTransactionCategory extends Omit<TransactionCategory, 'id' | 'createdAt' | 'updatedAt' | 'childrens'>{
    parentId?: string;
}