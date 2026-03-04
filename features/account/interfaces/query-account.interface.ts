import { AccountType } from "@/common/constants/finance.constant";
import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";


export interface QueryAccount extends OffsetPaginationDto {

    type?: AccountType
}