import { TransactionSource } from "@/common/constants/app.constant";
import { Transaction } from "./transaction.interface";



export interface UpdateTransaction extends Partial<Transaction> {
    source?: TransactionSource
}