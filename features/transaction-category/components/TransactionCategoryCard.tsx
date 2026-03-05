"use client"

import { ChevronRight, FolderOpen, Pencil, Plus, Tag, Trash2 } from "lucide-react"
import { useState } from "react";
import { TransactionCategory } from "../interfaces/transaction-category.interface";



const TransactionCategoryCard = () => {

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
    )
}

export default TransactionCategoryCard