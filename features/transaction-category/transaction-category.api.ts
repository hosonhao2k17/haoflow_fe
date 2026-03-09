import { api } from "@/config/axios"
import { CreateTransactionCategory } from "./interfaces/create-transaction-category.interface"
import { UpdateTransactionCategory } from "./interfaces/update-transaction-category.interface"
import { QueryTransactionCategory } from "./interfaces/query-transaction-category.interface"
import { TransactionCategory } from "./interfaces/transaction-category.interface"

const BASE_URL = "transaction-categories"

export const getTransactionCategories = async (
  query?: QueryTransactionCategory
) => {
  const res = await api.get(BASE_URL, { params: query })
  return res.data
}

export const getTransactionCategoryById = async (
  id: string
): Promise<TransactionCategory> => {
  const res = await api.get(`${BASE_URL}/${id}`)
  return res.data
}

// POST create
export const createTransactionCategory = async (
  createDto: CreateTransactionCategory
): Promise<TransactionCategory> => {
  const res = await api.post(BASE_URL, createDto)
  return res.data
}

export const updateTransactionCategory = async (
  id: string,
  updateDto: UpdateTransactionCategory
): Promise<TransactionCategory> => {
  const res = await api.patch(`${BASE_URL}/${id}`, updateDto)
  return res.data
}

// DELETE
export const deleteTransactionCategory = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`)
}