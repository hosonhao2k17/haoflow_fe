// TransactionCategoryCreate.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import TransactionCategoryForm from "./TransactionCategoryForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


interface Props {
    open: boolean;
    setOpen: (o: boolean) => void;
}

const TransactionCategoryCreate = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border/60">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              Tài chính
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Danh mục mới
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Thêm một danh mục để quản lý tài chính
          </DialogDescription>
        </DialogHeader>

        <TransactionCategoryForm />
        <Separator className="opacity-50" />
        <DialogFooter >
          <div className="flex gap-3 m-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl h-10 border-border/60 text-muted-foreground hover:text-foreground"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-[2] rounded-xl h-10 bg-primary text-white font-semibold shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40"
            >
              Thêm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
  );
};

export default TransactionCategoryCreate;