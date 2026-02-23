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

export const formatDateForInput = (isoString: string) => {
  return isoString.split("T")[0]
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