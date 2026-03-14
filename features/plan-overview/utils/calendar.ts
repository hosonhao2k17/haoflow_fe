export interface CalendarDay {
  day: number;
  status: "future" | "done" | "progress" | "partial" | "cancelled";
  progress: number;
  isToday: boolean;
}

export function generateCalendarDays(year: number, month: number): (CalendarDay | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const days: (CalendarDay | null)[] = [];

  for (let i = 0; i < offset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const isPast = date < today;
    const isToday = date.toDateString() === today.toDateString();
    let status: CalendarDay["status"] = "future";
    let progress = 0;
    if (isPast || isToday) {
      const r = Math.random();
      if (r < 0.1) {
        status = "cancelled";
        progress = 0;
      } else if (r < 0.25) {
        status = "partial";
        progress = Math.floor(Math.random() * 60) + 20;
      } else if (r < 0.5) {
        status = "done";
        progress = 100;
      } else {
        status = "progress";
        progress = Math.floor(Math.random() * 80) + 10;
      }
    }
    days.push({ day: d, status, progress, isToday });
  }
  return days;
}
