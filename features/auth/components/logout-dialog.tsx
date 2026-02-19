import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { BluetoothIcon, LogOutIcon } from "lucide-react"


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleLogout: () => void
}

export function AlertLogoutDialog({
    open,
    setOpen,
    handleLogout
}: Props) {
  return (
    <AlertDialog
        open={open}
        onOpenChange={setOpen}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
             <LogOutIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Cho phép đăng xuất?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có muốn đăng xuất không ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Không chấp nhận</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Chấp nhận</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
