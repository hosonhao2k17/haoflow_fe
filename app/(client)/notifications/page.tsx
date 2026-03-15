"use client";

import NotificationHeader from "@/features/notification/components/NotificationHeader";
import NotificationList from "@/features/notification/components/NotificationList";
import { useNotifications } from "@/features/notification/notificaition.hook";

export default function NotificationsPage() {
  const { data, isLoading } = useNotifications({ page: 1, limit: 50 });
  const items = data?.items ?? [];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <NotificationHeader />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <NotificationList items={items} isLoading={isLoading} />
      </div>
    </div>
  );
}
