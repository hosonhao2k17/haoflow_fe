import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Wallet} from "lucide-react";
import { useState } from "react";
import { CreateAccount } from "../interfaces/create-account.interface";
import { AccountStatus, AccountType } from "@/common/constants/finance.constant";
import { Account } from "../interfaces/account.interface";
import { AccountFormValue } from "../interfaces/account-form-value.interface";
import AccountForm from "./AccountForm";
import { useCreateAccount } from "../account.hook";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AccountCreate = ({ open, setOpen }: Props) => {
  const defaultValue = {
    title: "",
    type: AccountType.CASH,
    balance: 0,
    status: AccountStatus.ACTIVE
  }
  const [account, setAccount] = useState<AccountFormValue>(defaultValue);

  const createAccount = useCreateAccount();

  const handleCreate = () => {
    createAccount.mutate(account, {
      onSuccess: () => {
        toast.success("Tạo tài khoản thành công");
        setOpen(false)
        setAccount(defaultValue)
      }
    })
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[460px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
              <Wallet size={18} />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold leading-tight">
                Thêm tài khoản mới
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Thêm tài khoản để quản lý tài chính vd: momo, banking
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Separator />
        <div className="px-6 py-3">
          <AccountForm 
            account={account}
            set={setAccount}
          />
        </div>
        <Separator />
        <div className="px-6 py-4 flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            className="rounded-lg h-9 px-4 text-sm"
            onClick={() => setOpen(false)}
          >
            Huỷ
          </Button>
          <Button
            type="button"
            onClick={handleCreate}
            className="rounded-lg h-9 px-5 text-sm bg-primary text-white"
          >
            <Wallet size={14} className="mr-1.5" />
            Tạo tài khoản
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountCreate;