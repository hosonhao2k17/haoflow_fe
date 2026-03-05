"use client"

import { useState } from "react";
import { TransactionCategoryType } from "@/common/constants/finance.constant";
import { TransactionCategory } from "@/features/transaction-category/interfaces/transaction-category.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  Tag,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeftRight,
  TrendingUp,
  ChevronRight,
  FolderOpen,
} from "lucide-react";

const TYPE_CONFIG: Record<TransactionCategoryType, {
  label: string;
  icon: React.ReactNode;
  color: string;
  text: string;
  bg: string;
  border: string;
  softBg: string;
}> = {
  [TransactionCategoryType.EXPENSE]: {
    label: "Chi tiêu", icon: <ArrowDownCircle size={14} />,
    color: "#f43f5e", text: "text-rose-500", bg: "bg-rose-500",
    border: "border-rose-200", softBg: "bg-rose-50",
  },
  [TransactionCategoryType.INCOME]: {
    label: "Thu nhập", icon: <ArrowUpCircle size={14} />,
    color: "#10b981", text: "text-emerald-500", bg: "bg-emerald-500",
    border: "border-emerald-200", softBg: "bg-emerald-50",
  },
  [TransactionCategoryType.TRANSFER]: {
    label: "Chuyển khoản", icon: <ArrowLeftRight size={14} />,
    color: "#6366f1", text: "text-indigo-500", bg: "bg-indigo-500",
    border: "border-indigo-200", softBg: "bg-indigo-50",
  },
  [TransactionCategoryType.INVESTMENT]: {
    label: "Đầu tư", icon: <TrendingUp size={14} />,
    color: "#8b5cf6", text: "text-violet-500", bg: "bg-violet-500",
    border: "border-violet-200", softBg: "bg-violet-50",
  },
};

const FILTER_TABS = [
  { value: "ALL", label: "Tất cả" },
  { value: TransactionCategoryType.EXPENSE,    label: "Chi tiêu" },
  { value: TransactionCategoryType.INCOME,     label: "Thu nhập" },
  { value: TransactionCategoryType.TRANSFER,   label: "Chuyển khoản" },
  { value: TransactionCategoryType.INVESTMENT, label: "Đầu tư" },
];

const CategoryCard = () => {
  const [showChildren, setShowChildren] = useState(false);
 

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Color bar top */}
      <div className="h-1 w-full"/>

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            
          >
            <Tag size={18} />
          </div>

          {/* Actions — visible on hover */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 transition-colors"
              title="Thêm danh mục con"
            >
              <Plus size={13} />
            </button>
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
              title="Chỉnh sửa"
            >
              <Pencil size={13} />
            </button>
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              title="Xoá"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* Title */}
        <p className="text-sm font-semibold text-gray-800 truncate mb-2">ANH BA</p>

        {/* Type badge */}
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.text} ${cfg.softBg} ${cfg.border}`}>
          
        </span>

        {/* Children toggle */}
        {true && (
          <button
            type="button"
            onClick={() => setShowChildren((v) => !v)}
            className="mt-3 w-full flex items-center justify-between text-xs text-muted-foreground hover:text-gray-700 transition-colors pt-3 border-t border-gray-100"
          >
            <span className="flex items-center gap-1.5">
              <FolderOpen size={12} />
              {5} danh mục con
            </span>
            <ChevronRight
              size={13}
              className={`transition-transform duration-200 ${showChildren ? "rotate-90" : ""}`}
            />
          </button>
        )}
      </div>

      {/* Children list */}
      {showChildren && true && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 space-y-1">
          {[].map((child: TransactionCategory) => (
            <div
              key={child.id}
              className="group/child flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-white transition-colors"
            >
              <span className="text-base">{child.icon ?? "📁"}</span>
              <span className="text-xs font-medium text-gray-700 flex-1 truncate">{child.title}</span>
              <div className="flex gap-1 opacity-0 group-hover/child:opacity-100 transition-opacity">
                <button
                  className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-amber-500 hover:bg-amber-50"
                >
                  <Pencil size={11} />
                </button>
                <button
                  className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const TransactionCategoryPage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Danh mục giao dịch</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Quản lý danh mục thu chi · {10} danh mục
          </p>
        </div>
        <Button className="h-9 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm gap-1.5">
          <Plus size={15} />
          Thêm danh mục
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {FILTER_TABS.map((tab) => {
          const active = "active";
         
          return (
            <button
              key={tab.value}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                active
                  ? true
                    ? ``
                    : "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              
              <Badge
                variant="secondary"
                className="text-xs px-1.5 py-0 h-4 rounded-full min-w-[18px] flex items-center justify-center"
              >
                {10}
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {true ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-gray-200">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
            <Tag size={22} className="text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">Chưa có danh mục nào</p>
          <p className="text-xs text-muted-foreground mt-1">Nhấn "Thêm danh mục" để bắt đầu</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <CategoryCard
            />
        </div>
      )}
    </div>
  );
};

export default TransactionCategoryPage;