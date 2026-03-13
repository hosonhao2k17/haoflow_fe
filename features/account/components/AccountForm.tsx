
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wallet,
  Building2,
  CreditCard,
  TrendingUp,
  PiggyBank,
  CircleDollarSign,
  Palette,
  Tag,
  LayoutGrid,
  Activity,
  ImagePlus,
  X,
} from "lucide-react";
import { CreateAccount } from "../interfaces/create-account.interface";
import { UpdateAccount } from "../interfaces/update-account.interface";
import { Dispatch, SetStateAction, useState } from "react";
import { AccountFormValue } from "../interfaces/account-form-value.interface";
import { AccountStatus, AccountType } from "@/common/constants/finance.constant";
import { useUpload } from "@/features/upload/upload.hook";
import { Spinner } from "@/components/ui/spinner";
import IconPicker from "@/components/common/IconPicker";
import ColorPicker from "@/components/common/ColorPicker";
import InputVnd from "@/components/common/InputVnd";
import { amountToWords } from "@/lib/vnd";
import  LogoPicker  from "@/components/common/LogoPicker";

interface Props {
    account: AccountFormValue;
    set: Dispatch<SetStateAction<AccountFormValue>>
}

const AccountForm = ({account, set}: Props) => {

 
    return (
        <FieldGroup >
            <Field>
              <Label className="flex items-center  text-sm font-medium">
                <Tag size={13} className="text-muted-foreground" />
                Tiêu đề
              </Label>
              <Input
                value={account.title}
                placeholder="VD: Ví MoMo, Techcombank..."
                className="h-9 rounded-lg"
                onChange={(e) => set({...account, title: e.target.value})}
              />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field>
                <Label className="flex items-center text-sm font-medium">
                  <LayoutGrid size={13} className="text-muted-foreground" />
                  Loại tài khoản
                </Label>
                <Select
                  value={account.type}
                  onValueChange={(val: AccountType) => set({...account, type: val})}
                >
                  <SelectTrigger className="h-9 rounded-lg">
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">
                      <span className="flex items-center gap-2">
                        <CircleDollarSign size={14} /> Tiền mặt
                      </span>
                    </SelectItem>
                    <SelectItem value="bank">
                      <span className="flex items-center gap-2">
                        <Building2 size={14} /> Ngân hàng
                      </span>
                    </SelectItem>
                    <SelectItem value="wallet">
                      <span className="flex items-center gap-2">
                        <Wallet size={14} /> Ví điện tử
                      </span>
                    </SelectItem>
                    
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Label className="flex items-center text-sm font-medium">
                  <Activity size={13} className="text-muted-foreground" />
                  Trạng thái
                </Label>
                <Select
                  value={account.status}
                  onValueChange={(val: AccountStatus) => set({...account, status: val})}
                >
                  <SelectTrigger className="h-9 rounded-lg">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                        Hoạt động
                      </span>
                    </SelectItem>
                    <SelectItem value="inactive">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                        Không hoạt động
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <Label className="flex items-center  text-sm font-medium ">
                <CircleDollarSign size={13} className="text-muted-foreground" />
                Số dư ban đầu
              </Label>
                <InputVnd 
                  isPending={false}
                  value={account.balance}
                  onChange={(val) => set({...account, balance: val ?? 0})}

                />
                <p className="text-xs text-muted-foreground italic pl-1">{amountToWords(account.balance)}</p>
            </Field>

           <Field>
              <Label className="flex items-center text-sm font-medium ">
                <ImagePlus size={13} className="text-muted-foreground" />
                Logo
              </Label>
              <LogoPicker 
                value={account.logo as string}
                onChange={(logo) => set({...account, logo})}
              />
            </Field>

            <Field>
              <Label className="flex items-center gap-1.5 text-sm font-medium">
                <Palette size={13} className="text-muted-foreground" />
                Màu sắc
              </Label>
              <ColorPicker 
                value={account.color}
                onChange={(color) => set({...account, color})}
              />
            </Field>

        </FieldGroup>
    )
}

export default AccountForm 