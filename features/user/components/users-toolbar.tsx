import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Book, FileText, Sheet, UserPlus } from "lucide-react"


interface Props {
    setKeyword: (keyword: string | undefined) => void;
    setOpenCreate: (open: boolean) => void;
}

const UsersToolbar = ({
    setKeyword,
    setOpenCreate
}: Props) => {

    return (
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
                    <Button onClick={() => setOpenCreate(true)}>
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
    )
}

export default UsersToolbar 