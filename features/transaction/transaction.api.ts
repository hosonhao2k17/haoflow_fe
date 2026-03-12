import { api } from "@/config/axios"

import { QueryTransaction } from "./interfaces/query-transaction.interface"
import { Createtransaction } from "./interfaces/create-transaction.interface"
import { UpdateTransaction } from "./interfaces/update-transaction.interface"
import { CreateTransactionReceipt } from "./interfaces/create-transaction-receipt.interface"



export const getTransactionStats = async () => {
  const res = await api.get("transactions/stats")

  return res.data
}

export const getTransactions = async (query: QueryTransaction) => {
  const res = await api.get("transactions", {
    params: query,
  })

  return res.data
}


export const previewReceipt = async (imageUrl: string) => {
  const res = await api.post("transactions/receipt/preview",{
    imageUrl
  });
  return res.data;
}

export const getTransactionById = async (id: string) => {
  const res = await api.get(`transactions/${id}`)

  return res.data
}

export const createTransactionReceipt = async (dto: CreateTransactionReceipt) => {
  const res = await api.post('transactions/receipt',dto);
  return res.data;
}


export const createTransaction = async (dto: Createtransaction) => {
  const res = await api.post("transactions", dto)

  return res.data
}


export const updateTransaction = async ({
  id,
  dto,
}: {
  id: string
  dto: UpdateTransaction
}) => {
  const res = await api.patch(`transactions/${id}`, dto)

  return res.data
}


export const deleteTransaction = async (id: string) => {
  const res = await api.delete(`transactions/${id}`)

  return res.data
}