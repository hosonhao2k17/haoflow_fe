import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Collapsible } from "@/components/ui/collapsible"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"



const UsersDetailSkeleton = () => {


    return (
        <div className="ml-3 mr-3">
            <Separator />
                            <div className="flex items-center gap-5 mt-1 mb-1">
                                <Skeleton className="rounded-full w-20 h-20"/>
                                <div className="flex flex-col gap-2 text-primary">
                                    <Skeleton className="w-10 -h-4"/>
                                    <Skeleton  className="w-10 -h-4"/>
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
                                                        <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Email
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Giới tính 
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Sinh nhật
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Trạng thái 
                                                        </FieldLabel>
                                                         <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Xác thực
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Ngày tạo
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Ngày cập nhật
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Id
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Tạo bởi 
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
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
                                                        <Skeleton className="w-15 h-10" />
                                                        
                                                    </Field>
                                                </FieldGroup>
                                                
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Tên 
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Số lượng quyền 
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
                                                    </Field>
                                                </FieldGroup>
                                            </FieldGroup>
                                            <FieldGroup>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel>
                                                            Các quyền
                                                        </FieldLabel>
                                                        <Skeleton className="w-15 h-10" />
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
    )
}

export default UsersDetailSkeleton