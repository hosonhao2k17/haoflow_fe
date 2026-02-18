import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";


interface Props {
    open: boolean;
    setOpen: (val: boolean) => void;
}
const UserDetail = ({
    open,
    setOpen
}: Props) => {


    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}
        >
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Chi tiết người dùng</SheetTitle>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default UserDetail