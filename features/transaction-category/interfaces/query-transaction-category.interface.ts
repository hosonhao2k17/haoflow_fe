import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";



export interface QueryTransactionCategory extends OffsetPaginationDto {
    keyword?: string;
}