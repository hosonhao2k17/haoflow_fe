"use client"

import ClientHeader from "@/components/client/ClientHeader";
import ClientSider from "@/components/client/ClientSider";
import AiFloatChat from "@/features/ai/components/AiFloatChat";
import AiSheetChatBox from "@/features/ai/components/AiSheetChatBox";
import React, { useState } from "react";

interface Props {
    children: React.ReactNode
}
const ClientLayout = ({children}: Props) => {

    const [openChatBox,setOpenChatBox] = useState<boolean>(false);

    return (
        <div className="flex gap-5">
            {/* sheet chatbox  */}
            <AiSheetChatBox 
                open={openChatBox}
                setOpen={setOpenChatBox}
            />
            {/* ai float chat  */}
            <AiFloatChat 
                setOpen={setOpenChatBox}
            />
            {/* sider  */}
            <ClientSider />
            <div className="ml-64 w-full">
                <ClientHeader />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ClientLayout;