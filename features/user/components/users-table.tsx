import { User } from "@/features/user/interfaces/user.interface"
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowBigDown, ArrowDownWideNarrow, ArrowUpDown, ArrowUpWideNarrow, Book, Check, Edit, ExternalLink, FileText, Info, Mars, Menu, Merge, MoreHorizontal, MoreHorizontalIcon, Plus, Sheet, Trash, UserPlus, UserRoundX, Venus, X } from "lucide-react";
import UsersDonutChart from "./users-donut-chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Gender, SortOrder, UserStatus } from "@/common/constants/app.constant";
import { formatDate } from "@/lib/date";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import TableSkeleton from "@/components/skeletons/table.skeleton";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { OffsetPaginationRdo } from "@/common/interfaces/offset-pagination.interface";
import { Arrow } from "radix-ui/internal";
import { useState } from "react";
import { UserFormValue } from "../interfaces/user-form.interface";
import { Role } from "@/features/role/interfaces/role.interface";
import { useRemoveUser } from "../user.hook";
import { toast } from "sonner";
import { AlertDialogDestructive } from "@/components/ui/aler-dialog";



interface Filter {
    roleId?: string
    setRoleId: (roleId: string | undefined) => void;
    status?: UserStatus;
    setStatus: (status: UserStatus | undefined) => void;
    verified?: boolean;
    setVerified: (verified: boolean | undefined) => void;
    sortBy: string;
    setSortBy: (sortBy: string) => void;
    gender?: Gender;
    setGender: (gender: Gender | undefined) => void;
    sortOrder: SortOrder;
    setSortOrder: (sortOrder: SortOrder) => void;
}

