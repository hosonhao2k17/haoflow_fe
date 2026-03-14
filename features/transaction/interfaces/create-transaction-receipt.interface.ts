import { Transaction } from "./transaction.interface";
import { TransactionReceipt } from "./transaction-receipt.interface";

export interface CreateTransactionReceipt extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'source' | 'category' | 'account'> {
    categoryId: string;
    accountId: string;
    receipt: TransactionReceipt
}