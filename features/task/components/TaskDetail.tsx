import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Task } from "../interfaces/task.interface";
import { toast } from "sonner";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    task?: Task;
}


const TaskDetail = ({open, setOpen, task}: Props) => {

    if(!task) {
        return;
    }
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chi tiết nhiệm vụ</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <FieldLabel>
                            Tiêu đề
                        </FieldLabel>
                        <FieldDescription>
                            {task.todo}
                        </FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel>
                            Mô tả
                        </FieldLabel>
                        <FieldDescription>
                            {task.description}
                        </FieldDescription>
                    </Field>
                    <div className="flex gap-3">
                        <Field>
                            <FieldLabel>
                                Trạng thái 
                            </FieldLabel>
                            <FieldDescription>
                                {task.status}
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel>
                                độ ưu tiên
                            </FieldLabel>
                            <FieldDescription>
                                {task.priority}
                            </FieldDescription>
                        </Field>
                    </div>
                    
                    <div className="flex gap-3">
                        <Field>
                            <FieldLabel>
                                Giờ bắt đầu
                            </FieldLabel>
                            <FieldDescription>
                                {task.startTime}
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Giờ kết thúc
                            </FieldLabel>
                            <FieldDescription>
                                {task.endTime}
                            </FieldDescription>
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel>
                            Danh mục 
                        </FieldLabel>
                        <FieldDescription>
                            {task.category?.title}
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </DialogContent>
        </Dialog>
    )
}

export default TaskDetail 