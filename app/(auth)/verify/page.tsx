'use client'

import { useEffect } from "react"
import { useVerify } from "@/features/auth/auth.hook"
import { Loader } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

const VerifyLoadingPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const { mutate, isPending, isSuccess, isError } = useVerify()

    useEffect(() => {
        if (!token) {
            toast.error("Vui lòng cung cấp token")
            router.replace("/")
        }
    }, [token, router])

    useEffect(() => {
        if (token) {
            mutate(token)
        }
    }, [token, mutate])

    useEffect(() => {
        if (isSuccess) {
            toast.success("Xác thực email thành công")
            setTimeout(() => {
                router.replace("/login")
            }, 1500)
        }
    }, [isSuccess, router])

    useEffect(() => {
        if (isError) {
            toast.error("Token không hợp lệ hoặc đã hết hạn")
            router.replace("/")
        }
    }, [isError, router])

    if (!token || !isPending) return null

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader className="h-16 w-16 animate-spin text-primary-foreground [animation-duration:2s]" />

        <div className="mt-6 space-y-2 text-center">
            <h1 className="text-xl font-semibold text-primary-foreground">
                Xác thực email của bạn
            </h1>
            <p className="text-sm text-primary-foreground animate-pulse">
                Vui lòng chờ để xác nhận email
            </p>
        </div>
        </div>
    )
}

export default VerifyLoadingPage