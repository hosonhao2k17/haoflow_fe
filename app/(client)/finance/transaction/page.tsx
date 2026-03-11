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
import { ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Building2,
  ReceiptText,
  SlidersHorizontal,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Transaction } from "@/features/transaction/interfaces/transaction.interface";
import { Account } from "@/features/account/interfaces/account.interface";
import { AccountType } from "@/common/constants/finance.constant";
import { TransactionType } from "@/common/constants/app.constant";
import TransactionStatCard from "@/features/transaction/components/TransactionStatCard";
import TransactionHeader from "@/features/transaction/components/TransactionHeader";
import TransactionFilter from "@/features/transaction/components/TransactionFilter";
import TransactionEmptyRow from "@/features/transaction/components/TransactionEmptyRow";
import { useTransactions } from "@/features/transaction/transaction.hook";
import TransactionRow from "@/features/transaction/components/TransactionRow";


const labelDate = (d: string) => {
  const today = new Date().toISOString().slice(0, 10);
  const yest  = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (d === today) return "Hôm nay";
  if (d === yest)  return "Hôm qua";
  return new Date(d).toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" });
};




const TransactionPage = () => {

  const {data} = useTransactions({});




  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* ── Sticky header ── */}
      <TransactionHeader />
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">

        {/* ── Stat cards ── */}
        <div className="flex gap-3 flex-wrap">
          <TransactionStatCard label="Số dư"     value="0 ₫" sub="tháng này"    icon={Wallet}       trend="+12.4%" trendUp />
          <TransactionStatCard label="Thu nhập"  value="0 ₫" sub="giao dịch"    icon={TrendingUp}   trend="+8%"   trendUp />
          <TransactionStatCard label="Chi tiêu"  value="0 ₫" sub="giao dịch"    icon={TrendingDown} trend="-3%"   trendUp={false} />
          <TransactionStatCard label="Tài khoản" value="0"   sub="đang kết nối" icon={CreditCard} />
        </div>
        {/* ── Filters ── */}
        <TransactionFilter />
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
              {
                data?.items.length === 0 
                ?
                <TransactionEmptyRow />
                :
                data?.items.map((item: Transaction) => (
                  <TransactionRow 
                    transaction={item}
                  />
                ))
              }
          
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