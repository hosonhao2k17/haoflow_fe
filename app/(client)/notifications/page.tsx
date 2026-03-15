"use client";

import { useCallback } from "react";
import NotificationHeader from "@/features/notification/components/NotificationHeader";
import NotificationList from "@/features/notification/components/NotificationList";
import {
  useNotifications,
  useUpdateRead,
  useRemoveNotification,
} from "@/features/notification/notificaition.hook";
import { toast } from "sonner";

export default function NotificationsPage() {
  const { data, isLoading } = useNotifications({ page: 1, limit: 50 });
  const updateReadMutation = useUpdateRead();
  const removeMutation = useRemoveNotification();
  const items = data?.items ?? [];

  const handleMarkRead = useCallback(
    (id: string) => {
      updateReadMutation.mutate({ id, isRead: true });
    },
    [updateReadMutation]
  );

  const handleDelete = useCallback(
    (id: string) => {
      removeMutation.mutate(id, {
        onSuccess: () => toast.success("Đã xóa thông báo"),
        onError: () => toast.error("Không thể xóa thông báo"),
      });
    },
    [removeMutation]
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <NotificationHeader />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <NotificationList
          items={items}
          isLoading={isLoading}
          onMarkRead={handleMarkRead}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
