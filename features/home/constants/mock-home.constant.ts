/** Mock data trang chủ – chỉ để xem giao diện, không gọi API */

export const MOCK_PLAN_STATS = {
  totalTasks: 47,
  done: 28,
  todo: 15,
  skipped: 4,
  streak: 5,
  doneProgress: 60,
};

/** Dữ liệu biểu đồ tròn: Hoàn thành / Chưa làm / Bỏ qua (color dùng với Cell fill) */
export const MOCK_PLAN_PIE = [
  { name: "Hoàn thành", value: 28 },
  { name: "Chưa làm", value: 15 },
  { name: "Bỏ qua", value: 4 },
];

/** Tiến độ theo ngày (T2 → CN) cho mini chart */
export const MOCK_PLAN_WEEK_BARS = [65, 80, 45, 90, 70, 55, 40];

export const MOCK_FINANCE_STATS = {
  totalBalance: 125_000_000,
  incomeMonth: 28_500_000,
  expenseMonth: 18_200_000,
};

/** Thu / Chi theo tuần (7 ngày) cho mini chart */
export const MOCK_FINANCE_WEEK = {
  income: [2, 5, 0, 8, 3, 0, 10],
  expense: [3, 4, 6, 2, 5, 7, 1],
};

export const MOCK_PERSONAL_STATS = {
  unreadNotifications: 3,
  todayPlansCount: 2,
  todayTasksLeft: 5,
  streakDays: 5,
};
