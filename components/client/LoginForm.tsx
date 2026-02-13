"use client"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Button } from "../ui/button"
import React, { SubmitEventHandler, useEffect, useState } from "react"
import { useAuthStore } from "@/store/auth.store"
import { ApiError } from "@/common/interfaces/api-error.interface"
import { toast } from "sonner"
import { useFieldErrors } from "@/hooks/use-field-error"
import { Spinner } from "../ui/spinner"
import { Checkbox } from "../ui/checkbox"


const LoginForm = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {login, isLoading, isAuthenticated, error} = useAuthStore()

    useEffect(() => {
        if (isAuthenticated) {
            toast.success("Đăng nhập thành công")
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (error && !error.details) {
            toast.error(error.message)
        }
        setEmail('')
        setPassword('')
    }, [error])

    const fieldErrors = useFieldErrors(error)

    const handleLogin = async () => {
        await login({email, password})
    }

    return (
        <Card className="w-full max-w-sm shadow-lg shadow-primary/30">
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
                            disabled={isLoading}
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
                        disabled={isLoading}
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
                    disabled={isLoading}
                    className="w-full h-11 flex items-center justify-center gap-2"
                    >
                    {isLoading ? <Spinner /> : <Lock className="w-4 h-4" />}
                    Đăng nhập
                </Button>
            </form>
            </CardContent>
        </Card>
        )

}

export default LoginForm