import { TransactionReceipt } from "./transaction-receipt.interface";
import { Transaction } from "./transaction.interface";



export interface TransactionFormValue extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'source' | 'category' | 'account'> {
    categoryId: string;
    accountId: string;
    receipt: TransactionReceipt
}