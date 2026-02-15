"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/user.store"
import { RoleName } from "@/common/constants/app.constant"
import { Bell, MessageCircle } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import AdminHeader from "@/components/admin/admin-header"
import AdminSider from "@/components/admin/admin-sider"

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  const router = useRouter()
  const { user } = useUserStore()

  useEffect(() => {
    if (!user) return
    if (user.role.name !== RoleName.ADMIN) {
      router.replace("/")
    }
  }, [user, router])

  return (
    <div className="flex bg-primary min-h-screen ">
        {/* sider  */}
        <AdminSider />
        {/* end sider  */}
        <div className="bg-white w-full mt-3 ml-64 mb-3 mr-3 shadow-white rounded-xl p-3">
            {/* header  */}
            <AdminHeader />
            
            {/* end header  */}
            <div className="p-3">
              {children}
            </div>
        </div>
    </div>
  )
}
