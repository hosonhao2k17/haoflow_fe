import { BudgetPeriod } from "@/common/constants/finance.constant";
import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";



export interface QueryBudget extends OffsetPaginationDto {
    categoryId?: string;
    period?: BudgetPeriod;
    month?: Date;
    minAmount?: number;
    maxAmount?: number;
}