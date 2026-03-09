"use client"

import { useState, useMemo } from "react"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend
} from "recharts"
import { ChevronLeft, ChevronRight, Flame, CheckCircle2, Circle, XCircle, Sparkles, TrendingUp, Calendar, LayoutGrid, Bot, ChevronDown } from "lucide-react"

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 1, title: "Công việc",    color: "#6366f1", icon: "💼", taskCount: 38 },
  { id: 2, title: "Học tập",      color: "#f59e0b", icon: "📚", taskCount: 27 },
  { id: 3, title: "Sức khỏe",     color: "#10b981", icon: "💪", taskCount: 21 },
  { id: 4, title: "Cá nhân",      color: "#f43f5e", icon: "🌿", taskCount: 15 },
  { id: 5, title: "Tài chính",    color: "#3b82f6", icon: "💰", taskCount: 11 },
  { id: 6, title: "Gia đình",     color: "#ec4899", icon: "🏠", taskCount: 8  },
]

const WEEK_DATA = [
  { label: "T2", done: 8,  todo: 2, skipped: 1 },
  { label: "T3", done: 12, todo: 1, skipped: 0 },
  { label: "T4", done: 6,  todo: 4, skipped: 2 },
  { label: "T5", done: 10, todo: 0, skipped: 1 },
  { label: "T6", done: 14, todo: 3, skipped: 0 },
  { label: "T7", done: 5,  todo: 5, skipped: 3 },
  { label: "CN", done: 3,  todo: 2, skipped: 1 },
]

const MONTH_DATA = [
  { label: "Tuần 1", done: 32, todo: 8, skipped: 4 },
  { label: "Tuần 2", done: 41, todo: 5, skipped: 2 },
  { label: "Tuần 3", done: 28, todo: 12, skipped: 6 },
  { label: "Tuần 4", done: 37, todo: 6, skipped: 3 },
]

const YEAR_DATA = [
  { label: "T1",  done: 120, todo: 20, skipped: 10 },
  { label: "T2",  done: 98,  todo: 30, skipped: 15 },
  { label: "T3",  done: 145, todo: 18, skipped: 8  },
  { label: "T4",  done: 132, todo: 22, skipped: 12 },
  { label: "T5",  done: 160, todo: 14, skipped: 6  },
  { label: "T6",  done: 108, todo: 28, skipped: 18 },
  { label: "T7",  done: 175, todo: 10, skipped: 5  },
  { label: "T8",  done: 142, todo: 20, skipped: 9  },
  { label: "T9",  done: 190, todo: 8,  skipped: 4  },
  { label: "T10", done: 165, todo: 15, skipped: 7  },
  { label: "T11", done: 148, todo: 18, skipped: 11 },
  { label: "T12", done: 201, todo: 12, skipped: 3  },
]

const CATEGORY_STATUS_DATA = [
  { category: "Công việc",  done: 30, skipped: 5,  color: "#6366f1" },
  { category: "Học tập",    done: 20, skipped: 4,  color: "#f59e0b" },
  { category: "Sức khỏe",   done: 18, skipped: 2,  color: "#10b981" },
  { category: "Cá nhân",    done: 10, skipped: 3,  color: "#f43f5e" },
  { category: "Tài chính",  done: 8,  skipped: 2,  color: "#3b82f6" },
  { category: "Gia đình",   done: 6,  skipped: 1,  color: "#ec4899" },
]

function generateCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()

  const days = []
  for (let i = 0; i < offset; i++) days.push(null)

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    const isPast = date < today
    const isToday = date.toDateString() === today.toDateString()

    const rand = Math.random()
    let status = "future"
    let progress = 0

    if (isPast || isToday) {
      const r = Math.random()
      if (r < 0.1) {
        status = "cancelled"
        progress = 0
      } else if (r < 0.25) {
        status = "partial"
        progress = Math.floor(Math.random() * 60) + 20
      } else if (r < 0.5) {
        status = "done"
        progress = 100
      } else {
        status = "progress"
        progress = Math.floor(Math.random() * 80) + 10
      }
    }

    days.push({ day: d, status, progress, isToday })
  }
  return days
}

const RADAR_DATA = [
  { subject: "Công việc", A: 85 },
  { subject: "Học tập",   A: 72 },
  { subject: "Sức khỏe",  A: 90 },
  { subject: "Cá nhân",   A: 60 },
  { subject: "Tài chính", A: 78 },
  { subject: "Gia đình",  A: 55 },
]

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: "rgba(15,15,20,0.95)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "10px 14px",
      fontSize: 12,
      color: "#e2e8f0",
      backdropFilter: "blur(12px)"
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6, color: "#fff" }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.fill || p.color, display: "inline-block" }} />
          <span style={{ color: "#94a3b8" }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: "#fff" }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

