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
import { CreateUserDto } from "@/features/user/user.api";
import { Cake, Check, EyeClosed, Image, MailIcon, Mars, Merge, UserIcon, UserPlusIcon, X } from "lucide-react";
import { SubmitEventHandler, useState } from "react";


interface Props {
    open: boolean;
    setOpenUsersCreate: (open: boolean) => void;
    roles: Role[];
}

const UsersCreate = ({open, setOpenUsersCreate, roles}:Props) => {
    const [user, setUser] = useState<CreateUserDto>({
        fullName: "",
        email: "",
        status: UserStatus.ACTIVE,
        avatar: null,
        verified: false,
        gender: Gender.MALE,
        birthDate: null,
        password: ""
    });
    console.log(roles)
    const handleCreate = (e) => {
        e.preventDefault()
        console.log(user)
    }
    return (
        <Sheet open={open} onOpenChange={setOpenUsersCreate} >
            <SheetContent className="border-primary ">
                <SheetHeader >
                    <SheetTitle>Thêm 1 người dùng mới</SheetTitle>
                    <SheetDescription>Thêm một người dùng mới bất kỳ</SheetDescription>
                </SheetHeader>
                <div className="pl-4 pr-4">
                    <form  onSubmit={handleCreate}>
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel>
                                            Họ và tên
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput 
                                                placeholder="Nhập tên người dùng..."
                                                name="fullName"
                                                onChange={
                                                    (e) => setUser((prev) => ({
                                                        ...user,
                                                        fullName: e.target.value
                                                    }))
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
                                        <Avatar size="lg">
                                            <AvatarImage src="https://github.com/shadcn.png"/>
                                        </Avatar>
                                        <InputGroup>
                                            <InputGroupInput 
                                                type="file"
                                                name="avatar"
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <Image />
                                            </InputGroupAddon>
                                        </InputGroup>
                                        
                                    </Field>
                                    <Field>
                                        <FieldLabel>
                                            Email
                                        </FieldLabel>
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
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <MailIcon />
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Field>
                                    <Field>
                                        <FieldLabel>
                                            Mật khẩu
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput 
                                                type="password"
                                                name="password"
                                                placeholder="Nhập mật khẩu..."
                                                onChange={
                                                    (e) => setUser({
                                                        ...user,
                                                        password: e.target.value
                                                    })
                                                }
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <EyeClosed />
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
                                                            <Merge />
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
                                            <FieldLabel>
                                                Vai trò 
                                            </FieldLabel>
                                            <Select 
                                                name="role"
                                                // onValueChange={
                                                //     (val) => setUser({
                                                //         ...user,
                                                //         role: val as Gender
                                                //     })
                                                // }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn vai trò"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            roles?.map((item) => (
                                                                <SelectItem value={item.name}>
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
                                                    name="birthDate"
                                                    type="date"
                                                    placeholder="Chọn ngày sinh"
                                                    onChange={
                                                        (e) => setUser({
                                                            ...user,
                                                            birthDate: e.target.value
                                                        })
                                                    }
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