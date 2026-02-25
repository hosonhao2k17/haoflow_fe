import { CursorPaginationDto } from "@/common/interfaces/cursor-pagination.interface";
import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";


export interface QueryDailyPlan extends CursorPaginationDto {
    keyword?: string;
    startDate?: string;
    endDate?: string;
}