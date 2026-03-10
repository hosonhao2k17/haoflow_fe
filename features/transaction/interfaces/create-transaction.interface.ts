import { Transaction } from "./transaction.interface";


export interface Createtransaction extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'source'> {

    
}