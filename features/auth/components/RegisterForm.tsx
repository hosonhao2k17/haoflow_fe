"use client"

import { Card } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Cake, Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react"
import { useState } from "react"
import { Register } from "../interfaces/register.interface"
import { useRegister } from "../auth.hook"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { Gender } from "@/common/constants/app.constant"
import { mapFieldErrors } from "@/lib/map-field-error"


const RegisterForm  = () => {

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const defaultUser = {
        fullName: "",
        email: "",
        password: ""
        
    }
    const [user, setUser] = useState<Register>(defaultUser)
    const registerMutation = useRegister()

    const handleRegister = (e: any) => {
        e.preventDefault()
        registerMutation.mutate(user,{
            onSuccess: () => {
                toast.success("Đăng ký thành công vui lòng kiểm tra email");
                setUser(defaultUser)
            },
            onError: (error: any) => {
                toast.error("Đăng ký thất bại")
                if(error.response.data) {
                    setFieldErrors(mapFieldErrors(error.response.data))
                }
                setUser(defaultUser)
            }
        })
    }
    
    return (
        <form 
            className="space-y-6"
            onSubmit={handleRegister}
        >
            {/* fullName  */}
            <Field>
                <FieldLabel className="text-primary">Họ và tên</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        placeholder="Nhập họ và tên của bạn..."
                        value={user?.fullName}
                        onChange={(e) => setUser({...user, fullName: e.target.value})}
                        disabled={registerMutation.isPending}
                        className="h-11"
                    />

                    <InputGroupAddon align="inline-end">
                        <User className="w-4 h-4 text-muted-foreground" />
                    </InputGroupAddon>
                </InputGroup>

                {fieldErrors.fullName && (
                    <FieldError className="mt-2 text-sm text-red-500">
                    {fieldErrors.fullName}
                    </FieldError>
                )}
            </Field>
            {/* email */}
            <Field>
                <FieldLabel className="text-primary">Email</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        placeholder="Nhập email của bạn..."
                        value={user?.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        disabled={registerMutation.isPending}
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
            {/* password  */}
            <Field>
                <FieldLabel className="text-primary">Mật khẩu</FieldLabel>

                <InputGroup>
                    <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu của bạn..."
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    disabled={registerMutation.isPending}
                    className="h-11"
                    />

                    <InputGroupAddon align="inline-end" className=" cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? (
                            <Eye className="w-4 h-4 " />
                        ) : (
                            <EyeOff className="w-4 h-4 "/>
                        )}
                    </InputGroupAddon>
                </InputGroup>

                {fieldErrors.password && (
                    <FieldError className="mt-2 text-sm text-red-500">
                    {fieldErrors.password}
                    </FieldError>
                )}
            </Field>
            <div className="flex justify-between gap-4">
                <Field>
                    <FieldLabel className="text-primary">Giới tính</FieldLabel>
                    <Select 
                        onValueChange={(value: Gender) => setUser({...user, gender: value})}
                        value={user.gender ?? ""}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn giới tính"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="male">nam</SelectItem>
                                <SelectItem value="female">nữ</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {fieldErrors.gender && (
                        <FieldError className="mt-2 text-sm text-red-500">
                        {fieldErrors.gender}
                        </FieldError>
                    )}
                </Field>
                <Field>
                    <FieldLabel className="text-primary">Ngày sinh</FieldLabel>
                    <InputGroup>
                        <InputGroupInput
                            placeholder="Chọn ngày sinh..."
                            //value={formatDateForInput(user?.birthDate?.toString() as string)}
                            onChange={(e) => setUser({...user, birthDate: new Date(e.target.value)})}
                            disabled={registerMutation.isPending}
                            className="h-11"
                            type="date"
                            
                        />

                        <InputGroupAddon align="inline-end">
                            <Cake />
                        </InputGroupAddon>
                    </InputGroup>

                    {fieldErrors.birthDate && (
                        <FieldError className="mt-2 text-sm text-red-500">
                        {fieldErrors.birthDate}
                        </FieldError>
                    )}
                </Field>
                
            </div>
            <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full h-11 flex items-center justify-center gap-2"
                >
                {registerMutation.isPending ? <Spinner /> : <UserPlus className="w-4 h-4" />}
                Đăng ký
            </Button>
        </form>
    )
}

export default RegisterForm