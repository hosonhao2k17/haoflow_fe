"use client"

import CategoryTool from "@/features/task-category/components/CategoryTool"
import TaskCategoryCard from "@/features/task-category/components/TaskCategoryCard"
import TaskCategoryCreate from "@/features/task-category/components/TaskCategoryCreate"
import { TaskCategory } from "@/features/task-category/interfaces/task-catgegory.interface"
import { useTaskCategories } from "@/features/task-category/task-category.hook"
import { useState } from "react"

const Category = () => {
  const [keyword, setKeyword] = useState<string>();
  const [limit, setLimit] = useState<number>(20);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const { data } = useTaskCategories({
    keyword, 
    limit
  })



  return (
    <div className="flex flex-col gap-5 w-full">
      <CategoryTool 
        setKeyword={setKeyword}
        setLimit={setLimit}
        setOpenCreate={setOpenCreate}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {
          data?.items.map((category: TaskCategory) => (
            <TaskCategoryCard 
              category={category}
            />
          ))
        }
      </div>
      <TaskCategoryCreate 
        open={openCreate}
        setOpen={setOpenCreate}
      />
    </div>
  )
}

export default Category