import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"


interface Props {
    /** Tên item hiển thị trong mô tả (vd. tên danh mục, merchant giao dịch) */
    title: string;
    /** Tiêu đề dialog (vd. "Xóa danh mục?", "Xóa giao dịch?") */
    dialogTitle?: string;
    openConfirm: boolean;
    setOpenConfirm: (open: boolean) => void;
    handleRemove: () => void;
    isPending?: boolean;
}

const AlertRemoveDialog = ({
  openConfirm,
  setOpenConfirm,
  title,
  dialogTitle = "Xóa danh mục?",
  handleRemove,
  isPending = false,
}: Props) => {
  return (
    <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-destructive" />
            </span>
            {dialogTitle}
          </AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc muốn xóa 
                            <span className="font-semibold text-foreground">
                                {title}
                            </span>
                            ? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleRemove}
                            disabled={isPending}
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2"
                        >
                            {isPending ? (
                                <>
                                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                                    </svg>
                                    Đang xóa...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Xóa
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    )
}

export default AlertRemoveDialog