"use client"

import { TransactionCategoryType } from "@/common/constants/finance.constant";
import AlertRemoveDialog from "@/components/common/AlertRemoveDialog";
import TransactionCategoryCard from "@/features/transaction-category/components/TransactionCategoryCard";
import TransactionCategoryCreate from "@/features/transaction-category/components/TransactionCategoryCreate";
import TransactionCategoryUpdate from "@/features/transaction-category/components/TransactionCategoryUpdate";
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface";
import { useDeleteTransactionCategory, useTransactionCategories } from "@/features/transaction-category/transaction-category.hook";
import { Plus, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const TransactionCategoryPage = () => {

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [category, setCategory] = useState<TransactionCategory>();
  const [parentId, setParentId] = useState<string>();
  const [openRemove, setOpenRemove] = useState<boolean>(false);
  const { data } = useTransactionCategories()

  const removeTransactionCategory = useDeleteTransactionCategory()
  const handleRemove = () => {
    if (!category) return;
    removeTransactionCategory.mutate(category.id, {
      onSuccess: () => toast.success("Xóa thành công")
    })
  }

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-30 border-b border-border/50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Tag size={15} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">Danh mục giao dịch</h1>
              <p className="text-[10px] text-muted-foreground">Finance › Settings</p>
            </div>
          </div>
          <Button
            size="sm"
            className="rounded-xl gap-1.5 h-8 text-xs px-3"
            onClick={() => setOpenCreate(true)}
          >
            <Plus size={13} /> Thêm danh mục
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">

        {/* ── Filter bar ── */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Type toggle */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-xl border border-border/40">
            {["Tất cả", "Thu nhập", "Chi tiêu"].map((f, i) => (
              <button
                key={f}
                className={`px-3 h-7 rounded-lg text-xs font-semibold transition-all ${
                  i === 0
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
            <Input
              placeholder="Tìm danh mục..."
              className="pl-8 h-9 rounded-xl border-border/60 bg-white text-sm shadow-none"
            />
          </div>
        </div>

        {/* ── Grid ── */}
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
            />
          )}
        </div>
      </div>

      {/* ── Dialogs ── */}
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