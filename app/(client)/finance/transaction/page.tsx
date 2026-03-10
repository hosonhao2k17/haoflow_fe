"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Wallet,
  ChevronRight,
  X,
  CreditCard,
  Building2,
  CalendarDays,
  Tag,
  AlignLeft,
  ReceiptText,
  SlidersHorizontal,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

enum TransactionType {
  INCOME   = "INCOME",
  EXPENSE  = "EXPENSE",
  TRANSFER = "TRANSFER",
}

interface TransactionCategory {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

interface Account {
  id: string;
  name: string;
  bankName: string;
  lastFour: string;
  type: "checking" | "savings" | "credit";
}

interface Transaction {
  id: string;
  category: TransactionCategory;
  account: Account;
  type: TransactionType;
  amount: number;
  description?: string;
  merchant: string;
  transactionDate: string;
  isRecurring: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────────────────────────────────────

const accounts: Account[] = [
  { id: "acc-1", name: "Tài khoản chính",     bankName: "Techcombank", lastFour: "4821", type: "checking" },
  { id: "acc-2", name: "Tài khoản tiết kiệm", bankName: "VPBank",      lastFour: "3390", type: "savings"  },
  { id: "acc-3", name: "Thẻ tín dụng",        bankName: "VIB",         lastFour: "7712", type: "credit"   },
];

const categories: TransactionCategory[] = [
  { id: "c1", name: "Ăn uống",   icon: "🍜", bgColor: "bg-orange-100", textColor: "text-orange-600"  },
  { id: "c2", name: "Di chuyển", icon: "🚗", bgColor: "bg-blue-100",   textColor: "text-blue-600"    },
  { id: "c3", name: "Giải trí",  icon: "🎬", bgColor: "bg-purple-100", textColor: "text-purple-600"  },
  { id: "c4", name: "Mua sắm",   icon: "🛍️", bgColor: "bg-pink-100",   textColor: "text-pink-600"    },
  { id: "c5", name: "Lương",     icon: "💼", bgColor: "bg-emerald-100",textColor: "text-emerald-600" },
  { id: "c6", name: "Sức khoẻ",  icon: "🏥", bgColor: "bg-red-100",    textColor: "text-red-600"     },
  { id: "c7", name: "Tiện ích",  icon: "⚡", bgColor: "bg-yellow-100", textColor: "text-yellow-600"  },
  { id: "c8", name: "Đầu tư",    icon: "📈", bgColor: "bg-cyan-100",   textColor: "text-cyan-600"    },
];

const transactions: Transaction[] = [
  { id: "t01", category: categories[4], account: accounts[0], type: TransactionType.INCOME,   amount: 45000000, description: "Lương tháng 3",      merchant: "Anthropic Vietnam",    transactionDate: "2025-03-10", isRecurring: true  },
  { id: "t02", category: categories[0], account: accounts[2], type: TransactionType.EXPENSE,  amount: 185000,   description: "Ăn trưa cùng team",  merchant: "Cơm Tấm Bà Ghẻ",      transactionDate: "2025-03-10", isRecurring: false },
  { id: "t03", category: categories[7], account: accounts[1], type: TransactionType.EXPENSE,  amount: 5000000,  description: "Nạp tiền đầu tư",    merchant: "Finhay",               transactionDate: "2025-03-09", isRecurring: true  },
  { id: "t04", category: categories[1], account: accounts[0], type: TransactionType.EXPENSE,  amount: 85000,    description: "Grab đi làm",         merchant: "Grab",                 transactionDate: "2025-03-09", isRecurring: false },
  { id: "t05", category: categories[2], account: accounts[2], type: TransactionType.EXPENSE,  amount: 330000,   description: "Xem phim + bắp nước", merchant: "CGV Vincom",           transactionDate: "2025-03-08", isRecurring: false },
  { id: "t06", category: categories[3], account: accounts[2], type: TransactionType.EXPENSE,  amount: 1250000,  description: "Giày mới",            merchant: "Nike Store Đồng Khởi", transactionDate: "2025-03-08", isRecurring: false },
  { id: "t07", category: categories[5], account: accounts[0], type: TransactionType.EXPENSE,  amount: 450000,   description: "Khám nha khoa",       merchant: "Nha Khoa Thẩm Mỹ",    transactionDate: "2025-03-07", isRecurring: false },
  { id: "t08", category: categories[6], account: accounts[0], type: TransactionType.EXPENSE,  amount: 220000,   description: "Hoá đơn điện",        merchant: "EVN HCM",              transactionDate: "2025-03-06", isRecurring: true  },
  { id: "t09", category: categories[0], account: accounts[2], type: TransactionType.EXPENSE,  amount: 95000,    description: "Cà phê buổi sáng",    merchant: "The Coffee House",     transactionDate: "2025-03-06", isRecurring: false },
  { id: "t10", category: categories[4], account: accounts[1], type: TransactionType.INCOME,   amount: 8500000,  description: "Dự án freelance",     merchant: "Client ABC",           transactionDate: "2025-03-05", isRecurring: false },
  { id: "t11", category: categories[3], account: accounts[2], type: TransactionType.EXPENSE,  amount: 2100000,  description: "Phụ kiện điện thoại", merchant: "CellphoneS",           transactionDate: "2025-03-05", isRecurring: false },
  { id: "t12", category: categories[1], account: accounts[0], type: TransactionType.TRANSFER, amount: 3000000,  description: "Chuyển tiết kiệm",    merchant: "VPBank",               transactionDate: "2025-03-04", isRecurring: false },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const fmtShort = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M ₫`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K ₫`;
  return `${n} ₫`;
};

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });

