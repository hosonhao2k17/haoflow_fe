import config from "@/config/config";
import { RequestInit } from "next/dist/server/web/spec-extension/request";


export const fetcher = async <T>(url: string, init?: RequestInit): Promise<T> => {
    
    const res = await fetch(`${config.API_URL}/${url}`,{
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...init?.headers
        }
    })
    const data = await res.json()
    if(!res.ok) {
        throw data
    }

    return data;
}