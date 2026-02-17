import { api } from "@/config/axios"


export const getRoles =async () => {

    const res = await api.get('roles')
    return res.data
}