const groupByDate = (txns: Transaction[]) =>
  txns.reduce((acc: Record<string, Transaction[]>, t) => {
    (acc[t.transactionDate] ||= []).push(t);
    return acc;
  }, {});

const labelDate = (d: string) => {
  const today = new Date().toISOString().slice(0, 10);
  const yest  = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (d === today) return "Hôm nay";
  if (d === yest)  return "Hôm qua";
  return new Date(d).toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" });
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

const TypeBadge = ({ type }: { type: TransactionType }) => {
  const cfg = {
    INCOME:   { label: "Thu nhập",     cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    EXPENSE:  { label: "Chi tiêu",     cls: "bg-rose-50 text-rose-700 border-rose-200"          },
    TRANSFER: { label: "Chuyển khoản", cls: "bg-sky-50 text-sky-700 border-sky-200"             },
  }[type];
  return (
    <Badge variant="outline" className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border", cfg.cls)}>
      {cfg.label}
    </Badge>
  );
};

const AccountChip = ({ account }: { account: Account }) => (
  <div className="flex items-center gap-1.5">
    {account.type === "credit"
      ? <CreditCard size={11} className="text-primary shrink-0" />
      : <Building2  size={11} className="text-primary shrink-0" />}
    <span className="text-xs font-semibold text-foreground/80">{account.bankName}</span>
    <span className="text-xs text-muted-foreground">····{account.lastFour}</span>
  </div>
);

// Stat card
interface StatCardProps {
  label: string; value: string; sub: string;
  icon: React.ElementType; trend?: string; trendUp?: boolean;
}
const StatCard = ({ label, value, sub, icon: Icon, trend, trendUp }: StatCardProps) => (
  <Card className="flex-1 min-w-[150px] shadow-none border border-border/70 hover:border-primary/30 hover:shadow-md transition-all duration-200 rounded-2xl">
    <CardContent className="p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon size={15} className="text-primary" />
        </div>
      </div>
      <p className="text-[22px] font-bold text-foreground tracking-tight font-mono leading-none">{value}</p>
      <div className="flex items-center gap-1.5 mt-2">
        {trend && (
          <span className={cn("text-xs font-bold flex items-center gap-0.5",
            trendUp ? "text-emerald-600" : "text-rose-500")}>
            {trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trend}
          </span>
        )}
        <span className="text-xs text-muted-foreground">{sub}</span>
      </div>
    </CardContent>
  </Card>
);

// Detail sheet field
const DetailField = ({
  icon: Icon, label, value,
}: { icon: React.ElementType; label: string; value: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
      <Icon size={13} className="text-muted-foreground" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">{label}</p>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Transaction Detail Sheet
// ─────────────────────────────────────────────────────────────────────────────

const TransactionDetail = ({ txn, onClose }: { txn: Transaction; onClose: () => void }) => (
  <Sheet open onOpenChange={onClose}>
    <SheetContent className="w-[380px] sm:w-[420px] p-0 flex flex-col overflow-hidden">
      {/* Hero banner */}
      <div className="bg-primary px-6 pt-10 pb-7 text-primary-foreground relative shrink-0">
        <Button
          variant="ghost" size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 rounded-full text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/15"
        >
          <X size={15} />
        </Button>

        {/* Category icon */}
        <div className={cn("w-13 h-13 rounded-2xl flex items-center justify-center text-2xl mb-4 w-12 h-12", txn.category.bgColor)}>
          {txn.category.icon}
        </div>

        <p className="text-primary-foreground/60 text-xs font-semibold uppercase tracking-wider mb-1">
          {txn.merchant}
        </p>
        <p className={cn("text-[36px] font-bold tracking-tight font-mono leading-none",
          txn.type === TransactionType.INCOME ? "text-emerald-300" : "text-primary-foreground")}>
          {txn.type === TransactionType.INCOME ? "+" : txn.type === TransactionType.EXPENSE ? "−" : "⇄"}
          {fmt(txn.amount)}
        </p>

        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <TypeBadge type={txn.type} />
          {txn.isRecurring && (
            <Badge variant="outline" className="bg-white/10 text-primary-foreground/80 border-white/20 text-[11px] gap-1 rounded-full">
              <RefreshCw size={9} /> Định kỳ
            </Badge>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <DetailField icon={AlignLeft}    label="Mô tả"         value={txn.description || "—"} />
        <Separator />
        <DetailField icon={Tag}          label="Danh mục"      value={
          <span className={cn("font-semibold", txn.category.textColor)}>
            {txn.category.icon} {txn.category.name}
          </span>
        } />
        <DetailField icon={CreditCard}   label="Tài khoản"     value={
          <div className="space-y-0.5">
            <p className="font-semibold text-sm">{txn.account.name}</p>
            <AccountChip account={txn.account} />
          </div>
        } />
        <DetailField icon={CalendarDays} label="Ngày giao dịch" value={fmtDate(txn.transactionDate)} />
        <DetailField icon={ReceiptText}  label="Mã giao dịch"  value={
          <span className="font-mono text-xs bg-muted px-2 py-1 rounded-md">#{txn.id.toUpperCase()}</span>
        } />

        <Separator />

        <div className="flex gap-2 pt-1 pb-2">
          <Button variant="outline" className="flex-1 rounded-xl h-9 text-sm" size="sm">
            Chỉnh sửa
          </Button>
          <Button variant="destructive" className="flex-1 rounded-xl h-9 text-sm" size="sm">
            Xoá
          </Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export default function TransactionPage() {
  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | TransactionType>("ALL");
  const [acctFilter, setAcctFilter] = useState("ALL");
  const [selected,   setSelected]   = useState<Transaction | null>(null);

  const totalIncome  = useMemo(() =>
    transactions.filter(t => t.type === TransactionType.INCOME).reduce((s, t) => s + t.amount, 0), []);
  const totalExpense = useMemo(() =>
    transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((s, t) => s + t.amount, 0), []);
  const balance = totalIncome - totalExpense;

  const filtered = useMemo(() =>
    transactions.filter(t => {
      const q = search.toLowerCase();
      return (
        (t.merchant.toLowerCase().includes(q) || (t.description ?? "").toLowerCase().includes(q)) &&
        (typeFilter === "ALL" || t.type === typeFilter) &&
        (acctFilter === "ALL" || t.account.id === acctFilter)
      );
    }), [search, typeFilter, acctFilter]);

  const grouped     = useMemo(() => groupByDate(filtered), [filtered]);
  const sortedDates = useMemo(
    () => Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()),
    [grouped]
  );

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-30 border-b border-border/50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <ReceiptText size={15} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">Giao dịch</h1>
              <p className="text-[10px] text-muted-foreground">Tháng 3 · 2025</p>
            </div>
          </div>
          <Button size="sm" className="rounded-xl gap-1.5 h-8 text-xs px-3">
            <Plus size={13} /> Thêm giao dịch
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">

        {/* ── Stat cards ── */}
        <div className="flex gap-3 flex-wrap">
          <StatCard label="Số dư"    value={fmtShort(balance)}       sub="tháng này"   icon={Wallet}       trend="+12.4%" trendUp />
          <StatCard label="Thu nhập" value={fmtShort(totalIncome)}   sub="2 giao dịch" icon={TrendingUp}   trend="+8%"   trendUp />
          <StatCard label="Chi tiêu" value={fmtShort(totalExpense)}  sub="8 giao dịch" icon={TrendingDown} trend="-3%"   trendUp={false} />
          <StatCard label="Tài khoản" value={`${accounts.length}`}   sub="đang kết nối" icon={CreditCard} />
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm giao dịch, merchant..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-9 rounded-xl border-border/60 bg-white text-sm shadow-none"
            />
          </div>

          {/* Type toggle group */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/40">
            {(["ALL", "INCOME", "EXPENSE", "TRANSFER"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={cn(
                  "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
                  typeFilter === t
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/80"
                )}
              >
                {t === "ALL" ? "Tất cả" : t === "INCOME" ? "Thu" : t === "EXPENSE" ? "Chi" : "Chuyển"}
              </button>
            ))}
          </div>

          {/* Account select */}
          <Select value={acctFilter} onValueChange={setAcctFilter}>
            <SelectTrigger className="w-[185px] h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-1.5">
              <SlidersHorizontal size={13} className="text-muted-foreground shrink-0" />
              <SelectValue placeholder="Tài khoản" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL">Tất cả tài khoản</SelectItem>
              {accounts.map(a => (
                <SelectItem key={a.id} value={a.id}>
                  <div className="flex items-center gap-2">
                    {a.type === "credit" ? <CreditCard size={12} /> : <Building2 size={12} />}
                    {a.bankName} ···· {a.lastFour}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ── Table ── */}
        <Card className="shadow-none border border-border/60 rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border/50">
                <TableHead className="pl-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest w-[32%]">Giao dịch</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest w-[19%]">Tài khoản chi</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest w-[16%]">Loại</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest w-[12%]">Ngày</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right pr-5 w-[16%]">Số tiền</TableHead>
                <TableHead className="w-[5%]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedDates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Search size={28} className="opacity-30" />
                      <p className="text-sm">Không tìm thấy giao dịch</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : sortedDates.map(date => (
                <>
                  {/* Date divider row */}
                  <TableRow key={`d-${date}`} className="hover:bg-transparent border-0">
                    <TableCell colSpan={6} className="py-1.5 pl-5 pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                        {labelDate(date)}
                      </span>
                    </TableCell>
                  </TableRow>

                  {grouped[date].map((txn) => (
                    <TableRow
                      key={txn.id}
                      onClick={() => setSelected(txn)}
                      className="cursor-pointer border-border/30 hover:bg-primary/[0.025] transition-colors group"
                    >
                      {/* Merchant + desc */}
                      <TableCell className="pl-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0", txn.category.bgColor)}>
                            {txn.category.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-foreground truncate leading-snug">{txn.merchant}</p>
                            <p className="text-xs text-muted-foreground truncate">{txn.description || txn.category.name}</p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Account */}
                      <TableCell className="py-3">
                        <AccountChip account={txn.account} />
                        <p className="text-[10px] text-muted-foreground/60 mt-0.5 pl-[18px] truncate">
                          {txn.account.name}
                        </p>
                      </TableCell>

                      {/* Type */}
                      <TableCell className="py-3">
                        <div className="flex items-center gap-1.5">
                          {txn.type === TransactionType.INCOME  && <ArrowDownLeft  size={13} className="text-emerald-600 shrink-0" />}
                          {txn.type === TransactionType.EXPENSE  && <ArrowUpRight   size={13} className="text-rose-500 shrink-0"    />}
                          {txn.type === TransactionType.TRANSFER && <ArrowLeftRight size={13} className="text-sky-500 shrink-0"     />}
                          <TypeBadge type={txn.type} />
                        </div>
                        {txn.isRecurring && (
                          <div className="flex items-center gap-1 mt-1 ml-0.5">
                            <RefreshCw size={9} className="text-amber-500" />
                            <span className="text-[10px] text-amber-600 font-semibold">Định kỳ</span>
                          </div>
                        )}
                      </TableCell>

                      {/* Date */}
                      <TableCell className="py-3 text-xs text-muted-foreground">
                        {new Date(txn.transactionDate).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="py-3 text-right pr-5">
                        <span className={cn(
                          "font-bold font-mono text-[13px] tabular-nums",
                          txn.type === TransactionType.INCOME   && "text-emerald-600",
                          txn.type === TransactionType.EXPENSE  && "text-rose-600",
                          txn.type === TransactionType.TRANSFER && "text-sky-600",
                        )}>
                          {txn.type === TransactionType.INCOME ? "+" : txn.type === TransactionType.EXPENSE ? "−" : "⇄"}
                          {fmtShort(txn.amount)}
                        </span>
                      </TableCell>

                      {/* Arrow */}
                      <TableCell className="py-3 pr-3">
                        <ChevronRight size={14} className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>

          {/* Table footer */}
          {filtered.length > 0 && (
            <div className="border-t border-border/40 bg-muted/20 px-5 py-2.5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> giao dịch
              </span>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-muted-foreground">
                  Thu:{" "}
                  <span className="text-emerald-600 font-bold">
                    {fmtShort(filtered.filter(t => t.type === TransactionType.INCOME).reduce((s, t) => s + t.amount, 0))}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  Chi:{" "}
                  <span className="text-rose-600 font-bold">
                    {fmtShort(filtered.filter(t => t.type === TransactionType.EXPENSE).reduce((s, t) => s + t.amount, 0))}
                  </span>
                </span>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* ── Detail sheet ── */}
      {selected && <TransactionDetail txn={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}