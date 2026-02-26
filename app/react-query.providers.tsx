"use client"
import { queryClient } from "@/config/query-client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"


const ReactQueryProvider = ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider