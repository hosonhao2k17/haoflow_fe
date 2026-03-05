import { RoleName } from "@/common/constants/app.constant";
import { useCurrentUser } from "@/features/user/user.hook";
import { useAuthStore } from "@/store/auth.store"
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react"


interface Props {
    children: ReactNode,
    requiredRole?: RoleName
}

const AuthGuard = ({children, requiredRole}: Props) => {

    const router = useRouter()
    const {accessToken, loading: authLoading} = useAuthStore();
    const {data: user, isLoading, isSuccess} = useCurrentUser({
        enabled: !!accessToken
    });
    const {setUser} = useUserStore()

    useEffect(() => {
        if (isLoading || authLoading) return
        if (!accessToken) {
            router.replace("/login")
            return
        }
        if(isSuccess && user) {
            setUser(user)
        }
        if (requiredRole && user?.role.name !== requiredRole) {
            router.replace("/")
        }
    }, [accessToken, isLoading, user,isSuccess, requiredRole, router])


    if (isLoading || !accessToken || authLoading) return null
    return <>{children}</>
}

export default AuthGuard 