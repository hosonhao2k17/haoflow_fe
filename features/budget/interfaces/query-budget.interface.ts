import { BudgetPeriod } from "@/common/constants/finance.constant";
import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";

/** Query params gửi lên BE (theo chuẩn API). startDate dạng string: YYYY-MM (monthly), YYYY-MM-DD (weekly), YYYY (yearly) */
export interface QueryBudget extends OffsetPaginationDto {
    categoryId?: string;
    period?: BudgetPeriod;
    /** YYYY-MM | YYYY-MM-DD | YYYY tùy period */
    startDate?: string;
    minAmount?: number;
    maxAmount?: number;
    /** Lọc theo trạng thái: ok | alert | over (nếu BE hỗ trợ) */
    status?: "ok" | "alert" | "over";
}