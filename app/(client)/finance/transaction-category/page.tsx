"use client"

import { TransactionCategoryType } from "@/common/constants/finance.constant";
import AlertRemoveDialog from "@/components/common/AlertRemoveDialog";
import TransactionCategoryCard from "@/features/transaction-category/components/TransactionCategoryCard";
import TransactionCategoryCreate from "@/features/transaction-category/components/TransactionCategoryCreate";
import TransactionCategoryUpdate from "@/features/transaction-category/components/TransactionCategoryUpdate";
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface";
import { useDeleteTransactionCategory, useTransactionCategories } from "@/features/transaction-category/transaction-category.hook";
import { useState } from "react";
import { toast } from "sonner";




const TransactionCategoryPage = () => {

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [category, setCategory] = useState<TransactionCategory>();
  const [parentId, setParentId] = useState<string>();
  const [openRemove, setOpenRemove] = useState<boolean>(false);
  const {data} = useTransactionCategories()

  const removeTransactionCategory = useDeleteTransactionCategory()
  const handleRemove = () => {
    if(!category) {
      return;
    }
    removeTransactionCategory.mutate(category.id, {
      onSuccess: () => {
        toast.success("Xóa thành công")
      }
    })
  }
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
          Danh mục giao dịch 
        </p>
      </div>
      <button 
        onClick={() => setOpenCreate(true)}
        className="flex items-center gap-2 bg-primary text-primary-foreground rounded-2xl px-5 py-3 text-sm font-medium hover:-translate-y-0.5 hover:opacity-90 transition-all mt-2"
      >
        <span className="text-lg leading-none">＋</span> Thêm danh mục
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
        <span>Tìm danh mục</span>
      </div>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {data?.items.map((cat: TransactionCategory) => 
        <TransactionCategoryCard 
          key={cat.id} 
          cat={cat} 
          setOpenUpdate={setOpenUpdate}
          setCategory={setCategory}
          setOpenCreate={setOpenCreate}
          setParentId={setParentId}
          setOpenRemove={setOpenRemove}
      />)}
    </div>

    {/* dialog  */}
    <TransactionCategoryCreate 
      open={openCreate}
      setOpen={setOpenCreate}
      parentId={parentId}
    />
    <TransactionCategoryUpdate 
      open={openUpdate}
      setOpen={setOpenUpdate}
      transactionCategory={category}
    />
    <AlertRemoveDialog 
      title="Xóa bỏ danh mục"
      openConfirm={openRemove}
      setOpenConfirm={setOpenRemove}
      handleRemove={handleRemove}
    />
  </div>
)
}

export default TransactionCategoryPage;