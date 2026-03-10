"use client";

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
import { Sheet, SheetContent } from "@/components/ui/sheet";
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
import { Transaction } from "@/features/transaction/interfaces/transaction.interface";
import { Account } from "@/features/account/interfaces/account.interface";
import { AccountType } from "@/common/constants/finance.constant";
import { TransactionType } from "@/common/constants/app.constant";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const fmtShort = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M ₫`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K ₫`;
  return `${n} ₫`;
};

const fmt = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });

const fmtDateShort = (s: string) =>
  new Date(s).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });

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
    [TransactionType.INCOME]:   { label: "Thu nhập",     cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    [TransactionType.EXPENSE]:  { label: "Chi tiêu",     cls: "bg-rose-50 text-rose-700 border-rose-200"          },
    [TransactionType.TRANSFER]: { label: "Chuyển khoản", cls: "bg-sky-50 text-sky-700 border-sky-200"             },
  }[type];
  return (
    <Badge variant="outline" className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border", cfg.cls)}>
      {cfg.label}
    </Badge>
  );
};

const AccountChip = ({ account }: { account: Account }) => (
  <div className="flex items-center gap-1.5">
    {account.type === AccountType.BANK
      ? <Building2  size={11} className="text-primary shrink-0" />
      : account.type === AccountType.WALLET
      ? <Wallet     size={11} className="text-primary shrink-0" />
      : <CreditCard size={11} className="text-primary shrink-0" />}
    <span className="text-xs font-semibold text-foreground/80">{account.title}</span>
  </div>
);

