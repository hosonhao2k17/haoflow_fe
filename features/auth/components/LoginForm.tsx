"use client"

import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { useAuthStore } from "@/store/auth.store"
import { useLogin } from "../auth.hook"
import { mapFieldErrors } from "@/lib/map-field-error"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const { setAuth } = useAuthStore()
  const loginMutation = useLogin()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          toast.success("Đăng nhập thành công")
          setAuth({ accessToken: data?.accessToken as string, expiresIn: data?.expiresIn as number })
          router.replace("/")
        },
        onError: (err: any) => {
          setFieldErrors(mapFieldErrors(err))
        },
      }
    )
  }

  const disabled = loginMutation.isPending

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      {/* Email */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled}
            className={cn("pl-9 h-10 text-sm", fieldErrors.email && "border-destructive")}
          />
        </div>
        {fieldErrors.email && (
          <p className="text-xs text-destructive">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium">Mật khẩu</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {fieldErrors.password && (
          <p className="text-xs text-destructive">{fieldErrors.password}</p>
        )}
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox />
          <span className="text-xs text-muted-foreground">Ghi nhớ tôi</span>
        </label>
        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
          Quên mật khẩu?
        </Link>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={disabled} className="w-full h-10 gap-2">
        {disabled ? <Spinner className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
        Đăng nhập
      </Button>

      {/* Register link */}
      <p className="text-center text-xs text-muted-foreground">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="text-primary font-medium hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </form>
  )
}

export default LoginForm