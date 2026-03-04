"use client";

import AccountHeader from "@/features/account/components/AccountHeader";
import AccountSummary from "@/features/account/components/AccountSummary";
import AccountCard from "@/features/account/components/AccountCard";
import { Plus } from "lucide-react";
import AccountFilterTab from "@/features/account/components/AccountFilterTab";








// ─── Page ─────────────────────────────────────────────────────────────────────

const AccountPage = () => {
  

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl p-5">

        {/* Header */}
        <AccountHeader />

        {/* Summary */}
        <AccountSummary />

        {/* Filter tabs */}
        <AccountFilterTab />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AccountCard  />
    

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
    </div>
  );
};

export default AccountPage;