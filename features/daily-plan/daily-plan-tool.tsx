"use client"

import { useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Plan {
  id: string
  title: string
  progress: number
}

const mockPlans: Plan[] = [
  { id: "1", title: "Deep Work Monday", progress: 80 },
  { id: "2", title: "Frontend Focus", progress: 45 },
  { id: "3", title: "Learning Day", progress: 20 },
  { id: "4", title: "Build Mode", progress: 90 },
  { id: "5", title: "Optimize", progress: 60 },
  { id: "6", title: "Review Week", progress: 30 },
]

function getWeekRange(date: Date) {
  const current = new Date(date)
  const day = current.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day

  const monday = new Date(current)
  monday.setDate(current.getDate() + diffToMonday)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  return { monday, sunday }
}

function formatDate(date: Date) {
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

const DailyPlanTool = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("desc")

  const { monday, sunday } = useMemo(
    () => getWeekRange(currentDate),
    [currentDate]
  )

  const weeklyProgress = useMemo(() => {
    const total = mockPlans.reduce((acc, p) => acc + p.progress, 0)
    return Math.round(total / mockPlans.length)
  }, [])

  const filteredPlans = useMemo(() => {
    let data = mockPlans.filter((plan) =>
      plan.title.toLowerCase().includes(search.toLowerCase())
    )

    data = data.sort((a, b) =>
      sort === "desc"
        ? b.progress - a.progress
        : a.progress - b.progress
    )

    return data
  }, [search, sort])

  const goPrevWeek = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() - 7)
    setCurrentDate(d)
  }

  const goNextWeek = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() + 7)
    setCurrentDate(d)
  }

  const goToday = () => {
    setCurrentDate(new Date())
  }

  const handleDatePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return
    setCurrentDate(new Date(e.target.value))
  }

  return (
    <div className="p-6 space-y-8">

      {/* WEEKLY SUMMARY BAR */}
      <div className="shadow-2xl shadow-primary bg-white border rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">
            Tổng quan tuần
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tuần từ {formatDate(monday)} đến {formatDate(sunday)}
          </p>
        </div>

        <div className="w-full md:w-72">
          <div className="flex justify-between text-sm mb-1">
            <span>Weekly Progress</span>
            <span>{weeklyProgress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${weeklyProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 border p-4 rounded-2xl shadow-2xl shadow-primary ">

        {/* Week control */}
        <div className="flex items-center gap-3 flex-wrap">

          <Button variant="outline" size="icon" onClick={goPrevWeek}>
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={goNextWeek}>
            <ChevronRight className="w-4 h-4" />
          </Button>

          <Button variant="secondary" onClick={goToday}>
            Today
          </Button>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="date"
              onChange={handleDatePick}
              className="pl-9 w-44"
            />
          </div>
        </div>

        {/* Search + Sort */}
        <div className="flex gap-3 w-full xl:w-auto">
          <div className="relative w-full xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm daily plan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Progress cao → thấp</SelectItem>
              <SelectItem value="asc">Progress thấp → cao</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      
    </div>
  )
}

export default DailyPlanTool