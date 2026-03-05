
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

interface Props {
    account: AccountFormValue;
    set: Dispatch<SetStateAction<AccountFormValue>>
}

const AccountForm = ({account, set}: Props) => {

  const upload = useUpload();
  const handleUpload = (file: File) => {
    upload.mutate(file, {
      onSuccess: (data) => {
        set({...account, icon: data.url})
      }
    }) 
  }
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

            {/* Loại & Trạng thái */}
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
                    <SelectItem value="credit">
                      <span className="flex items-center gap-2">
                        <CreditCard size={14} /> Thẻ tín dụng
                      </span>
                    </SelectItem>
                    <SelectItem value="investment">
                      <span className="flex items-center gap-2">
                        <TrendingUp size={14} /> Đầu tư
                      </span>
                    </SelectItem>
                    <SelectItem value="savings">
                      <span className="flex items-center gap-2">
                        <PiggyBank size={14} /> Tiết kiệm
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

            {/* Số dư ban đầu */}
            <Field>
              <Label className="flex items-center  text-sm font-medium ">
                <CircleDollarSign size={13} className="text-muted-foreground" />
                Số dư ban đầu
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                  ₫
                </span>
                <Input
                  value={account.balance}
                    onChange={(e) => set({...account, balance: Number(e.target.value) })}
                    type="number"
                    placeholder="0"
                    className="h-9 pl-7 rounded-lg"
                />
              </div>
            </Field>

            {/* Icon */}
           <Field>
              <Label className="flex items-center gap-1.5 text-sm font-medium mb-1.5">
                <ImagePlus size={13} className="text-muted-foreground" />
                Icon
              </Label>
              <div className="flex items-center gap-3">
                {/* Preview box */}
                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                 
                    {
                      account.icon 
                      ?
                      <img
                        src={account.icon}
                        alt="icon preview"
                        className="w-full h-full object-cover"
                      />
                      : 
                      <ImagePlus size={22} className="text-gray-300" />
                    }
                    
                </div>

                {/* Upload area */}
                <div  className="flex-1 space-y-1.5">
                    
                  {
                    upload.isPending 
                    ? 
                    <Spinner />
                    :
                    <label className="flex items-center justify-center gap-2 w-full h-9 rounded-lg border border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 hover:border-indigo-300 transition-colors text-sm text-muted-foreground hover:text-indigo-500"
                    >
                      <ImagePlus size={14} />
                      Chọn ảnh
                      <input
                        onChange={(e) => handleUpload(e.target.files?.[0] as File)}
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  }
                  {account.icon ? (
                    <button
                      type="button"
                      onClick={() => set({...account, icon: undefined})}
                      className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition-colors"
                    >
                      <X size={11} />
                      Xoá ảnh
                    </button>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, SVG · Tối đa 2MB
                    </p>
                  )}
                  
                </div>
              </div>
            </Field>

            {/* Color */}
            <Field>
              <Label className="flex items-center gap-1.5 text-sm font-medium mb-1.5">
                <Palette size={13} className="text-muted-foreground" />
                Màu sắc
              </Label>
              <div className="flex items-center gap-2">
                {[].map((color, i) => (
                  <button
                    key={color}
                    type="button"
                    className="w-6 h-6 rounded-full border-2 border-transparent transition-all hover:scale-110"
                    style={{
                      background: color,
                      boxShadow:
                        i === 0
                          ? `0 0 0 2px white, 0 0 0 3.5px ${color}`
                          : undefined,
                      transform: i === 0 ? "scale(1.15)" : undefined,
                    }}
                  />
                ))}
                <div 
                  className="h-10 border border-primary w-10 rounded-full mx-0.5" 
                  style={{background: account.color ?? 'blue'}}
                  />
                <label
                  className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 relative overflow-hidden"
                  title="Màu tuỳ chỉnh"
                >
                  <span className="text-gray-400 text-xs">+</span>
                  <input
                    onChange={(e) => set({...account, color: e.target.value})}
                    type="color"
                    className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                  />
                </label>
              </div>
            </Field>

        </FieldGroup>
    )
}

export default AccountForm 