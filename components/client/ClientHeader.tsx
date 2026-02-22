"use client"

import { CheckCircle2, Smile, TrendingUp, Wallet } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const ClientHeader = () => {

  const tasksDone = 7
  const totalTasks = 10
  const remainingMoney = 12500000
  const growth = 0.2
  const satified = 70
  const targetProgress = 68

  return (
    <header className="w-full bg-primary text-primary-foreground px-6 sticky py-4 shadow-md">
      <div className="flex items-center justify-between">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">
          
          {/* Task Completed */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs opacity-70">Task hôm nay</p>
              <p className="text-sm font-semibold">
                {tasksDone}/{totalTasks} đã hoàn thành
              </p>
            </div>
          </div>

          {/* Money Remaining */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
            <Wallet className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-xs opacity-70">Số dư hiện tại</p>
              <p className="text-sm font-semibold">
                {remainingMoney.toLocaleString()} đ
              </p>
            </div>
          </div>

          {/* Growth */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-xs opacity-70">So với tháng trước</p>
              <p className="text-sm font-semibold text-emerald-300">
                +{growth}%
              </p>
            </div>
          </div>
          {/* discipline */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
            <Smile className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-xs opacity-70">Mức độ hài lòng</p>
              <p className="text-sm font-semibold text-emerald-300">
                +{satified}%
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">
          
          {/* Target Progress */}
          <div className="w-48">
            <p className="text-xs opacity-70 mb-1">
              Tiến trình mục tiêu tháng
            </p>
            <Progress className="bg-primary-foreground border-foreground" value={targetProgress} />
            <p className="text-xs mt-1 text-right opacity-70">
              {targetProgress}%
            </p>
          </div>

          <Separator orientation="vertical" className="h-10 bg-white/20" />

          {/* User Info */}
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 ring-2 ring-green-400">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>HF</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Hào Nguyễn</p>
              <p className="text-xs text-green-400">● Active</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ClientHeader