import { Account } from "./account.interface";



export interface AccountFormValue extends Omit<Account, 'id'|'createdAt' | 'updatedAt'> {

}