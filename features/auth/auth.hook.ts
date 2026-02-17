import { useMutation } from "@tanstack/react-query";
import { login, LoginDto } from "./auth.api";




export const useLogin = () => {
    
    return useMutation({
        mutationFn: (loginDto: LoginDto) => login(loginDto)
    })
}