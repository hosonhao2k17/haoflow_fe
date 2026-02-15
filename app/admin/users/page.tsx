"use client"

import UsersTable from "@/components/admin/users/users-table"
import { useUsersQuery } from "@/queries/users/use-users.query";
import { useUserStore } from "@/store/user.store"
import { useEffect, useState } from "react";

const Users = () => {
  
  const [keyword, setKeyword] = useState<string>();
  const [limit, setLimit] = useState<number>(10);
  const {data, isLoading} = useUsersQuery({
    keyword,
    limit
  })
  
  return (
    <UsersTable isLoading={isLoading} users={data?.items ?? []} setKeyword={setKeyword} setLimit={setLimit}/>
  )
}

export default Users
