// TransactionCategoryForm.jsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingDown, TrendingUp, FolderTree, Tag, Palette, Smile } from "lucide-react";
import IconPicker from "@/components/common/IconPicker";
import ColorPicker from "@/components/common/ColorPicker";
import { ElementType, ReactNode } from "react";

interface FieldProps {
  icon: ElementType,
  label: string;
  children: ReactNode
}

function FieldSection({ icon: Icon, label, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <Label className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
          {label}
        </Label>
      </div>
      {children}
    </div>
  );
}

const TransactionCategoryForm = () => {

  


  return (
    <div className="px-6 py-5 flex flex-col gap-5">

      <FieldSection icon={Tag} label="Tiêu đề">
        <Input
          placeholder="vd: Đồ ăn, lương, đồ dùng cá nhân..."
          className="h-10 rounded-xl bg-muted/50 border-border/60 focus-visible:primary focus-visible:border-primary placeholder:text-muted-foreground/40"
        />
      </FieldSection>

      <FieldSection icon={TrendingDown} label="Loại nào">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 h-10 rounded-xl border border-rose-500/40 bg-rose-500/8 text-rose-500 text-sm font-medium transition-all hover:bg-rose-500/15 ring-2 ring-rose-500/20"
          >
            <TrendingDown className="w-4 h-4" />
            Chi phí
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 h-10 rounded-xl border border-border/60 bg-muted/40 text-muted-foreground text-sm font-medium transition-all hover:bg-muted hover:text-foreground"
          >
            <TrendingUp className="w-4 h-4" />
            Thu nhập
          </button>
        </div>
      </FieldSection>

      {/* Parent Category */}
      <FieldSection icon={FolderTree} label="Danh mục cha">
        <Select>
          <SelectTrigger className="h-10 rounded-xl bg-muted/50 border-border/60 focus-visible:primary focus-visible:border-primary text-sm">
            <SelectValue placeholder="None — top-level category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="none" className="text-muted-foreground italic">
              None — top-level category
            </SelectItem>
          </SelectContent>
        </Select>
      </FieldSection>

      <Separator className="opacity-50" />

      {/* Icon Picker — slot for custom component */}
      <FieldSection icon={Smile} label="Icon">
        <div className="min-h-[44px] rounded-xl border border-dashed border-border/60 bg-muted/30 flex items-center justify-center text-xs text-muted-foreground/50 italic">
          <IconPicker />
        </div>
      </FieldSection>

      {/* Color */}
      <FieldSection icon={Palette} label="Màu sắc">
        <ColorPicker />
      </FieldSection>
    </div>
  );
};

export default TransactionCategoryForm;