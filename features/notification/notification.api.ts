import { api } from "@/config/axios";
import { QueryNotification } from "./interfaces/query-notification.interface";
import { Notification } from "./interfaces/notification.interface";

export interface NotificationListResponse {
  items: Notification[];
  page?: number;
  limit?: number;
  totalRecords?: number;
  totalPages?: number;
}

export const getNotifications = async (
  query: QueryNotification = {}
): Promise<NotificationListResponse> => {
  const res = await api.get<NotificationListResponse>("notifications", {
    params: query,
  });
  return res.data;
};

