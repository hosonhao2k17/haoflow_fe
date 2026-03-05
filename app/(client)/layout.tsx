"use client"

import ClientHeader from "@/components/client/ClientHeader";
import ClientSider from "@/components/client/ClientSider";
import AiFloatChat from "@/features/ai/components/AiFloatChat";
import AiSheetChatBox from "@/features/ai/components/AiSheetChatBox";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AuthGuard from "../AuthGuard";

interface Props {
  children: React.ReactNode
}

const ClientLayout = ({ children }: Props) => {
  const [openChatBox, setOpenChatBox] = useState(false)
  

  return (
    <AuthGuard>
      <div className="flex gap-5">
        <AiSheetChatBox open={openChatBox} setOpen={setOpenChatBox} />
        <AiFloatChat setOpen={setOpenChatBox} />
        <ClientSider />
        <div className="ml-64 w-full">
          <ClientHeader />
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

export default ClientLayout