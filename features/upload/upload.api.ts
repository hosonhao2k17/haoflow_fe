import { api } from "@/config/axios"
import { UploadRdo } from "./interfaces/upload-rdo.interface"



export const uploadFile = async (file: File): Promise<UploadRdo> => {
    const formData = new FormData()
    formData.append("file", file) 

    const res = await api.post("uploads", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

    return res.data
}