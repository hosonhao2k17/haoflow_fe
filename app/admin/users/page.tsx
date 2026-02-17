"use client"

import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER, Gender, SortOrder, UserStatus } from "@/common/constants/app.constant";
import { Role } from "@/common/interfaces/role.interface";
import UsersCreate from "@/features/user/components/users-create";
import UsersTable from "@/features/user/components/users-table"
import { useRolesQuery } from "@/features/role/role.hook";
import { useUsersQuery } from "@/features/user/user.hook";
import { useEffect, useState } from "react";

const Users = () => {
  
  const [keyword, setKeyword] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [status, setStatus] = useState<UserStatus>();
  const [verified, setVerified] = useState<boolean>();
  const [gender, setGender] = useState<Gender>();
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_BY);
  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_SORT_ORDER)
  const [openUsersCreate, setOpenUsersCreate] = useState<boolean>(false);
  const {data: roles} = useRolesQuery()
  const {data, isLoading} = useUsersQuery({
    keyword,
    limit,
    page,
    status,
    verified,
    gender,
    sortBy,
    sortOrder
  })
  return (
    <>
      <UsersCreate
        roles={roles?.items}
        open={openUsersCreate}
        setOpenUsersCreate={setOpenUsersCreate} 
      />
      <UsersTable 
        isLoading={isLoading} 
        users={data?.items ?? []} 
        setKeyword={setKeyword} 
        setLimit={setLimit}
        setPage={setPage}
        offsetPagination={data?.pagination}
        setStatus={setStatus}
        setVerified={setVerified}
        setGender={setGender}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        setOpenUsersCreate={setOpenUsersCreate}
      />
    </>
  )
}

export default Users
