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

