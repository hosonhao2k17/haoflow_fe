"use client"
import { useCurrentUser } from "@/queries/users/use-current-user.query"
import { useUserStore } from "@/store/user.store"
import React, { useEffect } from "react"


const Providers = ({
    children
}: {
    children: React.ReactNode
}) => {
    const {data} = useCurrentUser()
    const setUser = useUserStore((state) => state.setUser)

    useEffect(() => {
        if(data) {
            setUser(data)
        }
    }, [data, setUser])

    return <>{children}</>
}

export default Providers