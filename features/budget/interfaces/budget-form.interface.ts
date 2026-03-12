import { Budget } from "./budget.interface";


export interface BudgetFormValue extends Omit<Budget, 'id' | "category" | "spentAmount" | 'createdAt' | 'updatedAt'> {
    categoryId: string
}