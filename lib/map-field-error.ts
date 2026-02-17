import { ApiError } from "@/common/interfaces/api-error.interface"

export function mapFieldErrors(error?: ApiError | null) {
  if (!error?.details) return {}

  return error.details.reduce((acc, detail) => {
    acc[detail.property] = detail.message
    return acc
  }, {} as Record<string, string>)
}
