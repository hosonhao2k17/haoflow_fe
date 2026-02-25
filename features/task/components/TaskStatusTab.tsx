import { TaskStatus } from "@/common/constants/app.constant"
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getColorActiveTaskStatus, getColorTaskStatus } from "@/lib/color";
import { cn } from "@/lib/utils";


interface Props {
    handleChangeValue: (val: TaskStatus | string) => void;
    defaultStatus: TaskStatus;
    isPending: boolean;
}

const TaskStatusTab = ({
    handleChangeValue,
    defaultStatus,
    isPending
}: Props) => {


    return (
        <Tabs 
            onValueChange={handleChangeValue} 
            defaultValue={defaultStatus}
            orientation="vertical"
        >
            <TabsList className={cn(
                "shadow-md",
                getColorTaskStatus(defaultStatus)
            )}
            >
                {
                    Object.values(TaskStatus).map((item) => (
                        <TabsTrigger 
                            disabled={isPending}
                            value={item}
                            className={getColorActiveTaskStatus(item)}
                            key={item}
                        >
                            {item}
                            
                        </TabsTrigger>
                    ))
                }
            </TabsList>
        </Tabs>
    )
}

export default TaskStatusTab