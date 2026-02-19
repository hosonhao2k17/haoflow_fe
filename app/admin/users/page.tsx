"use client"

import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER, Gender, SortOrder, UserStatus } from "@/common/constants/app.constant";
import { Role } from "@/features/role/interfaces/role.interface";
import UsersCreate from "@/features/user/components/users-create";
import UsersTable from "@/features/user/components/users-table"
import { useRolesQuery } from "@/features/role/role.hook";
import { useUsersQuery } from "@/features/user/user.hook";
import { useEffect, useState } from "react";
import UsersEdit from "@/features/user/components/users-edit";
import { UserFormValue } from "@/features/user/interfaces/user-form.interface";
import UsersToolbar from "@/features/user/components/users-toolbar";
import UsersPieChart from "@/features/user/components/users-donut-chart";
import UserDetail from "@/features/user/components/users-detail";
import { Badge } from "@/components/ui/badge";
import UsersPagination from "@/features/user/components/users-pagination";
import UsersOffset from "@/features/user/components/users-offset";
import TableSkeleton from "@/components/skeletons/table.skeleton";

const Users = () => {
  
    const [keyword, setKeyword] = useState<string>();
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [status, setStatus] = useState<UserStatus>();
    const [verified, setVerified] = useState<boolean>();
    const [gender, setGender] = useState<Gender>();
    const [roleId, setRoleId] = useState<string>()
    const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_BY);
    const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_SORT_ORDER)
    const [openUsersCreate, setOpenUsersCreate] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [user, setUser] = useState<UserFormValue>();
    

    const {data: roles} = useRolesQuery()
    const {data, isLoading} = useUsersQuery({
        keyword,
        limit,
        page,
        status,
        verified,
        gender,
        sortBy,
        sortOrder,
        roleId
    })
    return (
        <>
        <UsersEdit 
            setOpen={setOpenEdit}
            open={openEdit}
            user={user as UserFormValue}
            setUser={setUser}
        />
        <UsersCreate
            roles={roles?.items}
            open={openUsersCreate}
            setOpenUsersCreate={setOpenUsersCreate} 
        />
        <UserDetail
            open={openDetail}
            userId={user?.id as string}
            setOpen={setOpenDetail}
        />
        <div className="flex flex-col">
                {/* header  */}
                <div className=" w-full grid grid-cols-3 gap-3">
                {/* left */}
                    <UsersToolbar
                        setKeyword={setKeyword}
                        setOpenCreate={setOpenUsersCreate}
                    />
                    {/* right  */}
                    <div className="border rounded-xl flex justify-between p-4 border-primary">
                        <h1>Notes</h1>
                        <UsersPieChart />
                    </div>
                </div>
                <div className="border mt-3 p-2 relative rounded-xl border-primary">
                    <div className="flex justify-between items-center m-2">
                        <div>
                            <Badge variant="outline">Tổng ({data?.pagination.totalRecords})</Badge>
                        </div>

                        <div className="flex">
                            <UsersOffset 
                                limit={limit}
                                setLimit={setLimit}
                            />
                            <UsersPagination
                                pagination={data?.pagination}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                    {/* table  */}
                    <div className="mt-2">
                        {
                            isLoading
                            ?
                            <TableSkeleton rows={5} columns={5}/>
                            : 
                            <UsersTable 
                                roles={roles?.items}
                                setOpenEdit={setOpenEdit}
                                setOpenDetail={setOpenDetail}
                                setUser={setUser}
                                users={data?.items ?? []} 
                                filter={{
                                    setStatus,
                                    status,
                                    setVerified,
                                    verified,
                                    setGender,
                                    gender,
                                    setSortBy,
                                    sortBy,
                                    setSortOrder,
                                    sortOrder,
                                    setRoleId,
                                    roleId
                                }}
                            />
                        }
                    </div>
                </div>
                
        </div>
        
        </>
    )
}

export default Users
