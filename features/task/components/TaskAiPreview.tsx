import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trash2, Clock } from "lucide-react";
import { TaskPriority, TaskStatus } from "@/common/constants/app.constant";
import { Task } from "../interfaces/task.interface";
import { useState } from "react";
import { MultiTask } from "../interfaces/create-multi-task.interface";
import { useTaskCategories } from "@/features/task-category/task-category.hook";
import { TaskCategory } from "@/features/task-category/interfaces/task-catgegory.interface";

const PRIORITY_STYLE: Record<string, string> = {
    LOW:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    MEDIUM: "bg-blue-500/10    text-blue-400    border-blue-500/30",
    HIGH:   "bg-orange-500/10  text-orange-400  border-orange-500/30",
    URGENT: "bg-red-500/10     text-red-400     border-red-500/30",
};

const STATUS_STYLE: Record<string, string> = {
    TODO:        "bg-slate-500/10   text-slate-400   border-slate-500/30",
    IN_PROGRESS: "bg-amber-500/10   text-amber-400   border-amber-500/30",
    DONE:        "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    CANCELLED:   "bg-red-500/10     text-red-400     border-red-500/30",
};

interface Props {
    task: MultiTask;
    index?: number;
}

const TaskAiPreview = ({ task, index = 1 }: Props) => {
    const [form, setForm] = useState<MultiTask>(task);

    const {data} = useTaskCategories({})
    return (
        <div className="group relative rounded-2xl border border-primary/15 bg-primary/[0.03] hover:bg-primary/[0.06] hover:border-primary/30 transition-all duration-200 overflow-hidden">

            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />

            <div className="p-4 space-y-3.5">

                <div className="flex items-center gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-primary/15 text-primary text-[11px] font-mono font-bold flex items-center justify-center">
                        {index}
                    </span>

                    <Input
                        
                        value={form.todo}
                        onChange={(e) => setForm({ ...form, todo: e.target.value })}
                        placeholder="Tên task..."
                        className="flex-1 h-8 bg-transparent border-0 border-b border-primary/20 rounded-none px-0 text-sm font-semibold focus-visible:ring-0 focus-visible:border-primary/60 placeholder:text-muted-foreground/40 transition-colors"
                    />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-7 w-7 rounded-lg opacity-0 group-hover:opacity-100 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-all"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>

                <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Thêm mô tả..."
                    rows={2}
                    className="resize-none text-xs leading-relaxed bg-background/40 border-primary/15 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/40 placeholder:text-muted-foreground/35 rounded-xl transition-colors"
                />

                <div className="grid grid-cols-2 gap-2">
                    <Select
                        defaultValue={form.priority}
                        onValueChange={(v) => setForm({ ...form, priority: v as Task["priority"] })}
                    >
                        <SelectTrigger className={`h-8 text-xs font-medium border rounded-xl px-3 focus:ring-1 focus:ring-primary/30 transition-colors ${PRIORITY_STYLE[form.priority] ?? "bg-primary/5 text-foreground border-primary/20"}`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(TaskPriority).map((p) => (
                                <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        defaultValue={form.categoryId}
                        onValueChange={(v) => setForm({ ...form, categoryId: v})}
                    >
                        <SelectTrigger className={`h-8 text-xs font-medium border rounded-xl px-3 focus:ring-1 focus:ring-primary/30 transition-colors ${PRIORITY_STYLE[form.priority] ?? "bg-primary/5 text-foreground border-primary/20"}`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                data?.items.map((item: TaskCategory) => (
                                    <SelectItem key={item.id} value={item.id} className="text-xs">{item.title}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2 h-8 rounded-xl border border-primary/15 bg-background/40 px-3 hover:border-primary/30 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-colors">
                        <Clock className="h-3 w-3 text-muted-foreground/50 shrink-0" />
                        <span className="text-[10px] text-muted-foreground/60 shrink-0">Start</span>
                        <input
                            value={form.startTime}
                            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                            type="time"
                            className="flex-1 min-w-0 bg-transparent text-xs text-foreground focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2 h-8 rounded-xl border border-primary/15 bg-background/40 px-3 hover:border-primary/30 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-colors">
                        <Clock className="h-3 w-3 text-muted-foreground/50 shrink-0" />
                        <span className="text-[10px] text-muted-foreground/60 shrink-0">End</span>
                        <input
                            value={form.endTime}
                            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                            type="time"
                            className="flex-1 min-w-0 bg-transparent text-xs text-foreground focus:outline-none"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TaskAiPreview;