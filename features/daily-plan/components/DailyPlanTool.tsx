"use client"

import { useMemo } from "react"
import { ChevronLeft, ChevronRight, CalendarPlus, CalendarRange } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getNumberWeek, formatDate } from "@/lib/date"
import { CruMode } from "@/common/constants/app.constant"
import { useUserStore } from "@/store/user.store"

interface Props {
  setOpen: (open: boolean) => void
  setMode: (mode: CruMode) => void
  setStartDate: (date: string) => void
  setEndDate: (date: string) => void
  startDate: string
  endDate: string
}

interface WeekOption {
  weekNumber: number
  label: string
  startDate: Date
  endDate: Date
}

/** Tạo danh sách tất cả các tuần từ createdAt đến hiện tại */
const buildWeekOptions = (createdAt: Date): WeekOption[] => {
  const totalWeeks = getNumberWeek(createdAt)
  const options: WeekOption[] = []

  for (let i = 0; i < totalWeeks; i++) {
    const start = new Date(createdAt)
    start.setHours(0, 0, 0, 0)
    start.setDate(start.getDate() + i * 7)

    const end = new Date(start)
    end.setDate(end.getDate() + 6)

    options.push({
      weekNumber: i + 1,
      label: `Tuần ${i + 1} · ${formatDate(start)} → ${formatDate(end)}`,
      startDate: start,
      endDate: end,
    })
  }

  return options
}

const DailyPlanTool = ({
  setOpen,
  setMode,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}: Props) => {
  const { user } = useUserStore()

  const weekOptions = useMemo(
    () => (user?.createdAt ? buildWeekOptions(new Date(user.createdAt)) : []),
    [user?.createdAt]
  )

  const currentWeek = getNumberWeek(user?.createdAt as Date)

  const shiftWeek = (direction: -1 | 1) => {
    if (!startDate || !endDate) return
    const newStart = new Date(startDate)
    const newEnd = new Date(endDate)
    newStart.setDate(newStart.getDate() + direction * 7)
    newEnd.setDate(newEnd.getDate() + direction * 7)
    setStartDate(newStart.toISOString())
    setEndDate(newEnd.toISOString())
  }

  const handleSelectWeek = (value: string) => {
    const week = weekOptions[Number(value) - 1]
    if (!week) return
    setStartDate(week.startDate.toISOString())
    setEndDate(week.endDate.toISOString())
  }

  const goToCurrentWeek = () => {
    const last = weekOptions[weekOptions.length - 1]
    if (!last) return
    setStartDate(last.startDate.toISOString())
    setEndDate(last.endDate.toISOString())
  }

  return (
    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 p-4 border bg-card rounded-2xl">

      {/* Left: week navigation */}
      <div className="flex items-center gap-2 flex-wrap">

        <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => shiftWeek(-1)}>
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => shiftWeek(1)}>
          <ChevronRight className="w-4 h-4" />
        </Button>

        <Button variant="secondary" size="sm" className="h-9 text-xs" onClick={goToCurrentWeek}>
          Tuần này
        </Button>

        {/* Week range label */}
        {startDate && endDate && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
            <CalendarRange className="w-3.5 h-3.5" />
            <span>
              {formatDate(new Date(startDate))} – {formatDate(new Date(endDate))}
            </span>
          </div>
        )}
      </div>

      {/* Right: week selector + add button */}
      <div className="flex items-center gap-2">

        {/* Week selector */}
        <Select onValueChange={handleSelectWeek} defaultValue={String(currentWeek)}>
          <SelectTrigger className="w-72 h-9 text-xs">
            <SelectValue placeholder="Chọn tuần..." />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            {weekOptions.map((week) => (
              <SelectItem
                key={week.weekNumber}
                value={String(week.weekNumber)}
                className="text-xs"
              >
                {week.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Add plan */}
        <Button
          size="sm"
          className="h-9 gap-1.5 text-xs"
          onClick={() => {
            setOpen(true)
            setMode(CruMode.CREATE)
          }}
        >
          <CalendarPlus className="w-3.5 h-3.5" />
          Thêm 
        </Button>
        <Button 
          size='sm'
          className="h-9 gap-1.5 text-xs"
        >
          Thêm mẫu
        </Button>
        
      </div>
    </div>
  )
}

export default DailyPlanTool