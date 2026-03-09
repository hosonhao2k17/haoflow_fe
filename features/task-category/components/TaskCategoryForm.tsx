"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FolderOpen, Link2, Type, AlignLeft, Palette, ImagePlus, X } from "lucide-react"
import { TaskCategoryFormValue } from "../interfaces/task-category-form.interface"
import { useUpload } from "@/features/upload/upload.hook"


const Field = ({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      {icon}
      {label}
    </Label>
    {children}
  </div>
)

interface Props {
  taskCategory: TaskCategoryFormValue
  onChange: (value: TaskCategoryFormValue) => void
}


const TaskCategoryForm = ({ taskCategory, onChange }: Props) => {
  const [file, setFile] = useState<File>();

  const set = (key: keyof TaskCategoryFormValue, value: string | undefined) =>
    onChange({ ...taskCategory, [key]: value })

 
  const upload = useUpload()
  const fileRef = useRef<HTMLInputElement>(null)  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    setFile(selected)
    handleUpdate(selected) 
  }

  const handleUpdate = (selectedFile: File) => { 
    upload.mutate(selectedFile, {
      onSuccess: ({ url }) => {
        set("icon", url)
      },
    })
  }

 

  return (
    <div className="flex flex-col gap-5">

      {/* Title */}
      <Field label="Tên danh mục" icon={<Type className="w-3 h-3" />}>
        <Input
          placeholder="VD: Công việc hàng ngày"
          value={taskCategory.title}
          onChange={(e) => set("title", e.target.value)}
          className="focus-visible:ring-primary/40"
        />
      </Field>

      {/* Description */}
      <Field label="Mô tả" icon={<AlignLeft className="w-3 h-3" />}>
        <Textarea
          placeholder="Mô tả ngắn về danh mục này..."
          value={taskCategory.description ?? ""}
          onChange={(e) => set("description", e.target.value || undefined)}
          rows={3}
          className="resize-none focus-visible:ring-primary/40"
        />
      </Field>

      {/* Icon upload */}
      <Field label="Icon" icon={<ImagePlus className="w-3 h-3" />}>
        <div className="flex items-center gap-3">
          {/* Preview box */}
          <div
            className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center border-2 border-dashed border-border bg-muted/40 overflow-hidden cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            onClick={() => fileRef.current?.click()}
          >
            {taskCategory.icon ? (
              <img src={taskCategory.icon} alt="icon" className="w-full h-full object-cover" />
            ) : (
              <FolderOpen className="w-6 h-6 text-muted-foreground/50" />
            )}
          </div>

          {/* Upload area */}
          <div className="flex-1 space-y-1.5">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              Chọn ảnh
            </button>

            {taskCategory.icon && (
              <button
                type="button"
                onClick={() => {
                  set("icon", undefined)
                  setFile(undefined)
                  if (fileRef.current) fileRef.current.value = "" 
                }}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors duration-150"
              >
                <X className="w-3 h-3" />
                Xóa ảnh
              </button>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </Field>

      {/* Color */}
      <Field label="Màu sắc" icon={<Palette className="w-3 h-3" />}>
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all duration-200">
            <input
              type="color"
              value={taskCategory.color ?? "#6366f1"}
              onChange={(e) => set("color", e.target.value)}
              className="absolute inset-0 w-[200%] h-[200%] -top-1/2 -left-1/2 cursor-pointer border-none outline-none"
            />
          </div>
          <Input
            placeholder="#6366f1"
            value={taskCategory.color ?? ""}
            onChange={(e) => set("color", e.target.value || undefined)}
            className="font-mono text-sm focus-visible:ring-primary/40"
          />
          {taskCategory.color && (
            <button
              type="button"
              onClick={() => set("color", undefined)}
              className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </Field>

    </div>
  )
}

export default TaskCategoryForm