import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
  previewReceipt,
  createTransactionReceipt,
} from "./transaction.api"

import { QueryTransaction } from "./interfaces/query-transaction.interface"
import { Createtransaction } from "./interfaces/create-transaction.interface"
import { UpdateTransaction } from "./interfaces/update-transaction.interface"
import { CreateTransactionReceipt } from "./interfaces/create-transaction-receipt.interface"


export const useTransactionStats = () => {
  return useQuery({
    queryKey: ["transactions", "transaction-stats"],
    queryFn: () => getTransactionStats(),
  })
}

export const useTransactionReviewReceipt = () => {
  return useMutation({
    mutationFn: (url: string) => previewReceipt(url)
  })
}

export const useCreateTransactionReceipt = () => {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateTransactionReceipt) => createTransactionReceipt(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"]
      })
    }
  })
}

export const useTransactions = (query: QueryTransaction) => {
  return useQuery({
    queryKey: ["transactions", query],
    queryFn: () => getTransactions(query),
  })
}



export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(id),
    enabled: !!id,
  })
}



export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: Createtransaction) => createTransaction(dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      })
    },
  })
}



export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string
      dto: UpdateTransaction
    }) => updateTransaction({ id, dto }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      })
    },
  })
}



export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      })
    },
  })
}