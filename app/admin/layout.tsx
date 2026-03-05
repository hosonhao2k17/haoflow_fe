"use client"

import { ReactNode } from "react"
import AdminHeader from "@/components/admin/admin-header"
import AdminSider from "@/components/admin/admin-sider"
import AuthGuard from "../AuthGuard"
import { RoleName } from "@/common/constants/app.constant"

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {

  return (
    <AuthGuard requiredRole={RoleName.ADMIN}>
      <div className="flex bg-primary min-h-screen">
        <AdminSider />
        <div className="bg-white w-full mt-3 ml-64 mb-3 mr-3 shadow-white rounded-xl p-3">
          <AdminHeader />
          <div className="p-3">{children}</div>
        </div>
      </div>
    </AuthGuard>
  )
}