"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import TaskCategoryForm from "./TaskCategoryForm"
import { useState } from "react"
import { TaskCategoryFormValue } from "../interfaces/task-category-form.interface"
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
  doneTask: 0,
}

const TaskCategoryCreate = ({ open, setOpen }: Props) => {
  const [category, setCategory] = useState<TaskCategoryFormValue>(DEFAULT_STATE)
  const categoryCreate = useCreateTaskCategory()

  const handleSubmit = () => {
    categoryCreate.mutate(category, {
      onSuccess: () => {
        toast.success("Tạo thành công")
        setCategory(DEFAULT_STATE)
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 overflow-hidden border-0 shadow-2xl max-w-lg w-full rounded-2xl">
        
        {/* Header */}
        <div className="relative bg-primary px-6 pt-6 pb-8 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-8 w-16 h-16 rounded-full bg-primary-foreground/5 translate-y-1/2" />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-3 py-1 mb-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-primary-foreground/70">
                  New Category
                </span>
              </div>
              <h2 className="text-2xl font-bold text-primary-foreground leading-tight">
                Tạo danh mục mới
              </h2>
              <p className="text-sm text-primary-foreground/60 mt-1">
                Điền thông tin để tạo danh mục công việc
              </p>
            </div>

            {/* Icon badge */}
            <div className="relative z-10 w-12 h-12 rounded-xl bg-primary-foreground/15 border border-primary-foreground/20 flex items-center justify-center shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
            </div>
          </div>

          {/* Wave bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-4 bg-background"
            style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
          />
        </div>

        {/* Body */}
        <div className="bg-background px-6 pt-4 pb-6 space-y-5">
          {/* Accent bar */}
          <div className="flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full bg-primary/20" />
            <div className="h-1 w-8 rounded-full bg-primary" />
          </div>

          {/* Form */}
          <TaskCategoryForm
            taskCategory={category}
            onChange={setCategory}
          />

          {/* Footer actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 px-4 rounded-xl border-2 border-primary/20 text-primary/70 text-sm font-semibold hover:border-primary/40 hover:text-primary transition-all duration-200 hover:bg-primary/5"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={categoryCreate.isPending}
              className="flex-[2] py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {categoryCreate.isPending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                  </svg>
                  Đang tạo...
                </>
              ) : (
                <>
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
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                  Tạo danh mục
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TaskCategoryCreate