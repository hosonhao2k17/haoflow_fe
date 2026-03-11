import { TransactionSource, TransactionType } from "@/common/constants/app.constant";
import { CursorPaginationDto } from "@/common/interfaces/cursor-pagination.interface";



export interface QueryTransaction extends CursorPaginationDto {
    type?: TransactionType;
    minAmount?: number;
    maxAmount?: number;
    merchant?: string;
    dateFrom?: string;
    dateTo?: string;
    source?: TransactionSource;
    accountId?: string;
    categoryId?: string;

}