const StatCard = ({
  label, value, sub, icon: Icon, trend, trendUp,
}: {
  label: string; value: string; sub: string;
  icon: React.ElementType; trend?: string; trendUp?: boolean;
}) => (
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
// Detail Sheet
// ─────────────────────────────────────────────────────────────────────────────

const TransactionDetail = ({
  txn, onClose,
}: {
  txn: Transaction;
  onClose: () => void;
}) => (
  <Sheet open onOpenChange={onClose}>
    <SheetContent className="w-[380px] sm:w-[420px] p-0 flex flex-col overflow-hidden">

      {/* Hero */}
      <div className="bg-primary px-6 pt-10 pb-7 text-primary-foreground relative shrink-0">
        <Button
          variant="ghost" size="icon" onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 rounded-full text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/15"
        >
          <X size={15} />
        </Button>

        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-4">
          {txn.category?.icon}
        </div>

        <p className="text-primary-foreground/60 text-xs font-semibold uppercase tracking-wider mb-1">
          {txn.merchant}
        </p>
        <p className={cn(
          "text-[36px] font-bold tracking-tight font-mono leading-none",
          txn.type === TransactionType.INCOME ? "text-emerald-300" : "text-primary-foreground"
        )}>
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

      {/* Fields */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <DetailField icon={AlignLeft}    label="Mô tả"          value={txn.description || "—"} />
        <Separator />
        <DetailField icon={Tag}          label="Danh mục"       value={
          <span className="font-semibold">{txn.category?.icon} {txn.category?.name}</span>
        } />
        <DetailField icon={Wallet}       label="Tài khoản"      value={
          <div className="space-y-0.5">
            <p className="font-semibold text-sm">{txn.account?.title}</p>
            <AccountChip account={txn.account} />
          </div>
        } />
        <DetailField icon={CalendarDays} label="Ngày giao dịch" value={fmtDate(txn.transactionDate)} />
        <DetailField icon={ReceiptText}  label="Mã giao dịch"   value={
          <span className="font-mono text-xs bg-muted px-2 py-1 rounded-md">#{txn.id?.toUpperCase()}</span>
        } />

        <Separator />

        <div className="flex gap-2 pt-1 pb-2">
          <Button variant="outline"     className="flex-1 rounded-xl h-9 text-sm">Chỉnh sửa</Button>
          <Button variant="destructive" className="flex-1 rounded-xl h-9 text-sm">Xoá</Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

const TransactionPage = () => {
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
              <p className="text-[10px] text-muted-foreground">Finance › Transactions</p>
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
          <StatCard label="Số dư"     value="0 ₫" sub="tháng này"    icon={Wallet}       trend="+12.4%" trendUp />
          <StatCard label="Thu nhập"  value="0 ₫" sub="giao dịch"    icon={TrendingUp}   trend="+8%"   trendUp />
          <StatCard label="Chi tiêu"  value="0 ₫" sub="giao dịch"    icon={TrendingDown} trend="-3%"   trendUp={false} />
          <StatCard label="Tài khoản" value="0"   sub="đang kết nối" icon={CreditCard} />
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm giao dịch, merchant..."
              className="pl-8 h-9 rounded-xl border-border/60 bg-white text-sm shadow-none"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/40">
            {(["Tất cả", "Thu", "Chi", "Chuyển"]).map((label, i) => (
              <button
                key={label}
                className={cn(
                  "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
                  i === 0
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/80"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <Select defaultValue="ALL">
            <SelectTrigger className="w-[185px] h-9 rounded-xl border-border/60 bg-white text-sm shadow-none gap-1.5">
              <SlidersHorizontal size={13} className="text-muted-foreground shrink-0" />
              <SelectValue placeholder="Tài khoản" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL">Tất cả tài khoản</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ── Table ── */}
        <Card className="shadow-none border border-border/60 rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border/50">
                <TableHead className="pl-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest w-[32%]">Giao dịch</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest w-[19%]">Tài khoản</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest w-[16%]">Loại</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest w-[12%]">Ngày</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right pr-5 w-[16%]">Số tiền</TableHead>
                <TableHead className="w-[5%]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Empty state */}
              <TableRow>
                <TableCell colSpan={6} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Search size={28} className="opacity-30" />
                    <p className="text-sm">Không tìm thấy giao dịch</p>
                  </div>
                </TableCell>
              </TableRow>

              {/* Row template — dùng khi map data */}
              {/* 
              <TableRow className="cursor-pointer border-border/30 hover:bg-primary/[0.025] transition-colors group">
                <TableCell className="pl-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-lg shrink-0">
                      {txn.category?.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-foreground truncate leading-snug">{txn.merchant}</p>
                      <p className="text-xs text-muted-foreground truncate">{txn.description || txn.category?.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <AccountChip account={txn.account} />
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5 truncate">{txn.account?.title}</p>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-1.5">
                    {txn.type === TransactionType.INCOME   && <ArrowDownLeft  size={13} className="text-emerald-600 shrink-0" />}
                    {txn.type === TransactionType.EXPENSE  && <ArrowUpRight   size={13} className="text-rose-500 shrink-0"    />}
                    {txn.type === TransactionType.TRANSFER && <ArrowLeftRight size={13} className="text-sky-500 shrink-0"     />}
                    <TypeBadge type={txn.type} />
                  </div>
                  {txn.isRecurring && (
                    <div className="flex items-center gap-1 mt-1">
                      <RefreshCw size={9} className="text-amber-500" />
                      <span className="text-[10px] text-amber-600 font-semibold">Định kỳ</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="py-3 text-xs text-muted-foreground">
                  {fmtDateShort(txn.transactionDate)}
                </TableCell>
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
                <TableCell className="py-3 pr-3">
                  <ChevronRight size={14} className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                </TableCell>
              </TableRow>
              */}
            </TableBody>
          </Table>

          {/* Table footer */}
          <div className="border-t border-border/40 bg-muted/20 px-5 py-2.5 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">0</span> giao dịch
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-muted-foreground">
                Thu: <span className="text-emerald-600 font-bold">0 ₫</span>
              </span>
              <span className="text-muted-foreground">
                Chi: <span className="text-rose-600 font-bold">0 ₫</span>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TransactionPage;