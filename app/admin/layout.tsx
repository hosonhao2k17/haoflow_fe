"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/user.store"
import { RoleName } from "@/common/constants/app.constant"
import AdminHeader from "@/components/admin/admin-header"
import AdminSider from "@/components/admin/admin-sider"
import { useAuthStore } from "@/store/auth.store"

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  const router = useRouter()
  const { user } = useUserStore()
  const { accessToken } = useAuthStore()

  const hasHydrated = useAuthStore.persist?.hasHydrated()

  useEffect(() => {
    if (!hasHydrated) return

    if (!accessToken) {
      router.replace("/login")
      return
    }

    if (user && user.role.name !== RoleName.ADMIN) {
      router.replace("/")
    }
  }, [user, accessToken, hasHydrated, router])

  if (!hasHydrated) return null

  return (
    <div className="flex bg-primary min-h-screen">
      <AdminSider />
      <div className="bg-white w-full mt-3 ml-64 mb-3 mr-3 shadow-white rounded-xl p-3">
        <AdminHeader />
        <div className="p-3">{children}</div>
      </div>
    </div>
  )
}

