import { Dialog, DialogContent } from "@/components/ui/dialog";
import TaskCategoryForm from "./TaskCategoryForm";
import { TaskCategory } from "../interfaces/task-catgegory.interface";
import { useEffect, useState } from "react";
import { TaskCategoryFormValue } from "../interfaces/task-category-form.interface";
import { useUpdateTaskCategory } from "../task-category.hook";
import { toast } from "sonner";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    taskCategory: TaskCategory | undefined;
}

const TaskCategoryUpdate = ({ open, setOpen, taskCategory }: Props) => {
    if(!taskCategory) return;
    const [category, setTaskCategory] = useState<TaskCategoryFormValue>({
        title: taskCategory.title,
        description: taskCategory.description,
        color: taskCategory.color,
        icon: taskCategory.icon,
    });

    useEffect(() => {
        if (!taskCategory) return;
        
        setTaskCategory({
            title: taskCategory.title,
            description: taskCategory.description,
            color: taskCategory.color,
            icon: taskCategory.icon,
        });
    }, [taskCategory]);

    const updateTaskCategory = useUpdateTaskCategory()

    const handleUpdate = () => {
        updateTaskCategory.mutate({id: taskCategory.id, dto: category}, {
            onSuccess: () => {
                toast.success("Cập nhật thành công")
                setOpen(false)
            }
        } )
        
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 gap-0 overflow-hidden border-0 shadow-2xl max-w-lg w-full rounded-2xl">
  
                <div className="relative bg-primary px-6 pt-6 pb-8">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-8 w-16 h-16 rounded-full bg-primary-foreground/5 translate-y-1/2" />
                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-3 py-1 mb-3">
                                <span className="text-xs font-semibold tracking-widest uppercase text-primary-foreground/70">
                                    Chỉnh sửa danh mục
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-primary-foreground leading-tight">
                                {taskCategory.title || "Update Category"}
                            </h2>
                            <p className="text-sm text-primary-foreground/60 mt-1">
                                Modify the details below to update this category
                            </p>
                        </div>

                        <div className="relative z-10 w-12 h-12 rounded-xl bg-primary-foreground/15 border border-primary-foreground/20 flex items-center justify-center text-xl shadow-inner">
                            {taskCategory.icon || "🏷️"}
                        </div>
                    </div>

                    <div
                        className="absolute bottom-0 left-0 right-0 h-4 bg-background"
                        style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
                    />
                </div>

                <div className="bg-background px-6 pt-4 pb-6 space-y-5">
                    <div className="flex items-center gap-2">
                        <div
                            className="h-1 flex-1 rounded-full bg-primary/20"
                        />
                        <div
                            className="h-1 w-8 rounded-full bg-primary"
                        />
                    </div>

                    <TaskCategoryForm
                        taskCategory={category}
                        onChange={setTaskCategory}
                    />

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="flex-1 py-2.5 px-4 rounded-xl border-2 border-primary/20 text-primary/70 text-sm font-semibold hover:border-primary/40 hover:text-primary transition-all duration-200 hover:bg-primary/5"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="flex-[2] py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                <polyline points="17 21 17 13 7 13 7 21" />
                                <polyline points="7 3 7 8 15 8" />
                            </svg>
                            Lưu
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TaskCategoryUpdate;