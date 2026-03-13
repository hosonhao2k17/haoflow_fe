"use client";

import AccountHeader from "@/features/account/components/AccountHeader";
import AccountSummary from "@/features/account/components/AccountSummary";
import AccountCard from "@/features/account/components/AccountCard";
import { Plus, Wallet } from "lucide-react";
import AccountFilterTab from "@/features/account/components/AccountFilterTab";
import { useAccounts } from "@/features/account/account.hook";
import { Account } from "@/features/account/interfaces/account.interface";
import { AccountStatus } from "@/common/constants/finance.constant";
import { useState } from "react";
import AccountCreate from "@/features/account/components/AccountCreate";
import AccountUpdate from "@/features/account/components/AccountUpdate";
import { Button } from "@/components/ui/button";

const AccountPage = () => {

  const { data } = useAccounts({})
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [account, setAccount] = useState<Account>();

  const accounts: Account[] = data?.items ?? []
  const totalBalance = accounts.reduce((total, item) => total + item.balance, 0)
  const totalActive = accounts.filter((item) => item.status === AccountStatus.ACTIVE).length

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-30 border-b border-border/50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Wallet size={15} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">Tài khoản</h1>
              <p className="text-[10px] text-muted-foreground">Finance › Accounts</p>
            </div>
          </div>
          <Button
            size="sm"
            className="rounded-xl gap-1.5 h-8 text-xs px-3"
            onClick={() => setOpenCreate(true)}
          >
            <Plus size={13} /> Thêm tài khoản
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">

        {/* Summary */}
        <AccountSummary
          totalBalance={totalBalance}
          totalActive={totalActive}
        />

        {/* Filter tabs */}
        <AccountFilterTab />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.items.map((item: Account) => (
            <AccountCard
              key={item.id}
              account={item}
              setAccount={setAccount}
              setOpenUpdate={setOpenUpdate}
            />
          ))}

          {/* Add placeholder */}
          <button
            onClick={() => setOpenCreate(true)}
            className="rounded-2xl border-2 border-dashed border-border bg-transparent cursor-pointer min-h-[168px] flex flex-col items-center justify-center gap-2.5 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={18} />
            </div>
            <span className="text-xs font-semibold">Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* ── Dialogs ── */}
      <AccountCreate
        open={openCreate}
        setOpen={setOpenCreate}
      />
      <AccountUpdate
        open={openUpdate}
        setOpen={setOpenUpdate}
        account={account}
      />
    </div>
  );
};

export default AccountPage;