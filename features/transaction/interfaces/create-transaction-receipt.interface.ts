import { TransactionReceipt } from "./transaction-receipt.interface";



export interface CreateTransactionReceipt extends Omit<TransactionReceipt, 'id' | 'createdAt' | 'updatedAt'> {
    
}