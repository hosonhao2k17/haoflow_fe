import CardAuth from "@/features/auth/components/CardAuth"
import LoginForm from "@/features/auth/components/LoginForm"


export const Login = () => {


    return (
        <CardAuth title="Đăng nhập">
            <LoginForm />
        </CardAuth>
    )
}

export default Login