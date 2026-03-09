"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ArrowUpDown, ArrowDownAZ, ArrowUpAZ, Plus, SlidersHorizontal } from "lucide-react"


interface Props {
  setKeyword: (k: string | undefined) => void;
  setLimit: (limit: number) => void;
  setOpenCreate: (open: boolean) => void;
}

const CategoryTool = ({setKeyword, setLimit, setOpenCreate}: Props) => {
  return (
    <div className="flex items-center gap-3 p-3 border border-border rounded-xl w-full bg-card">

      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          onChange={(e) => {
            const value = e.target.value.trim()
            setKeyword(value || undefined)
          }}
          placeholder="Tìm kiếm danh mục..."
          className="pl-9 bg-background border-border h-9 text-sm"
        />
      </div>

      {/* Sort */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-2 text-sm">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sắp xếp
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel className="text-xs text-muted-foreground">Sắp xếp theo</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer text-sm">
              Ngày tạo
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm">
              Tên
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground">Thứ tự</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer text-sm gap-2">
              <ArrowDownAZ className="w-3.5 h-3.5" />
              Tăng dần (ASC)
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm gap-2">
              <ArrowUpAZ className="w-3.5 h-3.5" />
              Giảm dần (DESC)
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filter (page/limit) */}
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-2 text-sm">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Hiển thị
          </Button>
        </DropdownMenuTrigger >
        <DropdownMenuContent  align="end" className="w-36">
          <DropdownMenuLabel className="text-xs text-muted-foreground">Số lượng / trang</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[8, 12, 24, 48].map((n) => (
            <DropdownMenuItem onClick={() => setLimit(n)} key={n} className="cursor-pointer text-sm">
              {n} items
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Divider */}
      <div className="w-px h-6 bg-border" />

      {/* Add */}
      <Button size="sm" className="h-9 gap-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90">
        <Plus className="w-3.5 h-3.5" />
        Thêm mới
      </Button>

    </div>
  )
}

export default CategoryTool