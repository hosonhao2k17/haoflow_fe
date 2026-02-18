import { Gender, RoleName, UserStatus } from "@/common/constants/app.constant";
import { Role } from "@/features/role/interfaces/role.interface";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Cake, Check, Eye, EyeClosed, Image, MailIcon, Mars, Merge, UserIcon, UserPlusIcon, Venus, X } from "lucide-react";
import React, { SubmitEventHandler, useState } from "react";
import { CreateUserDto } from "../interfaces/create-user-dto.interface";
import { useCreateUser } from "../user.hook";
import { toast } from "sonner";
import { useUpload } from "@/features/upload/upload.hook";
import { Spinner } from "@/components/ui/spinner";
import FieldRequired from "@/components/ui/field-required";
import { getBirthDateRange } from "@/lib/date";


interface Props {
    open: boolean;
    setOpenUsersCreate: (open: boolean) => void;
    roles: Role[];
}

const UsersCreate = ({open, setOpenUsersCreate, roles}:Props) => {
    const defaultUserState = {
        fullName: "",
        email: "",
        status: UserStatus.ACTIVE,
        avatar: null,
        verified: false,
        gender: Gender.MALE,
        birthDate: null,
        password: "",
        roleId: ""
    }
    const [user, setUser] = useState<CreateUserDto>(defaultUserState);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const createUser = useCreateUser()
    const uploadFile = useUpload()

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
    const handleCreate = (e:any) => {
        e.preventDefault();
        createUser.mutate(user,{
            onSuccess: (data) => {
                toast.success("Người dùng tạo thành công")
                setOpenUsersCreate(false)
            },
            onError: (err: any) => {
                toast.error("Người dụng chưa được tạo");
                setUser(defaultUserState)
            }
        });
        
        
    }
    return (
        <Sheet open={open} onOpenChange={setOpenUsersCreate} >
            <SheetContent className="border-primary ">
                <SheetHeader >
                    <SheetTitle className="flex gap-2 items-center justify-center">Thêm 1 người dùng mới <UserPlusIcon /> </SheetTitle>
                    <SheetDescription>Thêm một người dùng mới bất kỳ</SheetDescription>
                </SheetHeader>
                <div className="pl-4 pr-4">
                    <form  onSubmit={handleCreate}>
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
                                    </Field>
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
                                                            roles?.map((item) => (
                                                                <SelectItem key={item.id} value={item.id}>
                                                                    {item.title}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
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
                                                    value={user.birthDate ?? ""}
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
            </SheetContent>
        </Sheet>
    )
}

export default UsersCreate;