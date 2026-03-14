"use client";

import { useState, useCallback } from "react";
import NotificationHeader from "@/features/notification/components/NotificationHeader";
import NotificationList from "@/features/notification/components/NotificationList";
import { MOCK_NOTIFICATIONS } from "@/features/notification/constants/mock-notifications";
import { Notification } from "@/features/notification/interfaces/notification.interface";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(() => [...MOCK_NOTIFICATIONS]);

  const handleMarkRead = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <NotificationHeader />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <NotificationList
          items={items}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
        />
      </div>
    </div>
  );
}
