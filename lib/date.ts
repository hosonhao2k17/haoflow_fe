import { format } from "date-fns";


export const formatDate = (date: string | Date) => 
    new Intl.DateTimeFormat('vi-VN').format(new Date(date)) 


export const getBirthDateRange = () => {
    const today = new Date()

    const maxDate = new Date()
    maxDate.setFullYear(today.getFullYear() - 10)

    const minDate = new Date()
    minDate.setFullYear(today.getFullYear() - 100)

    return {
        min: minDate.toISOString().split("T")[0],
        max: maxDate.toISOString().split("T")[0],
    }
}

export const formatDateForInput = (date:  Date) => {
  return date.toISOString().split("T")[0]
}

export const formatHour = (input: string | Date): string => {
  const date = input instanceof Date ? input : new Date(input)

  if (isNaN(date.getTime())) return ""

  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date)
}

export function getWeekdayVN(dateString: string) {
  const date = new Date(dateString)

  const days = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ]

  return days[date.getDay()]
}

export function isToday(dateString: string) {
  const today = new Date()
  const date = new Date(dateString)

  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  )
}


export const getRangeWeek = (date: Date = new Date()) => {
  const current = new Date(date)

  // Chuẩn hóa về 00:00:00 để tránh lệch timezone khi so sánh
  current.setHours(0, 0, 0, 0)

  const day = current.getDay() // 0 (Sun) -> 6 (Sat)

  // Chuyển về Monday
  const diffToMonday = day === 0 ? -6 : 1 - day

  const startDate = new Date(current)
  startDate.setDate(current.getDate() + diffToMonday)

  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)

  return {
    startDate: startDate.toString(),
    endDate: endDate.toString(),
  }
}

export const getNumberWeek = (
  startDate: Date,
  endDate: Date = new Date()
): number => {
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)

  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)

  const diffMs = end.getTime() - start.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  return Math.floor(diffDays / 7) + 1
}