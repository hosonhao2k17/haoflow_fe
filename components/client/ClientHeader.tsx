"use client";

import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Bell,
  Target,
  Wallet,
  Menu,
  User,
  Shield,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { RoleName } from "@/common/constants/app.constant";
import { useUserStore } from "@/store/user.store";
import { useLogout } from "@/features/auth/auth.hook";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

interface ClientHeaderProps {
  onMenuClick?: () => void;
}

const Chip = ({
  icon,
  label,
  value,
  valueClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15">
    <div className="shrink-0 opacity-80">{icon}</div>
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/60 truncate">
        {label}
      </p>
      <p
        className={cn(
          "text-sm font-semibold text-primary-foreground leading-tight truncate",
          valueClass
        )}
      >
        {value}
      </p>
    </div>
  </div>
);

const ClientHeader = ({ onMenuClick }: ClientHeaderProps) => {
  const profitUp = true;
  const { user } = useUserStore();
  const logout = useLogout();
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  const isAdmin = user?.role?.name === RoleName.ADMIN;

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      clearAuth();
      toast.success("Đăng xuất thành công");
      router.replace("/login");
    } catch {
      toast.error("Có lỗi khi đăng xuất");
    }
  };

  return (
    <header className="w-full max-w-full min-w-0 bg-primary text-primary-foreground sticky top-0 z-40 border-b border-primary-foreground/10 overflow-x-hidden">
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 sm:gap-4 min-w-0 max-w-full">
        {/* Left: Menu (mobile) + Stats — scroll ngang khi thiếu chỗ */}
        <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="md:hidden shrink-0 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary-foreground/10"
              aria-label="Mở menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-3 min-w-0 overflow-x-auto overflow-y-hidden scrollbar-none pb-0.5 [&>*]:shrink-0">
            <Chip
              icon={<CheckCircle2 className="w-4 h-4 text-primary-foreground/90" />}
              label="Task hôm nay"
              value="7 / 10"
            />
            <Chip
              icon={<Wallet className="w-4 h-4 text-primary-foreground/90" />}
              label="Số dư"
              value="12.500.000 đ"
            />
            <Chip
              icon={
                profitUp ? (
                  <TrendingUp className="w-4 h-4 text-primary-foreground/90" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-primary-foreground/90" />
                )
              }
              label="Lợi nhuận"
              value={profitUp ? "+20%" : "-20%"}
              valueClass={profitUp ? "text-primary-foreground" : "text-primary-foreground/80"}
            />
          </div>
        </div>

        {/* Right: Goal, Bell, User — luôn gọn trong viewport */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <div className="hidden lg:block w-32 xl:w-40 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-primary-foreground/60 flex items-center gap-1 truncate">
                <Target className="w-4 h-4 shrink-0" />
                Mục tiêu
              </span>
              <span className="text-xs font-semibold text-primary-foreground/80 shrink-0">68%</span>
            </div>
            <Progress
              value={68}
              className="h-1.5 bg-primary-foreground/15 [&>div]:bg-primary-foreground/70"
            />
          </div>

          <Separator
            orientation="vertical"
            className="h-8 bg-primary-foreground/15 hidden lg:block shrink-0"
          />

          <button
            type="button"
            className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center hover:bg-primary-foreground/10 relative"
            aria-label="Thông báo"
          >
            <Bell className="w-5 h-5 text-primary-foreground/80" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
          </button>

          <DropdownMenu>
            <div className="inline-flex shrink-0">
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2.5 py-1.5 pr-1.5 pl-1.5 rounded-xl hover:bg-primary-foreground/10 transition-colors min-w-0 outline-none"
                >
                <Avatar className="w-9 h-9 shrink-0 ring-2 ring-primary-foreground/20">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-sm bg-primary-foreground/20">
                    {user?.fullName?.slice(0, 2).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left min-w-0 max-w-[140px]">
                  <p className="text-sm font-semibold text-primary-foreground leading-tight truncate">
                    {user?.fullName ?? "User"}
                  </p>
                  <p className="text-xs text-primary-foreground/60 leading-tight truncate">
                    {user?.role?.title ?? "Active"}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent align="end" alignOffset={-8} sideOffset={6} className="min-w-[180px]">
              <DropdownMenuItem asChild>
                <Link href="/profiles" className="flex items-center gap-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  Hồ sơ
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <Shield className="w-4 h-4" />
                    Hồ sơ quản trị
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                variant="destructive"
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
