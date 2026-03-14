"use client";

import { Notification } from "../interfaces/notification.interface";
import NotificationItem from "./NotificationItem";
import { Bell } from "lucide-react";

interface NotificationListProps {
  items: Notification[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
}

export default function NotificationList({
  items,
  onMarkRead,
  onMarkAllRead,
}: NotificationListProps) {
  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      {unreadCount > 0 && onMarkAllRead && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{unreadCount}</span> chưa đọc
          </span>
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-sm font-medium text-primary hover:underline"
          >
            Đánh dấu tất cả đã đọc
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-muted-foreground rounded-2xl border border-dashed border-border/60 bg-muted/20">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
            <Bell className="w-7 h-7 opacity-50" />
          </div>
          <p className="text-sm font-medium">Chưa có thông báo nào</p>
          <p className="text-xs text-center max-w-xs">
            Các thông báo từ hệ thống và nhắc nhở sẽ hiển thị tại đây.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <NotificationItem
                notification={item}
                onMarkRead={onMarkRead}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
