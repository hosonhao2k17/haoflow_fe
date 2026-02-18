import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "./upload.api";



export const useUpload = () => {

    return useMutation({
        mutationFn: (file: File) => uploadFile(file)
    })
}