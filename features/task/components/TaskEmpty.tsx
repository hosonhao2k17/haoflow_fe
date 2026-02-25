import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { BookCheck, Calendar } from "lucide-react"



const TaskEmpty = () => {


    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <BookCheck />
                </EmptyMedia>
                <EmptyTitle>Chưa có nhiệm vụ nào</EmptyTitle>
                <EmptyDescription>
                    Bạn chưa có nhiệm vụ nào vui lòng thêm 1 vài nhiệm vụ
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
                <Button>Tạo</Button>
                <Button variant="outline">Thêm nhiều</Button>
            </EmptyContent>
        </Empty>
    )
}

export default TaskEmpty 