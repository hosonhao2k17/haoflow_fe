"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Notification } from "../interfaces/notification.interface";
import { cn } from "@/lib/utils";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const TYPE_CONFIG = {
  info: {
    icon: Info,
    bg: "bg-primary/10",
    iconColor: "text-primary",
    border: "border-primary/20",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    border: "border-emerald-500/20",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    border: "border-amber-500/20",
  },
  error: {
    icon: XCircle,
    bg: "bg-rose-500/10",
    iconColor: "text-rose-600",
    border: "border-rose-500/20",
  },
} as const;

function formatTimeAgo(iso: string) {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: vi });
  } catch {
    return "";
  }
}

interface NotificationItemProps {
  notification: Notification;
  onMarkRead?: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onMarkRead,
}: NotificationItemProps) {
  const config = TYPE_CONFIG[notification.type] ?? TYPE_CONFIG.info;
  const Icon = config.icon;

  const content = (
    <Card
      className={cn(
        "shadow-none border rounded-xl transition-colors",
        notification.read
          ? "bg-card border-border/60"
          : "bg-primary/5 border-primary/20"
      )}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              config.bg
            )}
          >
            <Icon className={cn("w-5 h-5", config.iconColor)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={cn(
                  "text-sm font-semibold text-foreground",
                  !notification.read && "font-bold"
                )}
              >
                {notification.title}
              </h3>
              <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                {formatTimeAgo(notification.createdAt)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
              {notification.message}
            </p>
            {!notification.read && onMarkRead && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onMarkRead(notification.id);
                }}
                className="text-xs font-medium text-primary mt-2 hover:underline"
              >
                Đánh dấu đã đọc
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (notification.link) {
    return (
      <Link href={notification.link} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
