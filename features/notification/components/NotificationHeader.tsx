"use client";

import { Bell } from "lucide-react";

export default function NotificationHeader() {
  return (
    <div className="sticky top-0 z-30 border-b border-border/50 bg-white/90 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
          <Bell size={16} className="text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground leading-tight">
            Thông báo
          </h1>
          <p className="text-xs text-muted-foreground">Danh sách thông báo của bạn</p>
        </div>
      </div>
    </div>
  );
}
