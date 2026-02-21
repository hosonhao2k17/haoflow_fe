import { useMutation, useQuery } from "@tanstack/react-query";
import { login, logout, register, verify } from "./auth.api";
import { LoginDto } from "./interfaces/login-dto.interface";
import { Register } from "./interfaces/register.interface";




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

export const useRegister = () => {

    return useMutation({
        mutationFn:  (data: Register) => register(data)
    })
}

export const useVerify = () => {
  return useMutation({
    mutationFn: (token: string) => verify(token),
  });
};