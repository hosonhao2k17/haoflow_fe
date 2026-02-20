"use client"

import { useEffect } from "react"
import { useCurrentUser } from "@/features/user/user.hook"
import { useAuthStore } from "@/store/auth.store"
import { useUserStore } from "@/store/user.store"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuthStore()
  const setUser = useUserStore((state) => state.setUser)

  const { data, isSuccess } = useCurrentUser({
    enabled: !!accessToken
  })

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data)
    }
  }, [data, isSuccess, setUser])

  return <>{children}</>
}

export default Providers
