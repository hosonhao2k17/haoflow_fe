import { Account } from "./account.interface";


export interface CreateAccount extends Omit<Account, 'id' | 'createdAt' | 'updatedAt'> {

}