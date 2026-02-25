import { TaskPriority } from "@/common/constants/app.constant"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import getColorPriority from "@/lib/priority";



interface Props {
    defaultValue: TaskPriority,
    handleValueChange?: (value: TaskPriority) => void;
}

const TaskSelectPriority = ({
    defaultValue,
    handleValueChange
}: Props) => {


    return (
        <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
            <SelectTrigger>
                <SelectValue placeholder="Chọn độ ưu tiên"  />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Chọn độ ưu tiên</SelectLabel>
                    {
                        Object.values(TaskPriority).map((item) => (
                            <SelectItem className={getColorPriority(item)} value={item}>{item}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default TaskSelectPriority