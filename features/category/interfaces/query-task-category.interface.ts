import { BaseQuery } from "@/common/interfaces/base-query.interface";
import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";


export interface QueryTaskCategory extends OffsetPaginationDto {
    keyword?: string
}