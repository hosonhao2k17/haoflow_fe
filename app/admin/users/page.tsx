"use client"

import UsersTable from "@/components/admin/users/users-table"
import { useUserStore } from "@/store/user.store"
import { useEffect, useState } from "react";

const Users = () => {
  
  const [keyword, setKeyword] = useState<string>('');
  const {getUsers, users} = useUserStore();
  useEffect(() => {
     getUsers({
      keyword
     })
  },[getUsers, keyword])
  return (
    <UsersTable users={users} setKeyword={setKeyword}/>
  )
}

export default Users
