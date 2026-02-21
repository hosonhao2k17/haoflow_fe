import CardAuth from "@/features/auth/components/CardAuth"
import RegisterForm from "@/features/auth/components/RegisterForm"




const Register = () =>  {


    return (
        <CardAuth
            title="Đăng ký"
        >
            <RegisterForm />
        </CardAuth>
    )
}

export default Register 