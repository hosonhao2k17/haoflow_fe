export const CATEGORIES = [
  { id: 1, title: "Công việc", color: "bg-primary", icon: "💼", taskCount: 38 },
  { id: 2, title: "Học tập", color: "bg-primary", icon: "📚", taskCount: 27 },
  { id: 3, title: "Sức khỏe", color: "bg-primary", icon: "💪", taskCount: 21 },
  { id: 4, title: "Cá nhân", color: "bg-primary", icon: "🌿", taskCount: 15 },
  { id: 5, title: "Tài chính", color: "bg-primary", icon: "💰", taskCount: 11 },
  { id: 6, title: "Gia đình", color: "bg-primary", icon: "🏠", taskCount: 8 },
];

export const WEEK_DATA = [
  { label: "T2", done: 8, todo: 2, skipped: 1 },
  { label: "T3", done: 12, todo: 1, skipped: 0 },
  { label: "T4", done: 6, todo: 4, skipped: 2 },
  { label: "T5", done: 10, todo: 0, skipped: 1 },
  { label: "T6", done: 14, todo: 3, skipped: 0 },
  { label: "T7", done: 5, todo: 5, skipped: 3 },
  { label: "CN", done: 3, todo: 2, skipped: 1 },
];

export const MONTH_DATA = [
  { label: "Tuần 1", done: 32, todo: 8, skipped: 4 },
  { label: "Tuần 2", done: 41, todo: 5, skipped: 2 },
  { label: "Tuần 3", done: 28, todo: 12, skipped: 6 },
  { label: "Tuần 4", done: 37, todo: 6, skipped: 3 },
];

export const YEAR_DATA = [
  { label: "T1", done: 120, todo: 20, skipped: 10 },
  { label: "T2", done: 98, todo: 30, skipped: 15 },
  { label: "T3", done: 145, todo: 18, skipped: 8 },
  { label: "T4", done: 132, todo: 22, skipped: 12 },
  { label: "T5", done: 160, todo: 14, skipped: 6 },
  { label: "T6", done: 108, todo: 28, skipped: 18 },
  { label: "T7", done: 175, todo: 10, skipped: 5 },
  { label: "T8", done: 142, todo: 20, skipped: 9 },
  { label: "T9", done: 190, todo: 8, skipped: 4 },
  { label: "T10", done: 165, todo: 15, skipped: 7 },
  { label: "T11", done: 148, todo: 18, skipped: 11 },
  { label: "T12", done: 201, todo: 12, skipped: 3 },
];

export const WEEKDAY_STATS = [
  { label: "T2", done: 42, total: 52 },
  { label: "T3", done: 48, total: 55 },
  { label: "T4", done: 35, total: 50 },
  { label: "T5", done: 50, total: 58 },
  { label: "T6", done: 60, total: 65 },
  { label: "T7", done: 22, total: 45 },
  { label: "CN", done: 18, total: 40 },
].map((d) => ({ ...d, rate: Math.round((d.done / d.total) * 100) }));

export const CATEGORY_STATUS_DATA = [
  { category: "Công việc", done: 30, skipped: 5 },
  { category: "Học tập", done: 20, skipped: 4 },
  { category: "Sức khỏe", done: 18, skipped: 2 },
  { category: "Cá nhân", done: 10, skipped: 3 },
  { category: "Tài chính", done: 8, skipped: 2 },
  { category: "Gia đình", done: 6, skipped: 1 },
];

export const MONTH_NAMES = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

export const DAY_NAMES = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
