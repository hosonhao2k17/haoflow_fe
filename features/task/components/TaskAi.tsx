"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Sparkles, Save } from "lucide-react";
import TaskAiPreview from "./TaskAiPreview";
import { useAiSuggest, useCreateMultiTask } from "../task.hook";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { MultiTask } from "../interfaces/create-multi-task.interface";
import { toast } from "sonner";


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    dailyPlanId: string;
}

const TaskAi = ({ open, setOpen, dailyPlanId}: Props) => {

    const [prompt, setPrompt] = useState<string>('')
    const [tasks, setTasks] = useState<MultiTask[]>([]);
    const aiSuggest = useAiSuggest();
    const createMultiTask = useCreateMultiTask()
    
    const handleSuggest = () => {

        aiSuggest.mutate(prompt, {
            onSuccess: (resAi) => {
                setTasks(resAi.data)
                setPrompt(resAi.message)
            }
        })
    }
    const handleCreate = () => {
        createMultiTask.mutate({
            dailyPlanId,
            tasks
        }, {
            onSuccess: () => {
                toast.success("Tạo danh sách task thành công")
                setOpen(false)
                setTasks([])
                setPrompt('')
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden border-primary/20">

                {/* Header */}
                <DialogHeader className="px-6 pt-5 pb-4 border-b border-primary/15 bg-primary/5">
                    <DialogTitle className="flex items-center gap-2 text-base font-semibold">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary text-primary-foreground">
                            <Sparkles className="h-3.5 w-3.5" />
                        </div>
                        Ai Hao Flow 
                        <Badge variant="secondary" className="ml-auto text-xs bg-primary/15 text-primary border-primary/25">
                            AI được công ty phát triển và chế tạo
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                {/* Prompt */}
                <div className="px-6 pt-4 pb-3 border-b border-primary/10 bg-background">
                    <div className="relative rounded-xl border border-primary/25 bg-primary/5 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                        <Textarea
                            disabled={aiSuggest.isPending}
                            placeholder="Mô tả công việc cần làm... (⌘Enter để gửi)"
                            rows={2}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="resize-none border-0 bg-transparent text-sm focus-visible:ring-0 placeholder:text-muted-foreground/50 pr-28"
                        />
                        <Button
                            disabled={aiSuggest.isPending}
                            size="sm"
                            onClick={handleSuggest}
                            className="absolute right-2 bottom-2 h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            {
                                aiSuggest.isPending
                                ?
                                <Spinner className="h-3.5 w-3.5"/>
                                :
                                <Sparkles className="h-3.5 w-3.5" />
                            }
                            Tạo tasks
                        </Button>
                    </div>
                </div>

                {/* Task list */}
                <ScrollArea className="flex-1 max-h-[420px]">
                    <div className="px-6 py-4 space-y-3">
                        {
                            tasks?.map((item) => (
                                <TaskAiPreview 
                                    task={item}
                                />
                            ))
                        }
                    </div>
                </ScrollArea>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-primary/15 bg-primary/5 flex justify-end">
                    

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive"
                        >
                            Xóa tất cả
                        </Button>
                        <Button
                            disabled={createMultiTask.isPending}
                            size="sm"
                            onClick={handleCreate}
                            className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 min-w-[120px]"
                        >
                            {
                                createMultiTask.isPending
                                ?
                                <Spinner className="h-3.5 w-3.5"/>
                                :
                                <Save className="h-3.5 w-3.5" />
                            }
                            
                            Lưu {tasks.length} tasks
                        </Button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default TaskAi;