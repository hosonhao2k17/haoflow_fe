import { User } from "@/common/interfaces/user.interface"
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowBigDown, ArrowDownWideNarrow, ArrowUpWideNarrow, Book, Check, Edit, ExternalLink, FileText, Mars, Menu, MoreHorizontal, MoreHorizontalIcon, Plus, Sheet, Trash, UserPlus, UserRoundX, Venus, X } from "lucide-react";
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



interface Props {
    users: User[];
    setKeyword: (keyword: string | undefined) => void;
    setLimit: (limit: number) => void;
    isLoading: boolean;
    setPage: (page: number) => void;
    offsetPagination: OffsetPaginationRdo;
    setStatus: (status: UserStatus) => void;
    setVerified: (verified: boolean) => void;
    setGender: (gender: Gender) => void;
    setSortBy: (sortBy: string) => void;
    setSortOrder: (sortOrder: SortOrder) => void;
    sortOrder: SortOrder
}
const UsersTable = ({
    users,
    setKeyword,
    setLimit,
    isLoading,
    setPage,
    offsetPagination,
    setStatus,
    setVerified,
    setGender,
    setSortBy,
    setSortOrder,
    sortOrder
}: Props) => {


    return (
        <div className="flex flex-col">
            {/* header  */}
            <div className=" w-full grid grid-cols-3 gap-3">
                {/* left */}
                <div className="grid grid-col-3 col-span-2 gap-3 border p-4 rounded-2xl border-primary">
                    <div className="flex gap-5">
                        <Field>
                            <FieldLabel>Tìm kiếm</FieldLabel>
                            <ButtonGroup>
                                <Input 
                                    placeholder="Nhập tên hoặc email...." 
                                    onChange={(e) => setKeyword(e.target.value === '' ? undefined : e.target.value)}
                                />
                                <Button>Tìm</Button>
                            </ButtonGroup>
                        </Field>
                        <Field>
                            <FieldLabel>Thay đổi</FieldLabel>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn một cái gì đó"/>
                                </SelectTrigger>
                            </Select>
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel>Tùy chọn</FieldLabel>
                        <ButtonGroup>
                            <Button>
                                <UserPlus />
                                Thêm
                            </Button>
                            <Button>
                                <Sheet />
                                Nhập Excel
                            </Button>
                            <Button>
                                <Sheet />
                                Xuất Excel
                            </Button>
                            <Button>
                                <FileText />
                                Xuất Pdf
                            </Button>
                            <Button>
                                <Book />
                                Xuất Word
                            </Button>
                        </ButtonGroup>
                    </Field>
                    
                    
                </div>
                {/* right */}
                <div className="border rounded-xl flex justify-between p-4 border-primary">
                    <h1>Notes</h1>
                    <UsersDonutChart />
                </div>
            </div>
            {/* table */}
            <div className="border mt-3 p-2 relative rounded-xl border-primary">
                <div className="flex justify-between items-center m-2">
                    <div>
                        <Badge variant="outline">0 trên 5 dòng đã chọn</Badge>
                    </div>

                    <div className="flex">
                        <Field orientation="horizontal" >
                            <FieldLabel>
                                Lấy tất cả
                            </FieldLabel>
                            <Select defaultValue="10" onValueChange={(value) => setLimit(parseInt(value))}>
                                <SelectTrigger className="bg-primary text-primary-foreground">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent  className="bg-primary text-primary-foreground">
                                    <SelectGroup >
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => {
                                            if(offsetPagination.page !== 1) {
                                                setPage(offsetPagination.page - 1)
                                            }
                                        }} 
                                    />
                                </PaginationItem>
                                {
                                    Array.from({length: offsetPagination?.totalPages ?? 1}).map((item, index) => (
                                        <PaginationItem >
                                            <PaginationLink 
                                                onClick={() => setPage(index + 1)} 
                                                isActive={offsetPagination?.page === index + 1 ? true : false}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))
                                }
                                <PaginationItem>
                                    <PaginationNext onClick={
                                        () => {
                                            if(offsetPagination.page < offsetPagination.totalPages) {
                                                setPage(offsetPagination.page + 1)
                                            }
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
                <div className="mt-2">
                    {
                        isLoading ? <TableSkeleton rows={5} columns={5} /> :
                        <Table className="table-fixed" >
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-8" >
                                    <Checkbox />
                                </TableHead>
                                <TableHead className="w-70">
                                    Người dùng
                                </TableHead>
                                <TableHead>
                                    <Popover >
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost">
                                                Vai trò
                                                <Menu  />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-43 p-3" align="start">
                                            <RadioGroup className="min-w-fit">
                                                <div className="flex gap-3 items-center">
                                                    <RadioGroupItem value="user" id="active"/>
                                                    <Label className="bg-green-50">
                                                        Người dùng
                                                    </Label>
                                                </div>
                                                <div className="flex gap-3 items-center">
                                                    <RadioGroupItem value="admin" id="inactive"/>
                                                    <Label className="bg-green-50">
                                                        Quản trị viên
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </PopoverContent>
                                    </Popover>
                                </TableHead>
                                <TableHead className="flex items-center">
                                    <Popover >
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                Trạng thái
                                                <Menu  />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-43 p-3" align="start">
                                            <RadioGroup  onValueChange={(val) => setStatus(val as UserStatus)} className="min-w-fit">
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
                                            <RadioGroup className="min-w-fit" onValueChange={(value) => setVerified(value === "true")}>
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
                                    <Popover >
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                Giới tính
                                                <Menu  />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-20 p-3" align="start">
                                            <RadioGroup onValueChange={(val: Gender) => setGender(val)} className="min-w-fit">
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
                                <TableHead>
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
                                    <TableRow className="hover:bg-primary hover:text-primary-foreground text-primary">
                                        <TableCell> <Checkbox/> </TableCell>
                                        <TableCell>
                                            <div className="flex gap-3 items-center">
                                                <Avatar >
                                                    <AvatarImage src="https://github.com/shadcn.png"/>
                                                </Avatar>
                                                <div className="flex flex-col ">
                                                    <h1 className="font-bold">{item.fullName}</h1>
                                                    <p>{item.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold">{item.role.title}</TableCell>
                                        <TableCell>
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
                                                        <MoreHorizontalIcon />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Edit />
                                                        Sửa
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <ExternalLink />
                                                        Chi tiết
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive">
                                                        <Trash />
                                                        Xóa
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                        
                            }
                        </TableBody>
                    </Table>
                    }
                    
                </div>
            </div>

        </div>
    )
}

export default UsersTable