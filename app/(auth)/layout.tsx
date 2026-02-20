import React from "react"


interface Props {
    children: React.ReactNode
}

const AuthLayout = ({children}: Props) => {


    return (
        <div className="flex justify-center items-center min-h-screen bg-primary">
            {children}
        </div>
    )
}

export default AuthLayout