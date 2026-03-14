"use client"

import ClientHeader from "@/components/client/ClientHeader";
import ClientSider from "@/components/client/ClientSider";
import AiFloatChat from "@/features/ai/components/AiFloatChat";
import AiSheetChatBox from "@/features/ai/components/AiSheetChatBox";
import React, { useState } from "react";
import AuthGuard from "../AuthGuard";

interface Props {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: Props) => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <AiSheetChatBox open={openChatBox} setOpen={setOpenChatBox} />
      <AiFloatChat setOpen={setOpenChatBox} />
      <ClientSider open={sidebarOpen} onOpenChange={setSidebarOpen} />
      {/* Flex layout: spacer = sider width, content = phần còn lại → tổng đúng 100%, không tràn ngang */}
      <div className="flex w-full min-w-0 max-w-full overflow-x-hidden">
        <div className="hidden md:block w-64 shrink-0" aria-hidden />
        <div className="flex-1 min-w-0 flex flex-col">
          <ClientHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-5 sm:p-6 flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default ClientLayout