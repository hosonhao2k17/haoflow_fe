"use client"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Card, CardContent, CardFooter } from "../../../components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../../components/ui/input-group"
import { Field, FieldError, FieldLabel } from "../../../components/ui/field"
import { Button } from "../../../components/ui/button"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/auth.store"
import { toast } from "sonner"
import { mapFieldErrors } from "@/lib/map-field-error"
import { Spinner } from "../../../components/ui/spinner"
import { Checkbox } from "../../../components/ui/checkbox"
import { useUserStore } from "@/store/user.store"
import { RoleName } from "@/common/constants/app.constant"
import { useRouter } from "next/navigation"
import { useLogin } from "../auth.hook"
import { useCurrentUser } from "@/features/user/user.hook"
import { ApiError } from "@/common/interfaces/api-error.interface"


const LoginForm = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {setAuth} = useAuthStore();
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const loginMutation = useLogin()
    const router = useRouter()

    const handleLogin = async () => {
        loginMutation.mutate(
            {email, password},
            {
                onSuccess: (data) => {
                    toast.success("Đăng nhập thành công")
                    setAuth({
                        accessToken: data?.accessToken as string,
                        expiresIn: data?.expiresIn as number
                    })
                    router.replace("/")
                },
                onError: (err: any) => {
                    toast.error(err.response.data.message)
                    setFieldErrors(mapFieldErrors(err.response.data))
                    
                }
            }
        )
    }

    return (
        <Card className="w-full max-w-sm shadow-[0_0_20px_rgba(0,0,0,0.2)] shadow-primary-foreground">
            <h1 className="mb-6 text-3xl font-bold text-center text-primary uppercase">
                Đăng nhập
            </h1>

            <CardContent className="pt-0">
                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                    e.preventDefault()
                        handleLogin()
                    }}
                >
                    {/* Email */}
                    <Field>
                        <FieldLabel className="text-primary">Email</FieldLabel>

                        <InputGroup>
                            <InputGroupInput
                                type="email"
                                placeholder="Nhập email của bạn..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loginMutation.isPending}
                                className="h-11"
                            />

                            <InputGroupAddon align="inline-end">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>

                        {fieldErrors.email && (
                            <FieldError className="mt-2 text-sm text-red-500">
                            {fieldErrors.email}
                            </FieldError>
                        )}
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel className="text-primary">Mật khẩu</FieldLabel>

                        <InputGroup>
                            <InputGroupInput
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu của bạn..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loginMutation.isPending}
                            className="h-11"
                            />

                            <InputGroupAddon align="inline-end">
                            <button
                                type="button"
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="
                                flex items-center justify-center
                                bg-transparent border-0 p-0
                                text-muted-foreground
                                hover:text-primary
                                transition-colors
                                "
                            >
                                {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                                ) : (
                                <Eye className="w-4 h-4" />
                                )}
                            </button>
                            </InputGroupAddon>
                        </InputGroup>

                        {fieldErrors.password && (
                            <FieldError className="mt-2 text-sm text-red-500">
                            {fieldErrors.password}
                            </FieldError>
                        )}
                    </Field>

                    {/* Remember + forgot */}
                    <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox />
                        <span>Ghi nhớ tôi</span>
                    </label>

                    <a
                        href="#"
                        className="text-primary hover:underline transition-colors"
                    >
                        Quên mật khẩu?
                    </a>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full h-11 flex items-center justify-center gap-2"
                        >
                        {loginMutation.isPending ? <Spinner /> : <Lock className="w-4 h-4" />}
                        Đăng nhập
                    </Button>
                </form>
            </CardContent>
        </Card>
        )

}

export default LoginForm