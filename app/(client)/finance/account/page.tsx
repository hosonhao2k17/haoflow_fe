"use client";

import AccountHeader from "@/features/account/components/AccountHeader";
import AccountSummary from "@/features/account/components/AccountSummary";
import AccountCard from "@/features/account/components/AccountCard";
import { Plus } from "lucide-react";
import AccountFilterTab from "@/features/account/components/AccountFilterTab";
import { useAccounts } from "@/features/account/account.hook";
import { Account } from "@/features/account/interfaces/account.interface";
import { AccountStatus } from "@/common/constants/finance.constant";
import { useState } from "react";
import AccountCreate from "@/features/account/components/AccountCreate";



const AccountPage = () => {
  

    const {data} = useAccounts({})
    const [openCreate, setOpenCreate] = useState<boolean>(false);

    const accounts: Account[] = data?.items ?? []
    const totalBalance = accounts.reduce((total, item) => total + item.balance ,0)
    const totalActive = accounts.filter((item) => item.status === AccountStatus.ACTIVE).length 
    return (
        <div className="min-h-screen">
            <div className="max-w-6xl p-5">

                {/* Header */}
                <AccountHeader 
                    setOpenCreate={setOpenCreate}
                />

                {/* Summary */}
                <AccountSummary 
                    totalBalance={totalBalance}
                    totalActive={totalActive}
                />

                {/* Filter tabs */}
                <AccountFilterTab />

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        data?.items.map((item: Account) => (
                            <AccountCard  
                                account={item}
                            />
                        ))
                    }
            

                    {/* Add placeholder */}
                    <button
                        className="rounded-2xl border-2 border-dashed border-border bg-transparent cursor-pointer min-h-[168px] flex flex-col items-center justify-center gap-2.5 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all group">
                        <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus size={18} />
                        </div>
                        <span className="text-xs font-semibold">Thêm tài khoản</span>
                    </button>
                </div>

            </div>

            {/* Dialog  */}
            <AccountCreate 
                open={openCreate}
                setOpen={setOpenCreate}
            />
        </div>
    );
};

export default AccountPage;