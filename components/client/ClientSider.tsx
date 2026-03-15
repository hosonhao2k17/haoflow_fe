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
  User,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import clsx from "clsx";

type MenuItem =
  | { name: string; href: string; icon: typeof House }
  | {
      name: string;
      href: string;
      icon: typeof BookCheck;
      childrens: { name: string; href: string; icon: typeof ListTodo }[];
    };

const SIDER_SECTIONS: { label: string; items: MenuItem[] }[] = [
  {
    label: "Chính",
    items: [{ name: "Trang chủ", href: "/", icon: House }],
  },
  {
    label: "Kế hoạch",
    items: [
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
    ],
  },
  {
    label: "Tài chính",
    items: [
      {
        name: "Tài chính",
        href: "/finance",
        icon: Wallet,
        childrens: [
          { name: "Tài khoản", href: "/finance/account", icon: Wallet },
          { name: "Danh mục tài chính", href: "/finance/transaction-category", icon: Captions },
          { name: "Giao dịch", href: "/finance/transaction", icon: ArrowLeftRight },
          { name: "Ngân sách", href: "/finance/budget", icon: LandmarkIcon },
          { name: "Tổng quan", href: "/finance/overview", icon: ChartNoAxesCombined },
        ],
      },
    ],
  },
  {
    label: "Cá nhân",
    items: [
      { name: "Thông báo", href: "/notifications", icon: Bell },
      { name: "Hồ sơ", href: "/profiles", icon: User },
    ],
  },
];

interface NavContentProps {
  onLinkClick?: () => void;
}

function NavContent({ onLinkClick }: NavContentProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const activeParent = SIDER_SECTIONS.flatMap((s) => s.items).find(
      (menu): menu is MenuItem & { childrens: { href: string }[] } =>
        "childrens" in menu && menu.childrens?.some((child) => pathname.startsWith(child.href))
    );
    if (activeParent) setOpenMenu(activeParent.name);
  }, [pathname]);

  const linkClass =
    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-primary-foreground/10";
  const activeClass = "bg-primary-foreground/15 text-primary-foreground";

  return (
    <nav className="flex-1 min-w-0 text-primary-foreground overflow-y-auto overflow-x-hidden flex flex-col gap-1">
      {SIDER_SECTIONS.map((section, sectionIndex) => (
        <div key={section.label} className="flex flex-col gap-1">
          {sectionIndex > 0 && (
            <Separator className="bg-primary-foreground/15 my-1.5 mx-1" />
          )}
          <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50">
            {section.label}
          </p>
          <div className="space-y-0.5">
            {section.items.map((menu, index) => {
              const Icon = menu.icon;
              const isActive =
                pathname === menu.href || pathname.startsWith(menu.href + "/");
              const isOpen = openMenu === menu.name;

              if ("childrens" in menu && menu.childrens) {
                return (
                  <div key={`${section.label}-${index}`}>
                    <button
                      type="button"
                      onClick={() => setOpenMenu(isOpen ? null : menu.name)}
                      className={clsx(
                        "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-primary-foreground/10 min-w-0",
                        isActive && activeClass
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Icon className="w-4 h-4 shrink-0 opacity-90" />
                        <span className="truncate">{menu.name}</span>
                      </div>
                      <ChevronDown
                        className={clsx(
                          "w-3.5 h-3.5 shrink-0 transition-transform opacity-70",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={clsx(
                        "ml-4 overflow-hidden transition-all duration-200 border-l border-primary-foreground/15 pl-2.5",
                        isOpen ? "max-h-96 mt-1" : "max-h-0"
                      )}
                    >
                      <div className="space-y-0.5 py-1">
                        {menu.childrens.map((child, i) => {
                          const ChildIcon = child.icon;
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={i}
                              href={child.href}
                              onClick={onLinkClick}
                              className={clsx(
                                "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-colors hover:bg-primary-foreground/10 min-w-0",
                                isChildActive && activeClass
                              )}
                            >
                              <ChildIcon className="w-3.5 h-3.5 shrink-0 opacity-75" />
                              <span className="truncate">{child.name}</span>
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
                  key={`${section.label}-${index}`}
                  href={menu.href}
                  onClick={onLinkClick}
                  className={clsx(linkClass, "px-3 py-2.5 min-w-0", isActive && activeClass)}
                >
                  <Icon className="w-4 h-4 shrink-0 opacity-90" />
                  <span className="truncate">{menu.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
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
        className="hidden md:flex fixed left-0 top-0 h-screen flex-col w-64 min-w-64 max-w-64 bg-primary border-r border-primary-foreground/10 z-30 overflow-x-hidden"
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
        <div className="p-4 flex-1 overflow-hidden flex flex-col min-w-0">
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
          <div className="p-4 flex-1 overflow-y-auto overflow-x-hidden min-w-0">
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
