import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

const TransactionRowSkeleton = () => {
  return (
    <TableRow className="border-border/30">
      <TableCell className="pl-5 py-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
          <div className="space-y-1.5 min-w-0">
            <Skeleton className="h-3 w-28 rounded-md" />
            <Skeleton className="h-2.5 w-20 rounded-md" />
          </div>
        </div>
      </TableCell>

      <TableCell className="py-3">
        <Skeleton className="h-5 w-20 rounded-lg mb-1" />
        <Skeleton className="h-2.5 w-16 rounded-md" />
      </TableCell>

      <TableCell className="py-3">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3 w-3 rounded-sm" />
          <Skeleton className="h-5 w-16 rounded-lg" />
        </div>
      </TableCell>

      <TableCell className="py-3">
        <Skeleton className="h-3 w-16 rounded-md" />
      </TableCell>

      <TableCell className="py-3 text-right pr-5">
        <Skeleton className="h-3.5 w-20 rounded-md ml-auto" />
      </TableCell>
      <TableCell className="py-3 pr-3">
        <Skeleton className="h-3.5 w-3.5 rounded-sm" />
      </TableCell>
    </TableRow>
  )
}

export default TransactionRowSkeleton