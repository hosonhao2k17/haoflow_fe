"use client";

import { Notification } from "../interfaces/notification.interface";
import NotificationItem from "./NotificationItem";
import { Bell } from "lucide-react";

interface NotificationListProps {
  items: Notification[];
  isLoading?: boolean;
  onMarkRead?: (id: string) => void;
  onMarkUnread?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function NotificationList({
  items,
  isLoading,
  onMarkRead,
  onMarkUnread,
  onDelete,
}: NotificationListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/60 bg-card overflow-hidden"
          >
            <div className="flex gap-4 p-4 sm:p-5">
              <div className="w-12 h-12 rounded-2xl bg-muted animate-pulse shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 bg-muted rounded-md animate-pulse w-3/4" />
                <div className="h-3 bg-muted/80 rounded-md animate-pulse w-1/4" />
                <div className="h-3 bg-muted/60 rounded-md animate-pulse w-full mt-2" />
                <div className="h-3 bg-muted/60 rounded-md animate-pulse w-4/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4 text-muted-foreground rounded-2xl border border-dashed border-border/60 bg-muted/20">
        <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center">
          <Bell className="w-8 h-8 opacity-60" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium">Chưa có thông báo nào</p>
          <p className="text-xs max-w-xs">
            Các thông báo từ hệ thống và nhắc nhở sẽ hiển thị tại đây.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id}>
          <NotificationItem
            notification={item}
            onMarkRead={onMarkRead}
            onMarkUnread={onMarkUnread}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
