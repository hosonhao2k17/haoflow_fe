
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";


interface Props {
    rows: number;
    columns: number;
}

const TableSkeleton = (prop: Props = {rows: 5, columns: 5}) => {
    const {rows, columns} = prop;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {
                        Array.from({length: columns}).map((_,i) => (
                            <TableHead key={i}>
                                <Skeleton className="h-9 w-full"/>
                            </TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {Array.from({ length: columns }).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                        <Skeleton className="h-12 w-full" />
                    </TableCell>
                    ))}
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableSkeleton