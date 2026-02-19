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
import UsersForm from "./users-form";
import { User } from "../interfaces/user.interface";
import { UserFormValue } from "../interfaces/user-form.interface";


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
        gender: null,
        birthDate: null,
        password: "",
        roleId: ""
    }
    const [user, setUser] = useState<CreateUserDto>(defaultUserState);
    const [fieldErrors, setFieldErrors] = useState<Record<string,string>>({});
    const createUser = useCreateUser()
    const handleCreate = (e:any) => {
        e.preventDefault();
        createUser.mutate(user,{
            onSuccess: (data) => {
                toast.success("Người dùng tạo thành công")
                setOpenUsersCreate(false)
                setUser(defaultUserState)
            },
            onError: (err: any) => {
                console.log(user)
                console.log(err.response.data)
                toast.error("Người dụng chưa được tạo");
                setUser(defaultUserState)
                setFieldErrors(err.response.data)
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
                <UsersForm 
                    isPending={createUser.isPending}
                    handleSubmit={handleCreate}
                    user={user}
                    edit={false}
                    setUser={setUser as (val: UserFormValue) => void}
                    fieldErrors={fieldErrors}
                />
            </SheetContent>
        </Sheet>
    )
}

export default UsersCreate;