interface Props {
    users: User[];
    setUser: (user: UserFormValue) => void;
    roles: Role[];
    setOpenDetail: (open: boolean) => void;
    setOpenEdit: (open: boolean) => void;
    filter: Filter
}
const UsersTable = ({
    setUser,
    users,
    setOpenEdit,
    roles = [],
    setOpenDetail,
    filter
}: Props) => {

    const removeUser = useRemoveUser()
    const [confirmRemove, setConfirmRemove] = useState<boolean>(false);
    
    const handleRemove = (id: string) =>{
        removeUser.mutate(id,{
            onSuccess: () => {
                toast.success("Xóa người dùng thành công")
            },
            onError: () => {
                toast.error("Xóa người dùng thất bại")
            }
        })
    }
    
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const isAllSelected = users.length === selectedIds.length;
    const { 
        setRoleId,
        roleId,
        setStatus, 
        status,
        setVerified, 
        verified,
        setSortBy, 
        setSortOrder, 
        sortOrder, 
        gender, 
        setGender
    } = filter 
    return (
        
        <Table className="table-fixed" >
            <TableHeader>
                <TableRow>
                    <TableHead className="w-8" >
                        <Checkbox 
                            checked={isAllSelected}
                            onCheckedChange={(checked) => {
                                if(checked) {
                                    setSelectedIds(users.map((item) => item.id))
                                } else {
                                    setSelectedIds([])
                                }
                                }}
                        />
                    </TableHead>
                    <TableHead className="w-70">
                        Người dùng
                    </TableHead>
                    <TableHead className="w-40">
                        <Popover >
                            <PopoverTrigger asChild>
                                <Button variant="ghost">
                                    Vai trò
                                    <Menu  />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-43 p-3" align="start">
                                <RadioGroup 
                                    className="min-w-fit" 
                                    onValueChange={(val) => {
                                        setRoleId(val === "all" ? undefined : val)
                                    }}
                                    value={roleId ?? "all"}
                                >
                                    <div className="flex gap-3 items-center">
                                        <RadioGroupItem value="all" id="idAll"/>
                                        <Label className="bg-green-50">
                                            Tất cả
                                        </Label>
                                    </div>
                                    {
                                        roles?.map((item) => (
                                            <div key={item.id} className="flex gap-3 items-center">
                                                <RadioGroupItem value={item.id} id={item.id}/>
                                                <Label className="bg-green-50">
                                                    {item.title}
                                                </Label>
                                            </div>
                                        ))
                                    }
                                </RadioGroup>
                            </PopoverContent>
                        </Popover>
                    </TableHead>
                    <TableHead >
                        <Popover >
                            <PopoverTrigger >
                                <Button variant="ghost" >
                                    Trạng thái
                                    <Menu  />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-43 p-3" align="start">
                                <RadioGroup  
                                    onValueChange={(val: UserStatus | "all") => setStatus(val === "all" ? undefined : val)} 
                                    className="min-w-fit"
                                    value={status ?? "all"}
                                >
                                    <div className="flex gap-3 items-center">
                                        <RadioGroupItem value="all" id="all"/>
                                        <Label >
                                            tất cả 
                                        </Label>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <RadioGroupItem value="active" id="active"/>
                                        <Label className="text-green-500">
                                            active 
                                        </Label>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <RadioGroupItem value="inactive" id="inactive"/>
                                        <Label className="text-red-500">
                                            inactive
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </PopoverContent>
                        </Popover>
                    </TableHead>
                    <TableHead>
                        <Popover >
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    Xác thực
                                    <Menu  />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-20 p-3" align="end">
                                <RadioGroup 
                                    className="min-w-fit" 
                                    onValueChange={
                                        (value) => {
                                            if(value === "all") {
                                                setVerified(undefined)
                                            } else {
                                                setVerified(value === "true")
                                            }
                                        }
                                           
                                    }
                                    value={verified === undefined ? "all" : verified.toString()}
                                >
                                    <div className="flex gap-3 items-center">
                                        <RadioGroupItem value="all" id="true"/>
                                        <Info />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <RadioGroupItem value="true" id="true"/>
                                        <Check className="text-green-600"/>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <RadioGroupItem value="false" id="false"/>
                                        <X className="text-red-500"/>
                                    </div>
                                </RadioGroup>
                            </PopoverContent>
                        </Popover>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" onClick={() => {
                            setSortBy('birthDate')
                            setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC  : SortOrder.ASC)
                        }}>
                            Sinh nhật
                            {
                                <ArrowUpDown />
                            }
                        </Button>
                    </TableHead>
                    <TableHead>
                        <Popover >
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    Giới tính
                                    <Menu  />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-20 p-3" align="start">
                                <RadioGroup 
                                    onValueChange={(val: Gender | "all") => setGender(val === "all" ? undefined : val)} 
                                    className="min-w-fit"
                                    value={gender === undefined ? "all" : gender}
                                >
                                    <div className="flex gap-3 items-center">
                                        <RadioGroupItem value="all" id="all"/>
                                        <Merge />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <RadioGroupItem value="male" id="male"/>
                                        <Mars />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <RadioGroupItem value="female" id="female"/>
                                        <Venus />
                                    </div>
                                </RadioGroup>
                            </PopoverContent>
                        </Popover>
                    </TableHead>
                    <TableHead>
                        <Button variant="ghost" onClick={() => {
                            setSortBy('createdBy')
                            setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC  : SortOrder.ASC)
                        }}>
                            Ngày thêm
                            {
                                sortOrder === SortOrder.DESC 
                                ?
                                <ArrowDownWideNarrow />
                                : 
                                <ArrowUpWideNarrow />
                            }
                        </Button>
                    </TableHead>
                    <TableHead className="w-20">
                        Thao tác
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    users.length === 0 
                    ?
                    <TableRow >
                        <TableCell colSpan={8}>
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia>
                                        <UserRoundX />  
                                    </EmptyMedia>
                                    <EmptyTitle>
                                        Không có dữ liệu nào
                                    </EmptyTitle>
                                    <EmptyDescription>
                                        Không có dữ liệu nào được tìm thấy vui lòng thêm dữ liệu 
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent className="flex-row justify-center gap-3">
                                    <Button>Tạo</Button>
                                    <Button variant="outline">Nhập</Button>
                                </EmptyContent>
                            </Empty>
                        </TableCell>
                    </TableRow>
                    :
                    users.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Checkbox 
                                    checked={selectedIds.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                        if(checked) {
                                            setSelectedIds(prev => [...prev, item.id])
                                        } else {
                                            setSelectedIds(prev => prev.filter((val) => val !== item.id))
                                        }
                                        
                                    }}
                                    value={item.id}
                                />  
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-3 items-center">
                                    <Avatar >
                                        <AvatarImage src={item.avatar ?? "https://github.com/shadcn.png"}/>
                                    </Avatar>
                                    <div className="flex flex-col ">
                                        <h1 className="font-bold">{item.fullName}</h1>
                                        <p>{item.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="font-bold">{item.role.title}</TableCell>
                            <TableCell className="text-start">
                                <Badge className={item.status === UserStatus.ACTIVE ? "bg-green-700" : "bg-red-500"}>
                                    {item.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {
                                item.verified ? 
                                <Check className="text-green-600"/> : 
                                <X className="text-red-500"/>
                            }</TableCell>
                            <TableCell className="font-bold">
                                {item.birthDate ? formatDate(item.birthDate) : "Không"}
                            </TableCell>
                            <TableCell>
                                {
                                    item.gender === Gender.MALE ? 
                                    <Mars /> 
                                    : 
                                    <Venus />
                                }
                            </TableCell>
                            <TableCell className="font-bold">{formatDate(item.createdAt)}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontalIcon  className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem 
                                            onClick={() => {
                                                setUser({
                                                    ...item,
                                                    roleId: item.role.id
                                                })
                                                setOpenEdit(true)
                                            }}
                                        >
                                            <Edit />
                                            Sửa
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            onClick={() => {
                                                setOpenDetail(true)
                                                setUser({
                                                    id: item.id
                                                })
                                            }}
                                            
                                        >
                                            <ExternalLink />
                                            Chi tiết
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                            variant="destructive"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setConfirmRemove(true)
                                            }}
                                        >
                                            <Trash />
                                            Xóa
                                        </DropdownMenuItem>
                                        <AlertDialogDestructive 
                                            open={confirmRemove}
                                            setOpen={setConfirmRemove}
                                            title="Xóa người dùng"
                                            content="Bạn có chắc xóa người dùng này ko"
                                            onConfirm={() => handleRemove(item.id)}
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))
                            
                }
            </TableBody>
        </Table>

    )
}

export default UsersTable