"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  LogOut,
} from "lucide-react"
import clsx from "clsx"

const menu = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

const AdminSider = () => {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-primary text-white flex flex-col h-full  fixed p-5">

      <div className="mb-10">
        <h2 className="text-xl font-bold tracking-wide">
          Hao Flow
        </h2>
        <p className="text-xs text-white/70">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200",
                active
                  ? "bg-white text-primary shadow-md"
                  : "hover:bg-white/10"
              )}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <button className="flex items-center gap-2 text-sm hover:text-red-300 transition">
          <LogOut size={16} />
          Logout
        </button>
      </div>

    </aside>
  )
}


export default AdminSider