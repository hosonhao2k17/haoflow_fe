"use client"
import { useUserStore } from "@/store/user.store"
import React, { useEffect } from "react"


const Providers = ({
    children
}: {
    children: React.ReactNode
}) => {
    const getCurrentUser = useUserStore(state => state.getCurrentUser)

    useEffect(() => {
        getCurrentUser()
    }, [getCurrentUser])

    return <>{children}</>
}

export default Providers