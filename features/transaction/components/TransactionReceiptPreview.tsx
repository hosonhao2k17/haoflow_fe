import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Camera, ImageIcon, ScanLine, Sparkles, Loader2, Save } from "lucide-react"
import { useUpload } from "@/features/upload/upload.hook"
import { useRef, useState } from "react"
import { useCreateTransactionReceipt, useTransactionReviewReceipt } from "../transaction.hook"
import { TransactionFormValue } from "../interfaces/transaction-form"
import TransactionForm from "./TransactionForm"
import { AiResponse } from "@/common/interfaces/ai-response.interface"
import { CreateTransactionReceipt } from "../interfaces/create-transaction-receipt.interface"
import TransactionReceiptHover from "./TransactionReceiptHover"
import { toast } from "sonner"

interface Props {
  open:    boolean
  setOpen: (open: boolean) => void
}

const TransactionReceiptPreview = ({ open, setOpen }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<CreateTransactionReceipt>()
  const [summary, setSummary] = useState<string>()

  const upload = useUpload()
  const previewReceipt = useTransactionReviewReceipt()
  const isLoading = upload.isPending || previewReceipt.isPending

  const handleUpload = (file: File) => {
    upload.mutate(file, {
      onSuccess: ({ url }) => {
        previewReceipt.mutate(url, {
          onSuccess: (res: AiResponse<CreateTransactionReceipt>) => {
            setForm(res.data)
            setSummary(res.summary)
          },
        })
      },
    })
  }
  const createTransactionReceipt = useCreateTransactionReceipt()
  const handleCreate = () => {
    if(!form) return;
    const {isRecurring, ...result} = form;
    createTransactionReceipt.mutate(result , {
      onSuccess: () => {
        toast.success("Thêm thành công")
      }
    })
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  const handleClose = (val: boolean) => {
    if (!val) {
      setForm(undefined)
      setSummary(undefined)
    }
    setOpen(val)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">

        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/50">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <ScanLine size={16} className="text-primary" />
            Quét hoá đơn
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 overflow-y-auto max-h-[80vh] flex flex-col gap-4">
          {!form && (
            <>
              <input ref={fileRef}   type="file" accept="image/*"                      className="hidden" onChange={onFileChange} />
              <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFileChange} />

              <div
                onClick={() => !isLoading && fileRef.current?.click()}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border/50 bg-muted/30 py-12 cursor-pointer transition-all hover:border-primary/50 hover:bg-muted/50"
              >
                <div className="w-12 h-12 rounded-2xl bg-background border border-border/60 flex items-center justify-center shadow-sm">
                  {isLoading
                    ? <Loader2 size={22} className="text-primary animate-spin" />
                    : <ImageIcon size={22} className="text-muted-foreground" />
                  }
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {isLoading ? "Đang phân tích hoá đơn..." : "Kéo thả ảnh vào đây"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isLoading ? "AI đang đọc nội dung" : "hoặc nhấn để chọn từ thiết bị"}
                  </p>
                </div>
                {!isLoading && (
                  <p className="text-[11px] text-muted-foreground/50">JPG, PNG, WEBP · Tối đa 10MB</p>
                )}
              </div>

              {!isLoading && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-border/50" />
                    <span className="text-xs text-muted-foreground">hoặc</span>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>
                  <Button
                    variant="outline"
                    className="h-10 rounded-xl border-border/60 gap-2 text-sm font-normal"
                    onClick={() => cameraRef.current?.click()}
                  >
                    <Camera size={15} />
                    Chụp ảnh trực tiếp
                  </Button>
                </>
              )}
            </>
          )}

          {form && (
            <>
              {summary && (
                <div className="flex gap-2.5 rounded-xl bg-primary/5 border border-primary/15 px-3.5 py-3">
                  <Sparkles size={15} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground/80 leading-relaxed">{summary}</p>
                </div>
              )}

              {form.receipt && <TransactionReceiptHover receipt={form.receipt} />}

              <TransactionForm 
                form={form} 
                setForm={setForm} 
              />
            </>
          )}

        </div>

        {form && (
          <div className="px-6 pb-5 pt-3 border-t border-border/40">
            <Button 
              className="w-full h-10 rounded-xl font-medium gap-2"
              onClick={handleCreate}
            >
              <Save size={14} />
              Lưu giao dịch
            </Button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}

export default TransactionReceiptPreview