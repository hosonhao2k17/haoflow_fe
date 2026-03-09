"use client"

import CategoryTool from "@/features/task-category/components/CategoryTool"
import TaskCategoryCard from "@/features/task-category/components/TaskCategoryCard"
import { TaskCategory } from "@/features/task-category/interfaces/task-catgegory.interface"
import { useTaskCategories } from "@/features/task-category/task-category.hook"

const Category = () => {
  const { data } = useTaskCategories({})

  return (
    <div className="flex flex-col gap-5 w-full">
      <CategoryTool />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {
          data?.items.map((category: TaskCategory) => (
            <TaskCategoryCard category={category}/>
          ))
        }
      </div>
    </div>
  )
}

export default Category