import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { TransactionCategoryFormValue } from "../interfaces/transaction-category-form.interface";
import { TransactionCategoryType } from "@/common/constants/finance.constant";
import { cn } from "@/lib/utils";
import { useTransactionCategories } from "../transaction-category.hook";
import { TransactionCategory } from "../interfaces/transaction-category.interface";

interface FieldProps {
  icon: ElementType;
  label: string;
  children: ReactNode;
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

interface Props {
  onChange: (value: TransactionCategoryFormValue) => void;
  category: TransactionCategoryFormValue;
  isPending?: boolean
}

const TransactionCategoryForm = ({ onChange, category, isPending = false }: Props) => {
  const update = (partial: Partial<TransactionCategoryFormValue>) =>
    onChange({ ...category, ...partial });

  const {data} = useTransactionCategories()

  return (
    <div className="px-6 py-5 flex flex-col gap-5">

      {/* Title */}
      <FieldSection icon={Tag} label="Tiêu đề">
        <Input
          value={category.title ?? ""}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="vd: Đồ ăn, lương, đồ dùng cá nhân..."
          className="h-10 rounded-xl bg-muted/50 border-border/60 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/40"
        />
      </FieldSection>

      {/* Type */}
      <FieldSection icon={TrendingDown} label="Loại nào">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => update({ type: TransactionCategoryType.EXPENSE })}
            className={cn(
              "flex items-center justify-center gap-2 h-10 rounded-xl border text-sm font-medium transition-all",
              category.type === TransactionCategoryType.EXPENSE
                ? "border-rose-500/40 bg-rose-500/10 text-rose-500 ring-2 ring-rose-500/20"
                : "border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <TrendingDown className="w-4 h-4" />
            Chi phí
          </button>
          <button
            type="button"
            onClick={() => update({ type: TransactionCategoryType.INCOME })}
            className={cn(
              "flex items-center justify-center gap-2 h-10 rounded-xl border text-sm font-medium transition-all",
              category.type === TransactionCategoryType.INCOME
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 ring-2 ring-emerald-500/20"
                : "border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Thu nhập
          </button>
        </div>
      </FieldSection>

      {/* Parent Category */}
      <FieldSection icon={FolderTree} label="Danh mục cha">
        <Select
          value={category.parentId ?? ""}
          onValueChange={(val) => update({ parentId: val })}
        >
          <SelectTrigger className="h-10 rounded-xl bg-muted/50 border-border/60 text-sm">
            <SelectValue placeholder="Chọn một danh mục gốc" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {
              data?.items.map((cat: TransactionCategory) => (
                <SelectItem key={cat.id} value={cat.id} className="text-muted-foreground italic">
                  {cat.title}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </FieldSection>

      <Separator className="opacity-50" />

      {/* Icon */}
      <FieldSection icon={Smile} label="Icon">
        <IconPicker
          value={category.icon ?? ""}
          onChange={(icon) => update({ icon })}
        />
      </FieldSection>

      {/* Color */}
      <FieldSection icon={Palette} label="Màu sắc">
        <ColorPicker
          value={category.color ?? "#8b5cf6"}
          onChange={(color) => update({ color })}
        />
      </FieldSection>

    </div>
  );
};

export default TransactionCategoryForm;