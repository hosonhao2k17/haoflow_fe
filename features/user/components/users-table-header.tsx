import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "../interfaces/user.interface";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowDownNarrowWide, ArrowUpDown, ArrowUpNarrowWide, Check, Mars, Menu, Venus, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Role } from "@/features/role/interfaces/role.interface";
import { Label } from "@/components/ui/label";
import { Gender, SortOrder, UserStatus } from "@/common/constants/app.constant";

interface Filter {
    roleId: string
    setRoleId: (roleId: string) => void;
    status: UserStatus | undefined;
    setStatus: (status: UserStatus) => void;
    verified: boolean;
    setVerified: (verified: boolean) => void;
    sortBy: string;
    setSortBy: (sortBy: string) => void;
    gender: Gender;
    setGender: (gender: Gender) => void;
    sortOrder: SortOrder;
    setSortOrder: (sortOrder: SortOrder) => void;
}
interface Props {
    isAllSelected: boolean;
    setSelectedIds: (vals: string[]) => void;
    users: User[];
    roles: Role[];
    filter: Filter;
}

const UsersTableHeader = ({
    isAllSelected,
    setSelectedIds,
    users,
    roles,
    filter
}: Props) => {

    const { setRoleId,setStatus, setVerified, setSortBy, setSortOrder, sortOrder, gender, setGender} = filter 

    return (
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
                                onValueChange={(val) => setRoleId(val)}
                            >
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
                            <RadioGroup  onValueChange={(val: UserStatus) => setStatus(val)} className="min-w-fit">
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
                            <ArrowDownNarrowWide />
                            : 
                            <ArrowUpNarrowWide />
                        }
                    </Button>
                </TableHead>
                <TableHead className="w-20">
                    Thao tác
                </TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default UsersTableHeader