import { TableCell, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";



const TransactionEmptyRow = () => (
    <TableRow>
        <TableCell colSpan={6} className="py-20 text-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Search size={28} className="opacity-30" />
                <p className="text-sm">Không tìm thấy giao dịch</p>
            </div>
        </TableCell>
    </TableRow>
)

export default TransactionEmptyRow