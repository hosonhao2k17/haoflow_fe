"use client"

import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER, Gender, SortOrder, UserStatus } from "@/common/constants/app.constant";
import UsersTable from "@/components/admin/users/users-table"
import { useUsersQuery } from "@/queries/users/use-users.query";
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
    />
  )
}

export default Users
