import { OffsetPaginationRdo } from "@/common/interfaces/offset-pagination.interface"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"


interface Props {
    pagination: OffsetPaginationRdo;
    setPage: (page: number) => void;
}

const UsersPagination = ({
    pagination,
    setPage
}: Props) => {

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        onClick={() => {
                            if(pagination.page !== 1) {
                                setPage(pagination.page - 1)
                            }
                        }} 
                    />
                </PaginationItem>
                {
                    Array.from({length: pagination?.totalPages ?? 1}).map((item, index) => (
                        <PaginationItem key={index} >
                            <PaginationLink 
                                onClick={() => setPage(index + 1)} 
                                isActive={pagination?.page === index + 1 ? true : false}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }
                <PaginationItem>
                    <PaginationNext onClick={
                        () => {
                            if(pagination.page < pagination.totalPages) {
                                setPage(pagination.page + 1)
                            }
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default UsersPagination