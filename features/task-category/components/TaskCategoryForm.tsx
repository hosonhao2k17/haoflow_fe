"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Type, AlignLeft, Palette, Smile } from "lucide-react";
import { TaskCategoryFormValue } from "../interfaces/task-category-form.interface";
import IconPicker from "@/components/common/IconPicker";
import ColorPicker from "@/components/common/ColorPicker";

const Field = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      {icon}
      {label}
    </Label>
    {children}
  </div>
);

interface Props {
  taskCategory: TaskCategoryFormValue;
  onChange: (value: TaskCategoryFormValue) => void;
}

const TaskCategoryForm = ({ taskCategory, onChange }: Props) => {
  const set = (key: keyof TaskCategoryFormValue, value: string | undefined) =>
    onChange({ ...taskCategory, [key]: value });

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

      {/* Icon — dùng IconPicker có sẵn (emoji) */}
      <Field label="Icon" icon={<Smile className="w-3 h-3" />}>
        <IconPicker
          value={taskCategory.icon ?? ""}
          onChange={(icon) => set("icon", icon || undefined)}
        />
      </Field>

      {/* Màu sắc — dùng ColorPicker component có sẵn */}
      <Field label="Màu sắc" icon={<Palette className="w-3 h-3" />}>
        <ColorPicker
          value={taskCategory.color ?? "#8b5cf6"}
          onChange={(color) => set("color", color)}
        />
      </Field>
    </div>
  );
};

export default TaskCategoryForm;