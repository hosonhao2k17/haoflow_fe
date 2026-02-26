"use client"

import CategoryList from "@/features/category/components/CategoryList"
import CategoryTool from "@/features/category/components/CategoryTool"
import { useTaskCategories } from "@/features/category/task-category.hook"

const Category = () => {
  const { data } = useTaskCategories({})

  return (
    <div className="flex flex-col gap-5 w-full">
      <CategoryTool />
      <CategoryList items={data?.items} />
    </div>
  )
}

export default Category