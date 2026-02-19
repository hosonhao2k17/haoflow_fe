import { useMutation } from "@tanstack/react-query";
import { login, logout } from "./auth.api";
import { LoginDto } from "./interfaces/login-dto.interface";




export const useLogin = () => {
    
    return useMutation({
        mutationFn: (loginDto: LoginDto) => login(loginDto)
    })
}

export const useLogout = () => {
    
    return useMutation({
        mutationFn: logout
    })
}