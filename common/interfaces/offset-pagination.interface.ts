import { BaseQuery } from "./base-query.interface";

export interface OffsetPaginationDto extends BaseQuery {
    page?: number;
    limit?: number;
}

export interface OffsetPaginationRdo {
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    totalRecords: number;
}