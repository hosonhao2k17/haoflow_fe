import { NotificationType } from "./notification.interface";
import { OffsetPaginationDto } from "@/common/interfaces/offset-pagination.interface";



export interface QueryNotification extends OffsetPaginationDto {
    keyword?: string;
    type?: NotificationType;
    isRead?: boolean;
}