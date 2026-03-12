import { Budget } from "./budget.interface";


export interface CreateBudget extends Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>{

}