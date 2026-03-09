"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TaskCategoryForm from "./TaskCategoryForm"
import { useState } from "react"
import { TaskCategoryFormValue } from "../interfaces/task-category-form.interface"
import { FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCreateTaskCategory } from "../task-category.hook"
import { toast } from "sonner"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const DEFAULT_STATE: TaskCategoryFormValue = {
  title: "",
  description: "",
  color: undefined,
  icon: undefined,
}

const TaskCategoryCreate = ({ open, setOpen }: Props) => {
  const [category, setCategory] = useState<TaskCategoryFormValue>(DEFAULT_STATE)

  const categoryCreate = useCreateTaskCategory();

  const handleSubmit = () => {
    categoryCreate.mutate(category, {
      onSuccess: () => {
        toast.success("Tạo thành công");
        setOpen(false)
      }
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2.5 text-base font-semibold">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderPlus className="w-4 h-4 text-primary" />
            </span>
            Tạo danh mục mới
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5">
          {/* form here  */}
          <TaskCategoryForm
            onChange={setCategory}
            taskCategory={category}
          />
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border gap-2">
          <Button variant="outline" >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
          >
            Thêm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TaskCategoryCreate