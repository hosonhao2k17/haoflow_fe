"use client";

import StatCard from "./StatCard";

interface OverviewStatCardsProps {
  totalTasks: number;
  totalDone: number;
  totalTodo: number;
  totalSkipped: number;
  streak: number;
  /** % hoàn thành (từ API), nếu có dùng thay cho tính từ done/total */
  doneProgress?: number;
  /** % bỏ qua (từ API), nếu có hiển thị ở card Bỏ qua */
  skipProgress?: number;
}

export default function OverviewStatCards({
  totalTasks,
  totalDone,
  totalTodo,
  totalSkipped,
  streak,
  doneProgress,
  skipProgress,
}: OverviewStatCardsProps) {
  const donePct =
    doneProgress != null ? doneProgress : totalTasks ? Math.round((totalDone / totalTasks) * 100) : 0;
  const skipPct = skipProgress != null ? skipProgress : totalTasks ? Math.round((totalSkipped / totalTasks) * 100) : 0;

  return (
    <div className="flex gap-3 flex-wrap">
      <StatCard label="Tổng task" value={totalTasks} icon="📋" sub="Trong kỳ đã chọn" />
      <StatCard
        label="Hoàn thành"
        value={totalDone}
        icon="✅"
        sub={`${donePct}% tỉ lệ`}
      />
      <StatCard label="Chưa làm" value={totalTodo} icon="🔵" sub="Đang chờ xử lý" />
      <StatCard label="Bỏ qua" value={totalSkipped} icon="⏭️" sub={skipPct ? `${skipPct}% tỉ lệ` : "Đã skip"} />
      <StatCard label="Streak 🔥" value={`${streak}d`} icon="🔥" sub="Chuỗi ngày 100%" />
    </div>
  );
}
