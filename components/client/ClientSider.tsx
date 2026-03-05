"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  House,
  BookCheck,
  BookType,
  Brain,
  ChevronDown,
  ListTodo,
  FolderKanban,
  Sparkles,
  Coins,
  Bitcoin,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Landmark,
  ChartSpline,
  Wallet,
  ArrowLeftRight,
  Captions,
  LandmarkIcon,
} from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import clsx from "clsx"

const menus = [
  {
    name: "Trang chủ",
    href: "/",
    icon: House,
  },
  {
    name: "Kế hoạch",
    href: "/plan",
    icon: BookCheck,
    childrens: [
      {
        name: "Kế hoạch hằng ngày",
        href: "/plan/daily-plan",
        icon: ListTodo,
      },
      {
        name: "Danh mục",
        href: "/plan/category",
        icon: FolderKanban,
      },
      {
        name: "AI Phân Tích",
        href: "/daily-plans/ai",
        icon: Sparkles,
      },
    ],
  },
  {
    name: "Tài chính",
    href: '/finance',
    icon: Bitcoin,
    childrens: [
      {
        name: "Tài khoản",
        href: '/finance/account',
        icon: Wallet,
      },
      {
        name: "Danh mục giao dịch",
        href: '/finance/transaction-category',
        icon: Captions
      },
      {
        name: "Giao dịch",
        href: '/finance/transaction',
        icon: ArrowLeftRight
      },
      {
        name: "Ngân sách",
        href: "net-worth-tracking",
        icon: LandmarkIcon
      }
    ]
  },
  {
    name: "Nhật ký",
    href: "/journal",
    icon: BookType,
  },
  {
    name: "AI Coach",
    href: "/ai",
    icon: Brain,
  },
]

const ClientSider = () => {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    const activeParent = menus.find(
      (menu) =>
        menu.childrens &&
        menu.childrens.some((child) =>
          pathname.startsWith(child.href)
        )
    )

    if (activeParent) {
      setOpenMenu(activeParent.name)
    }
  }, [pathname])

  return (
    <aside className="w-64 bg-gradient-to-b from-primary to-[#162c6b] fixed h-screen p-4 shadow-2xl flex flex-col">

      <div className="flex items-center gap-3 mb-6">
        <Avatar className="w-12 h-12 ring-2 ring-white/30">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="text-primary-foreground">
          <h1 className="font-semibold text-lg tracking-wide">
            Hao Flow
          </h1>
          <p className="text-xs opacity-70">
            Life Operating System
          </p>
        </div>
      </div>

      <Separator className="bg-white/20 mb-6" />

      {/* Navigation */}
      <nav className="flex-1 space-y-2 text-primary-foreground overflow-y-auto">
        {menus.map((menu, index) => {
          const Icon = menu.icon
          const isActive =
            pathname === menu.href ||
            pathname.startsWith(menu.href + "/")

          const isOpen = openMenu === menu.name

          if (menu.childrens) {
            return (
              <div key={index}>
                <button
                  onClick={() =>
                    setOpenMenu(isOpen ? null : menu.name)
                  }
                  className={clsx(
                    "w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200",
                    "hover:bg-white/10",
                    isActive && "bg-white/20 shadow-inner"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {menu.name}
                    </span>
                  </div>
                  <ChevronDown
                    className={clsx(
                      "w-4 h-4 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Children */}
                <div
                  className={clsx(
                    "ml-6 overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-60 mt-2" : "max-h-0"
                  )}
                >
                  <div className="space-y-1">
                    {menu.childrens.map((child, i) => {
                      const ChildIcon = child.icon
                      const isChildActive =
                        pathname === child.href

                      return (
                        <Link
                          key={i}
                          href={child.href}
                          className={clsx(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                            "hover:bg-white/10",
                            isChildActive &&
                              "bg-white/20 shadow-inner"
                          )}
                        >
                          {ChildIcon && (
                            <ChildIcon className="w-4 h-4 opacity-80" />
                          )}
                          {child.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          }

          return (
            <Link
              key={index}
              href={menu.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200",
                "hover:bg-white/10",
                isActive && "bg-white/20 shadow-inner"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">
                {menu.name}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-6 text-xs text-white/60 text-center">
        © {new Date().getFullYear()} Hao Flow
      </div>
    </aside>
  )
}

export default ClientSider