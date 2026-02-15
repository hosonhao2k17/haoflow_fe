"use client"

import UsersTable from "@/components/admin/users/users-table"
import { useUsersQuery } from "@/queries/users/use-users.query";
import { useUserStore } from "@/store/user.store"
import { useEffect, useState } from "react";

const Users = () => {
  
  const [keyword, setKeyword] = useState<string>();
  const {data} = useUsersQuery({
    keyword
  })
  
  return (
    <UsersTable users={data?.items ?? []} setKeyword={setKeyword}/>
  )
}

export default Users
