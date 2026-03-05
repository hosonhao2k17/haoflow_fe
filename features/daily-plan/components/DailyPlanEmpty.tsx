import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ArrowUpRightIcon, ClipboardCheck, NotebookText } from "lucide-react"


interface Props {
    setOpenCreate: (open: boolean) => void;
}

export function DailyPlanEmpty({setOpenCreate}: Props) {
    return (
        <Empty className="border border-primary">
            <EmptyHeader>
                <EmptyMedia>
                    <ClipboardCheck size={30} />
                </EmptyMedia>
                <EmptyTitle>Chưa có kế hoạch ngày nào</EmptyTitle>
                <EmptyDescription>
                    Bạn chưa có kế hoạch ngày nào 
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
                <Button onClick={() => setOpenCreate(true)} >Tạo kế hoạch</Button>
                <Button variant="outline">Nhập excel</Button>
            </EmptyContent>
        </Empty>
    )
}
