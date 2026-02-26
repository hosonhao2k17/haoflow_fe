"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash, ArrowRight, CheckSquare } from "lucide-react"
import { TaskCategory } from "../interfaces/task-catgegory.interface"
import { cn } from "@/lib/utils"

interface Props {
  items: TaskCategory[]
}

const CategoryList = ({ items = [] }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {items.map((item, index) => (
          <div
            key={item.id ?? index}
            className={cn(
              "group relative flex flex-col rounded-2xl overflow-hidden",
              "bg-card border border-border",
              "hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10",
              "transition-all duration-300 ease-out"
            )}
          >
            {/* Thumbnail */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={item.thumbnail ?? "https://cdn-icons-png.freepik.com/512/8028/8028200.png"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-50"
              />
              {/* Gradient overlay dùng primary */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-primary/0" />

              {/* Top-right menu */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-36" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer">
                        <Pencil className="w-3.5 h-3.5 mr-2" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                        <Trash className="w-3.5 h-3.5 mr-2" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Task count badge */}
              {10 != null && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground">
                  <CheckSquare className="w-3 h-3" />
                  {10} tasks
                </div>
              )}
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4 gap-3">
              {/* Accent line */}
              <div className="w-8 h-0.5 rounded-full bg-primary" />

              <div className="flex-1 space-y-1.5">
                <h3 className="font-semibold text-card-foreground text-base leading-snug line-clamp-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {item.description ?? "Không có mô tả"}
                </p>
              </div>

              {/* Footer */}
              <button
                className={cn(
                  "mt-1 w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium",
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                  "transition-all duration-200 group/btn"
                )}
              >
                <span>Xem chi tiết</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        ))}

      {/* Empty state */}
      {items.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-zinc-600" />
          </div>
          <p className="text-sm text-zinc-500">Chưa có danh mục nào</p>
        </div>
      )}
    </div>
  )
}

export default CategoryList