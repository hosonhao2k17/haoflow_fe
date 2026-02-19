import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useGetUser } from "../user.hook";
import { toast } from "sonner";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsUpDown, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { formatDate } from "@/lib/date";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";



interface Props {
    open: boolean;
    setOpen: (val: boolean) => void;
    userId: string;
}
const UserDetail = ({
    open,
    setOpen,
    userId
}: Props) => {
    const {data, error, isPending} = useGetUser(userId);
    const [openCollapse, setOpenCollapse] = useState<boolean>(false);
    if (!data) return null
    return (
        <>
            {
                isPending
                ?
                <h1>Wait </h1>
                :
                <Sheet
                    open={open}
                    onOpenChange={setOpen}
                >
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle> Chi tiết người dùng</SheetTitle>
                        </SheetHeader>
                        <div className="ml-3 mr-3">
                            {/* header profile  */}
                            <Separator />
                            <div className="flex items-center gap-5 mt-1 mb-1">
                                <Avatar className="h-20 w-20" >
                                    <AvatarImage src={data.avatar ?? "https://github.com/shadcn.png"}/>
                                    <AvatarFallback>
                                        {data.fullName}
                                    </AvatarFallback>
                                    <AvatarBadge>
                                        <PlusIcon />
                                    </AvatarBadge>
                                </Avatar>
                                <div className="flex flex-col gap-2 text-primary">
                                    <h1 className="font-bold text-2xl">{data.fullName}</h1>
                                    <p>{data.email}</p>
                                </div>
                                
                            </div>
                            <Separator />
                            {/* user info  */}
                            <Accordion
                                type="single"
                                defaultValue="user-info"
                            >
                                <AccordionItem value="user-info">
                                    <AccordionTrigger>
                                        Thông tin người dùng
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid grid-cols-2 gap-5">
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Họ và tên 
                                                        </FieldLabel>
                                                        <FieldDescription>{data.fullName}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Email
                                                        </FieldLabel>
                                                        <FieldDescription>{data.email}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Giới tính 
                                                        </FieldLabel>
                                                        <FieldDescription>{data.gender}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Sinh nhật
                                                        </FieldLabel>
                                                        <FieldDescription>{data.birthDate}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Trạng thái 
                                                        </FieldLabel>
                                                        <FieldDescription>{data.status}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Xác thực
                                                        </FieldLabel>
                                                        <FieldDescription>{data.status}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Ngày tạo
                                                        </FieldLabel>
                                                        <FieldDescription>{formatDate(data.createdAt)}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Ngày cập nhật
                                                        </FieldLabel>
                                                        <FieldDescription>{formatDate(data.updatedAt)}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Id
                                                        </FieldLabel>
                                                        <FieldDescription>{data.id}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Tạo bởi 
                                                        </FieldLabel>
                                                        <FieldDescription>{data.createdBy}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="role-info">
                                    <AccordionTrigger>Thông tin vai trò</AccordionTrigger>
                                    <AccordionContent>
                                         <div className="grid grid-cols-2 gap-5">
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Id 
                                                        </FieldLabel>
                                                        <FieldDescription>{data.role.id}</FieldDescription>
                                                        
                                                    </Field>
                                                </FieldGroup>
                                                
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Tên 
                                                        </FieldLabel>
                                                        <FieldDescription>{data.role.title}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Số lượng quyền 
                                                        </FieldLabel>
                                                        <FieldDescription>{data.role.permissions.length}</FieldDescription>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Các quyền
                                                        </FieldLabel>
                                                        <Collapsible
                                                            open={openCollapse}
                                                            onOpenChange={setOpenCollapse}
                                                        >   
                                                            <CollapsibleTrigger>
                                                                <Button variant="outline">
                                                                    Xem
                                                                    <ChevronsUpDown />
                                                                </Button>
                                                            </CollapsibleTrigger>
                                                            <CollapsibleContent>
                                                                {
                                                                    data.role.permissions.map((item) => (
                                                                        <div className="rounded-md border px-4 py-2 text-sm">
                                                                            <p className="font-medium">{item.subject}</p>
                                                                            <p className="text-muted-foreground">{item.action}</p>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </CollapsibleContent>
                                                        </Collapsible>
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                         </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="other-info">
                                    <AccordionTrigger>Khác</AccordionTrigger>
                                    <AccordionContent>
                                         <h1>Nothing</h1>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Separator />
                        </div>
                    </SheetContent>
                
                </Sheet>
            }
        </>
    )
}

export default UserDetail