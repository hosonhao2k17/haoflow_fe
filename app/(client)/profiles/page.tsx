"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BadgeCheck, Calendar, Mail, Pencil, Shield, User,
  Venus, Mars, CheckCircle2, CalendarDays, Flame,
  Trophy, Target, Link2, Plus, Unlink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserStore } from "@/store/user.store"

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialProvider {
  id: string
  name: string
  icon: React.ReactNode
  connected: boolean
  username?: string
}

interface AchievementBadge {
  id: string
  label: string
  icon: React.ReactNode
  earned: boolean
  desc: string
}

// ─── Mock extras (thay bằng API sau) ─────────────────────────────────────────

const STATS = [
  { label: "Tasks hoàn thành", value: "248", icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
  { label: "Daily plans", value: "61", icon: <CalendarDays className="w-4 h-4 text-primary" /> },
  { label: "Tuần hiện tại", value: "Tuần 9", icon: <Flame className="w-4 h-4 text-amber-500" /> },
  { label: "Streak hiện tại", value: "5 ngày", icon: <Trophy className="w-4 h-4 text-rose-500" /> },
]

const GOALS = [
  { label: "Tiết kiệm 50tr Q1/2025", percent: 68 },
  { label: "Hoàn thành khoá học React", percent: 45 },
  { label: "Tập thể dục 30 ngày", percent: 80 },
]

const ACHIEVEMENTS: AchievementBadge[] = [
  { id: "1", label: "100 Tasks", icon: <CheckCircle2 className="w-4 h-4" />, earned: true, desc: "Hoàn thành 100 tasks" },
  { id: "2", label: "7 ngày liên tiếp", icon: <Flame className="w-4 h-4" />, earned: true, desc: "Streak 7 ngày" },
  { id: "3", label: "Siêu kế hoạch", icon: <CalendarDays className="w-4 h-4" />, earned: true, desc: "Tạo 50 daily plans" },
  { id: "4", label: "30 ngày streak", icon: <Trophy className="w-4 h-4" />, earned: false, desc: "Streak 30 ngày liên tiếp" },
  { id: "5", label: "500 Tasks", icon: <CheckCircle2 className="w-4 h-4" />, earned: false, desc: "Hoàn thành 500 tasks" },
]

const SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    id: "google",
    name: "Google",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    connected: true,
    username: "hosonhao@gmail.com",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    connected: false,
  },
  {
    id: "github",
    name: "GitHub",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    connected: true,
    username: "hosonhao",
  },
  {
    id: "apple",
    name: "Apple",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
    connected: false,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const InfoRow = ({
  icon, label, value, valueClass,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  valueClass?: string
}) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-2.5 text-muted-foreground">
      <span className="shrink-0">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
    <div className={cn("text-sm font-medium text-card-foreground", valueClass)}>
      {value}
    </div>
  </div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-4 pb-3">
    {children}
  </h2>
)

// ─── Main ─────────────────────────────────────────────────────────────────────

const Profiles = () => {
  const { user } = useUserStore()
  if (!user) return null

  const initials = user.fullName
    .split(" ")
    .slice(-2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* ── Card: Avatar + Name ── */}
        <div className="relative rounded-2xl border bg-card overflow-hidden">
          <div className="h-28 bg-gradient-to-br from-primary/60 via-primary/40 to-primary/10" />
          <div className="px-6 pb-5">
            <div className="flex items-end justify-between -mt-12 mb-4">
              <Avatar className="w-24 h-24 ring-4 ring-card shadow-xl">
                <AvatarImage src={user.avatar} alt={user.fullName} className="object-cover" />
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs mb-1">
                <Pencil className="w-3.5 h-3.5" /> Chỉnh sửa
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-card-foreground">{user.fullName}</h1>
                {user.verified && <BadgeCheck className="w-5 h-5 text-primary shrink-0" />}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                  <Shield className="w-3 h-3 mr-1" />{user.role.title}
                </Badge>
                <Badge variant="outline" className={cn(
                  "text-[11px] px-2 py-0.5",
                  user.status === "active"
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    : "bg-muted text-muted-foreground"
                )}>
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full mr-1.5 inline-block",
                    user.status === "active" ? "bg-emerald-500" : "bg-muted-foreground"
                  )} />
                  {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card: Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-card p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {stat.icon}
                <span className="text-[11px] text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ── Card: Goals ── */}
        <div className="rounded-2xl border bg-card px-6 py-2">
          <SectionTitle>Mục tiêu đang theo dõi</SectionTitle>
          <div className="space-y-4 pb-4">
            {GOALS.map((goal) => (
              <div key={goal.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm text-card-foreground">{goal.label}</span>
                  </div>
                  <span className="text-xs font-bold text-primary">{goal.percent}%</span>
                </div>
                <Progress value={goal.percent} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Card: Achievements ── */}
        <div className="rounded-2xl border bg-card px-6 py-2">
          <SectionTitle>Thành tích</SectionTitle>
          <div className="flex flex-wrap gap-2 pb-4">
            {ACHIEVEMENTS.map((badge) => (
              <div
                key={badge.id}
                title={badge.desc}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all",
                  badge.earned
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "bg-muted/40 border-dashed border-muted-foreground/20 text-muted-foreground/50 grayscale"
                )}
              >
                {badge.icon}
                {badge.label}
                {!badge.earned && <span className="text-[10px]">🔒</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Card: Social Links ── */}
        <div className="rounded-2xl border bg-card px-6 py-2">
          <SectionTitle>Liên kết tài khoản</SectionTitle>
          <div className="space-y-1 pb-4">
            {SOCIAL_PROVIDERS.map((provider, i) => (
              <div key={provider.id}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted/50 border flex items-center justify-center">
                      {provider.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{provider.name}</p>
                      {provider.connected && provider.username
                        ? <p className="text-[11px] text-muted-foreground">{provider.username}</p>
                        : <p className="text-[11px] text-muted-foreground/50">Chưa liên kết</p>
                      }
                    </div>
                  </div>

                  {provider.connected ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Unlink className="w-3.5 h-3.5" />
                      Huỷ liên kết
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Liên kết
                    </Button>
                  )}
                </div>
                {i < SOCIAL_PROVIDERS.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>

        {/* ── Card: Info ── */}
        <div className="rounded-2xl border bg-card px-6 py-2">
          <SectionTitle>Thông tin cá nhân</SectionTitle>
          <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={user.email} />
          <Separator />
          <InfoRow
            icon={user.gender === "male" ? <Mars className="w-4 h-4" /> : <Venus className="w-4 h-4" />}
            label="Giới tính"
            value={user.gender === "male" ? "Nam" : "Nữ"}
          />
          <Separator />
          <InfoRow
            icon={<Calendar className="w-4 h-4" />}
            label="Ngày sinh"
            value={user.birthDate ?? <span className="text-muted-foreground italic text-xs">Chưa cập nhật</span>}
          />
          <Separator />
          <InfoRow
            icon={<User className="w-4 h-4" />}
            label="ID tài khoản"
            value={<span className="text-xs font-mono text-muted-foreground truncate max-w-[200px] inline-block">{user.id}</span>}
          />
          <Separator />
          <InfoRow
            icon={<Shield className="w-4 h-4" />}
            label="Vai trò"
            value={user.role.title}
            valueClass="text-primary"
          />
          <div className="pb-2" />
        </div>

      </div>
    </div>
  )
}

export default Profiles