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
    <div className="flex flex-wrap items-center gap-3 p-4 sm:p-5 border border-border/60 bg-card rounded-2xl min-w-0">
      <Button variant="outline" size="icon" className="h-9 w-9 shrink-0 rounded-lg" onClick={() => shiftWeek(-1)}>
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" className="h-9 w-9 shrink-0 rounded-lg" onClick={() => shiftWeek(1)}>
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button variant="secondary" size="sm" className="h-9 text-sm shrink-0 rounded-lg px-3" onClick={goToCurrentWeek}>
        Tuần này
      </Button>
      {startDate && endDate && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-xl shrink-0">
          <CalendarRange className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">
            {formatDate(new Date(startDate))} – {formatDate(new Date(endDate))}
          </span>
        </div>
      )}

      <Select onValueChange={handleSelectWeek} defaultValue={String(currentWeek)}>
        <SelectTrigger className="w-[180px] sm:w-[200px] h-9 text-sm rounded-xl border-border/60">
          <SelectValue placeholder="Chọn tuần..." />
        </SelectTrigger>
        <SelectContent className="max-h-64 rounded-xl">
          {weekOptions.map((week) => (
            <SelectItem key={week.weekNumber} value={String(week.weekNumber)} className="text-sm rounded-lg">
              {week.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          size="sm"
          className="h-9 gap-2 text-sm rounded-xl"
          onClick={() => {
            setOpen(true)
            setMode(CruMode.CREATE)
          }}
        >
          <CalendarPlus className="w-4 h-4" />
          Thêm
        </Button>
        <Button size="sm" className="h-9 gap-2 text-sm rounded-xl">
          Thêm mẫu
        </Button>
      </div>
    </div>
  )
}

export default DailyPlanTool