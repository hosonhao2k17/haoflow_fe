import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query"
import {
  getTransactionCategories,
  getTransactionCategoryById,
  createTransactionCategory,
  updateTransactionCategory,
  deleteTransactionCategory,
} from "./transaction-category.api"
import { QueryTransactionCategory } from "./interfaces/query-transaction-category.interface"
import { CreateTransactionCategory } from "./interfaces/create-transaction-category.interface"
import { UpdateTransactionCategory } from "./interfaces/update-transaction-category.interface"
import { TransactionCategory } from "./interfaces/transaction-category.interface"


export const useTransactionCategories = (
  query: QueryTransactionCategory = {}
) => {
  return useQuery({
    queryKey: ["transaction-categories"] ,
    queryFn: () => getTransactionCategories(query)
  })
}

export const useTransactionCategory = (
  id: string
) => {
  return useQuery({
    queryKey: ["transaction-categories"] ,
    queryFn: () => getTransactionCategoryById(id),
    enabled: !!id,
  })
}

// CREATE
export const useCreateTransactionCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (createDto: CreateTransactionCategory) =>
      createTransactionCategory(createDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction-categories"] 
      })
    },
  })
}

// UPDATE
export const useUpdateTransactionCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      updateDto,
    }: {
      id: string
      updateDto: UpdateTransactionCategory
    }) => updateTransactionCategory(id, updateDto),
  })
}

// DELETE
export const useDeleteTransactionCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTransactionCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction-categories"] ,
      })
    },
  })
}