"use client";

import { useRef, useCallback } from "react";
import { Notification, NotificationType } from "../interfaces/notification.interface";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Zap,
  Mail,
  X,
} from "lucide-react";
import { formatCreatedAt } from "@/lib/date";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const TYPE_CONFIG: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; bg: string; iconColor: string }
> = {
  [NotificationType.SYSTEM]: {
    icon: Info,
    bg: "bg-primary/10",
    iconColor: "text-primary",
  },
  [NotificationType.TASK_ASSIGN]: {
    icon: CheckCircle2,
    bg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  [NotificationType.BUDGET_THRESHOLD]: {
    icon: AlertTriangle,
    bg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  [NotificationType.TASK_ALARM]: {
    icon: Clock,
    bg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  [NotificationType.REMIND_TASK]: {
    icon: Zap,
    bg: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
  default: {
    icon: Info,
    bg: "bg-primary/10",
    iconColor: "text-primary",
  },
};

interface NotificationItemProps {
  notification: Notification;
  onMarkRead?: (id: string) => void;
  onMarkUnread?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onMarkRead,
  onMarkUnread,
  onDelete,
}: NotificationItemProps) {
  const config = TYPE_CONFIG[notification.type] ?? TYPE_CONFIG.default;
  const Icon = config.icon;
  const isUnread = !notification.isRead;
  const articleRef = useRef<HTMLElement>(null);

  const handleSeen = useCallback(() => {
    if (isUnread && onMarkRead) onMarkRead(notification.id);
  }, [notification.id, isUnread, onMarkRead]);

  useIntersectionObserver(articleRef, handleSeen, {
    once: true,
    threshold: 0.2,
  });

  return (
    <article
      ref={articleRef}
      className={cn(
        "relative rounded-2xl border bg-card overflow-hidden transition-all duration-200",
        "hover:shadow-md hover:border-border/80",
        isUnread
          ? "border-l-4 border-l-primary shadow-sm bg-primary/[0.03]"
          : "border-border/60"
      )}
    >
      <div className="flex gap-4 p-4 sm:p-5">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
            config.bg
          )}
        >
          <Icon className={cn("w-6 h-6", config.iconColor)} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={cn(
                "text-[15px] leading-tight",
                isUnread ? "font-semibold text-foreground" : "font-medium text-foreground/95"
              )}
            >
              {notification.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">
                {formatCreatedAt(notification.createdAt)}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete?.(notification.id);
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                aria-label="Xóa"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
            {notification.body}
          </p>
          {notification.isRead && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onMarkUnread?.(notification.id);
              }}
              className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              Đánh dấu chưa đọc
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
