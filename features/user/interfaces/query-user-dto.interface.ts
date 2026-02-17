import { UserStatus } from "@/common/constants/app.constant";
import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";

export interface QueryUserDto extends OffsetPaginationDto {
    keyword?: string;
    gender?: string;
    status?: UserStatus;
    roleId?: string;
    verified?: boolean;
    createdBy?: string;
    updatedBy?: string;
}