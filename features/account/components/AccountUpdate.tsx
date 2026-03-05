
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
import { useEffect, useState } from "react";
import { CreateAccount } from "../interfaces/create-account.interface";
import { AccountStatus, AccountType } from "@/common/constants/finance.constant";
import { Account } from "../interfaces/account.interface";
import { AccountFormValue } from "../interfaces/account-form-value.interface";
import AccountForm from "./AccountForm";
import { useUpdateAccount } from "../account.hook";
import { toast } from "sonner";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    account?: Account
}

const AccountUpdate = ({open, setOpen, account}: Props) => {

    if(!account) {
        return;
    }
    const [form, setForm] = useState<AccountFormValue>({
        title: account.title,
        balance: account.balance,
        type: account.type,
        color: account.color,
        icon: account.icon,
        status: account.status
    });

    useEffect(() => {
        if (!account) return;
        setForm({
            title: account.title,
            balance: account.balance,
            type: account.type,
            color: account.color,
            icon: account.icon,
            status: account.status,
        });
    }, [account?.id]);

    const updateAccount = useUpdateAccount()

    const handleUpdate = () => {
        updateAccount.mutate({id: account.id, update: form}, {
            onSuccess: () => {
                toast.success("cập nhật thành công")
                setOpen(false)
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
                                Chỉnh sửa tài khoản
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                                Chỉnh sửa tài khoản an ba sỉnnn
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Separator />

                <div className="px-6 py-3">
                    <AccountForm 
                        account={form}
                        set={setForm}
                    />
                </div>

                <Separator />

                {/* Footer */}
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
                    onClick={handleUpdate}
                    className="rounded-lg h-9 px-5 text-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                    <Wallet size={14} className="mr-1.5" />
                    Lưu tài khoản
                </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AccountUpdate;