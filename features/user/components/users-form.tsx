import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import FieldRequired from "@/components/ui/field-required"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { User } from "../interfaces/user.interface";
import { Cake, Check, Eye, EyeClosed, Image, MailIcon, Mars, UserIcon, UserPlusIcon, Venus, X } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gender, UserStatus } from "@/common/constants/app.constant";
import { formatDateForInput, getBirthDateRange } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { useUpload } from "@/features/upload/upload.hook";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRolesQuery } from "@/features/role/role.hook";
import { Role } from "@/features/role/interfaces/role.interface";
import { UserFormValue } from "../interfaces/user-form.interface";
import { ApiError } from "next/dist/server/api-utils";


interface UsersFormProps {
    edit: boolean;
    handleSubmit: (e: any) => void; 
    user: UserFormValue,
    setUser: (user: UserFormValue) => void;
    fieldErrors: Record<string, string>
}

const UsersForm = ({
    edit = false,
    handleSubmit,
    user,
    setUser,
    fieldErrors
}: UsersFormProps) => {

    const uploadFile = useUpload()
    const [showPassword, setShowPassword] = useState<boolean>();
    const {data: roles} = useRolesQuery()
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return 
        if (!file.type.startsWith("image/")) {
            toast.error("File phải là hình ảnh")
            return
        }
        uploadFile.mutate(file, {
            onSuccess: (data) => {
                setUser({...user, avatar: data.url})
            },
            onError: (error: any) => {
                toast.error("Đăng ảnh thất bại")
            }
        })
    }
    return (
        <div className="pl-4 pr-4">
            <form  onSubmit={handleSubmit}>
                <FieldGroup>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldRequired>
                                    Họ và tên 
                                </FieldRequired>
                                <InputGroup>
                                    <InputGroupInput 
                                        placeholder="Nhập tên người dùng..."
                                        name="fullName"
                                        required
                                        value={user.fullName}
                                        onChange={
                                            (e) => setUser({
                                                ...user,
                                                fullName: e.target.value
                                            })
                                        }
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <UserIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>
                            {
                                    fieldErrors?.fullName && (
                                        <FieldError>
                                            {fieldErrors.fullName}
                                        </FieldError>
                                    )
                                }
                            <Field>
                                <FieldLabel>
                                    Chọn avatar 
                                </FieldLabel>

                                <InputGroup>
                                    <InputGroupInput 
                                        type="file"
                                        name="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        {
                                            uploadFile.isPending ? <Spinner /> : <Image />
                                        }
                                    </InputGroupAddon>
                                </InputGroup>
                                {
                                    user.avatar 
                                    ? 
                                    <Avatar size="lg">
                                        <AvatarImage src={user.avatar ?? ""}/>
                                    </Avatar>
                                    : 
                                    <></>
                                }
                                
                            </Field>
                            <Field>
                                <FieldRequired>
                                    Email
                                </FieldRequired>
                                <InputGroup>
                                    <InputGroupInput 
                                        type="email"
                                        name="email"
                                        placeholder="Nhập email..."
                                        onChange={
                                            (e) => setUser({
                                                ...user,
                                                email: e.target.value
                                            })
                                        }
                                        value={user.email}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <MailIcon />
                                    </InputGroupAddon>
                                    
                                </InputGroup>
                                {
                                    fieldErrors?.email && (
                                        <FieldError>
                                            {fieldErrors.email}
                                        </FieldError>
                                    )
                                }
                            </Field>
                            {
                                edit 
                                ? 
                                <></>
                                :
                                <Field>
                                    <FieldRequired>
                                        Mật khẩu
                                    </FieldRequired>
                                    <InputGroup>
                                        <InputGroupInput 
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Nhập mật khẩu..."
                                            onChange={
                                                (e) => setUser({
                                                    ...user,
                                                    password: e.target.value
                                                })
                                            }
                                            value={user.password}
                                        />
                                        <InputGroupAddon 
                                            align="inline-end" 
                                            className="cursor-pointer"
                                            onClick={() => setShowPassword(prev => !prev)}
                                        >
                                            {
                                                showPassword
                                                ? 
                                                <Eye />
                                                :
                                                <EyeClosed />
                                            }
                                        </InputGroupAddon>
                                        
                                    </InputGroup>
                                </Field>
                            }
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel>
                                        Giới tính
                                    </FieldLabel>
                                    <Select 
                                        name="gender" 
                                        onValueChange={
                                            (val) => setUser({
                                                ...user,
                                                gender: val as Gender
                                            })
                                        }
                                        value={user.gender ?? ""}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn giới tính "/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="male">
                                                    <Mars />
                                                </SelectItem>
                                                <SelectItem value="female">
                                                    <Venus />
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <Field>
                                    <FieldLabel>
                                        Trạng thái
                                    </FieldLabel>
                                    <Select 
                                        name="status"
                                        onValueChange={
                                            (val) => setUser({
                                                ...user,
                                                status: val as UserStatus
                                            })
                                        }
                                        value={user.status ?? ""}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn trạng thái"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="active">
                                                    <Check />
                                                </SelectItem>
                                                <SelectItem value="inactive">
                                                    <X />
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldRequired>
                                        Vai trò
                                    </FieldRequired>
                                    <Select 
                                        name="role"
                                        onValueChange={
                                            (val) => setUser({
                                                ...user,
                                                roleId: val
                                            })
                                        }
                                        value={user.roleId ?? ""}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn vai trò"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    roles?.items.map((item: Role) => (
                                                        <SelectItem key={item.id} value={item.id}>
                                                            {item.title}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {
                                        fieldErrors?.roleId && (
                                            <FieldError>
                                                {fieldErrors.roleId}
                                            </FieldError>
                                        )
                                    }
                                </Field>
                                <Field>
                                    <FieldLabel>
                                        Ngày sinh
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput 
                                            max={getBirthDateRange().max}
                                            min={getBirthDateRange().min}
                                            name="birthDate"
                                            type="date"
                                            placeholder="Chọn ngày sinh"
                                            onChange={
                                                (e) => setUser({
                                                    ...user,
                                                    birthDate: e.target.value
                                                })
                                            }
                                            value={user.birthDate ? formatDateForInput(user.birthDate) : ""}
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <Cake  />
                                        </InputGroupAddon>
                                        
                                    </InputGroup>
                                </Field>
                                
                            </div>
                            <Field>
                                <Button type="submit">
                                    Thêm
                                    <UserPlusIcon />
                                </Button>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    )
}

export default UsersForm