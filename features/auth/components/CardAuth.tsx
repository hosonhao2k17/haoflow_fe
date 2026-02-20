import { Card, CardContent } from "@/components/ui/card"
import React from "react"


interface Props {
    children: React.ReactNode,
    title: string 
}

const CardAuth = ({children, title}: Props) => {


    return (
        <Card className="w-full max-w-sm shadow-[0_0_20px_rgba(0,0,0,0.2)] shadow-primary-foreground">
            <h1 className="mb-6 text-3xl font-bold text-center text-primary uppercase">
                {title}
            </h1>
            <CardContent className="pt-0">
                {children}
            </CardContent>
        </Card>
            
    )
}

export default CardAuth