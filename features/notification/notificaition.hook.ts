import { useQuery } from "@tanstack/react-query";
import { QueryNotification } from "./interfaces/query-notification.interface";
import { getNotifications } from "./notification.api";

export const useNotifications = (query: QueryNotification = {}) => {
  return useQuery({
    queryKey: ["notifications", query],
    queryFn: () => getNotifications(query),
  });
};