import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { User } from "../interfaces/user.interface";
import UsersForm from "./users-form";
import { UserFormValue } from "../interfaces/user-form.interface";
import { useUpdateUser } from "../user.hook";
import { UpdateUserDto } from "../interfaces/update-user-dto.interface";
import { toast } from "sonner";
import { useState } from "react";
import { mapFieldErrors } from "@/lib/map-field-error";



interface UsersEditProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    user: UserFormValue;
    setUser: (user: UserFormValue) => void;
}

const UsersEdit = ({open, setOpen, user, setUser}: UsersEditProps) => {

    const [fieldErrors, setFieldErrors] = useState<Record<string,string>>();
    const updateUser = useUpdateUser()
    const updateData: UpdateUserDto = {
        fullName: user?.fullName,
        email: user?.email,
        avatar: user?.avatar,
        gender: user?.gender,
        birthDate: user?.birthDate,
        verified: user?.verified,
        status: user?.status
    }

    const handleEdit = (e: any) => {
        e.preventDefault()
        updateUser.mutate(
            {
                id: user.id as string,
                dto: updateData
            },
            {
                onSuccess: (_) => {
                    toast.success("Cập nhật người dùng thành công")
                    setOpen(false)
                },
                onError: (error: any) => {
                    toast.error("Cập nhật người dùng thất bại")
                    setFieldErrors(mapFieldErrors(error.response.data))

                }
            }
        )
    }
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Chỉnh sửa người dùng</SheetTitle>
                </SheetHeader>
                <UsersForm 
                    fieldErrors={fieldErrors as Record<string, string>}
                    user={user}
                    edit={true}
                    handleSubmit={handleEdit}
                    setUser={setUser}
                />
            </SheetContent>
        </Sheet>
    )
}

export default UsersEdit