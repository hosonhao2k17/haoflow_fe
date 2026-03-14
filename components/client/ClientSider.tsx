"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  House,
  BookCheck,
  BookType,
  Brain,
  ChevronDown,
  ListTodo,
  FolderKanban,
  Wallet,
  ArrowLeftRight,
  Captions,
  LandmarkIcon,
  ChartNoAxesCombined,
  Crosshair,
  Bell,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import clsx from "clsx";

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
      { name: "Kế hoạch hằng ngày", href: "/plan/daily-plan", icon: ListTodo },
      { name: "Danh mục", href: "/plan/task-category", icon: FolderKanban },
      { name: "Tổng quan", href: "/plan/overview", icon: ChartNoAxesCombined },
    ],
  },
  {
    name: "Tài chính",
    href: "/finance",
    icon: Wallet,
    childrens: [
      { name: "Tài khoản", href: "/finance/account", icon: Wallet },
      { name: "Danh mục tài chính", href: "/finance/transaction-category", icon: Captions },
      { name: "Giao dịch", href: "/finance/transaction", icon: ArrowLeftRight },
      { name: "Ngân sách", href: "/finance/budget", icon: LandmarkIcon },
      { name: "Mục tiêu tài chính", href: "/finance/target", icon: Crosshair },
      { name: "Tổng quan", href: "/finance/overview", icon: ChartNoAxesCombined },
    ],
  },
  { name: "Nhật ký", href: "/journal", icon: BookType },
  { name: "Thông báo", href: "/notifications", icon: Bell },
  { name: "AI Coach", href: "/ai", icon: Brain },
];

interface NavContentProps {
  onLinkClick?: () => void;
}

function NavContent({ onLinkClick }: NavContentProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const activeParent = menus.find(
      (menu) =>
        menu.childrens && menu.childrens.some((child) => pathname.startsWith(child.href))
    );
    if (activeParent) setOpenMenu(activeParent.name);
  }, [pathname]);

  const linkClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-primary-foreground/10";
  const activeClass = "bg-primary-foreground/15 text-primary-foreground";

  return (
    <nav className="flex-1 space-y-1 text-primary-foreground overflow-y-auto">
      {menus.map((menu, index) => {
        const Icon = menu.icon;
        const isActive =
          pathname === menu.href || pathname.startsWith(menu.href + "/");
        const isOpen = openMenu === menu.name;

        if (menu.childrens) {
          return (
            <div key={index}>
              <button
                type="button"
                onClick={() => setOpenMenu(isOpen ? null : menu.name)}
                className={clsx(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-primary-foreground/10",
                  isActive && activeClass
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{menu.name}</span>
                </div>
                <ChevronDown
                  className={clsx("w-4 h-4 shrink-0 transition-transform", isOpen && "rotate-180")}
                />
              </button>
                <div
                  className={clsx(
                    "ml-5 overflow-hidden transition-all duration-200 border-l border-primary-foreground/15 pl-3",
                    isOpen ? "max-h-96 mt-1.5" : "max-h-0"
                  )}
                >
                <div className="space-y-0.5 py-1.5">
                  {menu.childrens.map((child, i) => {
                    const ChildIcon = child.icon;
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={i}
                        href={child.href}
                        onClick={onLinkClick}
                        className={clsx(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-primary-foreground/10",
                          isChildActive && activeClass
                        )}
                      >
                        <ChildIcon className="w-4 h-4 shrink-0 opacity-80" />
                        {child.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }

        return (
            <Link
            key={index}
            href={menu.href}
            onClick={onLinkClick}
            className={clsx(linkClass, isActive && activeClass)}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span>{menu.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

interface ClientSiderProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ClientSider = ({ open = false, onOpenChange }: ClientSiderProps) => {
  return (
    <>
      {/* Desktop: fixed sidebar */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-screen flex-col w-64 bg-primary border-r border-primary-foreground/10 z-30"
      >
        <div className="p-5 shrink-0">
          <div className="flex items-center gap-3">
            <Avatar className="w-11 h-11 ring-2 ring-primary-foreground/20 shrink-0">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-primary-foreground truncate">
                Hao Flow
              </h2>
              <p className="text-xs text-primary-foreground/60 truncate">
                Life Operating System
              </p>
            </div>
          </div>
        </div>
        <Separator className="bg-primary-foreground/10 mx-5 shrink-0" />
        <div className="p-4 flex-1 overflow-hidden flex flex-col">
          <NavContent />
        </div>
        <div className="p-4 text-xs text-primary-foreground/50 text-center shrink-0">
          © {new Date().getFullYear()} Hao Flow
        </div>
      </aside>

      {/* Mobile: Sheet */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="left"
          className="w-[min(18rem,85vw)] p-0 flex flex-col bg-primary text-primary-foreground border-primary-foreground/10 [&_button]:text-primary-foreground [&_button:hover]:bg-primary-foreground/10"
          showCloseButton={true}
        >
          <div className="p-5 pb-2">
            <div className="flex items-center gap-3">
              <Avatar className="w-11 h-11 ring-2 ring-primary-foreground/20 shrink-0">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-primary-foreground truncate">
                  Hao Flow
                </h2>
                <p className="text-xs text-primary-foreground/60 truncate">
                  Life Operating System
                </p>
              </div>
            </div>
          </div>
          <Separator className="bg-primary-foreground/10 shrink-0" />
          <div className="p-4 flex-1 overflow-y-auto">
            <NavContent onLinkClick={() => onOpenChange?.(false)} />
          </div>
          <div className="p-4 text-xs text-primary-foreground/50 text-center shrink-0">
            © {new Date().getFullYear()} Hao Flow
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ClientSider;
