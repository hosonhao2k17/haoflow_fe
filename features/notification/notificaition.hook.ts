import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryNotification } from "./interfaces/query-notification.interface";
import { getNotifications, updateRead } from "./notification.api";

export const useNotifications = (query: QueryNotification = {}) => {
  return useQuery({
    queryKey: ["notifications", query],
    queryFn: () => getNotifications(query),
  });
};

export const useUpdateRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isRead }: { id: string, isRead: boolean }) => updateRead(id, isRead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};