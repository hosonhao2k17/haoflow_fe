"use client"

import { Cake, Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { useRegister } from "../auth.hook"
import { Register } from "../interfaces/register.interface"
import { Gender } from "@/common/constants/app.constant"
import { mapFieldErrors } from "@/lib/map-field-error"
import { toast } from "sonner"
import Link from "next/link"
import { cn } from "@/lib/utils"

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const registerMutation = useRegister()

  const defaultUser: Register = { fullName: "", email: "", password: "" }
  const [user, setUser] = useState<Register>(defaultUser)
  const patch = (key: keyof Register, value: any) => setUser((prev) => ({ ...prev, [key]: value }))

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    registerMutation.mutate(user, {
      onSuccess: () => {
        toast.success("Đăng ký thành công! Vui lòng kiểm tra email.")
        setUser(defaultUser)
      },
      onError: (error: any) => {
        toast.error("Đăng ký thất bại")
        if (error.response?.data) setFieldErrors(mapFieldErrors(error.response.data))
        setUser(defaultUser)
      },
    })
  }

  const disabled = registerMutation.isPending

  return (
    <form className="space-y-4" onSubmit={handleRegister}>
      {/* Full name */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium">Họ và tên</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Nguyễn Văn A"
            value={user.fullName}
            onChange={(e) => patch("fullName", e.target.value)}
            disabled={disabled}
            className={cn("pl-9 h-10 text-sm", fieldErrors.fullName && "border-destructive")}
          />
        </div>
        {fieldErrors.fullName && <p className="text-xs text-destructive">{fieldErrors.fullName}</p>}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="you@example.com"
            value={user.email}
            onChange={(e) => patch("email", e.target.value)}
            disabled={disabled}
            className={cn("pl-9 h-10 text-sm", fieldErrors.email && "border-destructive")}
          />
        </div>
        {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium">Mật khẩu</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={user.password}
            onChange={(e) => patch("password", e.target.value)}
            disabled={disabled}
            className={cn("pl-9 pr-10 h-10 text-sm", fieldErrors.password && "border-destructive")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {fieldErrors.password && <p className="text-xs text-destructive">{fieldErrors.password}</p>}
      </div>

      {/* Gender + Birthdate */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Giới tính</Label>
          <Select
            onValueChange={(value: Gender) => patch("gender", value)}
            value={user.gender ?? ""}
          >
            <SelectTrigger className={cn("h-10 text-sm", fieldErrors.gender && "border-destructive")}>
              <SelectValue placeholder="Chọn..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldErrors.gender && <p className="text-xs text-destructive">{fieldErrors.gender}</p>}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Ngày sinh</Label>
          <div className="relative">
            <Cake className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="date"
              onChange={(e) => patch("birthDate", new Date(e.target.value))}
              disabled={disabled}
              className={cn("pl-9 h-10 text-sm", fieldErrors.birthDate && "border-destructive")}
            />
          </div>
          {fieldErrors.birthDate && <p className="text-xs text-destructive">{fieldErrors.birthDate}</p>}
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={disabled} className="w-full h-10 gap-2">
        {disabled ? <Spinner className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
        Đăng ký
      </Button>

      {/* Login link */}
      <p className="text-center text-xs text-muted-foreground">
        Đã có tài khoản?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm