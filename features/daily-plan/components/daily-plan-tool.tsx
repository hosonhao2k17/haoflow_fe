"use client"

import { useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Search,
  UserPlusIcon,
  CalendarPlus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/date"
import { CruMode } from "@/common/constants/app.constant"


interface Props {
  setOpen: (open: boolean) => void;
  setMode: (mode: CruMode) => void;
}

const DailyPlanTool = ({setOpen, setMode}:Props) => {
  

  return (
    <div className="p-6 space-y-8">

      {/* WEEKLY SUMMARY BAR */}
      <div className="shadow-2xl shadow-primary bg-white border rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">
            Tổng quan tuần
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {/* Tuần từ {formatDate(monday)} đến {formatDate(sunday)} */}
          </p>
        </div>

        <div className="w-full md:w-72">
          <div className="flex justify-between text-sm mb-1">
            <span>Weekly Progress</span>
            <span>{30}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${30}%` }}
            />
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 border p-4 rounded-2xl shadow-2xl shadow-primary ">

        {/* Week control */}
        <div className="flex items-center gap-3 flex-wrap">

          <Button variant="outline" size="icon" >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>

          <Button variant="secondary">
            Today
          </Button>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="date"
              className="pl-9 w-44"
            />
          </div>

          <Button 
            variant="outline" 
            onClick={() => {
              setOpen(true)
              setMode(CruMode.CREATE)
            }}
          >
            <CalendarPlus />
            Thêm
          </Button>
        </div>

        {/* Search + Sort */}
        <div className="flex gap-3 w-full xl:w-auto">
          <div className="relative w-full xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm daily plan..."
              className="pl-9"
            />
          </div>

          <Select>
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