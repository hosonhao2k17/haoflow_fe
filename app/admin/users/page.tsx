"use client"

import UsersTable from "@/components/admin/users/users-table"
import { useUserStore } from "@/store/user.store"
import { useEffect } from "react";

const Users = () => {
  
  const {getUsers, users} = useUserStore();
  useEffect(() => {
     getUsers()
  },[getUsers])
  return (
    <UsersTable users={users}/>
  )
}

export default Users
