"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown, CreditCard } from "lucide-react";
import { Transaction } from "@/features/transaction/interfaces/transaction.interface";
import { TransactionSource, TransactionType } from "@/common/constants/app.constant";
import TransactionStatCard from "@/features/transaction/components/TransactionStatCard";
import TransactionHeader from "@/features/transaction/components/TransactionHeader";
import TransactionFilter from "@/features/transaction/components/TransactionFilter";
import TransactionEmptyRow from "@/features/transaction/components/TransactionEmptyRow";
import TransactionRow from "@/features/transaction/components/TransactionRow";
import TransactionDateRow from "@/features/transaction/components/TransactionDateRow";
import { useTransactions, useTransactionStats } from "@/features/transaction/transaction.hook";
import { useState, useMemo, Fragment } from "react";
import { endOfMonth, endOfWeek, format, setDate, startOfMonth, startOfWeek } from "date-fns";
import TransactionRowSkeleton from "@/features/transaction/components/Skeletons/TransactionRowSkeleton";
import { formatVnd } from "@/lib/format";
import TransactionCreate from "@/features/transaction/components/TransactionCreate";


interface AmountRange {
  minAmount?: number;
  maxAmount?: number;
}


const groupByDate = (items: Transaction[]): Record<string, Transaction[]> =>
  items.reduce<Record<string, Transaction[]>>((acc, tx) => {
    const key = format(new Date(tx.transactionDate), "yyyy-MM-dd");
    (acc[key] ??= []).push(tx);
    return acc;
  }, {});


const TransactionPage = () => {
  const [merchant, setMerchant] = useState<string>();
  const [type, setType] = useState<TransactionType>();
  const [source, setSource] = useState<TransactionSource>();
  const [accountId, setAccountId] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();
  const [rangeAmount, setRangeAmount] = useState<AmountRange>({});
  const [dateFrom, setDateFrom] = useState<Date>(startOfMonth(new Date()));
  const [dateTo, setDateTo] = useState<Date>(endOfMonth(new Date()));

  const [openCreate, setOpenCreate] = useState<boolean>(false)

  const { data, isLoading } = useTransactions({
    merchant,
    type,
    source,
    accountId,
    categoryId,
    minAmount: rangeAmount.minAmount,
    maxAmount: rangeAmount.maxAmount,
    dateFrom: dateFrom,
    dateTo: dateTo

  });

  const {data:stats} = useTransactionStats()

  const grouped = useMemo(
    () => groupByDate(data?.items ?? []),
    [data?.items],
  );

  const isEmpty = !data?.items.length;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <TransactionHeader 
        setOpen={setOpenCreate}
      />

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">
        <div className="flex gap-3 flex-wrap">
          <TransactionStatCard label="Số dư"     value={formatVnd(stats?.netBalance)} sub="tháng này"    icon={Wallet}       trend="+12.4%" trendUp />
          <TransactionStatCard label="Thu nhập"  value={formatVnd(stats?.totalIncome)} sub="giao dịch"    icon={TrendingUp}   trend="+8%"    trendUp />
          <TransactionStatCard label="Chi tiêu"  value={formatVnd(stats?.totalExpense)} sub="giao dịch"    icon={TrendingDown} trend="-3%"    trendUp={false} />
          <TransactionStatCard label="Tài khoản" value={stats?.totalAccount}  sub="đang kết nối" icon={CreditCard} />
        </div>

        <TransactionFilter
          setMerchant={setMerchant}
          setAccountId={setAccountId}
          setType={setType}
          setSource={setSource}
          source={source}
          type={type}
          setRangeAmount={setRangeAmount}
          rangeAmount={rangeAmount}
          setCategoryId={setCategoryId}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          dateTo={dateTo}
        />

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
                isLoading 
                ? 
                Array.from({length: 8}).map((item, i) => (
                  <TransactionRowSkeleton key={i}/>
                ))
                :
                isEmpty ? (
                  <TransactionEmptyRow />
                ) : (
                  Object.entries(grouped).map(([dateKey, txs]) => (
                    <Fragment key={dateKey}>
                      <TransactionDateRow date={new Date(dateKey)} count={txs.length} />
                      {txs.map((tx) => (
                        <TransactionRow key={tx.id} transaction={tx} />
                      ))}
                    </Fragment>
                  ))
                )
              }
            </TableBody>
          </Table>

          <div className="border-t border-border/40 bg-muted/20 px-5 py-2.5 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{data?.items.length ?? 0}</span> giao dịch
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
        {/* dialog  */}
        <TransactionCreate 
          open={openCreate}
          setOpen={setOpenCreate}
        />
      </div>


    </div>
  );
};

export default TransactionPage;