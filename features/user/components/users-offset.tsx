import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
    setLimit: (limit: number) => void;
    limit: number;
}

const UsersOffset = ({
    setLimit,
    limit
}: Props) => {

    return (
        <Field orientation="horizontal" >
            <FieldLabel>
                Lấy tất cả
            </FieldLabel>
            <Select defaultValue={limit.toString()} onValueChange={(value) => setLimit(parseInt(value))}>
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
    )
}

export default UsersOffset 