// ─── STAT CARD ───────────────────────────────────────────────────────────────

const StatCard = ({ label, value, icon, color, sub }) => (
  <div style={{
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: "18px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    position: "relative",
    overflow: "hidden",
    flex: 1,
  }}>
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 2,
      background: color, borderRadius: "16px 16px 0 0"
    }} />
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
      <span style={{
        width: 32, height: 32, borderRadius: 10,
        background: `${color}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14
      }}>{icon}</span>
    </div>
    <div style={{ fontSize: 32, fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: "#475569" }}>{sub}</div>}
  </div>
)

// ─── CALENDAR DAY CELL ────────────────────────────────────────────────────────

const DayCell = ({ day }) => {
  if (!day) return <div />

  const colors = {
    done:      { bg: "rgba(16,185,129,0.18)", border: "rgba(16,185,129,0.5)", text: "#10b981" },
    progress:  { bg: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.4)", text: "#818cf8" },
    partial:   { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.4)", text: "#f59e0b" },
    cancelled: { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)",  text: "#ef4444" },
    future:    { bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.05)", text: "#334155" },
  }

  const c = colors[day.status]

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 10,
      padding: "8px 6px",
      minHeight: 64,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: day.status !== "future" ? "pointer" : "default",
      transition: "all 0.15s",
      position: "relative",
      overflow: "hidden",
    }}
      onMouseEnter={e => { if (day.status !== "future") e.currentTarget.style.transform = "scale(1.04)" }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
    >
      {day.isToday && (
        <div style={{
          position: "absolute", top: 4, right: 4,
          width: 6, height: 6, borderRadius: "50%",
          background: "#6366f1",
          boxShadow: "0 0 6px #6366f1"
        }} />
      )}
      <span style={{ fontSize: 12, fontWeight: 700, color: day.isToday ? "#818cf8" : c.text }}>{day.day}</span>
      {day.status === "cancelled" ? (
        <XCircle size={14} color="#ef4444" style={{ opacity: 0.7 }} />
      ) : day.status === "future" ? (
        <span style={{ width: 20, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.04)" }} />
      ) : (
        <div style={{ width: "100%", padding: "0 4px" }}>
          <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div style={{ width: `${day.progress}%`, height: "100%", background: c.text, borderRadius: 2, transition: "width 0.6s ease" }} />
          </div>
          <span style={{ fontSize: 9, color: c.text, fontWeight: 700, display: "block", textAlign: "center", marginTop: 2 }}>
            {day.progress}%
          </span>
        </div>
      )}
    </div>
  )
}

// ─── AI ANALYSIS ─────────────────────────────────────────────────────────────

const AIAnalysis = () => {
  const [analysed, setAnalysed] = useState(false)
  const [loading, setLoading] = useState(false)

  const insights = [
    { icon: "🔥", title: "Thứ Sáu là ngày hiệu quả nhất", desc: "Trung bình 14 task hoàn thành mỗi thứ Sáu — cao hơn 40% so với các ngày còn lại trong tuần." },
    { icon: "⚠️", title: "Danh mục Gia đình cần chú ý", desc: "Tỉ lệ hoàn thành chỉ đạt 55% — thấp nhất trong tất cả danh mục. Hãy phân bổ thời gian hợp lý hơn." },
    { icon: "📈", title: "Xu hướng tăng trưởng tốt", desc: "Tháng 9 & 12 đạt đỉnh hiệu suất. Bạn thường hoàn thành tốt hơn vào cuối quý." },
    { icon: "💡", title: "Gợi ý cải thiện", desc: "Thứ 7 & Chủ Nhật có tỉ lệ bỏ qua (skip) cao — cân nhắc lên kế hoạch nhẹ nhàng hơn cho cuối tuần." },
  ]

  const handleAnalyse = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setAnalysed(true) }, 2200)
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(16,185,129,0.05) 100%)",
      border: "1px solid rgba(99,102,241,0.2)",
      borderRadius: 20,
      padding: 28,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* deco */}
      <div style={{
        position: "absolute", top: -40, right: -40, width: 160, height: 160,
        borderRadius: "50%", background: "rgba(99,102,241,0.06)", pointerEvents: "none"
      }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(99,102,241,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Bot size={18} color="#818cf8" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f8fafc" }}>Phân tích AI</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Dựa trên dữ liệu hoạt động của bạn</div>
            </div>
          </div>
        </div>

        {!analysed && (
          <button
            onClick={handleAnalyse}
            disabled={loading}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 20px",
              background: loading ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.9)",
              border: "none",
              borderRadius: 12,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              letterSpacing: "0.01em",
            }}
          >
            {loading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Đang phân tích...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Phân tích ngay
              </>
            )}
          </button>
        )}
      </div>

      {!analysed && !loading && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "40px 20px",
          border: "1px dashed rgba(99,102,241,0.25)",
          borderRadius: 14,
          gap: 12,
        }}>
          <div style={{ fontSize: 36 }}>🤖</div>
          <div style={{ fontSize: 14, color: "#475569", textAlign: "center", maxWidth: 300 }}>
            Nhấn <strong style={{ color: "#818cf8" }}>Phân tích ngay</strong> để AI đưa ra nhận xét chi tiết về hiệu suất của bạn
          </div>
        </div>
      )}

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[100, 80, 90, 70].map((w, i) => (
            <div key={i} style={{
              height: 52, borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              animation: "pulse 1.5s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
              width: `${w}%`
            }} />
          ))}
        </div>
      )}

      {analysed && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {insights.map((ins, i) => (
            <div key={i} style={{
              display: "flex", gap: 14,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: "14px 16px",
              animation: "fadeSlideIn 0.4s ease forwards",
              animationDelay: `${i * 0.1}s`,
              opacity: 0,
            }}>
              <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{ins.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 3 }}>{ins.title}</div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{ins.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const TaskOverviewPage = () => {
  const [filterMode, setFilterMode] = useState("week")
  const [calYear, setCalYear] = useState(2025)
  const [calMonth, setCalMonth] = useState(2) // 0-indexed: 2 = March

  const chartData = filterMode === "week" ? WEEK_DATA : filterMode === "month" ? MONTH_DATA : YEAR_DATA

  const calDays = useMemo(() => generateCalendarDays(calYear, calMonth), [calYear, calMonth])

  const monthNames = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"]
  const dayNames   = ["T2","T3","T4","T5","T6","T7","CN"]

  const totalDone    = 247
  const totalTodo    = 38
  const totalSkipped = 19
  const totalTasks   = totalDone + totalTodo + totalSkipped
  const streak       = 12

  const filterOptions = [
    { key: "week",  label: "Tuần" },
    { key: "month", label: "Tháng" },
    { key: "year",  label: "Năm" },
  ]

  const base = {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#080b12",
    color: "#e2e8f0",
    padding: "32px 28px",
    maxWidth: 1280,
    margin: "0 auto",
  }

  return (
    <div style={base}>

      {/* ── HEADER ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(99,102,241,0.4)"
            }}>
              <TrendingUp size={18} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.03em", lineHeight: 1 }}>
                Task Overview
              </h1>
              <p style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>Phân tích hiệu suất cá nhân</p>
            </div>
          </div>
        </div>

        {/* Filter pill */}
        <div style={{
          display: "flex", gap: 4,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14, padding: 4,
        }}>
          {filterOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setFilterMode(opt.key)}
              style={{
                padding: "8px 20px",
                borderRadius: 10,
                border: "none",
                background: filterMode === opt.key
                  ? "linear-gradient(135deg, #6366f1, #818cf8)"
                  : "transparent",
                color: filterMode === opt.key ? "#fff" : "#64748b",
                fontWeight: filterMode === opt.key ? 700 : 500,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: filterMode === opt.key ? "0 2px 12px rgba(99,102,241,0.4)" : "none",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        <StatCard label="Tổng task"    value={totalTasks}   icon="📋" color="#6366f1" sub="Trong kỳ đã chọn" />
        <StatCard label="Hoàn thành"   value={totalDone}    icon="✅" color="#10b981" sub={`${Math.round(totalDone/totalTasks*100)}% tỉ lệ hoàn thành`} />
        <StatCard label="Chưa làm"     value={totalTodo}    icon="🔵" color="#3b82f6" sub="Đang chờ xử lý" />
        <StatCard label="Bỏ qua"       value={totalSkipped} icon="⏭️" color="#f59e0b" sub="Đã skip" />
        <StatCard label="Streak 🔥"    value={`${streak}d`} icon="🔥" color="#f43f5e" sub="Chuỗi ngày đạt 100%" />
      </div>

      {/* ── MAIN GRID: Chart + Categories ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, marginBottom: 20 }}>

        {/* Left: Bar Chart */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20, padding: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <LayoutGrid size={15} color="#6366f1" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>Task Progress</span>
            <span style={{ fontSize: 11, color: "#475569", marginLeft: "auto" }}>
              {filterMode === "week" ? "Thứ 2 → Chủ Nhật" : filterMode === "month" ? "Tuần 1 → 4" : "Tháng 1 → 12"}
            </span>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            {[["#10b981","Hoàn thành"],["#6366f1","Chưa làm"],["#f59e0b","Bỏ qua"]].map(([color, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#64748b" }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: color, display: "inline-block" }} />
                {label}
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barGap={2} barCategoryGap="30%">
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)", radius: 6 }} />
              <Bar dataKey="done"    name="Hoàn thành" fill="#10b981" radius={[5,5,0,0]} />
              <Bar dataKey="todo"    name="Chưa làm"   fill="#6366f1" radius={[5,5,0,0]} opacity={0.7} />
              <Bar dataKey="skipped" name="Bỏ qua"     fill="#f59e0b" radius={[5,5,0,0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Category list */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20, padding: 22,
          display: "flex", flexDirection: "column", gap: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 14 }}>🗂️</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>Danh mục</span>
            <span style={{ fontSize: 10, color: "#475569", marginLeft: "auto", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: 6 }}>
              theo task count
            </span>
          </div>

          {[...CATEGORIES].sort((a,b) => b.taskCount - a.taskCount).map((cat, i) => {
            const maxCount = CATEGORIES[0].taskCount
            const pct = Math.round(cat.taskCount / maxCount * 100)
            return (
              <div key={cat.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: `${cat.color}20`,
                    border: `1.5px solid ${cat.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, flexShrink: 0
                  }}>{cat.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cat.title}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: cat.color, marginLeft: 8, flexShrink: 0 }}>{cat.taskCount}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 3, background: "rgba(255,255,255,0.06)", marginTop: 5, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: cat.color, borderRadius: 3, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── CALENDAR ── */}
      <div style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20, padding: 24, marginBottom: 20,
      }}>
        {/* Calendar header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Calendar size={15} color="#6366f1" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>Daily Plan Calendar</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Legend */}
            <div style={{ display: "flex", gap: 12, marginRight: 12 }}>
              {[["#10b981","100%"],["#6366f1","Tiến độ"],["#f59e0b","Một phần"],["#ef4444","Hủy"]].map(([c,l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#64748b" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c, display: "inline-block" }} />
                  {l}
                </div>
              ))}
            </div>
            {/* Nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "4px 10px" }}>
              <button onClick={() => { let m=calMonth-1; let y=calYear; if(m<0){m=11;y--;} setCalMonth(m); setCalYear(y) }}
                style={{ background:"none",border:"none",color:"#64748b",cursor:"pointer",display:"flex",padding:2 }}>
                <ChevronLeft size={14} />
              </button>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0", minWidth: 70, textAlign: "center" }}>
                {monthNames[calMonth]} {calYear}
              </span>
              <button onClick={() => { let m=calMonth+1; let y=calYear; if(m>11){m=0;y++;} setCalMonth(m); setCalYear(y) }}
                style={{ background:"none",border:"none",color:"#64748b",cursor:"pointer",display:"flex",padding:2 }}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 6 }}>
          {dayNames.map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "#475569", letterSpacing: "0.05em", padding: "4px 0" }}>{d}</div>
          ))}
        </div>

        {/* Day grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
          {calDays.map((day, i) => <DayCell key={i} day={day} />)}
        </div>
      </div>

      {/* ── CATEGORY STATUS CHART ── */}
      <div style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20, padding: 24, marginBottom: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 14 }}>📊</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>Hoàn thành & Bỏ qua theo danh mục</span>
        </div>
        <p style={{ fontSize: 11, color: "#475569", marginBottom: 20 }}>Danh mục nào được hoàn thành nhiều nhất và bị skip nhiều nhất</p>

        <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
          {[["#10b981","Hoàn thành"],["#f59e0b","Bỏ qua"]].map(([c,l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#64748b" }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: c, display: "inline-block" }} />
              {l}
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={CATEGORY_STATUS_DATA} layout="vertical" barGap={3} barCategoryGap="25%">
            <XAxis type="number" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="category" width={75} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="done"    name="Hoàn thành" fill="#10b981" radius={[0,5,5,0]} />
            <Bar dataKey="skipped" name="Bỏ qua"     fill="#f59e0b" radius={[0,5,5,0]} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── AI ANALYSIS ── */}
      <AIAnalysis />

    </div>
  )
}

export default TaskOverviewPage