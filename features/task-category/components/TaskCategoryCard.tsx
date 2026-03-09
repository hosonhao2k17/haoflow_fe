import { cn } from "@/lib/utils"
import { ArrowUpRight, CheckSquare, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { TaskCategory } from "../interfaces/task-catgegory.interface"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRemoveTaskCategory, useTaskCategories } from "../task-category.hook";

interface Props {
    category: TaskCategory;
    setOpenUpdate: (open: boolean) => void;
    setCategory: (val: TaskCategory) => void;
    setOpenRemove: (open: boolean) => void;
}

const TaskCategoryCard = ({category, setOpenUpdate, setCategory, setOpenRemove}: Props) => {

    

    return (
        <article
            className={cn(
                "group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer",
                "bg-card border border-border",
                "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1",
                "transition-all duration-250 ease-out"
            )}
        >
            <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                    background: category.color
                    ? category.color
                    : "linear-gradient(90deg, hsl(var(--primary)/0.7), hsl(var(--primary)/0.15))",
                }}
            />

                <div className="flex flex-col flex-1 p-5 pt-6 gap-4">
                    {/* Row 1: Icon + Menu */}
                    <div className="flex tasks-start justify-between gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden ring-2 ring-primary/20 bg-primary/10 flex-shrink-0"
                            style={category.color ? { boxShadow: `0 0 0 2px ${category.color}40` } : undefined}
                        >
                            <img
                                src={category.icon ?? 'https://t4.ftcdn.net/jpg/03/85/95/63/360_F_385956366_Zih7xDcSLqDxiJRYUfG5ZHNoFCSLMRjm.jpg'}
                                alt={category.title}
                                className="w-7 h-7 object-contain"
                            />
                        </div>
                        {/* Stop propagation so card click doesn't fire on menu open */}
                        <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className={cn(
                                    "w-7 h-7 rounded-lg flex items-center justify-center",
                                    "bg-primary/10 hover:bg-primary/25 text-primary",
                                    "transition-colors duration-150 focus:outline-none"
                                    )}
                                >
                                    <MoreHorizontal className="w-3.5 h-3.5" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-36" align="end">
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    className="cursor-pointer text-sm"
                                    onClick={() => {
                                        setOpenUpdate(true)
                                        setCategory(category)
                                    }}
                                >
                                    <Pencil className="w-3.5 h-3.5 mr-2" />
                                    Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-destructive focus:text-destructive cursor-pointer text-sm"
                                    onClick={() => {
                                        setOpenRemove(true)
                                        setCategory(category)
                                    }}
                                >
                                    <Trash2 className="w-3.5 h-3.5 mr-2" />
                                    Xóa
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

            {/* Row 2: Title + Description */}
            <div className="flex-1 space-y-1.5">
                <h3 className="font-semibold text-foreground text-[15px] leading-snug line-clamp-1 tracking-tight">
                {category.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.5rem]">
                {category.description ?? "Không có mô tả"}
                </p>
            </div>

            {/* Row 3: Task count + color code + arrow CTA */}
            <div className="flex tasks-center justify-between pt-3 border-t border-border gap-2">
                <div className="flex tasks-center gap-2 min-w-0">
                    <span
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary text-primary-foreground leading-none"
                        style={category.color ? { backgroundColor: category.color } : undefined}
                    >
                        <CheckSquare className="w-2.5 h-2.5" />
                        {category.totalTask} tasks
                    </span>
                    {category.color && (
                        <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider truncate">
                            {category.color}
                        </span>
                    )}
                </div>

                    <div
                        className={cn(
                            "w-7 h-7 rounded-lg flex tasks-center justify-center flex-shrink-0",
                            "bg-primary/10 text-primary",
                            "group-hover:bg-primary group-hover:text-primary-foreground",
                            "transition-all duration-200"
                        )}
                        >
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-200" />
                    </div>
                </div>
            </div>
        </article>
    )
}

export default TaskCategoryCard 