import { format } from "date-fns";


export const formatDate = (date: string | Date) => 
    new Intl.DateTimeFormat('vi-VN').format(new Date(date))