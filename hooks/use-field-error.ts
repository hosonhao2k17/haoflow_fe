
import { useMemo } from "react"
import { ApiError } from "@/common/interfaces/api-error.interface"

export function useFieldErrors(error?: ApiError | null) {
  return useMemo(() => {
    if (!error?.details) return {}

    return error.details.reduce((acc, detail) => {
      acc[detail.property] = detail.message
      return acc
    }, {} as Record<string, string>)
  }, [error])
}
