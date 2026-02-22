import ClientHeader from "@/components/client/ClientHeader";
import ClientSider from "@/components/client/ClientSider";
import React from "react";

interface Props {
    children: React.ReactNode
}
const ClientLayout = ({children}: Props) => {


    return (
        <div className="flex gap-5">
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