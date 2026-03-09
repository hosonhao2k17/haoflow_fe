"use client"

import { TransactionCategoryType } from "@/common/constants/finance.constant";
import TransactionCategoryCard from "@/features/transaction-category/components/TransactionCategoryCard";
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface";
import { useTransactionCategories } from "@/features/transaction-category/transaction-category.hook";




const TransactionCategoryPage = () => {

  const {data} = useTransactionCategories()

  return (
  <div className="min-h-screen bg-background text-foreground px-8 py-8">

    {/* Header */}
    <div className="flex items-start justify-between mb-10">
      <div>
        <p className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground font-medium mb-2">
          Finance › Settings
        </p>
        <h1 className="text-[42px] font-extrabold leading-[1.05] tracking-tight text-foreground">
          Danh mục<br />Giao dịch
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5 font-light">
          Organize your income & expenses
        </p>
      </div>
      <button className="flex items-center gap-2 bg-primary text-primary-foreground rounded-2xl px-5 py-3 text-sm font-medium hover:-translate-y-0.5 hover:opacity-90 transition-all mt-2">
        <span className="text-lg leading-none">＋</span> New Category
      </button>
    </div>


    {/* Filter bar */}
    <div className="flex items-center gap-2 mb-7">
      {["All", "Income", "Expense"].map((f, i) => (
        <button
          key={f}
          className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-all ${
            i === 0
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-transparent border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {f}
        </button>
      ))}
      <div className="ml-auto flex items-center gap-2.5 bg-muted border border-border rounded-xl px-3.5 py-2 text-muted-foreground text-[13px]">
        <span>🔍</span>
        <span>Search categories…</span>
      </div>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {data?.items.map((cat: TransactionCategory) => <TransactionCategoryCard key={cat.id} cat={cat} />)}
    </div>
  </div>
)
}

export default TransactionCategoryPage;