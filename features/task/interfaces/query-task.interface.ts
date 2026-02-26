import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";



export interface QueryTask extends OffsetPaginationDto {
    dailyPlanId?: string;
}